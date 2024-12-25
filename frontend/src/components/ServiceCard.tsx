import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { StatusBadge } from "./StatusBadge";
import {
  MoreVertical,
  LineChart,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Service, ServiceStatus } from "../types";

interface ServiceCardProps {
  service: Service;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewHistory?: () => void;
}

export function ServiceCard({
  service,
  onEdit,
  onDelete,
  onViewHistory,
}: ServiceCardProps) {
  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case ServiceStatus.OPERATIONAL:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case ServiceStatus.DEGRADED_PERFORMANCE:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case ServiceStatus.PARTIAL_OUTAGE:
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case ServiceStatus.MAJOR_OUTAGE:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getStatusIcon(service.currentStatus)}
            <div>
              <h3 className="font-medium">{service.name}</h3>
              {service.description && (
                <p className="text-sm text-gray-500">{service.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <LineChart className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {service.uptimePercentage.toFixed(2)}%
              </span>
            </div>

            <StatusBadge status={service.currentStatus} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={onViewHistory}>
                  View History
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onEdit}>
                  Edit Service
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onDelete} className="text-red-600">
                  Delete Service
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
