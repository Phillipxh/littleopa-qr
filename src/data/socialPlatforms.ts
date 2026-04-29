import type { IconType } from "react-icons";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import type { SocialPlatform } from "../types";

export interface SocialPlatformOption {
  id: SocialPlatform;
  label: string;
  icon: IconType;
  color: string;
  placeholder: string;
}

export const socialPlatforms: SocialPlatformOption[] = [
  { id: "instagram", label: "Instagram", icon: FaInstagram, color: "#E4405F", placeholder: "@littleopa" },
  { id: "facebook", label: "Facebook", icon: FaFacebookF, color: "#1877F2", placeholder: "littleopa" },
  { id: "linkedin", label: "LinkedIn", icon: FaLinkedinIn, color: "#0A66C2", placeholder: "max-muster" },
  { id: "tiktok", label: "TikTok", icon: FaTiktok, color: "#111827", placeholder: "@littleopa" },
  { id: "youtube", label: "YouTube", icon: FaYoutube, color: "#FF0000", placeholder: "@littleopa" },
  { id: "x", label: "X", icon: FaXTwitter, color: "#111827", placeholder: "@littleopa" },
  { id: "github", label: "GitHub", icon: FaGithub, color: "#181717", placeholder: "littleopa" },
];

export const getSocialPlatform = (platform: SocialPlatform): SocialPlatformOption =>
  socialPlatforms.find((item) => item.id === platform) ?? socialPlatforms[0];
