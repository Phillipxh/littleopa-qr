import type { AppLanguage, QRFormData } from "../../types";

export type UpdateQRField = <K extends keyof QRFormData>(field: K, value: QRFormData[K]) => void;

export interface QRFormProps {
  data: QRFormData;
  language: AppLanguage;
  update: UpdateQRField;
}
