import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getEventDetails,
  type EventDetailsParams,
} from "@/service/eventService/event-service";

/**
 * Fetches GET events/:eventId/details. The `params` (participant
 * pagination/sort) are part of the query key so the Participants tab can drive
 * its own list without disturbing the page's general info query (which uses a
 * different param set → different key).
 */
export function useEventDetails(eventId: string | undefined, params?: EventDetailsParams) {
  return useQuery({
    queryKey: ["event-details", eventId, params ?? {}],
    queryFn: () => getEventDetails(eventId as string, params),
    enabled: !!eventId,
    placeholderData: keepPreviousData,
  });
}
