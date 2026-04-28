import type { AppLanguage, QRDesignOptions, QREyeInnerStyle, QREyeOuterStyle, QRModuleStyle } from "../types";

interface ShapeSelectorProps {
  language: AppLanguage;
  design: QRDesignOptions;
  onChange: (design: QRDesignOptions) => void;
}

const moduleOptions: { value: QRModuleStyle; label: string; hint: string }[] = [
  { value: "square", label: "Square", hint: "clean edges" },
  { value: "dots", label: "Dots", hint: "soft and modern" },
  { value: "rounded", label: "Rounded", hint: "smooth modules" },
  { value: "classy", label: "Classy", hint: "technical look" },
  { value: "classy-rounded", label: "Classy Rounded", hint: "sharp + soft" },
  { value: "extra-rounded", label: "Extra Rounded", hint: "very organic" },
];

const outerOptions: { value: QREyeOuterStyle; label: string; hint: string }[] = [
  { value: "square", label: "Square", hint: "maximum robustness" },
  { value: "dot", label: "Dot", hint: "compact" },
  { value: "dots", label: "Micro Dots", hint: "organic dots" },
  { value: "rounded", label: "Rounded", hint: "friendly" },
  { value: "classy", label: "Classy", hint: "premium contour" },
  { value: "classy-rounded", label: "Classy Rounded", hint: "flowing premium" },
  { value: "extra-rounded", label: "Extra Rounded", hint: "premium" },
];

const innerOptions: { value: QREyeInnerStyle; label: string; hint: string }[] = [
  { value: "square", label: "Square", hint: "precise" },
  { value: "dot", label: "Dot", hint: "soft" },
  { value: "dots", label: "Micro Dots", hint: "lightweight" },
  { value: "rounded", label: "Rounded", hint: "balanced" },
  { value: "classy", label: "Classy", hint: "edge focus" },
  { value: "classy-rounded", label: "Classy Rounded", hint: "smooth contrast" },
  { value: "extra-rounded", label: "Extra Rounded", hint: "organic" },
];

interface ShapePreset {
  id: string;
  labelEn: string;
  labelDe: string;
  hintEn: string;
  hintDe: string;
  module: QRModuleStyle;
  outer: QREyeOuterStyle;
  inner: QREyeInnerStyle;
}

const shapePresets: ShapePreset[] = [
  { id: "bold-square", labelEn: "Bold Square", labelDe: "Bold Quadrat", hintEn: "high scan stability", hintDe: "hohe Scan-Stabilität", module: "square", outer: "square", inner: "square" },
  { id: "dot-soft", labelEn: "Dot Soft", labelDe: "Dot Soft", hintEn: "soft modern look", hintDe: "weicher moderner Look", module: "dots", outer: "dot", inner: "dot" },
  { id: "flow-rounded", labelEn: "Flow Rounded", labelDe: "Flow Rund", hintEn: "balanced daily use", hintDe: "ausbalanciert für Alltag", module: "rounded", outer: "rounded", inner: "dot" },
  { id: "classy-pro", labelEn: "Classy Pro", labelDe: "Classy Pro", hintEn: "tech premium style", hintDe: "technisch-premium Stil", module: "classy", outer: "classy", inner: "square" },
  { id: "classy-soft", labelEn: "Classy Soft", labelDe: "Classy Soft", hintEn: "sharp + rounded", hintDe: "markant + rund", module: "classy-rounded", outer: "classy-rounded", inner: "rounded" },
  { id: "organic-plus", labelEn: "Organic Plus", labelDe: "Organic Plus", hintEn: "organic and friendly", hintDe: "organisch und freundlich", module: "extra-rounded", outer: "extra-rounded", inner: "dot" },
  { id: "micro-corners", labelEn: "Micro Corners", labelDe: "Mikro-Ecken", hintEn: "small eye emphasis", hintDe: "fokussierte kleine Augen", module: "rounded", outer: "dots", inner: "dots" },
  { id: "matrix", labelEn: "Matrix", labelDe: "Matrix", hintEn: "strong square matrix", hintDe: "starke Matrix-Optik", module: "square", outer: "classy", inner: "dot" },
  { id: "neo-balance", labelEn: "Neo Balance", labelDe: "Neo Balance", hintEn: "modern balanced style", hintDe: "modern ausbalanciert", module: "classy-rounded", outer: "rounded", inner: "classy-rounded" },
  { id: "precision", labelEn: "Precision", labelDe: "Präzision", hintEn: "clean enterprise look", hintDe: "klarer Enterprise-Look", module: "square", outer: "rounded", inner: "square" },
  { id: "punch-dot", labelEn: "Punch Dot", labelDe: "Punch Dot", hintEn: "bold center points", hintDe: "kräftige Innenpunkte", module: "classy", outer: "square", inner: "dot" },
  { id: "aero", labelEn: "Aero", labelDe: "Aero", hintEn: "light and dynamic", hintDe: "leicht und dynamisch", module: "dots", outer: "classy-rounded", inner: "extra-rounded" },
];

