import QRCodeStyling from "qr-code-styling";
import { useEffect, useMemo, useRef, useState } from "react";
import { ContentTypeSelector } from "./components/ContentTypeSelector";
import { DesignPanel } from "./components/DesignPanel";
import { DownloadButtons } from "./components/DownloadButtons";
import { DynamicQRForm } from "./components/DynamicQRForm";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { LogoUploader } from "./components/LogoUploader";
import { QRPreview } from "./components/QRPreview";
import { Section } from "./components/Section";
import type { UpdateQRField } from "./components/forms/formTypes";
import { getContentTypes } from "./data/contentTypes";
import { defaultFormData, defaultLogo } from "./data/defaults";
import { getExampleData } from "./data/examples";
import { defaultDesign } from "./data/templates";
import type { AppLanguage, HistoryItem, QRContentType, QRDesignOptions, QRFormData, QRLogoOptions, StoredSettings } from "./types";
import { buildQRValue, validateQRInput } from "./utils/qrBuilders";
import { evaluateQuality } from "./utils/quality";
import { randomizeDesign } from "./utils/random";
import { loadHistory, loadSettings, saveHistory, saveSettings } from "./utils/storage";
import { resolveLogoForType } from "./utils/typeIcon";

interface PreviewState {
  value: string;
  design: QRDesignOptions;
  logo: QRLogoOptions;
}

const freshSettings = (): StoredSettings => ({
  contentType: "url",
  data: defaultFormData,
  design: defaultDesign,
  logo: { ...defaultLogo },
  fileName: "qr-code",
  liveUpdate: true,
  darkMode: false,
  language: "en",
});

const normalizeLogo = (logo: QRLogoOptions): QRLogoOptions => ({
  ...defaultLogo,
  ...logo,
  useTypeIcon: Boolean(logo.useTypeIcon),
});

const normalizeSettings = (settings: StoredSettings): StoredSettings => ({
  ...settings,
  logo: normalizeLogo(settings.logo),
  language: settings.language === "en" ? "en" : "de",
});

const resolvePreviewLogo = (logo: QRLogoOptions, type: QRContentType, design: QRDesignOptions): QRLogoOptions =>
  resolveLogoForType(logo, type, design.eyeColor || design.foregroundColor);

