import { publicApi } from "@/service/api";
import type { ParticipationRequest } from "@/models/public/participation-request";

/**
 * Public, unauthenticated endpoints reached via the links/QR codes generated for
 * each event. They share the `public/events/:eventId/*` prefix and accept the
 * same `{ name, email, cpf }` body.
 */

/** POST public/events/:eventId/registration. */
export async function registerForEvent(
  eventId: string,
  payload: ParticipationRequest,
): Promise<void> {
  await publicApi.post(`public/events/${eventId}/registration`, payload);
}

/** POST public/events/:eventId/presence. */
export async function confirmPresence(
  eventId: string,
  payload: ParticipationRequest,
): Promise<void> {
  await publicApi.post(`public/events/${eventId}/presence`, payload);
}
