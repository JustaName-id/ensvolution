import React, {memo} from "react";
import {NodeProps} from "@xyflow/react";
import { ResolverNode} from "@/lib/types/ens-profile";
import {useContractName} from "@/hooks/use-contract-name";
import {LucideExternalLink} from "lucide-react";
import Link from "next/link";
import {isAddress} from "viem";


const ResolverCard: React.FC<NodeProps<ResolverNode>> = ({data, height, width}) => {

    const { data: contractName} = useContractName(data.address)
    return (
        <>
            <Link href={"https://etherscan.io/address/" + data.address} target={"_blank"}>

                <div
                    className={`w-64 rounded-lg overflow-hidden shadow-md bg-white border-t-4 p-2 mt-2 flex place-content-between`}
                >
                    <div className={"w-[85%] flex flex-col"} >
                        <div className="text-lg text-gray-700 truncate">
                            {!contractName ? "Loading..." : !isAddress(contractName) ? contractName : "Name Not Found"}
                        </div>
                        <div className="text-xs text-gray-500 truncate">{data.address}</div>
                    </div>

                        <LucideExternalLink className={"text-gray-700"}/>
                </div>
            </Link>

        </>

    )
}


export default memo(ResolverCard);
