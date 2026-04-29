import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { contentTypeIconFallback, contentTypeIcons } from "../data/contentTypeIcons";
import { getSocialPlatform } from "../data/socialPlatforms";
import type { QRContentType, QRFormData, QRLogoBorderStyle, QRLogoOptions } from "../types";

const cleanColor = (color: string): string => (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color) ? color : "#2563eb");
const normalizeHex = (color: string): string => {
  const safe = cleanColor(color).replace("#", "");
  if (safe.length === 3) return `#${safe.split("").map((value) => `${value}${value}`).join("")}`;
  return `#${safe}`;
};

const mixHex = (color: string, target: string, weight: number): string => {
  const source = normalizeHex(color).slice(1);
  const goal = normalizeHex(target).slice(1);
  const channels = [0, 2, 4].map((offset) => {
    const from = Number.parseInt(source.slice(offset, offset + 2), 16);
    const to = Number.parseInt(goal.slice(offset, offset + 2), 16);
    return Math.round(from * (1 - weight) + to * weight)
      .toString(16)
      .padStart(2, "0");
  });
  return `#${channels.join("")}`;
};

const typeIconColors: Record<QRContentType, string> = {
  url: "#2563eb",
  text: "#4f46e5",
  email: "#0284c7",
  phone: "#0f766e",
  sms: "#6366f1",
  whatsapp: "#25D366",
  wifi: "#2563eb",
  vcard: "#0891b2",
  mecard: "#2563eb",
  event: "#7c3aed",
  geo: "#0f766e",
  social: "#2563eb",
  app: "#0ea5e9",
  payment: "#0070ba",
  crypto: "#f7931a",
  file: "#475569",
  multilink: "#2563eb",
};

const resolveTypeIcon = (type: QRContentType, data?: QRFormData, customColor = "") => {
  if (type === "social" && data) {
    const platform = getSocialPlatform(data.socialPlatform);
    return {
      Icon: platform.icon,
      accent: platform.color,
      name: `${platform.label}-Icon`,
    };
  }

  return {
    Icon: contentTypeIcons[type] ?? contentTypeIconFallback,
    accent: customColor || typeIconColors[type],
    name: "Typ-Icon",
  };
};

export const getTypeIconColor = (type: QRContentType, data?: QRFormData, customColor = ""): string =>
  normalizeHex(resolveTypeIcon(type, data, customColor).accent);

const getBorderDashArray = (style: QRLogoBorderStyle, width: number): string | undefined => {
  if (style === "dashed") return `${Math.max(width * 3.2, 7)} ${Math.max(width * 2.1, 5)}`;
  if (style === "dotted") return `${Math.max(width * 0.4, 1)} ${Math.max(width * 2.2, 4.5)}`;
  return undefined;
};

const getShadowSpec = (strength: number) => {
  const safe = Math.max(0, Math.min(strength, 40));
  return {
    dy: Number((safe * 0.22).toFixed(2)),
    stdDeviation: Number((safe * 0.18).toFixed(2)),
    opacity: Number((safe * 0.012).toFixed(3)),
  };
};

export const createTypeIconDataUrl = (
  type: QRContentType,
  color: string,
  data?: QRFormData,
  customColor = "",
  cardColor = "#ffffff",
  customBorderColor = "",
  borderStyle: QRLogoBorderStyle = "solid",
  borderWidth = 2.2,
  radius = 23,
  shadow = 18,
): string => {
  const resolved = resolveTypeIcon(type, data, customColor);
  const accent = normalizeHex(resolved.accent || color);
  const iconCardColor = normalizeHex(cardColor || "#ffffff");
  const borderColor = normalizeHex(customBorderColor || mixHex(iconCardColor, "#0f172a", 0.12));
  const safeBorderWidth = Math.max(0, Math.min(borderWidth, 8));
  const safeRadius = Math.max(8, Math.min(radius, 34));
  const dashArray = getBorderDashArray(borderStyle, safeBorderWidth);
  const shadowSpec = getShadowSpec(shadow);
  const Icon = resolved.Icon;
  const iconMarkup = renderToStaticMarkup(
    createElement(Icon, {
      "aria-hidden": true,
      color: accent,
      focusable: false,
      size: 42,
      style: { color: accent },
    }),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="${shadowSpec.dy}" stdDeviation="${shadowSpec.stdDeviation}" flood-color="#0f172a" flood-opacity="${shadowSpec.opacity}"/>
    </filter>
  </defs>
  <rect x="5" y="5" width="86" height="86" rx="${safeRadius}" fill="${iconCardColor}" stroke="${borderColor}" stroke-width="${safeBorderWidth}"${dashArray ? ` stroke-dasharray="${dashArray}" stroke-linecap="round"` : ""} filter="url(#softShadow)"/>
  <g transform="translate(27 27)">
    ${iconMarkup}
  </g>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const resolveLogoForType = (logo: QRLogoOptions, type: QRContentType, color: string, data?: QRFormData): QRLogoOptions => {
  if (!logo.useTypeIcon) return logo;
  const resolved = resolveTypeIcon(type, data, logo.iconColor);
  return {
    ...logo,
    image: createTypeIconDataUrl(
      type,
      color,
      data,
      logo.iconColor,
      logo.iconBackgroundColor,
      logo.iconBorderColor,
      logo.iconBorderStyle,
      logo.iconBorderWidth,
      logo.iconRadius,
      logo.iconShadow,
    ),
    name: resolved.name,
  };
};
