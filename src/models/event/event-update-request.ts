import type { EventRequest } from "@/models/event/event-request";

/**
 * Body of PUT {{url}}events. Same shape as the create payload but carries the
 * event `id` (the endpoint is a collection route with no id in the path) and
 * never includes the certificate background (it cannot be changed on edit).
 */
export interface EventUpdateRequest extends EventRequest {
  id: string;
}
