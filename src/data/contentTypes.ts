import {
  AppWindow,
  Bitcoin,
  CalendarDays,
  Contact,
  FileText,
  Globe2,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Network,
  Phone,
  QrCode,
  Share2,
  Smartphone,
  Type,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppLanguage, QRContentType } from "../types";

export interface ContentTypeMeta {
  id: QRContentType;
  label: string;
  description: string;
  icon: LucideIcon;
}

const englishContentTypes: ContentTypeMeta[] = [
  { id: "url", label: "URL", description: "Website link with optional UTM parameters", icon: Link2 },
  { id: "text", label: "Text", description: "Free text or short message", icon: Type },
  { id: "email", label: "Email", description: "Recipient, subject, and message", icon: Mail },
  { id: "phone", label: "Phone", description: "Direct call via tel link", icon: Phone },
  { id: "sms", label: "SMS", description: "Message to a phone number", icon: MessageSquare },
  { id: "whatsapp", label: "WhatsApp", description: "Chat link with prefilled message", icon: MessageCircle },
  { id: "wifi", label: "Wi-Fi", description: "SSID, password, and encryption", icon: Network },
  { id: "vcard", label: "vCard", description: "Contact card in vCard 3.0 format", icon: Contact },
  { id: "mecard", label: "MeCard", description: "Compact contact card", icon: QrCode },
  { id: "event", label: "Event", description: "Calendar entry as iCalendar", icon: CalendarDays },
  { id: "geo", label: "Location", description: "Geo coordinates or Maps link", icon: MapPin },
  { id: "social", label: "Social", description: "Profiles on common platforms", icon: Share2 },
  { id: "app", label: "App Store", description: "iOS, Android, or local landing page", icon: AppWindow },
  { id: "payment", label: "PayPal", description: "PayPal.me link with optional amount", icon: WalletCards },
  { id: "crypto", label: "Bitcoin", description: "Bitcoin URI with amount and label", icon: Bitcoin },
  { id: "file", label: "File Link", description: "URL to a PDF or file", icon: FileText },
  { id: "multilink", label: "Multi-Link", description: "Multiple links as text or data URL", icon: Globe2 },
];

const germanContentTypes: ContentTypeMeta[] = [
  { id: "url", label: "URL", description: "Website mit optionalen UTM-Parametern", icon: Link2 },
  { id: "text", label: "Text", description: "Freier Text oder kurze Hinweise", icon: Type },
  { id: "email", label: "E-Mail", description: "Empfänger, Betreff und Nachricht", icon: Mail },
  { id: "phone", label: "Telefon", description: "Direkter Anruf per tel-Link", icon: Phone },
  { id: "sms", label: "SMS", description: "Nachricht an eine Telefonnummer", icon: MessageSquare },
  { id: "whatsapp", label: "WhatsApp", description: "Chat-Link mit Startnachricht", icon: MessageCircle },
  { id: "wifi", label: "WLAN", description: "SSID, Passwort und Verschlüsselung", icon: Network },
  { id: "vcard", label: "vCard", description: "Kontaktkarte nach vCard 3.0", icon: Contact },
  { id: "mecard", label: "MeCard", description: "Kompakte Kontaktkarte", icon: QrCode },
  { id: "event", label: "Event", description: "Kalendereintrag als iCalendar", icon: CalendarDays },
  { id: "geo", label: "Standort", description: "Geo-Koordinaten oder Maps-Link", icon: MapPin },
  { id: "social", label: "Social", description: "Profile auf gängigen Plattformen", icon: Share2 },
  { id: "app", label: "App Store", description: "iOS, Android oder lokale Landingpage", icon: AppWindow },
  { id: "payment", label: "PayPal", description: "PayPal.me-Link mit optionalem Betrag", icon: WalletCards },
  { id: "crypto", label: "Bitcoin", description: "Bitcoin URI mit Betrag und Label", icon: Bitcoin },
  { id: "file", label: "Datei-Link", description: "URL zu PDF oder Datei", icon: FileText },
  { id: "multilink", label: "Mehrfach-Link", description: "Mehrere Links als Text oder Daten-URL", icon: Globe2 },
];

export const getContentTypes = (language: AppLanguage): ContentTypeMeta[] =>
  language === "de" ? germanContentTypes : englishContentTypes;

export const contentTypes = englishContentTypes;