const moduleCells = [
  [4, 4],
  [18, 4],
  [32, 4],
  [60, 4],
  [4, 18],
  [18, 18],
  [46, 18],
  [60, 18],
  [74, 18],
  [18, 32],
  [32, 32],
  [46, 32],
  [74, 32],
] as const;

function ModulePreview({ type }: { type: QRModuleStyle }) {
  const draw = (x: number, y: number, index: number) => {
    if (type === "dots") return <circle key={`${x}-${y}`} cx={x + 5} cy={y + 5} r="5" />;
    if (type === "extra-rounded") return <rect key={`${x}-${y}`} x={x} y={y} width="12" height="10" rx="5" />;
    if (type === "rounded" || type === "classy-rounded") return <rect key={`${x}-${y}`} x={x} y={y} width="10" height="10" rx={type === "rounded" ? 3 : 4.5} />;
    if (type === "classy") {
      const rounded = index % 2 === 0;
      return <rect key={`${x}-${y}`} x={x} y={y} width="10" height="10" rx={rounded ? 3 : 0.5} transform={rounded ? undefined : `rotate(0 ${x + 5} ${y + 5})`} />;
    }
    return <rect key={`${x}-${y}`} x={x} y={y} width="10" height="10" rx="0.5" />;
  };

  return (
    <svg viewBox="0 0 88 48" aria-hidden="true" className="h-14 w-full text-current">
      <rect x="1" y="1" width="86" height="46" rx="8" className="fill-white/65 dark:fill-slate-950/35" />
      <g fill="currentColor">{moduleCells.map(([x, y], index) => draw(x, y, index))}</g>
    </svg>
  );
}

function EyeShape({ x, y, size, type }: { x: number; y: number; size: number; type: QREyeOuterStyle | QREyeInnerStyle }) {
  if (type === "dot") return <circle cx={x + size / 2} cy={y + size / 2} r={size / 2} />;
  if (type === "dots") {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const ringRadius = size * 0.32;
    const dotRadius = Math.max(1.5, size * 0.09);
    const points = Array.from({ length: 8 }, (_, index) => {
      const angle = (Math.PI * 2 * index) / 8;
      return [centerX + Math.cos(angle) * ringRadius, centerY + Math.sin(angle) * ringRadius] as const;
    });

    return (
      <g>
        {points.map(([dotX, dotY], index) => (
          <circle key={`${type}-${index}`} cx={dotX} cy={dotY} r={dotRadius} />
        ))}
      </g>
    );
  }
  if (type === "rounded") return <rect x={x} y={y} width={size} height={size} rx={size * 0.24} />;
  if (type === "classy") return <rect x={x} y={y} width={size} height={size} rx={size * 0.15} transform={`rotate(-8 ${x + size / 2} ${y + size / 2})`} />;
  if (type === "classy-rounded") return <rect x={x} y={y} width={size} height={size} rx={size * 0.34} transform={`rotate(-7 ${x + size / 2} ${y + size / 2})`} />;
  if (type === "extra-rounded") return <rect x={x} y={y} width={size} height={size} rx={size * 0.38} />;
  return <rect x={x} y={y} width={size} height={size} rx={size * 0.08} />;
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

  return (
    <svg viewBox="0 0 88 48" aria-hidden="true" className="h-14 w-full text-current">
      <rect x="1" y="1" width="86" height="46" rx="8" className="fill-white/65 dark:fill-slate-950/35" />
      <g transform="translate(16 4)">
        <g fill="currentColor">
          <EyeShape x={0} y={0} size={40} type={outerType} />
        </g>
        <g className="fill-white dark:fill-slate-950">
          <EyeShape x={9} y={9} size={22} type={outerType} />
        </g>
        <g fill="currentColor">
          <EyeShape x={15} y={15} size={10} type={innerType} />
        </g>
      </g>
      <g transform="translate(58 28)" className="opacity-70">
        <rect x="0" y="0" width="6" height="6" rx="1" fill="currentColor" />
        <circle cx="15" cy="4" r="4" fill="currentColor" />
        <rect x="6" y="12" width="12" height="6" rx="3" fill="currentColor" />
      </g>
    </svg>
  );
}

