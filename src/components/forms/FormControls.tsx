import type { ReactNode } from "react";

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
  "w-full rounded-md border border-slate-200 bg-white/92 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950/72 dark:text-slate-100 dark:hover:border-slate-600 dark:focus:border-blue-500";

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
      <select id={id} className={selectClass} value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export function RangeField({ label, value, min, max, step = 1, unit = "", onChange, hint }: RangeFieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</span>
        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-800 ring-1 ring-blue-100 dark:bg-blue-950/45 dark:text-blue-100 dark:ring-blue-900/80">
          {value}
          {unit}
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
