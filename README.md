# AKEXO — Solo AI Dev Studio

A high-end portfolio + landing site for AKEXO, a solo AI developer who builds
websites, apps, AI tools, and automations for clients.

**Live:** deploy with Vercel — auto-detects Vite.

---

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for scroll-triggered + entrance animations
- [Lucide React](https://lucide.dev/) for icons
- Pure-canvas particle grid background (no extra libraries)

## Design system

- Background: `#030303` (near-black)
- Single accent: `#00FF41` (matrix green)
- Typography: `Anton` (display) + `Bricolage Grotesque` (body) + `JetBrains Mono` (technical)
- Glassmorphism cards, dotted particle field, perspective grid floor, scanline overlay

## Sections

1. **Hero** — full-screen, animated typing headline, dual CTA, particle grid
2. **Tech marquee** — auto-scrolling stack ribbon
3. **Services** — 4 glass cards: Websites, Mobile Apps, AI Tools, Automation
4. **Projects** — selected work, with `AI Content Creator` featured first
5. **How It Works** — 3-step process with connecting line
6. **Pricing** — 3 tiers, Pro highlighted in matrix green
7. **Contact** — Email · Instagram · GitHub · Threads + Book-a-call

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

The project ships with a `vercel.json` so deploys are zero-config.

```bash
# install the Vercel CLI once
npm i -g vercel

# from the project root
vercel        # preview deploy
vercel --prod # production deploy
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Vite and deploys.

## Contact

- Email: lordforpeace0011@gmail.com
- Instagram: [@akexo_ai](https://www.instagram.com/akexo_ai)
- GitHub: [exoexo0011](https://github.com/exoexo0011)
- Threads: [@akexo_ai](https://www.threads.com/@akexo_ai)
