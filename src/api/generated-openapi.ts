/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ImageAugmentImageRequest {
  defry?: number;
  height?: number;
  image?: string;
  prompt?: string;
  req_type?: string;
  width?: number;
}

export interface ImageCoordinates {
  x?: number;
  y?: number;
}

export interface ImageImageGenerationRequest {
  action?: string;
  input?: string;
  model?: string;
  parameters?: ImageRequestParameters;
  url?: string;
}

export interface ImageRequestParameters {
  add_original_image?: boolean;
  cfg_rescale?: number;
  /** used by ControlNet */
  controlnet_condition?: string;
  controlnet_model?: string;
  controlnet_strength?: number;
  /** (Summer Sampler update) add ancestral noise even on the final step of sampling, despite the fact we're not going to run the denoiser again, default true (maintaining bug-for-bug compatibility) */
  deliberate_euler_ancestral_bug?: boolean;
  dynamic_thresholding?: boolean;
  extra_noise_seed?: number;
  height?: number;
  /** used by img2img */
  image?: string;
  legacy?: boolean;
  legacy_v3_extend?: boolean;
  mask?: string;
  n_samples?: number;
  negative_prompt?: string;
  noise?: number;
  noise_schedule?: string;
  params_version?: number;
  prefer_brownian?: boolean;
  prompt?: string;
  qualityToggle?: boolean;
  reference_image?: string;
  reference_image_multiple?: string[];
  reference_information_extracted?: number;
  reference_information_extracted_multiple?: number[];
  reference_strength?: number;
  reference_strength_multiple?: number[];
  sampler?: string;
  scale?: number;
  seed?: number;
  /** (Summer Sampler update) triggers Variety Boost */
  skip_cfg_above_sigma?: number;
  sm?: boolean;
  sm_dyn?: boolean;
  steps?: number;
  strength?: number;
  ucPreset?: number;
  v4_negative_prompt?: ImageV4ConditionInput;
  v4_prompt?: ImageV4ConditionInput;
  width?: number;
}

export interface ImageTagSuggestion {
  confidence?: number;
  count?: number;
  tag?: string;
}

export interface ImageTagSuggestionResponse {
  tags?: ImageTagSuggestion;
}

export interface ImageV4ConditionInput {
  caption?: ImageV4ExternalCaption;
  use_coords?: boolean;
  use_order?: boolean;
}

export interface ImageV4ExternalCaption {
  base_caption?: string;
  char_captions?: ImageV4ExternalCharacterCaption[];
}

export interface ImageV4ExternalCharacterCaption {
  centers?: ImageCoordinates[];
  char_caption?: string;
}

export interface TextLMGenerateRequest {
  /**
   * Input can be either a representation of the tokenized or non-tokenized input (see the `use_string` parameter)
   * When requesting tokenized input (via `use_string`), input's format must be a Base64 string representation of the tokens as follows:
   *  - Little endian sequence of bytes that represent an integer of a specific size, determined by the tokenizer used for the model.
   *  - For Nerdstash V2, that is 2 bytes (16 bits) per token, Llama3 is 4 bytes (32 bits) per token
   *
   * NOTE: Be aware that the token length of the input + wanted max length will be validated against the user's current subscription level (via GET /user/data's subscription field)'s context size.
   * Requests that trigger the validation will get an API Error if the requested context length is too large.
   * It is recommended to run tokenization using https://github.com/NovelAI/nai-js-tokenizer to get an exact number that represents the request's context size and strip accordingly. We use nerdstash v2 for Kayra.
   *
   * Context length per subscription:
   *  - Tablet: 4096 tokens
   *  - Scroll: 8192 tokens
   *  - Opus: 8192 tokens
   *
   * `max_length` limit per subscription:
   *  - Tablet: 150 tokens
   *  - Scroll: 150 tokens
   *  - Opus: 250 tokens
   * @maxLength 100000
   */
  input: string;
  /** Wanted model for generations, currently only `kayra-v1` and `llama-3-erato-v1` are available. Other models are not available at the current moment. Trial users may only use `kayra-v1`. */
  model: string;
  n_samples?: number;
  parameters: TextRequestParameters;
  prefix?: string;
}

