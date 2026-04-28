import { SwitchField, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function AppStoreForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <TextInput label="iOS App Store URL" value={data.appStoreIosUrl} onChange={(value) => update("appStoreIosUrl", value)} type="url" />
      <TextInput label="Google Play URL" value={data.appStoreAndroidUrl} onChange={(value) => update("appStoreAndroidUrl", value)} type="url" />
      <SwitchField
        label={isDe ? "Lokale Plattform-Landingpage als Daten-URL" : "Use local platform landing page as data URL"}
        checked={data.appStoreLandingPage}
        onChange={(value) => update("appStoreLandingPage", value)}
        hint={isDe ? "Ohne Backend wird keine gehostete Landingpage erstellt." : "Without a backend, no hosted landing page is created."}
      />
    </div>
  );
}
