import {useReactFlow, useStore} from "@xyflow/react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@ensvolution/ui/components/tooltip";
import {Button} from "@ensvolution/ui/components/button";
import {Map, ZoomIn, ZoomOut} from "lucide-react";
import {Badge} from "@ensvolution/ui/components/badge";
import React, {useCallback, useEffect} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@ensvolution/ui/components/accordion";
import {useIsMobile} from "@ensvolution/ui/hooks/use-mobile";
import { LineNode, ProfileNode, ResolverNode } from '@ensvolution/types';
import { getColor } from '@ensvolution/helpers';

export interface ENSControlBarProps {
    nodes: (ResolverNode | LineNode | ProfileNode)[]
}

export const ENSControlBar: React.FC<ENSControlBarProps> = ({nodes}) => {
    const {zoomOut, zoomIn, fitView} = useReactFlow()
    const {transform} = useStore(({transform}) => ({transform}));
    const isMobile = useIsMobile()
    const fit = useCallback(() => {
        if (nodes.length === 0) return
        fitView({
            nodes: [...nodes.filter(node => node.type==="resolver").map(node => ({
                id: node.id
            })),

                ...nodes.filter(node => node.type === "profile").slice(0,
                    isMobile ? 5 : 10
                ).map(node => ({
                    id: node.id
                })),
            ],
            duration: 1000,
        })
    }, [nodes])

    useEffect(() => {
        fit()
    }, [nodes]);
    return (
        <>
            <Accordion type="single" collapsible className="top-2 left-2 absolute z-50 bg-background rounded-md border w-[161px]" defaultValue={"item-1"}>
                <AccordionItem value="item-1">
                    <AccordionTrigger className={"py-1 px-2"}>
                        Legend
                    </AccordionTrigger>
                    <AccordionContent className={"p-0"}>
                        <div className={" flex space-x-1 p-2 flex-1"}>
                            <div>
                                <div className="font-semibold text-xs">Card Legend:</div>
                                <ul className="text-xs sm:text-xs space-y-1 mt-1">
                                    <li className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full"
                                  style={{backgroundColor: getColor("text")}}></span>
                                        Text Changes
                                    </li>
                                    <li className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full"
                                  style={{backgroundColor: getColor("addr")}}></span>
                                        Address Changes
                                    </li>
                                    <li className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full"
                                  style={{backgroundColor: getColor("resolver")}}></span>
                                        Resolver Changed
                                    </li>
                                    <li className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full"
                                  style={{backgroundColor: getColor("contentHash")}}></span>
                                        ContentHash Changed
                                    </li>
                                    <li className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full"
                                  style={{backgroundColor: getColor("multi")}}></span>
                                        Multiple Changes
                                    </li>
                                </ul>

                                <div className="font-semibold text-xs mt-1">Data Legend:</div>
                                <ul className="text-xs sm:text-xs mt-2 space-y-1">
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 bg-green-500"></span>
                                        Added Records
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 bg-blue-500"></span>
                                        Updated Records
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 bg-red-500"></span>
                                        Removed Records
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="bottom-12 sm:bottom-4 right-4 absolute z-50 flex-1">
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
