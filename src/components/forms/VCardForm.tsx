import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function VCardForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label={isDe ? "Vorname" : "First Name"} value={data.vcardFirstName} onChange={(value) => update("vcardFirstName", value)} />
        <TextInput label={isDe ? "Nachname" : "Last Name"} value={data.vcardLastName} onChange={(value) => update("vcardLastName", value)} />
        <TextInput label={isDe ? "Organisation" : "Organization"} value={data.vcardOrganization} onChange={(value) => update("vcardOrganization", value)} />
        <TextInput label={isDe ? "Position" : "Job Title"} value={data.vcardPosition} onChange={(value) => update("vcardPosition", value)} />
        <TextInput label={isDe ? "Telefon" : "Phone"} value={data.vcardPhone} onChange={(value) => update("vcardPhone", value)} type="tel" />
        <TextInput label={isDe ? "Mobilnummer" : "Mobile"} value={data.vcardMobile} onChange={(value) => update("vcardMobile", value)} type="tel" />
        <TextInput label={isDe ? "E-Mail" : "Email"} value={data.vcardEmail} onChange={(value) => update("vcardEmail", value)} type="email" />
        <TextInput label="Website" value={data.vcardWebsite} onChange={(value) => update("vcardWebsite", value)} type="url" />
        <TextInput label={isDe ? "Straße" : "Street"} value={data.vcardStreet} onChange={(value) => update("vcardStreet", value)} />
        <TextInput label={isDe ? "PLZ" : "Postal Code"} value={data.vcardPostalCode} onChange={(value) => update("vcardPostalCode", value)} />
        <TextInput label={isDe ? "Stadt" : "City"} value={data.vcardCity} onChange={(value) => update("vcardCity", value)} />
        <TextInput label={isDe ? "Land" : "Country"} value={data.vcardCountry} onChange={(value) => update("vcardCountry", value)} />
      </div>
      <TextArea label={isDe ? "Notiz" : "Note"} value={data.vcardNote} onChange={(value) => update("vcardNote", value)} rows={3} />
    </div>
  );
}
