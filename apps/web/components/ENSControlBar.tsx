import {useReactFlow, useStore} from "@xyflow/react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@workspace/ui/components/tooltip";
import {Button} from "@workspace/ui/components/button";
import {Map, ZoomIn, ZoomOut} from "lucide-react";
import {Badge} from "@workspace/ui/components/badge";
import React, {useCallback, useEffect} from "react";
import {LineNode, ProfileNode, ResolverNode} from "@/lib/types/ens-profile";
import {getColor} from "@/lib/utils";

export interface ENSControlBarProps {
    nodes: (ResolverNode | LineNode | ProfileNode)[]
}

export const ENSControlBar: React.FC<ENSControlBarProps> = ({nodes}) => {
    const {zoomOut, zoomIn, fitView} = useReactFlow()
    const {transform} = useStore(({transform}) => ({transform}));

    const fit = useCallback(() => {
        if (nodes.length === 0) return
        fitView({
            nodes: nodes.map(node => ({
                id: node.id
            })),
            duration: 1000,
            padding: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
            }
        })
    }, [nodes])

    useEffect(() => {
        fit()
    }, [nodes]);
    return (
        <>
            <div className={"top-2 left-2 absolute z-50 flex space-x-1 "}>
                <div className="z-50 bg-background rounded-md border p-3 w-[148px]">
                    <div className="font-semibold text-sm">Profile Legend:</div>
                    <ul className="text-xs sm:text-sm mt-2 space-y-1">
                        <li className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 rounded-full"
                                  style={{backgroundColor: getColor("text")}}></span>
                            Text Changes
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 rounded-full"
                                  style={{backgroundColor: getColor("addr")}}></span>
                            Address Changes
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 rounded-full"
                                  style={{backgroundColor: getColor("resolver")}}></span>
                            Resolver Changed
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 rounded-full"
                                  style={{backgroundColor: getColor("multi")}}></span>
                            Multiple Changes
                        </li>
                    </ul>

                    <div className="font-semibold text-sm mt-3">Data Legend:</div>
                    <ul className="text-xs sm:text-sm mt-2 space-y-1">
                        <li className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 bg-green-500"></span>
                            Added Records
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 bg-blue-500"></span>
                            Updated Records
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 bg-red-500"></span>
                            Removed Records
                        </li>
                    </ul>
                </div>
            </div>
            <div className="top-2 left-[190px] absolute z-50 flex-1">
                <div className="flex items-center space-x-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost"
                                        onClick={() => zoomIn()}
                                        className="h-8 w-8">
                                    <ZoomIn size={16}/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Zoom In</TooltipContent>
                        </Tooltip>
                        <Badge variant="outline" className="w-12  bg-background">
                            {Math.round(transform[2] * 100)}%
                        </Badge>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost"
                                        onClick={() => zoomOut()}
                                        className="h-8 w-8">
                                    <ZoomOut size={16}/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Zoom Out</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost"
                                        onClick={() => {
                                            fit()
                                        }}
                                        className="h-8 w-8">
                                    <Map size={16}/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Reset View</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </>

    )
}