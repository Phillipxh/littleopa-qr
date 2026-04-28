import { SelectField, SwitchField, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function WifiForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput label="Netzwerkname / SSID" value={data.wifiSsid} onChange={(value) => update("wifiSsid", value)} placeholder="Mein WLAN" />
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Passwort"
          value={data.wifiPassword}
          onChange={(value) => update("wifiPassword", value)}
          type="password"
          hint={data.wifiEncryption === "nopass" ? "Bei Kein Passwort wird dieses Feld ignoriert." : undefined}
        />
        <SelectField
          label="Verschlüsselung"
          value={data.wifiEncryption}
          onChange={(value) => update("wifiEncryption", value)}
          options={[
            { value: "WPA", label: "WPA/WPA2" },
            { value: "WEP", label: "WEP" },
            { value: "nopass", label: "Kein Passwort" },
          ]}
        />
      </div>
      <SwitchField
        label="Verstecktes Netzwerk"
        checked={data.wifiHidden}
        onChange={(value) => update("wifiHidden", value)}
        hint="Aktivieren, wenn die SSID nicht sichtbar ausgestrahlt wird."
      />
    </div>
  );
}
