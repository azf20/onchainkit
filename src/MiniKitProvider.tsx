'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { cookieStorage, createConfig, createStorage, http, WagmiProvider } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import sdk from "@farcaster/frame-sdk";
import type { Context, FrameNotificationDetails } from "@farcaster/frame-sdk";
import { validateNotificationProxy } from './minikit/utils/validateNotificationProxy';

const defaultConfig = createConfig({
  chains: [base, baseSepolia],
  connectors: [farcasterFrame()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

type MiniKitContextType = {
  context: Context.FrameContext | null;
  setNotificationDetails: (details: FrameNotificationDetails) => void;
  setFrameAdded: () => void;
  notificationProxyUrl: string;
};

const EMPTY_CONTEXT:MiniKitContextType = {
  context: null,
  setNotificationDetails: () => {},
  setFrameAdded: () => {},
  notificationProxyUrl: '',
};

export const MiniKitContext =
  createContext<MiniKitContextType>(EMPTY_CONTEXT);

export type MiniKitProviderReact = {
  children: React.ReactNode;
  notificationProxyUrl?: string;
};

/**
 * Provides the MiniKit React Context to the app.
 */
export function MiniKitProvider({
  children,
  notificationProxyUrl = '/api/notify',
}: MiniKitProviderReact) {
  const [context, setContext] = useState<Context.FrameContext | null>(null);
  
  useEffect(() => {
    async function fetchContext() {
      const context = await sdk.context;

      console.log('context', context);
      setContext(context);
    }

    fetchContext();
  }, []);

  useEffect(() => {
    async function validateProxy() {
      const isValid = await validateNotificationProxy(notificationProxyUrl);
      if (!isValid) {
        console.error('Notification proxy is not valid, please set up a valid notification proxy at `/api/notify` or set the `notificationProxyUrl` prop');
      }
    }

    validateProxy();
  }, [notificationProxyUrl]);

  const setNotificationDetails = useCallback((details: FrameNotificationDetails) => {
    if (context) {
      setContext({
        ...context,
        client: {
          ...context?.client,
          notificationDetails: details,
        }
      });
    }
  }, [context]);

  const setFrameAdded = useCallback(() => {
    if (context) {
      setContext({
        ...context,
        client: {
          ...context?.client,
          added: true,
        }
      });
    }
  }, [context]);

  const value = useMemo(() => {
    return {
      context,
      setNotificationDetails,
      setFrameAdded,
      notificationProxyUrl,
    };
  }, [context, setNotificationDetails, setFrameAdded, notificationProxyUrl]);

  return (
    <WagmiProvider config={defaultConfig}>
      <MiniKitContext.Provider value={value}>
        <div style={{ 
          paddingTop: context?.client.safeAreaInsets?.top ?? 0, 
          paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
          paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
          paddingRight: context?.client.safeAreaInsets?.right ?? 0 ,
        }}>
          {children}
        </div>
      </MiniKitContext.Provider>
    </WagmiProvider>
  );
}

