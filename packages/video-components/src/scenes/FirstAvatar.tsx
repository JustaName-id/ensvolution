import React, { memo, useEffect, useState } from "react";
import { useCurrentFrame, interpolate, staticFile, Easing, Img, delayRender, continueRender } from "remotion";
import { ProfileRecord } from "@ensvolution/types";
import { RiveFile, useRive } from "@rive-app/react-canvas";

interface FirstAvatarProps {
  record: ProfileRecord;
  timestamp: string;
  riveFile: RiveFile | null;
}

const FirstAvatar: React.FC<FirstAvatarProps> = ({ record, timestamp, riveFile}) => {
  const frame = useCurrentFrame()
  const [error, setError] = React.useState<boolean>(false);

  const { rive, RiveComponent } = useRive({
    riveFile: riveFile || undefined,
    artboard:"Artboard",
    animations: ['First Avatar'],
    autoplay:false
  })
  const scaleUp = interpolate(
    frame,
    [72, 97],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0, .59, .58, 1)
    }
  );

  const translateY = interpolate(
    frame,
    [251, 300],
    [0, -790],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(.42, 0, .58, 1)
    }
  );

  useEffect(() => {
    if(!rive) return;
    rive.setTextRunValue("Avatar Date", timestamp.split("T")[0])
  }, [timestamp, rive]);

  if(rive){
    rive.scrub('First Avatar', frame/60)
  }


  return (
    <>
      <div className={"absolute"} style={{
        left: "47%",
        top:"32%",
        width: '21%',
        aspectRatio: '1 / 1'
      }}>
        <div style={{
          transform: `scale(${scaleUp}) translateY(${translateY}%)`,
          borderRadius: '16px',
          display: 'flex',
          placeContent:"center",
          placeItems:"center"
        }}>
          {
          error ?
            <svg stroke="#2d92f3" fill="#2d92f3" strokeWidth="0" viewBox="0 0 256 256" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16h64a8,8,0,0,0,7.59-5.47l14.83-44.48L163,151.43a8.07,8.07,0,0,0,4.46-4.46l14.62-36.55,44.48-14.83A8,8,0,0,0,232,88V56A16,16,0,0,0,216,40ZM117,152.57a8,8,0,0,0-4.62,4.9L98.23,200H40V160.69l46.34-46.35a8,8,0,0,1,11.32,0l32.84,32.84Zm115-30.84V200a16,16,0,0,1-16,16H137.73a8,8,0,0,1-7.59-10.53l7.94-23.8a8,8,0,0,1,4.61-4.9l35.77-14.31,14.31-35.77a8,8,0,0,1,4.9-4.61l23.8-7.94A8,8,0,0,1,232,121.73Z"></path></svg>
            :
            <Img
              src={record?.value}
              alt="avatar"
              maxRetries={0}
              style={{
                borderRadius: '16px',
                width: "100%",
                height: "100%",
              }}
              onError={() => setError(true)}
            />
        }
        </div>

      </div>
      <RiveComponent />
    </>
  )
};


export default memo(FirstAvatar);