export interface TextLMGenerationResponse {
  /** A map for each token containing the logprobs, which are an ordered array of before and after sampling, as well as the chosen probabilities of the top N tokens (N being configured by `num_logprobs`). */
  logprobs?: TextLMLogprobs[];
  /** Contains either the model output string (if `use_string` is set) or the packed representation of tokens */
  output?: string;
}

export interface TextLMLogprobs {
  after?: number[][][];
  before?: number[][][];
  chosen?: number[][][];
}

export interface TextLogitBiasParameters {
  bias?: number;
  ensure_sequence_finish: boolean;
  generate_once: boolean;
  sequence?: number[];
}

export enum TextPhraseRepPenChoice {
  Off = "off",
  VeryLight = "very_light",
  Light = "light",
  Medium = "medium",
  Aggressive = "aggressive",
  VeryAggressive = "very_aggressive",
}

export interface TextRequestParameters {
  /** @maxItems 2048 */
  bad_words_ids?: number[][];
  bracket_ban?: boolean;
  /** @min 0 */
  cfg_scale?: number;
  cfg_uc?: string;
  cropped_token?: number;
  eos_token_id?: number;
  force_emotion?: boolean;
  generate_until_sentence?: boolean;
  line_start_ids?: number[][];
  /** @maxItems 1024 */
  logit_bias_exp: TextLogitBiasParameters[];
  /** Configures Unified Quad */
  math1_quad?: number;
  /** Configures Unified Conf */
  math1_quad_entropy_scale?: number;
  /** Configures Unified Linear */
  math1_temp?: number;
  /**
   * Maximum generation length (in tokens)
   * @min 1
   * @max 2048
   */
  max_length?: number;
  /**
   * Minimum generation length (in tokens)
   * @min 1
   * @max 2048
   */
  min_length?: number;
  /**
   * @min 0
   * @max 1
   */
  min_p?: number;
  /**
   * @min 0
   * @max 1
   */
  mirostat_lr?: number;
  /** @min 0 */
  mirostat_tau?: number;
  /**
   * Amount of logprobs wanted under the logprobs response field
   * @min 0
   * @max 30
   */
  num_logprobs?: number;
  order?: number[];
  phrase_rep_pen?: TextPhraseRepPenChoice;
  prefix?: string;
  repetition_penalty?: number;
  /**
   * @min -16
   * @max 16
   */
  repetition_penalty_frequency?: number;
  /**
   * @min -16
   * @max 16
   */
  repetition_penalty_presence?: number;
  /**
   * @min 0
   * @max 8192
   */
  repetition_penalty_range?: number;
  /**
   * @min 0
   * @max 10
   */
  repetition_penalty_slope?: number;
  repetition_penalty_whitelist?: number[];
  /** @maxItems 1024 */
  stop_sequences?: number[][];
  /**
   * @min 0
   * @max 1
   */
  tail_free_sampling?: number;
  /**
   * @min 0.1
   * @max 100
   */
  temperature?: number;
  top_a?: number;
  /**
   * @min 0
   * @max 65536
   */
  top_g?: number;
  top_k?: number;
  top_p?: number;
  typical_p?: number;
  /**
   * If the response's output should be a string containing the detokenized text, or if it should be the packed representation of the tokens (format specified on `input`'s documentation).
   * @default true
   */
  use_string?: boolean;
  valid_first_tokens?: number[];
}

