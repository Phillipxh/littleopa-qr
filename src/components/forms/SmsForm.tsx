import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function SmsForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <TextInput label={isDe ? "Telefonnummer" : "Phone Number"} value={data.smsPhone} onChange={(value) => update("smsPhone", value)} placeholder="+49 30 12345678" type="tel" />
      <TextArea label={isDe ? "Nachricht" : "Message"} value={data.smsMessage} onChange={(value) => update("smsMessage", value)} rows={4} />
    </div>
  );
}
