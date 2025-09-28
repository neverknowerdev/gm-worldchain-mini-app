'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@worldcoin/mini-apps-ui-kit-react';
import { useCallback, useState } from 'react';

export const LogoutButton = () => {
    const [isPending, setIsPending] = useState(false);

    const onClick = useCallback(async () => {
        if (isPending) {
            return;
        }

        setIsPending(true);
        try {
            await signOut({
                callbackUrl: '/' // Redirect to home page after logout
            });
        } catch (error) {
            console.error('Logout error', error);
        } finally {
            setIsPending(false);
        }
    }, [isPending]);

    return (
        <Button
            onClick={onClick}
            disabled={isPending}
            size="sm"
            variant="secondary"
        >
            {isPending ? 'Logging out...' : 'Logout'}
        </Button>
    );
};
