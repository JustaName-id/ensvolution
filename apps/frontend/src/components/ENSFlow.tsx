"use client"

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@ensvolution/ui/components/alert';
import {AlertTriangle} from 'lucide-react';
import {
  Background,
  MiniMap,
  MiniMapNodeProps,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import InstructionAlert from "@/components/InstructionAlert";
import {ENSControlBar} from "@/components/ENSControlBar";
import ENSProfileNode from '@/components/nodes/ENSProfileNode';
import ResolverCardNode from '@/components/nodes/ResolverCardNode';
import { useENSProfileHistory } from '@ensvolution/hooks/use-ens-profile';
import { useENSFlow } from '@ensvolution/hooks/use-ens-flow';
import { LineNode, ProfileNode, ResolverNode } from '@ensvolution/types';
import { getColorByProfile } from '@ensvolution/helpers';
import ResolverLineNode from '@/components/nodes/ResolverLineNode';
import ENSBadgeEdge from '@/components/edges/ENSBadgeEdge';

export interface ENSFlowProps {
    ensName?: string;
}

const ENSFlow: React.FC<ENSFlowProps> = ({
                                             ensName = 'nick.eth'
                                         }) => {
    const { data: profileStates, isLoading, error, isError } = useENSProfileHistory(ensName);
    const { nodes: ensNodes, edges: ensEdges, resolverNodes, lineNodes } = useENSFlow(profileStates);

    if (isLoading) {
        return (
            <div className="w-full h-screen bg-background flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div
                            className="w-12 h-12 border-4 border-foreground border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p>Loading profile data for {ensName}...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !profileStates || profileStates.length === 0) {
        return (
            <div className="w-full h-screen bg-background flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center max-w-md">
                        <Alert variant="destructive" className="mb-4">
                            <AlertTriangle className="h-4 w-4"/>
                            <AlertTitle>Error Loading ENS Data</AlertTitle>
                            <AlertDescription>
                                {error?.message || `Failed to load profile data for ${ensName}`}
                            </AlertDescription>
                        </Alert>
                        <p className="text-muted-foreground">
                            Make sure the ENS name is valid and try again. If the problem persists,
                            the ENSNode API might be unavailable.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-screen flex flex-col">
            <InstructionAlert />
          <ReactFlowProvider>

          <ReactFlow
                nodeTypes={{
                    "profile": ENSProfileNode,
                    "resolver": ResolverCardNode,
                    "line":ResolverLineNode
                }}
                nodes={[...ensNodes, ...resolverNodes,...lineNodes]}
                edgeTypes={{
                    "ens-edge": ENSBadgeEdge
                }}
                edges={ensEdges}
                minZoom={0.2}
                maxZoom={4}
                defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            >
                <MiniMap
                    nodeComponent={MiniMapNode}
                    nodeStrokeWidth={4}
                    pannable zoomable
                    position={"bottom-left"}
                    nodeColor={(node: ProfileNode | ResolverNode | LineNode) => {
                        if(node.type === "line") return "#000000"
                        if(node.type === "resolver") return "#000000"

                        let profileNode = node as ProfileNode;
                        return getColorByProfile(profileNode.data)
                    }}
                />
                <Background gap={13} size={1} />


                <ENSControlBar nodes={[...ensNodes, ...resolverNodes,...lineNodes]} />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
    );
};

export default ENSFlow;


const MiniMapNode: React.FC<MiniMapNodeProps> = ({ x, y, height, width, color, ...rest} )=> {
    return <rect x={x} y={y} height={height} width={width} fill={color}  />;
}
