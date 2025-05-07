import React from 'react';
import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';
import { ChangesEdge } from '@ensvolution/types';
import { ENSBadge } from '@ensvolution/components/ens-badge/ENSBadge';


const ENSBadgeEdge: React.FC<EdgeProps<ChangesEdge>> = ({
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

           <ENSBadge nbOfChanges={data?.nbOfChanges || 0} midX={midX} midY={midY} />

        </>
    );
};

export default ENSBadgeEdge;
