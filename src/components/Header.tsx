import { HiOutlineArrowPath, HiOutlineLanguage, HiOutlineMoon, HiOutlineSparkles, HiOutlineSun } from "react-icons/hi2";
import { TbArrowsShuffle, TbWand } from "react-icons/tb";
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
    <header className="premium-card p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="shimmer floating-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-sky-300 text-white shadow-lg shadow-blue-200/80 dark:from-white dark:via-sky-100 dark:to-blue-200 dark:text-slate-950">
            <HiOutlineSparkles aria-hidden="true" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold tracking-normal text-slate-950 dark:text-white">QR Code Generator</h1>
            <p className="mt-2 max-w-3xl text-[15px] leading-7 text-slate-600 dark:text-slate-300">
              {t.subtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadExample}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/92 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/55 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
          >
            <TbWand aria-hidden="true" className="h-4 w-4" />
            {t.loadExample}
          </button>
          <button
            type="button"
            onClick={onRandomize}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/92 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800/80"
          >
            <TbArrowsShuffle aria-hidden="true" className="h-4 w-4" />
            {t.randomDesign}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/92 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-150 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800/80"
          >
            <HiOutlineArrowPath aria-hidden="true" className="h-4 w-4" />
            {t.reset}
          </button>
          <label className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/92 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/55 focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30">
            <HiOutlineLanguage aria-hidden="true" className="h-4 w-4 text-blue-700" />
            <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{t.languageLabel}</span>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value as AppLanguage)}
              className="min-w-[7.5rem] appearance-none bg-transparent pr-1 text-sm text-slate-700 outline-none dark:text-slate-200"
              aria-label={t.languageLabel}
            >
              <option value="de">🇩🇪 Deutsch</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </label>
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? t.lightAria : t.darkAria}
            title={darkMode ? t.lightMode : t.darkMode}
            className="premium-button inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white/90 text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
          >
            {darkMode ? <HiOutlineSun aria-hidden="true" className="h-4 w-4" /> : <HiOutlineMoon aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
