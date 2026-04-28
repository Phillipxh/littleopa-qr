import type { QRDesignOptions } from "../types";

const palettes = [
  ["#0f172a", "#f8fafc", "#0f766e"],
  ["#12355b", "#ffffff", "#d97706"],
  ["#064e3b", "#f7fff9", "#0f766e"],
  ["#7f1d1d", "#fff7f7", "#be123c"],
  ["#312e81", "#f8f7ff", "#0e7490"],
  ["#111827", "#f9fafb", "#64748b"],
  ["#083344", "#ecfeff", "#7c2d12"],
];

const moduleStyles: QRDesignOptions["moduleStyle"][] = ["square", "dots", "rounded", "classy", "classy-rounded", "extra-rounded"];
const eyeOuterStyles: QRDesignOptions["eyeOuterStyle"][] = ["square", "dot", "extra-rounded", "rounded"];
const eyeInnerStyles: QRDesignOptions["eyeInnerStyle"][] = ["square", "dot", "rounded"];

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const randomizeDesign = (current: QRDesignOptions): QRDesignOptions => {
  const [foreground, background, accent] = pick(palettes);
  const gradientEnabled = Math.random() > 0.45;

  return {
    ...current,
    foregroundColor: foreground,
    backgroundColor: background,
    transparentBackground: false,
    moduleStyle: pick(moduleStyles),
    eyeOuterStyle: pick(eyeOuterStyles),
    eyeInnerStyle: pick(eyeInnerStyles),
    eyeColor: foreground,
    margin: pick([18, 24, 28, 32, 36]),
    gradient: {
      enabled: gradientEnabled,
      type: Math.random() > 0.35 ? "linear" : "radial",
      startColor: foreground,
      endColor: accent,
      rotation: pick([0, 35, 45, 90, 135, 180]),
    },
  };
};
