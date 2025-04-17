import {serverEnv} from "@/config/serverEnv";
import {Address, createPublicClient, http} from "viem";
import {mainnet} from "viem/chains";
import {ProfileRecord, ProfileState, ResolverChange} from "@/lib/types/ens-profile";
import {multicall} from "viem/actions";
import { namehash } from "@ensdomains/ensjs/utils";

const MULTICALL_DEPLOYMENT_BLOCK = 14353601;
const RPC_ENDPOINT = serverEnv.mainnetProvider;

const RESOLVER_ABI = [
    {
        inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }, { internalType: "string", name: "key", type: "string" }],
        name: "text",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }, { internalType: "uint256", name: "coinType", type: "uint256" }],
        name: "addr",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
        name: "contenthash",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "view",
        type: "function"
    },
] as const;


interface TextChanged {
    key: string;
    value: string | null;
    blockNumber: number;
    transactionID: string;
}

interface MulticoinAddrChanged {
    coinType: string;
    addr: string;
    blockNumber: number;
    transactionID: string;
}

interface ContenthashChanged {
    hash: string;
    blockNumber: number;
    transactionID: string;
}

interface Resolver {
    address: string;
    textChangeds: {
        items: TextChanged[];
    };
    multicoinAddrChangeds: {
        items: MulticoinAddrChanged[];
    };
    contenthashChangeds: {
        items: ContenthashChanged[];
    };
}

interface ResolverItem {
    resolverId: string;
    blockNumber: number;
    transactionID: string;
    resolver: Resolver;
}

interface Domain {
    id: string;
    name: string;
    newResolvers: {
        items: ResolverItem[];
    };
}

interface ENSNodeResponse {
    data: {
        domains: {
            items: Domain[];
        };
    };
}


interface Event {
    type: "text" | "addr" | "resolver" | "contentHash";
    key: string;
    value: string | null;
    blockNumber: number;
    transactionID: string;
    resolverAddress: string;
    resolverId?: string;
    nameHash?: Address; 
}

interface PendingNullCheck {
    event: Event;
    recordKey: string;
}


const client = createPublicClient({
    chain: mainnet,
    transport: http(RPC_ENDPOINT),
});

class ENSNodeProfileService {

    async getProfileStates(ensName: string): Promise<ProfileState[]> {
        try {
            
            const nameHash = this.namehash(ensName);

            
            const response = await this.fetchENSNodeData(ensName);

            if (!response?.data?.domains?.items?.length) {
                return [this.createFallbackProfile(ensName)];
            }

            const domain = response.data.domains.items[0];
            if (!domain) {
                return [this.createFallbackProfile(ensName)];
            }
            return this.processDomainsToProfileStates(domain, nameHash);
        } catch (error) {
            console.error("Error retrieving profile states:", error);
            return [this.createFallbackProfile(ensName)];
        }
    }

    private namehash(name: string): Address {
        return namehash(name)
    }


