'use client';

import { ENVIRONMENT, ENVIRONMENT_VARIABLES } from '@/lib/constants';
import { MiniKitProvider, OnchainKitProvider } from '@coinbase/onchainkit';
import type { ReactNode } from 'react';
import { base } from 'wagmi/chains';

function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider>
      <OnchainKitProvider
        apiKey={ENVIRONMENT_VARIABLES[ENVIRONMENT.API_KEY]}
        chain={base}
        config={{
          appearance: {
            mode: 'light',
            theme: 'default',
          },
        }}
        projectId={ENVIRONMENT_VARIABLES[ENVIRONMENT.PROJECT_ID]}
        schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
      >
        {children}
      </OnchainKitProvider>
    </MiniKitProvider>
  );
}

export default Providers;
