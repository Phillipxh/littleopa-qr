import { useEffect, useState, type ReactNode } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, hint, children }: FieldProps) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-slate-200 bg-white/92 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950/72 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500";

export const selectClass =
  "w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 shadow-sm outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950/72 dark:text-slate-100 dark:hover:border-slate-600 dark:focus:border-blue-500";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}

export function TextInput({ label, value, onChange, placeholder, type = "text", hint }: TextInputProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <input
        id={id}
        className={inputClass}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  hint?: string;
}

export function TextArea({ label, value, onChange, rows = 4, placeholder, hint }: TextAreaProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <textarea
        id={id}
        className={`${inputClass} resize-y`}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}

interface SwitchFieldProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  hint?: string;
}

export function SwitchField({ label, checked, onChange, hint }: SwitchFieldProps) {
  return (
    <label className="premium-button flex items-start gap-3 rounded-md border border-slate-200 bg-white/72 p-3 shadow-sm hover:border-blue-200 hover:bg-blue-50/50 dark:border-slate-800 dark:bg-slate-950/55 dark:hover:border-blue-900/80 dark:hover:bg-blue-950/20">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
      />
      <span>
        <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
        {hint ? <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{hint}</span> : null}
      </span>
    </label>
  );
}

interface SelectFieldProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  hint?: string;
}

export function SelectField<T extends string>({ label, value, options, onChange, hint }: SelectFieldProps<T>) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <span className="relative block">
        <select id={id} className={selectClass} value={value} onChange={(event) => onChange(event.target.value as T)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-400">
          <HiOutlineChevronDown aria-hidden="true" className="h-4 w-4" />
        </span>
      </span>
    </Field>
  );
}

interface RangeFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  hint?: string;
}

const getStepPrecision = (step: number): number => {
  const value = String(step);
  if (!value.includes(".")) return 0;
  return value.split(".")[1]?.length ?? 0;
};

const clampValue = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const snapToStep = (value: number, min: number, step: number): number => {
  const precision = getStepPrecision(step);
  const snapped = min + Math.round((value - min) / step) * step;
  return Number(snapped.toFixed(precision));
};

const formatRangeValue = (value: number, step: number): string => {
  const precision = getStepPrecision(step);
  return Number(value.toFixed(precision)).toString();
};

export function RangeField({ label, value, min, max, step = 1, unit = "", onChange, hint }: RangeFieldProps) {
  const [inputValue, setInputValue] = useState(() => formatRangeValue(value, step));
  const trimmedUnit = unit.trim();

  useEffect(() => {
    setInputValue(formatRangeValue(value, step));
  }, [step, value]);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-xs font-bold text-blue-800 ring-1 ring-blue-100 dark:border-blue-900/80 dark:bg-blue-950/45 dark:text-blue-100 dark:ring-blue-900/80">
          <input
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={step}
            value={inputValue}
            onChange={(event) => {
              const nextValue = event.target.value.replace(",", ".");
              setInputValue(nextValue);
              if (nextValue === "") return;
              const parsed = Number(nextValue);
              if (!Number.isFinite(parsed)) return;
              onChange(clampValue(parsed, min, max));
            }}
            onBlur={() => {
              if (inputValue === "") {
                setInputValue(formatRangeValue(value, step));
                return;
              }
              const parsed = Number(inputValue);
              if (!Number.isFinite(parsed)) {
                setInputValue(formatRangeValue(value, step));
                return;
              }
              const normalized = snapToStep(clampValue(parsed, min, max), min, step);
              onChange(normalized);
              setInputValue(formatRangeValue(normalized, step));
            }}
            className="w-14 border-0 bg-transparent p-0 text-right text-xs font-bold text-blue-800 outline-none [appearance:textfield] placeholder:text-blue-400 focus:ring-0 dark:text-blue-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            aria-label={label}
          />
          {trimmedUnit ? <span>{trimmedUnit}</span> : null}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-blue-600"
      />
      {hint ? <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{hint}</p> : null}
    </div>
  );
}
