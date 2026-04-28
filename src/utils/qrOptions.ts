import type { CornerDotType, CornerSquareType, DotType, FileExtension, Options } from "qr-code-styling";
import type { QRDesignOptions, QRExportFormat, QRLogoOptions } from "../types";

const mapDotType = (value: QRDesignOptions["moduleStyle"]): DotType => value;
const mapCornerSquareType = (value: QRDesignOptions["eyeOuterStyle"]): CornerSquareType => value;
const mapCornerDotType = (value: QRDesignOptions["eyeInnerStyle"]): CornerDotType => value;

const transparentPixel = "rgba(255,255,255,0)";

export const toFileExtension = (format: QRExportFormat): FileExtension => {
  if (format === "pdf") return "png";
  return format;
};

export const createQRCodeOptions = (
  value: string,
  design: QRDesignOptions,
  logo: QRLogoOptions,
  size = design.size,
): Partial<Options> => {
  const gradient = design.gradient.enabled
    ? {
        type: design.gradient.type,
        rotation: (design.gradient.rotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: design.gradient.startColor },
          { offset: 1, color: design.gradient.endColor },
        ],
      }
    : undefined;

  return {
    type: "svg",
    width: size,
    height: size,
    margin: design.margin,
    data: value || " ",
    image: logo.image ?? "",
    qrOptions: {
      errorCorrectionLevel: design.errorCorrectionLevel,
    },
    imageOptions: {
      imageSize: logo.imageSize,
      margin: logo.margin,
      hideBackgroundDots: logo.hideBackgroundDots,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      type: mapDotType(design.moduleStyle),
      color: design.gradient.enabled ? undefined : design.foregroundColor,
      gradient,
      roundSize: true,
    },
    cornersSquareOptions: {
      type: mapCornerSquareType(design.eyeOuterStyle),
      color: design.eyeColor,
    },
    cornersDotOptions: {
      type: mapCornerDotType(design.eyeInnerStyle),
      color: design.eyeColor,
    },
    backgroundOptions: {
      color: design.transparentBackground ? transparentPixel : design.backgroundColor,
    },
  };
};
