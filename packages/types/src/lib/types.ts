import { Edge, Node } from '@xyflow/react';

export type Line = {
  width: number;
}

export type Changes = {
  nbOfChanges: number;
}

export type ResolverChange = {
  address: string;
}

export type ProfileRecord = {
  type: "text" | "addr" | "resolver" | "contentHash";
  key: string;
  value: string;
  rawValue: string;
}

export type ProfileState ={
  id: number;
  timestamp: string;
  transactionHash: string;
  blockNumber: string;
  name: string;
  currentUpdatedRecords?: ProfileRecord[];
  cumulativeRecords: ProfileRecord[];
  resolverChange?: ResolverChange;
  resolverAddress?: string;
  eventType?: "text" | "addr" | "resolver" | "multi" | "contentHash";
}


export type ProfileStateWithChanges ={
  id: number;
  timestamp: string;
  transactionHash: string;
  blockNumber: string;
  name: string;
  currentUpdatedRecords?: ProfileRecord[];
  cumulativeRecords: ProfileRecord[];
  resolverChange?: ResolverChange;
  resolverAddress?: string;
  eventType?: "text" | "addr" | "resolver" | "multi" | "contentHash";
  changes: {
    added: ProfileRecord[],
    deleted: ProfileRecord[],
    updated: ProfileRecord[]
  }
}


export type ProfileNode = Node<ProfileStateWithChanges>

export type ResolverNode = Node<ResolverChange>

export type LineNode = Node<Line>

export type ChangesEdge = Edge<Changes>
