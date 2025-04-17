import {ChangesEdge, LineNode, ProfileNode, ProfileRecord, ProfileState, ResolverNode} from "@/lib/types/ens-profile";
import {getCoderByCoinType} from "@ensdomains/address-encoder";
import {hexToBytes} from "@ensdomains/address-encoder/utils";
import {Address} from "viem";
import { decode, getCodec } from "@ensdomains/content-hash";

export const constructContentHash = (value: string): {link: string, coder: string} => {
    try {
        const coder = getCodec(value)
        const decoded = decode(value)
        let link = coder + "://" + decoded

        if(link.startsWith("ipfs://")) {
            link = "https://ipfs.io/ipfs/" + decoded
        }

        return {
            link: link,
            coder: coder || "contentHash"
        }

    }catch (e){
        return {
            link: value,
            coder: "contentHash"
        }
    }
}


export const useENSFlow = (profileStates: ProfileState[] | undefined = []): {
    nodes: ProfileNode[],
    edges: ChangesEdge[],
    resolverNodes: ResolverNode[],
    lineNodes: LineNode[]
} => {

    let nodes: ProfileNode[] = []
    let edges: ChangesEdge[] = []
    let resolverNodes: ResolverNode[] = [];
    let lineNodes: LineNode[] = [];

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
        let biggestChange = biggestProfile?.currentUpdatedRecords?.length || 0
        // const resolverChangedStates = profiles.filter(p => p.resolverChange)
        // for (const resolverChange of resolverChangedStates) {
        //     // biggestChange = Math.max(biggestChange, resolverChange.cumulativeRecords?.length + 1 || 0)
        //     // biggestChange
        // }

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

        const y = prevY + 140 + (value) * 45.5

        resolverYPosition.set(resolver, y)
    })

    const profileStateEncoded = profileStates.map(profileState => {
        return {
            ...profileState,
            currentUpdatedRecords: profileState.currentUpdatedRecords?.map(({type, key, value}) => {

                if(type === "addr" && value){
                    return {
                        type,
                        key,
                        value:  getCoderByCoinType(parseInt(key)).encode(hexToBytes(value as Address))
                    }
                }

                if(type === "contentHash" && value){
                    const { link, coder } = constructContentHash(value)
                    return {
                        type,
                        key: coder,
                        value: link
                    }
                }



                return {
                    type,
                    key,
                    value,
                }
            }),
            cumulativeRecords: profileState.cumulativeRecords?.map(({type, key, value}) => {
                if(type === "addr" && value){
                    return {
                        type,
                        key,
                        value:  getCoderByCoinType(parseInt(key)).encode(hexToBytes(value as Address))
                    }
                }

                if(type === "contentHash" && value){
                    const { link, coder } = constructContentHash(value)
                    return {
                        type,
                        key: coder,
                        value: link
                    }
                }

                return {
                    type,
                    key,
                    value,
                }
            })
        }
    })

    for (const profileState of profileStateEncoded) {
        const hasResolver = profileState.resolverAddress && resolverYPosition.has(profileState.resolverAddress)
        if (!hasResolver) continue

        let added: ProfileRecord[] = []
        let deleted: ProfileRecord[] = []
        let updated: ProfileRecord[] = []

        if (!profileState.resolverChange) {
            if (profileState.currentUpdatedRecords) {
                const prevState = profileStateEncoded.find(p => p.id === profileState.id - 1)

                if (prevState) {
                    if (prevState.resolverAddress !== profileState.resolverAddress) {
                        added = profileState.cumulativeRecords;
                    } else {
                        deleted = profileState.currentUpdatedRecords.filter(r =>
                            r.value === ""
                        ).map(r => {
                            return {
                                type: r.type,
                                key: r.key,
                                value: prevState?.cumulativeRecords.find(pr => pr.type === r.type && pr.key === r.key)?.value || ""
                            }
                        })

                        added = profileState.currentUpdatedRecords.filter(
                            r => prevState?.cumulativeRecords.find(pr => pr.type === r.type && pr.key === r.key) === undefined
                        )

                        updated = profileState.currentUpdatedRecords.filter(r =>
                            prevState?.cumulativeRecords.find(pr => pr.type === r.type && pr.key === r.key) &&
                            prevState?.cumulativeRecords.find(pr => pr.type === r.type && pr.key === r.key)?.value !== r.value && r.value !== ""
                        )
                    }
                }
            }
        }

        const nbOfChanges = (added.length + deleted.length + updated.length + (profileState.resolverChange ? 1 : 0))
        
        nodes.push({
            id: profileState.id.toString(),
            position: {x: profileState.id * 300, y: resolverYPosition.get(profileState.resolverAddress || "") || 0},
            type: "profile",
            data: {
                id: profileState.id,
                name: profileState.name,
                timestamp: profileState.timestamp,
                transactionHash: profileState.transactionHash,
                blockNumber: profileState.blockNumber,
                changes: {
                    added,
                    deleted,
                    updated,
                },
                currentUpdatedRecords: profileState.currentUpdatedRecords,
                cumulativeRecords: profileState.cumulativeRecords,
                resolverChange: profileState.resolverChange,
                resolverAddress: profileState.resolverAddress,
                // eventType: profileState.eventType === "resolver" ?
                //     profileState.currentUpdatedRecords ? "registration" : "resolver" : profileState.eventType,
                eventType: profileState.eventType,
            },
            height: 105 + (nbOfChanges <= 1 ? 0 : nbOfChanges) * 48,
            
            width: 256
        })
    }

    const firstNode = nodes[0]
    const lastNode = nodes[nodes.length - 1]

    let startX = firstNode?.position?.x || 0
    let endX = lastNode?.position?.x || 0

    resolverYPosition.forEach((y, resolver) => {
        resolverNodes.push({
            position: {
                x: -300,
                y: y - 25
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
                x: -300,
                y: y - 25
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