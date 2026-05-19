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

export type OwnerInfo = {
  address: string;
  isWrapped: boolean;
  blockNumber: number;
  transactionID: string;
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
  owner?: OwnerInfo;
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

export type OwnershipChangeNodeData = {
  ownerAddress: string;
  blockNumber: number;
  transactionID: string;
  isWrapped: boolean;
  timestamp?: string;
}

export type OwnershipChangeNode = Node<OwnershipChangeNodeData>

export type LifecycleEventKind = "registration" | "renewal" | "expiry";

export type LifecycleEvent = {
  kind: LifecycleEventKind;
  blockNumber?: number;
  transactionID?: string;
  timestamp: string;
  expiryDate?: string;
}

export type LifecycleNodeData = LifecycleEvent;

export type LifecycleNode = Node<LifecycleNodeData>

export type OwnershipEventType = 'Transfer' | 'NewOwner' | 'WrappedTransfer';

export type OwnershipChange = {
  blockNumber: number;
  transactionID: string;
  ownerAddress: string;
  eventType: OwnershipEventType;
  timestamp?: string;
}

export type ENSRegistrationData = {
  registrationDate: string;
  currentExpiryDate: string;
  events: LifecycleEvent[];
}
