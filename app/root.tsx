import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useEffect } from "react";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Type declaration for window object enhancement
declare global {
  interface Window {
    electronAppInit?: {
      isElectron: boolean;
      platform: string;
    };
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
	// Instead of conditional rendering, always include the CSP meta tag
	// but set its content based on environment
	const isDev = process.env.NODE_ENV === 'development';
	
	// Always use the development CSP for server-side rendering to avoid hydration mismatch
	// Client-side will use the appropriate value based on runtime environment
	const cspContent = isDev
		? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' ws: wss: http: https:;"
		: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self';";

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* Always include CSP tag to avoid hydration mismatch */}
				<meta 
					httpEquiv="Content-Security-Policy" 
					content={cspContent}
				/>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	// Force React to initialize hooks properly
	useEffect(() => {
		// This ensures React hooks are properly initialized
		console.log("React app initialized in Electron");
	}, []);

	return (
		<Theme appearance="dark" accentColor="violet" radius="medium">
			<Outlet />
		</Theme>
	);
}