    private async fetchENSNodeData(ensName: string): Promise<ENSNodeResponse> {
        const query = `
          query GetDomain {
            domains(where: {name: "${ensName}"}) {
              items {
                id
                name
                newResolvers {
                  items {
                    resolverId
                    blockNumber
                    transactionID
                    resolver {
                      address
                      textChangeds {
                        items {
                          key
                          value
                          blockNumber
                          transactionID
                        }
                      }
                      multicoinAddrChangeds {
                        items {
                          coinType
                          addr
                          blockNumber
                          transactionID
                        }
                      }
                      contenthashChangeds {
                          items {
                            hash
                            blockNumber
                            transactionID
                          }
                        }
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch(serverEnv.ensnodeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`Error fetching from ENS Node: ${response.statusText}`);
        }

        return await response.json();
    }

    private async processDomainsToProfileStates(domain: Domain, nameHash: Address): Promise<ProfileState[]> {
        
        const allEvents: Event[] = [];

        for (const resolverItem of domain.newResolvers.items) {
            
            allEvents.push({
                type: "resolver",
                key: "resolver",
                value: resolverItem.resolver.address,
                blockNumber: resolverItem.blockNumber,
                transactionID: resolverItem.transactionID,
                resolverAddress: resolverItem.resolver.address,
                resolverId: resolverItem.resolverId,
                nameHash: nameHash,
            });
            
            for (const textChanged of resolverItem.resolver.textChangeds.items) {
                allEvents.push({
                    type: "text",
                    key: textChanged.key,
                    value: textChanged.value,
                    blockNumber: textChanged.blockNumber,
                    transactionID: textChanged.transactionID,
                    resolverAddress: resolverItem.resolver.address,
                    nameHash: nameHash,
                });
            }

            
            for (const addrChanged of resolverItem.resolver.multicoinAddrChangeds.items) {
                
                allEvents.push({
                    type: "addr",
                    key: addrChanged.coinType,
                    value: addrChanged.addr === "0x" ? null : addrChanged.addr,
                    blockNumber: addrChanged.blockNumber,
                    transactionID: addrChanged.transactionID,
                    resolverAddress: resolverItem.resolver.address,
                    nameHash: nameHash,
                });
            }
            
            for(const contenthashChanged of resolverItem.resolver.contenthashChangeds.items) {
                allEvents.push({
                    type: "contentHash",
                    key: "contentHash",
                    value: contenthashChanged.hash,
                    blockNumber: contenthashChanged.blockNumber,
                    transactionID: contenthashChanged.transactionID,
                    resolverAddress: resolverItem.resolver.address,
                })
            }
        }

        allEvents.sort((a, b) => {
            if (a.blockNumber !== b.blockNumber) {
                return a.blockNumber - b.blockNumber;
            }

            
            if (a.type === "resolver" && b.type !== "resolver") {
                return -1;
            }
            if (a.type !== "resolver" && b.type === "resolver") {
                return 1;
            }

            return 0;
        });


        const eventsByTransaction: { [key: string]: Event[] } = {};
        for (const event of allEvents) {
            if (!eventsByTransaction[event.transactionID]) {
                eventsByTransaction[event.transactionID] = [];
            }
            
            eventsByTransaction[event.transactionID]!.push(event);
        }


        const profileStates: ProfileState[] = [];


        let currentResolverAddress: string | null = null;
        const recordsByResolver: { [key: string]: Map<string, ProfileRecord> } = {};
        let stateCounter = 0;

        
        const transactions = Object.entries(eventsByTransaction)
            .sort((a, b) => {
                const blockA = Math.min(...a[1].map(e => e.blockNumber));
                const blockB = Math.min(...b[1].map(e => e.blockNumber));
                return blockA - blockB;
            });

        for (const [transactionID, eventsInTransaction] of transactions) {
            
            const blockNumber = Math.min(...eventsInTransaction.map(e => e.blockNumber));

            
            const resolverChange = eventsInTransaction.find(e => e.type === "resolver");

            
            let createNewState = false;
            let resolverChangeInfo: ResolverChange | undefined = undefined;
            let eventType: "text" | "addr" | "resolver" | "multi" | "contentHash" = "text";

            
            if (resolverChange) {
                currentResolverAddress = resolverChange.value;
                createNewState = true;
                eventType = "resolver";

                
                if (currentResolverAddress && !recordsByResolver[currentResolverAddress]) {
                    recordsByResolver[currentResolverAddress] = new Map();
                }

                resolverChangeInfo = {
                    address: resolverChange.value || "",
                    id: resolverChange.resolverId!,
                };
            } else {
                currentResolverAddress = eventsInTransaction[0]?.resolverAddress || null;

                if (currentResolverAddress && !recordsByResolver[currentResolverAddress]) {
                    recordsByResolver[currentResolverAddress] = new Map();
                }
            }

            
            if (!currentResolverAddress) {
                continue;
            }

            
            const updatedRecords: ProfileRecord[] = [];

            
            const nonResolverEvents = eventsInTransaction.filter(e => e.type !== "resolver");

            
            const hasTextEvents = nonResolverEvents.some(e => e.type === "text");
            const hasAddrEvents = nonResolverEvents.some(e => e.type === "addr");
            const hasContentHashEvents = nonResolverEvents.some(e => e.type === "contentHash");
            const isMulti = [hasTextEvents, hasAddrEvents, hasContentHashEvents].filter(Boolean).length;
            if (isMulti > 1) {
                eventType = "multi";
            } else if (hasTextEvents) {
                eventType = "text";
            } else if (hasAddrEvents) {
                eventType = "addr";
            } else if (hasContentHashEvents) {
                eventType = "contentHash";
            }

            
            const pendingNullChecks: PendingNullCheck[] = [];

            if (nonResolverEvents.length > 0) {
                
                const eventsForCurrentResolver = nonResolverEvents.filter(
                    e => e.resolverAddress === currentResolverAddress
                );

                if (eventsForCurrentResolver.length > 0) {
                    createNewState = true;

                    for (const event of eventsForCurrentResolver) {
                        
                        const currentRecords = recordsByResolver[currentResolverAddress];

                        let recordKey = `${event.type}:${event.key}`;

                        const existingRecord = currentRecords?.get(recordKey);
                        if (existingRecord && existingRecord.value === (event.value || "")) {
                            continue;
                        }

                        
                        if (event.value === null) {
                            pendingNullChecks.push({ event, recordKey });
                            continue;
                        } else {
                            
                            const record: ProfileRecord = {
                                type: event.type,
                                key: event.key,
                                value: event.value || "",
                            };

                            currentRecords?.set(recordKey, record);
                            updatedRecords.push(record);
                        }
                    }
                }
            }

            
            if (pendingNullChecks.length > 0) {
                const nullValueResults = await this.handleNullValueChecks(
                    pendingNullChecks,
                    currentResolverAddress,
                    blockNumber
                );

                
                for (const [recordKey, value] of nullValueResults) {
                    const [type, key] = recordKey.split(':');
                    const currentRecords = recordsByResolver[currentResolverAddress];

                    
                    if ((!value || value === "0x" || value === "") && currentRecords) {

                        
                        const existingRecord = currentRecords?.get(recordKey);
                        if (existingRecord) {
                            updatedRecords.push({
                                type: type as "text" | "addr",
                                key: key || "",
                                value: "",
                            });
                        }
                        currentRecords.delete(recordKey);
                    } else if (currentRecords) {
                        
                        const record: ProfileRecord = {
                            type: type as "text" | "addr",
                            key: key || "",
                            value,
                        };

                        currentRecords.set(recordKey, record);
                        updatedRecords.push(record);
                    }
                }
            }

            
            if (createNewState) {
                const timestamp = await this.getBlockTimestamp(blockNumber);

                
                const allRecords = [...(recordsByResolver[currentResolverAddress]?.values() || [])];
                const profileState: ProfileState = {
                    id: stateCounter++,
                    timestamp,
                    transactionHash: transactionID,
                    blockNumber: blockNumber.toString(),
                    name: domain.name,
                    currentUpdatedRecords: updatedRecords.length > 0 ? updatedRecords : undefined,
                    cumulativeRecords: allRecords,
                    resolverChange: resolverChangeInfo,
                    resolverAddress: currentResolverAddress,
                    eventType,
                };

                profileStates.push(profileState);
            }
        }

        return profileStates;
    }

    private async handleNullValueChecks(
        pendingChecks: PendingNullCheck[],
        resolverAddress: string,
        blockNumber: number
    ): Promise<Map<string, string>> {
        const results = new Map<string, string>();
        const blockTag = BigInt(blockNumber);

        
        if (blockNumber >= MULTICALL_DEPLOYMENT_BLOCK) {
            
            const textChecks: PendingNullCheck[] = [];
            const addrChecks: PendingNullCheck[] = [];

            for (const check of pendingChecks) {
                if (check.event.type === "text") {
                    textChecks.push(check);
                } else if (check.event.type === "addr") {
                    addrChecks.push(check);
                }
            }

            
            if (textChecks.length > 0) {

                try {
                    const returnData = await multicall(client,{
                        contracts: textChecks.map(check => ({
                            address: resolverAddress as `0x${string}`,
                            abi: RESOLVER_ABI,
                            functionName: 'text',
                            args: [check.event.nameHash, check.event.key],
                        })) ,
                        blockNumber: blockTag,
                    })


                    
                    for (let i = 0; i < textChecks.length; i++) {
                        const result = returnData[i];
                        if(textChecks && textChecks[i] && result) {
                            if(textChecks[i]?.recordKey) {
                                results.set(textChecks[i]?.recordKey as string, result.status === "success" ? ((result.result as string) || "") : "");
                            }
                        }
                    }
                } catch (error) {
                    console.error("Multicall error for text records:", error);
                    
                    for (const check of textChecks) {
                        const value = await this.verifyTextRecord(
                            resolverAddress,
                            check.event.nameHash!,
                            check.event.key,
                            blockNumber
                        );
                        results.set(check.recordKey, value);
                    }
                }
            }

            
            if (addrChecks.length > 0) {

                try {
                    const returnData = await multicall(client,{
                        contracts: addrChecks.map(check => ({
                            address: resolverAddress as `0x${string}`,
                            abi: RESOLVER_ABI,
                            functionName: 'addr',
                            args: [check.event.nameHash, BigInt(check.event.key)],
                        })) ,
                        blockNumber: blockTag,
                    })
                    
                    for (let i = 0; i < addrChecks.length; i++) {
                        const result = returnData[i];
                        if(addrChecks && addrChecks[i] && result) {
                            if(addrChecks[i]?.recordKey) {
                                results.set(addrChecks[i]?.recordKey as string, result.status === "success" ? ((result.result as string) || "") : "");
                            }
                        }
                    }
                } catch (error) {
                    console.error("Multicall error for addr records:", error);
                    
                    for (const check of addrChecks) {
                        const value = await this.verifyAddrRecord(
                            resolverAddress,
                            check.event.nameHash!,
                            check.event.key,
                            blockNumber
                        );
                        results.set(check.recordKey, value);
                    }
                }
            }
        } else {
            
            for (const check of pendingChecks) {
                if (check.event.type === "text") {
                    const value = await this.verifyTextRecord(
                        resolverAddress,
                        check.event.nameHash!,
                        check.event.key,
                        blockNumber
                    );
                    results.set(check.recordKey, value);
                } else if (check.event.type === "addr") {
                    const value = await this.verifyAddrRecord(
                        resolverAddress,
                        check.event.nameHash!,
                        check.event.key,
                        blockNumber
                    );
                    results.set(check.recordKey, value);
                }
            }
        }

        return results;
    }

    private async verifyTextRecord(
        resolverAddress: string,
        nameHash: Address,
        key: string,
        blockNumber: number
    ): Promise<string> {
        try {
            const result = await client.readContract({
                address: resolverAddress as `0x${string}`,
                abi: RESOLVER_ABI,
                functionName: 'text',
                args: [nameHash, key],
                blockNumber: BigInt(blockNumber),
            });
            return result || "";
        } catch (error) {
            console.error(`Error verifying text record ${key}:`, error);
            return "";
        }
    }

    private async verifyAddrRecord(
        resolverAddress: string,
        nameHash: Address,
        coinType: string,
        blockNumber: number
    ): Promise<string> {
        try {
            const result = await client.readContract({
                address: resolverAddress as `0x${string}`,
                abi: RESOLVER_ABI,
                functionName: 'addr',
                args: [nameHash, BigInt(coinType)],
                blockNumber: BigInt(blockNumber),
            });

            return result || "";
        } catch (error) {
            console.error(`Error verifying addr record ${coinType}:`, error);
            return "";
        }
    }

    private async getBlockTimestamp(blockNumber: number): Promise<string> {
        try {
            const block = await client.getBlock({
                blockNumber: BigInt(blockNumber),
            });

            return new Date(Number(block.timestamp) * 1000).toISOString();
        } catch (error) {
            console.error(`Error getting timestamp for block ${blockNumber}:`, error);
            return new Date().toISOString();
        }
    }

    private createFallbackProfile(ensName: string): ProfileState {
        return {
            id: 0,
            timestamp: new Date().toISOString(),
            transactionHash: "",
            blockNumber: "0",
            name: ensName,
            cumulativeRecords: [],
            eventType: "resolver",
        };
    }
}


export default ENSNodeProfileService;