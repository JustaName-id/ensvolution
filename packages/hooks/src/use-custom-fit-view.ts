import { useCallback } from 'react';
import { useReactFlow, Viewport, Node, FitViewOptions } from '@xyflow/react';
import type { Rect } from '@xyflow/system';

/**
 * A custom hook that provides a fitView function with intelligent transitions
 * to avoid unnecessary zooming out and in when nodes have similar dimensions.
 */
export function useCustomFitView() {
  const {
    getNodes,
    getNodesBounds,
    setViewport,
    getViewport,
    fitView
  } = useReactFlow();

  /**
   * Fits the view to specified nodes with a linear transition,
   * optimizing the animation to avoid unnecessary zoom changes.
   *
   * @param options - Configuration options
   * @param options.nodes - Array of node IDs or node objects to fit view to. If undefined, uses all nodes.
   * @param options.duration - Duration of transition in milliseconds. Default is 800ms.
   * @param options.padding - Padding around the nodes as a fraction. Default is 0.1 (10%).
   * @param options.minZoom - Minimum zoom level. Default is 0.1.
   * @param options.maxZoom - Maximum zoom level. Default is 2.
   * @param options.includeHiddenNodes - Whether to include hidden nodes. Default is false.
   * @returns Promise that resolves when the transition is complete
   */
  const smartFitView = useCallback(async (options?: {
    nodes?: (string | Node)[];
    duration?: number;
    padding?: number;
    minZoom?: number;
    maxZoom?: number;
    includeHiddenNodes?: boolean;
  }): Promise<boolean> => {
    const {
      nodes: nodesProp,
      duration = 800,
      padding = 0.1,
      minZoom = 0.1,
      maxZoom = 2,
      includeHiddenNodes = false,
    } = options || {};

    // Get all nodes if none specified
    const allNodes = getNodes();

    // If no nodes, we can't fit view
    if (allNodes.length === 0) {
      return false;
    }

    // Convert node IDs to actual nodes
    const targetNodes = nodesProp
      ? nodesProp.map(node => typeof node === 'string'
        ? allNodes.find(n => n.id === node)
        : node).filter(Boolean) as Node[]
      : allNodes;

    if (targetNodes.length === 0) {
      return false;
    }

    // Handle single node case - just use regular fitView for simplicity
    if (targetNodes.length === 1) {
      return fitView({
        nodes: targetNodes,
        duration,
        padding,
        minZoom,
        maxZoom,
        includeHiddenNodes
      });
    }

    // Get current viewport and bounds of target nodes
    const currentViewport = getViewport();
    const targetBounds = getNodesBounds(targetNodes);

    // Calculate viewport width and height
    const reactFlowEl = document.querySelector('.react-flow');
    if (!reactFlowEl) return false;

    const { width, height } = reactFlowEl.getBoundingClientRect();
    if (width === 0 || height === 0) return false;

    // Calculate whether we need to change zoom at all, by examining axis alignment
    const hasSimilarXDimensions = checkSimilarDimensions(targetNodes, 'x');
    const hasSimilarYDimensions = checkSimilarDimensions(targetNodes, 'y');

    // Calculate target zoom level
    const paddingX = padding * targetBounds.width;
    const paddingY = padding * targetBounds.height;
    const xZoom = width / (targetBounds.width + 2 * paddingX);
    const yZoom = height / (targetBounds.height + 2 * paddingY);
    let zoom = Math.min(xZoom, yZoom);

    // Clamp zoom
    zoom = Math.min(Math.max(zoom, minZoom), maxZoom);

    // Calculate target position
    const centerX = targetBounds.x + targetBounds.width / 2;
    const centerY = targetBounds.y + targetBounds.height / 2;

    const x = width / 2 - centerX * zoom;
    const y = height / 2 - centerY * zoom;

    // Create the target viewport
    const targetViewport: Viewport = { x, y, zoom };

    // Now decide if we need a special transition
    // If dimensions are similar on both axes, we can potentially optimize
    if (hasSimilarXDimensions && hasSimilarYDimensions) {
      // If target zoom is very close to current zoom, just move without changing zoom
      if (Math.abs(currentViewport.zoom - zoom) / zoom < 0.1) {
        // Just pan to the new center without changing zoom
        return setViewport(
          {
            x,
            y,
            zoom: currentViewport.zoom
          },
          { duration }
        );
      }
    }
    // If dimensions are similar on X axis but not Y, consider pan-only for X
    else if (hasSimilarXDimensions) {
      // Potentially keep X position and only change Y and zoom
      // For simplicity we'll still use full transition here
    }
    // If dimensions are similar on Y axis but not X, consider pan-only for Y
    else if (hasSimilarYDimensions) {
      // Potentially keep Y position and only change X and zoom
      // For simplicity we'll still use full transition here
    }

    // Default to regular viewport transition
    return setViewport(targetViewport, { duration });
  }, [getNodes, getNodesBounds, setViewport, getViewport, fitView]);

  /**
   * Helper function to check if nodes have similar dimensions along a specific axis
   */
  const checkSimilarDimensions = (nodes: Node[], axis: 'x' | 'y') => {
    if (nodes.length <= 1) return true;

    let minPos = Infinity;
    let maxPos = -Infinity;
    let minSize = Infinity;
    let maxSize = -Infinity;

    nodes.forEach(node => {
      const pos = node.position[axis];
      const size = axis === 'x' ?
        (node.width ?? node.measured?.width ?? 0) :
        (node.height ?? node.measured?.height ?? 0);

      minPos = Math.min(minPos, pos);
      maxPos = Math.max(maxPos, pos);
      minSize = Math.min(minSize, size);
      maxSize = Math.max(maxSize, size);
    });

    // If max/min size ratio is close to 1, they have similar sizes
    const sizeRatio = maxSize / minSize;
    return sizeRatio < 1.2; // 20% threshold for "similarity"
  };

  return { smartFitView };
}
