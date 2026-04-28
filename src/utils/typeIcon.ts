import type { QRContentType, QRLogoOptions } from "../types";

type IconTag = "path" | "rect" | "circle" | "line" | "polyline";
type IconAttrs = Record<string, string | number>;

interface IconNode {
  tag: IconTag;
  attrs: IconAttrs;
}

const node = (tag: IconTag, attrs: IconAttrs): IconNode => ({ tag, attrs });

const iconNodes: Record<QRContentType, IconNode[]> = {
  url: [
    node("path", { d: "M9 17H7A5 5 0 0 1 7 7h2" }),
    node("path", { d: "M15 7h2a5 5 0 1 1 0 10h-2" }),
    node("line", { x1: 8, x2: 16, y1: 12, y2: 12 }),
  ],
  text: [
    node("path", { d: "M4 7V4h16v3" }),
    node("path", { d: "M9 20h6" }),
    node("path", { d: "M12 4v16" }),
  ],
  email: [
    node("rect", { x: 2, y: 4, width: 20, height: 16, rx: 2 }),
    node("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }),
  ],
  phone: [node("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.93.36 1.86.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.95.34 1.88.58 2.81.7A2 2 0 0 1 22 16.92z" })],
  sms: [
    node("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }),
    node("path", { d: "M8 10h8" }),
    node("path", { d: "M8 14h5" }),
  ],
  whatsapp: [
    node("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }),
    node("path", { d: "M9.6 8.8c.4 2.4 2.2 4.2 4.6 4.6" }),
    node("path", { d: "M14.7 13.4l1.1-1.1 2.1.6-.2 1.7c-.1.6-.6 1.1-1.2 1.1A8.1 8.1 0 0 1 8.3 7.5c0-.6.5-1.1 1.1-1.2l1.7-.2.6 2.1-1.1 1.1" }),
  ],
  wifi: [
    node("path", { d: "M5 13a10 10 0 0 1 14 0" }),
    node("path", { d: "M8.5 16.5a5 5 0 0 1 7 0" }),
    node("path", { d: "M2 9a15 15 0 0 1 20 0" }),
    node("path", { d: "M12 20h.01" }),
  ],
  vcard: [
    node("rect", { x: 3, y: 4, width: 18, height: 16, rx: 2 }),
    node("circle", { cx: 9, cy: 10, r: 2 }),
    node("path", { d: "M6 16c.7-2 5.3-2 6 0" }),
    node("path", { d: "M14 9h4" }),
    node("path", { d: "M14 13h4" }),
  ],
  mecard: [
    node("rect", { x: 3, y: 3, width: 6, height: 6, rx: 1 }),
    node("rect", { x: 15, y: 3, width: 6, height: 6, rx: 1 }),
    node("rect", { x: 3, y: 15, width: 6, height: 6, rx: 1 }),
    node("path", { d: "M15 15h2v2h-2z" }),
    node("path", { d: "M19 15h2v6h-6v-2" }),
  ],
  event: [
    node("path", { d: "M8 2v4" }),
    node("path", { d: "M16 2v4" }),
    node("rect", { x: 3, y: 4, width: 18, height: 18, rx: 2 }),
    node("path", { d: "M3 10h18" }),
    node("path", { d: "M8 14h.01" }),
    node("path", { d: "M12 14h.01" }),
    node("path", { d: "M16 14h.01" }),
  ],
  geo: [
    node("path", { d: "M20 10c0 5-5.54 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.2 4 15 4 10a8 8 0 0 1 16 0" }),
    node("circle", { cx: 12, cy: 10, r: 3 }),
  ],
  social: [
    node("circle", { cx: 18, cy: 5, r: 3 }),
    node("circle", { cx: 6, cy: 12, r: 3 }),
    node("circle", { cx: 18, cy: 19, r: 3 }),
    node("path", { d: "m8.6 13.5 6.8 4" }),
    node("path", { d: "m15.4 6.5-6.8 4" }),
  ],
  app: [
    node("rect", { x: 2, y: 4, width: 20, height: 16, rx: 2 }),
    node("path", { d: "M2 8h20" }),
    node("path", { d: "M6 4v4" }),
    node("path", { d: "M10 4v4" }),
  ],
  payment: [
    node("rect", { x: 2, y: 5, width: 20, height: 14, rx: 2 }),
    node("path", { d: "M2 10h20" }),
    node("path", { d: "M6 15h4" }),
    node("path", { d: "M15 15h3" }),
  ],
  crypto: [
    node("path", { d: "M11 2v20" }),
    node("path", { d: "M15 2v20" }),
    node("path", { d: "M7 6h8.5a3 3 0 0 1 0 6H7" }),
    node("path", { d: "M7 12h9a3 3 0 0 1 0 6H7" }),
    node("path", { d: "M9 6v12" }),
  ],
  file: [
    node("path", { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z" }),
    node("path", { d: "M14 2v6h6" }),
    node("path", { d: "M8 13h8" }),
    node("path", { d: "M8 17h5" }),
  ],
  multilink: [
    node("circle", { cx: 12, cy: 12, r: 10 }),
    node("path", { d: "M2 12h20" }),
    node("path", { d: "M12 2a15.3 15.3 0 0 1 0 20" }),
    node("path", { d: "M12 2a15.3 15.3 0 0 0 0 20" }),
  ],
};

const cleanColor = (color: string): string => (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color) ? color : "#0f766e");

const escapeAttribute = (value: string | number): string =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const renderNode = ({ tag, attrs }: IconNode): string => {
  const attributes = Object.entries(attrs)
    .map(([name, value]) => `${name}="${escapeAttribute(value)}"`)
    .join(" ");
  return `<${tag} ${attributes}/>`;
};

export const createTypeIconDataUrl = (type: QRContentType, color: string): string => {
  const accent = cleanColor(color);
  const nodes = iconNodes[type] ?? iconNodes.url;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <rect width="96" height="96" rx="24" fill="#ffffff"/>
  <rect x="5" y="5" width="86" height="86" rx="20" fill="#f8fafc" stroke="${accent}" stroke-opacity=".2"/>
  <g transform="translate(24 24) scale(2)" fill="none" stroke="${accent}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    ${nodes.map(renderNode).join("")}
  </g>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const resolveLogoForType = (logo: QRLogoOptions, type: QRContentType, color: string): QRLogoOptions => {
  if (!logo.useTypeIcon) return logo;
  return {
    ...logo,
    image: createTypeIconDataUrl(type, color),
    name: "Typ-Icon",
  };
};
