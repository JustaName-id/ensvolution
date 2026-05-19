"use client"

import React from 'react';
import { useSidebar } from "@ensvolution/ui/components/sidebar";
import { useENS } from "@/providers/ENSProvider";
import ENSSidebar from "./ENSSidebar";
import OwnershipChangeSidebar from "./OwnershipChangeSidebar";
import LifecycleSidebar from "./LifecycleSidebar";

const ENSMainSidebar: React.FC = () => {
    const {
        selectedProfile,
        selectedOwnershipChange,
        selectedLifecycle,
    } = useENS();
    const { isSidebarOpen } = useSidebar();

    if (!isSidebarOpen) {
        return null;
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
