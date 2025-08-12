import React, {createContext, useState} from "react";
import { ProfileStateWithChanges } from '@ensvolution/types';

interface ENSContextProps {
    selectedProfile: ProfileStateWithChanges | null;
    changeSelectedProfile: (profile: ProfileStateWithChanges | null) => void;
    showOwnershipChanges: boolean;
    setShowOwnershipChanges: (show: boolean) => void;
}

const ENSContext = createContext<ENSContextProps>({
    selectedProfile: null,
    changeSelectedProfile: () => {},
    showOwnershipChanges: false,
    setShowOwnershipChanges: () => {}
})

interface ENSProviderProps {
    children?: React.ReactNode;
}

export const ENSProvider: React.FC<ENSProviderProps> = ({
    children
                                                        }) => {

    const [selectedProfile, setSelectedProfile] = useState<ProfileStateWithChanges | null>(null);
    const [showOwnershipChanges, setShowOwnershipChanges] = useState<boolean>(false);

    const changeSelectedProfile = (_selectedProfile: ProfileStateWithChanges | null) => {
        setSelectedProfile(_selectedProfile);
    }

    return (
        <ENSContext value={{
            selectedProfile,
            changeSelectedProfile,
            showOwnershipChanges,
            setShowOwnershipChanges
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
