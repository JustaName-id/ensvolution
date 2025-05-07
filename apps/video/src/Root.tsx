import './index.css';
import '@ensvolution/ui/globals.css';
import '@justweb3/widget/styles.css'
import "@xyflow/react/dist/style.css"
import { Composition } from "remotion";
import { ENSVideo } from '@ensvolution/video-components/ens-video';
import { ensVideoSchema } from "@ensvolution/video-components/schemas";
// import { nick } from "./example/nick";
import { slobo } from "./example/slobo";
import {
  buildDurationInFrames,
} from "@ensvolution/constants";

export const RemotionRoot: React.FC = () => {
  const defaultProps = slobo;

  return (
    <>
      <Composition
        id="ENSVideo"
        component={ENSVideo}
        durationInFrames={3000}
        fps={60}
        width={1920}
        height={1080}
        schema={ensVideoSchema}
        defaultProps={defaultProps}
        calculateMetadata={async ({props}) => {
          return {
            durationInFrames: buildDurationInFrames(props),
          };
        }}
      />
    </>
  );
};
