import {serverEnv} from "@/config/serverEnv";


export async function getContractNameFromEtherscan(contractAddress: string): Promise<string> {
    try {
        const apiKey = serverEnv.etherscanApiKey
        if(!apiKey) {
            return contractAddress
        }

        const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json()

        if (data.status === '1' && data.result && data.result.length > 0) {
            return data.result[0].ContractName;
        } else {
            return contractAddress
        }
    } catch (error) {
        console.error("Error querying Etherscan API:", error);
        return contractAddress;
    }
}
