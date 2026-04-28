import { SwitchField, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function GeoForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Latitude" value={data.geoLatitude} onChange={(value) => update("geoLatitude", value)} placeholder="52.520008" />
        <TextInput label="Longitude" value={data.geoLongitude} onChange={(value) => update("geoLongitude", value)} placeholder="13.404954" />
      </div>
      <SwitchField
        label="Google-Maps-Link erzeugen"
        checked={data.geoUseMapsLink}
        onChange={(value) => update("geoUseMapsLink", value)}
        hint="Andernfalls wird das geo:-Format codiert."
      />
    </div>
  );
}
