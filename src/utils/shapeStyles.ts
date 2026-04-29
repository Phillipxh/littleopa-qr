import type { CornerDotType, CornerSquareType, DotType } from "qr-code-styling";
import type { QREyeInnerStyle, QREyeOuterStyle, QRModuleStyle } from "../types";

export interface QRStyleOption<T extends string> {
  value: T;
  labelEn: string;
  labelDe: string;
  hintEn: string;
  hintDe: string;
}

export interface ShapePreset {
  id: string;
  labelEn: string;
  labelDe: string;
  hintEn: string;
  hintDe: string;
  module: QRModuleStyle;
  outer: QREyeOuterStyle;
  inner: QREyeInnerStyle;
}

export const moduleStyleOptions: QRStyleOption<QRModuleStyle>[] = [
  { value: "square", labelEn: "Square", labelDe: "Quadratisch", hintEn: "clean edges", hintDe: "klare Kanten" },
  { value: "mosaic", labelEn: "Mosaic", labelDe: "Mosaik", hintEn: "dynamic pixel blocks", hintDe: "dynamische Pixelblöcke" },
  { value: "dots", labelEn: "Dots", labelDe: "Punkte", hintEn: "soft and modern", hintDe: "weich und modern" },
  { value: "micro-dots", labelEn: "Micro Dots", labelDe: "Micro-Punkte", hintEn: "light dot grid", hintDe: "feines Punktraster" },
  { value: "nano-dots", labelEn: "Nano Dots", labelDe: "Feinpunkte", hintEn: "minimal and airy", hintDe: "minimal und luftig" },
  { value: "horizontal-bars", labelEn: "Horizontal Bars", labelDe: "Horizontale Linien", hintEn: "calm line rhythm", hintDe: "ruhiger Linienrhythmus" },
  { value: "vertical-bars", labelEn: "Vertical Bars", labelDe: "Vertikale Linien", hintEn: "compact bar rhythm", hintDe: "kompakter Balkenrhythmus" },
  { value: "rounded", labelEn: "Rounded", labelDe: "Abgerundet", hintEn: "smooth modules", hintDe: "sanfte Module" },
  { value: "soft-rounded", labelEn: "Soft Rounded", labelDe: "Soft Rounded", hintEn: "gentle blocks", hintDe: "weiche Blöcke" },
  { value: "extra-rounded", labelEn: "Extra Rounded", labelDe: "Extra rund", hintEn: "very organic", hintDe: "sehr organisch" },
  { value: "classy", labelEn: "Classy", labelDe: "Classy", hintEn: "technical look", hintDe: "technisch markant" },
  { value: "classy-rounded", labelEn: "Classy Rounded", labelDe: "Classy rund", hintEn: "sharp + soft", hintDe: "markant + weich" },
  { value: "bevel", labelEn: "Bevel", labelDe: "Bevel", hintEn: "cut geometric cells", hintDe: "geometrisch geschnitten" },
  { value: "cut-corners", labelEn: "Cut Corners", labelDe: "Cut Corners", hintEn: "angular motion", hintDe: "kantige Bewegung" },
  { value: "diamond", labelEn: "Diamond", labelDe: "Diamant", hintEn: "rotated pixels", hintDe: "gedrehte Pixel" },
  { value: "capsule", labelEn: "Capsule", labelDe: "Kapsel", hintEn: "soft compact cells", hintDe: "weich und kompakt" },
  { value: "leaf", labelEn: "Leaf", labelDe: "Leaf", hintEn: "organic corners", hintDe: "organische Kanten" },
  { value: "spark", labelEn: "Spark", labelDe: "Spark", hintEn: "expressive points", hintDe: "expressive Punkte" },
  { value: "cross", labelEn: "Cross", labelDe: "Cross", hintEn: "plus-shaped matrix", hintDe: "Plus-Matrix" },
  { value: "pixel-dots", labelEn: "Pixel Dots", labelDe: "Pixel-Punkte", hintEn: "four-dot texture", hintDe: "Vierpunkt-Textur" },
  { value: "diagonal", labelEn: "Diagonal", labelDe: "Diagonal", hintEn: "tilted blocks", hintDe: "geneigte Blöcke" },
  { value: "orbit", labelEn: "Orbit", labelDe: "Orbit", hintEn: "clustered dots", hintDe: "gebündelte Punkte" },
];

