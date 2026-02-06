import { useMemo, useState } from "react";
import { events as raw } from "../data/events";
import { computeKpis, revenueByDate } from "../utils/analytics";
import { usd } from "../utils/format";

import KpiCard from "../components/kpi/KpiCard";
import RevenueLine from "../components/charts/RevenueLine";
import EventsTable from "../components/table/EventsTable";
import { ChartCard } from "../components/charts/ChartCard";

export default function Dashboard() {
  const [channel, setChannel] = useState("all");

  const rows = useMemo(() => {
    return channel === "all" ? raw : raw.filter((r) => r.channel === channel);
  }, [channel]);

  const kpis = useMemo(() => computeKpis(rows), [rows]);
  const chart = useMemo(() => revenueByDate(rows), [rows]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 space-y-8">
      <header className="space-y-2">
        <div className="text-xs text-slate-400">InsightDash</div>
        <h1 className="text-3xl font-semibold tracking-tight">Analytics Dashboard</h1>
        <p className="text-sm text-slate-400">KPIs, revenue chart, and events table.</p>

        <div className="pt-2">
          <label className="text-xs text-slate-400">Channel</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="ml-3 rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="web">Web</option>
            <option value="app">App</option>
          </select>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <KpiCard label="Revenue" value={usd(kpis.revenue)} sub="Total" />
        <KpiCard label="Purchases" value={String(kpis.purchases)} sub="Count" />
        <KpiCard label="Signups" value={String(kpis.signups)} sub="Count" />
        <KpiCard label="Visits" value={String(kpis.visits)} sub="Count" />
        <KpiCard label="AOV" value={usd(kpis.aov)} sub="Revenue / purchases" />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue over time" subtitle="Daily revenue">
          <RevenueLine data={chart} />
        </ChartCard>

        <ChartCard title="Events" subtitle="Sortable table" fixed={false}>
          <EventsTable rows={rows} />
        </ChartCard>
      </section>
    </div>
  );
}