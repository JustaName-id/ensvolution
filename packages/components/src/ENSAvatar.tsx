import React from "react";
import {getRecordTypeIcon} from "@ensvolution/helpers";
import { cn } from "@ensvolution/ui/lib/utils";

export const EnsAvatar = ({ avatarLink, bgColor }: {
    bgColor?: string;
  avatarLink?: string | null | undefined }) => {
    const [error, setError] = React.useState<boolean>(false);
    if (!avatarLink || error) {
        return React.cloneElement(getRecordTypeIcon('text', 'avatar') as React.ReactSVGElement, {
            width: 15,
            height: 15,
            className: cn(          bgColor === "green" && "bg-green-500",
              bgColor === "blue" && "bg-blue-500",
              bgColor === "red" && "bg-red-500")
        });
    }
    return (
            <img src={avatarLink || ''} className={"rounded-full"}
                onError={() => setError(true)}
                 alt={avatarLink || "avatar"}
            />
    )
}
