import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function WhatsappForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput
        label="WhatsApp-Telefonnummer"
        value={data.whatsappPhone}
        onChange={(value) => update("whatsappPhone", value)}
        placeholder="+49 170 1234567"
        type="tel"
      />
      <TextArea label="Startnachricht" value={data.whatsappMessage} onChange={(value) => update("whatsappMessage", value)} rows={4} />
    </div>
  );
}
