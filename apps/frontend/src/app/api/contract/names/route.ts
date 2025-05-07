import { getContractNameFromEtherscan } from "@/service/contract-name.service";
import contractNames from '@/prefetched/contractNames.json';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const contractAddressesParam = url.searchParams.get('contractAddresses');

  if (!contractAddressesParam) {
    return new Response('contractAddresses is required', { status: 400 });
  }

  // Parse the addresses parameter (assuming it's a comma-separated list)
  const contractAddresses = contractAddressesParam.split(',');

  // Create an array to store the results
  const results: { resolverAddress: string, contractName: string }[] = [];

  // Process each address
  for (const contractAddress of contractAddresses) {
    // Check if the address exists in prefetched data
    const prefetchedContract = contractNames.find(contract =>
      contract.address.toLowerCase() === contractAddress.toLowerCase()
    );

    if (prefetchedContract) {
      results.push({
        resolverAddress: contractAddress,
        contractName: prefetchedContract.contractName || contractAddress
      });
    } else {
      // Fetch from Etherscan if not in prefetched data
      try {
        const name = await getContractNameFromEtherscan(contractAddress);
        results.push({
          resolverAddress: contractAddress,
          contractName: name || contractAddress
        });
      } catch (error) {
        // Handle errors by using the address as the name
        results.push({
          resolverAddress: contractAddress,
          contractName: contractAddress
        });
      }
    }
  }

  // Return the results as JSON
  return new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
