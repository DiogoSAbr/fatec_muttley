/** A single row returned by GET {{url}}events (Page content). */
export interface EventListItem {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string | null; // YYYY-MM-DD
  statusName: string; // enum, e.g. "IN_PROGRESS" | "FINISHED"
  typeName: string;
  modalityName: string;
  points: number;
}
