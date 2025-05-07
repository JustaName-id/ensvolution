import React, { memo, useEffect, useState } from "react";
import { continueRender, delayRender, staticFile, useCurrentFrame } from "remotion";
import { RiveFile, useRive } from "@rive-app/react-canvas";

interface IntroProps {
  ensName: string;
  riveFile: RiveFile
}

const Intro: React.FC<IntroProps> = ({ ensName, riveFile }) => {
  const frame = useCurrentFrame();

  const { rive, RiveComponent } = useRive({
    riveFile: riveFile ,
    animations: ['Timeline 1'],
    autoplay:false
  })

  useEffect(() => {
    if(!rive) return;
    rive.setTextRunValue("ENS Name", ensName + "")
  }, [ensName, rive]);

  if(rive){
    rive.scrub('Timeline 1', frame/60)
  }

  return (
    <RiveComponent />
  )
};

export default memo(Intro);
