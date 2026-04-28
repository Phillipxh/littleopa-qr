import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function EmailForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <TextInput label={isDe ? "Empfänger" : "Recipient"} value={data.emailTo} onChange={(value) => update("emailTo", value)} type="email" placeholder="contact@example.com" />
      <TextInput label={isDe ? "Betreff" : "Subject"} value={data.emailSubject} onChange={(value) => update("emailSubject", value)} placeholder={isDe ? "Ihre Anfrage" : "Your request"} />
      <TextArea label={isDe ? "Nachricht" : "Message"} value={data.emailMessage} onChange={(value) => update("emailMessage", value)} rows={5} />
    </div>
  );
}