export interface UtilsJsonError {
  message?: string;
  statusCode?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Omegalaser API
 * @version 1.0
 * @baseUrl /
 * @externalDocs https://swagger.io/resources/open-api/
 * @contact
 *
 * Hello, fellow API developer!
 *
 * Currently, you have access to three APIs:
 *
 * - Primary NovelAI API: https://api.novelai.net/docs/
 * - Image Generation API: https://image.novelai.net/docs/index.html
 * - Text Generation API: https://text.novelai.net/docs/index.html
 *
 * When building applications that leverage the NovelAI API, you need to request a user's Persistent API token for integration and use it in the Authorization header.
 * For security reasons, storing user credentials in plaintext is strongly discouraged.
 * These credentials are essential, as they provide the encryption key for a user's stories, and improper handling can compromise user data.
 *
 * All API users must adhere to the NovelAI Terms of Service: https://novelai.net/terms.
 *
 * Notice for Existing API Users:
 *
 * As part of our ongoing efforts to enhance service stability, we have separated the primary API (used for logins, subscriptions, story saving, etc.) from the generation APIs.
 * While the generation API is designed to be similar to api.novelai.net, a few backward-incompatible changes have been made:
 *
 * - repetition_penalty_whitelist is now strictly an array. Nested arrays are no longer allowed.
 * - Improved context size validation (more detail in `input` field's documentation).
 * - Improved `max_length` validation (more detail in `input` field's documentation).
 *
 * To ensure that all users benefit from these stability improvements, we will be decommissioning Kayra for subscribed API users on api.novelai.net.
 * Starting from September 30th, 2024, Kayra will only be available on text.novelai.net.
 *
 * Older models, such as Clio, will remain available on the old API for now, with decommissioning planned at a later date.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  ai = {
    /**
     * @description Augment image using NovelAI's diffusion models (Director Tools)
     *
     * @name AugmentImageCreate
     * @summary Augment image
     * @request POST:/ai/augment-image
     * @secure
     */
    augmentImageCreate: (json: ImageAugmentImageRequest, params: RequestParams = {}) =>
      this.request<bytes, UtilsJsonError>({
        path: `/ai/augment-image`,
        method: "POST",
        body: json,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Generate text using NovelAI's large language models. According to our Terms of Service, all generation requests must be initiated by a human action. Automating text or image generation to create excessive load on our systems is not allowed.
     *
     * @name GenerateCreate
     * @summary Generate text
     * @request POST:/ai/generate
     * @secure
     */
    generateCreate: (json: TextLMGenerateRequest, params: RequestParams = {}) =>
      this.request<TextLMGenerationResponse, UtilsJsonError>({
        path: `/ai/generate`,
        method: "POST",
        body: json,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Generate images using NovelAI's diffusion models. According to our Terms of Service, all generation requests must be initiated by a human action. Automating text or image generation to create excessive load on our systems is not allowed.
     *
     * @name GenerateImageCreate
     * @summary Generate image
     * @request POST:/ai/generate-image
     * @secure
     */
    generateImageCreate: (json: ImageImageGenerationRequest, params: RequestParams = {}) =>
      this.request<bytes, UtilsJsonError>({
        path: `/ai/generate-image`,
        method: "POST",
        body: json,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get tag suggestions given a certain incomplete tag
     *
     * @name GenerateImageSuggestTagsList
     * @summary Receive tag suggestions
     * @request GET:/ai/generate-image/suggest-tags
     * @secure
     */
    generateImageSuggestTagsList: (
      query: {
        /** The image model (e.g nai-diffusion-3) */
        model: string;
        /** The incomplete tag query */
        prompt: string;
        /** The language of the tag query, defaults to 'en'. Available languages: en, jp */
        lang?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImageTagSuggestionResponse, UtilsJsonError>({
        path: `/ai/generate-image/suggest-tags`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Generate text using NovelAI's large language models (streaming mode). According to our Terms of Service, all generation requests must be initiated by a human action. Automating text or image generation to create excessive load on our systems is not allowed.
     *
     * @name GenerateStreamCreate
     * @summary Generate text (streaming mode)
     * @request POST:/ai/generate-stream
     * @secure
     */
    generateStreamCreate: (json: TextLMGenerateRequest, params: RequestParams = {}) =>
      this.request<string, UtilsJsonError>({
        path: `/ai/generate-stream`,
        method: "POST",
        body: json,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
