import { NovelAIAPI } from '../NovelAIAPI.js';
import fs from 'fs';
import path from 'path';

/**
 * Example demonstrating how to use the NovelAI API client for image generation
 */
async function runImageGenerationExample() {
	// Create API client instance
	const api = new NovelAIAPI(); // Uses API_TOKEN from environment variable or default token

	// Generate an image
	try {
		console.log('Generating image...');
		
		const imageData = await api.image.generate({
			input: "A beautiful landscape with mountains and a lake at sunset, highly detailed",
			model: "nai-diffusion-3",
			parameters: {
				width: 832,
				height: 1216,
				scale: 5,
				sampler: "k_euler_ancestral",
				steps: 28,
				seed: Math.floor(Math.random() * 2147483647),
				n_samples: 1,
				ucPreset: 0,
				qualityToggle: true,
				sm: false
			}
		});
		
		// Save the image data to a file
		const outputDir = path.join(__dirname, '..', '..', '..', 'output');
		
		// Create output directory if it doesn't exist
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}
		
		const outputFile = path.join(outputDir, `generated-image-${Date.now()}.zip`);
		fs.writeFileSync(outputFile, imageData);
		
		console.log(`Image saved to ${outputFile}`);
		
		// Example of tag suggestion
		console.log('Getting tag suggestions for "mount"...');
		const tagSuggestions = await api.image.suggestTags({
			model: "nai-diffusion-3",
			prompt: "mount"
		});
		
		console.log('Tag suggestions:', tagSuggestions);
		
	} catch (error) {
		console.error('Error:', error);
	}
}

// Run the example if this file is executed directly
if (require.main === module) {
	runImageGenerationExample().catch(console.error);
}

export default runImageGenerationExample; 