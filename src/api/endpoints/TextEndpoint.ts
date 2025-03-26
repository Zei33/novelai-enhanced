import { NovelAIRequest } from '../NovelAIRequest.js';
import { ENDPOINTS, DEFAULT_TEXT_MODEL } from '../constants/defaults.js';
import { TextLMGenerateRequest, TextLMGenerationResponse } from '../generated-openapi.js';

/**
 * Handles NovelAI Text Generation API endpoints
 */
export class TextEndpoint {
	/**
	 * Creates a new TextEndpoint instance
	 * @param {NovelAIRequest} request - The request handler to use for API calls
	 */
	constructor(private readonly request: NovelAIRequest) {}

	/**
	 * Generates text using NovelAI's large language models
	 * @param {TextLMGenerateRequest} requestData - The text generation request data
	 * @returns {Promise<TextLMGenerationResponse>} Promise resolving to the generated text
	 * @example
	 * ```typescript
	 * const generatedText = await api.text.generate({
	 *   input: "Once upon a time",
	 *   model: "kayra-v1",
	 *   parameters: {
	 *     max_length: 100,
	 *     temperature: 0.7
	 *   }
	 * });
	 * ```
	 */
	public async generate(requestData: Partial<TextLMGenerateRequest>): Promise<TextLMGenerationResponse> {
		// Ensure we have required fields
		if (!requestData.input) {
			throw new Error('Input text is required for text generation');
		}

		const data: TextLMGenerateRequest = {
			model: requestData.model || DEFAULT_TEXT_MODEL,
			input: requestData.input,
			parameters: requestData.parameters || {
				temperature: 0.7,
				max_length: 100,
				min_length: 1,
				top_k: 40,
				top_p: 0.9,
				repetition_penalty: 1.1,
				use_string: true,
				logit_bias_exp: [] // Required empty array for logit bias
			}
		};

		return await this.request.post<TextLMGenerationResponse>(ENDPOINTS.TEXT.GENERATE, data);
	}

	/**
	 * Generates text in streaming mode using NovelAI's LLMs
	 * Not fully implemented - returned as raw string stream
	 * @param {TextLMGenerateRequest} requestData - The text generation request data
	 * @returns {Promise<string>} Promise resolving to the generated text stream
	 */
	public async generateStream(requestData: Partial<TextLMGenerateRequest>): Promise<string> {
		// Ensure we have required fields
		if (!requestData.input) {
			throw new Error('Input text is required for text generation');
		}

		const data: TextLMGenerateRequest = {
			model: requestData.model || DEFAULT_TEXT_MODEL,
			input: requestData.input,
			parameters: requestData.parameters || {
				temperature: 0.7,
				max_length: 100,
				min_length: 1,
				top_k: 40,
				top_p: 0.9,
				repetition_penalty: 1.1,
				use_string: true,
				logit_bias_exp: [] // Required empty array for logit bias
			}
		};

		return await this.request.post<string>(ENDPOINTS.TEXT.GENERATE_STREAM, data);
	}
} 