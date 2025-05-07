import React, { useMemo } from 'react';
import {getRecordTypeIcon} from "@ensvolution/helpers";
import { EnsAvatar } from '@ensvolution/components/ENSAvatar'
import { BaseIcon } from '@ensvolution/ui/common/base-icon';
import { cn } from "@ensvolution/ui/lib/utils";
export interface RecordType {
    type: string;
    key: string;
    value: string;
}

interface RecordIconProps {
    record: RecordType;
    bgColor?: string;
    size?: number | string;
    color?: string;
    padding?: number
}

export const RecordIcon: React.FC<RecordIconProps> = ({
                                                          record,
                                                          bgColor,
    size = 24,
    padding = 7,
    color= "text-white"
}) => {
    const icon = useMemo(()=>{
      let tempIcon: React.ReactNode = getRecordTypeIcon(record.type, record.key)
      if(!tempIcon){
        tempIcon = <BaseIcon letter={record.key[0] || "?"} />
      }

      return tempIcon as React.ReactSVGElement
    },[record.key, record.type])

    if (record.type === "addr") {
        return React.cloneElement(icon, {
            width: size,
            height: size,
            className: color
        });
    }

    if (record.key === "avatar") {
        return (
            <div className={cn(`rounded-full flex items-center justify-center`,
              bgColor === "green" && "bg-green-500",
              bgColor === "blue" && "bg-blue-500",
              bgColor === "red" && "bg-red-500"
            )}
             style={{
                 width: size,
                 height: size,
             }}
            >
                <EnsAvatar avatarLink={record.value} bgColor={bgColor}/>
            </div>
        );
    }

    return (
        <div className={cn(`rounded-full flex items-center justify-center bg-${bgColor} `,
          bgColor === "green" && "bg-green-500",
          bgColor === "blue" && "bg-blue-500",
          bgColor === "red" && "bg-red-500",
          color,
          )}

        style={{
          width: size,
          height: size,
        }}
        >
            {React.cloneElement(icon, {
                width: typeof size ==='number' ? size - padding : size,
                height: typeof size ==='number' ? size - padding : size,
            })}
        </div>
    );
};
