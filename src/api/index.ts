import { NovelAIAPI } from './NovelAIAPI.js';

// Main API client
export default NovelAIAPI;
export type { NovelAIAPIConfig } from './NovelAIAPI.js';

// Request handler
export { NovelAIRequest } from './NovelAIRequest.js';

// Endpoints
export { ImageEndpoint } from './endpoints/ImageEndpoint.js';
export { TextEndpoint } from './endpoints/TextEndpoint.js';

// Constants
export * from './constants/defaults.js';

// Re-export types from the OpenAPI spec
export type {
	// Image-related types
	ImageAugmentImageRequest,
	ImageCoordinates,
	ImageImageGenerationRequest,
	ImageRequestParameters,
	ImageTagSuggestion,
	ImageTagSuggestionResponse,
	ImageV4ConditionInput,
	ImageV4ExternalCaption,
	ImageV4ExternalCharacterCaption,
	
	// Text-related types
	TextLMGenerateRequest,
	TextLMGenerationResponse,
	TextLMLogprobs,
	TextLogitBiasParameters,
	TextPhraseRepPenChoice,
	TextRequestParameters,
	
	// Utility types
	UtilsJsonError
} from './generated-openapi.js';

// Export constants
export { ContentType } from './generated-openapi.js';