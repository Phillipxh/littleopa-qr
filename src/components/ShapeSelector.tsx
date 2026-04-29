import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import type { AppLanguage, QRDesignOptions, QREyeInnerStyle, QREyeOuterStyle, QRModuleStyle } from "../types";
import { eyeInnerStyleOptions, eyeOuterStyleOptions, moduleStyleOptions, type QRStyleOption } from "../utils/shapeStyles";

interface ShapeSelectorProps {
  language: AppLanguage;
  design: QRDesignOptions;
  onChange: (design: QRDesignOptions) => void;
}

interface Bounds {
  x: number;
  y: number;
  size: number;
}

type ShapeSectionId = "module" | "outer" | "inner";

const moduleCells = [
  [5, 5],
  [17, 5],
  [29, 5],
  [53, 5],
  [5, 17],
  [17, 17],
  [41, 17],
  [53, 17],
  [65, 17],
  [17, 29],
  [29, 29],
  [41, 29],
  [65, 29],
  [5, 41],
  [29, 41],
] as const;

const roundedRectPath = ({ x, y, size }: Bounds, radius: number) => {
  const r = Math.min(radius, size / 2);
  const right = x + size;
  const bottom = y + size;
  return `M ${x + r} ${y} H ${right - r} Q ${right} ${y} ${right} ${y + r} V ${bottom - r} Q ${right} ${bottom} ${right - r} ${bottom} H ${x + r} Q ${x} ${bottom} ${x} ${bottom - r} V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
};

const octagonPath = ({ x, y, size }: Bounds, cut: number) => {
  const c = Math.min(cut, size / 2);
  const right = x + size;
  const bottom = y + size;
  return `M ${x + c} ${y} H ${right - c} L ${right} ${y + c} V ${bottom - c} L ${right - c} ${bottom} H ${x + c} L ${x} ${bottom - c} V ${y + c} Z`;
};

const diamondPath = ({ x, y, size }: Bounds) => {
  const cx = x + size / 2;
  const cy = y + size / 2;
  return `M ${cx} ${y} L ${x + size} ${cy} L ${cx} ${y + size} L ${x} ${cy} Z`;
};

const circlePath = ({ x, y, size }: Bounds) => {
  const r = size / 2;
  return `M ${x + r} ${y} a ${r} ${r} 0 1 0 0.1 0 Z`;
};

const inset = ({ x, y, size }: Bounds, scale: number): Bounds => {
  const nextSize = size * scale;
  return { x: x + (size - nextSize) / 2, y: y + (size - nextSize) / 2, size: nextSize };
};

const plusPath = ({ x, y, size }: Bounds, thickness = 0.34) => {
  const bar = size * thickness;
  const left = x + (size - bar) / 2;
  const right = left + bar;
  const top = y + (size - bar) / 2;
  const bottom = top + bar;
  return `M ${left} ${y} H ${right} V ${top} H ${x + size} V ${bottom} H ${right} V ${y + size} H ${left} V ${bottom} H ${x} V ${top} H ${left} Z`;
};

const starPath = ({ x, y, size }: Bounds, innerScale = 0.42) => {
  const cx = x + size / 2;
  const cy = y + size / 2;
  const outer = size / 2;
  const inner = outer * innerScale;
  const points = Array.from({ length: 8 }, (_, index) => {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / 8;
    return `${cx + Math.cos(angle) * radius} ${cy + Math.sin(angle) * radius}`;
  });
  return `M ${points.join(" L ")} Z`;
};

const moduleShape = (style: QRModuleStyle, x: number, y: number, size: number, index: number, keyPrefix: string) => {
  const b = { x, y, size };
  const cx = x + size / 2;
  const cy = y + size / 2;

  switch (style) {
    case "dots":
      return <circle key={keyPrefix} cx={cx} cy={cy} r={size * 0.5} />;
    case "micro-dots":
      return <circle key={keyPrefix} cx={cx} cy={cy} r={size * 0.34} />;
    case "nano-dots":
      return <circle key={keyPrefix} cx={cx} cy={cy} r={size * 0.24} />;
    case "rounded":
      return <rect key={keyPrefix} x={x} y={y} width={size} height={size} rx={size * 0.24} />;
    case "soft-rounded": {
      const next = inset(b, 0.9);
      return <rect key={keyPrefix} x={next.x} y={next.y} width={next.size} height={next.size} rx={size * 0.2} />;
    }
    case "extra-rounded":
      return <rect key={keyPrefix} x={x} y={y + size * 0.08} width={size} height={size * 0.84} rx={size * 0.42} />;
    case "classy":
      return index % 2 === 0 ? <path key={keyPrefix} d={octagonPath(b, size * 0.15)} /> : <rect key={keyPrefix} x={x} y={y} width={size} height={size} rx={size * 0.05} />;
    case "classy-rounded":
      return <path key={keyPrefix} d={roundedRectPath(inset(b, 0.96), index % 2 === 0 ? size * 0.28 : size * 0.08)} />;
    case "mosaic": {
      const next = inset(b, 0.92);
      const cut = size * 0.23;
      const right = next.x + next.size;
      const bottom = next.y + next.size;
      const d =
        index % 3 === 0
          ? `M ${next.x + cut} ${next.y} H ${right} V ${bottom - cut} L ${right - cut} ${bottom} H ${next.x} V ${next.y + cut} Z`
          : `M ${next.x} ${next.y} H ${right - cut} L ${right} ${next.y + cut} V ${bottom} H ${next.x + cut} L ${next.x} ${bottom - cut} Z`;
      return <path key={keyPrefix} d={d} />;
    }
    case "horizontal-bars": {
      const next = { x: x + size * 0.03, y: y + size * 0.27, width: size * 0.94, height: size * 0.46 };
      return <rect key={keyPrefix} x={next.x} y={next.y} width={next.width} height={next.height} rx={size * 0.22} />;
    }
    case "vertical-bars": {
      const next = { x: x + size * 0.27, y: y + size * 0.03, width: size * 0.46, height: size * 0.94 };
      return <rect key={keyPrefix} x={next.x} y={next.y} width={next.width} height={next.height} rx={size * 0.22} />;
    }
    case "bevel":
      return <path key={keyPrefix} d={octagonPath(inset(b, 0.92), size * 0.16)} />;
    case "cut-corners": {
      const next = inset(b, 0.9);
      const cut = size * 0.18;
      const right = next.x + next.size;
      const bottom = next.y + next.size;
      return <path key={keyPrefix} d={`M ${next.x + cut} ${next.y} H ${right} V ${bottom} H ${next.x} V ${next.y + cut} Z`} />;
    }
    case "diamond":
      return <path key={keyPrefix} d={diamondPath(inset(b, 0.86))} />;
    case "capsule": {
      const next = inset(b, 0.78);
      return <rect key={keyPrefix} x={next.x} y={next.y} width={next.size} height={next.size} rx={size * 0.24} />;
    }
    case "leaf": {
      const next = inset(b, 0.92);
      const right = next.x + next.size;
      const bottom = next.y + next.size;
      return <path key={keyPrefix} d={`M ${next.x} ${bottom} C ${next.x} ${next.y + size * 0.2} ${right - size * 0.1} ${next.y} ${right} ${next.y} C ${right} ${bottom - size * 0.2} ${next.x + size * 0.1} ${bottom} ${next.x} ${bottom} Z`} />;
    }
    case "spark":
      return <path key={keyPrefix} d={starPath(inset(b, 0.88), 0.34)} />;
    case "cross":
      return <path key={keyPrefix} d={plusPath(inset(b, 0.92), 0.38)} />;
    case "pixel-dots": {
      const r = size * 0.16;
      return [
        <circle key={`${keyPrefix}-a`} cx={x + size * 0.32} cy={y + size * 0.32} r={r} />,
        <circle key={`${keyPrefix}-b`} cx={x + size * 0.68} cy={y + size * 0.32} r={r} />,
        <circle key={`${keyPrefix}-c`} cx={x + size * 0.32} cy={y + size * 0.68} r={r} />,
        <circle key={`${keyPrefix}-d`} cx={x + size * 0.68} cy={y + size * 0.68} r={r} />,
      ];
    }
    case "diagonal": {
      const next = inset(b, 0.84);
      return <rect key={keyPrefix} x={next.x} y={next.y} width={next.size} height={next.size} rx={size * 0.1} transform={`rotate(-12 ${cx} ${cy})`} />;
    }
    case "orbit":
      return [
        <circle key={`${keyPrefix}-a`} cx={cx} cy={cy} r={size * 0.23} />,
        <circle key={`${keyPrefix}-b`} cx={cx - size * 0.24} cy={cy - size * 0.2} r={size * 0.16} />,
        <circle key={`${keyPrefix}-c`} cx={cx + size * 0.24} cy={cy + size * 0.2} r={size * 0.16} />,
      ];
    default:
      return <rect key={keyPrefix} x={x} y={y} width={size} height={size} rx={size * 0.04} />;
  }
};

const ringShape = (outer: string, inner: string, key: string) => <path key={key} d={`${outer} ${inner}`} fillRule="evenodd" clipRule="evenodd" />;

const roughOuter = (x: number, y: number, size: number, keyPrefix: string) => {
  const cell = size / 7;
  const shapes: JSX.Element[] = [];
  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      if (row > 0 && row < 6 && col > 0 && col < 6) continue;
      const jitter = (row + col) % 2 === 0 ? 0 : cell * 0.08;
      shapes.push(<rect key={`${keyPrefix}-${row}-${col}`} x={x + col * cell + jitter} y={y + row * cell} width={cell * 0.86} height={cell * 0.86} rx={cell * 0.05} />);
    }
  }
  return shapes;
};

const dottedOuter = (x: number, y: number, size: number, keyPrefix: string) => {
  const cell = size / 7;
  const shapes: JSX.Element[] = [];
  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      if (row > 0 && row < 6 && col > 0 && col < 6) continue;
      shapes.push(<circle key={`${keyPrefix}-${row}-${col}`} cx={x + cell * (col + 0.5)} cy={y + cell * (row + 0.5)} r={cell * 0.35} />);
    }
  }
  return shapes;
};

const bracketOuter = (x: number, y: number, size: number, keyPrefix: string) => {
  const t = size / 7;
  const l = size * 0.42;
  const r = size * 0.05;
  const right = x + size;
  const bottom = y + size;
  return [
    <rect key={`${keyPrefix}-a`} x={x} y={y} width={l} height={t} rx={r} />,
    <rect key={`${keyPrefix}-b`} x={x} y={y} width={t} height={l} rx={r} />,
    <rect key={`${keyPrefix}-c`} x={right - l} y={y} width={l} height={t} rx={r} />,
    <rect key={`${keyPrefix}-d`} x={right - t} y={y} width={t} height={l} rx={r} />,
    <rect key={`${keyPrefix}-e`} x={x} y={bottom - t} width={l} height={t} rx={r} />,
    <rect key={`${keyPrefix}-f`} x={x} y={bottom - l} width={t} height={l} rx={r} />,
    <rect key={`${keyPrefix}-g`} x={right - l} y={bottom - t} width={l} height={t} rx={r} />,
    <rect key={`${keyPrefix}-h`} x={right - t} y={bottom - l} width={t} height={l} rx={r} />,
  ];
};

const outerEyeShape = (style: QREyeOuterStyle, x: number, y: number, size: number, keyPrefix: string) => {
  const outer = { x, y, size };
  const insetSize = size / 7;
  const inner = { x: x + insetSize, y: y + insetSize, size: size - insetSize * 2 };

  switch (style) {
    case "dot":
      return ringShape(circlePath(outer), circlePath(inner), keyPrefix);
    case "dots":
      return dottedOuter(x, y, size, keyPrefix);
    case "rounded":
      return ringShape(roundedRectPath(outer, size * 0.14), roundedRectPath(inner, size * 0.06), keyPrefix);
    case "classy":
      return ringShape(octagonPath(outer, size * 0.08), roundedRectPath(inner, size * 0.02), keyPrefix);
    case "classy-rounded":
      return ringShape(roundedRectPath(outer, size * 0.24), octagonPath(inner, size * 0.08), keyPrefix);
    case "extra-rounded":
    case "frame-soft":
      return ringShape(roundedRectPath(outer, size * 0.2), roundedRectPath(inner, size * 0.1), keyPrefix);
    case "frame-thin": {
      const thinInner = { x: x + size * 0.19, y: y + size * 0.19, size: size - size * 0.38 };
      return ringShape(roundedRectPath(outer, size * 0.08), roundedRectPath(thinInner, size * 0.04), keyPrefix);
    }
    case "octagon":
      return ringShape(octagonPath(outer, size * 0.18), octagonPath(inner, size * 0.12), keyPrefix);
    case "bevel":
      return ringShape(octagonPath(outer, size * 0.11), octagonPath(inner, size * 0.06), keyPrefix);
    case "notch": {
      const cut = size * 0.11;
      const outerPath = `M ${x + cut} ${y} H ${x + size - cut} L ${x + size} ${y + cut} V ${y + size - cut} L ${x + size - cut} ${y + size} H ${x + cut} L ${x} ${y + size - cut} V ${y + cut} Z`;
      return ringShape(outerPath, roundedRectPath(inner, size * 0.04), keyPrefix);
    }
    case "bracket":
      return bracketOuter(x, y, size, keyPrefix);
    case "pill":
      return ringShape(roundedRectPath(outer, size * 0.28), roundedRectPath(inner, size * 0.18), keyPrefix);
    case "rough":
      return roughOuter(x, y, size, keyPrefix);
    default:
      return ringShape(roundedRectPath(outer, size * 0.02), roundedRectPath(inner, size * 0.02), keyPrefix);
  }
};

const innerEyeShape = (style: QREyeInnerStyle, x: number, y: number, size: number, keyPrefix: string) => {
  const b = { x, y, size };
  const cx = x + size / 2;
  const cy = y + size / 2;

  switch (style) {
    case "dot":
      return <circle key={keyPrefix} cx={cx} cy={cy} r={size * 0.5} />;
    case "dots": {
      const cell = size / 3;
      return Array.from({ length: 9 }, (_, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return <circle key={`${keyPrefix}-${index}`} cx={x + cell * (col + 0.5)} cy={y + cell * (row + 0.5)} r={cell * 0.29} />;
      });
    }
    case "rounded":
      return <rect key={keyPrefix} x={x} y={y} width={size} height={size} rx={size * 0.24} />;
    case "classy":
      return <path key={keyPrefix} d={octagonPath(b, size * 0.13)} />;
    case "classy-rounded":
      return <path key={keyPrefix} d={roundedRectPath(b, size * 0.28)} />;
    case "extra-rounded":
      return <rect key={keyPrefix} x={x} y={y} width={size} height={size} rx={size * 0.38} />;
    case "soft-square": {
      const next = inset(b, 0.86);
      return <rect key={keyPrefix} x={next.x} y={next.y} width={next.size} height={next.size} rx={size * 0.2} />;
    }
    case "tiny-square": {
      const next = inset(b, 0.62);
      return <rect key={keyPrefix} x={next.x} y={next.y} width={next.size} height={next.size} rx={size * 0.08} />;
    }
    case "octagon":
      return <path key={keyPrefix} d={octagonPath(inset(b, 0.86), size * 0.14)} />;
    case "diamond":
      return <path key={keyPrefix} d={diamondPath(inset(b, 0.82))} />;
    case "vertical-pills":
      return [-0.24, 0, 0.24].map((offset) => <rect key={`${keyPrefix}-${offset}`} x={cx + size * offset - size * 0.09} y={y + size * 0.11} width={size * 0.18} height={size * 0.78} rx={size * 0.09} />);
    case "horizontal-pills":
      return [-0.24, 0, 0.24].map((offset) => <rect key={`${keyPrefix}-${offset}`} x={x + size * 0.11} y={cy + size * offset - size * 0.09} width={size * 0.78} height={size * 0.18} rx={size * 0.09} />);
    case "flower":
      return [
        <circle key={`${keyPrefix}-a`} cx={cx} cy={cy} r={size * 0.2} />,
        <circle key={`${keyPrefix}-b`} cx={cx - size * 0.23} cy={cy} r={size * 0.16} />,
        <circle key={`${keyPrefix}-c`} cx={cx + size * 0.23} cy={cy} r={size * 0.16} />,
        <circle key={`${keyPrefix}-d`} cx={cx} cy={cy - size * 0.23} r={size * 0.16} />,
        <circle key={`${keyPrefix}-e`} cx={cx} cy={cy + size * 0.23} r={size * 0.16} />,
      ];
    case "circle-grid": {
      const cell = size / 3;
      return Array.from({ length: 9 }, (_, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return <circle key={`${keyPrefix}-${index}`} cx={x + cell * (col + 0.5)} cy={y + cell * (row + 0.5)} r={cell * 0.3} />;
      });
    }
    case "slash": {
      const next = { x: x + size * 0.31, y: y + size * 0.04, width: size * 0.38, height: size * 0.92 };
      return <rect key={keyPrefix} x={next.x} y={next.y} width={next.width} height={next.height} rx={size * 0.08} transform={`rotate(-45 ${cx} ${cy})`} />;
    }
    case "inset": {
      const next = inset(b, 0.7);
      return <rect key={keyPrefix} x={next.x} y={next.y} width={next.size} height={next.size} rx={size * 0.08} />;
    }
    case "burst":
      return <path key={keyPrefix} d={starPath(inset(b, 0.88), 0.36)} />;
    default:
      return <rect key={keyPrefix} x={x} y={y} width={size} height={size} rx={size * 0.04} />;
  }
};

function ModulePreview({ type }: { type: QRModuleStyle }) {
  return (
    <svg viewBox="0 0 82 58" aria-hidden="true" className="h-10 w-auto max-w-full text-current sm:h-11">
      <rect x="1" y="1" width="80" height="56" rx="7" className="fill-white" />
      <g fill="currentColor">{moduleCells.flatMap(([x, y], index) => moduleShape(type, x, y, 9, index, `${type}-${index}`))}</g>
    </svg>
  );
}

function EyePreview({
  outer,
  inner,
}: {
  outer?: QREyeOuterStyle;
  inner?: QREyeInnerStyle;
}) {
  const outerType = outer ?? "extra-rounded";
  const innerType = inner ?? "dot";
  const eyeSize = 36;
  const innerSize = (eyeSize * 3) / 7;
  const innerOffset = (eyeSize * 2) / 7;

  return (
    <svg viewBox="0 0 82 58" aria-hidden="true" className="h-10 w-auto max-w-full text-current sm:h-11">
      <rect x="1" y="1" width="80" height="56" rx="7" className="fill-white" />
      <g transform="translate(10 11)" fill="currentColor">
        {outerEyeShape(outerType, 0, 0, eyeSize, `${outerType}-outer`)}
        {innerEyeShape(innerType, innerOffset, innerOffset, innerSize, `${innerType}-inner`)}
      </g>
      <g transform="translate(55 32)" className="opacity-65" fill="currentColor">
        {moduleShape("rounded", 0, 0, 6, 0, "mini-a")}
        {moduleShape("dots", 13, 0, 6, 1, "mini-b")}
        {moduleShape("horizontal-bars", 4, 12, 14, 2, "mini-c")}
      </g>
    </svg>
  );
}

function VisualOptions<T extends string>({
  value,
  options,
  onChange,
  preview,
  columns,
  language,
}: {
  value: T;
  options: QRStyleOption<T>[];
  onChange: (value: T) => void;
  preview: (value: T) => JSX.Element;
  columns: string;
  language: AppLanguage;
}) {
  const isDe = language === "de";

  return (
    <div className={`grid ${columns} gap-2`}>
      {options.map((option) => {
        const active = option.value === value;
        const optionLabel = isDe ? option.labelDe : option.labelEn;
        const hint = isDe ? option.hintDe : option.hintEn;
        return (
          <button
            type="button"
            key={option.value}
            title={`${optionLabel} - ${hint}`}
            aria-label={`${optionLabel}: ${hint}`}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`type-card group relative overflow-hidden rounded-xl border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              active
                ? "border-blue-200 bg-gradient-to-br from-white to-blue-50/60 text-slate-900 shadow-[0_24px_52px_-32px_rgba(59,130,246,0.18)]"
                : "border-blue-100 bg-white text-slate-700 shadow-[0_10px_24px_-20px_rgba(59,130,246,0.08)] hover:border-blue-200 hover:bg-white hover:shadow-[0_20px_42px_-26px_rgba(59,130,246,0.16)]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-px ${
                active ? "bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100" : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50"
              }`}
            />
            <span
              className={`mb-2 flex h-16 items-center justify-center rounded-lg border p-1.5 transition ${
                active
                  ? "border-blue-100 bg-white text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]"
                  : "border-slate-100 bg-white text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:text-blue-700"
              }`}
            >
              {preview(option.value)}
            </span>
            <span className="block text-[15px] font-semibold tracking-normal">{optionLabel}</span>
            <span className="mt-1 block text-xs leading-5 text-slate-500">{hint}</span>
          </button>
        );
      })}
    </div>
  );
}

function AccordionSection<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  preview,
  columns,
  language,
  openSection,
  onToggle,
}: {
  id: ShapeSectionId;
  label: string;
  value: T;
  options: QRStyleOption<T>[];
  onChange: (value: T) => void;
  preview: (value: T) => JSX.Element;
  columns: string;
  language: AppLanguage;
  openSection: ShapeSectionId | null;
  onToggle: (section: ShapeSectionId) => void;
}) {
  const isDe = language === "de";
  const open = openSection === id;
  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = selectedOption ? (isDe ? selectedOption.labelDe : selectedOption.labelEn) : "";

  return (
    <div
      className={`overflow-hidden rounded-lg border shadow-sm transition ${
        open ? "border-blue-200 bg-gradient-to-br from-white to-blue-50/35 shadow-[0_18px_42px_-32px_rgba(59,130,246,0.14)]" : "border-blue-100 bg-white shadow-[0_10px_24px_-22px_rgba(59,130,246,0.08)]"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50/90 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            {label}
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-600">
              {options.length}
            </span>
          </span>
          <span className="mt-0.5 block truncate text-xs text-slate-500">
            {selectedOption ? `${isDe ? "Aktiv" : "Active"}: ${selectedLabel}` : isDe ? "Auswahl anzeigen" : "Show options"}
          </span>
        </span>
        {selectedOption ? (
          <span className="hidden max-w-[38%] truncate rounded-full bg-blue-50/90 px-2.5 py-1 text-xs font-bold text-blue-800 ring-1 ring-blue-100 sm:inline-flex">
            {selectedLabel}
          </span>
        ) : null}
        <HiOutlineChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-slate-500 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="border-t border-blue-100 bg-gradient-to-b from-blue-50/35 to-white p-3 sm:p-4">
          <VisualOptions
            value={value}
            options={options}
            onChange={onChange}
            preview={preview}
            columns={columns}
            language={language}
          />
        </div>
      ) : null}
    </div>
  );
}

