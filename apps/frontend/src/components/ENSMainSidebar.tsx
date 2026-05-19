"use client"

import React from 'react';
import { useSidebar } from "@ensvolution/ui/components/sidebar";
import { useENS } from "@/providers/ENSProvider";
import ENSSidebar from "./ENSSidebar";
import OwnershipChanges from "./OwnershipChanges";
import OwnershipChangeSidebar from "./OwnershipChangeSidebar";
import LifecycleSidebar from "./LifecycleSidebar";
import { useSearchParams } from 'next/navigation';

const ENSMainSidebar: React.FC = () => {
    const {
        selectedProfile,
        showOwnershipChanges,
        selectedOwnershipChange,
        selectedLifecycle,
    } = useENS();
    const { isSidebarOpen } = useSidebar();
    const searchParams = useSearchParams();
    const ensName = searchParams.get('name') || '';

    if (!isSidebarOpen) {
        return null;
    }

    if (showOwnershipChanges) {
        return <OwnershipChanges ensName={ensName} />;
    }

    if (selectedOwnershipChange) {
        return <OwnershipChangeSidebar />;
    }

    if (selectedLifecycle) {
        return <LifecycleSidebar />;
    }

    if (selectedProfile) {
        return <ENSSidebar />;
    }

    return null;
};

export default ENSMainSidebar;
