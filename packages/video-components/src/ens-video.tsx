import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, Sequence, staticFile } from "remotion";
import {
  getFirstAvatar,
  getFirstResolverChange,
  getFirstMultiChainAddress,
  getFirstSocial,
  getFirstContentHash,
  getPowerUserMoment,
  getStats,
  getProfileStart, getFirstCustomField
} from "./utils/milestones";
import { ProfileStateWithChanges } from "@ensvolution/types";
import Intro from './scenes/Intro';
import FirstAvatar from './scenes/FirstAvatar';
import FirstResolver from "./scenes/FirstResolver";
import FirstMultiChain from "./scenes/FirstMultiChain";
import FirstSocial from './scenes/FirstSocial';
import FirstContentHash from "./scenes/FirstContentHash";
import FirstCustom from "./scenes/FirstCustom";
import Stats from "./scenes/Stats";
import { useRive, useRiveFile } from "@rive-app/react-canvas";
import FirstBatch from './scenes/FirstBatch';
import Outro from "./scenes/Outro";

export const ENSVideo: React.FC<{ ensName: string, profileStates: ProfileStateWithChanges[], resolverNames: { resolverAddress: string, contractName: string}[] }> = ({
                                                                                ensName,
                                                                                profileStates,
  resolverNames
                                                                              }) => {

  const [handle] = useState(() => delayRender());

  const { riveFile, status } = useRiveFile({
    src: staticFile('/ensvolution.riv'),
  })

  useEffect(() => {
    if(status==="success"){
      continueRender(handle);
    }
  }, [handle, riveFile, status]);

  const firstAvatar = getFirstAvatar(profileStates);
  const firstResolverChange = getFirstResolverChange(profileStates);
  const firstMultiChain = getFirstMultiChainAddress(profileStates);
  const firstSocial = getFirstSocial(profileStates);
  const firstContentHash = getFirstContentHash(profileStates);
  const powerUserMoment = getPowerUserMoment(profileStates);
  const customField = getFirstCustomField(profileStates);
  const stats = getStats(profileStates);

  let frameCursor = 0;
  const sequences = [];
  const welcomeDuration = 260;
  let score = 0;

  if(!riveFile || status!=='success') return null

  sequences.push(
    <Sequence name={"Welcome"} key="welcome" from={frameCursor} durationInFrames={welcomeDuration}>
      <Intro ensName={ensName} riveFile={riveFile}  />
    </Sequence>
  );

  frameCursor += welcomeDuration;


  if(firstAvatar){
    const firstAvatarDuration = 300;
    sequences.push(
      <Sequence name={"First Avatar"} key="firstavatar" from={frameCursor} durationInFrames={firstAvatarDuration}>
        <FirstAvatar {...firstAvatar} riveFile={riveFile} />
      </Sequence>
    );
    frameCursor += firstAvatarDuration;
    score+=1;
  }

  if(firstResolverChange){
    const firstResolverDuration = 300;
    sequences.push(
      <Sequence name={"First Resolver"} key="firstresolver" from={frameCursor} durationInFrames={firstResolverDuration}>
        <FirstResolver {...firstResolverChange} resolverNames={resolverNames} riveFile={riveFile}   />
      </Sequence>
    );
    frameCursor += firstResolverDuration;
    score+=1;
  }

  if(firstMultiChain){
    const firstMultiChainDuration = 260;
    sequences.push(
      <Sequence name={"First MultiChain"} key="firstmultiChain" from={frameCursor} durationInFrames={firstMultiChainDuration}>
        <FirstMultiChain {...firstMultiChain}   riveFile={riveFile} />
      </Sequence>
    );
    frameCursor += firstMultiChainDuration;
    score+=1;
  }

  if(firstSocial){
    const firstSocialDuration = 260;
    sequences.push(
      <Sequence name={"First Social"} key="firstSocial" from={frameCursor} durationInFrames={firstSocialDuration}>
        <FirstSocial {...firstSocial}  riveFile={riveFile} />
      </Sequence>
    );
    frameCursor += firstSocialDuration;
    score+=1;
  }

  if(firstContentHash){
    const firstContentHashDuration = 300;
    sequences.push(
      <Sequence name={"First Content Hash"} key="firstContentHashDuration" from={frameCursor} durationInFrames={firstContentHashDuration}>
        <FirstContentHash {...firstContentHash}  riveFile={riveFile} />
      </Sequence>
    );
    frameCursor += firstContentHashDuration;
    score+=1;
  }

  if(powerUserMoment){
    const powerUserMomentDuration = 300;
    sequences.push(
      <Sequence name={"Power User Moment"} key="powerUserMomentDuration" from={frameCursor} durationInFrames={powerUserMomentDuration}>
        <FirstBatch {...powerUserMoment}  riveFile={riveFile} />
      </Sequence>
    );
    frameCursor += powerUserMomentDuration;
    score+=1;
  }

  if(customField){
    const customFieldDuration = 300;
    sequences.push(
      <Sequence name={"Custom Field"} key="customFieldDuration" from={frameCursor} durationInFrames={customFieldDuration}>
        <FirstCustom {...customField}  riveFile={riveFile} />
      </Sequence>
    );
    frameCursor += customFieldDuration;
    score+=1;
  }

  const statsDuration = 300;

  sequences.push(
    <Sequence name={"Stats"} key="stats" from={frameCursor} durationInFrames={statsDuration}>
      <Stats {...stats}  riveFile={riveFile}  />
    </Sequence>
  )

  frameCursor += statsDuration;

  return (
    <AbsoluteFill style={{backgroundColor: '#ffffff'}}>
      {sequences}
      <Sequence name={"Outro"} key={"outro"} from={frameCursor - statsDuration + 130} durationInFrames={frameCursor}>
        <Outro
          score={score}  riveFile={riveFile}  />
      </Sequence>
    </AbsoluteFill>
  )
};
