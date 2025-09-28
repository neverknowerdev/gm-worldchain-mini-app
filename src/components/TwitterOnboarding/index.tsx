'use client';
import { Button } from '@worldcoin/mini-apps-ui-kit-react';

interface TwitterOnboardingProps {
    walletAddress: string;
}

export const TwitterOnboarding = ({ walletAddress }: TwitterOnboardingProps) => {
    const handleTwitterConnect = () => {
        // TODO: Implement Twitter connection logic
        console.log('Connecting to Twitter for wallet:', walletAddress);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
            <div className="max-w-md mx-auto">
                <div className="mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome to GM Worldchain!
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Connect your Twitter account to get started and verify your identity.
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-2">Your Wallet Address:</p>
                    <p className="font-mono text-sm text-gray-800 break-all">
                        {walletAddress}
                    </p>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={handleTwitterConnect}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                        Connect Twitter Account
                    </Button>

                    <p className="text-xs text-gray-500">
                        By connecting your Twitter account, you agree to our terms of service and privacy policy.
                    </p>
                </div>
            </div>
        </div>
    );
};
