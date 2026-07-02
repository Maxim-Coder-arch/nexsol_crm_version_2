'use client';
import { User } from '@/types/hooks/useUser.type';
import { useState, useEffect } from 'react';

let cachedUser: User | null = null;
let cachedPromise: Promise<User | null> | null = null;

const fetchUser = async (): Promise<User | null> => {
    if (cachedUser !== null) {
        return cachedUser;
    }

    try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
            const data = await response.json();
            cachedUser = data.user;
            return cachedUser;
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
};

export const useUser = () => {
    const [user, setUser] = useState<User | null>(cachedUser);
    const [loading, setLoading] = useState(!cachedUser);

    useEffect(() => {
        if (cachedUser !== null) {
            setUser(cachedUser);
            setLoading(false);
            return;
        }

        if (cachedPromise) {
            cachedPromise.then(setUser).finally(() => setLoading(false));
            return;
        }

        cachedPromise = fetchUser();
        cachedPromise
            .then(setUser)
            .finally(() => {
                setLoading(false);
                cachedPromise = null;
            });
    }, []);

    return { user, loading };
};