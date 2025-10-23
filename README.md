# 🎓 GDG ID Platform

Modern digital ID generation for Google Developer Groups (GDG), built with Next.js, TypeScript, Tailwind, Firebase, and Google Cloud.

## Table of Contents

- About
- Features
- Tech Stack
- Getting Started
- Environment Variables
- Project Structure
- API Routes
- Security & Anti‑Spam
- Development Workflow
- Troubleshooting
- Important Links

---

## About

The GDG ID Platform lets members search for their profile (via email), render a branded digital ID card on the client (HTML canvas), and download it as PNG or PDF. Admins can review contact form submissions and manage platform content through protected routes.

Highlights:

- Smart email search against a Google Sheet
- Beautiful GDG-themed ID card rendering (Canvas)
- One‑click download as PNG or PDF
- Admin endpoints protected with Firebase Admin Auth and rate limits
- Responsive, mobile‑first UI with Tailwind CSS

---

## Features

Member-facing:

- Email-based lookup with instant feedback (SearchForm)
- Digital ID preview (Canvas-based) with member details
- Download ID as PNG or PDF (jsPDF)

Admin/Platform:

- Contact form backed by Firestore + email notification to admins
- Admin-only APIs (messages listing, mark done/not-done, delete)
- Role-based access (Firebase Admin) and request rate limiting

DX:

- TypeScript-first codebase with strict types
- Organized app router structure and modular libs

---

## Tech Stack

Organized by category. All badges link to the official docs.

### Core

<p>
	<a href="https://nextjs.org/" target="_blank"><img alt="Next.js 15" src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" /></a>
	<a href="https://react.dev/" target="_blank"><img alt="React 19" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" /></a>
	<a href="https://www.typescriptlang.org/" target="_blank"><img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /></a>
	<a href="https://tailwindcss.com/" target="_blank"><img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /></a>
</p>

### UI / Animations

<p>
	<a href="https://www.framer.com/motion/" target="_blank"><img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" /></a>
	<a href="https://lucide.dev/" target="_blank"><img alt="Lucide Icons" src="https://img.shields.io/badge/Lucide_Icons-latest-18181B?style=for-the-badge&logo=lucide&logoColor=white" /></a>
	<a href="https://react-icons.github.io/react-icons/" target="_blank"><img alt="React Icons" src="https://img.shields.io/badge/React_Icons-5.5-61DAFB?style=for-the-badge&logo=react&logoColor=white" /></a>
	<a href="https://github.com/pacocoursey/next-themes" target="_blank"><img alt="next-themes" src="https://img.shields.io/badge/next--themes-latest-000000?style=for-the-badge&logo=next.js&logoColor=white" /></a>
</p>

### Data & Auth

<p>
	<a href="https://firebase.google.com/docs/web/setup" target="_blank"><img alt="Firebase Client" src="https://img.shields.io/badge/Firebase-Client-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" /></a>
	<a href="https://firebase.google.com/docs/admin/setup" target="_blank"><img alt="Firebase Admin" src="https://img.shields.io/badge/Firebase-Admin-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" /></a>
	<a href="https://firebase.google.com/docs/firestore" target="_blank"><img alt="Firestore" src="https://img.shields.io/badge/Firestore-NoSQL-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" /></a>
	<a href="https://tanstack.com/query/latest" target="_blank"><img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" /></a>
	<a href="https://github.com/pmndrs/zustand" target="_blank"><img alt="Zustand" src="https://img.shields.io/badge/Zustand-Store-7F5A83?style=for-the-badge" /></a>
</p>

### Email & Docs

<p>
	<a href="https://developers.google.com/gmail/api" target="_blank"><img alt="Google APIs (Gmail)" src="https://img.shields.io/badge/Google_APIs-Gmail-4285F4?style=for-the-badge&logo=google&logoColor=white" /></a>
	<a href="https://github.com/parallax/jsPDF" target="_blank"><img alt="jsPDF" src="https://img.shields.io/badge/jsPDF-3.0.3-CC0000?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" /></a>
</p>

### Security & Middleware

<p>
	<a href="https://github.com/animir/node-rate-limiter-flexible" target="_blank"><img alt="rate-limiter-flexible" src="https://img.shields.io/badge/rate--limiter--flexible-8.1.0-4B5563?style=for-the-badge" /></a>
