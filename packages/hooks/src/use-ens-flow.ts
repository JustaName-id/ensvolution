import {
  ChangesEdge,
  LineNode,
  ProfileNode,
  ProfileRecord,
  ProfileState,
  ProfileStateWithChanges,
  ResolverNode
} from "@ensvolution/types";


export const useENSFlow = (profileStates: ProfileStateWithChanges[] | undefined = []): {
    nodes: ProfileNode[],
    edges: ChangesEdge[],
    resolverNodes: ResolverNode[],
    lineNodes: LineNode[]
} => {

    const nodes: ProfileNode[] = []
    const edges: ChangesEdge[] = []
    const resolverNodes: ResolverNode[] = [];
    const lineNodes: LineNode[] = [];

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

        const y = prevY + (value * 45.5) + (index > 0 ? 140 : 0)
        resolverYPosition.set(resolver, y)
    })


    for (const profileState of profileStates) {
        const hasResolver = profileState.resolverAddress && resolverYPosition.has(profileState.resolverAddress)
        if (!hasResolver) continue

        const nbOfChanges = (profileState.changes.added.length + profileState.changes.deleted.length + profileState.changes.updated.length + (profileState.resolverChange ? 1 : 0))

        nodes.push({
            id: profileState.id.toString(),
            position: {x: profileState.id * 300 + 300, y: (resolverYPosition.get(profileState.resolverAddress || "") || 0) + 25},
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
                // eventType: profileState.eventType === "resolver" ?
                //     profileState.currentUpdatedRecords ? "registration" : "resolver" : profileState.eventType,
                eventType: profileState.eventType,
            },
            height: 105 + (nbOfChanges <= 1 ? 0 : nbOfChanges - 1) * 48,

            width: 256
        })
    }

    const firstNode = nodes[0]
    const lastNode = nodes[nodes.length - 1]

    const startX = firstNode?.position?.x || 0
    const endX = lastNode?.position?.x || 0

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
                x: 0,
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
        lineNodes
    }
}
