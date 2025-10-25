'use client';

import { useEffect, useState } from 'react';
import { getUnifiedBalances, isInitialized } from '../lib/nexus';

interface ChainBalance {
  balance: string;
  balanceInFiat: number;
  chain: {
    id: number;
    logo: string;
    name: string;
  };
  contractAddress: string;
  decimals: number;
  universe: number;
}

interface UnifiedBalance {
  abstracted: boolean;
  balance: string;
  balanceInFiat: number;
  breakdown: ChainBalance[];
  decimals: number;
  icon: string;
  symbol: string;
}

export default function FetchUnifiedBalanceButton({
  className,
  onResult,
}: { className?: string; onResult?: (r: any) => void }) {
  const [initialized, setInitialized] = useState(() => isInitialized());
  const [balances, setBalances] = useState<UnifiedBalance[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInitialized(isInitialized());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onClick = async () => {
    if (!initialized) return alert('Initialize first');
    const res = await getUnifiedBalances();
    setBalances(res);
    onResult?.(res);
  };

  return (
    <div className="space-y-4">
      <button
        className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 ${className}`}
        onClick={onClick}
        disabled={!initialized}
      >
        Fetch Unified Balances
      </button>

      {/* Display balances */}
      {balances.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {balances.map((token, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center space-x-4 mb-3">
                <img
                  src={token.icon}
                  alt={token.symbol}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-bold text-lg">{token.symbol}</h2>
                  <p className="text-gray-500 text-sm">
                    Total: {parseFloat(token.balance).toLocaleString()} ({token.balanceInFiat?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold mb-1 text-gray-700">Breakdown:</h3>
                <ul className="space-y-1">
                  {token.breakdown.map((chain, cidx) => (
                    <li key={cidx} className="flex items-center space-x-2">
                      <img
                        src={chain.chain.logo}
                        alt={chain.chain.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-gray-600 text-sm font-medium">
                        {chain.chain.name}:
                      </span>
                      <span className="text-gray-800 text-sm">
                        {parseFloat(chain.balance).toLocaleString()} ({chain.balanceInFiat?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
