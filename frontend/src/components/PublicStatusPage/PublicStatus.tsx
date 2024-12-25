import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { IncidentStatus, ServiceStatus } from "../../types";
import {
  getIncidentSeverityColor,
  getIncidentStatusIcon,
  getStatusColor,
  organizations,
} from "./PublicStatus.utils";
import { StatusIndicator } from "./StatusIndicator";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../types/routes";

const PublicStatusDashboard = () => {
  const [selectedOrg, setSelectedOrg] = useState<string>("all");
  // const [userAuthenticated, setUserAuthenticated] = useState(false);
  const navigate = useNavigate();

  const filteredOrgs =
    selectedOrg === "all"
      ? organizations
      : organizations.filter((org) => org.id === selectedOrg);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white border-b">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl font-semibold">Status Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Monitor your services in real-time
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* TODO : Uncomment when required */}
                {/* {userAuthenticated ? (
                  <Button
                    variant="default"
                    onClick={() => navigate(AppRoutes.Dashboard)}
                  >
                    My Dashboard
                  </Button>
                ) : ( */}
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate(AppRoutes.SignUp)}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => navigate(AppRoutes.SignUp)}
                  >
                    Sign Up
                  </Button>
                </>
                {/* )} */}
              </div>
            </div>
            <div className="flex justify-end">
              <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Organizations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          {filteredOrgs.map((org) => (
            <div key={org.id} className="space-y-4">
              <h2 className="text-2xl font-bold pt-6">{org.name}</h2>
              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {org.services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between py-3 px-4 border rounded-lg bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <StatusIndicator status={service.currentStatus} />
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            {service.uptimePercentage.toFixed(2)}%
                          </span>
                          <Badge
                            className={`${getStatusColor(
                              service.currentStatus
                            )} px-2 py-0.5 uppercase text-xs font-medium`}
                          >
                            {service.currentStatus.replace(/_/g, " ")}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Incidents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {org.incidents
                    .filter(
                      (incident) => incident.status !== IncidentStatus.RESOLVED
                    )
                    .map((incident) => {
                      const StatusIcon = getIncidentStatusIcon(incident.status);
                      return (
                        <Alert
                          key={incident.id}
                          className={getIncidentSeverityColor(
                            incident.severity
                          )}
                        >
                          <StatusIcon className="h-4 w-4" />
                          <AlertTitle className="flex items-center gap-2">
                            {incident.title}
                            <Badge variant="outline">
                              {incident.status.toLowerCase()}
                            </Badge>
                          </AlertTitle>
                          <AlertDescription>
                            <div className="text-sm text-gray-500">
                              Started:{" "}
                              {new Date(incident.startedAt).toLocaleString()}
                            </div>
                            <div className="mt-2">{incident.description}</div>
                          </AlertDescription>
                        </Alert>
                      );
                    })}
                </CardContent>
              </Card>

              {/* Past Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle>Past Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {org.incidents
                      .filter(
                        (incident) =>
                          incident.status === IncidentStatus.RESOLVED
                      )
                      .map((incident) => (
                        <div key={incident.id} className="border-b pb-4">
                          <div className="flex items-center space-x-2">
                            <StatusIndicator
                              status={ServiceStatus.OPERATIONAL}
                              className="h-2 w-2"
                            />
                            <div>
                              <h3 className="font-medium">{incident.title}</h3>
                              <div className="mt-1 text-sm text-gray-500">
                                Resolved{" "}
                                {new Date(incident.startedAt).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicStatusDashboard;