export const eyeOuterStyleOptions: QRStyleOption<QREyeOuterStyle>[] = [
  { value: "square", labelEn: "Square", labelDe: "Quadrat", hintEn: "maximum robustness", hintDe: "maximal robust" },
  { value: "extra-rounded", labelEn: "Extra Rounded", labelDe: "Extra rund", hintEn: "premium frame", hintDe: "premium Rahmen" },
  { value: "rounded", labelEn: "Rounded", labelDe: "Rund", hintEn: "friendly", hintDe: "freundlich" },
  { value: "dot", labelEn: "Circle", labelDe: "Kreis", hintEn: "soft finder", hintDe: "weicher Finder" },
  { value: "dots", labelEn: "Micro Dots", labelDe: "Micro-Punkte", hintEn: "organic dots", hintDe: "organischer Look" },
  { value: "classy", labelEn: "Classy", labelDe: "Classy", hintEn: "premium contour", hintDe: "premium Kontur" },
  { value: "classy-rounded", labelEn: "Classy Rounded", labelDe: "Classy rund", hintEn: "flowing premium", hintDe: "weich + premium" },
  { value: "frame-soft", labelEn: "Soft Frame", labelDe: "Soft Frame", hintEn: "balanced radius", hintDe: "balancierter Radius" },
  { value: "frame-thin", labelEn: "Thin Frame", labelDe: "Thin Frame", hintEn: "lighter finder", hintDe: "leichter Finder" },
  { value: "octagon", labelEn: "Octagon", labelDe: "Oktagon", hintEn: "bold geometry", hintDe: "klare Geometrie" },
  { value: "bevel", labelEn: "Bevel Frame", labelDe: "Bevel Frame", hintEn: "cut corners", hintDe: "geschnittene Ecken" },
  { value: "notch", labelEn: "Notch", labelDe: "Notch", hintEn: "stepped contour", hintDe: "abgestufte Kontur" },
  { value: "bracket", labelEn: "Bracket", labelDe: "Bracket", hintEn: "open technical frame", hintDe: "offener Tech-Rahmen" },
  { value: "pill", labelEn: "Pill Frame", labelDe: "Pill Frame", hintEn: "soft rectangular ring", hintDe: "weicher Rechteckring" },
  { value: "rough", labelEn: "Pixel Rough", labelDe: "Pixel Rough", hintEn: "textured outline", hintDe: "pixelige Kontur" },
];

export const eyeInnerStyleOptions: QRStyleOption<QREyeInnerStyle>[] = [
  { value: "square", labelEn: "Square", labelDe: "Quadrat", hintEn: "precise", hintDe: "präzise" },
  { value: "dot", labelEn: "Dot", labelDe: "Punkt", hintEn: "soft", hintDe: "weich" },
  { value: "rounded", labelEn: "Rounded", labelDe: "Rund", hintEn: "balanced", hintDe: "balanciert" },
  { value: "dots", labelEn: "Micro Dots", labelDe: "Micro-Punkte", hintEn: "lightweight", hintDe: "leicht" },
  { value: "extra-rounded", labelEn: "Extra Rounded", labelDe: "Extra rund", hintEn: "organic", hintDe: "organisch" },
  { value: "classy", labelEn: "Classy", labelDe: "Classy", hintEn: "edge focus", hintDe: "markant" },
  { value: "classy-rounded", labelEn: "Classy Rounded", labelDe: "Classy rund", hintEn: "smooth contrast", hintDe: "fließend" },
  { value: "soft-square", labelEn: "Soft Square", labelDe: "Soft Square", hintEn: "stable and soft", hintDe: "stabil und weich" },
  { value: "tiny-square", labelEn: "Tiny Square", labelDe: "Tiny Square", hintEn: "compact center", hintDe: "kompaktes Zentrum" },
  { value: "octagon", labelEn: "Octagon", labelDe: "Oktagon", hintEn: "geometric center", hintDe: "geometrisches Zentrum" },
  { value: "diamond", labelEn: "Diamond", labelDe: "Diamant", hintEn: "rotated center", hintDe: "gedrehtes Zentrum" },
  { value: "vertical-pills", labelEn: "Vertical Pills", labelDe: "Vertikale Pills", hintEn: "striped center", hintDe: "gestreiftes Zentrum" },
  { value: "horizontal-pills", labelEn: "Horizontal Pills", labelDe: "Horizontale Pills", hintEn: "stacked center", hintDe: "gestapeltes Zentrum" },
  { value: "flower", labelEn: "Flower", labelDe: "Flower", hintEn: "clustered circles", hintDe: "kreisförmiger Cluster" },
  { value: "circle-grid", labelEn: "Circle Grid", labelDe: "Circle Grid", hintEn: "dot cluster", hintDe: "Punkt-Cluster" },
  { value: "slash", labelEn: "Slash", labelDe: "Slash", hintEn: "diagonal center", hintDe: "diagonales Zentrum" },
  { value: "inset", labelEn: "Inset", labelDe: "Inset", hintEn: "smaller core", hintDe: "kleiner Kern" },
  { value: "burst", labelEn: "Burst", labelDe: "Burst", hintEn: "expressive core", hintDe: "expressiver Kern" },
];

