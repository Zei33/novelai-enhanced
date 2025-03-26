import { NovelAIRequest } from './NovelAIRequest.js';
import { ImageEndpoint } from './endpoints/ImageEndpoint.js';
import { TextEndpoint } from './endpoints/TextEndpoint.js';
import { DEFAULT_API_TOKEN } from './constants/defaults.js';

/**
 * Configuration options for the NovelAI API client
 */
export interface NovelAIAPIConfig {
	/** Base URL for the image generation API */
	imageBaseUrl?: string;
	/** Base URL for the text generation API */
	textBaseUrl?: string;
}

/**
 * Main client for interacting with the NovelAI API
 * Handles authentication and provides access to all API endpoints
 * @example
 * ```typescript
 * // Using environment variable or default token
 * const api = new NovelAIAPI();
 * 
 * // Or with explicit token
 * const api = new NovelAIAPI('your-api-token');
 * 
 * // Generate an image
 * const imageData = await api.image.generate({
 *   input: "A beautiful landscape with mountains",
 *   model: "nai-diffusion-3",
 *   parameters: {
 *     width: 832,
 *     height: 1216,
 *     scale: 5,
 *     steps: 28,
 *     seed: 12345
 *   }
 * });
 * ```
 */
export class NovelAIAPI {
	private readonly apiToken: string;
	private readonly config: NovelAIAPIConfig;
	private imageRequest: NovelAIRequest;
	private textRequest: NovelAIRequest;

	/** Image generation related endpoints */
	public image: ImageEndpoint;

	/** Text generation related endpoints */
	public text: TextEndpoint;

	/**
	 * Creates a new NovelAI API client
	 * @param {string} [apiToken] - Optional API token (will use API_TOKEN environment variable if not provided)
	 * @param {NovelAIAPIConfig} [config] - Optional configuration options
	 */
	constructor(apiToken?: string, config: NovelAIAPIConfig = {}) {
		this.apiToken = apiToken || process.env.API_TOKEN || DEFAULT_API_TOKEN;
		this.config = {
			imageBaseUrl: 'https://image.novelai.net',
			textBaseUrl: 'https://text.novelai.net',
			...config
		};

		// Initialize request handlers for each API
		this.imageRequest = new NovelAIRequest(
			this.apiToken,
			this.config.imageBaseUrl as string
		);

		this.textRequest = new NovelAIRequest(
			this.apiToken,
			this.config.textBaseUrl as string
		);

		// Initialize endpoints
		this.image = new ImageEndpoint(this.imageRequest);
		this.text = new TextEndpoint(this.textRequest);
	}
}