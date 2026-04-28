import { TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function UrlForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput
        label="Website-Link"
        value={data.url}
        onChange={(value) => update("url", value)}
        placeholder="https://example.com"
        type="url"
        hint="Ohne Protokoll wird automatisch https:// verwendet."
      />
      <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 md:grid-cols-2">
        <TextInput label="UTM Source" value={data.utmSource} onChange={(value) => update("utmSource", value)} placeholder="newsletter" />
        <TextInput label="UTM Medium" value={data.utmMedium} onChange={(value) => update("utmMedium", value)} placeholder="email" />
        <TextInput label="UTM Campaign" value={data.utmCampaign} onChange={(value) => update("utmCampaign", value)} placeholder="launch" />
        <TextInput label="UTM Term" value={data.utmTerm} onChange={(value) => update("utmTerm", value)} placeholder="keyword" />
        <div className="md:col-span-2">
          <TextInput label="UTM Content" value={data.utmContent} onChange={(value) => update("utmContent", value)} placeholder="button-a" />
        </div>
      </div>
    </div>
  );
}
