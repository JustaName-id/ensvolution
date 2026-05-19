import {
  ChangesEdge,
  ENSRegistrationData,
  LifecycleNode,
  LineNode,
  OwnerInfo,
  OwnershipChange,
  OwnershipChangeNode,
  ProfileNode,
  ProfileStateWithChanges,
  ResolverNode
} from "@ensvolution/types";

const X_STEP = 300;
const X_FIRST_OFFSET = 300;
const LANE_GAP = 170;
const PROFILE_CARD_WIDTH = 256;
const LANE_NODE_WIDTH = 200;
const LANE_MIN_SPACING = LANE_NODE_WIDTH + 12;

// Sweeps left-to-right and pushes any node that would overlap its predecessor.
// Operates in place on objects that expose a mutable `position.x`.
function deoverlapLane<T extends { position: { x: number; y: number } }>(items: T[]): void {
    if (items.length < 2) return;
    items.sort((a, b) => a.position.x - b.position.x);
    for (let i = 1; i < items.length; i++) {
        const minX = items[i - 1].position.x + LANE_MIN_SPACING;
        if (items[i].position.x < minX) {
            items[i].position.x = minX;
        }
    }
}

// Profile nodes are spaced by id (id * 300 + 300), not by block number — so we
// interpolate any block-dated event (ownership/lifecycle) between its two
// neighboring profile nodes' x positions, clamped to avoid visual collisions
// with the 256-wide profile cards in their 300-wide slots.
function interpolateX(
    eventBlock: number,
    profilePositions: { block: number; x: number }[],
    rankBefore: number,
    rankAfter: number,
): number {
    if (profilePositions.length === 0) return X_FIRST_OFFSET;

    let prev: { block: number; x: number } | undefined;
    let next: { block: number; x: number } | undefined;

    for (const p of profilePositions) {
        if (p.block <= eventBlock) prev = p;
        if (p.block > eventBlock && !next) next = p;
    }

    if (prev && prev.block === eventBlock) return prev.x;
    if (next && next.block === eventBlock) return next.x;

    if (prev && next) {
        const span = next.block - prev.block;
        const tRaw = span > 0 ? (eventBlock - prev.block) / span : 0.5;
        const t = Math.min(0.85, Math.max(0.15, tRaw));
        return prev.x + t * (next.x - prev.x);
    }

    if (prev && !next) {
        // After the last profile — order post-last events by rank.
        return prev.x + X_STEP * (rankAfter + 1);
    }

    if (!prev && next) {
        // Before the first profile — order pre-first events left-to-right.
        return next.x - X_STEP * (rankBefore + 1);
    }

    return X_FIRST_OFFSET;
}

function buildOwnerInfo(change: OwnershipChange): OwnerInfo {
    return {
        address: change.ownerAddress,
        isWrapped: change.eventType === 'WrappedTransfer',
        blockNumber: change.blockNumber,
        transactionID: change.transactionID,
    };
}

