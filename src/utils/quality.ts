import type { QRDesignOptions, QRLogoOptions, QRQualityResult, ValidationResult } from "../types";

const expandHex = (hex: string): string => {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) return clean.split("").map((char) => char + char).join("");
  return clean.padEnd(6, "0").slice(0, 6);
};

const hexToRgb = (hex: string): [number, number, number] => {
  const clean = expandHex(hex);
  return [0, 2, 4].map((offset) => Number.parseInt(clean.slice(offset, offset + 2), 16)) as [
    number,
    number,
    number,
  ];
};

const luminance = ([r, g, b]: [number, number, number]): number => {
  const channels = [r, g, b].map((value) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

export const calculateContrast = (foreground: string, background: string): number => {
  const first = luminance(hexToRgb(foreground));
  const second = luminance(hexToRgb(background));
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
};

export const estimateQRComplexity = (value: string): number => {
  if (!value) return 0;
  if (value.length < 120) return 1;
  if (value.length < 350) return 2;
  if (value.length < 800) return 3;
  return 4;
};

export const evaluateQuality = (
  value: string,
  design: QRDesignOptions,
  logo: QRLogoOptions,
  validation: ValidationResult,
): QRQualityResult => {
  const warnings = [...validation.errors, ...validation.warnings];
  const tips: string[] = [];
  let score = validation.isValid ? 100 : 30;

  const background = design.transparentBackground ? "#ffffff" : design.backgroundColor;
  const contrastValues = design.gradient.enabled
    ? [
        calculateContrast(design.gradient.startColor, background),
        calculateContrast(design.gradient.endColor, background),
        calculateContrast(design.eyeColor, background),
      ]
    : [calculateContrast(design.foregroundColor, background), calculateContrast(design.eyeColor, background)];
  const contrast = Math.min(...contrastValues);

  if (contrast < 2.6) {
    warnings.push("Der Kontrast ist kritisch niedrig.");
    tips.push("Nutze eine deutlich dunklere Vordergrundfarbe oder einen helleren Hintergrund.");
    score -= 38;
  } else if (contrast < 4.2) {
    warnings.push("Der Kontrast ist für manche Scanner knapp.");
    tips.push("Erhöhe den Farbkontrast vor dem Druck.");
    score -= 18;
  }

  const complexity = estimateQRComplexity(value);
  if (complexity >= 4) {
    warnings.push("Der Inhalt ist sehr lang.");
    tips.push("Verkürze den Inhalt oder nutze einen stabilen Link.");
    score -= 20;
  } else if (complexity === 3) {
    warnings.push("Der Inhalt ist lang und erzeugt ein dichtes Muster.");
    tips.push("Verwende mindestens 768 px Exportgröße.");
    score -= 10;
  }

  if (design.size < 256 && complexity >= 2) {
    warnings.push("Die Exportgröße ist klein für diesen Inhalt.");
    tips.push("Vergrößere den QR-Code.");
    score -= 18;
  }

  if (logo.image && logo.imageSize > 0.24) {
    warnings.push("Das Logo verdeckt relativ viel Fläche.");
    tips.push("Reduziere die Logo-Größe.");
    score -= 16;
  }

  if (logo.image && design.errorCorrectionLevel !== "H") {
    warnings.push("Mit Logo ist Error Correction H empfohlen.");
    tips.push("Erhöhe Error Correction auf H.");
    score -= 14;
  }

  if (design.transparentBackground) {
    warnings.push("Transparente QR-Codes müssen auf dem Zielhintergrund genug Kontrast haben.");
    tips.push("Teste den QR-Code auf dem finalen Hintergrund.");
    score -= 4;
  }

  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));
  const level = normalizedScore >= 86 ? "Sehr gut" : normalizedScore >= 68 ? "Gut" : normalizedScore >= 42 ? "Risiko" : "Kritisch";

  return {
    level,
    score: normalizedScore,
    warnings: Array.from(new Set(warnings)),
    tips: Array.from(new Set(tips)),
  };
};
