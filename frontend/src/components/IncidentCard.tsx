import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { StatusBadge } from "./StatusBadge";
import { MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Incident } from "../types";

interface IncidentCardProps {
  incident: Incident;
  onAddUpdate?: () => void;
  onResolve?: () => void;
}

export function IncidentCard({
  incident,
  onAddUpdate,
  onResolve,
}: IncidentCardProps) {
  const isResolved = incident.status === "RESOLVED";
  const latestUpdate = incident.updates[incident.updates.length - 1];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{incident.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">
                  {incident.service.name}
                </span>
                <StatusBadge status={incident.severity} />
                <StatusBadge status={incident.status} />
              </div>
            </div>

            {latestUpdate && (
              <div className="flex items-start space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm">{latestUpdate.message}</p>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(latestUpdate.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            )}

            {isResolved && incident.resolvedAt && (
              <p className="text-sm text-gray-500">
                Resolved{" "}
                {formatDistanceToNow(new Date(incident.resolvedAt), {
                  addSuffix: true,
                })}
              </p>
            )}
          </div>

          {!isResolved && (
            <div className="flex space-x-2">
              {onAddUpdate && (
                <Button variant="outline" size="sm" onClick={onAddUpdate}>
                  Add Update
                </Button>
              )}
              {onResolve && (
                <Button variant="outline" size="sm" onClick={onResolve}>
                  Resolve
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
