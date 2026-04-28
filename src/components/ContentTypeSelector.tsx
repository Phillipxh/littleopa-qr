import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { contentTypes } from "../data/contentTypes";
import type { QRContentType } from "../types";
import { Section } from "./Section";

interface ContentTypeSelectorProps {
  value: QRContentType;
  onChange: (value: QRContentType) => void;
}

interface ContentTypeGroup {
  id: string;
  title: string;
  description: string;
  items: QRContentType[];
  accent: string;
}

const groups: ContentTypeGroup[] = [
  {
    id: "standard",
    title: "Links & Text",
    description: "Schnelle Codes für Websites, Dateien und mehrere Links.",
    items: ["url", "text", "file", "multilink"],
    accent: "from-teal-600 to-cyan-600",
  },
  {
    id: "communication",
    title: "Kommunikation",
    description: "Direkt schreiben, anrufen oder Profile öffnen.",
    items: ["email", "phone", "sms", "whatsapp", "social"],
    accent: "from-blue-600 to-indigo-600",
  },
  {
    id: "access",
    title: "Zugang & Kontakt",
    description: "WLAN, Kontaktkarten und Standortdaten.",
    items: ["wifi", "vcard", "mecard", "geo"],
    accent: "from-emerald-600 to-teal-700",
  },
  {
    id: "business",
    title: "Business & Transaktion",
    description: "Events, Apps, Zahlungslinks und Bitcoin URIs.",
    items: ["event", "app", "payment", "crypto"],
    accent: "from-amber-600 to-rose-600",
  },
];

const metaById = new Map(contentTypes.map((type) => [type.id, type]));

const findGroupId = (type: QRContentType): string => groups.find((group) => group.items.includes(type))?.id ?? groups[0].id;

export function ContentTypeSelector({ value, onChange }: ContentTypeSelectorProps) {
  const [openGroupId, setOpenGroupId] = useState(() => findGroupId(value));
  const selectedType = metaById.get(value) ?? contentTypes[0];
  const SelectedIcon = selectedType.icon;
  const activeGroupId = useMemo(() => findGroupId(value), [value]);

  useEffect(() => {
    setOpenGroupId(activeGroupId);
  }, [activeGroupId]);

  return (
    <Section eyebrow="1. Inhalt auswählen" title="QR-Code-Typ">
      <div className="grid gap-3">
        <div className="shimmer flex items-start gap-3 rounded-lg border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-blue-50 p-3 text-teal-950 shadow-sm dark:border-teal-800 dark:from-teal-950/40 dark:via-slate-900 dark:to-indigo-950/30 dark:text-teal-50">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-blue-700 text-white shadow-lg shadow-teal-900/20">
            <SelectedIcon aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">{selectedType.label}</span>
            <span className="mt-1 block text-sm leading-6 text-teal-900/75 dark:text-teal-100/75">{selectedType.description}</span>
          </span>
        </div>
        <div className="grid gap-2">
          {groups.map((group) => {
            const expanded = openGroupId === group.id;
            const groupHasActive = group.id === activeGroupId;

            return (
              <div
                key={group.id}
                className={`overflow-hidden rounded-lg border transition ${
                  groupHasActive
                    ? "border-teal-300 bg-white/94 shadow-sm dark:border-teal-800 dark:bg-slate-900/86"
                    : "border-slate-200 bg-white/72 dark:border-slate-800 dark:bg-slate-900/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenGroupId(expanded ? "" : group.id)}
                  className="flex min-h-14 w-full items-center justify-between gap-3 px-3 text-left transition hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:hover:bg-slate-800/80"
                  aria-expanded={expanded}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`h-8 w-1.5 shrink-0 rounded-full bg-gradient-to-b ${group.accent}`} />
                    <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                      {group.title}
                      {groupHasActive ? (
                        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-bold uppercase text-teal-800 dark:bg-teal-900/70 dark:text-teal-100">
                          Aktiv
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">{group.description}</span>
                    </span>
                  </span>
                  <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-slate-500 transition ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded ? (
                  <div className="grid gap-2 border-t border-slate-100 bg-slate-50/70 p-2 dark:border-slate-800 dark:bg-slate-950/45 sm:grid-cols-2 2xl:grid-cols-2">
                    {group.items.map((id) => {
                      const type = metaById.get(id);
                      if (!type) return null;
                      const Icon = type.icon;
                      const active = value === type.id;

                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => onChange(type.id)}
                          className={`type-card group flex min-h-[74px] items-start gap-3 rounded-md border p-3 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                            active
                              ? "border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 text-teal-950 shadow-sm dark:border-teal-400 dark:from-teal-950/55 dark:to-blue-950/35 dark:text-teal-50"
                              : "border-slate-200 bg-white/92 text-slate-700 hover:border-teal-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/86 dark:text-slate-200 dark:hover:border-teal-800"
                          }`}
                          aria-pressed={active}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition ${
                              active
                                ? `bg-gradient-to-br ${group.accent} text-white shadow-sm`
                                : "bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-teal-950"
                            }`}
                          >
                            <Icon aria-hidden="true" className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold">{type.label}</span>
                            <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500 dark:text-slate-400">{type.description}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
