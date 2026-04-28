import { Moon, RotateCcw, Shuffle, Sun, Wand2 } from "lucide-react";
import type { AppLanguage } from "../types";

interface HeaderProps {
  darkMode: boolean;
  language: AppLanguage;
  onToggleDarkMode: () => void;
  onLanguageChange: (language: AppLanguage) => void;
  onLoadExample: () => void;
  onReset: () => void;
  onRandomize: () => void;
}

const copy = {
  de: {
    subtitle: "Erstelle individuelle QR-Codes für Links, Kontakte, WLAN, Events und mehr.",
    loadExample: "Beispiel laden",
    randomDesign: "Design zufällig",
    reset: "Zurücksetzen",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    lightAria: "Light Mode aktivieren",
    darkAria: "Dark Mode aktivieren",
    languageLabel: "Sprache",
  },
  en: {
    subtitle: "Create custom QR codes for links, contacts, Wi-Fi, events, and more.",
    loadExample: "Load Example",
    randomDesign: "Random Design",
    reset: "Reset",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    lightAria: "Enable light mode",
    darkAria: "Enable dark mode",
    languageLabel: "Language",
  },
} as const;

export function Header({ darkMode, language, onToggleDarkMode, onLanguageChange, onLoadExample, onReset, onRandomize }: HeaderProps) {
  const t = copy[language];

  return (
    <header className="premium-card p-4">
      <div className="mb-3 flex items-center justify-end">
        <label className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/90 px-2.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
          <span className="text-base" aria-hidden="true">
            {language === "de" ? "🇩🇪" : "🇬🇧"}
          </span>
          <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{t.languageLabel}</span>
          <select
            value={language}
            onChange={(event) => onLanguageChange(event.target.value as AppLanguage)}
            className="rounded border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label={t.languageLabel}
          >
            <option value="de">🇩🇪 Deutsch</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </label>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="shimmer floating-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-950 via-indigo-700 to-cyan-500 text-white shadow-lg shadow-blue-950/30 dark:from-white dark:via-sky-100 dark:to-blue-200 dark:text-slate-950">
            <Wand2 aria-hidden="true" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white">QR Code Generator</h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t.subtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadExample}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/90 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
          >
            <Wand2 aria-hidden="true" className="h-4 w-4" />
            {t.loadExample}
          </button>
          <button
            type="button"
            onClick={onRandomize}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50/80 px-3 text-sm font-medium text-indigo-900 shadow-sm hover:border-indigo-300 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-indigo-900/70 dark:bg-indigo-950/35 dark:text-indigo-100 dark:hover:bg-indigo-950/60"
          >
            <Shuffle aria-hidden="true" className="h-4 w-4" />
            {t.randomDesign}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/90 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-amber-200 hover:bg-amber-50/80 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-amber-900 dark:hover:bg-amber-950/30"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            {t.reset}
          </button>
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? t.lightAria : t.darkAria}
            title={darkMode ? t.lightMode : t.darkMode}
            className="premium-button inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white/90 text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
          >
            {darkMode ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
