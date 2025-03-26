# NovelAI Enhanced

An enhanced UI interface for generating images using NovelAI.

## Project Overview

This application provides an improved user interface for interacting with NovelAI's image generation capabilities. Built with Electron, React, and Remix, it combines the power of a desktop application with modern web technologies.

## Project Structure

```
novelai-enhanced/
├── app/                  # Remix application code
│   ├── components/       # Reusable UI components
│   ├── routes/           # Application routes
│   ├── entry.client.tsx  # Client entry point
│   ├── entry.server.tsx  # Server entry point
│   ├── root.tsx          # Root component
│   └── tailwind.css      # TailwindCSS styles
├── src/                  # Electron-specific code
│   ├── main/             # Main process code
│   └── preload/          # Preload scripts
├── public/               # Static assets
└── dist/                 # Build output
```

## Prerequisites

- Node.js 20 or later
- pnpm package manager

## Installation

1. Clone the repository
2. Install dependencies:

	```bash
	pnpm install
	```

## Development

Run the development server:

```bash
pnpm run dev
```

Run Electron with hot reloading:

```bash
pnpm run dev:electron
```

## Building for Production

Build the application:

```bash
pnpm run build
```

## Running the Production Build

```bash
pnpm run electron
```

## Technologies Used

- Electron
- React
- Remix
- TypeScript
- TailwindCSS
- Vite
- Radix UI (for accessible UI components)

## Radix UI Integration

This project uses Radix UI for building accessible and customizable UI components:

- **Theme Provider**: Set up in `app/root.tsx` to provide consistent theming
- **Component Usage**: Import components from `@radix-ui/themes` or specific primitives like `@radix-ui/react-dialog`
- **Example Component**: See `app/components/RadixExample.tsx` for usage examples

For more information on Radix UI components, visit [Radix UI documentation](https://www.radix-ui.com/primitives/docs/overview/introduction).

## License

GPL-3.0-or-later
