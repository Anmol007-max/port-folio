# Anmol Mishra — Portfolio

a personal portfolio site, redesigned to feel like a page out of a magazine rather than
another AI-generated dev-portfolio template. light mode, serif type, real 3D, no
glassmorphism, no gradients, no particle soup.

**live:** [anmol007-max.github.io/port-folio](https://anmol007-max.github.io/port-folio/)

---

## what this is

a CS (AI) undergrad's portfolio — about, projects, certifications, and a way to get in
touch. built and iterated on with [Antigravity](https://antigravity.google), design
direction and specs written with Claude.

## design direction

- **editorial, not templated** — serif display type (`Instrument Serif` /
  `Playfair Display`), a humanist body sans (`IBM Plex Sans`), and mono for labels/tags
  (`IBM Plex Mono`)
- **light mode only** — warm paper background (`#F7F4EE`), warm ink text (`#1B1B18`), a
  single accent color (pine green, `#2F4A3C`) used deliberately, not everywhere
- **real 3D, not decoration** — an object-based hero scene (React Three Fiber) that
  responds to cursor movement, not an ambient particle canvas that spins forever
- **hairline borders + layered shadows** instead of frosted glass and drop-shadow blobs
- **a signature, not a spinner** — the loading sequence inks in a cursive signature and
  stamps a wax-seal monogram instead of showing a progress bar

## sections

- **About** — a short editorial write-up, not a wall of buzzwords
- **Education** — headline + story format rather than a resume field/value block
- **Skills** — a clean typographic grid, hairline-bordered categories
- **Projects** — [Algorythm](https://anmol007-max.github.io/Algorythm) (DSA visualizer),
  MINDBOT (NLP emotion-detection chatbot), Token Optimizer (Java tokenization engine)
- **Certifications** — Forage virtual experience programs (JPMorgan, Mastercard, AWS
  APAC) plus Infosys Springboard and other credentials, listed like resume lines rather
  than a badge grid
- **Contact** — a direct `mailto:` CTA plus LinkedIn/GitHub, no third-party email-sending
  service involved

## tech stack

| Layer | Tools |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| 3D | React Three Fiber, `@react-three/drei`, Three.js |
| Fonts | Instrument Serif / Playfair Display, IBM Plex Sans, IBM Plex Mono |
| Deployment | GitHub Pages |

## running locally

```bash
git clone https://github.com/Anmol007-max/port-folio.git
cd port-folio
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## project structure

```
src/
  components/     -> Navbar, Hero, About, Skills, Projects, Certifications, Contact, Footer
  components/
    HeroScene.jsx -> React Three Fiber hero object
  index.css       -> design tokens (color, type, spacing) + global styles
  App.jsx         -> section composition
```

## notes

this repo is actively evolving — sections get rebuilt as the design direction gets
refined rather than left static. if something looks unfinished, it probably is; check
back.

## contact

- [anmolmishran0@gmail.com](mailto:anmolmishran0@gmail.com)
- [linkedin.com/in/anmolmishra24](https://linkedin.com/in/anmolmishra24)
- [github.com/Anmol007-max](https://github.com/Anmol007-max)