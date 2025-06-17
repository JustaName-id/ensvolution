import { z } from 'zod';

const CLIENT_ENV = {
  mainnetProvider: process.env.NEXT_PUBLIC_MAINNET_PROVIDER,
};

export const clientEnvSchema = z.object({
  mainnetProvider: z.string(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

export const clientEnv: ClientEnv = clientEnvSchema.parse(CLIENT_ENV);
