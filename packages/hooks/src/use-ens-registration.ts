"use client"

import { useQuery } from '@tanstack/react-query';
import { ENSRegistrationData } from '@ensvolution/types';

export type { ENSRegistrationData };

export function useENSRegistration(ensName?: string) {
  return useQuery<ENSRegistrationData | null, Error>({
    queryKey: ['ens-registration', ensName],
    queryFn: async () => {
      if (!ensName) return null;
      const res = await fetch(
        `/api/ens-profile/registration?ensName=${encodeURIComponent(ensName)}`
      );
      if (!res.ok) {
        throw new Error(`Registration fetch failed: ${res.status}`);
      }
      return res.json();
    },
    enabled: !!ensName,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
