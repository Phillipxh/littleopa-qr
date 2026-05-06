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
    <header className="premium-card p-4 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3 sm:items-center">
          <div className="shimmer floating-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-sky-300 text-white shadow-lg shadow-blue-200/80 dark:from-white dark:via-sky-100 dark:to-blue-200 dark:text-slate-950 sm:h-14 sm:w-14">
            <HiOutlineSparkles aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-[1.65rem] font-semibold leading-tight tracking-normal text-slate-950 dark:text-white sm:text-[2rem]">QR Code Generator</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-7">
              {t.subtitle}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onLoadExample}
            className="premium-button inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white/92 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/55 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 sm:w-auto"
          >
            <TbWand aria-hidden="true" className="h-4 w-4" />
            {t.loadExample}
          </button>
          <button
            type="button"
            onClick={onRandomize}
            className="premium-button inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white/92 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800/80 sm:w-auto"
          >
            <TbArrowsShuffle aria-hidden="true" className="h-4 w-4" />
            {t.randomDesign}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="premium-button inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white/92 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-150 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800/80 sm:w-auto"
          >
            <HiOutlineArrowPath aria-hidden="true" className="h-4 w-4" />
            {t.reset}
          </button>
          <label className="premium-button col-span-2 inline-flex min-h-10 w-full items-center justify-between gap-2 rounded-md border border-slate-200 bg-white/92 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/55 focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 sm:col-span-1 sm:w-auto sm:justify-start">
            <HiOutlineLanguage aria-hidden="true" className="h-4 w-4 text-blue-700" />
            <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{t.languageLabel}</span>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value as AppLanguage)}
              className="min-w-0 flex-1 appearance-none bg-transparent pr-1 text-right text-sm text-slate-700 outline-none dark:text-slate-200 sm:min-w-[7.5rem] sm:flex-none sm:text-left"
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
            className="premium-button col-span-2 inline-flex h-10 w-full items-center justify-center rounded-md border border-slate-200 bg-white/90 text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 sm:col-span-1 sm:w-10"
          >
            {darkMode ? <HiOutlineSun aria-hidden="true" className="h-4 w-4" /> : <HiOutlineMoon aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
