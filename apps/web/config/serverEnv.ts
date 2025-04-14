import { z } from 'zod';

const SERVER_ENV = {
  poapApiKey: process.env.POAP_API_KEY,
  talentProtocolApiKey: process.env.TALENT_PROTOCOL_API_KEY,
  mainnetProvider: process.env.MAINNET_PROVIDER,
  ensnodeUrl: process.env.ENSNODE_URL,
  etherscanApiKey: process.env.ETHERSCAN_API_KEY,
}

export const serverEnvSchema = z.object({
  poapApiKey: z.string().optional(),
  talentProtocolApiKey: z.string().optional(),
  mainnetProvider: z.string().optional().default("https://eth.drpc.org"),
  ensnodeUrl: z.string().optional().default("https://api.alpha.ensnode.io/ponder"),
  etherscanApiKey: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const serverEnv: ServerEnv =serverEnvSchema.parse(SERVER_ENV);
