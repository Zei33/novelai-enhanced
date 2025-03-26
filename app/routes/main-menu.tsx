import type { MetaFunction } from "@remix-run/node";
import { Flex, Heading, Text, Button, Box } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "NovelAI Enhanced - Main Menu" },
		{ name: "description", content: "Main menu for NovelAI Enhanced interface" },
	];
};

export default function MainMenu() {
	const [apiKey, setApiKey] = useState("");
	const [apiKeyStatus, setApiKeyStatus] = useState<"idle" | "success" | "error">("idle");
	const [apiKeyError, setApiKeyError] = useState<string | null>(null);

	// Load API key from localStorage on component mount
	useEffect(() => {
		const savedApiKey = localStorage.getItem("novelai-api-key");
		if (savedApiKey) {
			setApiKey(savedApiKey);
			// Send the API key to the main process
			syncApiKeyWithElectron(savedApiKey);
		}
	}, []);

	// Sync API key with Electron main process
	const syncApiKeyWithElectron = async (key: string) => {
		try {
			// Only sync with Electron if it's available (check if we're in Electron environment)
			if (window.api && window.api.setApiKey) {
				const result = await window.api.setApiKey(key);
				
				if (result.error) {
					setApiKeyStatus("error");
					setApiKeyError(result.error);
				} else {
					setApiKeyStatus("success");
					setApiKeyError(null);
				}
			}
		} catch (error) {
			console.error("Error syncing API key with Electron:", error);
			setApiKeyStatus("error");
			setApiKeyError("Failed to communicate with Electron");
		}
	};

	const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newKey = e.target.value;
		setApiKey(newKey);
		localStorage.setItem("novelai-api-key", newKey);
		
		// Sync the new key with Electron
		syncApiKeyWithElectron(newKey);
	};

	return (
		<Flex direction="column" gap="6" p="6" style={{ maxWidth: "800px", margin: "0 auto" }}>
			<Heading size="8" align="center">NovelAI Enhanced</Heading>
			
			<Flex direction="column" gap="2">
				<Text size="3" weight="bold">API Key</Text>
				<Box style={{ position: "relative" }} className="rt-TextFieldRoot">
					<input
						type="password"
						placeholder="Enter your NovelAI API key" 
						value={apiKey}
						onChange={handleApiKeyChange}
						className="rt-reset rt-TextFieldInput"
						style={{ 
							width: "100%", 
							padding: "8px 12px", 
							border: `1px solid ${apiKeyStatus === "error" ? "var(--red-9)" : "var(--gray-a7)"}`,
							borderRadius: "var(--radius-2)"
						}}
					/>
				</Box>
				{apiKeyStatus === "error" && (
					<Text size="2" color="red">{apiKeyError || "Error setting API key"}</Text>
				)}
				{apiKeyStatus === "success" && (
					<Text size="2" color="green">API key successfully configured</Text>
				)}
				<Text size="2" color="gray">Your API key is stored locally and never sent to any server.</Text>
			</Flex>
			
			<Flex gap="4" justify="center" mt="4">
				<Button size="3" asChild>
					<Link to="/image-generation">Go to Image Generation</Link>
				</Button>
			</Flex>
		</Flex>
	);
}

declare global {
	interface Window {
		api: {
			suggestTags: (prompt: string) => Promise<string>;
			setApiKey: (apiKey: string) => Promise<{success?: boolean; error?: string}>;
		};
	}
}