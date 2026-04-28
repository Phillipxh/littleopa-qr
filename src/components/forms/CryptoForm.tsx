import { TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function CryptoForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <TextInput label={isDe ? "Bitcoin-Adresse" : "Bitcoin Address"} value={data.bitcoinAddress} onChange={(value) => update("bitcoinAddress", value)} />
      <div className="grid gap-4 md:grid-cols-3">
        <TextInput label={isDe ? "Betrag optional" : "Amount (optional)"} value={data.bitcoinAmount} onChange={(value) => update("bitcoinAmount", value)} placeholder="0.001" />
        <TextInput label={isDe ? "Label optional" : "Label (optional)"} value={data.bitcoinLabel} onChange={(value) => update("bitcoinLabel", value)} />
        <TextInput label={isDe ? "Nachricht optional" : "Message (optional)"} value={data.bitcoinMessage} onChange={(value) => update("bitcoinMessage", value)} />
      </div>
    </div>
  );
}
