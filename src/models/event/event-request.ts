/**
 * The `event` object serialized as a JSON string inside the multipart/form-data
 * body of POST {{url}}events. The `background` and `signature` files are sent as
 * separate form-data parts (see event-service).
 */
export interface EventRequest {
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD (optional)
  workload: number;
  capacity?: number;
  points: number;
  typeId: string;
  modalityId: string;
  addressOrLink: string;
  subject: string;
  keywords?: string; // comma-separated, e.g. "React,Tailwind,IA"
  description?: string;
  organizerIds: string[];
  speakerIds: string[];
  sponsorIds: string[];
  nameSignature: string;
  positionSignature: string;
}
