import { ensVideoSchema } from "@ensvolution/video-components/schemas";
import { z } from "zod";
import {
  getFirstAvatar,
  getFirstContentHash,
  getFirstCustomField,
  getFirstMultiChainAddress,
  getFirstResolverChange,
  getFirstSocial,
  getPowerUserMoment
} from "@ensvolution/video-components/utils";

export const buildDurationInFrames = ({ profileStates }: z.infer<typeof ensVideoSchema>) => {
  const firstAvatar = getFirstAvatar(profileStates);
  const firstResolverChange = getFirstResolverChange(profileStates);
  const firstMultiChain = getFirstMultiChainAddress(profileStates);
  const firstSocial = getFirstSocial(profileStates);
  const firstContentHash = getFirstContentHash(profileStates);
  const powerUserMoment = getPowerUserMoment(profileStates);
  const customField = getFirstCustomField(profileStates);

  return (
    260 +
    (firstAvatar ? 300 : 0) +
    (firstResolverChange ? 260 : 0) +
    (firstMultiChain ? 260 : 0) +
    (firstSocial ? 300 : 0) +
    (firstContentHash ? 300 : 0) +
    (powerUserMoment ? 300 : 0) +
    (customField ? 300 : 0) +
    300
  );
};
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 60;


