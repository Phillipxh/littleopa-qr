import type { AppLanguage, QRContentType, QRFormData, ValidationResult, WifiEncryption } from "../types";

const trim = (value: string) => value.trim();

export const normalizeUrl = (value: string): string => {
  const raw = trim(value);
  if (!raw) return "";
  if (/^[a-z][a-z\d+\-.]*:/i.test(raw)) return raw;
  return `https://${raw}`;
};

const encodeQuery = (value: string): string => encodeURIComponent(value.trim());

const escapeWifi = (value: string): string => value.replace(/([\\;,:"])/g, "\\$1");
const escapeMeCard = (value: string): string => value.replace(/([\\;:])/g, "\\$1");
const escapeVCard = (value: string): string =>
  value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

const escapeICal = (value: string): string =>
  value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

const compactPhone = (value: string): string => value.replace(/[^\d+]/g, "");

const makeUrl = (raw: string): URL | null => {
  const normalized = normalizeUrl(raw);
  if (!normalized) return null;
  try {
    return new URL(normalized);
  } catch {
    return null;
  }
};

const withUtmParams = (data: QRFormData): string => {
  const url = makeUrl(data.url);
  if (!url) return normalizeUrl(data.url);

  const utmPairs: Array<[string, string]> = [
    ["utm_source", data.utmSource],
    ["utm_medium", data.utmMedium],
    ["utm_campaign", data.utmCampaign],
    ["utm_term", data.utmTerm],
    ["utm_content", data.utmContent],
  ];

  utmPairs.forEach(([key, value]) => {
    if (value.trim()) url.searchParams.set(key, value.trim());
  });

  return url.toString();
};

export const generateWifiString = (
  ssid: string,
  password: string,
  encryption: WifiEncryption,
  hidden: boolean,
): string => {
  const type = encryption === "nopass" ? "nopass" : encryption;
  const passwordPart = encryption === "nopass" ? "" : `P:${escapeWifi(password)};`;
  return `WIFI:T:${type};S:${escapeWifi(ssid)};${passwordPart}H:${hidden ? "true" : "false"};;`;
};

export const generateVCard = (data: QRFormData): string => {
  const fullName = `${data.vcardFirstName} ${data.vcardLastName}`.trim();
  const address = [
    "",
    "",
    escapeVCard(data.vcardStreet),
    escapeVCard(data.vcardCity),
    "",
    escapeVCard(data.vcardPostalCode),
    escapeVCard(data.vcardCountry),
  ].join(";");

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCard(data.vcardLastName)};${escapeVCard(data.vcardFirstName)};;;`,
    fullName ? `FN:${escapeVCard(fullName)}` : "",
    data.vcardOrganization ? `ORG:${escapeVCard(data.vcardOrganization)}` : "",
    data.vcardPosition ? `TITLE:${escapeVCard(data.vcardPosition)}` : "",
    data.vcardPhone ? `TEL;TYPE=WORK,VOICE:${escapeVCard(data.vcardPhone)}` : "",
    data.vcardMobile ? `TEL;TYPE=CELL,VOICE:${escapeVCard(data.vcardMobile)}` : "",
    data.vcardEmail ? `EMAIL;TYPE=INTERNET:${escapeVCard(data.vcardEmail)}` : "",
    data.vcardWebsite ? `URL:${escapeVCard(normalizeUrl(data.vcardWebsite))}` : "",
    data.vcardStreet || data.vcardCity || data.vcardPostalCode || data.vcardCountry ? `ADR;TYPE=WORK:${address}` : "",
    data.vcardNote ? `NOTE:${escapeVCard(data.vcardNote)}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
};

export const generateMeCard = (data: QRFormData): string => {
  const name = [data.vcardLastName, data.vcardFirstName].filter(Boolean).map(escapeMeCard).join(",");
  const address = [data.vcardStreet, `${data.vcardPostalCode} ${data.vcardCity}`.trim(), data.vcardCountry]
    .filter(Boolean)
    .map(escapeMeCard)
    .join(",");

  const parts = [
    name ? `N:${name}` : "",
    data.vcardOrganization ? `ORG:${escapeMeCard(data.vcardOrganization)}` : "",
    data.vcardPhone ? `TEL:${escapeMeCard(data.vcardPhone)}` : "",
    data.vcardMobile ? `TEL:${escapeMeCard(data.vcardMobile)}` : "",
    data.vcardEmail ? `EMAIL:${escapeMeCard(data.vcardEmail)}` : "",
    data.vcardWebsite ? `URL:${escapeMeCard(normalizeUrl(data.vcardWebsite))}` : "",
    address ? `ADR:${address}` : "",
    data.vcardNote ? `NOTE:${escapeMeCard(data.vcardNote)}` : "",
  ].filter(Boolean);

  return `MECARD:${parts.join(";")};;`;
};

const formatCalendarDate = (value: string): string => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (num: number) => String(num).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "T",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
};

export const generateCalendarEvent = (data: QRFormData): string =>
  [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Local QR Code Generator//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${escapeICal(data.eventTitle)}`,
    data.eventLocation ? `LOCATION:${escapeICal(data.eventLocation)}` : "",
    data.eventDescription ? `DESCRIPTION:${escapeICal(data.eventDescription)}` : "",
    data.eventStart ? `DTSTART:${formatCalendarDate(data.eventStart)}` : "",
    data.eventEnd ? `DTEND:${formatCalendarDate(data.eventEnd)}` : "",
    `UID:${Date.now()}@local-qr-generator`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

const buildSocialUrl = (data: QRFormData): string => {
  const value = data.socialValue.trim();
  if (/^https?:\/\//i.test(value)) return value;
  const handle = value.replace(/^@/, "");
  const encoded = encodeURIComponent(handle);
  const urls: Record<typeof data.socialPlatform, string> = {
    instagram: `https://www.instagram.com/${encoded}`,
    facebook: `https://www.facebook.com/${encoded}`,
    linkedin: `https://www.linkedin.com/in/${encoded}`,
    tiktok: `https://www.tiktok.com/@${encoded}`,
    youtube: `https://www.youtube.com/@${encoded}`,
    x: `https://x.com/${encoded}`,
    github: `https://github.com/${encoded}`,
  };
  return urls[data.socialPlatform];
};

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const buildHtmlDataUrl = (title: string, links: { label: string; url: string }[]): string => {
  const safeTitle = title.trim() || "Links";
  const rows = links
    .filter((link) => link.url.trim())
    .map((link) => {
      const href = normalizeUrl(link.url);
      const label = link.label.trim() || href;
      return `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`;
    })
    .join("");
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(safeTitle)}</title><body style="font-family:system-ui;margin:32px;line-height:1.5"><h1>${escapeHtml(safeTitle)}</h1><ul>${rows}</ul></body></html>`;
  return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
};

const buildPaymentUrl = (data: QRFormData): string => {
  const base = normalizeUrl(data.paypalLink);
  if (!base) return "";
  const amount = data.paymentAmount.trim();
  const currency = data.paymentCurrency.trim().toUpperCase();

  if (!amount) return base;
  try {
    const url = new URL(base);
    if (amount && url.hostname.includes("paypal.me") && !url.pathname.match(/\/\d/)) {
      url.pathname = `${url.pathname.replace(/\/$/, "")}/${amount}`;
    } else if (amount) {
      url.searchParams.set("amount", amount);
    }
    if (currency) url.searchParams.set("currency", currency);
    return url.toString();
  } catch {
    return base;
  }
};

const buildBitcoinUri = (data: QRFormData): string => {
  const address = data.bitcoinAddress.trim();
  const params = new URLSearchParams();
  if (data.bitcoinAmount.trim()) params.set("amount", data.bitcoinAmount.trim());
  if (data.bitcoinLabel.trim()) params.set("label", data.bitcoinLabel.trim());
  if (data.bitcoinMessage.trim()) params.set("message", data.bitcoinMessage.trim());
  const suffix = params.toString();
  return `bitcoin:${address}${suffix ? `?${suffix}` : ""}`;
};

export const buildQRValue = (type: QRContentType, data: QRFormData): string => {
  switch (type) {
    case "url":
      return withUtmParams(data);
    case "text":
      return data.text;
    case "email": {
      const params = new URLSearchParams();
      if (data.emailSubject.trim()) params.set("subject", data.emailSubject.trim());
      if (data.emailMessage.trim()) params.set("body", data.emailMessage.trim());
      const suffix = params.toString();
      return `mailto:${data.emailTo.trim()}${suffix ? `?${suffix}` : ""}`;
    }
    case "phone":
      return `tel:${compactPhone(data.phone)}`;
    case "sms":
      return `sms:${compactPhone(data.smsPhone)}${data.smsMessage.trim() ? `?&body=${encodeQuery(data.smsMessage)}` : ""}`;
    case "whatsapp":
      return `https://wa.me/${compactPhone(data.whatsappPhone).replace(/^\+/, "")}${
        data.whatsappMessage.trim() ? `?text=${encodeQuery(data.whatsappMessage)}` : ""
      }`;
    case "wifi":
      return generateWifiString(data.wifiSsid, data.wifiPassword, data.wifiEncryption, data.wifiHidden);
    case "vcard":
      return generateVCard(data);
    case "mecard":
      return generateMeCard(data);
    case "event":
      return generateCalendarEvent(data);
    case "geo":
      return data.geoUseMapsLink
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${data.geoLatitude.trim()},${data.geoLongitude.trim()}`,
          )}`
        : `geo:${data.geoLatitude.trim()},${data.geoLongitude.trim()}`;
    case "social":
      return buildSocialUrl(data);
    case "app":
      if (data.appStoreLandingPage && data.appStoreIosUrl.trim() && data.appStoreAndroidUrl.trim()) {
        return buildHtmlDataUrl("Download app", [
          { label: "iOS App Store", url: data.appStoreIosUrl },
          { label: "Google Play", url: data.appStoreAndroidUrl },
        ]);
      }
      return normalizeUrl(data.appStoreIosUrl || data.appStoreAndroidUrl);
    case "payment":
      return buildPaymentUrl(data);
    case "crypto":
      return buildBitcoinUri(data);
    case "file":
      return normalizeUrl(data.fileUrl);
    case "multilink":
      if (data.multiLinksUseHtml) return buildHtmlDataUrl(data.multiLinksTitle, data.multiLinks);
      return [
        data.multiLinksTitle.trim(),
        ...data.multiLinks
          .filter((link) => link.url.trim())
          .map((link) => `${link.label.trim() || "Link"}: ${normalizeUrl(link.url)}`),
      ]
        .filter(Boolean)
        .join("\n");
    default:
      return "";
  }
};

const hasUrl = (value: string): boolean => {
  const url = makeUrl(value);
  return Boolean(url && ["http:", "https:", "mailto:", "tel:", "sms:", "bitcoin:", "geo:", "data:"].includes(url.protocol));
};

const isEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const validateQRInput = (type: QRContentType, data: QRFormData, language: AppLanguage = "en"): ValidationResult => {
  const isDe = language === "de";
  const errors: string[] = [];
  const warnings: string[] = [];

  switch (type) {
    case "url":
      if (!data.url.trim()) errors.push(isDe ? "Bitte gib eine Website-URL ein." : "Please enter a website URL.");
      else if (!hasUrl(data.url)) errors.push(isDe ? "Die URL ist nicht gültig." : "The URL is invalid.");
      break;
    case "text":
      if (!data.text.trim()) errors.push(isDe ? "Bitte gib Text ein." : "Please enter text.");
      if (data.text.length > 900) warnings.push(isDe ? "Sehr langer Text kann die Scanbarkeit reduzieren." : "Very long text can reduce scan reliability.");
      break;
    case "email":
      if (!data.emailTo.trim()) errors.push(isDe ? "Bitte gib einen Empfänger ein." : "Please enter a recipient.");
      else if (!isEmail(data.emailTo)) errors.push(isDe ? "Die E-Mail-Adresse ist nicht gültig." : "The email address is invalid.");
      break;
    case "phone":
      if (!compactPhone(data.phone)) errors.push(isDe ? "Bitte gib eine Telefonnummer ein." : "Please enter a phone number.");
      break;
    case "sms":
      if (!compactPhone(data.smsPhone)) errors.push(isDe ? "Bitte gib eine Telefonnummer für die SMS ein." : "Please enter a phone number for SMS.");
      break;
    case "whatsapp":
      if (!compactPhone(data.whatsappPhone)) errors.push(isDe ? "Bitte gib eine WhatsApp-Telefonnummer ein." : "Please enter a WhatsApp phone number.");
      break;
    case "wifi":
      if (!data.wifiSsid.trim()) errors.push(isDe ? "Bitte gib den Netzwerknamen ein." : "Please enter the network name.");
      if (data.wifiEncryption !== "nopass" && !data.wifiPassword.trim()) warnings.push(isDe ? "Ohne Passwort ist WPA/WEP nicht sinnvoll." : "WPA/WEP without password is usually not useful.");
      break;
    case "vcard":
    case "mecard":
      if (
        ![
          data.vcardFirstName,
          data.vcardLastName,
          data.vcardOrganization,
          data.vcardPhone,
          data.vcardMobile,
          data.vcardEmail,
        ].some((value) => value.trim())
      ) {
        errors.push(isDe ? "Bitte gib mindestens einen Namen, eine Firma, Telefon oder E-Mail ein." : "Please enter at least a name, company, phone, or email.");
      }
      if (data.vcardEmail && !isEmail(data.vcardEmail)) errors.push(isDe ? "Die Kontakt-E-Mail ist nicht gültig." : "The contact email is invalid.");
      break;
    case "event":
      if (!data.eventTitle.trim()) errors.push(isDe ? "Bitte gib einen Event-Titel ein." : "Please enter an event title.");
      if (!data.eventStart) errors.push(isDe ? "Bitte gib den Startzeitpunkt ein." : "Please enter a start date/time.");
      if (!data.eventEnd) errors.push(isDe ? "Bitte gib den Endzeitpunkt ein." : "Please enter an end date/time.");
      if (data.eventStart && data.eventEnd && new Date(data.eventEnd) <= new Date(data.eventStart)) {
        errors.push(isDe ? "Der Endzeitpunkt muss nach dem Start liegen." : "The end date/time must be after the start date/time.");
      }
      break;
    case "geo": {
      const lat = Number(data.geoLatitude);
      const lng = Number(data.geoLongitude);
      if (!Number.isFinite(lat) || lat < -90 || lat > 90) errors.push(isDe ? "Latitude muss zwischen -90 und 90 liegen." : "Latitude must be between -90 and 90.");
      if (!Number.isFinite(lng) || lng < -180 || lng > 180) errors.push(isDe ? "Longitude muss zwischen -180 und 180 liegen." : "Longitude must be between -180 and 180.");
      break;
    }
    case "social":
      if (!data.socialValue.trim()) errors.push(isDe ? "Bitte gib ein Profil oder eine URL ein." : "Please enter a profile name or URL.");
      break;
    case "app":
      if (!data.appStoreIosUrl.trim() && !data.appStoreAndroidUrl.trim()) {
        errors.push(isDe ? "Bitte gib mindestens einen App-Store-Link ein." : "Please enter at least one app store link.");
      }
      if (data.appStoreLandingPage) warnings.push(isDe ? "Die Landingpage ist eine Daten-URL und wird nicht gehostet." : "The landing page is a data URL and is not hosted.");
      break;
    case "payment":
      if (!data.paypalLink.trim()) errors.push(isDe ? "Bitte gib einen PayPal.me-Link ein." : "Please enter a PayPal.me link.");
      else if (!hasUrl(data.paypalLink)) errors.push(isDe ? "Der PayPal-Link ist nicht gültig." : "The PayPal link is invalid.");
      warnings.push(isDe ? "Die App verarbeitet keine Zahlungen, sie codiert nur den Zahlungslink." : "This app does not process payments; it only encodes the payment link.");
      break;
    case "crypto":
      if (!data.bitcoinAddress.trim()) errors.push(isDe ? "Bitte gib eine Bitcoin-Adresse ein." : "Please enter a Bitcoin address.");
      break;
    case "file":
      if (!data.fileUrl.trim()) errors.push(isDe ? "Bitte gib eine Datei-URL ein." : "Please enter a file URL.");
      else if (!hasUrl(data.fileUrl)) errors.push(isDe ? "Die Datei-URL ist nicht gültig." : "The file URL is invalid.");
      warnings.push(isDe ? "Es werden keine Dateien hochgeladen, nur Links codiert." : "No files are uploaded; only links are encoded.");
      break;
    case "multilink":
      if (!data.multiLinks.some((link) => link.url.trim())) errors.push(isDe ? "Bitte gib mindestens einen Link ein." : "Please enter at least one link.");
      if (data.multiLinksUseHtml) warnings.push(isDe ? "Die HTML-Variante ist eine Daten-URL und nicht gehostet." : "The HTML variant is a data URL and not hosted.");
      break;
    default:
      break;
  }

  return { isValid: errors.length === 0, errors, warnings };
};
