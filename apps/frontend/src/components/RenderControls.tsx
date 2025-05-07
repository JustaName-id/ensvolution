import { z } from "zod";
import { ProgressBar } from "./ProgressBar";
import { useRendering } from "../helpers/use-rendering";
import { ensVideoSchema } from "@ensvolution/video-components/schemas";
import { Button } from "@ensvolution/ui/components/button";

export const RenderControls: React.FC<{
  inputProps: z.infer<typeof ensVideoSchema>;
}> = ({ inputProps }) => {
  const { renderMedia, state, undo } = useRendering("ENSVideo", inputProps);

  const downloadUrl = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRender = async () => {
    undo()
    await renderMedia();
  }

  const handleDownload = async () => {
    if(state.status === "done"){
      downloadUrl(
        state.url,
        inputProps.ensName + '.mp4')
      undo()
    }
    else{
      await handleRender()
    }
  };


  return (
    <div className="flex w-full">
      <Button
        disabled={state.status === 'invoking' || state.status === 'rendering'}
        variant={state.status==="done" ? "default":"outline"}
        onClick={handleDownload}
        style={{
          width: state.status==="done" ? "100%" : undefined,
        }}
      >
        { state.status === "done" ? "Download": "Render Video"}
      </Button>

      {(state.status === 'rendering') && (
        <ProgressBar
          progress={state.status === 'rendering' ? state.progress : 1}
        />
      )}
    </div>
    // <div className="border border-unfocused-border-color p-geist rounded-geist bg-background flex flex-col">
    //   {state.status === "init" ||
    //   state.status === "invoking" ||
    //   state.status === "error" ? (
    //     <>
    //       <div className="w-geist-quarter h-geist-quarter" />
    //       <div className="self-end">
    //         <Button
    //           disabled={state.status === "invoking"}
    //           // loading={state.status === "invoking"}
    //           onClick={renderMedia}
    //         >
    //           Render video
    //         </Button>
    //       </div>
    //       {state.status === "error" ? (
    //           <div className="text-geist-error font-geist py-geist-half">
    //             <svg
    //               fill="none"
    //               shapeRendering="geometricPrecision"
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               viewBox="0 0 24 24"
    //               className="h-5 align-text-bottom mr-1.5 inline"
    //             >
    //               <circle cx="12" cy="12" r="10" fill="var(--geist-fill)"></circle>
    //               <path d="M12 8v4" stroke="currentColor"></path>
    //               <path d="M12 16h.01" stroke="currentColor"></path>
    //             </svg>
    //             <strong>Error:</strong> {state.error.message}
    //           </div>
    //       ) : null}
    //     </>
    //   ) : null}
    //   {state.status === "rendering" || state.status === "done" ? (
    //     <>
    //       <ProgressBar
    //         progress={state.status === "rendering" ? state.progress : 1}
    //       />
    //       <div className="w-geist-quarter h-geist-quarter" />
    //       <div className="self-end">
    //         <DownloadButton undo={undo} state={state}></DownloadButton>
    //       </div>
    //     </>
    //   ) : null}
    // </div>
  );
};
