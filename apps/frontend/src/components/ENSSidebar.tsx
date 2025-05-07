"use client"

import React from 'react';
import {ExternalLink, X} from 'lucide-react';
import {Button} from '@ensvolution/ui/components/button';
import {Badge} from '@ensvolution/ui/components/badge';
import Link from "next/link";
import {Sidebar, SidebarContent, SidebarHeader, useSidebar} from "@ensvolution/ui/components/sidebar";
import {useENS} from "@/providers/ENSProvider";
import {getCoinTypeDetails, SupportedCoins} from "@justaname.id/sdk";
import { RecordIcon } from '@ensvolution/components/RecordIcon';
import { formatDate, formatTime } from '@ensvolution/helpers';
import { useContractName } from '@ensvolution/hooks/use-contract-name';

interface ENSSidebarProps {}

const ENSSidebar: React.FC<ENSSidebarProps> = () => {
    const {selectedProfile} = useENS();
    const {handleSidebarChange} = useSidebar();
    const { data: contractName } = useContractName(
        selectedProfile?.resolverAddress)

    if (!selectedProfile) {
        return null;
    }

    const {cumulativeRecords, changes: {added, updated, deleted}, resolverChange} = selectedProfile;

    const cumulativeRecordsWithoutChanges = cumulativeRecords.filter((record: any) => {
        const isInChanges = [added, updated, deleted].some(changeArray =>
            changeArray.some((changeRecord: any) =>
                changeRecord.type === record.type &&
                changeRecord.key === record.key &&
                changeRecord.value === record.value
            )
        );
        return !isInChanges;
    });

    const renderExternalLink = (url: string, text: string) => (
        <div className="flex items-center place-content-between">
            <Link href={url} target="_blank" className="w-full flex place-content-between cursor-pointer">
                <div className="font-medium flex flex-col">
                    <span className={"my-auto underline"}>{text}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer">
                    <ExternalLink size={12}/>
                </Button>
            </Link>
        </div>
    );

    const renderProfileDetail = (label: string, value: string | number | React.ReactNode) => (
        <>
            <div className="text-sm text-muted-foreground ">{label}</div>
            {typeof value === 'string' || typeof value === 'number' ? (
                <div className="font-medium">{value}</div>
            ) : value}
        </>
    );

    const renderRecord = (record: any, type: 'default' | 'added' | 'updated' | 'deleted') => {
        const styles = {
            default: "",
            added: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900",
            updated: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900",
            deleted: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
        };

        const badges = {
            added: <Badge variant="outline" className="ml-auto text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50">NEW</Badge>,
            updated: <Badge variant="outline" className="ml-auto text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50">UPDATED</Badge>,
            deleted: <Badge variant="outline" className="ml-auto text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50">REMOVED</Badge>
        };

        const displayKey = record.type === "addr"
            ? getCoinTypeDetails(record.key as SupportedCoins).symbol.toUpperCase()
            : record.key;

        let value = record.value;
        const rawValue = record.rawValue;

        const isDecoded = value.toLowerCase() !== rawValue.toLowerCase();
        if(record.key === "url" || record.type === "contentHash") {
            value = renderExternalLink(value, value);
        }

        return (
            <div
                key={`${record.type}-${record.key}`}
                className={`p-3 text-xs rounded-md border ${styles[type]}`}
            >
                <div className="flex items-center space-x-1">
                    <RecordIcon record={record} size={20} color={"black"} padding={0}/>
                    <div className="font-medium">{displayKey}</div>
                    {type !== 'default' && badges[type]}
                </div>

                <div className="mt-1.5  pl-7 font-mono text-xs break-all bg-background px-2 py-2 rounded">
                    { isDecoded ? "Value:" : "" } {value}
                </div>
              {
                isDecoded && <div className="mt-1.5  pl-7 font-mono text-xs break-all bg-background px-2 py-2 rounded">
                    Raw Value: {rawValue}
                </div>
              }
            </div>
        );
    };

    return (
        <Sidebar variant="sidebar" side="right">
            <SidebarHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Profile Details</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSidebarChange(false)}
                    >
                        <X size={18}/>
                    </Button>
                </div>
                <div>
                    <div key="profile-details" className="p-3 text-xs rounded-md border space-y-1">
                        {renderProfileDetail("ENS", selectedProfile.name)}
                        {renderProfileDetail("Event Number", selectedProfile.id + 1)}
                        {renderProfileDetail("Timestamp", `${formatDate(selectedProfile?.timestamp)} ${formatTime(selectedProfile?.timestamp)}`)}
                        {renderProfileDetail("Block Number", selectedProfile?.blockNumber)}
                        {renderProfileDetail("Resolver Name", contractName)}
                        {renderProfileDetail("Resolver Address", renderExternalLink(
                            "https://etherscan.io/address/" + selectedProfile.resolverAddress,
                            selectedProfile?.resolverAddress?.substring(0, 25) + "..."
                        ))}
                        {renderProfileDetail("Transaction Hash", renderExternalLink(
                            "https://etherscan.io/tx/" + selectedProfile.transactionHash,
                            selectedProfile.transactionHash.substring(0, 25) + "..."
                        ))}
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-2 py-2">
                {resolverChange && (
                    <div
                        key="resolver"
                        className="p-3 text-xs rounded-md border bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900"
                    >
                        <div className="flex items-center">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center mr-2 bg-yellow-500 text-white">
                                R
                            </div>
                            <div className="font-medium">Resolver</div>
                            <Badge variant="outline" className="ml-auto text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/50">
                                CHANGED
                            </Badge>
                        </div>
                        <div className="mt-1.5 pl-7 font-mono text-xs break-all bg-background px-2 py-1 rounded">
                            {resolverChange.address}
                        </div>
                    </div>
                )}

                {added.map(record => renderRecord(record, 'added'))}
                {updated.map(record => renderRecord(record, 'updated'))}
                {deleted.map(record => renderRecord(record, 'deleted'))}
                {cumulativeRecordsWithoutChanges.map(record => renderRecord(record, 'default'))}
            </SidebarContent>
        </Sidebar>
    );
};

export default ENSSidebar;
