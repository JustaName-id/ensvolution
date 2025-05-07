import React, { ComponentProps, JSX, memo, useEffect, useState } from "react";
import { useCurrentFrame, staticFile, delayRender, continueRender } from "remotion";
import { Rive, RiveFile, useRive } from "@rive-app/react-canvas";
import { ProfileRecord } from "@ensvolution/types";

interface FirstCustomProps {
  record: ProfileRecord;
  timestamp: string;
  riveFile: RiveFile | null;
}

const FirstCustom: React.FC<FirstCustomProps> = ({
                                                              record,
                                                              timestamp,
  riveFile
                                                            }) => {
  const frame = useCurrentFrame()
  const { rive, RiveComponent } = useRive({
    riveFile: riveFile || undefined,
    animations: ['Custom'],
    autoplay:false
  })
  useEffect(() => {
    if(rive){
      rive.setTextRunValue("CustomKey", record.key)
      rive.setTextRunValue("CustomValue", record.value.length > 275 ? record.value.slice(0, 275) + "..." : record.value)
      rive.setTextRunValue("Custom Date", timestamp.split("T")[0])
    }
  }, [record.key, record.value, rive, timestamp]);

  if(rive){
    rive.scrub('Custom', frame/60)
  }

  return (
    <>
      <RiveComponent />
    </>
  )
};


export default memo(FirstCustom);
