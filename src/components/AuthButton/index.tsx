'use client';
import { walletAuth } from '@/auth/wallet';
import { LiveFeedback } from '@worldcoin/mini-apps-ui-kit-react';
import { useMiniKit } from '@worldcoin/minikit-js/minikit-provider';
import { useCallback, useState } from 'react';

/**
 * This component is an example of how to authenticate a user
 * We will use Next Auth for this example, but you can use any auth provider
 * Read More: https://docs.world.org/mini-apps/commands/wallet-auth
 */
export const AuthButton = () => {
  const [isPending, setIsPending] = useState(false);
  const { isInstalled } = useMiniKit();

  const onClick = useCallback(async () => {
    if (!isInstalled || isPending) {
      return;
    }
    setIsPending(true);
    try {
      await walletAuth();
    } catch (error) {
      console.error('Wallet authentication button error', error);
      setIsPending(false);
      return;
    }

    setIsPending(false);
  }, [isInstalled, isPending]);


  return (
    <div className="w-full max-w-md mx-auto pb-4">
      <LiveFeedback
        label={{
          failed: 'Failed to login',
          pending: 'Logging in',
          success: 'Logged in',
        }}
        state={isPending ? 'pending' : undefined}
      >
        <button
          onClick={onClick}
          disabled={isPending}
          className="w-full border border-gray-300/30 rounded-full py-6 px-12 text-black font-semibold text-xl hover:bg-white/10 transition-all duration-200"
          style={{
            background: 'linear-gradient(180deg, rgba(200, 220, 200, 0.4) 0%, rgba(180, 200, 180, 0.6) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 2px 8px 0px',
            padding: '20px',
            color: 'black',
          }}
        >
          Log In with Wallet
        </button>
      </LiveFeedback>
    </div>
  );
};
