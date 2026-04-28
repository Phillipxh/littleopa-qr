import { TextArea } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function TextForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-2">
      <TextArea
        label={isDe ? "Freier Text" : "Free Text"}
        value={data.text}
        onChange={(value) => update("text", value)}
        rows={7}
        placeholder={isDe ? "Text eingeben" : "Enter text"}
      />
      <p className="text-right text-xs text-slate-500 dark:text-slate-400">
        {data.text.length} {isDe ? "Zeichen" : "characters"}
      </p>
    </div>
  );
}
