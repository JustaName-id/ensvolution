import { Diff, PlusCircle, Trash2 } from "lucide-react";
import React, {memo, useMemo} from "react";
import {formatDate, getColorByProfile} from '@ensvolution/helpers'
import {ProfileStateWithChanges} from "@ensvolution/types";
// import {EnsAvatar} from "@ensvolution/components/ENSAvatar";
import {RecordDisplay} from "@ensvolution/components/RecordDisplay";
import { EnsAvatar } from "@ensvolution/components/ENSAvatar";

interface ENSProfileCardProps extends ProfileStateWithChanges {
    handleClick?: () => void;
    selectedProfile?: ProfileStateWithChanges;
    selected?: boolean;
}

export const ENSProfileCard: React.FC<ENSProfileCardProps> = ({
                                                           handleClick=()=> {},
                                                            selected=false,
                                                           ...data
}) => {

    const textRecords = useMemo(() => {
        return data.cumulativeRecords.filter(record => record.type==="text")
    },[data])

    const avatar = useMemo(()=> {
        return textRecords.find(record => record.key === 'avatar')?.value;
    },[textRecords])


    const hasChanges = data.changes.deleted.length > 0 ||
        data.changes.added.length > 0 ||
        data.changes.updated.length > 0 ||
        data.resolverChange;

    const parsedEventType = useMemo(() => {
        switch(data.eventType){
            case "text": return "Text"
            case "addr": return "Address"
            case "contentHash": return "Content Hash"
            case "multi": return "Multiple"
            case "resolver": return "Resolver"
        }
    },[data])

    const parsedChanges = useMemo(() => {
        if(!data?.currentUpdatedRecords) return "change"
        return data?.currentUpdatedRecords?.length > 1  ? "changes" : "change"
    },[data])

    return (
        <div
            className={`w-64 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer ${selected ? " border-b-4 border-t-4" : "border-t-4"}`}
            style={{
                borderColor: getColorByProfile(data)
            }}
            onClick={handleClick}
        >
            <div className="px-3 py-2 space-x-1 bg-gray-50 border-b flex flex-row">
                <div className={"w-6 h-6 rounded-full my-auto bg-gray-500 flex items-center justify-center"}>
                      <EnsAvatar avatarLink={avatar} />
                </div>
                <div>
                    <div className="text-sm font-medium text-gray-700">{data.name}</div>
                    <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">{formatDate(data.timestamp)} • {parsedEventType} {parsedChanges}</div>
                    </div>
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
        </div>
    );
};
