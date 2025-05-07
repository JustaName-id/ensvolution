import React, {memo} from "react";
import {NodeProps} from "@xyflow/react";
import { LineNode } from '@ensvolution/types';
import ResolverLine from '@ensvolution/components/cards/ResolverLine';


const ResolverLineNode: React.FC<NodeProps<LineNode>> = ({data}) => {

  return (
    <ResolverLine width={data.width} />
  )
}


export default memo(ResolverLineNode);