</p>

---

## Getting Started

Prerequisites:

- Node.js 18+
- npm (or yarn/pnpm)

Install and run:

```bash
git clone https://github.com/SauceCode01/gdg-id-platform.git
cd gdg-id-platform
npm install
npm run dev
```

Visit http://localhost:3000

---

## Environment Variables

Create a `.env.local` in the project root with the following keys. Only include real secrets locally or in your deployment platform settings.

Firebase (client):

```
NEXT_PUBLIC_APIKEY=
NEXT_PUBLIC_AUTHDOMAIN=
NEXT_PUBLIC_PROJECTID=
NEXT_PUBLIC_STORAGEBUCKET=
NEXT_PUBLIC_MESSAGINGSENDERID=
NEXT_PUBLIC_APPID=
NEXT_PUBLIC_MEASUREMENTID=
```

Firebase Admin (server):

```
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=   # escape newlines as \n
```

Google APIs (Gmail for contact notifications):

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
ADMIN_EMAIL=
```

Google Sheet (for members lookup):

```
NEXT_PUBLIC_SHEET_ID=
```

---

## Project Structure

```
public/
	cards/, contributors/, sites/ …      # static assets
src/
	app/
		api/                               # API routes (Next.js App Router)
			members/route.ts                 # GET member by email (Google Sheet)
			messages/route.ts                # POST contact, GET messages (admin)
			users/[uid]/route.ts             # Admin fetch user by UID
		ids/                               # ID generation page (canvas)
		contacts/, faqs/, about/, admin/   # site pages
	components/                          # UI components (Button, SearchForm, etc.)
	lib/
		firebase/                          # client + admin SDK setup
		gcp/                               # gmail API auth
		server/                            # rate limiter, server utils
	providers/, stores/, types/          # app context, state, types
```

---

## API Routes

Public / Member:

- `GET /api/members?email=you@example.com` → looks up a member row from Google Sheets

Contact / Messages:

- `POST /api/messages` → create a message (rate-limited), sends email to admin
- `GET /api/messages` → list messages (admin only)
- `PUT /api/messages/[id]/done` → mark as done (admin)
- `PUT /api/messages/[id]/notDone` → mark as not done (admin)
- `DELETE /api/messages/[id]/delete` → delete (admin)

Users (Admin):

- `GET /api/users/[uid]` → fetch a user’s data by UID (admin)

All admin endpoints require a valid authenticated admin context (see `lib/server/serverUtils.ts`).

---

## Security & Anti‑Spam

- Request throttling with `rate-limiter-flexible` (per-IP limits)
- Firebase Admin Auth checks on admin endpoints
- Server-side validation on API routes
- Recommended extras (optional):
  - reCAPTCHA on public forms
  - Honeypot field on contact form

---

## Development Workflow

1. Start from the latest `dev` branch

```bash
git checkout dev
git pull origin dev
```

2. Create a feature branch from dev

```bash
git checkout -b tix-123
```

3. Commit with the ticket number

```bash
git add .
git commit -m "#123 Short, clear message"
```

4. Rebase/pull latest dev, resolve conflicts, and push

```bash
git pull origin dev
git push origin tix-123
```

5. Open a PR into `dev`, document changes, include issue number in the title

---

## Troubleshooting

- Firebase Admin auth errors → verify `FIREBASE_*` env vars and private key formatting (`\n` newlines)
- Gmail send failures → check `GOOGLE_*` creds and `ADMIN_EMAIL`
- Members search returns 500 → confirm `NEXT_PUBLIC_SHEET_ID` and that the sheet is publicly readable (or adjust access)
- Canvas export empty → ensure images under `public/cards` are reachable and member data is loaded

---

## Important Links

- Project Docs (SharePoint): https://docs.google.com/document/d/1l0axPJebnxow9CICbYZriG0nRyFmppqw_EEhaPnGD4o/edit?tab=t.0
- Figma Design: https://www.figma.com/design/4JbaxIFjz3y6CQTddMWfUd/GDG--26?node-id=482-599
- Issues: https://github.com/SauceCode01/gdg-id-platform/issues

---

Made with ❤️ by the GDG team.
