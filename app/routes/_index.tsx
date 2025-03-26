import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "NovelAI Enhanced" },
		{ name: "description", content: "An enhanced UI interface for NovelAI" },
	];
};

export const loader: LoaderFunction = async () => {
	return redirect("/main-menu");
};

export default function Index() {
	return null;
}

declare global {
	interface Window {
		api: {
			suggestTags: (prompt: string) => Promise<string>;
			setApiKey: (apiKey: string) => Promise<{success?: boolean; error?: string}>;
		};
	}
} 