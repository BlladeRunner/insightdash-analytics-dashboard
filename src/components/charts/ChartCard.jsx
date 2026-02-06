export function ChartCard({ title, subtitle, children, fixed = true }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
      <header className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>

        {subtitle ? (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        ) : null}
      </header>

      <div className={fixed ? "h-[260px] w-full" : "w-full"}>
        {children}
      </div>
    </section>
  );
}