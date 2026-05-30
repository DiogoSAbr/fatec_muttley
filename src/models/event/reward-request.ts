/** Body of POST {{url}}events/:id/reward. */
export interface RewardRequest {
  participantIds: string[];
  description: string;
  competencies: string; // comma-separated
}
