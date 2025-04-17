import React, {memo} from "react";
import {ProfileNode} from "@/lib/types/ens-profile";
import {formatDate, getColorByProfile, getRecordTypeIcon, truncateString,} from "@/lib/utils";
import {Handle, NodeProps, Position, useReactFlow} from "@xyflow/react";
import {Diff, PlusCircle, Trash2} from 'lucide-react'
import {useENS} from "@/providers/ENSProvider";
import {useSidebar} from "@workspace/ui/components/sidebar";
import {RecordDisplay} from "@/components/profile/RecordDisplay";


const ENSProfileCard = ({data, id}: NodeProps<ProfileNode>) => {
    const {changeSelectedProfile, selectedProfile} = useENS();
    const {handleSidebarChange, isSidebarOpen} = useSidebar();
    const { fitView } = useReactFlow()

    const handleClick = () => {
        changeSelectedProfile(data);
        fitView({
            nodes: [{id}],
            duration: 1000,
            maxZoom: 1
        })
        if (selectedProfile?.id === data.id) {
            handleSidebarChange(!isSidebarOpen);
        } else {
            handleSidebarChange(true);
        }
    };

    const hasChanges = data.changes.deleted.length > 0 ||
        data.changes.added.length > 0 ||
        data.changes.updated.length > 0 ||
        data.resolverChange;

    return (
        <div
            className={`w-64 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer ${(selectedProfile?.id === data.id && isSidebarOpen) ? " border-b-4 border-t-4" : "border-t-4"}`}
            style={{
                borderColor: getColorByProfile(data)
            }}
            onClick={handleClick}
        >
            <div className="px-4 py-2 bg-gray-50 border-b">
                <div className="text-sm font-medium text-gray-700">{data.name}</div>
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">{formatDate(data.timestamp)} • {data.eventType} change</div>
                </div>
            </div>

            {data.changes.added?.map((record, index) => (
                <RecordDisplay
                    key={index}
                    record={record}
                    bgColor="green"
                    icon={<PlusCircle className="h-4 w-4 text-green-500"/>}
                />
            ))}

            {data.changes.updated?.map((record, index) => (
                <RecordDisplay
                    key={index}
                    record={record}
                    bgColor="blue"
                    icon={<Diff className="h-4 w-4 text-blue-500"/>}
                />
            ))}

            {data.changes.deleted?.map((record, index) => (
                <RecordDisplay
                    key={index}
                    record={record}
                    bgColor="red"
                    icon={<Trash2 className="h-4 w-4 text-red-500"/>}
                />
            ))}

            {data.resolverChange && (
                <div className="flex items-center gap-2 text-sm bg-blue-100 p-3 ">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        R
                    </div>
                    <div className="flex-1 truncate">
                        <span className="font-medium text-gray-600">resolver:</span>
                        <span className="text-gray-600 truncate ml-1">
                            {data.resolverChange.address.substring(0, 16)}...
                        </span>
                    </div>
                    <div>
                        <Diff className="h-4 w-4 text-blue-500"/>
                    </div>
                </div>
            )}

            {!hasChanges && <div className="text-sm text-gray-400 h-6 p-3">No changes</div>}

            <Handle
                type="source"
                position={Position.Right}
                id={`source-${id}`}
                style={{background: '#555', width: '8px', height: '8px'}}
            />

            <Handle
                type="target"
                position={Position.Left}
                id={`target-${id}`}
                style={{background: '#555', width: '8px', height: '8px'}}
            />
        </div>
    );
};

export default memo(ENSProfileCard);