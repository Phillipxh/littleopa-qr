import { TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function FileLinkForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <TextInput label={isDe ? "Datei-URL" : "File URL"} value={data.fileUrl} onChange={(value) => update("fileUrl", value)} placeholder={isDe ? "https://example.com/datei.pdf" : "https://example.com/file.pdf"} type="url" />
      <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
        {isDe ? "Es werden keine PDFs oder Dateien hochgeladen. Der QR-Code enthält nur den Link." : "No PDFs or files are uploaded. The QR code contains only the link."}
      </p>
    </div>
  );
}
