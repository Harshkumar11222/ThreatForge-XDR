import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  getAnalytics,
  type Analytics,
} from "../../services/analytics";

const COLORS = [
  "#ef4444", // Critical
  "#f97316", // High
  "#eab308", // Medium
  "#22c55e", // Low
];

export default function ThreatPieChart() {

  const [analytics, setAnalytics] =
    useState<Analytics | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!analytics) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-bold text-white">
          Threat Distribution
        </h2>

        <p className="mt-6 text-slate-400">
          Loading...
        </p>
      </div>
    );
  }

  const chartData = [
    {
      name: "Critical",
      value: analytics.severity.critical,
    },
    {
      name: "High",
      value: analytics.severity.high,
    },
    {
      name: "Medium",
      value: analytics.severity.medium,
    },
    {
      name: "Low",
      value: analytics.severity.low,
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Threat Distribution
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >

              {chartData.map((_, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}