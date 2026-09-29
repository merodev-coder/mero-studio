# meroOS — Ammar Altanany's portfolio

A desktop-style portfolio: double-click (or tap) desktop icons to open draggable
windows for About, Experience, Tech stack, Projects, a working Contact terminal,
and your CV. Built with React, TypeScript, Tailwind CSS, Framer Motion (window
drag/animate/minimize), and Three.js (the background scene).

## Requirements

- Node.js 18 or newer
- npm (comes with Node)

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for deployment

```bash
npm run build
```

This runs a TypeScript check and produces a static site in `dist/`. Deploy that
folder to any static host — Vercel, Netlify, GitHub Pages, Cloudflare Pages, or
your own server. `npm run preview` serves the built `dist/` folder locally so
you can sanity-check it before deploying.

## Project structure

```
src/
  App.tsx                  Boot screen + desktop + taskbar + start menu
  data.ts                  All content: profile, projects, tech stack — edit here
  types.ts                 Shared TypeScript types
  icons.tsx                Hand-drawn SVG icon set
  state/
    WindowManagerContext.tsx   Open/close/focus/minimize/maximize state
  hooks/
    useMediaQuery.ts        Mobile / coarse-pointer / reduced-motion detection
  components/
    Desktop.tsx             Desktop surface, icon grid, window layer
    WindowFrame.tsx          Draggable window chrome (Framer Motion)
    SceneBackground.tsx       Three.js starfield + wireframe shapes
    TaskBar.tsx, StartMenu.tsx, BootScreen.tsx, DesktopIcon.tsx
  apps/
    AboutApp.tsx, ExperienceApp.tsx, TechApp.tsx,
    ProjectsFolderApp.tsx, ProjectDetailApp.tsx,
    ContactTerminalApp.tsx, CVApp.tsx
    registry.tsx             Maps a window id to its app component
public/
  assets/Ammar_Altanany_CV.pdf
```

## Editing content

Everything text-based — your bio, experience bullets, tech stack, and every
project's description/links/stack — lives in `src/data.ts`. Add a new project
by adding an entry to the `PROJECTS` array; a desktop icon and window are
generated for it automatically.

To swap the CV, replace `public/assets/Ammar_Altanany_CV.pdf` and update the
`cv` field in `PROFILE` in `src/data.ts` if you rename the file.

## A note on this build

This project was written by hand in a sandboxed environment without npm
registry access, so `npm install` / `npm run build` could not be executed or
verified here. The code was checked with TypeScript's syntax parser and a
static unused-import scan, and follows standard Vite + React + Tailwind +
Framer Motion + Three.js patterns throughout — but you should run
`npm install && npm run dev` as your first step and open an issue with
yourself (or ask me) if anything doesn't compile.
