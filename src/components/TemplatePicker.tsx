import { getTemplates } from "../data/templates";
import type { AppLanguage, QRDesignOptions } from "../types";

interface TemplatePickerProps {
  language: AppLanguage;
  onApply: (design: QRDesignOptions) => void;
}

export function TemplatePicker({ language, onApply }: TemplatePickerProps) {
  const templates = getTemplates(language);
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() => onApply(template.design)}
          className="type-card group rounded-lg border border-slate-200 bg-white/82 p-3 text-left shadow-sm hover:border-teal-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-800 dark:bg-slate-950/65 dark:hover:border-teal-500"
        >
          <span className="mb-3 flex items-center gap-2">
            <span
              className="h-8 w-8 rounded-md border border-slate-200 dark:border-slate-700"
              style={{
                background: template.design.gradient.enabled
                  ? `${template.design.gradient.type === "linear" ? "linear-gradient" : "radial-gradient"}(${
                      template.design.gradient.type === "linear" ? `${template.design.gradient.rotation}deg, ` : ""
                    }${template.design.gradient.startColor}, ${template.design.gradient.endColor})`
                  : template.design.foregroundColor,
              }}
            />
            <span className="h-8 w-8 rounded-md border border-slate-200 dark:border-slate-700" style={{ background: template.design.backgroundColor }} />
            <span className="h-8 w-8 rounded-md border border-slate-200 dark:border-slate-700" style={{ background: template.design.eyeColor }} />
          </span>
          <span className="block text-sm font-semibold text-slate-900 dark:text-white">{template.name}</span>
          <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{template.description}</span>
        </button>
      ))}
    </div>
  );
}
