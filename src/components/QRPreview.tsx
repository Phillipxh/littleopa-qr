import QRCodeStyling from "qr-code-styling";
import { RefreshCw } from "lucide-react";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import type { QRDesignOptions, QRLogoOptions } from "../types";
import { createQRCodeOptions } from "../utils/qrOptions";

interface QRPreviewProps {
  value: string;
  design: QRDesignOptions;
  logo: QRLogoOptions;
  liveUpdate: boolean;
  onLiveUpdateChange: (value: boolean) => void;
  onRefresh: () => void;
  qrCodeRef: MutableRefObject<QRCodeStyling | null>;
}

export function QRPreview({ value, design, logo, liveUpdate, onLiveUpdateChange, onRefresh, qrCodeRef }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [renderError, setRenderError] = useState("");
  const options = useMemo(() => createQRCodeOptions(value, design, logo), [value, design, logo]);

  useEffect(() => {
    if (!containerRef.current) return;
    try {
      const qrCode = new QRCodeStyling(options);
      containerRef.current.innerHTML = "";
      qrCode.append(containerRef.current);
      qrCodeRef.current = qrCode;
      setRenderError("");
    } catch {
      containerRef.current.innerHTML = "";
      qrCodeRef.current = null;
      setRenderError("Der QR-Code ist für diese Datenmenge nicht renderbar. Bitte Inhalt kürzen.");
    }
  }, [options, qrCodeRef]);

  return (
    <section className="premium-card sticky top-4 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Live-Vorschau</p>
          <h2 className="mt-1 text-lg font-semibold tracking-normal text-slate-950 dark:text-white">Finaler QR-Code</h2>
        </div>
        <label className="premium-button flex items-center gap-2 rounded-md border border-slate-200 bg-white/70 px-2.5 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/45 dark:text-slate-300">
          <input
            type="checkbox"
            checked={liveUpdate}
            onChange={(event) => onLiveUpdateChange(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          Live
        </label>
      </div>
      <div
        className={`preview-frame mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-4 transition dark:border-slate-800 ${
          design.transparentBackground ? "checkerboard" : ""
        }`}
        style={{ backgroundColor: design.transparentBackground ? undefined : design.backgroundColor }}
      >
        <div ref={containerRef} className="qr-preview w-full" aria-label="QR-Code Vorschau" />
      </div>
      <div className="mt-4 grid gap-3">
        {renderError ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm leading-6 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-100">
            {renderError}
          </p>
        ) : null}
        {!liveUpdate ? (
          <button
            type="button"
            onClick={onRefresh}
            className="premium-button premium-primary inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-slate-950"
          >
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            Vorschau aktualisieren
          </button>
        ) : null}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="rounded-md border border-slate-100 bg-white/72 px-3 py-2 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/55 dark:text-slate-300">
            Exportgröße <strong className="block text-slate-950 dark:text-white">{design.size} x {design.size} px</strong>
          </p>
          <p className="rounded-md border border-slate-100 bg-white/72 px-3 py-2 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/55 dark:text-slate-300">
            Inhalt <strong className="block text-slate-950 dark:text-white">{value.length} Zeichen</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
