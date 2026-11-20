# Svelte Base

**English** | [日本語](./README.ja.md)

A portfolio and blog site built with **SvelteKit 3**, **Svelte 5**, **TypeScript** and **microCMS**.
Articles are fetched from microCMS at build time and prerendered as static HTML, so pages load fast and put almost no load on the server.

The page is designed as a mountain climb: you start at the foot (Hero) and scroll up to the summit (Contact), with an altimeter on the side showing where you are.

## Features

- **Prerendered blog** – the top page and every article page are generated at build time from microCMS
- **Scroll-driven hero** – a sticky stage zooms into the mountain, splits the title and rises into fog
- **Loading curtain** – a yellow curtain lifts in the shape of a mountain ridge (first visit only)
- **Altimeter** – scroll progress from Hero to Contact (wide screens)
- **Skills filter** – filter by category, with links to demos built with the same microCMS content
- **Contact form** – [felte](https://felte.dev/) validation, reCAPTCHA v3 and email delivery via [Nodemailer](https://nodemailer.com/)
- **Accessible** – keyboard-friendly menu, `aria-*` states, and `prefers-reduced-motion` support

## Tech stack

| Area      | Tools                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------- |
| Framework | [SvelteKit 3](https://svelte.dev/docs/kit) / [Svelte 5](https://svelte.dev/docs/svelte) (Runes) |
| Language  | [TypeScript 6](https://www.typescriptlang.org/)                                                |
| Styling   | [Sass](https://sass-lang.com/) (split into partials)                                           |
| Content   | [microCMS](https://microcms.io/) + [microcms-js-sdk](https://github.com/microcmsio/microcms-js-sdk) |
| Forms     | [felte](https://felte.dev/), [reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3), [Nodemailer](https://nodemailer.com/) |
| Hosting   | [Vercel](https://vercel.com/) ([@sveltejs/adapter-vercel](https://svelte.dev/docs/kit/adapter-vercel)) |

## Getting started

Requires **Node.js 24**.

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

Open <http://localhost:5173>.

### Environment variables

Variables are declared and validated in [`src/env.ts`](./src/env.ts) and imported from `$app/env/private`.

| Name                      | Required | Description                                               |
| ------------------------- | -------- | --------------------------------------------------------- |
| `MICROCMS_SERVICE_DOMAIN` | Yes      | The `xxx` in `xxx.microcms.io`                            |
| `MICROCMS_API_KEY`        | Yes      | microCMS API key                                          |
| `CONTACT_TO_EMAIL`        | –        | Address that receives contact form submissions            |
| `SMTP_HOST`               | –        | SMTP host (default: `smtp.gmail.com`)                     |
| `SMTP_PORT`               | –        | SMTP port (default: `465`)                                |
| `SMTP_USER`               | –        | SMTP user                                                 |
| `SMTP_PASS`               | –        | SMTP password (e.g. a Gmail app password)                 |
| `RECAPTCHA_SECRET_KEY`    | –        | reCAPTCHA v3 secret key. When unset, verification is skipped |

The reCAPTCHA **site key** is set in [`src/components/Contact.svelte`](./src/components/Contact.svelte).

### microCMS schema

Create a list API with the endpoint `blogs`:

| Field ID   | Type                                     |
| ---------- | ---------------------------------------- |
| `title`    | Text                                     |
| `content`  | Rich editor                              |
| `eyecatch` | Image (optional)                         |
| `category` | Content reference (`name` field)         |

The top page lists the three latest posts in the `Svelte` category.

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the dev server                |
| `npm run build`   | Build and prerender for production  |
| `npm run preview` | Preview the production build        |
| `npm run check`   | Type-check with `svelte-check`      |

## Project structure

```text
src/
├── env.ts                # Environment variable definitions
├── components/           # Loading, Header, Hero, About, Skills, Blog, Contact, Footer, Altimeter
├── lib/                  # microCMS client, reveal action, motion & date helpers (imported via #lib)
├── routes/
│   ├── +page.svelte      # Top page
│   ├── [slug]/           # Article page
│   ├── api/contact/      # Contact form endpoint
│   ├── thanks/ error/    # Result pages
└── styles/
    ├── style.scss        # Entry point
    ├── abstracts/        # Breakpoint mixins
    ├── base/             # Tokens, reset, utilities
    ├── components/       # Button, chip, heading
    ├── layout/           # Header, section, footer
    ├── features/         # Loading, altimeter
    ├── sections/         # Top page sections
    └── pages/            # Article and result pages
```

## Deployment

The project uses [`@sveltejs/adapter-vercel`](https://svelte.dev/docs/kit/adapter-vercel) with the `nodejs24.x` runtime (configured in [`vite.config.ts`](./vite.config.ts)).
Set the environment variables in your Vercel project. To publish new articles automatically, add a microCMS webhook that triggers a Vercel deploy hook.

## Related demos

The same microCMS content built with other frameworks:

- [Astro](https://astrobase.vercel.app/)
- [Next.js](https://next-tech-trigger.vercel.app/)
- [Nuxt](https://nuxtbase-gsap.vercel.app/)
