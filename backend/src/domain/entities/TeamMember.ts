import { OrganizationRole } from "../enums/index.js";

export interface TeamMember {
  id?: string;
  role: OrganizationRole;
  teamId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
