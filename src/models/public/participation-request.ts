export interface ParticipationRequest {
  name: string;
  email: string; // lowercase
  cpf: string; // digits only, e.g. "09515726875"
}
