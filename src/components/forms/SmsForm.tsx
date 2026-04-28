import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function SmsForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput label="Telefonnummer" value={data.smsPhone} onChange={(value) => update("smsPhone", value)} placeholder="+49 30 12345678" type="tel" />
      <TextArea label="Nachricht" value={data.smsMessage} onChange={(value) => update("smsMessage", value)} rows={4} />
    </div>
  );
}
