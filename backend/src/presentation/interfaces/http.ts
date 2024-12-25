// Common HTTP methods
export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

// Common HTTP status codes
export enum HttpStatus {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

// Type for query parameters
export interface QueryParams {
  [key: string]: string | string[] | undefined;
}

// Type for route parameters
export interface RouteParams {
  [key: string]: string;
}

// Type for request headers
export interface HttpHeaders {
  [key: string]: string | string[] | undefined;
}

// Type for cookie options
export interface CookieOptions {
  maxAge?: number;
  signed?: boolean;
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
}

// Interface for the HTTP Request
export interface HttpRequest {
  // Basic request properties
  readonly method: HttpMethod;
  readonly path: string;
  readonly url: string;

  // Data access methods
  getBody<T>(): T;
  getQuery(): QueryParams;
  getParams(): RouteParams;
  getHeaders(): HttpHeaders;

  // Individual data access
  getHeader(name: string): string | undefined;
  getParam(name: string): string | undefined;
  getQueryParam(name: string): string | string[] | undefined;

  // Authentication-related
  readonly userId?: string;
  readonly organizationId?: string;
  readonly token?: string;
}

// Interface for the HTTP Response
export interface HttpResponse {
  // Status code methods
  status(code: HttpStatus): HttpResponse;

  // Response sending methods
  send(body: any): void;
  json(body: any): void;
  sendStatus(code: HttpStatus): void;

  // Header manipulation
  setHeader(name: string, value: string): HttpResponse;
  removeHeader(name: string): HttpResponse;

  // Specialized response methods
  sendFile(path: string): void;
  redirect(url: string): void;

  // Cookie handling
  setCookie(name: string, value: string, options?: CookieOptions): HttpResponse;
  clearCookie(name: string): HttpResponse;
}

// Optional base type for common HTTP errors
export interface HttpError extends Error {
  statusCode: HttpStatus;
  details?: Record<string, unknown>;
}

// Optional result type for handling responses
export interface HttpResult<T> {
  success: boolean;
  data?: T;
  error?: HttpError;
  statusCode: HttpStatus;
}
