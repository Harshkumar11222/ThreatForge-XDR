import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  getAnalytics,
  type AnalyticsData,
} from "../../services/analytics";

export default function ThreatChart() {
  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
  try {
    const data = await getAnalytics();

    console.log("========== ANALYTICS ==========");
    console.log(data);
    console.log("monthly_attacks =", data.monthly_attacks);

    setAnalytics(data);
  } catch (error) {
    console.error(error);
  }
};

  if (!analytics) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="mb-6 h-6 w-56 animate-pulse rounded bg-slate-800"></div>
      <div className="h-80 animate-pulse rounded-2xl bg-slate-800"></div>
    </div>
  );
}

  const chartData = [
    {
      day: "Mon",
      threats: analytics.monthly_attacks[0],
    },
    {
      day: "Tue",
      threats: analytics.monthly_attacks[1],
    },
    {
      day: "Wed",
      threats: analytics.monthly_attacks[2],
    },
    {
      day: "Thu",
      threats: analytics.monthly_attacks[3],
    },
    {
      day: "Fri",
      threats: analytics.monthly_attacks[4],
    },
    {
      day: "Sat",
      threats: analytics.monthly_attacks[5],
    },
    {
      day: "Sun",
      threats: analytics.monthly_attacks[6],
    },
  ];

  return (
  <div className="group mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10">

    <div className="mb-6 flex items-center justify-between">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Threat Detection Trend
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Last 7 Days Analytics
        </p>
      </div>

      <span className="animate-pulse rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
        ● LIVE
      </span>

    </div>

    <div className="h-80">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={chartData}>

          <CartesianGrid
            stroke="#1e293b"
            strokeDasharray="6 6"
          />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid #0ea5e9",
              borderRadius: "16px",
              color: "#ffffff",
            }}
            cursor={{
              stroke: "#06b6d4",
              strokeWidth: 1,
            }}
          />

          <Line
            type="monotone"
            dataKey="threats"
            stroke="#06b6d4"
            strokeWidth={4}
            dot={{
              r: 5,
              fill: "#06b6d4",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
              fill: "#22d3ee",
            }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>
);
}