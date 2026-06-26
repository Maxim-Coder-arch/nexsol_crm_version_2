'use client';
import { createContext, useState, ReactNode } from 'react';

interface ProfileContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

interface ProfileProviderProps {
    children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <ProfileContext.Provider value={{ isOpen, open, close }}>
            {children}
        </ProfileContext.Provider>
    );
};