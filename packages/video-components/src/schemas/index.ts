import { z } from "zod";


const profileRecordSchema = z.object({
  type: z.enum(['text', 'addr', 'resolver', 'contentHash']),
  key: z.string(),
  value: z.string(),
  rawValue: z.string()
});

const resolverChangeSchema = z.object({
  address: z.string(),
});

const changesSchema = z.object({
  added: z.array(profileRecordSchema).default([]),
  updated: z.array(profileRecordSchema).default([]),
  deleted: z.array(profileRecordSchema).default([]),
})

const profileStateSchema = z.object({
  id: z.number(),
  timestamp: z.string(),
  transactionHash: z.string(),
  blockNumber: z.string(),
  name: z.string(),
  currentUpdatedRecords: z.array(profileRecordSchema).optional(),
  cumulativeRecords: z.array(profileRecordSchema),
  resolverChange: resolverChangeSchema.optional(),
  resolverAddress: z.string().optional(),
  eventType: z.enum(['text', 'addr', 'resolver', 'multi', 'contentHash']).optional(),
  changes: changesSchema.default({
    added: [],
    updated: [],
    deleted: [],
  })
});

const latestProfileSchema = z.object({
  textRecords: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })),
  coins: z.array(z.object({
    coinType: z.string(),
    value: z.string(),
  })),
  contentHash: z.string().optional(),
  resolverAddress: z.string(),
  lastUpdated: z.string(),
});

const resolverNameSchema = z.object({
  resolverAddress: z.string(),
  contractName: z.string(),
})

// Schema for the ENSVideo component props
export const ensVideoSchema = z.object({
  ensName: z.string().default('nick.eth'),
  profileStates: z.array(profileStateSchema).default([]),
  resolverNames: z.array(resolverNameSchema).default([])
});

export const RenderRequest = z.object({
  id: z.string(),
  inputProps: ensVideoSchema,
});

export const ProgressRequest = z.object({
  bucketName: z.string(),
  id: z.string(),
});

export type ProgressResponse =
  | {
  type: "error";
  message: string;
}
  | {
  type: "progress";
  progress: number;
}
  | {
  type: "done";
  url: string;
  size: number;
};