export const useENSFlow = (
    profileStates: ProfileStateWithChanges[] | undefined = [],
    ownershipChanges: OwnershipChange[] | undefined = [],
    registration: ENSRegistrationData | null | undefined = null,
): {
    nodes: ProfileNode[],
    edges: ChangesEdge[],
    resolverNodes: ResolverNode[],
    lineNodes: LineNode[],
    ownershipNodes: OwnershipChangeNode[],
    lifecycleNodes: LifecycleNode[],
} => {

    const nodes: ProfileNode[] = []
    const edges: ChangesEdge[] = []
    const resolverNodes: ResolverNode[] = [];
    const lineNodes: LineNode[] = [];
    const ownershipNodes: OwnershipChangeNode[] = [];
    const lifecycleNodes: LifecycleNode[] = [];

    const uniqueResolvers = new Set<string>()

    profileStates.forEach(profile => {
        if (profile.resolverAddress) {
            uniqueResolvers.add(profile.resolverAddress)
        }
    })

    const biggestProfilePerResolver = new Map<string, number>()

    uniqueResolvers.forEach(resolver => {
        const profiles = profileStates.filter(p => p.resolverAddress === resolver)
        const biggestProfile = profiles.reduce((prev, current) =>
            (current.currentUpdatedRecords?.length || 0) > (prev?.currentUpdatedRecords?.length || 0) ? current : prev, profiles[0]
        )
        const biggestChange = biggestProfile?.currentUpdatedRecords?.length || 0
        biggestProfilePerResolver.set(resolver, biggestChange)
    })

    const resolverYPosition = new Map<string, number>()

    Array.from(biggestProfilePerResolver.keys()).map((resolver, index) => {
        const prev = Array.from(biggestProfilePerResolver.keys())[index - 1]
        let prevY = 0
        let value = 0
        if (prev) {
            prevY = resolverYPosition.get(prev) || 0
            value = biggestProfilePerResolver.get(prev) || 0
            if (value === 1) {
                value = 0
            }
        }

        const y = prevY + (value * 45.5) + (index > 0 ? LANE_GAP : 0)
        resolverYPosition.set(resolver, y)
    })

    // Sort ownership changes ascending by block — used for owner attribution.
    const sortedOwnership = [...ownershipChanges].sort((a, b) => a.blockNumber - b.blockNumber);

    function ownerAtBlock(block: number): OwnerInfo | undefined {
        let active: OwnershipChange | undefined;
        for (const ch of sortedOwnership) {
            if (ch.blockNumber <= block) active = ch;
            else break;
        }
        return active ? buildOwnerInfo(active) : undefined;
    }

    for (const profileState of profileStates) {
        const hasResolver = profileState.resolverAddress && resolverYPosition.has(profileState.resolverAddress)
        if (!hasResolver) continue

        const nbOfChanges = (profileState.changes.added.length + profileState.changes.deleted.length + profileState.changes.updated.length + (profileState.resolverChange ? 1 : 0))

        const owner = ownerAtBlock(Number(profileState.blockNumber));

        nodes.push({
            id: profileState.id.toString(),
            position: {x: profileState.id * X_STEP + X_FIRST_OFFSET, y: (resolverYPosition.get(profileState.resolverAddress || "") || 0) + 25},
            type: "profile",
            data: {
                id: profileState.id,
                name: profileState.name,
                timestamp: profileState.timestamp,
                transactionHash: profileState.transactionHash,
                blockNumber: profileState.blockNumber,
                changes:  profileState.changes,
                currentUpdatedRecords: profileState.currentUpdatedRecords,
                cumulativeRecords: profileState.cumulativeRecords,
                resolverChange: profileState.resolverChange,
                resolverAddress: profileState.resolverAddress,
                eventType: profileState.eventType,
                owner,
            },
            height: 105 + (nbOfChanges <= 1 ? 0 : nbOfChanges - 1) * 48 + (owner ? 28 : 0),

            width: PROFILE_CARD_WIDTH
        })
    }

    // Profile positions used by interpolateX, sorted by block ascending.
    const profilePositions = nodes
        .map(n => ({ block: Number(n.data.blockNumber), x: n.position.x }))
        .sort((a, b) => a.block - b.block);

    // Lane y positions — above the topmost resolver row.
    const minResolverY = resolverYPosition.size > 0
        ? Math.min(...Array.from(resolverYPosition.values()))
        : 0;
    const OWNERSHIP_LANE_Y = minResolverY - LANE_GAP - 25;
    const LIFECYCLE_LANE_Y = OWNERSHIP_LANE_Y - 90;

    // Every ownership change becomes a standalone node on the ownership lane,
    // even when it shares a block with a profile event. The profile's owner
    const standaloneBefore = sortedOwnership.filter(ch =>
        profilePositions.length === 0 || ch.blockNumber < profilePositions[0].block
    );
    const standaloneAfter = sortedOwnership.filter(ch =>
        profilePositions.length > 0 && ch.blockNumber > profilePositions[profilePositions.length - 1].block
    );

    sortedOwnership.forEach((ch) => {
        const isBefore = profilePositions.length > 0 && ch.blockNumber < profilePositions[0].block;
        const isAfter = profilePositions.length > 0 && ch.blockNumber > profilePositions[profilePositions.length - 1].block;
        const rankBefore = isBefore ? standaloneBefore.indexOf(ch) : 0;
        const rankAfter = isAfter ? standaloneAfter.indexOf(ch) : 0;
        const x = interpolateX(ch.blockNumber, profilePositions, rankBefore, rankAfter);

        ownershipNodes.push({
            id: `ownership-${ch.transactionID}-${ch.blockNumber}`,
            type: 'ownership-change',
            position: { x, y: OWNERSHIP_LANE_Y },
            data: {
                ownerAddress: ch.ownerAddress,
                blockNumber: ch.blockNumber,
                transactionID: ch.transactionID,
                isWrapped: ch.eventType === 'WrappedTransfer',
                timestamp: ch.timestamp,
            },
            width: 200,
            height: 70,
            draggable: false,
        });
    });

    // Lifecycle nodes — registration / renewals / expiry.
    if (registration) {
        const renewalEvents = registration.events.filter(e => e.kind === 'renewal' && e.blockNumber !== undefined);
        const renewalsBefore = renewalEvents.filter(e =>
            profilePositions.length === 0 || (e.blockNumber as number) < profilePositions[0].block
        );
        const renewalsAfter = renewalEvents.filter(e =>
            profilePositions.length > 0 && (e.blockNumber as number) > profilePositions[profilePositions.length - 1].block
        );

        registration.events.forEach((event) => {
            let x: number;

            if (event.kind === 'registration') {
                // Force registration to the leftmost lifecycle slot.
                if (profilePositions.length > 0) {
                    x = profilePositions[0].x - X_STEP;
                } else {
                    x = 0;
                }
            } else if (event.kind === 'expiry') {
                // Force expiry to the rightmost slot, beyond any profile or renewal.
                const lastProfileX = profilePositions.length > 0
                    ? profilePositions[profilePositions.length - 1].x
                    : 0;
                const lastOwnershipX = standaloneAfter.length > 0
                    ? lastProfileX + X_STEP * standaloneAfter.length
                    : lastProfileX;
                x = Math.max(lastProfileX, lastOwnershipX) + X_STEP;
            } else if (event.kind === 'renewal' && event.blockNumber !== undefined) {
                const isBefore = profilePositions.length > 0 && event.blockNumber < profilePositions[0].block;
                const isAfter = profilePositions.length > 0 && event.blockNumber > profilePositions[profilePositions.length - 1].block;
                const rankBefore = isBefore ? renewalsBefore.indexOf(event) : 0;
                const rankAfter = isAfter ? renewalsAfter.indexOf(event) : 0;
                x = interpolateX(event.blockNumber, profilePositions, rankBefore, rankAfter);
            } else {
                return;
            }

            // Include transactionID in the id so two events at the same
            // block (rare but valid on-chain) don't collide.
            const idSuffix = event.transactionID ?? event.blockNumber ?? event.timestamp;
            lifecycleNodes.push({
                id: `lifecycle-${event.kind}-${idSuffix}`,
                type: 'lifecycle',
                position: { x, y: LIFECYCLE_LANE_Y },
                data: {
                    kind: event.kind,
                    blockNumber: event.blockNumber,
                    transactionID: event.transactionID,
                    timestamp: event.timestamp,
                    expiryDate: event.expiryDate,
                },
                width: 200,
                height: 70,
                draggable: false,
            });
        });
    }

    // Resolve overlaps on each lane independently. The expiry node is
    // re-pinned afterwards because deoverlapping renewals/ownership can push
    // them past the expiry's initial slot.
    deoverlapLane(ownershipNodes);

    const lifecycleExpiry = lifecycleNodes.find(n => n.data.kind === 'expiry');
    const lifecycleOthers = lifecycleNodes.filter(n => n.data.kind !== 'expiry');
    deoverlapLane(lifecycleOthers);
    if (lifecycleExpiry) {
        const lastOtherX = lifecycleOthers.length > 0
            ? lifecycleOthers[lifecycleOthers.length - 1].position.x
            : -Infinity;
        const lastOwnershipX = ownershipNodes.length > 0
            ? ownershipNodes[ownershipNodes.length - 1].position.x
            : -Infinity;
        lifecycleExpiry.position.x = Math.max(
            lifecycleExpiry.position.x,
            lastOtherX + LANE_MIN_SPACING,
            lastOwnershipX + LANE_MIN_SPACING,
        );
    }

    const allNodeXs: number[] = [
        ...nodes.map(n => n.position.x),
        ...ownershipNodes.map(n => n.position.x),
        ...lifecycleNodes.map(n => n.position.x),
    ];
    const startX = allNodeXs.length > 0 ? Math.min(...allNodeXs) : 0;
    const endX = allNodeXs.length > 0 ? Math.max(...allNodeXs) : 0;

    resolverYPosition.forEach((y, resolver) => {
        resolverNodes.push({
            position: {
                x: 0,
                y: y + 25
            },
            type: "resolver",
            id: `resolver-${resolver}`,
            data: {
                address: resolver,
            },


            height: 72,
            width: 272
        })

        lineNodes.push({
            position: {
                x: startX,
                y: y
            },
            type: "line",
            id: `line-${resolver}`,
            data: {
                width: endX - startX,
            },
            height: 4,
            width: endX - startX + 600
        })
    })

    nodes.forEach((node, index) => {
        const isLast = index === nodes.length - 1
        if (isLast) return

        const nextNode = nodes[index + 1]
        if (!nextNode) return


        edges.push({
            source: node.id,
            target: nextNode.id,
            id: `edge-${node.id}-${nextNode.id}`,
            sourceHandle: `source-${node.id}`,
            targetHandle: `target-${nextNode.id}`,
            type: "ens-edge",
            data: {
                nbOfChanges: nextNode.data.changes.added.length +
                    nextNode.data.changes.updated.length +
                    nextNode.data.changes.deleted.length +
                    (nextNode.data.resolverChange ? 1 : 0),
            }
        })
    })

    return {
        nodes,
        edges,
        resolverNodes,
        lineNodes,
        ownershipNodes,
        lifecycleNodes,
    }
}
