import { TextArea } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function TextForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-2">
      <TextArea
        label="Freier Text"
        value={data.text}
        onChange={(value) => update("text", value)}
        rows={7}
        placeholder="Text eingeben"
      />
      <p className="text-right text-xs text-slate-500 dark:text-slate-400">{data.text.length} Zeichen</p>
    </div>
  );
}
