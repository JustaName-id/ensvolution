import {getContractNameFromEtherscan} from "@/service/contract-name.service";
import contractNames from '@/prefetched/contractNames.json';


export async function GET(req: Request) {
    const url = new URL(req.url);
    const contractAddress = url.searchParams.get('contractAddress');

    if (!contractAddress) {
        return new Response('contractAddress is required', { status: 400 });
    }

    const prefetchedContract = contractNames.find(contract => 
        contract.address.toLowerCase() === contractAddress.toLowerCase()
    );

    if(prefetchedContract){
        if(prefetchedContract.contractName){
            return new Response(prefetchedContract.contractName, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(prefetchedContract.address, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const name = await getContractNameFromEtherscan(contractAddress);
    return new Response(name, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}