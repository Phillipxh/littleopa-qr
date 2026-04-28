import type { QRFormData } from "../../types";

export type UpdateQRField = <K extends keyof QRFormData>(field: K, value: QRFormData[K]) => void;

export interface QRFormProps {
  data: QRFormData;
  update: UpdateQRField;
}
