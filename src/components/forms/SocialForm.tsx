import { SelectField, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function SocialForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <p className="rounded-md border border-slate-200 bg-white/72 px-3 py-2 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-950/55 dark:text-slate-300">
        Für diese App werden neutrale, freie UI-Icons verwendet. Es werden keine offiziellen Markenlogos im QR-Design eingebettet.
      </p>
      <SelectField
        label="Plattform"
        value={data.socialPlatform}
        onChange={(value) => update("socialPlatform", value)}
        options={[
          { value: "instagram", label: "Instagram" },
          { value: "facebook", label: "Facebook" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "tiktok", label: "TikTok" },
          { value: "youtube", label: "YouTube" },
          { value: "x", label: "X / Twitter" },
          { value: "github", label: "GitHub" },
        ]}
      />
      <TextInput
        label="Profilname oder URL"
        value={data.socialValue}
        onChange={(value) => update("socialValue", value)}
        placeholder="@profil oder https://..."
      />
    </div>
  );
}
