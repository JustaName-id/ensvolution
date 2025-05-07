import React, {createContext, useState} from "react";
import { ProfileStateWithChanges } from '@ensvolution/types';

interface ENSContextProps {
    selectedProfile: ProfileStateWithChanges | null;
    changeSelectedProfile: (profile: ProfileStateWithChanges | null) => void;
}

const ENSContext = createContext<ENSContextProps>({
    selectedProfile: null,
    changeSelectedProfile: () => {}
})

interface ENSProviderProps {
    children?: React.ReactNode;
}

export const ENSProvider: React.FC<ENSProviderProps> = ({
    children
                                                        }) => {

    const [selectedProfile, setSelectedProfile] = useState<ProfileStateWithChanges | null>(null);

    const changeSelectedProfile = (_selectedProfile: ProfileStateWithChanges | null) => {
        setSelectedProfile(_selectedProfile);
    }

    return (
        <ENSContext value={{
            selectedProfile,
            changeSelectedProfile
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
