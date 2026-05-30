import { useQuery } from "@tanstack/react-query";
import { getEventModalities, getEventTypes } from "@/service/eventService/event-service";

/** Static lists — cached for the whole session (staleTime: Infinity). */
export function useEventTypes() {
  return useQuery({
    queryKey: ["event-types"],
    queryFn: getEventTypes,
    staleTime: Infinity,
  });
}

export function useEventModalities() {
  return useQuery({
    queryKey: ["event-modalities"],
    queryFn: getEventModalities,
    staleTime: Infinity,
  });
}
