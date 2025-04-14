"use client"

import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import Link from "next/link";
import {formatDate, formatTime} from "@/lib/utils";
import {Sidebar, SidebarContent, SidebarHeader, useSidebar} from "@workspace/ui/components/sidebar";
import {useENS} from "@/providers/ENSProvider";
import {getRecordTypeIcon} from "@/lib/utils";
import {getCoinTypeDetails, SupportedCoins} from "@justaname.id/sdk";

interface ENSSidebarProps {}

const ENSSidebar: React.FC<ENSSidebarProps> = () => {
    const { selectedProfile } = useENS()
    const { handleSidebarChange } = useSidebar()
    if(!selectedProfile) {
        return null
    }
    const { cumulativeRecords, changes: { added, updated, deleted }, resolverChange } = selectedProfile


    const cumulativeRecordsWithoutChanges = cumulativeRecords.filter((record: any) => {
        const isInAdded = added.some(
            (addedRecord: any) => addedRecord.type === record.type && addedRecord.key === record.key && addedRecord.value === record.value
        );
        const isInUpdated = updated.some(
            (updatedRecord: any) => updatedRecord.type === record.type && updatedRecord.key === record.key && updatedRecord.value === record.value
        );
        const isInDeleted = deleted.some(
            (deletedRecord: any) => deletedRecord.type === record.type && deletedRecord.key === record.key && deletedRecord.value === record.value
        );

        return !isInAdded && !isInUpdated && !isInDeleted;
    });
    
    return (
        <Sidebar variant={"sidebar"} side={"right"} >
            <SidebarHeader >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Profile Details</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSidebarChange(false)}
                    >
                        <X size={18} />
                    </Button>
                </div>
                 <div>
                     <div
                         key={`profile-details`} className={`p-3 text-xs rounded-md border`}
                     >
                                 <div className="text-sm text-muted-foreground">ENS</div>
                                 <div className="font-medium">
                                     {selectedProfile.name}
                                 </div>
                                 <div className="text-sm text-muted-foreground">Event Number</div>
                                 <div className="font-medium">
                                     {selectedProfile.id+1}
                                 </div>
                                 <div className="text-sm text-muted-foreground">Timestamp</div>
                                 <div className="font-medium">
                                     {formatDate(selectedProfile?.timestamp)} {formatTime(selectedProfile?.timestamp)}
                                 </div>
                                 <div className="text-sm text-muted-foreground">Block Number</div>
                                 <div className="font-medium">
                                     {selectedProfile?.blockNumber}
                                 </div>
                                 <div className="text-sm text-muted-foreground mb-1">Resolver Address</div>
                                 <div className="flex items-center place-content-between">
                                     <Link href={"https://etherscan.io/address/"+selectedProfile.resolverAddress} target={"_blank"} className={"w-full flex place-content-between cursor-pointer"}>
                                         <div className="font-medium">
                                             {selectedProfile?.resolverAddress?.substring(0, 15)}...
                                         </div>
                                         <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer">
                                             <ExternalLink size={12} />
                                         </Button>
                                     </Link>
                                 </div>
                                 <div className="text-sm text-muted-foreground mb-1">Transaction Hash</div>
                                 <div className="flex items-center place-content-between">
                                     <Link href={"https://etherscan.io/tx/"+selectedProfile.transactionHash} target={"_blank"} className={"w-full flex place-content-between cursor-pointer"}>
                                         <div className="font-medium">
                                             {selectedProfile.transactionHash.substring(0, 15)}...
                                         </div>
                                         <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer">
                                                 <ExternalLink size={12} />
                                         </Button>
                                     </Link>
                                 </div>
                     </div>
                 </div>
            </SidebarHeader>
            <SidebarContent className={"px-2 py-2"}>
                {
                    resolverChange && (
                        <div
                            key={`resolver`}
                            className={`p-3 text-xs rounded-md border bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900`}
                        >
                            <div className="flex items-center">
                                <div
                                    className="w-5 h-5 rounded-full flex items-center justify-center mr-2 bg-yellow-500 text-white">
                                    R
                                </div>
                                <div className="font-medium">Resolver</div>

                                <Badge variant="outline"
                                       className="ml-auto text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/50">CHANGED</Badge>

                            </div>

                            <div
                                className="mt-1.5 pl-7 font-mono text-xs break-all bg-background px-2 py-1 rounded">
                                {resolverChange.address}
                            </div>
                        </div>
                    )
                }
                {
                    added.map((record)=> {
                        return (
                            <div
                                key={`${record.type}-${record.key}`}
                                className={`p-3 text-xs rounded-md border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900`}
                            >
                                <div className="flex items-center">
                                    <div
                                        className="w-5 h-5 rounded-full flex items-center justify-center mr-2 bg-background">
                                        

                                        {getRecordTypeIcon(record.type, record.key)}
                                    </div>
                                    <div className="font-medium">{
                                        record.type === "addr" ? getCoinTypeDetails(record.key as SupportedCoins).symbol.toUpperCase() :
                                            record.key
                                    }</div>

                                    <Badge variant="outline"
                                           className="ml-auto text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50">NEW</Badge>

                                </div>

                                <div
                                    className="mt-1.5 pl-7 font-mono text-xs break-all bg-background px-2 py-1 rounded">
                                    {record.value}
                                </div>
                            </div>
                        )
                    })
                }
                {
                    updated.map((record)=> {
                        return (
                            <div
                                key={`${record.type}-${record.key}`}
                                className={`p-3 text-xs rounded-md border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900`}
                            >
                                <div className="flex items-center">
                                    <div
                                        className="w-5 h-5 rounded-full flex items-center justify-center mr-2 bg-background">
                                        {getRecordTypeIcon(record.type, record.key)}
                                    </div>
                                    <div className="font-medium">{
                                        record.type === "addr" ? getCoinTypeDetails(record.key as SupportedCoins).symbol.toUpperCase() :
                                            record.key
                                    }</div>


                                    <Badge variant="outline" className="ml-auto text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50">UPDATED</Badge>
                                </div>

                                <div
                                    className="mt-1.5 pl-7 font-mono text-xs break-all bg-background px-2 py-1 rounded">
                                    {record.value}
                                </div>
                            </div>
                        )
                    })
                }
                {
                    deleted.map((record)=> {
                        return (
                            <div
                                key={`${record.type}-${record.key}`}
                                className={`p-3 text-xs rounded-md border bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900`}
                            >
                                <div className="flex items-center">
                                    <div
                                        className="w-5 h-5 rounded-full flex items-center justify-center mr-2 bg-background">
                                        {getRecordTypeIcon(record.type, record.key)}
                                    </div>
                                    <div className="font-medium">{
                                        record.type === "addr" ? getCoinTypeDetails(record.key as SupportedCoins).symbol.toUpperCase() :
                                            record.key
                                    }</div>


                                    <Badge variant="outline" className="ml-auto text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50">REMOVED</Badge>
                                </div>

                                <div
                                    className="mt-1.5 pl-7 font-mono text-xs break-all bg-background px-2 py-1 rounded">
                                    {record.value}
                                </div>
                            </div>
                        )
                    })
                }
                {
                    cumulativeRecordsWithoutChanges.map((record)=> {
                        return (
                            <div
                                key={`${record.type}-${record.key}`} className={`p-3 text-xs rounded-md border`}
                            >
                                <div className="flex items-center">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center mr-2 bg-background">
                                        {getRecordTypeIcon(record.type, record.key)}
                                    </div>
                                    <div className="font-medium">{
                                        record.type ==="addr"? getCoinTypeDetails(record.key as  SupportedCoins).symbol.toUpperCase():
                                        record.key
                                    }</div>
                                </div>

                                <div className="mt-1.5 pl-7 font-mono text-xs break-all bg-background px-2 py-1 rounded">
                                    {record.value}
                                </div>
                            </div>
                        )
                    })
                }

            </SidebarContent>
        </Sidebar>

    );
};

export default ENSSidebar;