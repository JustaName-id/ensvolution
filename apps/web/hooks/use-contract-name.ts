"use client"

import {useQuery, useQueryClient} from '@tanstack/react-query';


const buildContractNameKey = (contractAddress: string | undefined) => {
    return ['contract-name', contractAddress]
}

const getContractName = async (address: string | undefined) => {
    return fetch('/api/contract/name?contractAddress=' + address).then(res => res.text())
}

export const useContractName =(contractAddress?: string) => {
    const queryClient = useQueryClient();
    const query =  useQuery<string, Error>({
        queryKey: buildContractNameKey(contractAddress),
        queryFn: () => getContractName(contractAddress),
        staleTime: 5 * 60 * 1000, 
        retry: 2,
        enabled: !!contractAddress,
    });

    const getContractNameInternal = async (_contractAddress: string): Promise<string> => {
        const cached = queryClient.getQueryData(['contract-name', _contractAddress]) as string
        if (cached) return cached;

        const contractName = await getContractName(_contractAddress);

        queryClient.setQueryData(['contract-name', _contractAddress], contractName);
        return contractName;
    }

    return {
        getContractName: getContractNameInternal,
        ...query,
    }
}