export function ShapeSelector({ language, design, onChange }: ShapeSelectorProps) {
  const isDe = language === "de";
  const [openSection, setOpenSection] = useState<ShapeSectionId | null>("module");

  const toggleSection = (section: ShapeSectionId) => {
    setOpenSection((current) => (current === section ? null : section));
  };

  return (
    <div className="grid gap-2">
      <AccordionSection
        id="module"
        label={isDe ? "QR-Modul-Form" : "QR Module Shape"}
        value={design.moduleStyle}
        options={moduleStyleOptions}
        onChange={(moduleStyle) => onChange({ ...design, moduleStyle })}
        preview={(moduleStyle) => <ModulePreview type={moduleStyle} />}
        columns="grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        language={language}
        openSection={openSection}
        onToggle={toggleSection}
      />

      <AccordionSection
        id="outer"
        label={isDe ? "Eckform außen" : "Outer Eye Shape"}
        value={design.eyeOuterStyle}
        options={eyeOuterStyleOptions}
        onChange={(eyeOuterStyle) => onChange({ ...design, eyeOuterStyle })}
        preview={(eyeOuterStyle) => <EyePreview outer={eyeOuterStyle} inner={design.eyeInnerStyle} />}
        columns="grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4"
        language={language}
        openSection={openSection}
        onToggle={toggleSection}
      />

      <AccordionSection
        id="inner"
        label={isDe ? "Eckform innen" : "Inner Eye Shape"}
        value={design.eyeInnerStyle}
        options={eyeInnerStyleOptions}
        onChange={(eyeInnerStyle) => onChange({ ...design, eyeInnerStyle })}
        preview={(eyeInnerStyle) => <EyePreview outer={design.eyeOuterStyle} inner={eyeInnerStyle} />}
        columns="grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4"
        language={language}
        openSection={openSection}
        onToggle={toggleSection}
      />
    </div>
  );
}
