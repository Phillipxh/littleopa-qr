import QRCodeStyling from "qr-code-styling";
import type { QRDesignOptions, QREyeInnerStyle, QREyeOuterStyle, QRModuleStyle } from "../types";
import { customEyeInnerStyles, customEyeOuterStyles, customModuleStyles } from "./shapeStyles";

const svgNs = "http://www.w3.org/2000/svg";

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

const numeric = (value: string | null, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const attr = (element: Element, name: string, value: string | number) => {
  element.setAttribute(name, String(value));
  return element;
};

const createSvgElement = <K extends keyof SVGElementTagNameMap>(document: Document, tag: K) =>
  document.createElementNS(svgNs, tag);

const boundsFromElement = (element: SVGElement): Bounds | null => {
  const tag = element.tagName.toLowerCase();
  if (tag === "rect") {
    return {
      x: numeric(element.getAttribute("x")),
      y: numeric(element.getAttribute("y")),
      width: numeric(element.getAttribute("width")),
      height: numeric(element.getAttribute("height")),
    };
  }

  if (tag === "circle") {
    const r = numeric(element.getAttribute("r"));
    return {
      x: numeric(element.getAttribute("cx")) - r,
      y: numeric(element.getAttribute("cy")) - r,
      width: r * 2,
      height: r * 2,
    };
  }

  if (tag === "path") {
    const values = element
      .getAttribute("d")
      ?.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)
      ?.map(Number)
      .filter(Number.isFinite);
    if (!values || values.length < 3) return null;
    const size = Math.abs(values[2]);
    return { x: values[0], y: values[1], width: size, height: size };
  }

  return null;
};

const insetBounds = (bounds: Bounds, scaleX: number, scaleY = scaleX): Bounds => {
  const width = bounds.width * scaleX;
  const height = bounds.height * scaleY;
  return {
    x: bounds.x + (bounds.width - width) / 2,
    y: bounds.y + (bounds.height - height) / 2,
    width,
    height,
  };
};

const rect = (document: Document, bounds: Bounds, rx = 0) => {
  const element = createSvgElement(document, "rect");
  attr(element, "x", bounds.x);
  attr(element, "y", bounds.y);
  attr(element, "width", bounds.width);
  attr(element, "height", bounds.height);
  if (rx) attr(element, "rx", rx);
  return element;
};

const circle = (document: Document, cx: number, cy: number, r: number) => {
  const element = createSvgElement(document, "circle");
  attr(element, "cx", cx);
  attr(element, "cy", cy);
  attr(element, "r", r);
  return element;
};

const path = (document: Document, d: string, evenOdd = false) => {
  const element = createSvgElement(document, "path");
  attr(element, "d", d);
  if (evenOdd) {
    attr(element, "clip-rule", "evenodd");
    attr(element, "fill-rule", "evenodd");
  }
  return element;
};

