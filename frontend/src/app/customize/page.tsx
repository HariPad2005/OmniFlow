"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import {
  type SUPPORTED_CHAINS_IDS,
  type SUPPORTED_TOKENS as SupportedTokenType,
  type TransferParams,
  type TransferResult,
} from "@avail-project/nexus-core";
import { useNexus } from "@/providers/NexusProvider";
import { useAccount } from "wagmi";

export default function CustomizeOmniFlow() {
  const { nexusSDK } = useNexus();
  const { address } = useAccount();

  const [threshold, setThreshold] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<SupportedTokenType>("USDC");

  const [fromChain, setFromChain] = useState<SUPPORTED_CHAINS_IDS>(11155111); // default: Sepolia
  const [toChain, setToChain] = useState<SUPPORTED_CHAINS_IDS>(421614); // default: Arbitrum Sepolia

  // ✅ Manually define supported tokens for UI
  const supportedTokens = ["USDC", "USDT", "ETH"] as const;

  // ✅ Chain list for dropdowns
  const supportedChains = [
    { name: "Sepolia (Ethereum Testnet)", id: 11155111 },
    { name: "Arbitrum Sepolia", id: 421614 },
    { name: "Base Sepolia", id: 84532 },
    { name: "Polygon Amoy", id: 80002 },
  ] as const;

  async function handleSave() {
    if (!nexusSDK?.isInitialized()) {
      alert("⚠️ Please initialize Nexus first.");
      return;
    }

    if (!address) {
      alert("⚠️ Wallet not connected.");
      return;
    }

    if (!threshold || !amount) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    if (fromChain === toChain) {
      alert("⚠️ Source and destination chains cannot be the same.");
      return;
    }

    const params: TransferParams = {
      token,
      amount: Number(amount),
      chainId: toChain, // destination
      recipient: address as `0x${string}`,
      sourceChains: [fromChain], // source
    };

    try {
      const result: TransferResult = await nexusSDK.transfer(params);
      console.log("Transfer Result:", result);
      alert(
        `✅ Transfer executed!\n\nFrom: ${getChainName(fromChain)}\nTo: ${getChainName(
          toChain
        )}\nToken: ${token}\nAmount: ${amount}`
      );
    } catch (error) {
      console.error(error);
      alert("❌ Transfer failed. Check console for details.");
    }
  }

  function getChainName(chainId: SUPPORTED_CHAINS_IDS): string {
    const chain = supportedChains.find((c) => c.id === chainId);
    return chain ? chain.name : `Chain ${chainId}`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-teal-50 dark:from-gray-950 dark:to-gray-900 p-10">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-24 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
          Customize Your OmniFlow
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
          OmniFlow automatically manages your assets across chains. Set rules like:{" "}
          <span className="italic text-teal-500">
            “If my Base balance drops below 0.01 ETH, bridge 0.05 USDC from Sepolia to Arbitrum Sepolia.”
          </span>
        </p>

        <div className="flex flex-col gap-4">
          <label className="font-semibold">Threshold Amount</label>
          <input
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="e.g. 0.01 USDC"
            className="p-3 border rounded-lg dark:bg-gray-800"
          />

          <label className="font-semibold">Token</label>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value as SupportedTokenType)}
            className="p-3 border rounded-lg dark:bg-gray-800"
          >
            {supportedTokens.map((tk) => (
              <option key={tk} value={tk}>
                {tk}
              </option>
            ))}
          </select>

          <label className="font-semibold">Amount to Transfer</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 0.05"
            className="p-3 border rounded-lg dark:bg-gray-800"
          />

          <label className="font-semibold">From Chain (Source)</label>
          <select
            value={fromChain}
            onChange={(e) => setFromChain(Number(e.target.value) as SUPPORTED_CHAINS_IDS)}
            className="p-3 border rounded-lg dark:bg-gray-800"
          >
            {supportedChains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>

          <label className="font-semibold">To Chain (Destination)</label>
          <select
            value={toChain}
            onChange={(e) => setToChain(Number(e.target.value) as SUPPORTED_CHAINS_IDS)}
            className="p-3 border rounded-lg dark:bg-gray-800"
          >
            {supportedChains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="mt-6 bg-gradient-to-r from-teal-500 to-blue-500 hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Save Rule
          </button>
        </div>
      </div>
    </main>
  );
}
