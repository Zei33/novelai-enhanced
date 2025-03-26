import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ContentType } from './generated-openapi.js';

/**
 * Handles HTTP requests to the NovelAI API
 */
export class NovelAIRequest {
	private readonly client: AxiosInstance;

	/**
	 * Creates a new NovelAI request handler
	 * @param {string} apiToken - NovelAI API token
	 * @param {string} baseUrl - Base URL for the API
	 */
	constructor(
		private readonly apiToken: string,
		private readonly baseUrl: string
	) {
		this.client = axios.create({
			baseURL: this.baseUrl,
			headers: {
				'Authorization': `Bearer ${this.apiToken}`,
				'Content-Type': ContentType.Json,
			}
		});
	}

	/**
	 * Makes a GET request to the API
	 * @template T - The expected response data type
	 * @param {string} endpoint - The API endpoint to request
	 * @param {Record<string, any>} [query={}] - Optional query parameters
	 * @param {AxiosRequestConfig} [config={}] - Optional axios request config
	 * @returns {Promise<T>} Promise resolving to the response data
	 */
	public async get<T>(endpoint: string, query: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> {
		const response = await this.client.get<T>(endpoint, {
			params: query,
			...config
		});
		return response.data;
	}

	/**
	 * Makes a POST request to the API
	 * @template T - The expected response data type
	 * @param {string} endpoint - The API endpoint to request
	 * @param {any} [data={}] - Request body
	 * @param {AxiosRequestConfig} [config={}] - Optional axios request config
	 * @returns {Promise<T>} Promise resolving to the response data
	 */
	public async post<T>(endpoint: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<T> {
		const response = await this.client.post<T>(endpoint, data, config);
		return response.data;
	}

	/**
	 * Makes a POST request to the API with binary response
	 * This is specifically for endpoints that return binary data like images
	 * @param {string} endpoint - The API endpoint to request
	 * @param {any} [data={}] - Request body
	 * @param {AxiosRequestConfig} [config={}] - Optional axios request config
	 * @returns {Promise<Buffer>} Promise resolving to the binary response data
	 */
	public async postBinary(endpoint: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<Buffer> {
		const response = await this.client.post<ArrayBuffer>(endpoint, data, {
			...config,
			responseType: 'arraybuffer'
		});
		return Buffer.from(response.data);
	}

	/**
	 * Makes a request to the API with custom configurations
	 * @template T - The expected response data type
	 * @param {AxiosRequestConfig} config - Axios request config
	 * @returns {Promise<AxiosResponse<T>>} Promise resolving to the axios response
	 */
	public async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return await this.client.request<T>(config);
	}
} 