import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function EventForm({ data, update }: QRFormProps) {
  return (
    <div className="grid gap-4">
      <TextInput label="Titel" value={data.eventTitle} onChange={(value) => update("eventTitle", value)} />
      <TextInput label="Ort" value={data.eventLocation} onChange={(value) => update("eventLocation", value)} />
      <TextArea label="Beschreibung" value={data.eventDescription} onChange={(value) => update("eventDescription", value)} rows={4} />
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Startdatum und Startzeit" value={data.eventStart} onChange={(value) => update("eventStart", value)} type="datetime-local" />
        <TextInput label="Enddatum und Endzeit" value={data.eventEnd} onChange={(value) => update("eventEnd", value)} type="datetime-local" />
      </div>
    </div>
  );
}
