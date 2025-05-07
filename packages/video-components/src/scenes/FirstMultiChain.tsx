import React, { ComponentProps, JSX, memo, useEffect, useState } from "react";
import { useCurrentFrame, staticFile, interpolate, Easing, delayRender, continueRender } from "remotion";
import { Rive, RiveFile, useRive } from "@rive-app/react-canvas";
import { ProfileRecord } from "@ensvolution/types";
import { RecordIcon } from "@ensvolution/components/RecordIcon";

interface FirstMultiChainProps {
  record: ProfileRecord;
  timestamp: string;
  riveFile: RiveFile | null;
}

export const FirstMultiChain: React.FC<FirstMultiChainProps> = ({
                                                                  record,
                                                              timestamp,
  riveFile
                                                            }) => {
  const frame = useCurrentFrame()

  const { rive, RiveComponent } = useRive({
    riveFile: riveFile || undefined,
    animations: ['multichain'],
    autoplay:false
  })

  useEffect(() => {
    if(!rive) return;
    rive.setTextRunValue("MultiChain Address", record.value)
    rive.setTextRunValue("MultiChain Date", timestamp.split("T")[0])
  }, [timestamp, rive, record.value]);


  const opacity = interpolate(
    frame,
    [114, 120, 180, 220],
    [0, 1,1,0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );

  const translateY = interpolate(
    frame,
    [195, 300],
    [0, -13300],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(.42, 0, .58, 1)
    }
  );

  const translateX = interpolate(
    frame,
    [195, 300],
    [0, -6000],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(.42, 0, .58, 1)
    }
  );

  if(rive){
    rive.scrub('multichain', frame/60)
  }

  return (
    <>
      <div className={"absolute flex center"} style={{
        transform: `translateX(${translateX}%) translateY(${translateY}%)`,
        opacity: opacity,
        left: "84.5%",
        top:"55%",
        aspectRatio:"1 / 1",
        width:'3.7%',
      }}>
        <RecordIcon record={record} size={"90%"} />
      </div>
      <RiveComponent />
    </>
  )
};

export default memo(FirstMultiChain);
