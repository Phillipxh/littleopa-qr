# QR Code Generator

Professionelle, lokal laufende Web-App zum Erstellen individueller QR-Codes für Links, Texte, Kontakte, WLAN, Events, Standorte, Social Media, Zahlungslinks und mehr.

## Features

- React, TypeScript, Vite und Tailwind CSS
- QR-Code-Rendering mit `qr-code-styling`
- Inhaltstypen: URL, Text, E-Mail, Telefon, SMS, WhatsApp, WLAN, vCard, MeCard, Event, Geo, Social Media, App Store, PayPal, Bitcoin, Datei-Link und Mehrfach-Link
- Live-Vorschau mit Größe, Margin, Error Correction, Farben, Verläufen, Modulformen und QR-Augen-Design
- Logo-Upload für PNG, JPG und SVG mit Größen- und Abstandskontrolle
- 12 Designvorlagen plus zufälliges Design
- Qualitätsprüfung für Kontrast, Inhaltslänge, Logo-Größe und Error Correction
- Downloads als PNG, SVG, JPEG, WebP und PDF
- Lokaler Verlauf der letzten 5 QR-Codes
- JSON-Export und JSON-Import der Einstellungen
- QR-Inhalt und Einstellungen in die Zwischenablage kopieren
- Light/Dark Mode

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

Die App läuft ohne Backend komplett im Browser.

## Build

```bash
npm run build
```

## Verwendete Libraries

- `react`
- `react-dom`
- `vite`
- `typescript`
- `tailwindcss`
- `qr-code-styling`
- `lucide-react`
- `jspdf`

## Statische vs. dynamische QR-Codes

Diese App erzeugt statische QR-Codes. Der codierte Inhalt steckt direkt im QR-Code und kann nach dem Druck nicht zentral geändert werden. Dynamische QR-Codes mit Tracking, Statistiken oder austauschbaren Ziel-URLs benötigen einen Server, eine Datenbank und eine Redirect-Infrastruktur. Diese Funktionen sind bewusst nicht enthalten.

## Hinweise

- Es werden keine Nutzerkonten, kein Tracking und keine Datenbank verwendet.
- Datei- und PDF-QR-Codes codieren nur vorhandene URLs. Es findet kein Datei-Upload statt.
- Zahlungs-QR-Codes verarbeiten keine Zahlungen, sondern codieren nur Zahlungslinks oder URIs.
- Für Social-Media und Inhaltstypen werden neutrale, freie Icons verwendet; offizielle Markenlogos werden nicht als Design-Asset eingebettet.
- Es werden keine Originalassets, Logos, Markeninhalte oder Texte von qrcode-monkey.com verwendet.
