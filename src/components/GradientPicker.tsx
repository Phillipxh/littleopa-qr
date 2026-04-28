import type { QRGradientOptions } from "../types";
import { ColorPicker } from "./ColorPicker";
import { RangeField, SelectField, SwitchField } from "./forms/FormControls";

interface GradientPickerProps {
  value: QRGradientOptions;
  onChange: (value: QRGradientOptions) => void;
}

export function GradientPicker({ value, onChange }: GradientPickerProps) {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
      <SwitchField
        label="Farbverlauf aktivieren"
        checked={value.enabled}
        onChange={(enabled) => onChange({ ...value, enabled })}
        hint="Der Verlauf wird auf die QR-Module angewendet."
      />
      {value.enabled ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <ColorPicker label="Startfarbe" value={value.startColor} onChange={(startColor) => onChange({ ...value, startColor })} />
            <ColorPicker label="Endfarbe" value={value.endColor} onChange={(endColor) => onChange({ ...value, endColor })} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              label="Verlaufstyp"
              value={value.type}
              onChange={(type) => onChange({ ...value, type })}
              options={[
                { value: "linear", label: "Linear" },
                { value: "radial", label: "Radial" },
              ]}
            />
            <RangeField
              label="Winkel"
              min={0}
              max={360}
              step={5}
              value={value.rotation}
              unit=" Grad"
              onChange={(rotation) => onChange({ ...value, rotation })}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
