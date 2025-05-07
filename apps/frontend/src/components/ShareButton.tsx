"use client"

import { Button } from '@ensvolution/ui/components/button';
import { Download, ShareIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@ensvolution/ui/components/dialog";
import { Player } from "@remotion/player";
import { ENSVideo } from '@ensvolution/video-components/ens-video'
import { useENSProfileHistory } from "@ensvolution/hooks/use-ens-profile";
import {
  buildDurationInFrames,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH
} from "@ensvolution/constants";
import { z } from "zod";
import { ensVideoSchema } from "@ensvolution/video-components/schemas";
import { RenderControls } from "@/components/RenderControls";
import { useContractNames } from "@ensvolution/hooks/use-contract-name";
import { useEffect, useState } from "react";
interface RecordNodesButtonProps {
    ensName: string;
}

export const ShareButton: React.FC<RecordNodesButtonProps> = ({ ensName }) => {
  const { data } = useENSProfileHistory(ensName)
  const { data: resolverNames } = useContractNames(Array.from(
    new Set(
      data
        ?.map((profile) => profile.resolverAddress)
        .filter((address): address is string => !!address)
    )
  ))

  const [isJumping, setIsJumping] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(37);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationDegree(prev => (prev + 1) % 360);
    }, 50);

    const jumpInterval = setInterval(() => {
      setIsJumping(true);

      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    }, 10000);

    const initialJumpTimeout = setTimeout(() => {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }, 1000);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(jumpInterval);
      clearTimeout(initialJumpTimeout);
    };
  }, []);

  if(!data || !resolverNames) return null;
  const videoProps: z.infer<typeof ensVideoSchema> = {
    ensName: ensName,
    profileStates: data,
    resolverNames,
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`
          relative overflow-hidden
          font-bold text-white
          transition-all duration-300
          shadow-lg hover:shadow-xl
          ${isJumping ? 'transform -translate-y-4' : 'transform translate-y-0'}
        `}
            style={{
              background: `linear-gradient(${rotationDegree}deg, #E47318 -9.31%, #B613C9 115.02%)`,
            }}
          >
            <div className="relative z-10 flex items-center gap-2">
              <ShareIcon/>
              Share
            </div>

            <div
              className="absolute inset-0 opacity-30 blur-xl"
              style={{
                background: `linear-gradient(${rotationDegree + 180}deg, #E47318 -9.31%, #B613C9 115.02%)`,
              }}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{ensName || 'ENS'} Evolution Video</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Player
              component={ENSVideo}
              inputProps={videoProps}
              durationInFrames={buildDurationInFrames(videoProps)}
              fps={VIDEO_FPS}
              compositionHeight={VIDEO_HEIGHT}
              compositionWidth={VIDEO_WIDTH}
              style={{
                // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
                // but not over inline styles
                width: '100%',
              }}
              controls
              autoPlay
              loop
            />
          </div>

          <DialogFooter>
            {/*<Button variant="default" className="flex gap-2 items-center">*/}
            {/*  <Download className="h-4 w-4" />*/}
            {/*  Download Video*/}
            {/*</Button>*/}
            <RenderControls inputProps={videoProps} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
