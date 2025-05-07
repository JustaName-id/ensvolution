"use client"

import React from 'react';
import {MousePointer, Grab} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@ensvolution/ui/components/alert';
import {useIsMobile} from "@ensvolution/ui/hooks/use-mobile";


const InstructionAlert: React.FC = () => {
    const isMobile = useIsMobile();
    return (
        <div className="flex flex-row py-2 px-4 border-b-1">
            {
                isMobile ? <Grab className={"h-4 w-4 my-auto"} />
                    : <MousePointer className="h-4 w-4 my-auto"/>
            }
            <div className="ml-4">
                <div className="alert-title">Navigation</div>
                <div className="alert-description text-xs sm:text-sm">
                    {isMobile
                        ? "Drag to pan | Pinch to zoom | Tap a profile to see details"
                        : "Click and drag to pan | Scroll to zoom | Click a profile to see details"}
                </div>
            </div>
        </div>
    );
};

export default InstructionAlert;