export const shapePresets: ShapePreset[] = [
  { id: "bold-square", labelEn: "Bold Square", labelDe: "Bold Quadrat", hintEn: "high scan stability", hintDe: "hohe Scan-Stabilität", module: "square", outer: "square", inner: "square" },
  { id: "dot-soft", labelEn: "Dot Soft", labelDe: "Dot Soft", hintEn: "soft modern look", hintDe: "weicher moderner Look", module: "dots", outer: "dot", inner: "dot" },
  { id: "flow-rounded", labelEn: "Flow Rounded", labelDe: "Flow Rund", hintEn: "balanced daily use", hintDe: "ausbalanciert für Alltag", module: "rounded", outer: "rounded", inner: "dot" },
  { id: "classy-pro", labelEn: "Classy Pro", labelDe: "Classy Pro", hintEn: "tech premium style", hintDe: "technisch-premium Stil", module: "classy", outer: "classy", inner: "square" },
  { id: "classy-soft", labelEn: "Classy Soft", labelDe: "Classy Soft", hintEn: "sharp + rounded", hintDe: "markant + rund", module: "classy-rounded", outer: "classy-rounded", inner: "rounded" },
  { id: "organic-plus", labelEn: "Organic Plus", labelDe: "Organic Plus", hintEn: "organic and friendly", hintDe: "organisch und freundlich", module: "extra-rounded", outer: "extra-rounded", inner: "dot" },
  { id: "micro-corners", labelEn: "Micro Corners", labelDe: "Mikro-Ecken", hintEn: "small eye emphasis", hintDe: "fokussierte kleine Augen", module: "micro-dots", outer: "dots", inner: "circle-grid" },
  { id: "matrix", labelEn: "Matrix", labelDe: "Matrix", hintEn: "strong square matrix", hintDe: "starke Matrix-Optik", module: "square", outer: "classy", inner: "dot" },
  { id: "neo-balance", labelEn: "Neo Balance", labelDe: "Neo Balance", hintEn: "modern balanced style", hintDe: "modern ausbalanciert", module: "soft-rounded", outer: "frame-soft", inner: "soft-square" },
  { id: "precision", labelEn: "Precision", labelDe: "Präzision", hintEn: "clean enterprise look", hintDe: "klarer Enterprise-Look", module: "bevel", outer: "rounded", inner: "square" },
  { id: "punch-dot", labelEn: "Punch Dot", labelDe: "Punch Dot", hintEn: "bold center points", hintDe: "kräftige Innenpunkte", module: "capsule", outer: "square", inner: "dot" },
  { id: "aero", labelEn: "Aero", labelDe: "Aero", hintEn: "light and dynamic", hintDe: "leicht und dynamisch", module: "orbit", outer: "classy-rounded", inner: "flower" },
];

export const moduleStyleValues = moduleStyleOptions.map((option) => option.value);
export const eyeOuterStyleValues = eyeOuterStyleOptions.map((option) => option.value);
export const eyeInnerStyleValues = eyeInnerStyleOptions.map((option) => option.value);

export const moduleStyleTypeMap: Record<QRModuleStyle, DotType> = {
  square: "square",
  mosaic: "square",
  dots: "dots",
  "micro-dots": "square",
  "nano-dots": "square",
  "horizontal-bars": "square",
  "vertical-bars": "square",
  rounded: "rounded",
  "soft-rounded": "square",
  "extra-rounded": "extra-rounded",
  classy: "classy",
  "classy-rounded": "classy-rounded",
  bevel: "square",
  "cut-corners": "square",
  diamond: "square",
  capsule: "square",
  leaf: "square",
  spark: "square",
  cross: "square",
  "pixel-dots": "square",
  diagonal: "square",
  orbit: "square",
};

export const eyeOuterStyleTypeMap: Record<QREyeOuterStyle, CornerSquareType> = {
  square: "square",
  dot: "dot",
  dots: "dots",
  rounded: "rounded",
  classy: "classy",
  "classy-rounded": "classy-rounded",
  "extra-rounded": "extra-rounded",
  "frame-soft": "square",
  "frame-thin": "square",
  octagon: "square",
  bevel: "square",
  notch: "square",
  bracket: "square",
  pill: "square",
  rough: "square",
};

export const eyeInnerStyleTypeMap: Record<QREyeInnerStyle, CornerDotType> = {
  square: "square",
  dot: "dot",
  dots: "dots",
  rounded: "rounded",
  classy: "classy",
  "classy-rounded": "classy-rounded",
  "extra-rounded": "extra-rounded",
  "soft-square": "square",
  "tiny-square": "square",
  octagon: "square",
  diamond: "square",
  "vertical-pills": "square",
  "horizontal-pills": "square",
  flower: "square",
  "circle-grid": "square",
  slash: "square",
  inset: "square",
  burst: "square",
};

export const customModuleStyles = new Set<QRModuleStyle>(
  moduleStyleOptions.map((option) => option.value).filter((value) => !["square", "dots", "rounded", "classy", "classy-rounded", "extra-rounded"].includes(value)),
);

export const customEyeOuterStyles = new Set<QREyeOuterStyle>(
  eyeOuterStyleOptions.map((option) => option.value).filter((value) => !["square", "dot", "dots", "rounded", "classy", "classy-rounded", "extra-rounded"].includes(value)),
);

export const customEyeInnerStyles = new Set<QREyeInnerStyle>(
  eyeInnerStyleOptions.map((option) => option.value).filter((value) => !["square", "dot", "dots", "rounded", "classy", "classy-rounded", "extra-rounded"].includes(value)),
);
