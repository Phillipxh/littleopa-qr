import type { AppLanguage, QRDesignOptions } from "../types";
import { ColorPicker } from "./ColorPicker";
import { GradientPicker } from "./GradientPicker";
import { RangeField, SelectField, SwitchField } from "./forms/FormControls";
import { Section } from "./Section";
import { ShapeSelector } from "./ShapeSelector";
import { TemplatePicker } from "./TemplatePicker";

interface DesignPanelProps {
  language: AppLanguage;
  design: QRDesignOptions;
  onChange: (design: QRDesignOptions) => void;
}

export function DesignPanel({ language, design, onChange }: DesignPanelProps) {
  const isDe = language === "de";
  return (
    <Section eyebrow={isDe ? "3. Design anpassen" : "3. Customize design"} title={isDe ? "Stil, Farben und Scanbarkeit" : "Style, colors, and scannability"}>
      <div className="grid gap-6">
        <TemplatePicker language={language} onApply={onChange} />
        <div className="grid gap-4 lg:grid-cols-2">
          <RangeField label={isDe ? "Größe" : "Size"} value={design.size} min={128} max={2048} step={16} unit=" px" onChange={(size) => onChange({ ...design, size })} />
          <RangeField label={isDe ? "Rand" : "Margin"} value={design.margin} min={0} max={96} step={2} unit=" px" onChange={(margin) => onChange({ ...design, margin })} />
          <SelectField
            label="Error Correction"
            value={design.errorCorrectionLevel}
            onChange={(errorCorrectionLevel) => onChange({ ...design, errorCorrectionLevel })}
            options={[
              { value: "L", label: isDe ? "L - niedrig" : "L - low" },
              { value: "M", label: isDe ? "M - mittel" : "M - medium" },
              { value: "Q", label: isDe ? "Q - hoch" : "Q - high" },
              { value: "H", label: isDe ? "H - sehr hoch" : "H - very high" },
            ]}
            hint={isDe ? "Bei Logo ist H empfohlen." : "H is recommended when using a logo."}
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <ColorPicker label={isDe ? "Vordergrundfarbe" : "Foreground Color"} value={design.foregroundColor} onChange={(foregroundColor) => onChange({ ...design, foregroundColor })} />
          <ColorPicker label={isDe ? "Hintergrundfarbe" : "Background Color"} value={design.backgroundColor} onChange={(backgroundColor) => onChange({ ...design, backgroundColor })} />
          <ColorPicker label={isDe ? "QR-Augen-Farbe" : "Finder Eye Color"} value={design.eyeColor} onChange={(eyeColor) => onChange({ ...design, eyeColor })} />
        </div>
        <SwitchField
          label={isDe ? "Transparenter Hintergrund" : "Transparent Background"}
          checked={design.transparentBackground}
          onChange={(transparentBackground) => onChange({ ...design, transparentBackground })}
          hint={isDe ? "Für PNG, SVG und WebP sinnvoll. JPEG hat keinen echten transparenten Hintergrund." : "Useful for PNG, SVG, and WebP. JPEG does not support true transparency."}
        />
        <GradientPicker language={language} value={design.gradient} onChange={(gradient) => onChange({ ...design, gradient })} />
        <ShapeSelector language={language} design={design} onChange={onChange} />
      </div>
    </Section>
  );
}
