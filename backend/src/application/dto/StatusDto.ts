import { Incident } from "../../domain/entities/Incident.js";
import { Service } from "../../domain/entities/Service.js";

export interface StatusDto {
  id: string; // organization-id
  name: string; // organization-name
  services: Service[];
  incidents: Incident[];
}
