/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// More robust Electron detection
const isElectron = () => {
	// Check for window.electronAppInit first (our custom property)
	if (typeof window !== 'undefined' && window.electronAppInit?.isElectron === true) {
		return true;
	}
	
	// Fallback to user agent check
	if (typeof window !== 'undefined' && 
		window.navigator.userAgent.toLowerCase().indexOf(' electron/') > -1) {
		return true;
	}
	
	return false;
};

// Fix for Electron with sandbox enabled
// This adds a small delay to ensure DOM is ready
// but maintains sandbox security
function initialize() {
	// Check if document is ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initialize);
		return;
	}
	
	const initReact = () => {
		try {
			startTransition(() => {
				hydrateRoot(
					document,
					<StrictMode>
						<RemixBrowser />
					</StrictMode>
				);
				console.log("React hydration successful");
			});
		} catch (error) {
			console.error("Hydration error:", error);
		}
	};

	// Add delay for Electron environment, immediate for web
	if (isElectron()) {
		// Longer delay for Electron to ensure DOM is fully ready
		setTimeout(initReact, 100);
	} else {
		initReact();
	}
}

initialize();
