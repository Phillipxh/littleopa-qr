import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function EmailForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput label="Empfänger" value={data.emailTo} onChange={(value) => update("emailTo", value)} type="email" placeholder="kontakt@example.com" />
      <TextInput label="Betreff" value={data.emailSubject} onChange={(value) => update("emailSubject", value)} placeholder="Ihre Anfrage" />
      <TextArea label="Nachricht" value={data.emailMessage} onChange={(value) => update("emailMessage", value)} rows={5} />
    </div>
  );
}
