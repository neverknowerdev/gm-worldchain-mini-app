'use client';
import { useUserData } from '@/hooks/useUserData';
import { TwitterOnboarding } from '@/components/TwitterOnboarding';
import { UserDashboard } from '@/components/UserDashboard';
import { LiveFeedback } from '@worldcoin/mini-apps-ui-kit-react';

interface HomeContentProps {
    walletAddress: string | null;
}

export const HomeContent = ({ walletAddress }: HomeContentProps) => {
    const { userData, loading, error, refetch } = useUserData(walletAddress);

    const handleVerify = () => {
        // TODO: Implement verification logic
        console.log('Starting verification process...');
    };

    if (!walletAddress) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
                <div className="text-red-500 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">No Wallet Connected</h2>
                <p className="text-gray-600">Please connect your wallet to continue.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
                <LiveFeedback
                    label={{
                        pending: 'Loading user data...',
                        success: 'Data loaded successfully',
                        failed: 'Failed to load data',
                    }}
                    state="pending"
                >
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </LiveFeedback>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
                <div className="text-red-500 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                    onClick={refetch}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!userData || !userData.userExist) {
        return <TwitterOnboarding walletAddress={walletAddress} />;
    }

    return <UserDashboard userData={userData} onVerify={handleVerify} />;
};
