import React, {memo} from "react";
import {NodeProps} from "@xyflow/react";
import {LineNode} from "@/lib/types/ens-profile";


const ResolverLine: React.FC<NodeProps<LineNode>> = ({data, height, width}) => {

    return (
        <>
            <div  className={`h-1 rounded-lg overflow-hidden shadow-md bg-gray-700 pointer-events-none!`} style={{width: data.width + 600}}/>
        </>

    )
}


export default memo(ResolverLine);
