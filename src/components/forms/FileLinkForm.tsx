import { TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function FileLinkForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput label="Datei-URL" value={data.fileUrl} onChange={(value) => update("fileUrl", value)} placeholder="https://example.com/datei.pdf" type="url" />
      <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
        Es werden keine PDFs oder Dateien hochgeladen. Der QR-Code enthält nur den Link.
      </p>
    </div>
  );
}
