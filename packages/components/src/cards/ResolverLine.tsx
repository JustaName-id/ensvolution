import React, {memo} from "react";
import { Line } from '@ensvolution/types';


const ResolverLine: React.FC<Line> = (data) => {
  return (
      <div  className={`h-1 rounded-lg overflow-hidden shadow-md bg-gray-700 pointer-events-none!`} style={{width: data.width + 600}}/>
  )
}


export default memo(ResolverLine);
