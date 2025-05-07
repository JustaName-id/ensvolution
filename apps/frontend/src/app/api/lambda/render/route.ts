import {
  speculateFunctionName,
  AwsRegion,
  renderMediaOnLambda, RenderMediaOnLambdaOutput
} from "@remotion/lambda/client";
import {  RenderRequest } from "@ensvolution/video-components/schemas";
import { DISK, RAM, TIMEOUT, REGION, SITE_NAME } from "@ensvolution/video-components/config";
import { executeApi } from "@/helpers/api-response";


export const POST = executeApi<RenderMediaOnLambdaOutput, typeof RenderRequest>(
  RenderRequest,
  async (req, body) => {
    if (
      !process.env.AWS_ACCESS_KEY_ID &&
      !process.env.REMOTION_AWS_ACCESS_KEY_ID
    ) {
      throw new TypeError(
        "Set up Remotion Lambda to render videos. See the README.md for how to do so.",
      );
    }
    if (
      !process.env.AWS_SECRET_ACCESS_KEY &&
      !process.env.REMOTION_AWS_SECRET_ACCESS_KEY
    ) {
      throw new TypeError(
        "The environment variable REMOTION_AWS_SECRET_ACCESS_KEY is missing. Add it to your .env file.",
      );
    }

    const result = await renderMediaOnLambda({
      codec: "h264",
      functionName: speculateFunctionName({
        diskSizeInMb: DISK,
        memorySizeInMb: RAM,
        timeoutInSeconds: TIMEOUT,
      }),
      region: REGION as AwsRegion,
      serveUrl: SITE_NAME,
      composition: body.id,
      inputProps: body.inputProps,
      imageFormat:"png",
      scale:1.5,
      downloadBehavior: {
        type: "download",
        fileName: body.inputProps.ensName +".mp4",
      },
    });

    return result;
  },
);
