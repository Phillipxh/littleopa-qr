import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function WhatsappForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <TextInput
        label={isDe ? "WhatsApp-Telefonnummer" : "WhatsApp Phone Number"}
        value={data.whatsappPhone}
        onChange={(value) => update("whatsappPhone", value)}
        placeholder="+49 170 1234567"
        type="tel"
      />
      <TextArea label={isDe ? "Startnachricht" : "Prefilled Message"} value={data.whatsappMessage} onChange={(value) => update("whatsappMessage", value)} rows={4} />
    </div>
  );
}
