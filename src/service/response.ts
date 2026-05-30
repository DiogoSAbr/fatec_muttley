import type { ApiResponse } from "@/models/common/api-response";
import type { Page } from "@/models/common/page";

/**
 * The API is inconsistent about the response envelope: some endpoints return the
 * payload directly (e.g. participants → a bare Spring Page), others wrap it in
 * `{ status, message, path, data, timestamp }` (e.g. events). These helpers
 * accept either shape so callers don't have to care.
 */
type MaybeWrapped<T> = T | ApiResponse<T>;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/** Returns the array from either a bare array or a `{ data: [...] }` envelope. */
export function unwrapArray<T>(payload: MaybeWrapped<T[]>): T[] {
  if (Array.isArray(payload)) return payload;
  if (isObject(payload) && Array.isArray(payload.data)) return payload.data as T[];
  return [];
}

/** Returns the Spring Page from either a bare Page or a `{ data: Page }` envelope. */
export function unwrapPage<T>(payload: MaybeWrapped<Page<T>>): Page<T> {
  if (isObject(payload) && Array.isArray(payload.content)) {
    return payload as Page<T>;
  }
  if (isObject(payload) && isObject(payload.data)) {
    return payload.data as unknown as Page<T>;
  }
  return payload as Page<T>;
}

/** Returns the entity from either a bare object or a `{ data: entity }` envelope. */
export function unwrapData<T>(payload: MaybeWrapped<T>): T {
  if (isObject(payload) && "data" in payload && !("content" in payload)) {
    return payload.data as T;
  }
  return payload as T;
}
