import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";
import { SwitchField, TextInput, inputClass } from "./FormControls";
import type { QRFormProps } from "./formTypes";

const newLinkId = () => `link-${Date.now()}-${Math.round(Math.random() * 1000)}`;

export function MultiLinkForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  const updateLink = (id: string, key: "label" | "url", value: string) => {
    update(
      "multiLinks",
      data.multiLinks.map((link) => (link.id === id ? { ...link, [key]: value } : link)),
    );
  };

  const addLink = () => {
    update("multiLinks", [...data.multiLinks, { id: newLinkId(), label: "", url: "" }]);
  };

  const removeLink = (id: string) => {
    update(
      "multiLinks",
      data.multiLinks.length > 1 ? data.multiLinks.filter((link) => link.id !== id) : [{ id: newLinkId(), label: "", url: "" }],
    );
  };

  return (
    <div className="grid gap-4">
      <TextInput label={isDe ? "Titel" : "Title"} value={data.multiLinksTitle} onChange={(value) => update("multiLinksTitle", value)} />
      <SwitchField
        label={isDe ? "Als einfache HTML-Daten-URL codieren" : "Encode as simple HTML data URL"}
        checked={data.multiLinksUseHtml}
        onChange={(value) => update("multiLinksUseHtml", value)}
        hint={isDe ? "Ohne Backend entsteht keine gehostete Landingpage." : "Without a backend, no hosted landing page is created."}
      />
      <div className="grid gap-3">
        {data.multiLinks.map((link, index) => (
          <div key={link.id} className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 md:grid-cols-[1fr_1.4fr_auto]">
            <input
              aria-label={`Link ${index + 1} Label`}
              className={inputClass}
              value={link.label}
              placeholder="Label"
              onChange={(event) => updateLink(link.id, "label", event.target.value)}
            />
            <input
              aria-label={`Link ${index + 1} URL`}
              className={inputClass}
              value={link.url}
              placeholder="https://..."
              onChange={(event) => updateLink(link.id, "url", event.target.value)}
            />
            <button
              type="button"
              onClick={() => removeLink(link.id)}
              title={isDe ? "Link entfernen" : "Remove link"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <HiOutlineTrash aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addLink}
        className="inline-flex min-h-10 w-fit items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        <HiOutlinePlus aria-hidden="true" className="h-4 w-4" />
        {isDe ? "Link hinzufügen" : "Add link"}
      </button>
    </div>
  );
}
