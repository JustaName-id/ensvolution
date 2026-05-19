import { createPublicClient, http, PublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import { clientEnv } from '@/config/clientEnv';

export const viemClient: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(clientEnv.mainnetProvider),
});
