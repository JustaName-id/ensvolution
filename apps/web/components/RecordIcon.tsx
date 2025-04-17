import React from "react";
import {getRecordTypeIcon} from "@/lib/utils";
import {EnsAvatar} from "@/components/ENSAvatar";

export interface RecordType {
    type: string;
    key: string;
    value: string;
}

interface RecordIconProps {
    record: RecordType;
    bgColor?: string;
    size?: number;
    color?: string;
}

export const RecordIcon: React.FC<RecordIconProps> = ({
                                                          record,
                                                          bgColor,
    size = 24,
    color= "text-white"
}) => {
    if (record.type === "addr") {
        return React.cloneElement(getRecordTypeIcon(record.type, record.key) as React.ReactSVGElement, {
            // width: 24,
            // height: 24,
            width: size,
            height: size,
            className: color
            // className: "w-6 h-6"
        });
    }

    if (record.key === "avatar") {
        return (
            <div className={`rounded-full flex items-center justify-center ${bgColor ? `bg-${bgColor}` : ""}`}
             style={{
                 width: size,
                 height: size,
             }}
            >
                <EnsAvatar recordValue={record.value} bgColor={bgColor}/>
            </div>
        );
    }

    return (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-${bgColor} ${color}`}>
            {React.cloneElement(getRecordTypeIcon(record.type, record.key) as React.ReactSVGElement, {
                width: 15,
                height: 15,
                className: `bg-${bgColor}! `
            })}
        </div>
    );
};