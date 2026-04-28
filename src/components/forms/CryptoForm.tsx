import { TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function CryptoForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput label="Bitcoin-Adresse" value={data.bitcoinAddress} onChange={(value) => update("bitcoinAddress", value)} />
      <div className="grid gap-4 md:grid-cols-3">
        <TextInput label="Betrag optional" value={data.bitcoinAmount} onChange={(value) => update("bitcoinAmount", value)} placeholder="0.001" />
        <TextInput label="Label optional" value={data.bitcoinLabel} onChange={(value) => update("bitcoinLabel", value)} />
        <TextInput label="Message optional" value={data.bitcoinMessage} onChange={(value) => update("bitcoinMessage", value)} />
      </div>
    </div>
  );
}
