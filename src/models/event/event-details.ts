import type { Page } from "@/models/common/page";

/** A participant linked to an event as organizer / speaker / sponsor. */
export interface EventParticipantLink {
  participantId: string;
  name: string;
  cpf: string;
  email?: string | null;
  roleName: string;
}

/** A registered attendee row inside the paginated `participants` list. */
export interface EventAttendee {
  /** Registration id (NOT the person id). */
  id: string;
  /** The person id — used when rewarding. */
  participantId: string;
  name: string;
  cpf: string;
  email?: string | null;
  roleName: string;
  registeredAt: string; // ISO datetime
  checkInAt?: string | null; // ISO datetime
  present: boolean;
  registrationStatus: string; // e.g. "INSCRITO"
}

/** Full payload of GET events/:eventId/details (already unwrapped from the envelope). */
export interface EventDetails {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string | null; // YYYY-MM-DD
  workload: number;
  points: number;
  typeId: string;
  typeName: string;
  subject: string;
  keywords?: string | null; // comma-separated ("competências")
  description?: string | null;
  modalityId: string;
  modalityName: string;
  addressOrLink: string;
  capacity?: number | null;
  organizers: EventParticipantLink[];
  speakers: EventParticipantLink[];
  sponsors: EventParticipantLink[];
  /** Certificate background image — read-only (cannot be changed on edit). */
  imageBackgroundUrl?: string | null;
  signatureImageUrl?: string | null;
  nameSignature: string;
  positionSignature: string;
  statusId: string;
  statusName: string; // e.g. "IN_PROGRESS" | "FINISHED"
  registrationUrl: string;
  presenceUrl: string;
  registrationQrCodeUrl: string;
  presenceQrCodeUrl: string;
  registeredCount: number;
  presentCount: number;
  participants: Page<EventAttendee>;
  createdAt: string;
  updatedAt: string;
}
