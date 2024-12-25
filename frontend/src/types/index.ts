export enum ServiceStatus {
  OPERATIONAL = "OPERATIONAL",
  DEGRADED_PERFORMANCE = "DEGRADED_PERFORMANCE",
  PARTIAL_OUTAGE = "PARTIAL_OUTAGE",
  MAJOR_OUTAGE = "MAJOR_OUTAGE",
}

export enum IncidentStatus {
  INVESTIGATING = "INVESTIGATING",
  IDENTIFIED = "IDENTIFIED",
  MONITORING = "MONITORING",
  RESOLVED = "RESOLVED",
}

export enum IncidentSeverity {
  MINOR = "MINOR",
  MAJOR = "MAJOR",
  CRITICAL = "CRITICAL",
}

export enum UserRoles {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  TEAM_ADMIN = "TEAM_ADMIN",
  SERVICE_MANAGER = "SERVICE_MANAGER",
  TEAM_MEMBER = "TEAM_MEMBER",
  FREELANCER = "FREELANCER",
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
}

export interface Service {
  id?: string;
  name: string;
  description?: string | null;
  currentStatus: ServiceStatus;
  uptimePercentage: number;
  organizationId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Incident {
  id?: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  serviceId: string;
  startedAt: Date | string;
  resolvedAt?: Date | string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

export interface IncidentUpdate {
  id: string;
  message: string;
  status: IncidentStatus;
  timestamp: Date | string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRoles;
  organizationId: string;
}

export interface Team {
  id: string;
  name: string;
  organizationId: string;
}

export interface TeamMember {
  id?: string;
  teamId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: UserRoles;
  name: string;
  email: string;
}
