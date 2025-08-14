import { createPublicClient, http, Address, parseAbi } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';
import { serverEnv } from '@/config/serverEnv';

const client = createPublicClient({
  chain: mainnet,
  transport: http(serverEnv.mainnetProvider),
});

// ABI for ownerOf function on the NameWrapper contract
const nameWrapperAbi = parseAbi([
  'function ownerOf(uint256 id) view returns (address owner)',
]);

const NAME_WRAPPER_ADDRESS = '0xd4416b13d2b3a9abae7acd5d6c2bbdbe25686401';

const OLD_REGISTRAR_CONTROLLER_ADDRESS = "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5";

export interface OwnershipEvent {
  id: string;
  blockNumber: number;
  transactionID: string;
  __typename: 'Transfer' | 'NewOwner' | 'WrappedTransfer';
  owner: {
    id: string;
  };
}

export interface DomainWithEvents {
  id: string;
  name: string;
  owner: {
    id: string;
  };
  events: OwnershipEvent[];
}

export interface OwnershipChange {
  blockNumber: number;
  transactionID: string;
  ownerAddress: string;
  eventType: 'Transfer' | 'NewOwner' | 'WrappedTransfer';
  timestamp?: string;
}

export interface OwnershipChangesResponse {
  data: {
    domains: DomainWithEvents[];
  };
}

export class OwnershipChangesService {
  /**
   * Fetches ownership changes for a given ENS name
   */
  async getOwnershipChanges(ensName: string): Promise<OwnershipChange[]> {
    try {
      const normalizedName = normalize(ensName);
      const response = await this.fetchDomainWithEvents(normalizedName);

      if (!response?.data?.domains?.length) {
        return [];
      }

      const domain = response.data.domains[0];
      const relevantEvents = await this.filterRelevantEvents(domain.events, domain.id);

      // Sort by block number to get chronological order
      relevantEvents.sort((a, b) => a.blockNumber - b.blockNumber);

      // Convert to OwnershipChange objects and add timestamps
      const ownershipChanges: OwnershipChange[] = [];

      for (const event of relevantEvents) {
        const timestamp = await this.getBlockTimestamp(event.blockNumber);

        ownershipChanges.push({
          blockNumber: event.blockNumber,
          transactionID: event.transactionID,
          ownerAddress: event.owner.id,
          eventType: event.__typename,
          timestamp,
        });
      }

      return ownershipChanges;
    } catch (error) {
      console.error('Error fetching ownership changes:', error);
      return [];
    }
  }

  /**
   * Fetches domain data with events from the GraphQL endpoint
   */
  private async fetchDomainWithEvents(ensName: string): Promise<OwnershipChangesResponse> {
    const query = `
      query GetDomainWithEvents($name: String!) {
        domains(where: { name: $name }) {
          id
          name
          owner {
            id
          }
          events(
            orderBy: blockNumber
            orderDirection: asc
          ) {
            id
            blockNumber
            transactionID
            __typename
            ... on Transfer {
              owner {
                id
              }
            }
            ... on NewOwner {
              owner {
                id
              }
            }
            ... on WrappedTransfer {
              owner {
                id
              }
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
        variables: { name: ensName }
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching from ENS Node: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Filters events to only include NewOwner and WrappedTransfer events,
   * excluding NewOwner events with the NameWrapper contract address as owner
   */
  private async filterRelevantEvents(events: OwnershipEvent[], domainId: string): Promise<OwnershipEvent[]> {
    const relevantEvents: OwnershipEvent[] = [];

    for (const event of events) {
      // Only process NewOwner and WrappedTransfer events
      if (event.__typename !== 'NewOwner' && event.__typename !== 'WrappedTransfer') {
        continue;
      }

      // Skip NewOwner events where owner is the NameWrapper contract
      if (event.__typename === 'NewOwner' &&
        (event.owner.id.toLowerCase() === NAME_WRAPPER_ADDRESS.toLowerCase() ||
          event.owner.id.toLowerCase() === OLD_REGISTRAR_CONTROLLER_ADDRESS.toLowerCase())) {
        continue;
      }

      // For WrappedTransfer events, we need to call the contract to get the actual owner
      if (event.__typename === 'WrappedTransfer') {
        try {
          const actualOwner = await this.getOwnerFromContract(domainId, event.blockNumber);

          // Create a modified event with the actual owner
          const modifiedEvent: OwnershipEvent = {
            ...event,
            owner: {
              id: actualOwner
            }
          };

          relevantEvents.push(modifiedEvent);
        } catch (error) {
          console.error(`Error getting owner from contract for WrappedTransfer event:`, error);
          // Skip this event if we can't get the owner
          continue;
        }
      } else {
        relevantEvents.push(event);
      }
    }

    return relevantEvents;
  }

  /**
   * Calls the NameWrapper contract's ownerOf function to get the actual owner
   */
  private async getOwnerFromContract(domainId: string, blockNumber: number): Promise<string> {
    try {
      const owner = await client.readContract({
        address: NAME_WRAPPER_ADDRESS,
        abi: nameWrapperAbi,
        functionName: 'ownerOf',
        args: [BigInt(domainId)],
        blockNumber: BigInt(blockNumber),
      });

      return owner.toLowerCase();
    } catch (error) {
      console.error(`Error calling ownerOf for domain ${domainId} at block ${blockNumber}:`, error);
      throw error;
    }
  }

  /**
   * Gets the timestamp for a given block number
   */
  private async getBlockTimestamp(blockNumber: number): Promise<string> {
    try {
      const block = await client.getBlock({
        blockNumber: BigInt(blockNumber),
      });

      return new Date(Number(block.timestamp) * 1000).toISOString();
    } catch (error) {
      console.error(`Error getting timestamp for block ${blockNumber}:`, error);
      return new Date().toISOString();
    }
  }
}

export default OwnershipChangesService;
