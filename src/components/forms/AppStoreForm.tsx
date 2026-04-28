import { SwitchField, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function AppStoreForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput label="iOS App Store URL" value={data.appStoreIosUrl} onChange={(value) => update("appStoreIosUrl", value)} type="url" />
      <TextInput label="Google Play URL" value={data.appStoreAndroidUrl} onChange={(value) => update("appStoreAndroidUrl", value)} type="url" />
      <SwitchField
        label="Lokale Plattform-Landingpage als Daten-URL"
        checked={data.appStoreLandingPage}
        onChange={(value) => update("appStoreLandingPage", value)}
        hint="Ohne Backend wird keine gehostete Landingpage erstellt."
      />
    </div>
  );
}
