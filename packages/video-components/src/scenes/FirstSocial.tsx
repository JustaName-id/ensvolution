import React, { ComponentProps, JSX, memo, useEffect, useState } from "react";
import { useCurrentFrame, staticFile, interpolate, Easing, delayRender, continueRender } from "remotion";
import { Rive, RiveFile, useRive } from "@rive-app/react-canvas";
import { ProfileRecord } from "@ensvolution/types";
import { RecordIcon } from "@ensvolution/components/RecordIcon";

interface FirstSocialProps {
  record: ProfileRecord;
  timestamp: string;
  riveFile: RiveFile | null;
}

export const FirstSocial: React.FC<FirstSocialProps> = ({
                                                                  record,
                                                                  timestamp,
  riveFile
                                                                }) => {
  const frame = useCurrentFrame()
  const { rive, RiveComponent } = useRive({
    riveFile: riveFile || undefined,
    animations: ['socials'],
    autoplay:false
  })
  useEffect(() => {
    if(!rive) return;
    rive.setTextRunValue("Social Handle", record.value.length > 15 ? record.value.slice(0, 15) + "..." : record.value)
    rive.setTextRunValue("Social Date", timestamp.split("T")[0])
  }, [timestamp, rive, record.value]);


  const opacity = interpolate(
    frame,
    [90, 113, 196, 220],
    [0, 1,1,0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );

  const translateY = interpolate(
    frame,
    [196, 300],
    [0, -5700],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(.42, 0, .58, 1)
    }
  );

  const translateX = interpolate(
    frame,
    [196, 300],
    [0, -15300],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(.42, 0, .58, 1)
    }
  );

  if(rive){
    rive.scrub('socials', frame/60)
  }

  return (
    <>
      <div className={"absolute flex"} style={{
        transform: `translateX(${translateX}%) translateY(${translateY}%)`,
        opacity: opacity,
        left: '40.5%',
        top: '47.8%',
        width:'3.7%',
        aspectRatio:"1 / 1",
        placeContent: 'center',
        placeItems: 'center',
      }}>
        <RecordIcon record={record} size={"90%"} color={"text-blue"} />
      </div>
      <RiveComponent />
    </>
  )
};

export default memo(FirstSocial);
