'use client';

import SwapDemo from "@/components/demo/Swap";
import WalletDemo from "@/components/demo/Wallet";
import { useAddFrame, useAuthenticate, useMiniKit, useNotification, useOpenUrl, usePrimaryButton, useViewProfile } from "@coinbase/onchainkit";
import { useCallback, useEffect } from "react";
import { BaseError, useAccount, useSignTypedData } from "wagmi";
import { base } from "wagmi/chains";
import { UserRejectedRequestError } from "viem";

export default function App() {
  const { ready, isReady, context } = useMiniKit();
  const { address } = useAccount();

  const handleViewProfile = useViewProfile();
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const sendNotification = useNotification();

  usePrimaryButton({
    text: 'primary button',
  }, () => {
    console.log('primary button clicked');
  });

  useEffect(() => {
    if (!isReady) {
      window.setTimeout(() => {
        ready();
      }, 2000)
    }
  }, [ready, isReady]);

  const {
    signTypedData,
    error: signTypedError,
    isError: isSignTypedError,
    isPending: isSignTypedPending,
  } = useSignTypedData();

  const signTyped = useCallback(() => {
    signTypedData({
      domain: {
        name: "Minikit",
        version: "1",
        chainId: base.id,
      },
      types: {
        Message: [{ name: "content", type: "string" }],
      },
      message: {
        content: "Hello from Minikit!",
      },
      primaryType: "Message",
    });
  }, [signTypedData]);
  
  const handleAddFrame = async () => {
    const notificationDetails = await addFrame();
    if (!notificationDetails) {
      console.error('No notification details returned');
      return;
    }

    sendNotification({
      title: "Added Frame!",
      body: "You've successfully added this frame",
      targetUrl: "https://onchainkit.xyz",
    });
  };

  return (
    <div>
      <WalletDemo />
      <SwapDemo />

      <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '50%', margin: '0 auto'}}>
        <Button 
          onClick={() => openUrl('https://farcaster.xyz')}>
          Open URL
        </Button>
        <Button
          onClick={signTyped}
          disabled={!address ||isSignTypedPending}
        >
          {isSignTypedPending ? 'Signing...' : 'Sign Typed Data'}
        </Button>
        {isSignTypedError && renderError(signTypedError)}
        <Button 
          disabled={!context?.user?.fid}
          onClick={handleViewProfile}>
          View Profile
        </Button>
        <Button 
          onClick={handleAddFrame}>
          Add Frame with Notification
        </Button>
        <SignIn />
      </div>
    </div>
  );
}

const renderError = (error: Error | null) => {
  if (!error) {
    return null;
  }

  if (error instanceof BaseError) {
    const isUserRejection = error.walk(
      (e) => e instanceof UserRejectedRequestError
    );

    if (isUserRejection) {
      return <div style={{color: 'red', fontSize: '12px', marginTop: '10px'}}>Rejected by user.</div>;
    }
  }

  return <div style={{color: 'red', fontSize: '12px', marginTop: '10px'}}>{error.message}</div>;
};


function SignIn() {
  const { login, logout, authenticated, isLoading } = useAuthenticate();
  
  return (
    <>
      {authenticated 
        ? (
          <Button
            onClick={logout}
            disabled={isLoading}
          >
            Sign out
          </Button>
      ) : (
          <Button
            onClick={login}
            disabled={isLoading}
          >
            Sign In with Farcaster
          </Button>
        )}
    </>
  );
}

function Button({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement> & {children: React.ReactNode}) {
  return <button 
    type="button" 
    style={{backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px'}}
    {...props}
  >
    {children}
  </button>
}