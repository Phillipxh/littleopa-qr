import type { AppLanguage, QRGradientOptions } from "../types";
import { ColorPicker } from "./ColorPicker";
import { RangeField, SelectField, SwitchField } from "./forms/FormControls";

interface GradientPickerProps {
  language: AppLanguage;
  value: QRGradientOptions;
  onChange: (value: QRGradientOptions) => void;
}

export function GradientPicker({ language, value, onChange }: GradientPickerProps) {
  const isDe = language === "de";
  return (
    <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
      <SwitchField
        label={isDe ? "Farbverlauf aktivieren" : "Enable Gradient"}
        checked={value.enabled}
        onChange={(enabled) => onChange({ ...value, enabled })}
        hint={isDe ? "Der Verlauf wird auf die QR-Module angewendet." : "The gradient is applied to QR modules."}
      />
      {value.enabled ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <ColorPicker label={isDe ? "Startfarbe" : "Start Color"} value={value.startColor} onChange={(startColor) => onChange({ ...value, startColor })} />
            <ColorPicker label={isDe ? "Endfarbe" : "End Color"} value={value.endColor} onChange={(endColor) => onChange({ ...value, endColor })} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              label={isDe ? "Verlaufstyp" : "Gradient Type"}
              value={value.type}
              onChange={(type) => onChange({ ...value, type })}
              options={[
                { value: "linear", label: "Linear" },
                { value: "radial", label: "Radial" },
              ]}
            />
            <RangeField
              label={isDe ? "Winkel" : "Angle"}
              min={0}
              max={360}
              step={5}
              value={value.rotation}
              unit={isDe ? " Grad" : " deg"}
              onChange={(rotation) => onChange({ ...value, rotation })}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
