"use client"

import { useQuery } from '@tanstack/react-query';
import { ProfileStateWithChanges } from "@ensvolution/types";

export function useENSProfileHistory(ensName: string) {
  return useQuery<ProfileStateWithChanges[], Error>({
    queryKey: ['ens-profile-history', ensName],
    queryFn: () => fetch('/api/ens-profile/history?ensName=' + ensName).then(res => res.json()),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
