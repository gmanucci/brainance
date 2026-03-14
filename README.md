# Brainance

An educational app to learn about fixed income, investment funds, and financial regulations in Brazil. Extensible to other financial topics.

## Features

- Educational modules on finance
- Tools and Simulations
- Regulation viewer
- Extensible for future topics

## Tech Stack

- **Angular 21** — latest stable framework
- **TailwindCSS v4** — utility-first CSS framework
- **TypeScript** — type-safe development

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app automatically reloads on source file changes.

### Build

```bash
npm run build
```

Build artifacts are stored in `dist/`.

### Tests

```bash
npm test
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── ui/               # Reusable design system components
│   │       ├── button/       # Button component (primary, secondary, outline, ghost, danger)
│   │       ├── alert/        # Alert component (info, success, warning, danger)
│   │       ├── card/         # Card component with optional header
│   │       ├── badge/        # Badge component
│   │       └── index.ts      # Barrel exports
│   ├── app.ts
│   ├── app.html
│   ├── app.routes.ts
│   └── app.config.ts
├── styles.css                # Global styles with Tailwind v4 directives and design tokens
└── index.html
```

## Design System

The design system follows Tailwind best practices with:

- **Buttons**: 5 variants (primary, secondary, outline, ghost, danger) × 3 sizes (sm, md, lg)
- **Alerts**: 4 variants (info, success, warning, danger) with optional title
- **Cards**: Container with optional title/subtitle header
- **Badges**: 5 variants for labels and status indicators

Custom design tokens are defined in `src/styles.css` using Tailwind v4's `@theme` directive, covering primary, success, warning, and danger color scales.
