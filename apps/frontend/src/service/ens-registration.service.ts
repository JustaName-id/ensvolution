import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';
import { namehash } from '@ensdomains/ensjs/utils';
import { serverEnv } from '@/config/serverEnv';
import { ENSRegistrationData, LifecycleEvent } from '@ensvolution/types';

export type { ENSRegistrationData };

const client = createPublicClient({
  chain: mainnet,
  transport: http(serverEnv.mainnetProvider),
});

// `NameTransferred` events are intentionally NOT surfaced — registration
// transfers are not part of the lifecycle lane (ownership is its own lane).
// The subgraph still returns base fields for them, but we ignore those.
export interface RegistrationEventRaw {
  __typename: 'NameRegistered' | 'NameRenewed' | 'NameTransferred';
  id: string;
  blockNumber: number;
  transactionID: string;
  expiryDate?: string;
}

export interface RegistrationRaw {
  id: string;
  registrationDate: string;
  expiryDate: string;
  events: RegistrationEventRaw[];
}

export interface RegistrationResponse {
  data: {
    registrations: RegistrationRaw[];
  };
}

export class ENSRegistrationService {
  async getRegistration(ensName: string): Promise<ENSRegistrationData | null> {
    try {
      const normalizedName = normalize(ensName);
      const node = namehash(normalizedName);

      const response = await this.fetchRegistration(node);
      const registrations = response?.data?.registrations ?? [];
      if (registrations.length === 0) return null;

      const registration = registrations[0];

      const blockNumbers = Array.from(
        new Set(
          registration.events
            .filter((e) => e.blockNumber !== undefined && e.blockNumber !== null)
            .map((e) => e.blockNumber)
        )
      );

      const timestampEntries = await Promise.all(
        blockNumbers.map(async (bn) => {
          try {
            const block = await client.getBlock({ blockNumber: BigInt(bn) });
            return [bn, new Date(Number(block.timestamp) * 1000).toISOString()] as const;
          } catch {
            return [bn, new Date().toISOString()] as const;
          }
        })
      );
      const timestampByBlock = new Map<number, string>(timestampEntries);

      const events: LifecycleEvent[] = [];

      const registeredEvent = registration.events.find(
        (e) => e.__typename === 'NameRegistered'
      );
      if (registeredEvent) {
        events.push({
          kind: 'registration',
          blockNumber: registeredEvent.blockNumber,
          transactionID: registeredEvent.transactionID,
          timestamp:
            timestampByBlock.get(registeredEvent.blockNumber) ??
            new Date(Number(registration.registrationDate) * 1000).toISOString(),
          expiryDate: registeredEvent.expiryDate
            ? new Date(Number(registeredEvent.expiryDate) * 1000).toISOString()
            : undefined,
        });
      } else {
        events.push({
          kind: 'registration',
          timestamp: new Date(Number(registration.registrationDate) * 1000).toISOString(),
        });
      }

      for (const ev of registration.events) {
        if (ev.__typename !== 'NameRenewed') continue;
        events.push({
          kind: 'renewal',
          blockNumber: ev.blockNumber,
          transactionID: ev.transactionID,
          timestamp: timestampByBlock.get(ev.blockNumber) ?? new Date().toISOString(),
          expiryDate: ev.expiryDate
            ? new Date(Number(ev.expiryDate) * 1000).toISOString()
            : undefined,
        });
      }

      const currentExpiryDate = new Date(
        Number(registration.expiryDate) * 1000
      ).toISOString();

      events.push({
        kind: 'expiry',
        timestamp: currentExpiryDate,
        expiryDate: currentExpiryDate,
      });

      events.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      return {
        registrationDate: new Date(
          Number(registration.registrationDate) * 1000
        ).toISOString(),
        currentExpiryDate,
        events,
      };
    } catch (error) {
      console.error('Error fetching ENS registration:', error);
      return null;
    }
  }

  private async fetchRegistration(node: string): Promise<RegistrationResponse> {
    const query = `
      query GetRegistration($id: String!) {
        registrations(where: { domain: $id }) {
          id
          registrationDate
          expiryDate
          events(orderBy: blockNumber, orderDirection: asc) {
            id
            blockNumber
            transactionID
            __typename
            ... on NameRegistered {
              expiryDate
            }
            ... on NameRenewed {
              expiryDate
            }
          }
        }
      }
    `;

    const response = await fetch(serverEnv.ensnodeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { id: node },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching from ENS Node: ${response.statusText}`);
    }

    return await response.json();
  }
}

export default ENSRegistrationService;
