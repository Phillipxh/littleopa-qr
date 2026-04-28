import { Moon, RotateCcw, Shuffle, Sun, Wand2 } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLoadExample: () => void;
  onReset: () => void;
  onRandomize: () => void;
}

export function Header({ darkMode, onToggleDarkMode, onLoadExample, onReset, onRandomize }: HeaderProps) {
  return (
    <header className="premium-card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="shimmer flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-950 via-blue-950 to-teal-700 text-white shadow-lg shadow-teal-950/20 dark:from-white dark:via-cyan-100 dark:to-teal-200 dark:text-slate-950">
            <Wand2 aria-hidden="true" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white">QR Code Generator</h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Erstelle individuelle QR-Codes für Links, Kontakte, WLAN, Events und mehr.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadExample}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/90 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-teal-200 hover:bg-teal-50/70 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-teal-800 dark:hover:bg-teal-950/30"
          >
            <Wand2 aria-hidden="true" className="h-4 w-4" />
            Beispiel laden
          </button>
          <button
            type="button"
            onClick={onRandomize}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50/80 px-3 text-sm font-medium text-indigo-900 shadow-sm hover:border-indigo-300 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-indigo-900/70 dark:bg-indigo-950/35 dark:text-indigo-100 dark:hover:bg-indigo-950/60"
          >
            <Shuffle aria-hidden="true" className="h-4 w-4" />
            Design zufällig
          </button>
          <button
            type="button"
            onClick={onReset}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/90 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-amber-200 hover:bg-amber-50/80 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-amber-900 dark:hover:bg-amber-950/30"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Zurücksetzen
          </button>
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? "Light Mode aktivieren" : "Dark Mode aktivieren"}
            title={darkMode ? "Light Mode" : "Dark Mode"}
            className="premium-button inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white/90 text-slate-700 shadow-sm hover:border-teal-200 hover:bg-teal-50/70 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-teal-800 dark:hover:bg-teal-950/30"
          >
            {darkMode ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
