// Default API token from environment or hardcoded for development
export const DEFAULT_API_TOKEN = 'NO API TOKEN';

// Base URLs for APIs
export const IMAGE_API_BASE_URL = 'https://image.novelai.net';
export const TEXT_API_BASE_URL = 'https://text.novelai.net';

// API endpoints
export const ENDPOINTS = {
	// Image API endpoints
	IMAGE: {
		GENERATE: '/ai/generate-image',
		AUGMENT: '/ai/augment-image',
		SUGGEST_TAGS: '/ai/generate-image/suggest-tags'
	},
	// Text API endpoints
	TEXT: {
		GENERATE: '/ai/generate',
		GENERATE_STREAM: '/ai/generate-stream'
	}
};

// Default image generation parameters
export const DEFAULT_IMAGE_PARAMETERS = {
	width: 832,
	height: 1216,
	scale: 5,
	sampler: 'k_euler_ancestral',
	steps: 28,
	seed: Math.floor(Math.random() * 2147483647),
	n_samples: 1,
	ucPreset: 0,
	qualityToggle: true,
	sm: false
};

// Default image generation model
export const DEFAULT_IMAGE_MODEL = 'nai-diffusion-4';

// Default text generation model
export const DEFAULT_TEXT_MODEL = 'kayra-v1'; 