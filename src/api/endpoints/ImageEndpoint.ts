import { NovelAIRequest } from '../NovelAIRequest.js';
import { 
	ENDPOINTS, 
	DEFAULT_IMAGE_MODEL, 
	DEFAULT_IMAGE_PARAMETERS 
} from '../constants/defaults.js';
import {
	ImageAugmentImageRequest,
	ImageImageGenerationRequest,
	ImageTagSuggestionResponse
} from '../generated-openapi.js';

/**
 * Handles NovelAI Image Generation API endpoints
 */
export class ImageEndpoint {
	/**
	 * Creates a new ImageEndpoint instance
	 * @param {NovelAIRequest} request - The request handler to use for API calls
	 */
	constructor(private readonly request: NovelAIRequest) {}

	/**
	 * Generates an image using NovelAI's diffusion models
	 * @param {ImageImageGenerationRequest} requestData - The image generation request data
	 * @returns {Promise<Buffer>} Promise resolving to the image data
	 * @example
	 * ```typescript
	 * const imageData = await api.image.generate({
	 *   input: "A beautiful landscape with mountains",
	 *   model: "nai-diffusion-3",
	 *   parameters: {
	 *     width: 832,
	 *     height: 1216,
	 *     scale: 5,
	 *     steps: 28
	 *   }
	 * });
	 * ```
	 */
	public async generate(requestData: Partial<ImageImageGenerationRequest>): Promise<Buffer> {
		const data: ImageImageGenerationRequest = {
			model: requestData.model || DEFAULT_IMAGE_MODEL,
			input: requestData.input || '',
			parameters: {
				...DEFAULT_IMAGE_PARAMETERS,
				...requestData.parameters
			}
		};

		return await this.request.postBinary(ENDPOINTS.IMAGE.GENERATE, data);
	}

	/**
	 * Augments an existing image using NovelAI's diffusion models (Director Tools)
	 * @param {ImageAugmentImageRequest} requestData - The image augmentation request data
	 * @returns {Promise<Buffer>} Promise resolving to the augmented image data
	 * @example
	 * ```typescript
	 * const augmentedImageData = await api.image.augment({
	 *   image: "base64-encoded-image-data",
	 *   prompt: "Add more trees",
	 *   width: 832,
	 *   height: 1216
	 * });
	 * ```
	 */
	public async augment(requestData: ImageAugmentImageRequest): Promise<Buffer> {
		return await this.request.postBinary(ENDPOINTS.IMAGE.AUGMENT, requestData);
	}

	/**
	 * Gets tag suggestions given a certain incomplete tag
	 * @param {object} options - Options for the tag suggestion request
	 * @param {string} options.model - The image model (e.g nai-diffusion-3)
	 * @param {string} options.prompt - The incomplete tag query
	 * @param {string} [options.lang='en'] - The language of the tag query (en, jp)
	 * @returns {Promise<ImageTagSuggestionResponse>} Promise resolving to tag suggestions
	 * @example
	 * ```typescript
	 * const suggestions = await api.image.suggestTags({
	 *   model: "nai-diffusion-3",
	 *   prompt: "moun"
	 * });
	 * // Might suggest tags like "mountains", "mountain range", etc.
	 * ```
	 */
	public async suggestTags(options: {
		model: string;
		prompt: string;
		lang?: string;
	}): Promise<ImageTagSuggestionResponse> {
		return await this.request.get<ImageTagSuggestionResponse>(
			ENDPOINTS.IMAGE.SUGGEST_TAGS,
			options
		);
	}
} 