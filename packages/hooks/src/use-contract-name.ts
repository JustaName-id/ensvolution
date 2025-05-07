"use client"

import { useQuery, useQueryClient } from '@tanstack/react-query';

const buildContractNameKey = (contractAddress: string | undefined) => {
  return ['contract-name', contractAddress];
};

const buildContractNamesKey = (contractAddresses: string[] | undefined) => {
  return ['contract-names', contractAddresses ? contractAddresses.join(',') : undefined];
};

const getContractNamesFromAPI = async (addresses: string[] | undefined) => {
  if (!addresses || addresses.length === 0) return [];

  return fetch('/api/contract/names?contractAddresses=' + addresses.join(','))
    .then(res => res.json()) as Promise<{ resolverAddress: string, contractName: string }[]>;
};

const getContractNameFromAPI = async (address: string | undefined) => {
  if (!address) return '';

  const results = await getContractNamesFromAPI([address]);
  return results[0]?.contractName || address;
};

export const useContractNames = (contractAddresses?: string[]) => {
  const queryClient = useQueryClient();

  const query = useQuery<{ resolverAddress: string, contractName: string }[], Error>({
    queryKey: buildContractNamesKey(contractAddresses),
    queryFn: async () => {
      if (!contractAddresses || contractAddresses.length === 0) return [];

      const cachedResults: { resolverAddress: string, contractName: string }[] = [];
      const missingAddresses: string[] = [];

      for (const address of contractAddresses) {
        const singleCached = queryClient.getQueryData(buildContractNameKey(address)) as string;
        if (singleCached) {
          cachedResults.push({ resolverAddress: address, contractName: singleCached });
        } else {
          missingAddresses.push(address);
        }
      }

      if (missingAddresses.length === 0) {
        return cachedResults;
      }

      const fetchedResults = await getContractNamesFromAPI(missingAddresses);
      for (const result of fetchedResults) {
        queryClient.setQueryData(
          buildContractNameKey(result.resolverAddress),
          result.contractName
        );
      }

      return [...cachedResults, ...fetchedResults];
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!contractAddresses && contractAddresses.length > 0,
  });

  const getContractNamesInternal = async (_contractAddresses: string[]): Promise<{ resolverAddress: string, contractName: string }[]> => {
    if (_contractAddresses.length === 0) return [];

    const batchKey = buildContractNamesKey(_contractAddresses);
    const batchCached = queryClient.getQueryData(batchKey) as { resolverAddress: string, contractName: string }[] | undefined;

    if (batchCached) return batchCached;

    const cachedResults: { resolverAddress: string, contractName: string }[] = [];
    const missingAddresses: string[] = [];

    for (const address of _contractAddresses) {
      const singleKey = buildContractNameKey(address);
      const singleCached = queryClient.getQueryData(singleKey) as string;

      if (singleCached) {
        cachedResults.push({ resolverAddress: address, contractName: singleCached });
      } else {
        missingAddresses.push(address);
      }
    }

    if (missingAddresses.length === 0) {
      queryClient.setQueryData(batchKey, cachedResults);
      return cachedResults;
    }

    const fetchedResults = await getContractNamesFromAPI(missingAddresses);

    for (const result of fetchedResults) {
      queryClient.setQueryData(
        buildContractNameKey(result.resolverAddress),
        result.contractName
      );
    }

    const combinedResults = [...cachedResults, ...fetchedResults];
    queryClient.setQueryData(batchKey, combinedResults);

    return combinedResults;
  };

  return {
    getContractNames: getContractNamesInternal,
    ...query,
  };
};

export const useContractName = (contractAddress?: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<string, Error>({
    queryKey: buildContractNameKey(contractAddress),
    queryFn: async () => {
      if (!contractAddress) return '';

      const batchKeys = queryClient.getQueryCache().findAll({ queryKey: ['contract-names'] });

      for (const key of batchKeys) {
        const keyData = key.queryKey[1] as string | undefined;
        if (keyData && keyData.split(',').includes(contractAddress)) {
          const batchData = queryClient.getQueryData(key.queryKey) as { resolverAddress: string, contractName: string }[] | undefined;
          if (batchData) {
            const contractData = batchData.find(item => item.resolverAddress === contractAddress);
            if (contractData) {
              return contractData.contractName;
            }
          }
        }
      }

      const result = await getContractNameFromAPI(contractAddress);

      for (const key of batchKeys) {
        const keyData = key.queryKey[1] as string | undefined;
        if (keyData && keyData.split(',').includes(contractAddress)) {
          const batchData = queryClient.getQueryData(key.queryKey) as { resolverAddress: string, contractName: string }[] | undefined;
          if (batchData) {
            const updatedBatch = batchData.map(item =>
              item.resolverAddress === contractAddress
                ? { ...item, contractName: result }
                : item
            );
            queryClient.setQueryData(key.queryKey, updatedBatch);
          }
        }
      }

      return result;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!contractAddress,
  });

  const getContractNameInternal = async (_contractAddress: string): Promise<string> => {
    if (!_contractAddress) return '';

    const directKey = buildContractNameKey(_contractAddress);
    const directCached = queryClient.getQueryData(directKey) as string;
    if (directCached) return directCached;

    const batchKeys = queryClient.getQueryCache().findAll({ queryKey: ['contract-names'] });

    for (const key of batchKeys) {
      const keyData = key.queryKey[1] as string | undefined;
      if (keyData && keyData.split(',').includes(_contractAddress)) {
        const batchData = queryClient.getQueryData(key.queryKey) as { resolverAddress: string, contractName: string }[] | undefined;
        if (batchData) {
          const contractData = batchData.find(item => item.resolverAddress === _contractAddress);
          if (contractData) {
            queryClient.setQueryData(directKey, contractData.contractName);
            return contractData.contractName;
          }
        }
      }
    }

    const result = await getContractNameFromAPI(_contractAddress);

    queryClient.setQueryData(directKey, result);

    for (const key of batchKeys) {
      const keyData = key.queryKey[1] as string | undefined;
      if (keyData && keyData.split(',').includes(_contractAddress)) {
        const batchData = queryClient.getQueryData(key.queryKey) as { resolverAddress: string, contractName: string }[] | undefined;
        if (batchData) {
          const updatedBatch = batchData.map(item =>
            item.resolverAddress === _contractAddress
              ? { ...item, contractName: result }
              : item
          );
          queryClient.setQueryData(key.queryKey, updatedBatch);
        }
      }
    }

    return result;
  };

  return {
    getContractName: getContractNameInternal,
    ...query,
  };
};
