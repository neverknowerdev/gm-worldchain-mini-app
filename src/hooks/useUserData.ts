'use client';
import { useState, useEffect, useCallback } from 'react';

interface UserData {
    userExist: boolean;
    userIndex: string;
    twitterID: string;
    isWorldchain: boolean;
    mintedAmount: string;
    userBalance: string;
    verificationType: number;
    walletAddress: string;
}

interface UseUserDataReturn {
    userData: UserData | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useUserData = (walletAddress: string | null): UseUserDataReturn => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = useCallback(async () => {
        if (!walletAddress) {
            setUserData(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/get-user?walletAddress=${encodeURIComponent(walletAddress)}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch user data');
            }

            const result = await response.json();

            if (result.success && result.data) {
                setUserData(result.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            setUserData(null);
        } finally {
            setLoading(false);
        }
    }, [walletAddress]);

    useEffect(() => {
        fetchUserData();
    }, [walletAddress, fetchUserData]);

    return {
        userData,
        loading,
        error,
        refetch: fetchUserData,
    };
};
