import { useQuery } from '@tanstack/react-query';

// Define the interfaces here to avoid circular dependencies
export interface OwnershipChange {
  blockNumber: number;
  transactionID: string;
  ownerAddress: string;
  eventType: 'Transfer' | 'NewOwner' | 'WrappedTransfer';
  timestamp?: string;
}

export const useOwnershipChanges = (ensName?: string, serviceInstance?: any) => {
  return useQuery<OwnershipChange[], Error>({
    queryKey: ['ownership-changes', ensName],
    queryFn: async () => {
      if (!ensName) {
        throw new Error('ENS name is required');
      }

      if (!serviceInstance) {
        throw new Error('Service instance is required');
      }

      return serviceInstance.getOwnershipChanges(ensName);
    },
    enabled: !!ensName && !!serviceInstance,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
