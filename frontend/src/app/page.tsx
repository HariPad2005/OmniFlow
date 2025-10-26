"use client";

import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConnectWallet from "@/components/blocks/connect-wallet";
import NexusInitButton from "@/components/nexus-init";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 bg-gradient-to-b from-teal-200 via-white to-teal-300 dark:from-gray-900 dark:via-gray-950 dark:to-teal-950 z-0"></div>

      <div className="flex flex-col items-center text-center gap-8 z-10 px-4">
        <Image src="/logo.jpg" alt="OmniFlow Logo" width={120} height={120} />
        <h1 className="text-5xl font-extrabold tracking-tight">
          OmniFlow
        </h1>
        <p className="text-xl font-medium max-w-2xl text-gray-700 dark:text-gray-300">
          Autonomous, Privacy-Aware, Cross-Chain Wallet Automation.
        </p>

        <div className="flex gap-4">
          <ConnectWallet />
          <NexusInitButton />
        </div>

        <button
          onClick={() => router.push("/customize")}
          className="mt-8 bg-gradient-to-r from-teal-500 to-blue-500 hover:opacity-90 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          Customize Your OmniFlow Now!
        </button>
      </div>
    </main>
  );
}
