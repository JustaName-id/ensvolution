"use client"

import React from 'react';
import { Sidebar } from "@ensvolution/ui/components/sidebar";
import { useENS } from "@/providers/ENSProvider";
import ENSSidebar from "./ENSSidebar";
import OwnershipChanges from "./OwnershipChanges";
import { useSearchParams } from 'next/navigation';

interface ENSMainSidebarProps {}

const ENSMainSidebar: React.FC<ENSMainSidebarProps> = () => {
    const { selectedProfile, showOwnershipChanges } = useENS();
    const searchParams = useSearchParams();
    const ensName = searchParams.get('name') || '';

    // Show ownership changes view
    if (showOwnershipChanges) {
        return (
            <Sidebar variant="sidebar" side="right">
                <OwnershipChanges ensName={ensName} className="h-full border-0" />
            </Sidebar>
        );
    }

    // Show profile details if a profile is selected
    if (selectedProfile) {
        return <ENSSidebar />;
    }

    // Don't render anything if no profile selected and not showing ownership
    return null;
};

export default ENSMainSidebar;
