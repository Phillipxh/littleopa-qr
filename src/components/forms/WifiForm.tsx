import { SelectField, SwitchField, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function WifiForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <TextInput label={isDe ? "Netzwerkname / SSID" : "Network Name / SSID"} value={data.wifiSsid} onChange={(value) => update("wifiSsid", value)} placeholder={isDe ? "Mein WLAN" : "My Wi-Fi"} />
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label={isDe ? "Passwort" : "Password"}
          value={data.wifiPassword}
          onChange={(value) => update("wifiPassword", value)}
          type="password"
          hint={data.wifiEncryption === "nopass" ? (isDe ? "Bei Kein Passwort wird dieses Feld ignoriert." : "This field is ignored when No Password is selected.") : undefined}
        />
        <SelectField
          label={isDe ? "Verschlüsselung" : "Encryption"}
          value={data.wifiEncryption}
          onChange={(value) => update("wifiEncryption", value)}
          options={[
            { value: "WPA", label: "WPA/WPA2" },
            { value: "WEP", label: "WEP" },
            { value: "nopass", label: isDe ? "Kein Passwort" : "No Password" },
          ]}
        />
      </div>
      <SwitchField
        label={isDe ? "Verstecktes Netzwerk" : "Hidden Network"}
        checked={data.wifiHidden}
        onChange={(value) => update("wifiHidden", value)}
        hint={isDe ? "Aktivieren, wenn die SSID nicht sichtbar ausgestrahlt wird." : "Enable this if the SSID is not broadcast publicly."}
      />
    </div>
  );
}
