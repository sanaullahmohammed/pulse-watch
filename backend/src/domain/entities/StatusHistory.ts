import { ServiceStatus } from "../enums/index.js";

export interface StatusHistory {
  id?: string;
  serviceId: string;
  status: ServiceStatus;
  message?: string | null;
  createdAt?: Date;
}
