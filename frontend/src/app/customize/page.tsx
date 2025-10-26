"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import {
  SUPPORTED_CHAINS,
  SUPPORTED_TOKENS,
  type SUPPORTED_CHAINS_IDS,
  type TransferParams,
} from "@avail-project/nexus-core";
import { useNexus } from "@/providers/NexusProvider";

export default function CustomizeOmniFlow() {
  const { nexusSDK } = useNexus(); // ✅ Hook used properly
  const [threshold, setThreshold] = useState("");
  const [destinationChain, setDestinationChain] = useState<SUPPORTED_CHAINS_IDS | "">("");
  const [token, setToken] = useState<keyof typeof SUPPORTED_TOKENS>("USDC");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSave() {
    if (!nexusSDK?.isInitialized()) {
      alert("⚠️ Please initialize Nexus first.");
      return;
    }

    if (!threshold || !destinationChain || !amount) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);

      const address = await nexusSDK.getAddress();
      if (!address) throw new Error("Unable to fetch user address");

      const params: TransferParams = {
        token: token as SUPPORTED_TOKENS,
        amount: Number(amount),
        chainId: Number(destinationChain) as SUPPORTED_CHAINS_IDS,
        recipient: address as `0x${string}`,
      };

      await nexusSDK.transfer(params);

      alert("✅ Automation rule saved and test transfer executed!");
    } catch (error: any) {
      console.error(error);
      alert("❌ Failed to save rule: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-teal-50 dark:from-gray-950 dark:to-gray-900 p-10 transition-colors duration-300">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-24 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl rounded-2xl p-10 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-[1.01] hover:shadow-teal-500/20">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
          Customize Your OmniFlow
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-10 text-center text-lg leading-relaxed">
          OmniFlow automates your cross-chain balance management.  
          Set rules like:  
          <span className="italic text-teal-500">“If my Base balance drops below 0.01 ETH, bridge 0.05 ETH from Polygon.”</span>
        </p>

        <div className="flex flex-col gap-5">
          <div>
            <label className="font-semibold text-gray-800 dark:text-gray-200">Threshold Amount</label>
            <input
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              placeholder="e.g. 0.01 ETH"
              className="p-3 w-full border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800 dark:text-gray-200">Destination Chain</label>
            <select
              value={destinationChain}
              onChange={(e) =>
                setDestinationChain(Number(e.target.value) as SUPPORTED_CHAINS_IDS)
              }
              className="p-3 w-full border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">Select a chain</option>
              {Object.entries(SUPPORTED_CHAINS).map(([name, id]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-800 dark:text-gray-200">Token</label>
            <select
              value={token}
              onChange={(e) => setToken(e.target.value as keyof typeof SUPPORTED_TOKENS)}
              className="p-3 w-full border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              {Object.keys(SUPPORTED_TOKENS).map((tk) => (
                <option key={tk} value={tk}>
                  {tk}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-800 dark:text-gray-200">Amount to Transfer</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 0.05"
              className="p-3 w-full border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`mt-8 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isLoading ? "Processing..." : "💾 Save Rule"}
          </button>
        </div>
      </div>
    </main>
  );
}
