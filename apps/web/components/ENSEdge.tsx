import React from 'react';
import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';
import {ChangesEdge} from "@/lib/types/ens-profile";


const ENSEdge: React.FC<EdgeProps<ChangesEdge>> = ({
                                                       id,
                                                       source,
                                                       target,
                                                       sourceX,
                                                       sourceY,
                                                       targetX,
                                                       targetY,
                                                       sourcePosition,
                                                       targetPosition,
                                                       data,
                                                       style = {},
                                                       markerEnd
                                                   }) => {
    
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    
    const midX = (sourceX + targetX) / 2;
    const midY = (sourceY + targetY) / 2;

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                style={{
                    ...style,
                    stroke: '#555',
                    strokeWidth: 2,
                }}
                className={`z-40`}
            />

            
            {data?.nbOfChanges && data.nbOfChanges > 0 && (
                <foreignObject
                    width={20}
                    height={20}
                    x={midX - 12}
                    y={midY - 12}
                    className="flex items-center justify-center overflow-visible z-40"
                >
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                        {data.nbOfChanges}
                    </div>
                </foreignObject>
            )}
        </>
    );
};

export default ENSEdge;