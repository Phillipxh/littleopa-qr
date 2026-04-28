import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function VCardForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Vorname" value={data.vcardFirstName} onChange={(value) => update("vcardFirstName", value)} />
        <TextInput label="Nachname" value={data.vcardLastName} onChange={(value) => update("vcardLastName", value)} />
        <TextInput label="Organisation" value={data.vcardOrganization} onChange={(value) => update("vcardOrganization", value)} />
        <TextInput label="Position" value={data.vcardPosition} onChange={(value) => update("vcardPosition", value)} />
        <TextInput label="Telefon" value={data.vcardPhone} onChange={(value) => update("vcardPhone", value)} type="tel" />
        <TextInput label="Mobilnummer" value={data.vcardMobile} onChange={(value) => update("vcardMobile", value)} type="tel" />
        <TextInput label="E-Mail" value={data.vcardEmail} onChange={(value) => update("vcardEmail", value)} type="email" />
        <TextInput label="Website" value={data.vcardWebsite} onChange={(value) => update("vcardWebsite", value)} type="url" />
        <TextInput label="Straße" value={data.vcardStreet} onChange={(value) => update("vcardStreet", value)} />
        <TextInput label="PLZ" value={data.vcardPostalCode} onChange={(value) => update("vcardPostalCode", value)} />
        <TextInput label="Stadt" value={data.vcardCity} onChange={(value) => update("vcardCity", value)} />
        <TextInput label="Land" value={data.vcardCountry} onChange={(value) => update("vcardCountry", value)} />
      </div>
      <TextArea label="Notiz" value={data.vcardNote} onChange={(value) => update("vcardNote", value)} rows={3} />
    </div>
  );
}
