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
import type { QRContentType } from "../types";

export interface ContentTypeMeta {
  id: QRContentType;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const contentTypes: ContentTypeMeta[] = [
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
