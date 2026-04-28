import QRCodeStyling from "qr-code-styling";
import {
  AlertTriangle,
  Check,
  Clock3,
  Clipboard,
  Copy,
  Download,
  FileArchive,
  FileImage,
  FileText,
  ImageDown,
  Trash2,
  Upload,
} from "lucide-react";
import { MutableRefObject, useRef, useState } from "react";
import type { AppLanguage, HistoryItem, QRDesignOptions, QRExportFormat, QRQualityResult, StoredSettings, ValidationResult } from "../types";
import { copyToClipboard, downloadQRCode, sanitizeFilename } from "../utils/export";

interface DownloadButtonsProps {
  language: AppLanguage;
  qrCodeRef: MutableRefObject<QRCodeStyling | null>;
  design: QRDesignOptions;
  validation: ValidationResult;
  quality: QRQualityResult;
  fileName: string;
  value: string;
  onFileNameChange: (value: string) => void;
  onDownloaded: () => void;
  history: HistoryItem[];
  onLoadHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
  settings: StoredSettings;
  onImportSettings: (settings: StoredSettings) => void;
}

const formats: { format: QRExportFormat; labelEn: string; labelDe: string; shortLabel: string; icon: typeof FileImage }[] = [
  { format: "png", labelEn: "Download PNG", labelDe: "PNG herunterladen", shortLabel: "PNG", icon: ImageDown },
  { format: "svg", labelEn: "Download SVG", labelDe: "SVG herunterladen", shortLabel: "SVG", icon: FileText },
  { format: "jpeg", labelEn: "Download JPEG", labelDe: "JPEG herunterladen", shortLabel: "JPEG", icon: FileImage },
  { format: "webp", labelEn: "Download WebP", labelDe: "WebP herunterladen", shortLabel: "WebP", icon: FileImage },
  { format: "pdf", labelEn: "Download PDF", labelDe: "PDF herunterladen", shortLabel: "PDF", icon: FileArchive },
];

const isStoredSettings = (value: unknown): value is StoredSettings => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StoredSettings>;
  return Boolean(candidate.contentType && candidate.data && candidate.design && candidate.logo);
};

