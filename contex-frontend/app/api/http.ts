export type ApiError = {
  message: string;
  error: string;
  statusCode: number;
}

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

type ApiOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: Record<string, any>;
  headers?: Record<string, string>;
};

const BASE_URL = import.meta.env.VITE_API_URL;

function buildError(
  statusCode: number,
  message: string,
  error: string
): ApiError {
  return { statusCode, message, error };
}

export async function api<T>(
  endpoint: string,
  { method = "GET", body, headers = {} }: ApiOptions = {}
): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const raw = await response.json().catch(() => null);

    if (!response.ok || raw?.error === true) {
      const details = raw?.errorDetails ?? {};

      return {
        success: false,
        error: buildError(
          details.statusCode ?? response.status,
          Array.isArray(details.message)
            ? details.message[0]
            : details.message ?? response.statusText,
          details.error ?? "RequestError"
        )
      };
    }

    if (raw?.success === true) {
      return { success: true, data: raw.data as T };
    }

    return {
      success: false,
      error: buildError(
        response.status,
        "Unexpected response format",
        "ParseError"
      )
    };
  } catch (err) {
    return {
      success: false,
      error: buildError(
        0,
        err instanceof Error ? err.message : "Something went wrong",
        "NetworkError"
      )
    };
  }
}
