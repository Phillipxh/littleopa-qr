import { TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function PhoneForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <TextInput
      label={isDe ? "Telefonnummer" : "Phone Number"}
      value={data.phone}
      onChange={(value) => update("phone", value)}
      placeholder="+49 30 12345678"
      type="tel"
    />
  );
}