const roundedRectPath = ({ x, y, width, height }: Bounds, radius: number) => {
  const r = Math.min(radius, width / 2, height / 2);
  const right = x + width;
  const bottom = y + height;
  return `M ${x + r} ${y} H ${right - r} Q ${right} ${y} ${right} ${y + r} V ${bottom - r} Q ${right} ${bottom} ${right - r} ${bottom} H ${x + r} Q ${x} ${bottom} ${x} ${bottom - r} V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
};

const octagonPath = ({ x, y, width, height }: Bounds, cut: number) => {
  const c = Math.min(cut, width / 2, height / 2);
  const right = x + width;
  const bottom = y + height;
  return `M ${x + c} ${y} H ${right - c} L ${right} ${y + c} V ${bottom - c} L ${right - c} ${bottom} H ${x + c} L ${x} ${bottom - c} V ${y + c} Z`;
};

const diamondPath = ({ x, y, width, height }: Bounds) => {
  const cx = x + width / 2;
  const cy = y + height / 2;
  return `M ${cx} ${y} L ${x + width} ${cy} L ${cx} ${y + height} L ${x} ${cy} Z`;
};

const plusPath = ({ x, y, width, height }: Bounds, thickness = 0.34) => {
  const barX = width * thickness;
  const barY = height * thickness;
  const left = x + (width - barX) / 2;
  const right = left + barX;
  const top = y + (height - barY) / 2;
  const bottom = top + barY;
  return `M ${left} ${y} H ${right} V ${top} H ${x + width} V ${bottom} H ${right} V ${y + height} H ${left} V ${bottom} H ${x} V ${top} H ${left} Z`;
};

const starPath = ({ x, y, width, height }: Bounds, innerScale = 0.42) => {
  const cx = x + width / 2;
  const cy = y + height / 2;
  const outer = Math.min(width, height) / 2;
  const inner = outer * innerScale;
  const points = Array.from({ length: 8 }, (_, index) => {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / 8;
    return `${cx + Math.cos(angle) * radius} ${cy + Math.sin(angle) * radius}`;
  });
  return `M ${points.join(" L ")} Z`;
};

const ringPath = (outer: string, inner: string) => `${outer} ${inner}`;

const makeModuleShapes = (document: Document, style: QRModuleStyle, bounds: Bounds, index: number) => {
  const size = Math.min(bounds.width, bounds.height);
  const cx = bounds.x + bounds.width / 2;
  const cy = bounds.y + bounds.height / 2;

  switch (style) {
    case "mosaic": {
      const b = insetBounds(bounds, 0.92);
      const cut = size * 0.24;
      const flip = index % 3 === 0;
      const right = b.x + b.width;
      const bottom = b.y + b.height;
      const d = flip
        ? `M ${b.x + cut} ${b.y} H ${right} V ${bottom - cut} L ${right - cut} ${bottom} H ${b.x} V ${b.y + cut} Z`
        : `M ${b.x} ${b.y} H ${right - cut} L ${right} ${b.y + cut} V ${bottom} H ${b.x + cut} L ${b.x} ${bottom - cut} Z`;
      return [path(document, d)];
    }
    case "micro-dots":
      return [circle(document, cx, cy, size * 0.34)];
    case "nano-dots":
      return [circle(document, cx, cy, size * 0.24)];
    case "horizontal-bars":
      return [rect(document, insetBounds(bounds, 0.94, 0.46), size * 0.22)];
    case "vertical-bars":
      return [rect(document, insetBounds(bounds, 0.46, 0.94), size * 0.22)];
    case "soft-rounded":
      return [rect(document, insetBounds(bounds, 0.9), size * 0.2)];
    case "bevel":
      return [path(document, octagonPath(insetBounds(bounds, 0.92), size * 0.16))];
    case "cut-corners": {
      const b = insetBounds(bounds, 0.9);
      const cut = size * 0.18;
      const right = b.x + b.width;
      const bottom = b.y + b.height;
      return [path(document, `M ${b.x + cut} ${b.y} H ${right} V ${bottom} H ${b.x} V ${b.y + cut} Z`)];
    }
    case "diamond":
      return [path(document, diamondPath(insetBounds(bounds, 0.86)))];
    case "capsule":
      return [rect(document, insetBounds(bounds, 0.78), size * 0.24)];
    case "leaf": {
      const b = insetBounds(bounds, 0.92);
      const right = b.x + b.width;
      const bottom = b.y + b.height;
      return [path(document, `M ${b.x} ${bottom} C ${b.x} ${b.y + size * 0.2} ${right - size * 0.1} ${b.y} ${right} ${b.y} C ${right} ${bottom - size * 0.2} ${b.x + size * 0.1} ${bottom} ${b.x} ${bottom} Z`)];
    }
    case "spark":
      return [path(document, starPath(insetBounds(bounds, 0.88), 0.34))];
    case "cross":
      return [path(document, plusPath(insetBounds(bounds, 0.92), 0.38))];
    case "pixel-dots": {
      const r = size * 0.16;
      return [
        circle(document, bounds.x + bounds.width * 0.32, bounds.y + bounds.height * 0.32, r),
        circle(document, bounds.x + bounds.width * 0.68, bounds.y + bounds.height * 0.32, r),
        circle(document, bounds.x + bounds.width * 0.32, bounds.y + bounds.height * 0.68, r),
        circle(document, bounds.x + bounds.width * 0.68, bounds.y + bounds.height * 0.68, r),
      ];
    }
    case "diagonal": {
      const element = rect(document, insetBounds(bounds, 0.84), size * 0.1);
      attr(element, "transform", `rotate(-12 ${cx} ${cy})`);
      return [element];
    }
    case "orbit": {
      const r = size * 0.16;
      return [
        circle(document, cx, cy, size * 0.23),
        circle(document, cx - size * 0.24, cy - size * 0.2, r),
        circle(document, cx + size * 0.24, cy + size * 0.2, r),
      ];
    }
    default:
      return [];
  }
};

const makeOuterEyeShapes = (document: Document, style: QREyeOuterStyle, bounds: Bounds) => {
  const size = Math.min(bounds.width, bounds.height);
  const innerInset = size / 7;
  const inner = {
    x: bounds.x + innerInset,
    y: bounds.y + innerInset,
    width: bounds.width - innerInset * 2,
    height: bounds.height - innerInset * 2,
  };

  switch (style) {
    case "frame-soft":
      return [path(document, ringPath(roundedRectPath(bounds, size * 0.2), roundedRectPath(inner, size * 0.1)), true)];
    case "frame-thin": {
      const thinInner = {
        x: bounds.x + size * 0.19,
        y: bounds.y + size * 0.19,
        width: bounds.width - size * 0.38,
        height: bounds.height - size * 0.38,
      };
      return [path(document, ringPath(roundedRectPath(bounds, size * 0.08), roundedRectPath(thinInner, size * 0.04)), true)];
    }
    case "octagon":
      return [path(document, ringPath(octagonPath(bounds, size * 0.18), octagonPath(inner, size * 0.12)), true)];
    case "bevel":
      return [path(document, ringPath(octagonPath(bounds, size * 0.11), octagonPath(inner, size * 0.06)), true)];
    case "notch": {
      const cut = size * 0.11;
      const outer = `M ${bounds.x + cut} ${bounds.y} H ${bounds.x + bounds.width - cut} L ${bounds.x + bounds.width} ${bounds.y + cut} V ${bounds.y + bounds.height - cut} L ${bounds.x + bounds.width - cut} ${bounds.y + bounds.height} H ${bounds.x + cut} L ${bounds.x} ${bounds.y + bounds.height - cut} V ${bounds.y + cut} Z`;
      return [path(document, ringPath(outer, roundedRectPath(inner, size * 0.04)), true)];
    }
    case "bracket": {
      const t = size / 7;
      const l = size * 0.42;
      const r = size * 0.05;
      return [
        rect(document, { x: bounds.x, y: bounds.y, width: l, height: t }, r),
        rect(document, { x: bounds.x, y: bounds.y, width: t, height: l }, r),
        rect(document, { x: bounds.x + bounds.width - l, y: bounds.y, width: l, height: t }, r),
        rect(document, { x: bounds.x + bounds.width - t, y: bounds.y, width: t, height: l }, r),
        rect(document, { x: bounds.x, y: bounds.y + bounds.height - t, width: l, height: t }, r),
        rect(document, { x: bounds.x, y: bounds.y + bounds.height - l, width: t, height: l }, r),
        rect(document, { x: bounds.x + bounds.width - l, y: bounds.y + bounds.height - t, width: l, height: t }, r),
        rect(document, { x: bounds.x + bounds.width - t, y: bounds.y + bounds.height - l, width: t, height: l }, r),
      ];
    }
    case "pill":
      return [path(document, ringPath(roundedRectPath(bounds, size * 0.28), roundedRectPath(inner, size * 0.18)), true)];
    case "rough": {
      const cell = size / 7;
      const shapes: SVGElement[] = [];
      for (let row = 0; row < 7; row += 1) {
        for (let col = 0; col < 7; col += 1) {
          if (row > 0 && row < 6 && col > 0 && col < 6) continue;
          const jitter = (row + col) % 2 === 0 ? 0 : cell * 0.08;
          shapes.push(rect(document, { x: bounds.x + col * cell + jitter, y: bounds.y + row * cell, width: cell * 0.86, height: cell * 0.86 }, cell * 0.05));
        }
      }
      return shapes;
    }
    default:
      return [];
  }
};

const makeInnerEyeShapes = (document: Document, style: QREyeInnerStyle, bounds: Bounds) => {
  const size = Math.min(bounds.width, bounds.height);
  const cx = bounds.x + bounds.width / 2;
  const cy = bounds.y + bounds.height / 2;

  switch (style) {
    case "soft-square":
      return [rect(document, insetBounds(bounds, 0.86), size * 0.2)];
    case "tiny-square":
      return [rect(document, insetBounds(bounds, 0.62), size * 0.08)];
    case "octagon":
      return [path(document, octagonPath(insetBounds(bounds, 0.86), size * 0.14))];
    case "diamond":
      return [path(document, diamondPath(insetBounds(bounds, 0.82)))];
    case "vertical-pills": {
      const width = size * 0.18;
      const height = size * 0.78;
      return [-0.24, 0, 0.24].map((offset) => rect(document, { x: cx + size * offset - width / 2, y: cy - height / 2, width, height }, width / 2));
    }
    case "horizontal-pills": {
      const width = size * 0.78;
      const height = size * 0.18;
      return [-0.24, 0, 0.24].map((offset) => rect(document, { x: cx - width / 2, y: cy + size * offset - height / 2, width, height }, height / 2));
    }
    case "flower": {
      const r = size * 0.16;
      return [
        circle(document, cx, cy, r * 1.25),
        circle(document, cx - size * 0.23, cy, r),
        circle(document, cx + size * 0.23, cy, r),
        circle(document, cx, cy - size * 0.23, r),
        circle(document, cx, cy + size * 0.23, r),
      ];
    }
    case "circle-grid": {
      const cell = size / 3;
      const shapes: SVGElement[] = [];
      for (let row = 0; row < 3; row += 1) {
        for (let col = 0; col < 3; col += 1) {
          shapes.push(circle(document, bounds.x + cell * (col + 0.5), bounds.y + cell * (row + 0.5), cell * 0.29));
        }
      }
      return shapes;
    }
    case "slash": {
      const element = rect(document, insetBounds(bounds, 0.38, 0.92), size * 0.08);
      attr(element, "transform", `rotate(-45 ${cx} ${cy})`);
      return [element];
    }
    case "inset":
      return [rect(document, insetBounds(bounds, 0.7), size * 0.08)];
    case "burst":
      return [path(document, starPath(insetBounds(bounds, 0.88), 0.36))];
    default:
      return [];
  }
};

const replaceClipPathChildren = (
  svg: SVGElement,
  selector: string,
  createShapes: (document: Document, bounds: Bounds, index: number) => SVGElement[],
) => {
  const clipPaths = Array.from(svg.querySelectorAll(selector));

  clipPaths.forEach((clipPath) => {
    const originals = Array.from(clipPath.children) as SVGElement[];
    const replacements = originals.flatMap((original, index) => {
      const bounds = boundsFromElement(original);
      if (!bounds || bounds.width <= 0 || bounds.height <= 0) return [original.cloneNode(true) as SVGElement];
      const shapes = createShapes(svg.ownerDocument, bounds, index);
      if (!shapes.length) return [original.cloneNode(true) as SVGElement];

      const transform = original.getAttribute("transform");
      if (transform) {
        shapes.forEach((shape) => {
          if (!shape.getAttribute("transform")) attr(shape, "transform", transform);
        });
      }
      return shapes;
    });

    clipPath.replaceChildren(...replacements);
  });
};

export const applyQRCodeStyleExtension = (qrCode: QRCodeStyling, design: QRDesignOptions) => {
  const hasCustomModule = customModuleStyles.has(design.moduleStyle);
  const hasCustomOuter = customEyeOuterStyles.has(design.eyeOuterStyle);
  const hasCustomInner = customEyeInnerStyles.has(design.eyeInnerStyle);

  if (!hasCustomModule && !hasCustomOuter && !hasCustomInner) return;

  qrCode.applyExtension((svg) => {
    if (hasCustomModule) {
      replaceClipPathChildren(svg, "clipPath[id^='clip-path-dot-color']", (document, bounds, index) =>
        makeModuleShapes(document, design.moduleStyle, bounds, index),
      );
    }

    if (hasCustomOuter) {
      replaceClipPathChildren(svg, "clipPath[id^='clip-path-corners-square-color']", (document, bounds) =>
        makeOuterEyeShapes(document, design.eyeOuterStyle, bounds),
      );
    }

    if (hasCustomInner) {
      replaceClipPathChildren(svg, "clipPath[id^='clip-path-corners-dot-color']", (document, bounds) =>
        makeInnerEyeShapes(document, design.eyeInnerStyle, bounds),
      );
    }
  });
};
