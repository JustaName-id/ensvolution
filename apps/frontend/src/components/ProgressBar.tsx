import React, { useMemo } from "react";

export const ProgressBar: React.FC<{
  progress: number;
}> = ({ progress }) => {
  const fill: React.CSSProperties = useMemo(() => {
    return {
      width: `${progress * 100}%`,
    };
  }, [progress]);

  return (
    <div className={"flex w-full"}>
      <div className="w-full h-2.5 rounded-md bg-gray-100 appearance-none bg-unfocused-border-color my-auto mx-2">
        <div
          className="bg-foreground h-2.5 rounded-md transition-all ease-in-out duration-100"
          style={fill}
        ></div>
      </div>
      <div className={"flex flex-col"}>
        <span className={"my-auto"}>{(progress*100).toFixed(0)}%/100%</span>
      </div>

    </div>
  );
};
