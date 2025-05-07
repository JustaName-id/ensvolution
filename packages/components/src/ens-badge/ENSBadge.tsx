import React from 'react';


export interface ENSBadgeProps {
  nbOfChanges: number;
  midX: number;
  midY: number;
}

export const ENSBadge = (data: ENSBadgeProps) => {

  return (
    <>
      {data?.nbOfChanges && data.nbOfChanges > 0 && (
        <foreignObject
          width={20}
          height={20}
          x={data.midX - 12}
          y={data.midY - 12}
          className="flex items-center justify-center overflow-visible z-40"
        >
          <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
            {data.nbOfChanges}
          </div>
        </foreignObject>
      )}
    </>

  )
}
