import { TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function PhoneForm({ data, update }: QRFormProps) {
  return (
    <TextInput
      label="Telefonnummer"
      value={data.phone}
      onChange={(value) => update("phone", value)}
      placeholder="+49 30 12345678"
      type="tel"
    />
  );
}
