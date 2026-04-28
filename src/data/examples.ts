import type { QRContentType, QRFormData } from "../types";

const baseDate = () => {
  const start = new Date();
  start.setDate(start.getDate() + 7);
  start.setHours(10, 0, 0, 0);
  const end = new Date(start);
  end.setHours(11, 30, 0, 0);
  const toLocalInput = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60_000);
    return local.toISOString().slice(0, 16);
  };
  return { start: toLocalInput(start), end: toLocalInput(end) };
};

export const getExampleData = (type: QRContentType, current: QRFormData): QRFormData => {
  const dates = baseDate();

  switch (type) {
    case "url":
      return {
        ...current,
        url: "https://example.com/kampagne",
        utmSource: "newsletter",
        utmMedium: "email",
        utmCampaign: "frühling",
        utmTerm: "",
        utmContent: "hero-button",
      };
    case "text":
      return { ...current, text: "Danke fürs Scannen. Weitere Informationen findest du direkt vor Ort." };
    case "email":
      return {
        ...current,
        emailTo: "kontakt@example.com",
        emailSubject: "Rückfrage zum Angebot",
        emailMessage: "Hallo, ich interessiere mich für Ihr Angebot.",
      };
    case "phone":
      return { ...current, phone: "+493012345678" };
    case "sms":
      return { ...current, smsPhone: "+493012345678", smsMessage: "Hallo, ich habe den QR-Code gescannt." };
    case "whatsapp":
      return { ...current, whatsappPhone: "+491701234567", whatsappMessage: "Hallo, ich möchte mehr erfahren." };
    case "wifi":
      return {
        ...current,
        wifiSsid: "Office Guest",
        wifiPassword: "sicheres-passwort",
        wifiEncryption: "WPA",
        wifiHidden: false,
      };
    case "vcard":
    case "mecard":
      return {
        ...current,
        vcardFirstName: "Mara",
        vcardLastName: "Schneider",
        vcardOrganization: "Beispiel GmbH",
        vcardPosition: "Marketing Lead",
        vcardPhone: "+493012345678",
        vcardMobile: "+491701234567",
        vcardEmail: "mara.schneider@example.com",
        vcardWebsite: "https://example.com",
        vcardStreet: "Musterstraße 12",
        vcardPostalCode: "10115",
        vcardCity: "Berlin",
        vcardCountry: "Deutschland",
        vcardNote: "Erstellt mit dem lokalen QR-Code-Generator.",
      };
    case "event":
      return {
        ...current,
        eventTitle: "Produkt-Demo",
        eventLocation: "Berlin",
        eventDescription: "Kurze Demo mit anschließendem Q&A.",
        eventStart: dates.start,
        eventEnd: dates.end,
      };
    case "geo":
      return { ...current, geoLatitude: "52.520008", geoLongitude: "13.404954", geoUseMapsLink: true };
    case "social":
      return { ...current, socialPlatform: "github", socialValue: "openai" };
    case "app":
      return {
        ...current,
        appStoreIosUrl: "https://apps.apple.com/app/example/id123456789",
        appStoreAndroidUrl: "https://play.google.com/store/apps/details?id=com.example.app",
        appStoreLandingPage: true,
      };
    case "payment":
      return { ...current, paypalLink: "https://paypal.me/example", paymentAmount: "24.90", paymentCurrency: "EUR" };
    case "crypto":
      return {
        ...current,
        bitcoinAddress: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080",
        bitcoinAmount: "0.001",
        bitcoinLabel: "Spende",
        bitcoinMessage: "Danke",
      };
    case "file":
      return { ...current, fileUrl: "https://example.com/download/info.pdf" };
    case "multilink":
      return {
        ...current,
        multiLinksTitle: "Wichtige Links",
        multiLinksUseHtml: false,
        multiLinks: [
          { id: "link-1", label: "Website", url: "https://example.com" },
          { id: "link-2", label: "Kontakt", url: "mailto:kontakt@example.com" },
          { id: "link-3", label: "Support", url: "https://example.com/support" },
        ],
      };
    default:
      return current;
  }
};
