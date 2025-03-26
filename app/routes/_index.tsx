import type { MetaFunction } from "@remix-run/node";
import { Flex, Button } from "@radix-ui/themes";
import RadixExample from "~/components/RadixExample";

export const meta: MetaFunction = () => {
	return [
		{ title: "NovelAI Enhanced" },
		{ name: "description", content: "An enhanced UI interface for NovelAI" },
	];
};

export default function Index() {
	const handleSuggestTags = () => window.api.suggestTags("moun").then(result => alert(JSON.stringify(result)));
  
	return (
		<Flex direction="column" gap="4" p="4">
			<Button onClick={handleSuggestTags}>
				Suggest Tag
			</Button>
			
			<RadixExample />
		</Flex>
	);
}
  
declare global {
	interface Window {
		api: {
			suggestTags: (prompt: string) => Promise<string>;
		};
	}
}