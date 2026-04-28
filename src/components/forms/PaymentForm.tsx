import { TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function PaymentForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput label="PayPal.me-Link" value={data.paypalLink} onChange={(value) => update("paypalLink", value)} placeholder="https://paypal.me/name" type="url" />
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Betrag optional" value={data.paymentAmount} onChange={(value) => update("paymentAmount", value)} placeholder="24.90" />
        <TextInput label="Währung optional" value={data.paymentCurrency} onChange={(value) => update("paymentCurrency", value)} placeholder="EUR" />
      </div>
      <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
        Diese App verarbeitet keine Zahlungen. Sie codiert nur den Link im QR-Code.
      </p>
    </div>
  );
}
