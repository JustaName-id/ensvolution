import React, { ComponentProps, JSX, memo, useEffect, useState } from "react";
import { useCurrentFrame, staticFile, delayRender, continueRender } from "remotion";
import { Rive, RiveFile, useRive } from "@rive-app/react-canvas";

interface FirstResolverProps {
  address: string;
  timestamp: string;
  resolverNames: { resolverAddress: string, contractName: string}[]
  riveFile: RiveFile | null;
}

const FirstResolver: React.FC<FirstResolverProps> = ({
  address,
  timestamp,
  resolverNames,
  riveFile
                                                            }) => {
  const frame = useCurrentFrame()
  const { rive, RiveComponent } = useRive({
    riveFile: riveFile || undefined,
    animations: ['First Resolver'],
    autoplay:false
  })

  useEffect(() => {
    if(!rive) return;
    rive.setTextRunValue("Resolver Address", address)
    rive.setTextRunValue("Resolver Name", resolverNames.find(resolver => resolver.resolverAddress.toLowerCase() === address.toLowerCase())?.contractName || "Name Not Found")
    rive.setTextRunValue("Resolver Date", timestamp.split("T")[0])
  }, [timestamp, address, resolverNames, rive]);


  if(rive){
    rive.scrub('First Resolver', frame/60)
  }

  return (
    <>
      <RiveComponent />
    </>
  )
};

export default memo(FirstResolver);
