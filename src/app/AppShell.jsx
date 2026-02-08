import { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";

const THEME_KEY = "insightdash-theme";

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function AppShell() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold">InsightDash</div>

          <button
            type="button"
            onClick={toggleTheme}
            className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-xs text-slate-700 shadow-sm backdrop-blur
                       hover:bg-white active:scale-[0.99]
                       dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:bg-slate-950/70"
            aria-label="Toggle theme"
          >
            {/* Switch track */}
            <span
              className="relative inline-flex h-6 w-11 items-center rounded-full border border-slate-200 bg-slate-100 transition-colors
                         dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Knob */}
              <span
                className={[
                  "absolute left-0.5 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-white shadow",
                  "border border-slate-200",
                  "transition-transform duration-200 ease-out",
                  "dark:bg-slate-950 dark:border-slate-800",
                  theme === "dark" ? "translate-x-5" : "translate-x-0",
                ].join(" ")}
              >
                <span className="text-[11px] leading-none">
                  {theme === "dark" ? "🌙" : "☀️"}
                </span>
              </span>
            </span>

            {/* Label */}
            <span className="select-none font-medium">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Dashboard />
      </main>
    </div>
  );
}