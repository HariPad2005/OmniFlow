"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import { SUPPORTED_CHAINS, TransferParams } from "@avail-project/nexus-core";
import { sdk } from "@/lib/nexus"; // your nexus.ts file

export default function CustomizeOmniFlow() {
  const [threshold, setThreshold] = useState("");
  const [destinationChain, setDestinationChain] = useState("");
  const [token, setToken] = useState("USDC");
  const [amount, setAmount] = useState("");

  async function handleSave() {
    if (!sdk.isInitialized()) return alert("Please initialize Nexus first.");

    const params: TransferParams = {
      token,
      amount: Number(amount),
      chainId: Number(destinationChain),
      recipient: await sdk.getAddress(),
    };
    await sdk.transfer(params);
    alert("Automation rule saved and test transfer initiated!");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-teal-50 dark:from-gray-950 dark:to-gray-900 p-10">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-24 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center">Customize Your OmniFlow</h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
          OmniFlow automatically manages your assets across chains. Set rules like:  
          “If my Base balance drops below 0.01 ETH, bridge 0.05 ETH from Polygon.”
        </p>

        <div className="flex flex-col gap-4">
          <label className="font-semibold">Threshold Amount</label>
          <input
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="e.g. 0.01 ETH"
            className="p-3 border rounded-lg dark:bg-gray-800"
          />

          <label className="font-semibold">Destination Chain</label>
          <select
            value={destinationChain}
            onChange={(e) => setDestinationChain(e.target.value)}
            className="p-3 border rounded-lg dark:bg-gray-800"
          >
            {Object.entries(SUPPORTED_CHAINS).map(([name, id]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <label className="font-semibold">Token</label>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="p-3 border rounded-lg dark:bg-gray-800"
          >
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="ETH">ETH</option>
          </select>

          <label className="font-semibold">Amount to Transfer</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 0.05"
            className="p-3 border rounded-lg dark:bg-gray-800"
          />

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
