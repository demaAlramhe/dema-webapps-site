# Dema WebApps – Business Website

Modern, premium, multilingual (Hebrew, Arabic, English) business website for **Dema WebApps**, with RTL/LTR support and an accessibility panel.

## Tech stack

- **React** + **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **lucide-react** icons

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Logo and assets

- **Logo:** Place your Dema WebApps logo at `public/logo.png`. If missing, the site falls back to `public/logo.svg`.
- **Projects:** Add project images under `public/projects/` (e.g. `faten-architect.jpg`, `landing.jpg`, `business.jpg`) or leave as-is to use the gradient placeholder.

## Contact (already wired)

- **Phone:** 0543223106  
- **Email:** demaalramhe@gmail.com  
- **Instagram:** [dema_webapps](https://www.instagram.com/dema_webapps?igsh=MW83cDU0ejZ0NjF2Mg%3D%3D&utm_source=qr)  
- **WhatsApp:** +972543223106  

## Accessibility

The site includes a **floating circular accessibility button** (bottom-left) for users with disabilities. It offers:

- Text size increase / decrease / reset  
- High-contrast toggle  

The button is always visible and indicates that the site supports accessibility needs.

## Language and direction

- **Hebrew (עברית)** – primary, RTL  
- **Arabic (العربية)** – RTL  
- **English (EN)** – LTR  

Language is switched via the header/footer and persisted in `localStorage` (`dema-lang`).

## License

© 2026 Dema WebApps. All rights reserved.
