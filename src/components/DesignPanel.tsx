import type { QRDesignOptions } from "../types";
import { ColorPicker } from "./ColorPicker";
import { GradientPicker } from "./GradientPicker";
import { RangeField, SelectField, SwitchField } from "./forms/FormControls";
import { Section } from "./Section";
import { ShapeSelector } from "./ShapeSelector";
import { TemplatePicker } from "./TemplatePicker";

interface DesignPanelProps {
  design: QRDesignOptions;
  onChange: (design: QRDesignOptions) => void;
}

export function DesignPanel({ design, onChange }: DesignPanelProps) {
  return (
    <Section eyebrow="3. Design anpassen" title="Stil, Farben und Scanbarkeit">
      <div className="grid gap-6">
        <TemplatePicker onApply={onChange} />
        <div className="grid gap-4 lg:grid-cols-2">
          <RangeField label="Größe" value={design.size} min={128} max={2048} step={16} unit=" px" onChange={(size) => onChange({ ...design, size })} />
          <RangeField label="Rand" value={design.margin} min={0} max={96} step={2} unit=" px" onChange={(margin) => onChange({ ...design, margin })} />
          <SelectField
            label="Error Correction"
            value={design.errorCorrectionLevel}
            onChange={(errorCorrectionLevel) => onChange({ ...design, errorCorrectionLevel })}
            options={[
              { value: "L", label: "L - niedrig" },
              { value: "M", label: "M - mittel" },
              { value: "Q", label: "Q - hoch" },
              { value: "H", label: "H - sehr hoch" },
            ]}
            hint="Bei Logo ist H empfohlen."
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <ColorPicker label="Vordergrundfarbe" value={design.foregroundColor} onChange={(foregroundColor) => onChange({ ...design, foregroundColor })} />
          <ColorPicker label="Hintergrundfarbe" value={design.backgroundColor} onChange={(backgroundColor) => onChange({ ...design, backgroundColor })} />
          <ColorPicker label="QR-Augen-Farbe" value={design.eyeColor} onChange={(eyeColor) => onChange({ ...design, eyeColor })} />
        </div>
        <SwitchField
          label="Transparenter Hintergrund"
          checked={design.transparentBackground}
          onChange={(transparentBackground) => onChange({ ...design, transparentBackground })}
          hint="Für PNG, SVG und WebP sinnvoll. JPEG hat keinen echten transparenten Hintergrund."
        />
        <GradientPicker value={design.gradient} onChange={(gradient) => onChange({ ...design, gradient })} />
        <ShapeSelector design={design} onChange={onChange} />
      </div>
    </Section>
  );
}
