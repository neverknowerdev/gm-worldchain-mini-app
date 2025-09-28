'use client';
import { Button } from '@worldcoin/mini-apps-ui-kit-react';

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

interface UserDashboardProps {
    userData: UserData;
    onVerify: () => void;
}

export const UserDashboard = ({ userData, onVerify }: UserDashboardProps) => {
    const isVerified = userData.verificationType > 0;
    const isWorldchain = userData.isWorldchain;

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* User Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">User Profile</h2>
                    <div className="flex items-center gap-2">
                        {isWorldchain && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Worldchain
                            </span>
                        )}
                        {isVerified ? (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Verified
                            </span>
                        ) : (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Unverified
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Twitter ID</label>
                        <p className="text-lg font-semibold text-gray-900">@{userData.twitterID}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-500">Wallet Address</label>
                        <p className="text-sm font-mono text-gray-700 break-all">
                            {userData.walletAddress}
                        </p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-500">User Index</label>
                        <p className="text-lg font-semibold text-gray-900">#{userData.userIndex}</p>
                    </div>
                </div>
            </div>

            {/* Token Balance Card */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">GM Token Balance</h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                            {parseInt(userData.userBalance).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">Current Balance</p>
                    </div>

                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                            {parseInt(userData.mintedAmount).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">Total Minted</p>
                    </div>
                </div>
            </div>

            {/* Verification Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Verification Status</h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Identity Verification</p>
                            <p className="text-sm text-gray-600">
                                {isVerified
                                    ? `Verified (Type ${userData.verificationType})`
                                    : 'Not verified - Connect your Twitter account'
                                }
                            </p>
                        </div>

                        <div className="flex items-center">
                            {isVerified ? (
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {!isVerified && (
                        <Button
                            onClick={onVerify}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Verify Identity
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
