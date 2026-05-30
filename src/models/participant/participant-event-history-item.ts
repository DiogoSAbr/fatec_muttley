/** A single row returned by GET events/participants/:participantId (Page content). */
export interface ParticipantEventHistoryItem {
  /** The event id — used by the "Ver detalhes" action. */
  id: string;
  title: string;
  dateStart: string; // ISO
  dateEnd?: string | null; // ISO
  eventModality: { name: string };
  status: { name: string }; // enum, e.g. "IN_PROGRESS" | "FINISHED"
}
