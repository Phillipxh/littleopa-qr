# QR Code Generator

A professional, fully local web app for creating custom QR codes for links, text, contacts, Wi-Fi, events, locations, social profiles, payment links, and more.

## Features

- React, TypeScript, Vite, and Tailwind CSS
- QR code rendering with `qr-code-styling`
- Content types: URL, Text, Email, Phone, SMS, WhatsApp, Wi-Fi, vCard, MeCard, Event, Geo, Social Media, App Store, PayPal, Bitcoin, File Link, and Multi-Link
- Live preview with size, margin, error correction, colors, gradients, module shapes, and finder-eye design
- Logo upload for PNG, JPG, and SVG with size and margin control
- 12 design templates plus random design generation
- Quality checks for contrast, content length, logo size, and error correction
- Downloads as PNG, SVG, JPEG, WebP, and PDF
- Local history of the last 5 QR codes
- JSON export and JSON import for settings
- Copy QR content and settings to clipboard
- Light/Dark mode

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app runs entirely in the browser without a backend.

## Build

```bash
npm run build
```

## Libraries Used

- `react`
- `react-dom`
- `vite`
- `typescript`
- `tailwindcss`
- `qr-code-styling`
- `lucide-react`
- `jspdf`

## Static vs Dynamic QR Codes

This app creates static QR codes. The encoded content is embedded directly in the QR code and cannot be changed centrally after printing. Dynamic QR codes with tracking, analytics, or replaceable target URLs require a server, a database, and redirect infrastructure. Those features are intentionally not included.

## Notes

- No user accounts, tracking, or database are used.
- File/PDF QR codes encode existing URLs only. No file upload is performed.
- Payment QR codes do not process payments; they only encode payment links or URIs.
- For social media and content types, neutral free icons are used; official brand logos are not embedded as design assets.
- No original assets, logos, brand content, or text from qrcode-monkey.com are used.
