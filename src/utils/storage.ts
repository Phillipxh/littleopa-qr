import type { HistoryItem, StoredSettings } from "../types";

const settingsKey = "qr-generator-settings";
const historyKey = "qr-generator-history";

export const loadSettings = (): StoredSettings | null => {
  try {
    const raw = localStorage.getItem(settingsKey);
    if (!raw) return null;
    return JSON.parse(raw) as StoredSettings;
  } catch {
    return null;
  }
};

export const saveSettings = (settings: StoredSettings): void => {
  try {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  } catch {
    // Storage can be unavailable in private browser contexts.
  }
};

export const loadHistory = (): HistoryItem[] => {
  try {
    const raw = localStorage.getItem(historyKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryItem[]) : [];
  } catch {
    return [];
  }
};

export const saveHistory = (history: HistoryItem[]): void => {
  try {
    localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 5)));
  } catch {
    // Ignore quota issues; history is a convenience feature.
  }
};
