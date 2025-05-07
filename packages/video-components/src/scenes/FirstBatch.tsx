import React, { ComponentProps, JSX, memo, useEffect, useState } from "react";
import { useCurrentFrame, staticFile, delayRender, continueRender } from "remotion";
import { Rive, RiveFile, useRive } from "@rive-app/react-canvas";
import { ProfileRecord } from "@ensvolution/types";

interface FirstBatchProps {
  count: number;
  timestamp: string;
  riveFile: RiveFile | null;
}

export const FirstBatch: React.FC<FirstBatchProps> = ({
                                                              count,
                                                              timestamp,
  riveFile
                                                            }) => {
  const frame = useCurrentFrame()

  const { rive, RiveComponent } = useRive({
    riveFile: riveFile || undefined,
    animations: ['batch update'],
    autoplay:false
  })

  useEffect(() => {
    if(!rive) return;
    rive.setTextRunValue("Batch Number",count.toString().padStart(3, '0'))
    rive.setTextRunValue("Batch Date", timestamp.split("T")[0])
  }, [timestamp, rive, count]);


  if(rive){
    rive.scrub('batch update', frame/60)
  }

  return (
    <>
      <RiveComponent />
    </>
  )
};

export default memo(FirstBatch);
