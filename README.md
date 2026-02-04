# HIS — Hypospadias E-Video Journal — Demo Repository

<div align="center">

**Open-access scientific e-video journal for hypospadias research & education**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## Demo repository notice

This repository is a **demo version** of the HIS (Hypospadias E-Video Journal) project, published for portfolio and demonstration purposes.

- **Not the full production codebase** — Some features, API integrations, and sensitive logic have been removed or simplified for privacy and security.
- **Content may differ** — Sample or placeholder content may be used in place of live data and assets.
- **Full project** — To see the complete application and full feature set, use the link below.

### See the full project

**[🔗 View the full HIS project →](https://hypospadias-journals.com/)**

---

## About the project

**HIS** (Hypospadias E-Video Journal) is the official e-video journal of the **Hypospadias International Society**. It promotes scientific and evidence-based clinical and basic science research in the field of hypospadias. The platform is **open access** and aims to spread scientific knowledge worldwide.

This demo includes the core structure, UI components, and main pages to illustrate the architecture and stack used in the full project: video discovery, categories, editorial board, user auth, profile, upload flows, and guideline publications.

---

## Tech stack

| Category           | Technologies                                                                 |
| ------------------ | ---------------------------------------------------------------------------- |
| **Framework**      | Next.js 15 (App Router), React 19                                            |
| **Language**       | TypeScript                                                                   |
| **Styling**        | Tailwind CSS 4                                                               |
| **UI**             | Radix UI, shadcn/ui–style components, Lucide icons                            |
| **State & data**   | TanStack Query, React Hook Form, Zod                                         |
| **Auth**           | NextAuth.js v5                                                               |
| **Rich text**      | Tiptap                                                                       |
| **Media**          | media-chrome, Resumable.js (chunked uploads), DOMPurify                       |
| **Other**          | date-fns, react-day-picker, Sonner, cmdk, country-data-list, react-dropzone  |

---

## Project structure (high level)

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Login, sign-up, forget/reset password
│   ├── (root)/                 # Main app pages
│   │   ├── _components/        # Home (Hero, FeaturedVideos, RecentlyAdded, etc.)
│   │   ├── about-his/          # About the journal
│   │   ├── categories/         # Video categories & filters
│   │   ├── contact-us/
│   │   ├── editorial-board/
│   │   ├── favorites/          # Bookmarked videos
│   │   ├── featured-videos/
│   │   ├── guideline-publications/
│   │   ├── media/[mediaId]/    # Video detail & comments
│   │   ├── notifications/
│   │   ├── profile/            # Profile, my-videos, upload, password, help
│   │   ├── privacy-policy/
│   │   └── video/[serialNumberId]/
│   └── api/                    # API routes (auth, categories, comments, video upload, search)
├── components/
│   ├── layout/                 # NavBar, Footer
│   ├── ui/                     # Reusable UI primitives (shadcn-style)
│   ├── shared/                 # ParserHTMLRenderer, SecureVideoPlayer, modals, etc.
│   ├── toolbars/               # Rich text toolbar (Tiptap)
│   └── features/
├── lib/
│   ├── apis/                   # API clients (video, categories, notifications, profile)
│   ├── actions/                # Server actions (auth, likes, bookmarks, comments, etc.)
│   ├── schemas/                # Zod schemas
│   ├── types/                  # TypeScript types
│   ├── constants/              # Nav links, editorial board, footer, etc.
│   └── utils/
├── hooks/                      # Custom hooks (video like/bookmark, upload, search, etc.)
├── providers/                  # React Query, etc.
└── middleware.ts               # Auth & routing
```

---

## What’s included in this demo

- Next.js 15 App Router and project structure
- Auth flows (login, sign-up, forget/reset password) — structure only; backend may be stubbed or removed
- Video discovery: featured videos, recently added, categories with filters (year/month)
- Editorial board and guideline publications pages
- User profile, my videos, and upload flow (form + chunked upload structure)
- Video detail page with comments, likes, and bookmarks
- Notifications and favorites (bookmarks)
- Reusable UI components and layout (navbar, footer)
- Rich text editing (Tiptap) and secure video playback
- Responsive layout and Tailwind-based styling

Some features, API integrations, and content have been **omitted or simplified** in this repo. The link at the top of this README points to the full project where you can see the complete experience.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

