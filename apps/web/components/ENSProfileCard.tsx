import React, {memo} from "react";
import {ProfileNode} from "@/lib/types/ens-profile";
import {formatDate, getColorByProfile, getRecordTypeIcon, truncateString,} from "@/lib/utils";
import {getCoinTypeDetails, SupportedCoins} from "@justaname.id/sdk"
import {Handle, NodeProps, Position} from "@xyflow/react";
import {Diff, PlusCircle, Trash2} from 'lucide-react'
import {useENS} from "@/providers/ENSProvider";
import {useSidebar} from "@workspace/ui/components/sidebar";
import {useFitNodes} from "@/hooks/use-fit-nodes";

const ENSProfileCard = ({data, id}: NodeProps<ProfileNode>) => {
    const { changeSelectedProfile, selectedProfile } = useENS()
    const { handleSidebarChange, isSidebarOpen } = useSidebar()
    const fitNodes = useFitNodes()
    return (
        <div
            className={`w-64 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer ${ (selectedProfile?.id === data.id && isSidebarOpen) ? " border-b-4 border-t-4" : "border-t-4" }`}
            style={{
                borderColor: getColorByProfile(data)
            }}
            onClick={()=> {
                changeSelectedProfile(data)
                if(selectedProfile?.id === data.id){
                    handleSidebarChange(!isSidebarOpen)
                }else{
                    handleSidebarChange(true)
                }

                const totalElements = data.changes.added.length + data.changes.updated.length + data.changes.deleted.length + (data.resolverChange ? 1 : 0)
                fitNodes([id])
            }}
        >
            <div className="px-4 py-2 bg-gray-50 border-b">
                <div className="text-sm font-medium text-gray-700">{data.name}</div>
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">{formatDate(data.timestamp)} • {data.eventType} change</div>
                </div>
            </div>

            {data.changes.added?.map((record, index) => (
                <div key={index} className="flex items-center gap-2 text-sm bg-green-100 p-3 ">
                    {
                        record.type === "addr" ?
                            <>
                                {React.cloneElement(getRecordTypeIcon(record.type, record.key) as React.ReactSVGElement, {
                                    width: 24,
                                    height: 24,
                                })}
                            </>
                            :
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-white bg-green-500`}>
                                {React.cloneElement(getRecordTypeIcon(record.type, record.key) as React.ReactSVGElement, {
                                    width: 15,
                                    height: 15,
                                    className: "bg-green-500! "
                                })}
                            </div>
                    }
                    <div className="flex-1 truncate">
                        <span className="font-medium text-gray-600">{
                            record.type === "addr" ? getCoinTypeDetails(record.key as SupportedCoins).symbol.toUpperCase() : record.key}: </span>
                        <span className="text-gray-600 truncate">{truncateString(record.value, 15, 6)}</span>
                    </div>
                    <div>
                        <PlusCircle className="h-4 w-4 text-green-500"/>
                    </div>
                </div>
            ))}
            {data.changes.updated?.map((record, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm bg-blue-100 p-3 ">
                        {
                            record.type === "addr" ?
                                <>
                                    {React.cloneElement(getRecordTypeIcon(record.type, record.key) as React.ReactSVGElement, {
                                        width: 24,
                                        height: 24,
                                    })}
                                </>
                                :
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white bg-blue-500`}>
                                    {React.cloneElement(getRecordTypeIcon(record.type, record.key) as React.ReactSVGElement, {
                                        width: 15,
                                        height: 15,
                                        className: "bg-blue-500! "
                                    })}
                                </div>
                        }
                        <div className="flex-1 truncate">
                        <span className="font-medium text-gray-600">{
                            record.type === "addr" ? getCoinTypeDetails(record.key as SupportedCoins).symbol.toUpperCase() : record.key}: </span>
                            <span className="text-gray-600 truncate">
                            {
                                truncateString(record.value, 15, 6)
                            }
                            </span>
                        </div>
                        <div>
                            <Diff className="h-4 w-4 text-blue-500"/>
                        </div>
                    </div>
                )
            )}
            {data.changes.deleted?.map((record, index) => (
                <div key={index} className="flex items-center gap-2 text-sm bg-red-100 p-3 ">
                    {
                        record.type === "addr" ?
                            <>
                                {React.cloneElement(getRecordTypeIcon(record.type, record.key) as React.ReactSVGElement, {
                                    width: 24,
                                    height: 24,
                                })}
                            </>
                            :
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-white bg-red-500`}>
                                {React.cloneElement(getRecordTypeIcon(record.type, record.key) as React.ReactSVGElement, {
                                    width: 15,
                                    height: 15,
                                    className: "bg-red-500! "
                                })}
                            </div>
                    }
                    <div className="flex-1 truncate">
                        <span className="font-medium text-gray-600">{
                            record.type === "addr" ? getCoinTypeDetails(record.key as SupportedCoins).symbol.toUpperCase() : record.key}: </span>
                        <span className="text-gray-600 truncate">{truncateString(record.value, 15, 6)}</span>
                    </div>
                    <div>
                        <Trash2 className="h-4 w-4 text-red-500"/>
                    </div>
                </div>
            ))}
            {data.resolverChange &&  (
                <div className="flex items-center gap-2 text-sm bg-blue-100 p-3 ">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        R
                    </div>
                    <div className="flex-1 truncate">
                        <span className="font-medium text-gray-600">resolver: </span>
                        <span
                            className="text-gray-600 truncate">{data.resolverChange.address.substring(0, 16)}...</span>
                    </div>
                    <div>
                        <Diff className="h-4 w-4 text-blue-500"/>
                    </div>
                </div>
            )}



            {
                data.changes.deleted.length === 0 && data.changes.added.length === 0 && data.changes.updated.length === 0 && !data.resolverChange &&
                <div className="text-sm text-gray-400 h-6 p-3">No changes</div>
            }

            <Handle
                type="source"
                position={Position.Right}
                id={`source-${id}`}
                style={{ background: '#555', width: '8px', height: '8px' }}
            />

            
            <Handle
                type="target"
                position={Position.Left}
                id={`target-${id}`}
                style={{ background: '#555', width: '8px', height: '8px' }}
            />
        </div>
    );
};

export default memo(ENSProfileCard);