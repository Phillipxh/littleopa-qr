export type QRContentType =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "whatsapp"
  | "wifi"
  | "vcard"
  | "mecard"
  | "event"
  | "geo"
  | "social"
  | "app"
  | "payment"
  | "crypto"
  | "file"
  | "multilink";

export type QRExportFormat = "png" | "svg" | "jpeg" | "webp" | "pdf";
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
export type GradientType = "linear" | "radial";
export type QRModuleStyle = "square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded";
export type QREyeOuterStyle = "square" | "dot" | "extra-rounded" | "rounded";
export type QREyeInnerStyle = "square" | "dot" | "rounded";
export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "tiktok"
  | "youtube"
  | "x"
  | "github";

export type WifiEncryption = "WPA" | "WEP" | "nopass";
export type QualityLevel = "Sehr gut" | "Gut" | "Risiko" | "Kritisch";

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface QRFormData {
  url: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  text: string;
  emailTo: string;
  emailSubject: string;
  emailMessage: string;
  phone: string;
  smsPhone: string;
  smsMessage: string;
  whatsappPhone: string;
  whatsappMessage: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: WifiEncryption;
  wifiHidden: boolean;
  vcardFirstName: string;
  vcardLastName: string;
  vcardOrganization: string;
  vcardPosition: string;
  vcardPhone: string;
  vcardMobile: string;
  vcardEmail: string;
  vcardWebsite: string;
  vcardStreet: string;
  vcardPostalCode: string;
  vcardCity: string;
  vcardCountry: string;
  vcardNote: string;
  eventTitle: string;
  eventLocation: string;
  eventDescription: string;
  eventStart: string;
  eventEnd: string;
  geoLatitude: string;
  geoLongitude: string;
  geoUseMapsLink: boolean;
  socialPlatform: SocialPlatform;
  socialValue: string;
  appStoreIosUrl: string;
  appStoreAndroidUrl: string;
  appStoreLandingPage: boolean;
  paypalLink: string;
  paymentAmount: string;
  paymentCurrency: string;
  bitcoinAddress: string;
  bitcoinAmount: string;
  bitcoinLabel: string;
  bitcoinMessage: string;
  fileUrl: string;
  multiLinksUseHtml: boolean;
  multiLinksTitle: string;
  multiLinks: LinkItem[];
}

export interface QRGradientOptions {
  enabled: boolean;
  type: GradientType;
  startColor: string;
  endColor: string;
  rotation: number;
}

export interface QRDesignOptions {
  size: number;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  foregroundColor: string;
  backgroundColor: string;
  transparentBackground: boolean;
  gradient: QRGradientOptions;
  moduleStyle: QRModuleStyle;
  eyeOuterStyle: QREyeOuterStyle;
  eyeInnerStyle: QREyeInnerStyle;
  eyeColor: string;
}

export interface QRLogoOptions {
  image: string | null;
  name: string;
  useTypeIcon: boolean;
  imageSize: number;
  margin: number;
  hideBackgroundDots: boolean;
}

export interface QRTemplate {
  id: string;
  name: string;
  description: string;
  design: QRDesignOptions;
}

export interface QRQualityResult {
  level: QualityLevel;
  score: number;
  warnings: string[];
  tips: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface HistoryItem {
  id: string;
  title: string;
  value: string;
  contentType: QRContentType;
  data: QRFormData;
  design: QRDesignOptions;
  logo: Omit<QRLogoOptions, "image"> & { image: null };
  fileName: string;
  createdAt: string;
}

export interface StoredSettings {
  contentType: QRContentType;
  data: QRFormData;
  design: QRDesignOptions;
  logo: QRLogoOptions;
  fileName: string;
  liveUpdate: boolean;
  darkMode: boolean;
}
