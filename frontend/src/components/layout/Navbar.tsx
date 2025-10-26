"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon, LayoutDashboard } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 fixed top-0 left-0 z-50 backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="OmniFlow Logo" width={36} height={36} className="rounded-lg" />
        <h1 className="text-xl font-bold">OmniFlow</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-all font-semibold"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  );
}
