import React from "react";
import {getCoinTypeDetails, SupportedCoins} from "@justaname.id/sdk";
import {RecordIcon, RecordType} from "@ensvolution/components/RecordIcon";
import {truncateString} from "@ensvolution/helpers";
import {cn} from "../../ui/src/lib/utils";

interface RecordDisplayProps {
    record: RecordType;
    bgColor: string;
    icon: React.ReactNode;
}

export const RecordDisplay: React.FC<RecordDisplayProps> = ({record, bgColor, icon}) => {
    return (
        <div className={cn("flex items-center gap-2 text-sm  p-3",
            bgColor === "green" && "bg-green-100",
            bgColor === "blue" && "bg-blue-100",
            bgColor === "red" && "bg-red-100"
        )}>
            <RecordIcon record={record} bgColor={bgColor} />
            <div className="flex-1 truncate">
                <span className="font-medium text-gray-600">
                    {record.type === "addr"
                        ? getCoinTypeDetails(record.key as SupportedCoins).symbol.toUpperCase()
                        : record.key}:
                </span>
                <span className="text-gray-600 truncate ml-1">
                    {truncateString(record.value, 15, 6)}
                </span>
            </div>
            <div>
                {icon}
            </div>
        </div>
    );
};
