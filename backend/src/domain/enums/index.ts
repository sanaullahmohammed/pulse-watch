export enum OrganizationRole {
  Owner = "OWNER",
  Admin = "ADMIN",
  TeamAdmin = "TEAM_ADMIN",
  ServiceManager = "SERVICE_MANAGER",
  StatusReporter = "STATUS_REPORTER",
  TeamMember = "TEAM_MEMBER",
  BillingManager = "BILLING_MANAGER",
  Freelancer = "FREELANCER",
}

export enum ServiceStatus {
  Operational = "OPERATIONAL",
  DegradedPerformance = "DEGRADED_PERFORMANCE",
  PartialOutage = "PARTIAL_OUTAGE",
  MajorOutage = "MAJOR_OUTAGE",
}

export enum IncidentStatus {
  Investigating = "INVESTIGATING",
  Identified = "IDENTIFIED",
  Monitoring = "MONITORING",
  Resolved = "RESOLVED",
}

export enum IncidentSeverity {
  Minor = "MINOR",
  Major = "MAJOR",
  Critical = "CRITICAL",
}
