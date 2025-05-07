import { continueRender, delayRender, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ComponentProps, JSX, memo, useMemo, useState } from "react";
import { Rive, RiveFile, useRive } from "@rive-app/react-canvas";
import { Stats } from "@ensvolution/video-components/scenes/Stats";

export interface OutroProps {
  score: number;
  riveFile: RiveFile | null;
}

function divideIntoSteps(totalFrames: number, divider: number): number[] {
  const result: number[] = [];

  for (let i = 0; i < divider; i++) {
    result.push(i * (totalFrames / divider));
  }

  return result;
}

const Outro: React.FC<OutroProps> = ({ score, riveFile}) => {

  const { rive, RiveComponent } = useRive({
    riveFile: riveFile || undefined,
    animations: ['DNS Refugee', 'CitizENS', 'ENS Mayor', 'ENS Emperor'],
    artboard: "Artboard 2",
    autoplay:false
  })
  const frame = useCurrentFrame();
  const totalFrames = 60;

  const maxLevel = useMemo(() => {
    if (score <= 2) return 1;
    if (score >= 3 && score <= 4) return 2;
    if (score >= 5 && score <= 6) return 3;
    return 4;
  }, [score]);

  const segments = useMemo(() => {
    return divideIntoSteps(totalFrames, maxLevel);
  }, [maxLevel]);

  const getCurrentSegment = () => {
    for (let i = segments.length - 1; i >= 0; i--) {
      if (frame >= segments[i]) {
        return i;
      }
    }
    return 0;
  };

  const getOpacityForLevel = (level: number) => {
    const currentSegment = getCurrentSegment();

    if (currentSegment < level) return 0;

    if (currentSegment > level) return 0;

    const segmentStart = segments[level];
    const segmentEnd = level < segments.length - 1 ? segments[level + 1] : totalFrames;
    const segmentLength = segmentEnd - segmentStart;

    const halfSegment = segmentLength / 2;
    const relativeFrame = frame - segmentStart;

    if (relativeFrame < halfSegment) {
      return interpolate(relativeFrame, [0, halfSegment], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    } else {
      if (level < maxLevel - 1) {
        return interpolate(relativeFrame, [halfSegment, segmentLength], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
      }
      return 1;
    }
  };



  const scoreAnimations = () => {
    if (score <= 2) {
      return "DNS Refugee";
    }
    if (score >= 3 && score <= 4) {
      return "CitizENS";
    }
    if (score >= 5 && score <= 6) {
      return "ENS Mayor";
    }
    if (score >= 7) {
      return "ENS Emperor";
    }
    return "DNS Refugee";
  };

  if (rive) {
    rive.scrub(scoreAnimations(), frame / 60);
  }

  const generalOpacity = interpolate(
    frame,
    [0,145,169],
    [1,1, 0],
    {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    });

  return (
    <>
      <div className={"absolute"} style={{
        left: '29%',
        top: '55%',
        right: '29%',
        height: '30%',
        opacity: generalOpacity,
      }}>
        <RiveComponent width={'100%'} />
      </div>
      <div className={"absolute"} style={{
        left: '10%',
        top: '49%',
        right: '10%',
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <span style={{
          position: 'absolute',
          fontSize: '70px',
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 'bold',
          color: '#e400d1',
          opacity: Math.min(generalOpacity, getOpacityForLevel(0))
        }}>DNS Refugee</span>

        <span style={{
          position: 'absolute',
          fontSize: '70px',
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 'bold',
          color: '#e46e00',
          opacity: Math.min(generalOpacity, getOpacityForLevel(1))
        }}>ENSthusiast</span>

        <span style={{
          position: 'absolute',
          fontSize: '70px',
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 'bold',
          color: '#00e4d5',
          opacity: Math.min(generalOpacity, getOpacityForLevel(2))
        }}>CitizENS</span>

        <span style={{
          position: 'absolute',
          fontSize: '70px',
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 'bold',
          color: '#007ae4',
          opacity: Math.min(generalOpacity, getOpacityForLevel(3))
        }}>The Namefather</span>
      </div>
    </>
  );
};

export default memo(Outro);
