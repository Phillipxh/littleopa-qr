import type { AppLanguage, QRDesignOptions, QRTemplate } from "../types";

export const defaultDesign: QRDesignOptions = {
  size: 768,
  margin: 24,
  errorCorrectionLevel: "Q",
  foregroundColor: "#0f172a",
  backgroundColor: "#ffffff",
  transparentBackground: false,
  gradient: {
    enabled: false,
    type: "linear",
    startColor: "#0f172a",
    endColor: "#0f766e",
    rotation: 45,
  },
  moduleStyle: "rounded",
  eyeOuterStyle: "extra-rounded",
  eyeInnerStyle: "dot",
  eyeColor: "#0f172a",
};

const design = (overrides: Partial<QRDesignOptions>): QRDesignOptions => ({
  ...defaultDesign,
  ...overrides,
  gradient: {
    ...defaultDesign.gradient,
    ...overrides.gradient,
  },
});

export const templates: QRTemplate[] = [
  {
    id: "classic",
    name: "Classic Black & White",
    description: "Maximum contrast and very robust.",
    design: design({
      foregroundColor: "#000000",
      backgroundColor: "#ffffff",
      moduleStyle: "square",
      eyeOuterStyle: "square",
      eyeInnerStyle: "square",
      eyeColor: "#000000",
      size: 768,
      margin: 28,
      gradient: {
        enabled: false,
        type: "linear",
        startColor: "#000000",
        endColor: "#000000",
        rotation: 0,
      },
    }),
  },
  {
    id: "modern-blue",
    name: "Modern Blue",
    description: "Clean SaaS look with calm blue tones.",
    design: design({
      foregroundColor: "#0f4c81",
      backgroundColor: "#f8fbff",
      moduleStyle: "rounded",
      eyeOuterStyle: "extra-rounded",
      eyeInnerStyle: "dot",
      eyeColor: "#0b3157",
      margin: 30,
    }),
  },
  {
    id: "green-gradient",
    name: "Green Gradient",
    description: "Fresh, friendly, and high-contrast.",
    design: design({
      foregroundColor: "#065f46",
      backgroundColor: "#f7fff9",
      moduleStyle: "dots",
      eyeOuterStyle: "extra-rounded",
      eyeInnerStyle: "dot",
      eyeColor: "#064e3b",
      gradient: {
        enabled: true,
        type: "linear",
        startColor: "#047857",
        endColor: "#0f766e",
        rotation: 35,
      },
    }),
  },
  {
    id: "violet-premium",
    name: "Violet Premium",
    description: "Distinct but not too loud.",
    design: design({
      foregroundColor: "#4c1d95",
      backgroundColor: "#fbf9ff",
      moduleStyle: "classy-rounded",
      eyeOuterStyle: "extra-rounded",
      eyeInnerStyle: "dot",
      eyeColor: "#3b0764",
      gradient: {
        enabled: true,
        type: "radial",
        startColor: "#5b21b6",
        endColor: "#7c3aed",
        rotation: 0,
      },
    }),
  },
  {
    id: "orange-marketing",
    name: "Orange Marketing",
    description: "Warm tone for campaigns and promotions.",
    design: design({
      foregroundColor: "#9a3412",
      backgroundColor: "#fffaf3",
      moduleStyle: "extra-rounded",
      eyeOuterStyle: "extra-rounded",
      eyeInnerStyle: "rounded",
      eyeColor: "#7c2d12",
      margin: 26,
    }),
  },
  {
    id: "red-event",
    name: "Red Event",
    description: "High visibility for tickets and events.",
    design: design({
      foregroundColor: "#991b1b",
      backgroundColor: "#fff8f8",
      moduleStyle: "classy",
      eyeOuterStyle: "extra-rounded",
      eyeInnerStyle: "square",
      eyeColor: "#7f1d1d",
    }),
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Reduced and premium.",
    design: design({
      foregroundColor: "#1f2937",
      backgroundColor: "#ffffff",
      moduleStyle: "rounded",
      eyeOuterStyle: "rounded",
      eyeInnerStyle: "dot",
      eyeColor: "#111827",
      margin: 36,
    }),
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Light code on a dark base.",
    design: design({
      foregroundColor: "#f8fafc",
      backgroundColor: "#111827",
      moduleStyle: "rounded",
      eyeOuterStyle: "extra-rounded",
      eyeInnerStyle: "dot",
      eyeColor: "#ffffff",
      margin: 30,
    }),
  },
  {
    id: "pastel",
    name: "Pastel",
    description: "Soft look for invitations and print.",
    design: design({
      foregroundColor: "#475569",
      backgroundColor: "#fff7ed",
      moduleStyle: "dots",
      eyeOuterStyle: "dot",
      eyeInnerStyle: "dot",
      eyeColor: "#334155",
      gradient: {
        enabled: true,
        type: "linear",
        startColor: "#475569",
        endColor: "#0f766e",
        rotation: 90,
      },
    }),
  },
  {
    id: "business-gray",
    name: "Business Gray",
    description: "Professional style for business cards.",
    design: design({
      foregroundColor: "#374151",
      backgroundColor: "#f9fafb",
      moduleStyle: "classy",
      eyeOuterStyle: "square",
      eyeInnerStyle: "square",
      eyeColor: "#111827",
      margin: 32,
    }),
  },
  {
    id: "neon",
    name: "Neon",
    description: "High contrast for digital screens.",
    design: design({
      foregroundColor: "#00e5a8",
      backgroundColor: "#07111f",
      moduleStyle: "extra-rounded",
      eyeOuterStyle: "extra-rounded",
      eyeInnerStyle: "dot",
      eyeColor: "#f8fafc",
      gradient: {
        enabled: true,
        type: "linear",
        startColor: "#00e5a8",
        endColor: "#38bdf8",
        rotation: 135,
      },
    }),
  },
  {
    id: "social",
    name: "Social Media Style",
    description: "Vibrant for profiles and creators.",
    design: design({
      foregroundColor: "#be185d",
      backgroundColor: "#fff7fb",
      moduleStyle: "classy-rounded",
      eyeOuterStyle: "extra-rounded",
      eyeInnerStyle: "dot",
      eyeColor: "#831843",
      gradient: {
        enabled: true,
        type: "linear",
        startColor: "#be185d",
        endColor: "#7c3aed",
        rotation: 45,
      },
    }),
  },
];