function App() {
  const initial = useMemo(() => normalizeSettings(loadSettings() ?? freshSettings()), []);
  const [contentType, setContentType] = useState<QRContentType>(initial.contentType);
  const [data, setData] = useState<QRFormData>(initial.data);
  const [design, setDesign] = useState<QRDesignOptions>(initial.design);
  const [logo, setLogo] = useState<QRLogoOptions>(initial.logo);
  const [fileName, setFileName] = useState(initial.fileName || "qr-code");
  const [liveUpdate, setLiveUpdate] = useState(initial.liveUpdate);
  const [darkMode, setDarkMode] = useState(initial.darkMode);
  const [language, setLanguage] = useState<AppLanguage>(initial.language);
  const [history, setHistory] = useState<HistoryItem[]>(() => loadHistory());
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  const value = useMemo(() => buildQRValue(contentType, data), [contentType, data]);
  const validation = useMemo(() => validateQRInput(contentType, data, language), [contentType, data, language]);
  const resolvedLogo = useMemo(() => resolvePreviewLogo(logo, contentType, design), [logo, contentType, design]);
  const quality = useMemo(() => evaluateQuality(value, design, resolvedLogo, validation, language), [value, design, resolvedLogo, validation, language]);
  const [preview, setPreview] = useState<PreviewState>({ value, design, logo: resolvedLogo });

  const settings = useMemo<StoredSettings>(
    () => ({ contentType, data, design, logo, fileName, liveUpdate, darkMode, language }),
    [contentType, data, design, logo, fileName, liveUpdate, darkMode, language],
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handle = window.setTimeout(() => saveSettings(settings), 250);
    return () => window.clearTimeout(handle);
  }, [settings]);

  useEffect(() => {
    if (liveUpdate) setPreview({ value, design, logo: resolvedLogo });
  }, [value, design, resolvedLogo, liveUpdate]);

  const updateField: UpdateQRField = (field, nextValue) => {
    setData((current) => ({ ...current, [field]: nextValue }));
  };

  const refreshPreview = () => setPreview({ value, design, logo: resolvedLogo });

  const reset = () => {
    const clean = freshSettings();
    setContentType(clean.contentType);
    setData(clean.data);
    setDesign(clean.design);
    setLogo(clean.logo);
    setFileName(clean.fileName);
    setLiveUpdate(clean.liveUpdate);
    setDarkMode(clean.darkMode);
    setLanguage(clean.language);
    setPreview({ value: buildQRValue(clean.contentType, clean.data), design: clean.design, logo: resolvePreviewLogo(clean.logo, clean.contentType, clean.design) });
  };

  const loadExample = () => {
    setData((current) => getExampleData(contentType, current));
  };

  const addHistoryItem = () => {
    if (!validation.isValid || !value.trim()) return;
    const meta = getContentTypes(language).find((item) => item.id === contentType);
    const item: HistoryItem = {
      id: `${Date.now()}`,
      title: `${meta?.label ?? "QR"} · ${fileName || "qr-code"}`,
      value,
      contentType,
      data,
      design,
      logo: { ...logo, image: null },
      fileName,
      createdAt: new Date().toISOString(),
    };
    setHistory((current) => {
      const next = [item, ...current.filter((entry) => entry.value !== value)].slice(0, 5);
      saveHistory(next);
      return next;
    });
  };

  const loadHistoryItem = (item: HistoryItem) => {
    const nextLogo = normalizeLogo(item.logo);
    setContentType(item.contentType);
    setData(item.data);
    setDesign(item.design);
    setLogo(nextLogo);
    setFileName(item.fileName);
    setPreview({ value: item.value, design: item.design, logo: resolvePreviewLogo(nextLogo, item.contentType, item.design) });
  };

  const importSettings = (next: StoredSettings) => {
    const normalized = normalizeSettings(next);
    setContentType(normalized.contentType);
    setData(normalized.data);
    setDesign(normalized.design);
    setLogo(normalized.logo);
    setFileName(normalized.fileName || "qr-code");
    setLiveUpdate(normalized.liveUpdate);
    setDarkMode(normalized.darkMode);
    setLanguage(normalized.language);
    setPreview({
      value: buildQRValue(normalized.contentType, normalized.data),
      design: normalized.design,
      logo: resolvePreviewLogo(normalized.logo, normalized.contentType, normalized.design),
    });
  };

  return (
    <Layout
      header={
        <Header
          darkMode={darkMode}
          language={language}
          onToggleDarkMode={() => setDarkMode((current) => !current)}
          onLanguageChange={setLanguage}
          onLoadExample={loadExample}
          onReset={reset}
          onRandomize={() => setDesign((current) => randomizeDesign(current))}
        />
      }
      left={
        <>
          <ContentTypeSelector language={language} value={contentType} onChange={setContentType} />
          <DynamicQRForm type={contentType} data={data} language={language} validation={validation} update={updateField} />
          <DesignPanel language={language} design={design} onChange={setDesign} />
          <Section eyebrow={language === "de" ? "4. Logo hinzufügen" : "4. Add logo"} title={language === "de" ? "Logo im QR-Code" : "Logo in QR code"}>
            <LogoUploader language={language} logo={logo} contentType={contentType} design={design} onChange={setLogo} />
          </Section>
        </>
      }
      preview={
        <QRPreview
          language={language}
          value={preview.value}
          design={preview.design}
          logo={preview.logo}
          liveUpdate={liveUpdate}
          onLiveUpdateChange={setLiveUpdate}
          onRefresh={refreshPreview}
          qrCodeRef={qrCodeRef}
        />
      }
      bottomBar={
        <DownloadButtons
          language={language}
          qrCodeRef={qrCodeRef}
          design={preview.design}
          validation={validation}
          quality={quality}
          fileName={fileName}
          value={value}
          onFileNameChange={setFileName}
          onDownloaded={addHistoryItem}
          history={history}
          onLoadHistory={loadHistoryItem}
          onClearHistory={() => {
            setHistory([]);
            saveHistory([]);
          }}
          settings={settings}
          onImportSettings={importSettings}
        />
      }
    />
  );
}

export default App;
