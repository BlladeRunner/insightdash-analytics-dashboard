import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function RevenueLine({ data }) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fill: "var(--chart-axis)" }}
            axisLine={{ stroke: "var(--chart-grid)" }}
            tickLine={{ stroke: "var(--chart-grid)" }}
          />
          <YAxis
            tick={{ fill: "var(--chart-axis)" }}
            axisLine={{ stroke: "var(--chart-grid)" }}
            tickLine={{ stroke: "var(--chart-grid)" }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--chart-tooltip-bg)",
              border: "1px solid var(--chart-grid)",
              borderRadius: 12,
              color: "var(--chart-text)",
            }}
            labelStyle={{ color: "var(--chart-text)" }}
            itemStyle={{ color: "var(--chart-text)" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--chart-line)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}