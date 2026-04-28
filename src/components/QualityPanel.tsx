import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { QRQualityResult } from "../types";

interface QualityPanelProps {
  quality: QRQualityResult;
}

const tone = {
  Excellent: "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-100 dark:border-emerald-900/70",
  Good: "bg-teal-50 text-teal-900 border-teal-200 dark:bg-teal-950/30 dark:text-teal-100 dark:border-teal-900/70",
  Risky: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/30 dark:text-amber-100 dark:border-amber-900/70",
  Critical: "bg-red-50 text-red-900 border-red-200 dark:bg-red-950/30 dark:text-red-100 dark:border-red-900/70",
};

export function QualityPanel({ quality }: QualityPanelProps) {
  const Icon = quality.level === "Excellent" || quality.level === "Good" ? CheckCircle2 : AlertTriangle;

  return (
    <section className="premium-card p-4">
      <div className={`rounded-lg border p-3 shadow-sm ${tone[quality.level]}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon aria-hidden="true" className="h-5 w-5" />
            <h2 className="text-base font-semibold">Quality: {quality.level}</h2>
          </div>
          <span className="text-sm font-bold">{quality.score}/100</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/70 dark:bg-slate-900/60">
          <div className="animated-progress h-full rounded-full bg-current transition-all" style={{ width: `${quality.score}%` }} />
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {quality.warnings.length ? (
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">Warnings</p>
            <ul className="grid gap-2">
              {quality.warnings.map((warning) => (
                <li key={warning} className="flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <AlertTriangle aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {quality.tips.length ? (
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">Tips</p>
            <ul className="grid gap-2">
              {quality.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <Info aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-300" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
