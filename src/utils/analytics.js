export function computeKpis(rows) {
  const revenue = rows.reduce((s, r) => s + (r.revenue || 0), 0);
  const purchases = rows.filter((r) => r.event === "purchase").length;
  const signups = rows.filter((r) => r.event === "signup").length;
  const visits = rows.filter((r) => r.event === "visit").length;

  const aov = purchases ? revenue / purchases : 0;

  return { revenue, purchases, signups, visits, aov };
}

export function revenueByDate(rows) {
  const map = new Map();
  for (const r of rows) {
    const key = r.date;
    map.set(key, (map.get(key) || 0) + (r.revenue || 0));
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, revenue]) => ({ date, revenue }));
}