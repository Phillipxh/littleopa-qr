import { HiOutlineClock, HiOutlineTrash } from "react-icons/hi2";
import type { HistoryItem } from "../types";

interface HistoryPanelProps {
  history: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
  onClear: () => void;
}

export function HistoryPanel({ history, onLoad, onClear }: HistoryPanelProps) {
  return (
    <section className="premium-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Saved Locally</p>
          <h2 className="mt-1 text-lg font-semibold tracking-normal text-slate-950 dark:text-white">History</h2>
        </div>
        {history.length ? (
          <button
            type="button"
            onClick={onClear}
            title="Clear history"
            className="premium-button inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white/88 text-slate-600 hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"
          >
            <HiOutlineTrash aria-hidden="true" className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      {history.length ? (
        <div className="grid gap-2">
          {history.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onLoad(item)}
              className="premium-button rounded-md border border-slate-200 bg-white/70 p-3 text-left shadow-sm hover:border-teal-300 hover:bg-teal-50/70 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-800 dark:bg-slate-950/55 dark:hover:bg-teal-950/30"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <HiOutlineClock aria-hidden="true" className="h-4 w-4 text-slate-500" />
                {item.title}
              </span>
              <span className="mt-1 block truncate text-xs text-slate-500 dark:text-slate-400">
                {new Date(item.createdAt).toLocaleString("en-US")} · {item.value}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-slate-100 bg-white/70 px-3 py-2 text-sm leading-6 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/55 dark:text-slate-300">
          Your local history appears here after your first download.
        </p>
      )}
    </section>
  );
}
