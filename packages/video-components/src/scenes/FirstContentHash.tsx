import React, { ComponentProps, JSX, memo, useEffect, useState } from "react";
import { useCurrentFrame, staticFile, delayRender, continueRender } from "remotion";
import { Rive, RiveFile, useRive } from "@rive-app/react-canvas";
import { ProfileRecord } from "@ensvolution/types";

interface FirstContentHashProps {
  record: ProfileRecord;
  timestamp: string;
  riveFile: RiveFile | null;
}

export const FirstContentHash: React.FC<FirstContentHashProps> = ({
                                                              record,
                                                              timestamp,
  riveFile
                                                            }) => {
  const frame = useCurrentFrame()

  const { rive, RiveComponent } = useRive({
    riveFile: riveFile || undefined,
    animations: ['website'],
    autoplay:false
  })

  useEffect(() => {
    if(!rive || !riveFile) return;
    rive.setTextRunValue("ContentHash",record.value.length > 67 ? record.value.slice(0, 67) + "..." : record.value)
    rive.setTextRunValue("ContentHash Date", timestamp.split("T")[0])
  }, [timestamp, rive, record.value]);


  if(rive && riveFile){
    rive.scrub('website', frame/60)
  }

  return (
    <>
      <RiveComponent />
    </>
  )
};

export default memo(FirstContentHash);
