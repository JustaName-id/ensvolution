import { useQuery } from '@tanstack/react-query';
import { createPublicClient, http, parseAbi } from 'viem';
import { mainnet } from 'viem/chains';

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(process.env.NEXT_PUBLIC_MAINNET_PROVIDER)
});

const tokenUriAbi = parseAbi([
    'function tokenURI(uint256 tokenId) view returns (string)',
    'function uri(uint256 id) view returns (string)'
]);

const ipfsNormalizer = (url: string) => {
    if (url.startsWith('ipfs://ipfs')) {
        return url.replace('ipfs://ipfs', 'https://ipfs.io/');
    }
    if (url.startsWith('ipfs://')) {
        return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    return url;
}

const fetchMetadata = async (uriParam: string) => {
    let uri = ipfsNormalizer(uriParam)

    try {
        const response = await fetch(uri);
        if (!response.ok) {
            throw new Error(`Failed to fetch metadata: ${response.status}`);
        }

        const metadata = await response.json();

        if (metadata.image) {
            return ipfsNormalizer(metadata.image);
        }

        return null;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
    }
};

const resolveEnsAvatar = async (avatarLink: string | null | undefined) => {
    if (!avatarLink) {
        return null;
    }

    try {
        if (avatarLink.startsWith('ipfs://')) {
            return ipfsNormalizer(avatarLink)
        }

        if (avatarLink.startsWith('eip155:')) {
            const match = avatarLink.match(/eip155:(\d+)\/(erc721|erc1155):([a-zA-Z0-9]+)\/(.+)/);

            if (match) {
                const [_, chainId, tokenStandard, contractAddress, tokenId] = match;

                if (chainId === '1' && contractAddress && tokenId) {
                    try {
                        const functionName = tokenStandard === 'erc721' ? 'tokenURI' : 'uri';

                        const tokenUri = await publicClient.readContract({
                            address: `0x${contractAddress.replace(/^0x/, '')}`,
                            abi: tokenUriAbi,
                            functionName,
                            args: [BigInt(tokenId)]
                        });

                        if (tokenUri) {
                            const formattedUri = typeof tokenUri === 'string'
                                ? tokenUri.replace('0x{id}', tokenId.padStart(64, '0'))
                                : null;

                            if (formattedUri) {
                                return await fetchMetadata(formattedUri);
                            }
                        }
                    } catch (contractError) {
                        console.error('Error calling contract:', contractError);
                    }
                } else {
                    console.warn(`Chain ID ${chainId} not supported yet`);
                }
            }
        }

        if (avatarLink.startsWith('http://') || avatarLink.startsWith('https://')) {
            return avatarLink;
        }

        console.warn('Unsupported avatar format:', avatarLink);
        return null;
    } catch (err) {
        console.error('Error resolving ENS avatar:', err);
        return null;
    }
};
export const useEnsAvatar = (
    avatarLink: string | null | undefined,
) => {
    return useQuery({
        queryKey: ['ensAvatar', avatarLink],
        queryFn: () => resolveEnsAvatar(avatarLink),
        enabled: !!avatarLink,
        staleTime: 1000 * 60 * 60,
    });
};