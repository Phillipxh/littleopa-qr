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
import { contentTypes } from "./data/contentTypes";
import { defaultFormData, defaultLogo } from "./data/defaults";
import { getExampleData } from "./data/examples";
import { defaultDesign } from "./data/templates";
import type { HistoryItem, QRContentType, QRDesignOptions, QRFormData, QRLogoOptions, StoredSettings } from "./types";
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
});

const normalizeLogo = (logo: QRLogoOptions): QRLogoOptions => ({
  ...defaultLogo,
  ...logo,
  useTypeIcon: Boolean(logo.useTypeIcon),
});

const normalizeSettings = (settings: StoredSettings): StoredSettings => ({
  ...settings,
  logo: normalizeLogo(settings.logo),
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
  const [history, setHistory] = useState<HistoryItem[]>(() => loadHistory());
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  const value = useMemo(() => buildQRValue(contentType, data), [contentType, data]);
  const validation = useMemo(() => validateQRInput(contentType, data), [contentType, data]);
  const resolvedLogo = useMemo(() => resolvePreviewLogo(logo, contentType, design), [logo, contentType, design]);
  const quality = useMemo(() => evaluateQuality(value, design, resolvedLogo, validation), [value, design, resolvedLogo, validation]);
  const [preview, setPreview] = useState<PreviewState>({ value, design, logo: resolvedLogo });

  const settings = useMemo<StoredSettings>(
    () => ({ contentType, data, design, logo, fileName, liveUpdate, darkMode }),
    [contentType, data, design, logo, fileName, liveUpdate, darkMode],
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
    setPreview({ value: buildQRValue(clean.contentType, clean.data), design: clean.design, logo: resolvePreviewLogo(clean.logo, clean.contentType, clean.design) });
  };

  const loadExample = () => {
    setData((current) => getExampleData(contentType, current));
  };

  const addHistoryItem = () => {
    if (!validation.isValid || !value.trim()) return;
    const meta = contentTypes.find((item) => item.id === contentType);
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
          onToggleDarkMode={() => setDarkMode((current) => !current)}
          onLoadExample={loadExample}
          onReset={reset}
          onRandomize={() => setDesign((current) => randomizeDesign(current))}
        />
      }
      left={
        <>
          <ContentTypeSelector value={contentType} onChange={setContentType} />
          <DynamicQRForm type={contentType} data={data} validation={validation} update={updateField} />
          <DesignPanel design={design} onChange={setDesign} />
          <Section eyebrow="4. Logo hinzufügen" title="Logo im QR-Code">
            <LogoUploader logo={logo} contentType={contentType} design={design} onChange={setLogo} />
          </Section>
        </>
      }
      preview={
        <QRPreview
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
