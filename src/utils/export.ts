import QRCodeStyling from "qr-code-styling";
import { jsPDF } from "jspdf";
import type { QRDesignOptions, QRExportFormat } from "../types";
import { toFileExtension } from "./qrOptions";

export const sanitizeFilename = (value: string): string => {
  const clean = value.trim().replace(/[^\w.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return clean || "qr-code";
};

const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Konnte Bilddaten nicht lesen."));
    };
    reader.onerror = () => reject(new Error("Konnte Bilddaten nicht lesen."));
    reader.readAsDataURL(blob);
  });

export const downloadQRCode = async (
  qrCode: QRCodeStyling,
  format: QRExportFormat,
  fileName: string,
  design: QRDesignOptions,
): Promise<void> => {
  const name = sanitizeFilename(fileName);

  if (format === "pdf") {
    const raw = await qrCode.getRawData("png");
    if (!(raw instanceof Blob)) throw new Error("PDF-Export konnte kein PNG erzeugen.");
    const dataUrl = await blobToDataUrl(raw);
    const padding = 48;
    const docSize = design.size + padding * 2;
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [docSize, docSize + 56] });
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, docSize, docSize + 56, "F");
    pdf.addImage(dataUrl, "PNG", padding, padding, design.size, design.size);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(name, padding, docSize + 16);
    pdf.save(`${name}.pdf`);
    return;
  }

  await qrCode.download({ name, extension: toFileExtension(format) });
};

export const copyToClipboard = async (value: string): Promise<boolean> => {
  if (!navigator.clipboard) return false;
  await navigator.clipboard.writeText(value);
  return true;
};
