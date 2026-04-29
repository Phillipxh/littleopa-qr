import { HiOutlineArrowDownTray, HiOutlineArrowUpTray, HiOutlineCheck, HiOutlineClipboardDocument } from "react-icons/hi2";
import { useRef, useState } from "react";
import type { StoredSettings } from "../types";
import { copyToClipboard, sanitizeFilename } from "../utils/export";

interface ImportExportSettingsProps {
  settings: StoredSettings;
  onImport: (settings: StoredSettings) => void;
}

const isStoredSettings = (value: unknown): value is StoredSettings => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StoredSettings>;
  return Boolean(candidate.contentType && candidate.data && candidate.design && candidate.logo);
};

export function ImportExportSettings({ settings, onImport }: ImportExportSettingsProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  const json = JSON.stringify(settings, null, 2);

  const exportJson = () => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${sanitizeFilename(settings.fileName || "qr-code")}-settings.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("JSON exported.");
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!isStoredSettings(parsed)) throw new Error("invalid");
        onImport(parsed);
        setStatus("Settings imported.");
      } catch {
        setStatus("The JSON file is not compatible with this app.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <section className="premium-card p-4">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Pro Features</p>
        <h2 className="mt-1 text-lg font-semibold tracking-normal text-slate-950 dark:text-white">Import & Export</h2>
      </div>
      <div className="grid gap-2">
        <button
          type="button"
          onClick={exportJson}
          className="premium-button inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white/88 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-teal-200 hover:bg-teal-50/70 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
        >
          <HiOutlineArrowDownTray aria-hidden="true" className="h-4 w-4" />
          Export JSON
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.item(0);
            if (file) importJson(file);
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="premium-button inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white/88 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
        >
          <HiOutlineArrowUpTray aria-hidden="true" className="h-4 w-4" />
          Import JSON
        </button>
        <button
          type="button"
          onClick={() => {
            void copyToClipboard(json).then((ok) => {
              setCopied(ok);
              setStatus(ok ? "Settings copied." : "Clipboard is not available.");
              setTimeout(() => setCopied(false), 1600);
            });
          }}
          className="premium-button inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white/88 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
        >
          {copied ? <HiOutlineCheck aria-hidden="true" className="h-4 w-4" /> : <HiOutlineClipboardDocument aria-hidden="true" className="h-4 w-4" />}
          Copy settings
        </button>
        {status ? <p className="rounded-md border border-slate-100 bg-white/70 px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950/55 dark:text-slate-300">{status}</p> : null}
      </div>
    </section>
  );
}
