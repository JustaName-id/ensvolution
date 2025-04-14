import {NextRequest} from "next/server";
import {getContractNameFromEtherscan} from "@/service/contract-name.service";
import contractNames from '@/prefetched/contractNames.json'

interface QueryParams {
    contractAddress: string;
}

export async function GET(req: NextRequest & { query: QueryParams }) {
    const { searchParams } = req.nextUrl;
    const contractAddress = searchParams.get('contractAddress');

    if (!contractAddress) {
        return new Response('contractAddress is required', { status: 400 });
    }


    const prefetchedContract = contractNames.find(contract => contract.address.toLowerCase() === contractAddress.toLowerCase())

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

    const name = await getContractNameFromEtherscan(contractAddress)
    return new Response(name, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}