import type { IconType } from "react-icons";
import type { AppLanguage, QRContentType } from "../types";
import { contentTypeIcons } from "./contentTypeIcons";

export interface ContentTypeMeta {
  id: QRContentType;
  label: string;
  description: string;
  icon: IconType;
}

const englishContentTypes: ContentTypeMeta[] = [
  { id: "url", label: "URL", description: "Website link with optional UTM parameters", icon: contentTypeIcons.url },
  { id: "text", label: "Text", description: "Free text or short message", icon: contentTypeIcons.text },
  { id: "email", label: "Email", description: "Recipient, subject, and message", icon: contentTypeIcons.email },
  { id: "phone", label: "Phone", description: "Direct call via tel link", icon: contentTypeIcons.phone },
  { id: "sms", label: "SMS", description: "Message to a phone number", icon: contentTypeIcons.sms },
  { id: "whatsapp", label: "WhatsApp", description: "Chat link with prefilled message", icon: contentTypeIcons.whatsapp },
  { id: "wifi", label: "Wi-Fi", description: "SSID, password, and encryption", icon: contentTypeIcons.wifi },
  { id: "vcard", label: "vCard", description: "Contact card in vCard 3.0 format", icon: contentTypeIcons.vcard },
  { id: "mecard", label: "MeCard", description: "Compact contact card", icon: contentTypeIcons.mecard },
  { id: "event", label: "Event", description: "Calendar entry as iCalendar", icon: contentTypeIcons.event },
  { id: "geo", label: "Location", description: "Geo coordinates or Maps link", icon: contentTypeIcons.geo },
  { id: "social", label: "Social", description: "Profiles on common platforms", icon: contentTypeIcons.social },
  { id: "app", label: "App Store", description: "iOS, Android, or local landing page", icon: contentTypeIcons.app },
  { id: "payment", label: "PayPal", description: "PayPal.me link with optional amount", icon: contentTypeIcons.payment },
  { id: "crypto", label: "Bitcoin", description: "Bitcoin URI with amount and label", icon: contentTypeIcons.crypto },
  { id: "file", label: "File Link", description: "URL to a PDF or file", icon: contentTypeIcons.file },
  { id: "multilink", label: "Multi-Link", description: "Multiple links as text or data URL", icon: contentTypeIcons.multilink },
];

const germanContentTypes: ContentTypeMeta[] = [
  { id: "url", label: "URL", description: "Website mit optionalen UTM-Parametern", icon: contentTypeIcons.url },
  { id: "text", label: "Text", description: "Freier Text oder kurze Hinweise", icon: contentTypeIcons.text },
  { id: "email", label: "E-Mail", description: "Empfänger, Betreff und Nachricht", icon: contentTypeIcons.email },
  { id: "phone", label: "Telefon", description: "Direkter Anruf per tel-Link", icon: contentTypeIcons.phone },
  { id: "sms", label: "SMS", description: "Nachricht an eine Telefonnummer", icon: contentTypeIcons.sms },
  { id: "whatsapp", label: "WhatsApp", description: "Chat-Link mit Startnachricht", icon: contentTypeIcons.whatsapp },
  { id: "wifi", label: "WLAN", description: "SSID, Passwort und Verschlüsselung", icon: contentTypeIcons.wifi },
  { id: "vcard", label: "vCard", description: "Kontaktkarte nach vCard 3.0", icon: contentTypeIcons.vcard },
  { id: "mecard", label: "MeCard", description: "Kompakte Kontaktkarte", icon: contentTypeIcons.mecard },
  { id: "event", label: "Event", description: "Kalendereintrag als iCalendar", icon: contentTypeIcons.event },
  { id: "geo", label: "Standort", description: "Geo-Koordinaten oder Maps-Link", icon: contentTypeIcons.geo },
  { id: "social", label: "Social", description: "Profile auf gängigen Plattformen", icon: contentTypeIcons.social },
  { id: "app", label: "App Store", description: "iOS, Android oder lokale Landingpage", icon: contentTypeIcons.app },
  { id: "payment", label: "PayPal", description: "PayPal.me-Link mit optionalem Betrag", icon: contentTypeIcons.payment },
  { id: "crypto", label: "Bitcoin", description: "Bitcoin URI mit Betrag und Label", icon: contentTypeIcons.crypto },
  { id: "file", label: "Datei-Link", description: "URL zu PDF oder Datei", icon: contentTypeIcons.file },
  { id: "multilink", label: "Mehrfach-Link", description: "Mehrere Links als Text oder Daten-URL", icon: contentTypeIcons.multilink },
];

export const getContentTypes = (language: AppLanguage): ContentTypeMeta[] =>
  language === "de" ? germanContentTypes : englishContentTypes;

export const contentTypes = englishContentTypes;
