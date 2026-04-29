import { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import { HiOutlineBriefcase, HiOutlineChatBubbleLeftRight, HiOutlineChevronDown, HiOutlineKey, HiOutlineLink } from "react-icons/hi2";
import { getContentTypes } from "../data/contentTypes";
import type { AppLanguage, QRContentType } from "../types";
import { Section } from "./Section";

interface ContentTypeSelectorProps {
  language: AppLanguage;
  value: QRContentType;
  onChange: (value: QRContentType) => void;
}

interface ContentTypeGroup {
  id: string;
  title: string;
  description: string;
  items: QRContentType[];
  accent: string;
  icon: IconType;
}

const groups: ContentTypeGroup[] = [
  {
    id: "standard",
    title: "Links & Text",
    description: "Quick codes for websites, files, and multiple links.",
    items: ["url", "text", "file", "multilink"],
    accent: "from-blue-500 to-sky-400",
    icon: HiOutlineLink,
  },
  {
    id: "communication",
    title: "Communication",
    description: "Send messages, call directly, or open profiles.",
    items: ["email", "phone", "sms", "whatsapp", "social"],
    accent: "from-blue-500 to-indigo-400",
    icon: HiOutlineChatBubbleLeftRight,
  },
  {
    id: "access",
    title: "Access & Contact",
    description: "Wi-Fi, contact cards, and location data.",
    items: ["wifi", "vcard", "mecard", "geo"],
    accent: "from-sky-400 to-blue-500",
    icon: HiOutlineKey,
  },
  {
    id: "business",
    title: "Business & Transactions",
    description: "Events, apps, payment links, and Bitcoin URIs.",
    items: ["event", "app", "payment", "crypto"],
    accent: "from-blue-400 to-indigo-500",
    icon: HiOutlineBriefcase,
  },
];

const findGroupId = (type: QRContentType): string => groups.find((group) => group.items.includes(type))?.id ?? groups[0].id;

export function ContentTypeSelector({ language, value, onChange }: ContentTypeSelectorProps) {
  const contentTypes = getContentTypes(language);
  const metaById = useMemo(() => new Map(contentTypes.map((type) => [type.id, type])), [contentTypes]);
  const copy =
    language === "de"
      ? {
          eyebrow: "1. Inhalt auswählen",
          title: "QR-Code-Typ",
          groups: {
            standard: { title: "Links & Text", description: "Schnelle Codes für Websites, Dateien und mehrere Links." },
            communication: { title: "Kommunikation", description: "Direkt schreiben, anrufen oder Profile öffnen." },
            access: { title: "Zugang & Kontakt", description: "WLAN, Kontaktkarten und Standortdaten." },
            business: { title: "Business & Transaktion", description: "Events, Apps, Zahlungslinks und Bitcoin URIs." },
          },
          active: "Aktiv",
        }
      : {
          eyebrow: "1. Select content",
          title: "QR Code Type",
          groups: {
            standard: { title: "Links & Text", description: "Quick codes for websites, files, and multiple links." },
            communication: { title: "Communication", description: "Send messages, call directly, or open profiles." },
            access: { title: "Access & Contact", description: "Wi-Fi, contact cards, and location data." },
            business: { title: "Business & Transactions", description: "Events, apps, payment links, and Bitcoin URIs." },
          },
          active: "Active",
        };
  const [openGroupId, setOpenGroupId] = useState(() => findGroupId(value));
  const selectedType = metaById.get(value) ?? contentTypes[0];
  const SelectedIcon = selectedType.icon;
  const activeGroupId = useMemo(() => findGroupId(value), [value]);

  useEffect(() => {
    setOpenGroupId(activeGroupId);
  }, [activeGroupId]);

  return (
    <Section eyebrow={copy.eyebrow} title={copy.title}>
      <div className="grid gap-3">
        <div className="shimmer flex items-start gap-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50/60 px-4 py-3.5 text-slate-900 shadow-[0_18px_44px_-34px_rgba(59,130,246,0.14)] dark:border-blue-800 dark:from-blue-950/40 dark:via-slate-900 dark:to-indigo-950/30 dark:text-blue-50">
          <span className="floating-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-lg shadow-blue-200/70">
            <SelectedIcon aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">{selectedType.label}</span>
            <span className="mt-1 block text-sm leading-6 text-slate-600 dark:text-blue-100/75">{selectedType.description}</span>
          </span>
        </div>
        <div className="grid gap-2">
          {groups.map((group) => {
            const expanded = openGroupId === group.id;
            const groupHasActive = group.id === activeGroupId;
            const GroupIcon = group.icon;

            return (
              <div
                key={group.id}
                className={`overflow-hidden rounded-lg border transition ${
                  groupHasActive
                    ? "border-blue-200 bg-gradient-to-br from-white to-blue-50/45 shadow-[0_16px_38px_-30px_rgba(59,130,246,0.14)] dark:border-blue-800 dark:bg-slate-900/86"
                    : "border-blue-100 bg-white shadow-[0_10px_24px_-22px_rgba(59,130,246,0.08)] dark:border-slate-800 dark:bg-slate-900/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenGroupId(expanded ? "" : group.id)}
                  className="flex min-h-14 w-full items-center justify-between gap-3 px-3 text-left transition hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:bg-slate-800/80"
                  aria-expanded={expanded}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition ${
                        groupHasActive
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                      }`}
                    >
                      <GroupIcon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                      {copy.groups[group.id as keyof typeof copy.groups]?.title ?? group.title}
                      {groupHasActive ? (
                        <span className="rounded-full bg-blue-50/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100 dark:bg-blue-900/70 dark:text-blue-100">
                          {copy.active}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">
                      {copy.groups[group.id as keyof typeof copy.groups]?.description ?? group.description}
                    </span>
                    </span>
                  </span>
                  <HiOutlineChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-slate-500 transition ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded ? (
                  <div className="grid gap-2 border-t border-blue-100 bg-gradient-to-b from-blue-50/40 to-white p-2 dark:border-slate-800 dark:bg-slate-950/45 sm:grid-cols-2 2xl:grid-cols-2">
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
                          className={`type-card group flex min-h-[74px] items-start gap-3 rounded-md border p-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            active
                              ? "border-blue-200 bg-gradient-to-br from-white to-blue-50/60 text-slate-900 shadow-[0_18px_44px_-34px_rgba(59,130,246,0.2)] dark:border-blue-400 dark:from-blue-950/55 dark:to-cyan-950/35 dark:text-blue-50"
                              : "border-blue-100 bg-white text-slate-700 shadow-[0_8px_18px_-18px_rgba(59,130,246,0.08)] hover:border-blue-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/86 dark:text-slate-200 dark:hover:border-blue-800"
                          }`}
                          aria-pressed={active}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition ${
                              active
                                ? "bg-blue-50 text-blue-700 shadow-sm"
                                : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-blue-950"
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
