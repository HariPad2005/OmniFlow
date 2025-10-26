"use client";

import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const bridgeData = [
  { name: "Jan", value: 3 },
  { name: "Feb", value: 5 },
  { name: "Mar", value: 8 },
  { name: "Apr", value: 12 },
  { name: "May", value: 9 },
  { name: "Jun", value: 15 },
];

const assetDistribution = [
  { name: "Base", value: 40 },
  { name: "Polygon", value: 25 },
  { name: "Arbitrum", value: 20 },
  { name: "Avalanche", value: 15 },
];

const COLORS = ["#14b8a6", "#3b82f6", "#facc15", "#ef4444"];

export default function Dashboard() {
  return (
    <main className="min-h-screen px-10 py-20 bg-gradient-to-b from-white to-teal-50 dark:from-gray-950 dark:to-gray-900">
      <Navbar />

      <h1 className="text-3xl font-bold mb-8 text-center">OmniFlow Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Bridge Activity Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={bridgeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Asset Distribution Across Chains</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={assetDistribution} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                  {assetDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
