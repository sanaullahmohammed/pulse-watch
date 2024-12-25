import { Badge } from "./ui/badge";
import { IncidentSeverity, IncidentStatus, ServiceStatus } from "../types";
import { cn } from "../lib/utils";

interface StatusBadgeProps {
  status: ServiceStatus | IncidentStatus | IncidentSeverity;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case ServiceStatus.OPERATIONAL:
      case IncidentStatus.RESOLVED:
        return "bg-green-500/10 text-green-500";
      case ServiceStatus.DEGRADED_PERFORMANCE:
      case IncidentStatus.MONITORING:
      case IncidentSeverity.MINOR:
        return "bg-yellow-500/10 text-yellow-500";
      case ServiceStatus.PARTIAL_OUTAGE:
      case IncidentStatus.INVESTIGATING:
      case IncidentSeverity.MAJOR:
        return "bg-orange-500/10 text-orange-500";
      case ServiceStatus.MAJOR_OUTAGE:
      case IncidentSeverity.CRITICAL:
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <Badge className={cn(getStatusColor(status), className)}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
