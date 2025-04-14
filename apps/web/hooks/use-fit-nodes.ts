import {useCallback} from 'react';
import {Node, useReactFlow, Viewport} from '@xyflow/react';

interface FitNodesOptions {
    padding?: number;
    immediate?: boolean;
    minZoom?: number;
    maxZoom?: number;
    offsetX?: number; 
    offsetY?: number;
}

export function useFitNodes() {
    const { getNodes, setViewport } = useReactFlow();

    return useCallback((
        nodeIds: string[],
        options: FitNodesOptions = {}
    ): void => {
        const {
            padding = 50,
            immediate = false,
            minZoom = 0.2,
            maxZoom = 2,
            offsetX = 0, 
            offsetY = 0  
        } = options;

        
        if (!nodeIds || nodeIds.length === 0) return;

        
        const nodes = getNodes().filter(node => nodeIds.includes(node.id));

        
        if (nodes.length === 0) return;

        
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        
        nodes.forEach((node: Node) => {
            const nodeWidth = node.width || 150;  
            const nodeHeight = node.height || 50;  

            minX = Math.min(minX, node.position.x);
            minY = Math.min(minY, node.position.y);
            maxX = Math.max(maxX, node.position.x + nodeWidth);
            maxY = Math.max(maxY, node.position.y + nodeHeight);
        });

        
        minX -= padding;
        minY -= padding;
        maxX += padding;
        maxY += padding;

        
        const width = maxX - minX;
        const height = maxY - minY;

        
        const centerX = minX + width / 2 + offsetX;
        const centerY = minY + height / 2 + offsetY;

        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const scaleX = viewportWidth / width;
        const scaleY = viewportHeight / height;
        let zoom = Math.min(scaleX, scaleY);

        
        zoom = Math.max(minZoom, Math.min(zoom, maxZoom));

        
        const newViewport: Viewport = {
            x: viewportWidth / 2 - centerX * zoom,
            y: viewportHeight / 2 - centerY * zoom,
            zoom,
        };

        setViewport(
            newViewport,
            {duration: immediate ? 0 : 1000}
        );
    }, [getNodes, setViewport]);
}