import { useMemo, useRef, useState } from "react";
import { HiOutlineArrowUpTray, HiOutlinePhoto, HiOutlineTrash } from "react-icons/hi2";
import { getContentTypes } from "../data/contentTypes";
import { getSocialPlatform } from "../data/socialPlatforms";
import type { AppLanguage, QRContentType, QRDesignOptions, QRFormData, QRLogoBorderStyle, QRLogoOptions } from "../types";
import { createTypeIconDataUrl, getTypeIconColor } from "../utils/typeIcon";
import { ColorPicker } from "./ColorPicker";
import { RangeField } from "./forms/FormControls";

interface LogoUploaderProps {
  language: AppLanguage;
  logo: QRLogoOptions;
  contentType: QRContentType;
  data: QRFormData;
  design: QRDesignOptions;
  onChange: (logo: QRLogoOptions) => void;
}

const acceptedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
const borderStyleOptions: QRLogoBorderStyle[] = ["solid", "dashed", "dotted"];

export function LogoUploader({ language, logo, contentType, data, design, onChange }: LogoUploaderProps) {
  const isDe = language === "de";
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const contentTypes = getContentTypes(language);
  const selectedType = contentTypes.find((type) => type.id === contentType) ?? contentTypes[0];
  const selectedSocialPlatform = contentType === "social" ? getSocialPlatform(data.socialPlatform) : null;
  const TypeIcon = selectedSocialPlatform?.icon ?? selectedType.icon;
  const iconColorValue = getTypeIconColor(contentType, data, logo.iconColor);
  const iconCardColorValue = logo.iconBackgroundColor || "#ffffff";
  const iconCardBorderColorValue = logo.iconBorderColor || "#dbeafe";
  const iconCardBorderStyleValue = logo.iconBorderStyle || "solid";
  const iconCardBorderWidthValue = typeof logo.iconBorderWidth === "number" ? logo.iconBorderWidth : 2.2;
  const iconCardRadiusValue = typeof logo.iconRadius === "number" ? logo.iconRadius : 23;
  const iconCardShadowValue = typeof logo.iconShadow === "number" ? logo.iconShadow : 18;
  const typeIconPreview = useMemo(
    () =>
      createTypeIconDataUrl(
        contentType,
        design.eyeColor || design.foregroundColor,
        data,
        logo.iconColor,
        logo.iconBackgroundColor,
        logo.iconBorderColor,
        logo.iconBorderStyle,
        logo.iconBorderWidth,
        logo.iconRadius,
        logo.iconShadow,
      ),
    [
      contentType,
      data,
      design.eyeColor,
      design.foregroundColor,
      logo.iconBackgroundColor,
      logo.iconBorderColor,
      logo.iconBorderStyle,
      logo.iconBorderWidth,
      logo.iconColor,
      logo.iconRadius,
      logo.iconShadow,
    ],
  );
  const displayImage = logo.useTypeIcon ? typeIconPreview : logo.image;
  const displayName = logo.useTypeIcon ? `${selectedSocialPlatform?.label ?? selectedType.label}${isDe ? "-Icon aktiv" : " icon active"}` : logo.name || (isDe ? "Logo geladen" : "Logo loaded");
  const borderPreviewStyle =
    iconCardBorderStyleValue === "dashed" ? "dashed" : iconCardBorderStyleValue === "dotted" ? "dotted" : "solid";

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

  const renderCardControls = (showIconColor: boolean) => (
    <div className="grid gap-3">
      <div className={`grid gap-3 ${showIconColor ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {showIconColor ? (
          <ColorPicker
            label={isDe ? "Icon-Farbe" : "Icon Color"}
            value={iconColorValue}
            onChange={(iconColor) => onChange({ ...logo, iconColor })}
          />
        ) : null}
        <ColorPicker
          label={isDe ? "Kartenfarbe" : "Card Color"}
          value={iconCardColorValue}
          onChange={(iconBackgroundColor) => onChange({ ...logo, iconBackgroundColor })}
        />
        <ColorPicker
          label={isDe ? "Randfarbe" : "Border Color"}
          value={iconCardBorderColorValue}
          onChange={(iconBorderColor) => onChange({ ...logo, iconBorderColor })}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-1.5">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{isDe ? "Linientyp" : "Line Style"}</span>
          <div className="grid grid-cols-3 gap-2">
            {borderStyleOptions.map((option) => {
              const active = option === iconCardBorderStyleValue;
              const label =
                option === "solid" ? (isDe ? "Durchgezogen" : "Solid") : option === "dashed" ? (isDe ? "Gestrichelt" : "Dashed") : isDe ? "Gepunktet" : "Dotted";

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange({ ...logo, iconBorderStyle: option })}
                  aria-pressed={active}
                  aria-label={label}
                  title={label}
                  className={`premium-button rounded-md border p-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    active
                      ? "border-blue-300 bg-blue-50/70 shadow-[0_10px_24px_-20px_rgba(59,130,246,0.24)] dark:border-blue-700 dark:bg-blue-950/35"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-900/82"
                  }`}
                >
                  <span className="flex h-9 items-center justify-center rounded-md bg-slate-50/90 dark:bg-slate-950/45">
                    <span
                      className="block h-5 w-12 bg-white shadow-sm"
                      style={{
                        borderColor: active ? "#2563eb" : "#64748b",
                        borderRadius: "8px",
                        borderStyle: option,
                        borderWidth: `${Math.max(iconCardBorderWidthValue, 1.6)}px`,
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <RangeField
          label={isDe ? "Randstärke" : "Border Width"}
          value={Number(iconCardBorderWidthValue.toFixed(1))}
          min={0}
          max={8}
          step={0.2}
          unit=" px"
          onChange={(iconBorderWidth) => onChange({ ...logo, iconBorderWidth })}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <RangeField
          label={isDe ? "Radius" : "Radius"}
          value={Math.round(iconCardRadiusValue)}
          min={8}
          max={34}
          unit=" px"
          onChange={(iconRadius) => onChange({ ...logo, iconRadius })}
        />
        <RangeField
          label={isDe ? "Schatten" : "Shadow"}
          value={Math.round(iconCardShadowValue)}
          min={0}
          max={40}
          unit="%"
          onChange={(iconShadow) => onChange({ ...logo, iconShadow })}
        />
      </div>
    </div>
  );

  return (
    <div className="grid gap-4">
      <label
        className={`premium-button flex items-center gap-3 rounded-lg border p-3 shadow-sm transition ${
          logo.useTypeIcon
            ? "border-blue-200 bg-gradient-to-br from-white to-blue-50/55 text-slate-900 shadow-[0_18px_42px_-30px_rgba(59,130,246,0.16)] dark:border-blue-700 dark:from-blue-950/45 dark:via-slate-950/72 dark:to-sky-950/30 dark:text-blue-50"
            : "border-blue-100 bg-white text-slate-800 shadow-[0_10px_24px_-20px_rgba(59,130,246,0.08)] hover:border-blue-200 hover:bg-white dark:border-slate-800 dark:bg-slate-950/55 dark:text-slate-100 dark:hover:border-blue-900/80 dark:hover:bg-blue-950/20"
        }`}
      >
        <input
          type="checkbox"
          checked={Boolean(logo.useTypeIcon)}
          onChange={(event) => onChange({ ...logo, useTypeIcon: event.target.checked })}
          className="h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
        />
        <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <img src={typeIconPreview} alt="" className="h-11 w-11 object-contain" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-sm font-semibold">
            {isDe ? "Typ-Icon automatisch anzeigen" : "Automatically show type icon"}
            <TypeIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-blue-700 dark:text-blue-300" />
          </span>
          <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
            {isDe
              ? `Aktuell: ${selectedSocialPlatform ? `${selectedType.label} - ${selectedSocialPlatform.label}` : selectedType.label}. Das Icon passt sich automatisch an.`
              : `Current: ${selectedSocialPlatform ? `${selectedType.label} - ${selectedSocialPlatform.label}` : selectedType.label}. The icon updates automatically.`}
          </span>
        </span>
      </label>

      {logo.useTypeIcon ? (
        selectedSocialPlatform ? (
          <div className="rounded-lg border border-blue-100 bg-white p-3 shadow-[0_10px_24px_-20px_rgba(59,130,246,0.08)] dark:border-slate-800 dark:bg-slate-950/55">
            {renderCardControls(false)}
            <div className="mt-3 flex items-center justify-between gap-3">
              <span
                className="flex min-h-10 items-center gap-2 bg-white/88 px-3 text-sm font-semibold text-slate-700 shadow-sm dark:bg-slate-900/82 dark:text-slate-200"
                style={{
                  borderColor: iconCardBorderColorValue,
                  borderRadius: `${iconCardRadiusValue * 0.42}px`,
                  borderStyle: borderPreviewStyle,
                  borderWidth: `${iconCardBorderWidthValue}px`,
                  boxShadow: `0 ${Math.max(iconCardShadowValue * 0.25, 0)}px ${Math.max(iconCardShadowValue * 0.4, 0)}px rgba(15, 23, 42, ${Math.min(iconCardShadowValue * 0.012, 0.32)})`,
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center"
                  style={{
                    backgroundColor: iconCardColorValue,
                    borderColor: iconCardBorderColorValue,
                    borderRadius: `${Math.max(iconCardRadiusValue * 0.28, 8)}px`,
                    borderStyle: borderPreviewStyle,
                    borderWidth: `${Math.max(iconCardBorderWidthValue * 0.75, 1)}px`,
                    color: iconColorValue,
                  }}
                >
                  <TypeIcon aria-hidden="true" className="h-4 w-4" />
                </span>
                {selectedSocialPlatform.label}
              </span>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              {logo.iconBorderColor !== "#dbeafe" || logo.iconBackgroundColor !== "#ffffff" ? (
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...logo,
                      iconBackgroundColor: "#ffffff",
                      iconBorderColor: "#dbeafe",
                    })
                  }
                  className="premium-button inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white/88 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
                >
                  {isDe ? "Farben zurücksetzen" : "Reset Colors"}
                </button>
              ) : null}
              {logo.iconBorderStyle !== "solid" || logo.iconBorderWidth !== 2.2 || logo.iconRadius !== 23 || logo.iconShadow !== 18 ? (
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...logo,
                      iconBorderStyle: "solid",
                      iconBorderWidth: 2.2,
                      iconRadius: 23,
                      iconShadow: 18,
                    })
                  }
                  className="premium-button inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white/88 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
                >
                  {isDe ? "Form zurücksetzen" : "Reset Shape"}
                </button>
              ) : null}
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              {isDe ? "Social-Media-Icons behalten ihre Originalfarbe; Karte und Rand bleiben anpassbar." : "Social media icons keep their original color; card and border stay adjustable."}
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-blue-100 bg-white p-3 shadow-[0_10px_24px_-20px_rgba(59,130,246,0.08)] dark:border-slate-800 dark:bg-slate-950/55">
            {renderCardControls(true)}
            <div className="mt-3 flex justify-end gap-2">
              {logo.iconColor || logo.iconBorderColor !== "#dbeafe" || logo.iconBackgroundColor !== "#ffffff" ? (
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...logo,
                      iconColor: "",
                      iconBackgroundColor: "#ffffff",
                      iconBorderColor: "#dbeafe",
                    })
                  }
                  className="premium-button inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white/88 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
                >
                  {isDe ? "Farben zurücksetzen" : "Reset Colors"}
                </button>
              ) : null}
              {logo.iconBorderStyle !== "solid" || logo.iconBorderWidth !== 2.2 || logo.iconRadius !== 23 || logo.iconShadow !== 18 ? (
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...logo,
                      iconBorderStyle: "solid",
                      iconBorderWidth: 2.2,
                      iconRadius: 23,
                      iconShadow: 18,
                    })
                  }
                  className="premium-button inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white/88 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
                >
                  {isDe ? "Form zurücksetzen" : "Reset Shape"}
                </button>
              ) : null}
            </div>
          </div>
        )
      ) : null}

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
        className="premium-button flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-blue-100 bg-white p-4 text-center shadow-[0_12px_28px_-22px_rgba(59,130,246,0.08)] hover:border-blue-300 hover:bg-white hover:shadow-[0_20px_42px_-26px_rgba(59,130,246,0.14)] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950/52 dark:hover:bg-blue-950/25"
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
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-white to-slate-100 text-blue-700 shadow-sm dark:from-slate-900 dark:to-blue-950 dark:text-blue-200">
              <HiOutlinePhoto aria-hidden="true" className="h-5 w-5" />
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
          className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white/88 px-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
        >
          <HiOutlineArrowUpTray aria-hidden="true" className="h-4 w-4" />
          {isDe ? "Datei wählen" : "Choose file"}
        </button>
        {logo.image ? (
          <button
            type="button"
            onClick={() => onChange({ ...logo, image: null, name: "" })}
            className="premium-button inline-flex min-h-10 items-center gap-2 rounded-md border border-red-200 bg-white/88 px-3 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-900/70 dark:bg-slate-900/82 dark:text-red-300"
          >
            <HiOutlineTrash aria-hidden="true" className="h-4 w-4" />
            {logo.useTypeIcon ? (isDe ? "Upload entfernen" : "Remove upload") : isDe ? "Logo entfernen" : "Remove logo"}
          </button>
        ) : null}
      </div>

      {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950/30 dark:text-red-100">{error}</p> : null}

      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-[0_12px_28px_-22px_rgba(59,130,246,0.08)] dark:border-slate-800 dark:bg-slate-950/55">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {isDe ? "Logo Layout" : "Logo Layout"}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <RangeField label={isDe ? "Logo-Größe" : "Logo Size"} value={Math.round(logo.imageSize * 100)} min={8} max={36} unit="%" onChange={(value) => onChange({ ...logo, imageSize: value / 100 })} />
          <RangeField label={isDe ? "Logo-Abstand" : "Logo Margin"} value={logo.margin} min={0} max={24} unit=" px" onChange={(margin) => onChange({ ...logo, margin })} />
        </div>
      </div>
      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-[0_12px_28px_-22px_rgba(59,130,246,0.08)] dark:border-slate-800 dark:bg-slate-950/55">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {isDe ? "Lesbarkeit" : "Readability"}
        </p>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={logo.hideBackgroundDots}
            onChange={(event) => onChange({ ...logo, hideBackgroundDots: event.target.checked })}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
          />
          <span>
            <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
              {isDe ? "Weisser Hintergrund hinter Logo" : "White background behind logo"}
            </span>
            <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
              {isDe ? "Entfernt QR-Module im Logo-Bereich für bessere Lesbarkeit." : "Removes QR modules behind the logo for better readability."}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
