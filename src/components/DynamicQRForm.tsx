import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { QRContentType, QRFormData, ValidationResult } from "../types";
import { contentTypes } from "../data/contentTypes";
import { Section } from "./Section";
import type { UpdateQRField } from "./forms/formTypes";
import { AppStoreForm } from "./forms/AppStoreForm";
import { CryptoForm } from "./forms/CryptoForm";
import { EmailForm } from "./forms/EmailForm";
import { EventForm } from "./forms/EventForm";
import { FileLinkForm } from "./forms/FileLinkForm";
import { GeoForm } from "./forms/GeoForm";
import { MultiLinkForm } from "./forms/MultiLinkForm";
import { PaymentForm } from "./forms/PaymentForm";
import { PhoneForm } from "./forms/PhoneForm";
import { SmsForm } from "./forms/SmsForm";
import { SocialForm } from "./forms/SocialForm";
import { TextForm } from "./forms/TextForm";
import { UrlForm } from "./forms/UrlForm";
import { VCardForm } from "./forms/VCardForm";
import { WhatsappForm } from "./forms/WhatsappForm";
import { WifiForm } from "./forms/WifiForm";

interface DynamicQRFormProps {
  type: QRContentType;
  data: QRFormData;
  validation: ValidationResult;
  update: UpdateQRField;
}

const renderForm = (type: QRContentType, data: QRFormData, update: UpdateQRField) => {
  const props = { data, update };
  switch (type) {
    case "url":
      return <UrlForm {...props} />;
    case "text":
      return <TextForm {...props} />;
    case "email":
      return <EmailForm {...props} />;
    case "phone":
      return <PhoneForm {...props} />;
    case "sms":
      return <SmsForm {...props} />;
    case "whatsapp":
      return <WhatsappForm {...props} />;
    case "wifi":
      return <WifiForm {...props} />;
    case "vcard":
    case "mecard":
      return <VCardForm {...props} />;
    case "event":
      return <EventForm {...props} />;
    case "geo":
      return <GeoForm {...props} />;
    case "social":
      return <SocialForm {...props} />;
    case "app":
      return <AppStoreForm {...props} />;
    case "payment":
      return <PaymentForm {...props} />;
    case "crypto":
      return <CryptoForm {...props} />;
    case "file":
      return <FileLinkForm {...props} />;
    case "multilink":
      return <MultiLinkForm {...props} />;
    default:
      return null;
  }
};

export function DynamicQRForm({ type, data, validation, update }: DynamicQRFormProps) {
  const meta = contentTypes.find((item) => item.id === type);

  return (
    <Section
      eyebrow="2. Inhalt eingeben"
      title={meta ? `${meta.label} konfigurieren` : "Inhalt konfigurieren"}
      description={meta?.description}
    >
      <div className="grid gap-4">
        {renderForm(type, data, update)}
        {validation.errors.length || validation.warnings.length ? (
          <div className="grid gap-2">
            {validation.errors.map((error) => (
              <p
                key={error}
                className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm leading-6 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-100"
              >
                <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            ))}
            {validation.warnings.map((warning) => (
              <p
                key={warning}
                className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-100"
              >
                <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                {warning}
              </p>
            ))}
          </div>
        ) : (
          <p className="flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm leading-6 text-emerald-900 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-100">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Der Inhalt ist bereit für die Live-Vorschau.
          </p>
        )}
      </div>
    </Section>
  );
}