function FullPresetPreview({ moduleStyle, outerStyle, innerStyle }: { moduleStyle: QRModuleStyle; outerStyle: QREyeOuterStyle; innerStyle: QREyeInnerStyle }) {
  const miniCells = [
    [0, 0],
    [8, 0],
    [16, 0],
    [0, 8],
    [16, 8],
    [24, 8],
    [8, 16],
    [24, 16],
    [0, 24],
    [8, 24],
    [16, 24],
    [24, 24],
  ] as const;

  const drawCell = (x: number, y: number, index: number) => {
    const px = 34 + x;
    const py = 34 + y;
    if (moduleStyle === "dots") return <circle key={`m-${x}-${y}`} cx={px + 3} cy={py + 3} r="2.8" />;
    if (moduleStyle === "extra-rounded") return <rect key={`m-${x}-${y}`} x={px} y={py} width="7" height="6" rx="3.2" />;
    if (moduleStyle === "rounded" || moduleStyle === "classy-rounded") return <rect key={`m-${x}-${y}`} x={px} y={py} width="6" height="6" rx={moduleStyle === "rounded" ? 2 : 2.6} />;
    if (moduleStyle === "classy") {
      const rounded = index % 2 === 0;
      return <rect key={`m-${x}-${y}`} x={px} y={py} width="6" height="6" rx={rounded ? 2 : 0.8} />;
    }
    return <rect key={`m-${x}-${y}`} x={px} y={py} width="6" height="6" rx="0.6" />;
  };

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className="h-20 w-full text-current">
      <rect x="1" y="1" width="94" height="94" rx="12" className="fill-white/80 dark:fill-slate-950/45" />
      <g transform="translate(8 8)" fill="currentColor">
        <EyeShape x={0} y={0} size={24} type={outerStyle} />
      </g>
      <g transform="translate(8 8)" className="fill-white dark:fill-slate-950">
        <EyeShape x={5} y={5} size={14} type={outerStyle} />
      </g>
      <g transform="translate(8 8)" fill="currentColor">
        <EyeShape x={9} y={9} size={6} type={innerStyle} />
      </g>

      <g transform="translate(64 8)" fill="currentColor">
        <EyeShape x={0} y={0} size={24} type={outerStyle} />
      </g>
      <g transform="translate(64 8)" className="fill-white dark:fill-slate-950">
        <EyeShape x={5} y={5} size={14} type={outerStyle} />
      </g>
      <g transform="translate(64 8)" fill="currentColor">
        <EyeShape x={9} y={9} size={6} type={innerStyle} />
      </g>

      <g transform="translate(8 64)" fill="currentColor">
        <EyeShape x={0} y={0} size={24} type={outerStyle} />
      </g>
      <g transform="translate(8 64)" className="fill-white dark:fill-slate-950">
        <EyeShape x={5} y={5} size={14} type={outerStyle} />
      </g>
      <g transform="translate(8 64)" fill="currentColor">
        <EyeShape x={9} y={9} size={6} type={innerStyle} />
      </g>

      <g fill="currentColor" className="opacity-95">
        {miniCells.map(([x, y], index) => drawCell(x, y, index))}
      </g>
    </svg>
  );
}

