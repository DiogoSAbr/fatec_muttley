/** Maps the API event status enum to a friendly pt-BR label + badge style. */
export const eventStatusLabel: Record<string, string> = {
  SCHEDULED: "Agendado",
  IN_PROGRESS: "Em andamento",
  PENDING_ISSUANCE: "Emissão pendente",
  // The backend uses FINALIZED; FINISHED is kept as an alias for safety.
  FINALIZED: "Finalizado",
  FINISHED: "Finalizado",
  CANCELLED: "Cancelado",
};

export const eventStatusVariant: Record<string, string> = {
  SCHEDULED: "bg-blue-100 text-blue-800 border-blue-200",
  IN_PROGRESS: "bg-green-100 text-green-800 border-green-200",
  PENDING_ISSUANCE: "bg-amber-100 text-amber-800 border-amber-200",
  FINALIZED: "bg-muted text-muted-foreground border-border",
  FINISHED: "bg-muted text-muted-foreground border-border",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

export function getEventStatusLabel(status: string): string {
  return eventStatusLabel[status] ?? status;
}

export function getEventStatusVariant(status: string): string {
  return eventStatusVariant[status] ?? "bg-muted text-muted-foreground border-border";
}

/** True when the event is in a terminal/finished state (handles both enum spellings). */
export function isEventFinished(status: string): boolean {
  return status === "FINALIZED" || status === "FINISHED";
}
