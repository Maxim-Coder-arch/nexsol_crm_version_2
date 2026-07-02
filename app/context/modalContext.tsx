'use client';
import { ProfileContextType } from '@/types/contexts/profileContext/profileContext.type';
import { ProfileProviderProps } from '@/types/contexts/profileContext/profileProvider.type';
import { createContext, useState, ReactNode } from 'react';

export const ProfileContext = createContext<ProfileContextType | null>(null);

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