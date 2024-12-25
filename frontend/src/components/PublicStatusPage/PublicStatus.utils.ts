import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Incident,
  IncidentSeverity,
  IncidentStatus,
  Service,
  ServiceStatus,
} from "../../types";

export const getStatusColor = (status: ServiceStatus) => {
  const colors = {
    [ServiceStatus.OPERATIONAL]: "bg-green-500/10 text-green-500",
    [ServiceStatus.DEGRADED_PERFORMANCE]: "bg-yellow-500/10 text-yellow-500",
    [ServiceStatus.PARTIAL_OUTAGE]: "bg-orange-500/10 text-orange-500",
    [ServiceStatus.MAJOR_OUTAGE]: "bg-red-500/10 text-red-500",
  };
  return colors[status];
};

export const getIncidentSeverityColor = (severity: IncidentSeverity) => {
  const colors = {
    [IncidentSeverity.MINOR]:
      "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
    [IncidentSeverity.MAJOR]:
      "bg-orange-500/10 border-orange-500/20 text-orange-500",
    [IncidentSeverity.CRITICAL]: "bg-red-500/10 border-red-500/20 text-red-500",
  };
  return colors[severity];
};

export const getIncidentStatusIcon = (status: IncidentStatus) => {
  switch (status) {
    case IncidentStatus.INVESTIGATING:
      return AlertCircle;
    case IncidentStatus.IDENTIFIED:
    case IncidentStatus.MONITORING:
      return AlertTriangle;
    case IncidentStatus.RESOLVED:
      return CheckCircle2;
  }
};

interface Organization {
  id: string;
  name: string;
  services: Service[];
  incidents: Incident[];
}

export const organizations: Organization[] = [
  {
    id: "1",
    name: "TechCorp",
    services: [
      {
        id: "1",
        name: "API Gateway",
        description: "Main API Gateway Service",
        currentStatus: ServiceStatus.OPERATIONAL,
        uptimePercentage: 99.99,
        organizationId: "1",
        createdAt: "2023-09-15T09:00:00Z",
        updatedAt: "2024-03-20T11:15:00Z",
      },
      {
        id: "2",
        name: "Database Cluster",
        description: "Primary Database Cluster",
        currentStatus: ServiceStatus.DEGRADED_PERFORMANCE,
        uptimePercentage: 99.95,
        organizationId: "1",
        createdAt: "2023-09-15T09:00:00Z",
        updatedAt: "2024-03-20T11:15:00Z",
      },
    ],
    incidents: [
      {
        id: "1",
        title: "Database Performance Degradation",
        description: "Investigating increased latency in database queries.",
        startedAt: "2024-03-20T09:00:00Z",
        severity: IncidentSeverity.MAJOR,
        status: IncidentStatus.INVESTIGATING,
        serviceId: "2",
      },
      {
        id: "5",
        title: "Database Performance Degradation",
        description: "Investigating increased latency in database queries.",
        startedAt: "2024-03-20T09:00:00Z",
        severity: IncidentSeverity.MINOR,
        status: IncidentStatus.INVESTIGATING,
        serviceId: "2",
      },
    ],
  },
  {
    id: "2",
    name: "StartupInc",
    services: [
      {
        id: "3",
        name: "Authentication Service",
        description: "User Authentication System",
        currentStatus: ServiceStatus.PARTIAL_OUTAGE,
        uptimePercentage: 98.5,
        organizationId: "2",
        createdAt: "2023-09-15T09:00:00Z",
        updatedAt: "2024-03-20T11:15:00Z",
      },
    ],
    incidents: [
      {
        id: "2",
        title: "Authentication Service Degradation",
        description: "Users experiencing intermittent login issues.",
        startedAt: "2024-03-20T10:00:00Z",
        severity: IncidentSeverity.MINOR,
        status: IncidentStatus.RESOLVED,
        serviceId: "3",
      },
      {
        id: "3",
        title: "Authentication Service Degradation",
        description: "Users experiencing intermittent login issues.",
        startedAt: "2024-03-20T10:00:00Z",
        severity: IncidentSeverity.CRITICAL,
        status: IncidentStatus.MONITORING,
        serviceId: "3",
      },
    ],
  },
];
