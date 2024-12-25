import {
  IncidentSeverity,
  IncidentStatus,
  Service,
  ServiceStatus,
} from "../types";

export const sampleIncidents = [
  {
    id: "1",
    title: "Database Performance Degradation",
    description: "Investigating increased latency in database queries",
    status: IncidentStatus.INVESTIGATING,
    severity: IncidentSeverity.MAJOR,
    startedAt: "2024-12-23T10:00:00Z", // 2 days ago
    serviceId: "2", // Database Cluster
    organizationId: "org1",
  },
  {
    id: "2",
    title: "Storage Service Outage",
    description: "Complete outage in storage service affecting file uploads",
    status: IncidentStatus.IDENTIFIED,
    severity: IncidentSeverity.CRITICAL,
    startedAt: "2024-12-24T15:30:00Z", // 1 day ago
    serviceId: "4", // Storage Service
    organizationId: "org1",
  },
  {
    id: "3",
    title: "Email Delivery Delays",
    description: "Emails experiencing delayed delivery",
    status: IncidentStatus.MONITORING,
    severity: IncidentSeverity.MINOR,
    startedAt: "2024-12-24T18:00:00Z", // 1 day ago
    serviceId: "6", // Email Service
    organizationId: "org1",
  },
  {
    id: "4",
    title: "API Gateway Timeout",
    description: "Resolved - API requests were timing out",
    status: IncidentStatus.RESOLVED,
    severity: IncidentSeverity.MAJOR,
    startedAt: "2024-12-18T09:00:00Z", // 7 days ago
    resolvedAt: "2024-12-18T11:00:00Z",
    serviceId: "1", // API Gateway
    organizationId: "org1",
  },
  {
    id: "5",
    title: "Search Engine Latency",
    description: "Resolved - High latency in search results",
    status: IncidentStatus.RESOLVED,
    severity: IncidentSeverity.MINOR,
    startedAt: "2024-12-15T14:00:00Z", // 10 days ago
    resolvedAt: "2024-12-15T16:30:00Z",
    serviceId: "5", // Search Engine
    organizationId: "org1",
  },
];

export const sampleServices: Service[] = [
  {
    id: "1",
    name: "API Gateway",
    description: "Primary API Gateway",
    currentStatus: ServiceStatus.OPERATIONAL,
    uptimePercentage: 99.99,
    organizationId: "org1",
    createdAt: "2024-12-15T00:00:00Z", // 10 days ago
  },
  {
    id: "2",
    name: "Database Cluster",
    description: "Main Database Service",
    currentStatus: ServiceStatus.DEGRADED_PERFORMANCE,
    uptimePercentage: 99.95,
    organizationId: "org1",
    createdAt: "2024-12-20T00:00:00Z", // 5 days ago - This will count as new
  },
  {
    id: "3",
    name: "Authentication Service",
    description: "User Auth System",
    currentStatus: ServiceStatus.OPERATIONAL,
    uptimePercentage: 99.98,
    organizationId: "org1",
    createdAt: "2024-11-10T00:00:00Z", // Older service
  },
  {
    id: "4",
    name: "Storage Service",
    description: "File Storage System",
    currentStatus: ServiceStatus.MAJOR_OUTAGE,
    uptimePercentage: 95.0,
    organizationId: "org1",
    createdAt: "2024-12-21T00:00:00Z", // 4 days ago - This will count as new
  },
  {
    id: "5",
    name: "Search Engine",
    description: "Search Infrastructure",
    currentStatus: ServiceStatus.OPERATIONAL,
    uptimePercentage: 99.97,
    organizationId: "org1",
    createdAt: "2024-12-01T00:00:00Z", // Older service
  },
  {
    id: "6",
    name: "Email Service",
    description: "Email Delivery System",
    currentStatus: ServiceStatus.PARTIAL_OUTAGE,
    uptimePercentage: 98.5,
    organizationId: "org1",
    createdAt: "2024-12-23T00:00:00Z", // 2 days ago - This will count as new
  },
];

import { Team, TeamMember, UserRoles } from "../types";

export const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "Platform Engineering",
    organizationId: "org-1",
  },
  {
    id: "team-2",
    name: "Infrastructure",
    organizationId: "org-1",
  },
  {
    id: "team-3",
    name: "Frontend Development",
    organizationId: "org-1",
  },
  {
    id: "team-4",
    name: "Backend Development",
    organizationId: "org-1",
  },
  {
    id: "team-5",
    name: "DevOps",
    organizationId: "org-1",
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: "member-1",
    teamId: "team-1",
    userId: "user-1",
    role: UserRoles.TEAM_ADMIN,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "member-2",
    teamId: "team-1",
    userId: "user-2",
    role: UserRoles.SERVICE_MANAGER,
    name: "Mike Chen",
    email: "mike.c@example.com",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "member-3",
    teamId: "team-1",
    userId: "user-3",
    role: UserRoles.TEAM_MEMBER,
    name: "Alex Thompson",
    email: "alex.t@example.com",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "member-4",
    teamId: "team-2",
    userId: "user-4",
    role: UserRoles.TEAM_ADMIN,
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "member-5",
    teamId: "team-2",
    userId: "user-5",
    role: UserRoles.TEAM_MEMBER,
    name: "David Kim",
    email: "david.k@example.com",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "member-6",
    teamId: "team-3",
    userId: "user-6",
    role: UserRoles.TEAM_ADMIN,
    name: "Rachel Green",
    email: "rachel.g@example.com",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "member-7",
    teamId: "team-3",
    userId: "user-7",
    role: UserRoles.FREELANCER,
    name: "James Wilson",
    email: "james.w@example.com",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "member-8",
    teamId: "team-4",
    userId: "user-8",
    role: UserRoles.TEAM_ADMIN,
    name: "Lisa Brown",
    email: "lisa.b@example.com",
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
  {
    id: "member-9",
    teamId: "team-4",
    userId: "user-9",
    role: UserRoles.SERVICE_MANAGER,
    name: "Tom Davis",
    email: "tom.d@example.com",
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
  {
    id: "member-10",
    teamId: "team-5",
    userId: "user-10",
    role: UserRoles.TEAM_ADMIN,
    name: "Nina Patel",
    email: "nina.p@example.com",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: "member-11",
    teamId: "team-5",
    userId: "user-11",
    role: UserRoles.OWNER,
    name: "Chris Martinez",
    email: "chris.m@example.com",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: "member-12",
    teamId: "team-5",
    userId: "user-12",
    role: UserRoles.ADMIN,
    name: "Sophie Taylor",
    email: "sophie.t@example.com",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-15"),
  },
];

export const mockFetchServicesData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: sampleServices,
  };
};

// For testing without API:
export const mockFetchTeamData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    totalMembers: 12,
    totalTeams: 3,
  };
};

export const mockFetchIncidentsData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: sampleIncidents,
  };
};
