import { TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function PaymentForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <TextInput label={isDe ? "PayPal.me-Link" : "PayPal.me Link"} value={data.paypalLink} onChange={(value) => update("paypalLink", value)} placeholder="https://paypal.me/name" type="url" />
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label={isDe ? "Betrag optional" : "Amount (optional)"} value={data.paymentAmount} onChange={(value) => update("paymentAmount", value)} placeholder="24.90" />
        <TextInput label={isDe ? "Währung optional" : "Currency (optional)"} value={data.paymentCurrency} onChange={(value) => update("paymentCurrency", value)} placeholder="EUR" />
      </div>
      <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
        {isDe ? "Diese App verarbeitet keine Zahlungen. Sie codiert nur den Link im QR-Code." : "This app does not process payments. It only encodes the payment link."}
      </p>
    </div>
  );
}
