# The Ability People (TAP) — React Website

A React rebuild of the TAP website, covering the 13 pages from your requirement plan, styled with
Tailwind CSS and built with Vite + React Router.

## Pages included

1. Home (`/`)
2. About (`/about`) — includes Overview, Vision/Mission/Values, History, Team, Board & Governance tabs
3. Our Work (`/our-work`) — hub page linking to the four programme-area pages below
4. Rehab Therapy Services — Ability PMR Services (`/rehab-therapy`)
5. Rehab Aids & Appliances — Ability AT Services (`/rehab-aids`)
6. Outreach Independent Living Program (`/outreach`)
7. Short/Long-term In-Patient Services (`/inpatient-services`)
8. National Trust Services (`/national-trust`)
9. Sponsors (`/sponsors`)
10. Partners & Memberships (`/partners`)
11. Media (`/media`)
12. Donate or Get Involved (`/donate`)
13. Contact Us (`/contact`)

A bonus **Volunteer & Careers** page (`/join-us`) is included since it's linked from the header,
footer and Donate page CTAs — remove it if you don't need it yet.

## Getting started

```bash
npm install
npm run dev        # local dev server, usually http://localhost:5173
npm run build       # production build -> outputs to /dist
npm run preview     # preview the production build locally
```

## Project structure

```
src/
  components/
    ui.jsx        - shared building blocks (Button, Card, Photo, Tabs, PageHero, CTABand, etc.)
    Header.jsx     - sticky nav with accessibility toolbar and Our Work dropdown
    Footer.jsx
    Layout.jsx     - wraps every page with Header + Footer via React Router's <Outlet />
  pages/           - one file per page, listed above
  App.jsx          - route definitions
  index.css        - Tailwind + font imports + a couple of custom motifs (topo texture, wheel-track rule)
tailwind.config.js - design tokens (colors, fonts, shadows) - single place to retheme
```

## Design notes

- Color and type system carries over your existing teal / gold / cream palette (see
  `tailwind.config.js`), paired with Fraunces (display) and Manrope (body).
- All photos are placeholder blocks (`<Photo />` in `ui.jsx`) with descriptive `aria-label`s —
  swap in real photography by replacing that component's usage with `<img>` tags, or extend
  `Photo` to accept a `src` prop.
- The accessibility toolbar (font size +/-, high-contrast toggle) and keyboard focus states carry
  over from your original prototype.
## Secure Contact Integration

The contact form on `/contact` uses client-side field-level encryption (**AES-256-GCM**) via the Web Crypto API before posting submissions to the dedicated `backend` Next.js service.

### Environment Variables

Configure `.env` in `tap-website`:

```ini
# Backend Endpoint
VITE_CONTACT_API_URL=http://localhost:3000

# Shared AES-256-GCM Encryption Key (Must match backend's ENCRYPTION_KEY exactly)
# NOTE: VITE_ENCRYPTION_KEY ships in the browser bundle and is not secret.
# It guards against passive network inspection, not a determined attacker reading the JS bundle.
VITE_ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

### Local Testing

1. Start the Next.js backend service:
   ```bash
   cd backend
   npm run dev   # runs on http://localhost:3000
   ```
2. Start the Vite React frontend:
   ```bash
   cd tap-website
   npm run dev   # runs on http://localhost:5173
   ```
3. Navigate to `http://localhost:5173/contact`, fill out the form, and click **Send message**.
4. The frontend encrypts `{ name, email, phone, subject, message, honeypot }` using Web Crypto API into `{ iv, ciphertext, authTag }` and posts it to `http://localhost:3000/api/contact`.
5. Upon successful backend decryption & verification, an email will be dispatched via Nodemailer SMTP.

