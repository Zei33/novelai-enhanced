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
	const handlePing = () => alert(window.api.ping());
  
	return (
		<Flex direction="column" gap="4" p="4">
			<Button onClick={handlePing}>
				Ping Electron IPC
			</Button>
			
			<RadixExample />
		</Flex>
	);
}
  
declare global {
	interface Window {
		api: {
			ping: () => string;
		};
	}
}