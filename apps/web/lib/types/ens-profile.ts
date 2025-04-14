import {Edge, Node} from "@xyflow/react";

export interface ResolverChange {
  address: string;
  id: string;
}

export interface ProfileRecord {
  type: "text" | "addr" | "resolver";
  key: string;
  value: string;
}

export interface ProfileState {
  id: number;
  timestamp: string;
  transactionHash: string;
  blockNumber: string;
  name: string;
  currentUpdatedRecords?: ProfileRecord[];
  cumulativeRecords: ProfileRecord[];
  resolverChange?: ResolverChange;
  resolverAddress?: string;
  eventType?: "text" | "addr" | "resolver" | "multi" | "registration";
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
  eventType?: "text" | "addr" | "resolver" | "multi" | "registration";
  changes: {
    added: ProfileRecord[],
    deleted: ProfileRecord[],
    updated: ProfileRecord[]
  }
}

export type ProfileNode = Node<ProfileStateWithChanges>

export type ResolverBadgeType = {
  address: string;
}

export type ResolverNode = Node<ResolverBadgeType>

export type Line = {
  width: number;
}

export type LineNode = Node<Line>

export type Changes = {
  nbOfChanges: number;
}

export type ChangesEdge = Edge<Changes>