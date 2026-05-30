import { getEventStatusLabel, getEventStatusVariant } from "@/lib/event-status";
import { cn } from "@/lib/utils";

interface EventStatusBadgeProps {
  status: string;
  className?: string;
}

/**
 * Status pill for an event. Reuses the shared status → label/colour maps:
 * IN_PROGRESS renders green ("Em andamento"), FINISHED renders muted
 * ("Finalizado"), etc.
 */
export function EventStatusBadge({ status, className }: EventStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        getEventStatusVariant(status),
        className,
      )}
    >
      {getEventStatusLabel(status)}
    </span>
  );
}
