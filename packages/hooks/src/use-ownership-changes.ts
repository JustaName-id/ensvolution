"use client"

import { useQuery } from '@tanstack/react-query';
import { OwnershipChange } from '@ensvolution/types';

export type { OwnershipChange };

export const useOwnershipChanges = (ensName?: string) => {
  return useQuery<OwnershipChange[], Error>({
    queryKey: ['ownership-changes', ensName],
    queryFn: async () => {
      if (!ensName) throw new Error('ENS name is required');
      const res = await fetch(
        `/api/ens-profile/ownership?ensName=${encodeURIComponent(ensName)}`
      );
      if (!res.ok) {
        throw new Error(`Ownership fetch failed: ${res.status}`);
      }
      return res.json();
    },
    enabled: !!ensName,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
