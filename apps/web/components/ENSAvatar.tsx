import {useEnsAvatar} from "@/hooks/use-ens-avatar";
import {getTextRecordIcon} from "@justweb3/widget";
import React from "react";
import {getRecordTypeIcon} from "@/lib/utils";

export const EnsAvatar = ({ recordValue, bgColor }: {
    bgColor?: string;
    recordValue: string | null | undefined }) => {
    const { data: avatarLink } = useEnsAvatar(recordValue) as { data: string | undefined };
    const [error, setError] = React.useState<boolean>(false);
    if (!avatarLink || error) {
        return React.cloneElement(getRecordTypeIcon('text', 'avatar') as React.ReactSVGElement, {
            width: 15,
            height: 15,
            className: bgColor ? `bg-${bgColor}! `: undefined
        });
    }
    return (
            <img src={avatarLink || ''} className={"rounded-full"}
                onError={() => setError(true)}
                 alt={recordValue || "avatar"}
            />
    )
}