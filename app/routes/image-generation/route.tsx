import type { MetaFunction } from "@remix-run/node";
import { Flex, Heading, Text, Button, Box } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

// Import all the components
import ImageViewer from "./components/ImageViewer";
import ImageGallery from "./components/ImageGallery";
import ScenePrompt from "./components/ScenePrompt";
import CharactersArea from "./components/CharactersArea";
import ImageSettings from "./components/ImageSettings";
import { Character } from "./components/CharactersArea";

export const meta: MetaFunction = () => {
	return [
		{ title: "Image Generation - NovelAI Enhanced" },
		{ name: "description", content: "Generate images with NovelAI" },
	];
};

export default function ImageGeneration() {
	const [apiKey, setApiKey] = useState("");
	const [currentImage, setCurrentImage] = useState<string | undefined>();
	const [generatedImages, setGeneratedImages] = useState<string[]>([]);
	const [positivePrompt, setPositivePrompt] = useState("");
	const [negativePrompt, setNegativePrompt] = useState("");
	const [characters, setCharacters] = useState<Character[]>([]);
	const [settings, setSettings] = useState({
		width: 832,
		height: 1216,
		steps: 28,
		promptGuidance: 5.5,
		seed: "",
		sampler: "euler_ancestral"
	});
	
	useEffect(() => {
		// Load API key from localStorage
		const savedApiKey = localStorage.getItem("novelai-api-key");
		if (savedApiKey) {
			setApiKey(savedApiKey);
		}
	}, []);

	const handleGenerate = () => {
		// This is a placeholder for the actual API call
		console.log("Generating image with settings:", {
			positivePrompt,
			negativePrompt,
			characters,
			settings
		});

		// Mock generated image with a placeholder
		const placeholderImage = `https://placehold.co/1920x1080/jpeg`;
		setCurrentImage(placeholderImage);
		setGeneratedImages(prev => [placeholderImage, ...prev]);
	};

	if (!apiKey) {
		return (
			<Flex direction="column" gap="6" p="6" style={{ maxWidth: "800px", margin: "0 auto" }}>
				<Flex justify="between" align="center">
					<Heading>Image Generation</Heading>
					<Button asChild variant="soft">
						<Link to="/main-menu">Back to Main Menu</Link>
					</Button>
				</Flex>
				
				<Flex direction="column" gap="4" align="center" p="4" style={{ border: "1px solid var(--gray-a7)", borderRadius: "var(--radius-3)" }}>
					<Text size="4" weight="bold">API Key Required</Text>
					<Text>Please enter your NovelAI API key in the main menu before using this feature.</Text>
					<Button asChild>
						<Link to="/main-menu">Go to Main Menu</Link>
					</Button>
				</Flex>
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="6" p="4" style={{ height: '100%' }}>
			<Flex style={{ flexGrow: 1, height: 'calc(100vh - 600px)' }} gap="4">
				{/* Left Column: Scene Prompt + Image Settings - Fixed 350px width */}
				<Flex direction="column" gap="4" style={{ width: '350px', flexShrink: 0, height: '100%', justifyContent: 'space-between' }}>
					<ScenePrompt 
						positivePrompt={positivePrompt}
						negativePrompt={negativePrompt}
						onPositivePromptChange={setPositivePrompt}
						onNegativePromptChange={setNegativePrompt}
					/>
					
					<ImageSettings 
						settings={settings}
						onSettingsChange={changes => setSettings(prev => ({ ...prev, ...changes }))}
						onGenerate={handleGenerate}
					/>
				</Flex>

				{/* Center: Image Viewer */}
				<Box style={{ flexGrow: 1, height: '100%' }}>
					<ImageViewer currentImage={currentImage} />
				</Box>

				{/* Right Column: Image Gallery - Fixed 170px width */}
				<Box style={{ width: '170px', height: '100%', flexShrink: 0 }}>
					<ImageGallery 
						images={generatedImages} 
						selectedImage={currentImage}
						onSelectImage={setCurrentImage} 
					/>
				</Box>
			</Flex>

			{/* Bottom Area: Characters - Fixed 400px height */}
			<Box style={{ height: '525px' }}>
				<CharactersArea 
					characters={characters}
					onCharactersChange={setCharacters}
				/>
			</Box>
		</Flex>
	);
} 