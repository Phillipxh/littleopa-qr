import type { IconType } from "react-icons";
import { FaBitcoin, FaPaypal, FaWhatsapp } from "react-icons/fa6";
import {
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineDevicePhoneMobile,
  HiOutlineDocument,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineIdentification,
  HiOutlineLink,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineQrCode,
  HiOutlineShare,
  HiOutlineWifi,
} from "react-icons/hi2";
import { SiAppstore } from "react-icons/si";
import type { QRContentType } from "../types";

export const contentTypeIcons: Record<QRContentType, IconType> = {
  url: HiOutlineLink,
  text: HiOutlineDocumentText,
  email: HiOutlineEnvelope,
  phone: HiOutlinePhone,
  sms: HiOutlineChatBubbleLeftEllipsis,
  whatsapp: FaWhatsapp,
  wifi: HiOutlineWifi,
  vcard: HiOutlineIdentification,
  mecard: HiOutlineQrCode,
  event: HiOutlineCalendarDays,
  geo: HiOutlineMapPin,
  social: HiOutlineShare,
  app: SiAppstore,
  payment: FaPaypal,
  crypto: FaBitcoin,
  file: HiOutlineDocument,
  multilink: HiOutlineGlobeAlt,
};

export const contentTypeIconFallback = HiOutlineDevicePhoneMobile;
