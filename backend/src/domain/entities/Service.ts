import { ServiceStatus } from "../enums/index.js";

export interface Service {
  id?: string;
  name: string;
  description?: string | null;
  currentStatus: ServiceStatus;
  uptimePercentage: number;
  organizationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
