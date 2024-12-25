import { IncidentSeverity, IncidentStatus } from "../enums/index.js";

export interface Incident {
  id?: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  serviceId: string;
  startedAt: Date;
  resolvedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
