import { useMutation } from "@tanstack/react-query";
import {
  confirmPresence,
  registerForEvent,
} from "@/service/publicEventService/public-event-service";
import type { ParticipationRequest } from "@/models/public/participation-request";

/** Mutation for the public event registration form. */
export function useEventRegistration(eventId: string) {
  return useMutation({
    mutationFn: (payload: ParticipationRequest) => registerForEvent(eventId, payload),
  });
}

/** Mutation for the public event presence form. */
export function useEventPresence(eventId: string) {
  return useMutation({
    mutationFn: (payload: ParticipationRequest) => confirmPresence(eventId, payload),
  });
}
