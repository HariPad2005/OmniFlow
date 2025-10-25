'use client';

import { useState } from 'react';
import {
  SUPPORTED_CHAINS,
  type SUPPORTED_CHAINS_IDS,
  type SUPPORTED_TOKENS,
} from '@avail-project/nexus-core';
import { sdk } from '@/lib/nexus';
import type { TransferParams, TransferResult, SimulationResult } from '@avail-project/nexus-core';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowBigRight, CircleAlertIcon } from 'lucide-react';

interface TransferButtonProps {
  recipient: string;
}

export default function TransferButton({ recipient }: TransferButtonProps) {
  const [token, setToken] = useState<SUPPORTED_TOKENS>('USDC');
  const [amount, setAmount] = useState<number | string>(0);
  const [destinationChain, setDestinationChain] = useState<SUPPORTED_CHAINS_IDS>(SUPPORTED_CHAINS.ARBITRUM);
  const [isLoading, setIsLoading] = useState(false);
  const [txResult, setTxResult] = useState<TransferResult | null>(null);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);

  const handleTransfer = async () => {
    if (!sdk.isInitialized()) return alert('Initialize Nexus SDK first');
    if (!recipient) return alert('Provide recipient address');
    if (!amount || !token) return alert('Enter token and amount');

    setIsLoading(true);

    try {
      // simulate transfer first
      const sim: SimulationResult = await sdk.simulateTransfer({
        token,
        amount,
        chainId: destinationChain,
        recipient,
      } as TransferParams);
      setSimulation(sim);

      // perform transfer
      const result: TransferResult = await sdk.transfer({
        token,
        amount,
        chainId: destinationChain,
        recipient,
      } as TransferParams);
      setTxResult(result);
    } catch (err) {
      console.error('Transfer error:', err);
      alert('Transfer failed. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-lg space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="token">Token</Label>
        <select
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value as SUPPORTED_TOKENS)}
          className="w-full p-2 border rounded"
        >
          {Object.keys(SUPPORTED_TOKENS).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="destination">Destination Chain</Label>
        <select
          id="destination"
          value={destinationChain}
          onChange={(e) => setDestinationChain(Number(e.target.value) as SUPPORTED_CHAINS_IDS)}
          className="w-full p-2 border rounded"
        >
          {Object.entries(SUPPORTED_CHAINS).map(([name, id]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button onClick={handleTransfer} disabled={isLoading} className="w-full flex items-center justify-center">
        {isLoading ? <CircleAlertIcon className="animate-spin size-5 mr-2" /> : 'Transfer'}
      </Button>

      {simulation && (
        <div className="bg-gray-50 p-2 rounded text-sm">
          <b>Simulation Fees:</b>{' '}
          {simulation.intent?.fees?.map((f) => `${f.amount} ${f.token}`).join(', ')}
        </div>
      )}

      {txResult && (
        <div className="bg-green-50 p-2 rounded text-sm">
          {txResult.success ? (
            <a
              href={txResult.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline flex items-center gap-1"
            >
              Transaction Success <ArrowBigRight className="size-4" />
            </a>
          ) : (
            <span className="text-red-600">Error: {txResult.error}</span>
          )}
        </div>
      )}
    </div>
  );
}
