import { api } from "@/service/api";
import { unwrapArray, unwrapData, unwrapPage } from "@/service/response";
import type { Page } from "@/models/common/page";
import type { EventOption } from "@/models/event/event-option";
import type { EventListItem } from "@/models/event/event-list-item";
import type { EventRequest } from "@/models/event/event-request";
import type { EventDetails } from "@/models/event/event-details";
import type { EventUpdateRequest } from "@/models/event/event-update-request";
import type { RewardRequest } from "@/models/event/reward-request";

export interface ListEventsParams {
  page: number;
  size: number;
  sortBy: "title" | "points";
  direction: "asc" | "desc";
}

export async function listEvents({
  page,
  size,
  sortBy,
  direction,
}: ListEventsParams): Promise<Page<EventListItem>> {
  // Spring Pageable expects the sort as a single `sort=field,direction` param.
  const { data } = await api.get("events", {
    params: { page, size, sort: `${sortBy},${direction}` },
  });
  return unwrapPage<EventListItem>(data);
}

/** GET event-types — `data` is a plain array (possibly wrapped). */
export async function getEventTypes(): Promise<EventOption[]> {
  const { data } = await api.get("event-types");
  return unwrapArray<EventOption>(data);
}

/** GET event-modalities — `data` is a plain array (possibly wrapped). */
export async function getEventModalities(): Promise<EventOption[]> {
  const { data } = await api.get("event-modalities");
  return unwrapArray<EventOption>(data);
}

export interface CreateEventFiles {
  background: File;
  signature: File;
}

/**
 * POST events as multipart/form-data: `background` + `signature` files and the
 * `event` object serialized as a JSON string. Content-Type is set to undefined
 * so the browser can generate the multipart boundary (the api instance defaults
 * to application/json).
 */
export async function createEvent(event: EventRequest, files: CreateEventFiles): Promise<void> {
  const formData = new FormData();
  formData.append("background", files.background);
  formData.append("signature", files.signature);
  // Send `event` as a JSON-typed Blob so the multipart part carries
  // `Content-Type: application/json` — Spring's @RequestPart needs it (a plain
  // string would arrive as application/octet-stream and trigger a 415).
  formData.append("event", new Blob([JSON.stringify(event)], { type: "application/json" }));

  await api.post("events", formData, {
    headers: { "Content-Type": undefined },
  });
}

export interface EventDetailsParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "asc" | "desc";
}

/**
 * GET events/:eventId/details — general info + the paginated `participants`
 * page. The participant pagination/sort params drive only the embedded
 * `participants` list. Response is wrapped in the standard envelope.
 */
export async function getEventDetails(
  eventId: string,
  params?: EventDetailsParams,
): Promise<EventDetails> {
  const { sortBy, direction, ...rest } = params ?? {};
  // Spring Pageable expects the sort as a single `sort=field,direction` param.
  const { data } = await api.get(`events/${eventId}/details`, {
    params: {
      ...rest,
      ...(sortBy ? { sort: `${sortBy},${direction ?? "asc"}` } : {}),
    },
  });
  return unwrapData<EventDetails>(data);
}

export interface UpdateEventFiles {
  /** Only sent when the user replaced the signature image. */
  signature?: File;
  /** Only sent when the user replaced the certificate background image. */
  background?: File;
}

/**
 * PUT events/:id as multipart/form-data. The `event` object is sent as a
 * JSON-typed Blob; the `signature` and `background` files are only attached when
 * the user replaced them.
 */
export async function updateEvent(
  event: EventUpdateRequest,
  files: UpdateEventFiles = {},
): Promise<void> {
  const formData = new FormData();
  if (files.signature) {
    formData.append("signature", files.signature);
  }
  if (files.background) {
    formData.append("background", files.background);
  }
  formData.append("event", new Blob([JSON.stringify(event)], { type: "application/json" }));

  await api.put(`events/${event.id}`, formData, {
    headers: { "Content-Type": undefined },
  });
}

/** DELETE events/:eventId. */
export async function deleteEvent(eventId: string): Promise<void> {
  await api.delete(`events/${eventId}`);
}

/** PATCH events/:eventId/finalize. */
export async function finalizeEvent(eventId: string): Promise<void> {
  await api.patch(`events/${eventId}/finalize`);
}

/**
 * POST events/:eventId/reward — plain JSON body
 * ({ participantIds, description, competencies }). No background image.
 */
export async function rewardParticipants(eventId: string, payload: RewardRequest): Promise<void> {
  await api.post(`events/${eventId}/reward`, payload);
}
