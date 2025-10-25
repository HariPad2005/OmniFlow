'use client';

import { useState } from 'react';
import ConnectButton from '@/components/connect-button';
import InitButton from '@/components/init-button';
import FetchUnifiedBalanceButton from '@/components/fetch-unified-balance-button';
import DeinitButton from '@/components/de-init-button';
import { isInitialized } from '@/lib/nexus';
import { NexusProvider } from '@avail-project/nexus-widgets';
import TransferButton from '@/components/transfer-button';

export default function Page() {
  const [initialized, setInitialized] = useState(isInitialized());
  const [balances, setBalances] = useState<any>(null);

  const btn =
    'px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <ConnectButton className={btn} />

        {/* 🧠 Wrap all Nexus-related buttons inside NexusProvider */}
        <NexusProvider
              config={{
        debug: false, // true to view debug logs
        network: 'testnet', // "mainnet" (default) or "testnet"
      }}>
          <InitButton className={btn} onReady={() => setInitialized(true)} />

          <FetchUnifiedBalanceButton
            className={btn}
            onResult={(r) => setBalances(r)}
          />

          <TransferButton />

          <DeinitButton
            className={btn}
            onDone={() => {
              setInitialized(false);
              setBalances(null);
            }}
          />
        </NexusProvider>

        <div className="mt-2">
          <b>Nexus SDK Initialization Status:</b>{' '}
          {initialized ? 'Initialized' : 'Not initialized'}
        </div>

        {balances && (
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(balances, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
