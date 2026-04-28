import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { getContentTypes } from "../data/contentTypes";
import type { AppLanguage, QRContentType, QRDesignOptions, QRLogoOptions } from "../types";
import { createTypeIconDataUrl } from "../utils/typeIcon";
import { RangeField, SwitchField } from "./forms/FormControls";

interface LogoUploaderProps {
  language: AppLanguage;
  logo: QRLogoOptions;
  contentType: QRContentType;
  design: QRDesignOptions;
  onChange: (logo: QRLogoOptions) => void;
}

const acceptedTypes = ["image/png", "image/jpeg", "image/svg+xml"];

export function LogoUploader({ language, logo, contentType, design, onChange }: LogoUploaderProps) {
  const isDe = language === "de";
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const contentTypes = getContentTypes(language);
  const selectedType = contentTypes.find((type) => type.id === contentType) ?? contentTypes[0];
  const TypeIcon = selectedType.icon;
  const typeIconPreview = useMemo(
    () => createTypeIconDataUrl(contentType, design.eyeColor || design.foregroundColor),
    [contentType, design.eyeColor, design.foregroundColor],
  );
  const displayImage = logo.useTypeIcon ? typeIconPreview : logo.image;
  const displayName = logo.useTypeIcon ? `${selectedType.label}${isDe ? "-Icon aktiv" : " icon active"}` : logo.name || (isDe ? "Logo geladen" : "Logo loaded");

  const readFile = (file: File) => {
    if (!acceptedTypes.includes(file.type)) {
      setError(isDe ? "Bitte PNG, JPG oder SVG verwenden." : "Please use PNG, JPG, or SVG.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange({ ...logo, image: reader.result, name: file.name, useTypeIcon: false });
        setError("");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-4">
      <label
        className={`premium-button flex items-center gap-3 rounded-lg border p-3 shadow-sm transition ${
          logo.useTypeIcon
            ? "border-teal-300 bg-gradient-to-br from-teal-50 via-white to-cyan-50 text-teal-950 dark:border-teal-700 dark:from-teal-950/45 dark:via-slate-950/72 dark:to-cyan-950/30 dark:text-teal-50"
            : "border-slate-200 bg-white/72 text-slate-800 hover:border-teal-200 hover:bg-teal-50/50 dark:border-slate-800 dark:bg-slate-950/55 dark:text-slate-100 dark:hover:border-teal-900/80 dark:hover:bg-teal-950/20"
        }`}
      >
        <input
          type="checkbox"
          checked={Boolean(logo.useTypeIcon)}
          onChange={(event) => onChange({ ...logo, useTypeIcon: event.target.checked })}
          className="h-4 w-4 shrink-0 rounded border-slate-300 text-teal-600 focus:ring-teal-500 dark:border-slate-600"
        />
        <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <img src={typeIconPreview} alt="" className="h-11 w-11 object-contain" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-sm font-semibold">
            {isDe ? "Typ-Icon automatisch anzeigen" : "Automatically show type icon"}
            <TypeIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300" />
          </span>
          <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
            {isDe
              ? `Aktuell: ${selectedType.label}. Das Icon passt sich beim Wechsel des QR-Code-Typs automatisch an.`
              : `Current: ${selectedType.label}. The icon updates automatically when you switch QR code types.`}
          </span>
        </span>
      </label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files.item(0);
          if (file) readFile(file);
        }}
        className="premium-button flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/68 p-4 text-center shadow-sm hover:border-teal-400 hover:bg-teal-50/60 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950/52 dark:hover:bg-teal-950/25"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.item(0);
            if (file) readFile(file);
          }}
        />
        {displayImage ? (
          <>
            <img src={displayImage} alt="" className="mb-3 h-14 max-w-[160px] object-contain" />
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{displayName}</p>
            {logo.useTypeIcon ? (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {isDe ? "Automatisch aus dem QR-Code-Typ erzeugt" : "Generated automatically from the current QR code type"}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-white to-teal-50 text-teal-700 shadow-sm dark:from-slate-900 dark:to-teal-950 dark:text-teal-200">
              <ImagePlus aria-hidden="true" className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{isDe ? "Logo per Drag & Drop hochladen" : "Upload logo via drag & drop"}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{isDe ? "PNG, JPG oder SVG" : "PNG, JPG, or SVG"}</p>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/88 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-teal-200 hover:bg-teal-50/70 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
        >
          <Upload aria-hidden="true" className="h-4 w-4" />
          {isDe ? "Datei wählen" : "Choose file"}
        </button>
        {logo.image ? (
          <button
            type="button"
            onClick={() => onChange({ ...logo, image: null, name: "" })}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-red-200 bg-white/88 px-3 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-900/70 dark:bg-slate-900/82 dark:text-red-300"
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
            {logo.useTypeIcon ? (isDe ? "Upload entfernen" : "Remove upload") : isDe ? "Logo entfernen" : "Remove logo"}
          </button>
        ) : null}
      </div>

      {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950/30 dark:text-red-100">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <RangeField label={isDe ? "Logo-Größe" : "Logo Size"} value={Math.round(logo.imageSize * 100)} min={8} max={36} unit="%" onChange={(value) => onChange({ ...logo, imageSize: value / 100 })} />
        <RangeField label={isDe ? "Logo-Abstand" : "Logo Margin"} value={logo.margin} min={0} max={24} unit=" px" onChange={(margin) => onChange({ ...logo, margin })} />
      </div>
      <SwitchField
        label={isDe ? "Weisser Hintergrund hinter Logo" : "White background behind logo"}
        checked={logo.hideBackgroundDots}
        onChange={(hideBackgroundDots) => onChange({ ...logo, hideBackgroundDots })}
        hint={isDe ? "Entfernt QR-Module im Logo-Bereich für bessere Lesbarkeit." : "Removes QR modules behind the logo for better readability."}
      />
    </div>
  );
}
