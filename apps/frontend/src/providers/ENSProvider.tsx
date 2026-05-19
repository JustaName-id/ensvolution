import React, {createContext, useState} from "react";
import { LifecycleNodeData, OwnershipChangeNodeData, ProfileStateWithChanges } from '@ensvolution/types';

export interface OwnershipChangeSelection {
    id: string;
    data: OwnershipChangeNodeData;
}

export interface LifecycleSelection {
    id: string;
    data: LifecycleNodeData;
}

interface ENSContextProps {
    selectedProfile: ProfileStateWithChanges | null;
    changeSelectedProfile: (profile: ProfileStateWithChanges | null) => void;
    showOwnershipChanges: boolean;
    setShowOwnershipChanges: (show: boolean) => void;
    selectedOwnershipChange: OwnershipChangeSelection | null;
    changeSelectedOwnershipChange: (change: OwnershipChangeSelection | null) => void;
    selectedLifecycle: LifecycleSelection | null;
    changeSelectedLifecycle: (event: LifecycleSelection | null) => void;
}

const ENSContext = createContext<ENSContextProps>({
    selectedProfile: null,
    changeSelectedProfile: () => undefined,
    showOwnershipChanges: false,
    setShowOwnershipChanges: () => undefined,
    selectedOwnershipChange: null,
    changeSelectedOwnershipChange: () => undefined,
    selectedLifecycle: null,
    changeSelectedLifecycle: () => undefined,
})

interface ENSProviderProps {
    children?: React.ReactNode;
}

export const ENSProvider: React.FC<ENSProviderProps> = ({
    children
                                                        }) => {

    const [selectedProfile, setSelectedProfile] = useState<ProfileStateWithChanges | null>(null);
    const [showOwnershipChanges, setShowOwnershipChanges] = useState<boolean>(false);
    const [selectedOwnershipChange, setSelectedOwnershipChange] = useState<OwnershipChangeSelection | null>(null);
    const [selectedLifecycle, setSelectedLifecycle] = useState<LifecycleSelection | null>(null);

    const clearOthers = (keep: 'profile' | 'ownership-list' | 'ownership-change' | 'lifecycle') => {
        if (keep !== 'profile') setSelectedProfile(null);
        if (keep !== 'ownership-list') setShowOwnershipChanges(false);
        if (keep !== 'ownership-change') setSelectedOwnershipChange(null);
        if (keep !== 'lifecycle') setSelectedLifecycle(null);
    }

    const changeSelectedProfile = (_selectedProfile: ProfileStateWithChanges | null) => {
        setSelectedProfile(_selectedProfile);
        if (_selectedProfile) clearOthers('profile');
    }

    const handleShowOwnershipChanges = (show: boolean) => {
        setShowOwnershipChanges(show);
        if (show) clearOthers('ownership-list');
    }

    const changeSelectedOwnershipChange = (change: OwnershipChangeSelection | null) => {
        setSelectedOwnershipChange(change);
        if (change) clearOthers('ownership-change');
    }

    const changeSelectedLifecycle = (event: LifecycleSelection | null) => {
        setSelectedLifecycle(event);
        if (event) clearOthers('lifecycle');
    }

    return (
        <ENSContext value={{
            selectedProfile,
            changeSelectedProfile,
            showOwnershipChanges,
            setShowOwnershipChanges: handleShowOwnershipChanges,
            selectedOwnershipChange,
            changeSelectedOwnershipChange,
            selectedLifecycle,
            changeSelectedLifecycle,
        }}>
            {children}
        </ENSContext>
    )

}

export const useENS = () => {
    const context = React.useContext(ENSContext);
    if (!context) {
        throw new Error('useENS must be used within a ENSProvider');
    }
    return context;
};
