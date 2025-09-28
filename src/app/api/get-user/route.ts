import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, isAddress } from 'viem';
import { base } from 'viem/chains';
import UserContractABI from '../../../abi/UserContract.json';

// Type definition for UserInfo struct
interface UserInfo {
    userExist: boolean;
    userIndex: bigint;
    twitterID: string;
    isWorldchain: boolean;
    mintedAmount: bigint;
    userBalance: bigint;
    verificationType: number;
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const walletAddress = searchParams.get('walletAddress');

        // Validate wallet address parameter
        if (!walletAddress) {
            return NextResponse.json(
                { error: 'walletAddress parameter is required' },
                { status: 400 }
            );
        }

        if (!isAddress(walletAddress)) {
            return NextResponse.json(
                { error: 'Invalid wallet address format' },
                { status: 400 }
            );
        }

        // Get environment variables
        const rpcUrl = process.env.BASE_RPC_URL;
        const contractAddress = process.env.BASE_CONTRACT_ADDRESS as `0x${string}`;

        if (!rpcUrl) {
            return NextResponse.json(
                { error: 'BASE_RPC_URL environment variable is not configured' },
                { status: 500 }
            );
        }

        if (!contractAddress) {
            return NextResponse.json(
                { error: 'BASE_CONTRACT_ADDRESS environment variable is not configured' },
                { status: 500 }
            );
        }

        // Create public client for Base network
        const client = createPublicClient({
            chain: base,
            transport: http(rpcUrl),
        });

        // Call the smart contract getUser function
        const result = await client.readContract({
            address: contractAddress,
            abi: UserContractABI,
            functionName: 'getUser',
            args: [walletAddress as `0x${string}`],
        }) as UserInfo;

        // Transform bigint values to strings for JSON serialization
        const userInfo = {
            userExist: result.userExist,
            userIndex: result.userIndex.toString(),
            twitterID: result.twitterID,
            isWorldchain: result.isWorldchain,
            mintedAmount: result.mintedAmount.toString(),
            userBalance: result.userBalance.toString(),
            verificationType: result.verificationType,
            walletAddress: walletAddress,
        };

        return NextResponse.json({
            success: true,
            data: userInfo,
        });

    } catch (error) {
        console.error('Error calling getUser contract function:', error);

        return NextResponse.json(
            {
                error: 'Failed to fetch user data from contract',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { walletAddress } = body;

        // Validate wallet address parameter
        if (!walletAddress) {
            return NextResponse.json(
                { error: 'walletAddress is required in request body' },
                { status: 400 }
            );
        }

        if (!isAddress(walletAddress)) {
            return NextResponse.json(
                { error: 'Invalid wallet address format' },
                { status: 400 }
            );
        }

        // Get environment variables
        const rpcUrl = process.env.BASE_RPC_URL;
        const contractAddress = process.env.BASE_CONTRACT_ADDRESS as `0x${string}`;

        if (!rpcUrl) {
            return NextResponse.json(
                { error: 'BASE_RPC_URL environment variable is not configured' },
                { status: 500 }
            );
        }

        if (!contractAddress) {
            return NextResponse.json(
                { error: 'BASE_CONTRACT_ADDRESS environment variable is not configured' },
                { status: 500 }
            );
        }

        // Create public client for Base network
        const client = createPublicClient({
            chain: base,
            transport: http(rpcUrl),
        });

        // Call the smart contract getUser function
        const result = await client.readContract({
            address: contractAddress,
            abi: UserContractABI,
            functionName: 'getUser',
            args: [walletAddress as `0x${string}`],
        }) as UserInfo;

        // Transform bigint values to strings for JSON serialization
        const userInfo = {
            userExist: result.userExist,
            userIndex: result.userIndex.toString(),
            twitterID: result.twitterID,
            isWorldchain: result.isWorldchain,
            mintedAmount: result.mintedAmount.toString(),
            userBalance: result.userBalance.toString(),
            verificationType: result.verificationType,
            walletAddress: walletAddress,
        };

        return NextResponse.json({
            success: true,
            data: userInfo,
        });

    } catch (error) {
        console.error('Error calling getUser contract function:', error);

        return NextResponse.json(
            {
                error: 'Failed to fetch user data from contract',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
