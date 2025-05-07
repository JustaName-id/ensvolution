import React, {memo} from "react";
import {NodeProps} from "@xyflow/react";
import ResolverCard from '@ensvolution/components/cards/ResolverCard';
import { ResolverNode } from '@ensvolution/types';
import { useContractName } from "@ensvolution/hooks/use-contract-name";


const ResolverCardNode: React.FC<NodeProps<ResolverNode>> = ({data}) => {

  const { data: contractName} = useContractName(data.address)

  return (
        <ResolverCard address={data.address} contractName={contractName}/>
    )
}


export default memo(ResolverCardNode);
