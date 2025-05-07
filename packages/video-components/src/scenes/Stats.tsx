import React, { ComponentProps, JSX, memo, useEffect, useState } from "react";
import { useCurrentFrame, staticFile, delayRender, continueRender } from "remotion";
import { Rive, RiveFile, useRive } from "@rive-app/react-canvas";

interface StatsProps {
  addressChanges: number;
  profileRecordChanges: number;
  resolverChanges: number;
  contentHashChanges: number;
  riveFile: RiveFile | null;
}

export const Stats: React.FC<StatsProps> = ({
                                                                    addressChanges,
                                                                    profileRecordChanges,
  resolverChanges,
  contentHashChanges,
  riveFile
                                                                  }) => {
  const frame = useCurrentFrame()
  const { rive, RiveComponent } = useRive({
    riveFile: riveFile || undefined,
    animations: ['End Stats'],
    autoplay:false
  })
  useEffect(() => {
    if(!rive) return;
    rive.setTextRunValue("Address Changes", addressChanges.toString().padStart(3, '0'))
    rive.setTextRunValue("Record Changes", profileRecordChanges.toString().padStart(3, '0'))
    rive.setTextRunValue("Resolver Changes", resolverChanges.toString().padStart(3, '0'))
    rive.setTextRunValue("ContentHash Changes", contentHashChanges.toString().padStart(3, '0'))

  }, [rive, addressChanges, profileRecordChanges, resolverChanges, contentHashChanges]);

  if(rive){
    rive.scrub('End Stats', frame/60)
  }

  return (
    <>
      <RiveComponent />
    </>
  )
};

export default memo(Stats);
