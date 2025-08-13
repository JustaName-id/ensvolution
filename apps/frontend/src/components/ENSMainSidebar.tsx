"use client"

import React from 'react';
import { useSidebar } from "@ensvolution/ui/components/sidebar";
import { useENS } from "@/providers/ENSProvider";
import ENSSidebar from "./ENSSidebar";
import OwnershipChanges from "./OwnershipChanges";
import { useSearchParams } from 'next/navigation';

interface ENSMainSidebarProps {}

const ENSMainSidebar: React.FC<ENSMainSidebarProps> = () => {
    const { selectedProfile, showOwnershipChanges } = useENS();
    const { isSidebarOpen } = useSidebar();
    const searchParams = useSearchParams();
    const ensName = searchParams.get('name') || '';

    // Only render sidebar if it should be open
    if (!isSidebarOpen) {
        return null;
    }

    // Show ownership changes view
    if (showOwnershipChanges) {
        return <OwnershipChanges ensName={ensName} />;
    }

    // Show profile details if a profile is selected
    if (selectedProfile) {
        return <ENSSidebar />;
    }

    // Don't render anything if no content to show
    return null;
};

export default ENSMainSidebar;
