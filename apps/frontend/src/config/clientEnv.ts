import { z } from 'zod';

const CLIENT_ENV = {
  mainnetProvider: process.env.NEXT_PUBLIC_MAINNET_PROVIDER,
};

// Default mirrors serverEnv so module load on SSR or in a deployment without
// the env var configured does not throw.
export const clientEnvSchema = z.object({
  mainnetProvider: z.string().optional().default('https://eth.drpc.org'),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

export const clientEnv: ClientEnv = clientEnvSchema.parse(CLIENT_ENV);