const germanTemplateCopy: Record<string, { name: string; description: string }> = {
  classic: { name: "Klassisch Schwarz-Weiß", description: "Maximaler Kontrast, sehr robust." },
  "modern-blue": { name: "Modern Blau", description: "Klarer SaaS-Look mit ruhigem Blau." },
  "green-gradient": { name: "Grün Verlauf", description: "Frisch, freundlich und kontraststark." },
  "violet-premium": { name: "Violett Premium", description: "Prägnant, aber nicht zu laut." },
  "orange-marketing": { name: "Orange Marketing", description: "Warm für Kampagnen und Aktionen." },
  "red-event": { name: "Rot Event", description: "Sichtbar für Tickets und Termine." },
  "minimal-light": { name: "Minimal Hell", description: "Reduziert und hochwertig." },
  "dark-mode": { name: "Dark Mode", description: "Heller Code auf dunklem Grund." },
  pastel: { name: "Pastell", description: "Sanft für Einladungen und Print." },
  "business-gray": { name: "Business Grau", description: "Sachlich für Visitenkarten." },
  neon: { name: "Neon", description: "Kontrastreich für digitale Screens." },
  social: { name: "Social Media Style", description: "Lebendig für Profile und Creator." },
};

export const getTemplates = (language: AppLanguage): QRTemplate[] => {
  if (language !== "de") return templates;
  return templates.map((template) => {
    const localized = germanTemplateCopy[template.id];
    if (!localized) return template;
    return { ...template, ...localized };
  });
};
