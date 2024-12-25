import { IncidentStatus } from "../enums/index.js";

export interface IncidentUpdate {
  id?: string;
  message: string;
  status: IncidentStatus;
  incidentId: string;
  createdAt?: Date;
}
