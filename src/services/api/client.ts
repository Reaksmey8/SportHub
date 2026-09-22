/**
 * SportsHub Core API Client
 * Manages base URL, headers, timeouts, and structured error handling.
 */

const DEFAULT_BASE_URL = "https://sport-api.eunglyzhia.com/api/v1";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE_URL;

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeoutMs = 12000, params, headers, ...customConfig } = options;

  // Build query string if params provided
  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        searchParams.append(key, String(val));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
    ...(customConfig.body instanceof FormData
      ? {} // Let browser set multipart boundary
      : { "Content-Type": "application/json" }),
  };

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      signal: controller.signal,
      cache: "no-store", // Ensure fresh data from sports API
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      throw new ApiError(
        `API Request Failed: ${response.status} ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("API request timed out. Please try again.", 408);
    }
    throw new ApiError(
      error instanceof Error ? error.message : "An unexpected network error occurred.",
      0
    );
  }
}