function VisualOptions<T extends string>({
  label,
  value,
  options,
  onChange,
  preview,
}: {
  label: string;
  value: T;
  options: { value: T; label: string; hint: string }[];
  onChange: (value: T) => void;
  preview: (value: T) => JSX.Element;
}) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</p>
        {selectedOption ? (
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-800 ring-1 ring-blue-100 dark:bg-blue-950/45 dark:text-blue-100 dark:ring-blue-900/80">
            {selectedOption.label}
          </span>
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              type="button"
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`type-card group min-h-[124px] rounded-lg border p-2.5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                active
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-950 shadow-sm dark:border-blue-400 dark:from-blue-950/50 dark:to-cyan-950/35 dark:text-blue-50"
                  : "border-slate-200 bg-white/82 text-slate-700 hover:border-blue-200 hover:bg-white dark:border-slate-800 dark:bg-slate-950/58 dark:text-slate-200 dark:hover:border-blue-800"
              }`}
            >
              <span
                className={`mb-2 flex rounded-md border p-1 transition ${
                  active
                    ? "border-blue-200 bg-white/74 text-blue-800 dark:border-blue-800 dark:bg-slate-950/35 dark:text-blue-100"
                    : "border-slate-100 bg-slate-50/85 text-slate-600 group-hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
                }`}
              >
                {preview(option.value)}
              </span>
              <span className="block text-sm font-semibold">{option.label}</span>
              <span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">{option.hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ShapeSelector({ language, design, onChange }: ShapeSelectorProps) {
  const isDe = language === "de";
  const moduleOptionsLocalized: { value: QRModuleStyle; label: string; hint: string }[] = isDe
    ? [
        { value: "square", label: "Quadratisch", hint: "klare Kanten" },
        { value: "dots", label: "Punkte", hint: "weich und modern" },
        { value: "rounded", label: "Abgerundet", hint: "sanfte Module" },
        { value: "classy", label: "Klassisch", hint: "technisch markant" },
        { value: "classy-rounded", label: "Klassisch rund", hint: "markant + weich" },
        { value: "extra-rounded", label: "Extra-rounded", hint: "sehr organisch" },
      ]
    : moduleOptions;
  const outerOptionsLocalized: { value: QREyeOuterStyle; label: string; hint: string }[] = isDe
    ? [
        { value: "square", label: "Quadrat", hint: "maximal robust" },
        { value: "dot", label: "Punkt", hint: "kompakt" },
        { value: "dots", label: "Micro-Punkte", hint: "organischer Look" },
        { value: "rounded", label: "Rund", hint: "freundlich" },
        { value: "classy", label: "Klassisch", hint: "premium Kontur" },
        { value: "classy-rounded", label: "Klassisch rund", hint: "weich + premium" },
        { value: "extra-rounded", label: "Extra rund", hint: "premium" },
      ]
    : outerOptions;
  const innerOptionsLocalized: { value: QREyeInnerStyle; label: string; hint: string }[] = isDe
    ? [
        { value: "square", label: "Quadrat", hint: "präzise" },
        { value: "dot", label: "Punkt", hint: "weich" },
        { value: "dots", label: "Micro-Punkte", hint: "leicht" },
        { value: "rounded", label: "Rund", hint: "balanciert" },
        { value: "classy", label: "Klassisch", hint: "markant" },
        { value: "classy-rounded", label: "Klassisch rund", hint: "fließend" },
        { value: "extra-rounded", label: "Extra rund", hint: "organisch" },
      ]
    : innerOptions;
  const selectedPresetId = shapePresets.find(
    (preset) =>
      preset.module === design.moduleStyle &&
      preset.outer === design.eyeOuterStyle &&
      preset.inner === design.eyeInnerStyle,
  )?.id;

  return (
    <div className="grid gap-5">
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{isDe ? "Shape-Designs" : "Shape Designs"}</p>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/45 dark:text-blue-100 dark:ring-blue-900/80">
            {isDe ? "Vorschau-Presets" : "Preview Presets"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
          {shapePresets.map((preset) => {
            const active = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...design,
                    moduleStyle: preset.module,
                    eyeOuterStyle: preset.outer,
                    eyeInnerStyle: preset.inner,
                  })
                }
                className={`type-card group rounded-lg border p-2.5 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  active
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-950 shadow-sm dark:border-blue-400 dark:from-blue-950/55 dark:to-cyan-950/35 dark:text-blue-50"
                    : "border-slate-200 bg-white/88 text-slate-700 hover:border-blue-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/86 dark:text-slate-200 dark:hover:border-blue-800"
                }`}
              >
                <span
                  className={`mb-2 flex rounded-md border p-1 ${
                    active
                      ? "border-blue-200 bg-white/74 text-blue-700 dark:border-blue-800 dark:bg-slate-950/35 dark:text-blue-100"
                      : "border-slate-100 bg-slate-50/85 text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
                  }`}
                >
                  <FullPresetPreview moduleStyle={preset.module} outerStyle={preset.outer} innerStyle={preset.inner} />
                </span>
                <span className="block truncate text-sm font-semibold">{isDe ? preset.labelDe : preset.labelEn}</span>
                <span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">{isDe ? preset.hintDe : preset.hintEn}</span>
              </button>
            );
          })}
        </div>
      </div>
      <VisualOptions
        label={isDe ? "QR-Modul-Form" : "QR Module Shape"}
        value={design.moduleStyle}
        options={moduleOptionsLocalized}
        onChange={(moduleStyle) => onChange({ ...design, moduleStyle })}
        preview={(moduleStyle) => <ModulePreview type={moduleStyle} />}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <VisualOptions
          label={isDe ? "Eckform außen" : "Outer Eye Shape"}
          value={design.eyeOuterStyle}
          options={outerOptionsLocalized}
          onChange={(eyeOuterStyle) => onChange({ ...design, eyeOuterStyle })}
          preview={(eyeOuterStyle) => <EyePreview outer={eyeOuterStyle} inner={design.eyeInnerStyle} />}
        />
        <VisualOptions
          label={isDe ? "Eckform innen" : "Inner Eye Shape"}
          value={design.eyeInnerStyle}
          options={innerOptionsLocalized}
          onChange={(eyeInnerStyle) => onChange({ ...design, eyeInnerStyle })}
          preview={(eyeInnerStyle) => <EyePreview outer={design.eyeOuterStyle} inner={eyeInnerStyle} />}
        />
      </div>
    </div>
  );
}
