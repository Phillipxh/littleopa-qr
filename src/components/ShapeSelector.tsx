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
  { value: "rounded", label: "Rounded", hint: "friendly" },
  { value: "extra-rounded", label: "Extra Rounded", hint: "premium" },
];

const innerOptions: { value: QREyeInnerStyle; label: string; hint: string }[] = [
  { value: "square", label: "Square", hint: "precise" },
  { value: "dot", label: "Dot", hint: "soft" },
  { value: "rounded", label: "Rounded", hint: "balanced" },
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
  if (type === "rounded") return <rect x={x} y={y} width={size} height={size} rx={size * 0.24} />;
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
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800 ring-1 ring-teal-100 dark:bg-teal-950/45 dark:text-teal-100 dark:ring-teal-900/80">
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
              className={`type-card group min-h-[124px] rounded-lg border p-2.5 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                active
                  ? "border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 text-teal-950 shadow-sm dark:border-teal-400 dark:from-teal-950/50 dark:to-blue-950/35 dark:text-teal-50"
                  : "border-slate-200 bg-white/82 text-slate-700 hover:border-teal-200 hover:bg-white dark:border-slate-800 dark:bg-slate-950/58 dark:text-slate-200 dark:hover:border-teal-800"
              }`}
            >
              <span
                className={`mb-2 flex rounded-md border p-1 transition ${
                  active
                    ? "border-teal-200 bg-white/74 text-teal-800 dark:border-teal-800 dark:bg-slate-950/35 dark:text-teal-100"
                    : "border-slate-100 bg-slate-50/85 text-slate-600 group-hover:text-teal-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
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
        { value: "rounded", label: "Rund", hint: "freundlich" },
        { value: "extra-rounded", label: "Extra rund", hint: "premium" },
      ]
    : outerOptions;
  const innerOptionsLocalized: { value: QREyeInnerStyle; label: string; hint: string }[] = isDe
    ? [
        { value: "square", label: "Quadrat", hint: "präzise" },
        { value: "dot", label: "Punkt", hint: "weich" },
        { value: "rounded", label: "Rund", hint: "balanciert" },
      ]
    : innerOptions;

  return (
    <div className="grid gap-5">
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
