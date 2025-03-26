# NovelAI API Client

A lightweight TypeScript client for interacting with the NovelAI API.

## Features

- Simple, easy-to-use interface for both image and text generation
- Strongly typed API requests and responses
- No dependencies other than axios
- Proper error handling
- Full coverage of the NovelAI API endpoints

## Installation

The client is integrated directly into this project and doesn't require separate installation.

## Usage

### Setup

```typescript
import { NovelAIAPI } from '@api';

// Create an API client instance (uses API_TOKEN from .env or the default token)
const api = new NovelAIAPI();

// Or with an explicit token
const api = new NovelAIAPI('your-api-token-here');
```

### Image Generation

```typescript
// Generate an image
const imageData = await api.image.generate({
  input: "A beautiful landscape with mountains and a lake at sunset",
  model: "nai-diffusion-3",
  parameters: {
    width: 832,
    height: 1216,
    scale: 5,
    sampler: "k_euler_ancestral",
    steps: 28,
    seed: Math.floor(Math.random() * 2147483647),
    n_samples: 1
  }
});

// Save the image to a file (it's returned as a Buffer)
import fs from 'fs';
fs.writeFileSync('generated-image.zip', imageData);
```

### Image Augmentation

```typescript
// Augment an existing image
const augmentedImageData = await api.image.augment({
  image: "base64-encoded-image-data",
  prompt: "Add more trees and mountains",
  width: 832,
  height: 1216
});
```

### Tag Suggestions

```typescript
// Get tag suggestions
const suggestions = await api.image.suggestTags({
  model: "nai-diffusion-3",
  prompt: "mount"
});
```

### Text Generation

```typescript
// Generate text
const response = await api.text.generate({
  input: "Once upon a time",
  model: "kayra-v1",
  parameters: {
    temperature: 0.7,
    max_length: 100,
    top_p: 0.9,
    logit_bias_exp: []
  }
});

console.log(response.output);
```

## API Reference

### `NovelAIAPI`

Main class for interacting with the NovelAI API.

#### Constructor

```typescript
constructor(apiToken?: string, config?: NovelAIAPIConfig)
```

- `apiToken`: Optional API token. If not provided, uses environment variable or default.
- `config`: Optional configuration object.

#### Properties

- `image`: ImageEndpoint - Access to image generation endpoints
- `text`: TextEndpoint - Access to text generation endpoints

### `ImageEndpoint`

Handles image generation related endpoints.

#### Methods

- `generate(requestData: Partial<ImageImageGenerationRequest>): Promise<Buffer>`
- `augment(requestData: ImageAugmentImageRequest): Promise<Buffer>`
- `suggestTags(options: { model: string; prompt: string; lang?: string }): Promise<ImageTagSuggestionResponse>`

### `TextEndpoint`

Handles text generation related endpoints.

#### Methods

- `generate(requestData: Partial<TextLMGenerateRequest>): Promise<TextLMGenerationResponse>`
- `generateStream(requestData: Partial<TextLMGenerateRequest>): Promise<string>`

## Note on API Tokens

The API uses a Bearer token format, which you can set through:

1. Constructor parameter
2. Environment variable `API_TOKEN`
3. The default token included in the code (for development only)

For security, always prefer passing tokens directly or via environment variables in production. 