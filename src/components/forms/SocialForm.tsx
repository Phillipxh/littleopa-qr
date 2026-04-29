import { useEffect, useMemo, useState } from "react";
import { HiOutlineArrowTopRightOnSquare, HiOutlineCheck, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { socialPlatforms } from "../../data/socialPlatforms";
import { buildSocialUrl } from "../../utils/qrBuilders";
import { Field, inputClass } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function SocialForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  const [copied, setCopied] = useState(false);
  const activePlatform = useMemo(
    () => socialPlatforms.find((platform) => platform.id === data.socialPlatform) ?? socialPlatforms[0],
    [data.socialPlatform],
  );
  const ActiveIcon = activePlatform.icon;
  const previewUrl = data.socialValue.trim() ? buildSocialUrl(data) : "";

  useEffect(() => {
    setCopied(false);
  }, [previewUrl]);

  const copyPreview = () => {
    if (!previewUrl || !navigator.clipboard) return;
    void navigator.clipboard
      .writeText(previewUrl)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

  return (
    <div className="grid gap-4">
      <div>
        <div className="mb-2">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{isDe ? "Plattform" : "Platform"}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            const active = platform.id === activePlatform.id;
            const activeAccent = platform.color === "#111827" || platform.color === "#181717" ? "#334155" : platform.color;

            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => update("socialPlatform", platform.id)}
                className={`type-card group relative flex min-h-[84px] flex-col items-start justify-between rounded-md border p-3 text-left outline-none transition focus:ring-2 focus:ring-blue-500 ${
                  active
                    ? "bg-white text-slate-950 shadow-sm dark:bg-slate-900 dark:text-white"
                    : "border-slate-200 bg-white/76 text-slate-700 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950/48 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900/80"
                }`}
                style={{
                  borderColor: active ? activeAccent : undefined,
                  boxShadow: active ? `0 18px 42px -32px ${activeAccent}` : undefined,
                }}
                aria-pressed={active}
                aria-label={platform.label}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-lg shadow-sm transition group-hover:scale-105 dark:border-slate-700 dark:bg-slate-900"
                  style={{
                    backgroundColor: active ? platform.color : undefined,
                    color: active ? "#ffffff" : platform.color,
                  }}
                >
                  <Icon aria-hidden="true" />
                </span>
                <span className="mt-3 flex w-full items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold">{platform.label}</span>
                  {active ? <HiOutlineCheck aria-hidden="true" className="h-4 w-4 shrink-0" style={{ color: activeAccent }} /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Field label={isDe ? "Profilname oder URL" : "Profile name or URL"} htmlFor="social-profile">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded bg-slate-100 text-sm dark:bg-slate-800" style={{ color: activePlatform.color }}>
            <ActiveIcon aria-hidden="true" />
          </span>
          <input
            id="social-profile"
            className={`${inputClass} pl-11`}
            type="text"
            value={data.socialValue}
            placeholder={activePlatform.placeholder}
            onChange={(event) => update("socialValue", event.target.value)}
          />
        </div>
      </Field>

      <div className="rounded-md border border-slate-200 bg-white/82 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/55">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {isDe ? "Ziel-Link" : "Target link"}
            </span>
            <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {previewUrl || (isDe ? "Wird beim Tippen erstellt" : "Created as you type")}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={copyPreview}
              disabled={!previewUrl}
              className="premium-button inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm outline-none hover:border-blue-200 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
              aria-label={isDe ? "Ziel-Link kopieren" : "Copy target link"}
              title={isDe ? "Kopieren" : "Copy"}
            >
              {copied ? <HiOutlineCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" /> : <HiOutlineClipboardDocumentCheck aria-hidden="true" className="h-4 w-4" />}
            </button>
            {previewUrl ? (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="premium-button inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm outline-none hover:border-blue-200 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                aria-label={isDe ? "Ziel-Link öffnen" : "Open target link"}
                title={isDe ? "Öffnen" : "Open"}
              >
                <HiOutlineArrowTopRightOnSquare aria-hidden="true" className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 opacity-45 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                aria-label={isDe ? "Ziel-Link öffnen" : "Open target link"}
                title={isDe ? "Öffnen" : "Open"}
              >
                <HiOutlineArrowTopRightOnSquare aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
