export default function KpiCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {sub ? <div className="mt-2 text-xs text-slate-500">{sub}</div> : null}
    </div>
  );
}