export function DownloadButtons({
  language,
  qrCodeRef,
  design,
  validation,
  quality,
  fileName,
  value,
  onFileNameChange,
  onDownloaded,
  history,
  onLoadHistory,
  onClearHistory,
  settings,
  onImportSettings,
}: DownloadButtonsProps) {
  const isDe = language === "de";
  const qualityLabel =
    isDe
      ? { Excellent: "Sehr gut", Good: "Gut", Risky: "Risiko", Critical: "Kritisch" }[quality.level]
      : quality.level;
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState("");
  const [toolsStatus, setToolsStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [settingsCopied, setSettingsCopied] = useState(false);
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const disabled = !validation.isValid;

  const runDownload = async (format: QRExportFormat) => {
    if (!qrCodeRef.current) return;
    if (!validation.isValid) {
      setStatus(isDe ? "Bitte behebe zuerst die Eingabefehler." : "Please fix the input errors first.");
      return;
    }
    try {
      await downloadQRCode(qrCodeRef.current, format, fileName, design);
      setStatus(
        quality.level === "Critical"
          ? isDe
            ? "Download erstellt. Bitte teste den QR-Code besonders sorgfältig."
            : "Download created. Please test this QR code carefully."
          : isDe
            ? "Download erstellt."
            : "Download created.",
      );
      onDownloaded();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : isDe ? "Download konnte nicht erstellt werden." : "Download could not be created.");
    }
  };

  const settingsJson = JSON.stringify(settings, null, 2);
  const exportJson = () => {
    const blob = new Blob([settingsJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${sanitizeFilename(fileName || "qr-code")}-settings.json`;
    link.click();
    URL.revokeObjectURL(url);
    setToolsStatus(isDe ? "JSON exportiert." : "JSON exported.");
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!isStoredSettings(parsed)) throw new Error("invalid");
        onImportSettings(parsed);
        setToolsStatus(isDe ? "Einstellungen importiert." : "Settings imported.");
      } catch {
        setToolsStatus(isDe ? "Die JSON-Datei passt nicht zu dieser App." : "The JSON file is not compatible with this app.");
      }
    };
    reader.readAsText(file);
  };

  const visibleFormats = showAll ? formats : formats.slice(0, 2);
  const tooltipItems = [...quality.warnings, ...quality.tips];
  const qualityTone =
    quality.level === "Excellent" || quality.level === "Good"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/70 dark:bg-emerald-950/45 dark:text-emerald-100"
      : quality.level === "Risky"
        ? "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/45 dark:text-amber-100"
        : "border-red-200 bg-red-50 text-red-900 dark:border-red-900/70 dark:bg-red-950/45 dark:text-red-100";
  const qualityShellTone =
    quality.level === "Excellent" || quality.level === "Good"
      ? "border-emerald-200/90 bg-gradient-to-br from-emerald-50/95 via-white/90 to-blue-50/80 dark:border-emerald-900/60 dark:from-emerald-950/30 dark:via-slate-900/88 dark:to-blue-950/22"
      : quality.level === "Risky"
        ? "border-amber-200/90 bg-gradient-to-br from-amber-50/95 via-white/90 to-orange-50/80 dark:border-amber-900/60 dark:from-amber-950/30 dark:via-slate-900/88 dark:to-orange-950/22"
        : "border-rose-200/90 bg-gradient-to-br from-rose-50/95 via-white/90 to-amber-50/80 dark:border-rose-900/60 dark:from-rose-950/30 dark:via-slate-900/88 dark:to-amber-950/22";

  return (
    <section className="bottom-action-bar fixed inset-x-0 bottom-0 z-50 max-h-[62vh] overflow-y-auto border-t border-slate-200 px-3 py-2 dark:border-slate-800 sm:px-4">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-2 lg:flex-row lg:items-stretch">
        <div className={`flex min-w-[250px] flex-col justify-center rounded-lg border p-2 shadow-panel lg:w-[290px] ${qualityShellTone}`}>
          <div className={`rounded-md border px-3 py-1.5 ${qualityTone}`}>
            <div className="flex min-h-7 items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2 text-[13px] font-semibold">
                {quality.level === "Excellent" || quality.level === "Good" ? <Check aria-hidden="true" className="h-4 w-4" /> : <AlertTriangle aria-hidden="true" className="h-4 w-4" />}
                <span className="truncate">{isDe ? "Qualität" : "Quality"}: {qualityLabel}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[13px] font-bold">{quality.score}/100</span>
                <span className="group relative inline-flex">
                  <button
                    type="button"
                    aria-label={isDe ? "Hinweise anzeigen" : "Show hints"}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current/25 bg-white/62 text-xs font-bold shadow-sm outline-none transition hover:bg-white focus:ring-2 focus:ring-current/30 dark:bg-slate-950/35"
                  >
                    ?
                  </button>
                  <span className="pointer-events-none absolute bottom-[calc(100%+0.6rem)] right-0 z-[70] w-[320px] rounded-lg border border-slate-200 bg-white p-3 text-left text-sm leading-5 text-slate-700 opacity-0 shadow-2xl shadow-slate-950/15 transition group-hover:opacity-100 group-focus-within:opacity-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">{isDe ? "Hinweise" : "Hints"}</span>
                    {tooltipItems.length ? (
                      tooltipItems.slice(0, 5).map((item) => (
                        <span key={item} className="mt-1 block">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span>{isDe ? "Keine Hinweise. Der QR-Code ist bereit." : "No hints. The QR code is ready."}</span>
                    )}
                  </span>
                </span>
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/70 dark:bg-slate-950/45">
              <div className="animated-progress h-full rounded-full bg-current transition-all" style={{ width: `${quality.score}%` }} />
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center rounded-lg border border-blue-200/90 bg-gradient-to-br from-blue-50/95 via-white/90 to-sky-50/90 p-2 shadow-panel dark:border-blue-900/60 dark:from-blue-950/32 dark:via-slate-900/88 dark:to-sky-950/28">
          <div className="grid gap-2 sm:grid-cols-[minmax(160px,240px)_minmax(0,1fr)] xl:grid-cols-[minmax(160px,240px)_minmax(0,1fr)_auto] xl:items-center">
            <label className="grid gap-1 xl:gap-0">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{isDe ? "Dateiname" : "Filename"}</span>
              <input
                className="h-9 w-full rounded-md border border-slate-200 bg-white/88 px-3 text-[13px] text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100"
                value={fileName}
                onChange={(event) => onFileNameChange(event.target.value)}
                placeholder="qr-code"
              />
            </label>

            <div className="grid gap-2 sm:grid-cols-2 xl:flex xl:min-w-0 xl:items-center">
              {visibleFormats.map(({ format, labelEn, labelDe, shortLabel, icon: Icon }) => (
                <button
                  key={format}
                  type="button"
                  title={isDe ? labelDe : labelEn}
                  disabled={disabled}
                  onClick={() => void runDownload(format)}
                  className="premium-button premium-primary shimmer inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 text-[13px] font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-950 xl:whitespace-nowrap"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {shortLabel}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                className="premium-button inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white/88 px-3 text-[13px] font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 xl:whitespace-nowrap"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                {showAll ? (isDe ? "Weniger" : "Less") : isDe ? "Formate" : "Formats"}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                void copyToClipboard(value).then((ok) => {
                  setCopied(ok);
                  setTimeout(() => setCopied(false), 1600);
                });
              }}
              className="premium-button inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white/88 px-3 text-[13px] font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 xl:whitespace-nowrap"
            >
              {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
              {isDe ? "Inhalt kopieren" : "Copy content"}
            </button>
          </div>
          {status ? <p className="mt-2 rounded-md border border-slate-100 bg-white/70 px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950/45 dark:text-slate-300">{status}</p> : null}
        </div>

        <div className="flex min-w-[260px] flex-col justify-center rounded-lg border border-indigo-200/90 bg-gradient-to-br from-indigo-50/90 via-white/90 to-amber-50/75 p-2 shadow-panel dark:border-indigo-900/60 dark:from-indigo-950/35 dark:via-slate-900/88 dark:to-amber-950/22 lg:w-[320px]">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300 lg:hidden">{isDe ? "Verlauf & Einstellungen" : "History & Settings"}</p>
            {history.length ? (
              <button
                type="button"
                onClick={onClearHistory}
                title={isDe ? "Verlauf leeren" : "Clear history"}
                className="premium-button inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white/88 text-slate-600 hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300 lg:hidden"
              >
                <Trash2 aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          <div className="grid gap-2 lg:hidden">
            {history.length ? (
              <div className="grid max-h-24 gap-1 overflow-y-auto pr-1">
                {history.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onLoadHistory(item)}
                    className="premium-button rounded-md border border-slate-100 bg-white/72 px-2.5 py-2 text-left text-sm shadow-sm hover:border-blue-200 hover:bg-blue-50/60 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950/45"
                  >
                    <span className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-slate-100 bg-white/72 px-3 py-2 text-sm leading-5 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/45 dark:text-slate-300">
                {isDe ? "Nach dem ersten Download erscheint hier dein lokaler Verlauf." : "Your local history appears here after your first download."}
              </p>
            )}
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={exportJson}
              className="premium-button inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white/88 px-2.5 text-[13px] font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              JSON
            </button>
            <input
              ref={importInputRef}
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
              onClick={() => importInputRef.current?.click()}
              className="premium-button inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white/88 px-2.5 text-[13px] font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200"
            >
              <Upload aria-hidden="true" className="h-4 w-4" />
              Import
            </button>
            <button
              type="button"
              onClick={() => {
                void copyToClipboard(settingsJson).then((ok) => {
                  setSettingsCopied(ok);
                  setToolsStatus(ok ? (isDe ? "Einstellungen kopiert." : "Settings copied.") : isDe ? "Zwischenablage ist nicht verfügbar." : "Clipboard is not available.");
                  setTimeout(() => setSettingsCopied(false), 1600);
                });
              }}
              className="premium-button inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white/88 px-2.5 text-[13px] font-medium text-slate-700 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200"
            >
              {settingsCopied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Clipboard aria-hidden="true" className="h-4 w-4" />}
              {isDe ? "Kopieren" : "Copy"}
            </button>
          </div>
          {toolsStatus ? <p className="mt-2 rounded-md border border-slate-100 bg-white/70 px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950/45 dark:text-slate-300">{toolsStatus}</p> : null}
        </div>
      </div>
    </section>
  );
}
