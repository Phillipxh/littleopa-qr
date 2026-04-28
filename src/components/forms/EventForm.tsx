import { TextArea, TextInput } from "./FormControls";
import type { QRFormProps } from "./formTypes";

export function EventForm({ data, language, update }: QRFormProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4">
      <TextInput label={isDe ? "Titel" : "Title"} value={data.eventTitle} onChange={(value) => update("eventTitle", value)} />
      <TextInput label={isDe ? "Ort" : "Location"} value={data.eventLocation} onChange={(value) => update("eventLocation", value)} />
      <TextArea label={isDe ? "Beschreibung" : "Description"} value={data.eventDescription} onChange={(value) => update("eventDescription", value)} rows={4} />
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label={isDe ? "Startdatum und Startzeit" : "Start Date & Time"} value={data.eventStart} onChange={(value) => update("eventStart", value)} type="datetime-local" />
        <TextInput label={isDe ? "Enddatum und Endzeit" : "End Date & Time"} value={data.eventEnd} onChange={(value) => update("eventEnd", value)} type="datetime-local" />
      </div>
    </div>
  );
}
