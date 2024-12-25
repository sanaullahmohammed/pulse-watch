import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Plus,
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  Incident,
  IncidentSeverity,
  IncidentStatus,
  Service,
} from "../../types";
import { Navbar } from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../types/routes";

export default function IncidentManagement({
  incidents,
  services,
  loading,
  error,
}: {
  incidents: Incident[];
  services: Service[];
  loading: boolean;
  error: string | null;
}) {
  const navigate = useNavigate();

  const getStatusIcon = (status: IncidentStatus) => {
    switch (status) {
      case IncidentStatus.INVESTIGATING:
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case IncidentStatus.IDENTIFIED:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case IncidentStatus.MONITORING:
        return <Clock className="h-5 w-5 text-blue-500" />;
      case IncidentStatus.RESOLVED:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: IncidentSeverity) => {
    switch (severity) {
      case IncidentSeverity.MINOR:
        return "bg-yellow-500/10 text-yellow-500";
      case IncidentSeverity.MAJOR:
        return "bg-orange-500/10 text-orange-500";
      case IncidentSeverity.CRITICAL:
        return "bg-red-500/10 text-red-500";
      default:
        return "";
    }
  };

  const getServiceName = (serviceId: string): string => {
    const service = services.find((s) => s.id === serviceId);
    return service?.name || "Unknown Service";
  };

  const handleUpdateIncident = (
    serviceId: string,
    incidentId: string | undefined
  ) => {
    if (incidentId) {
      navigate(`/incidents/manage/${serviceId}/${incidentId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 ml-64 flex items-center justify-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Incidents</h1>
            <Button onClick={() => navigate(AppRoutes.ReportIncident)}>
              <Plus className="mr-2 h-4 w-4" />
              Report Incident
            </Button>
          </div>

          {/* Tabs */}
          <div className="space-y-4 mb-6">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-6 bg-transparent space-x-2">
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-black data-[state=active]:text-white bg-white text-black"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="resolved"
                  className="data-[state=active]:bg-black data-[state=active]:text-white bg-white text-black"
                >
                  Resolved
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-black data-[state=active]:text-white bg-white text-black"
                >
                  All Incidents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4 mt-6">
                {incidents
                  .filter((i) => i.status !== IncidentStatus.RESOLVED)
                  .map((incident: Incident) => (
                    <Card key={incident.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            {getStatusIcon(incident.status)}
                            <div>
                              <h3 className="font-medium">{incident.title}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-gray-500">
                                  {getServiceName(incident.serviceId)}
                                </span>
                                <Badge
                                  className={getSeverityColor(
                                    incident.severity
                                  )}
                                >
                                  {incident.severity}
                                </Badge>
                              </div>
                              <p className="mt-2 text-sm text-gray-600">
                                {incident.description}
                              </p>
                              <div className="mt-2 text-sm text-gray-500">
                                Started:{" "}
                                {new Date(incident.startedAt).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateIncident(
                                incident.serviceId,
                                incident.id
                              )
                            }
                          >
                            Update
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-4 mt-6">
                {incidents
                  .filter((i) => i.status === IncidentStatus.RESOLVED)
                  .map((incident: Incident) => (
                    <Card key={incident.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between opacity-75">
                          <div className="flex items-start space-x-4">
                            {getStatusIcon(incident.status)}
                            <div>
                              <h3 className="font-medium">{incident.title}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-gray-500">
                                  {getServiceName(incident.serviceId)}
                                </span>
                                <Badge
                                  className={getSeverityColor(
                                    incident.severity
                                  )}
                                >
                                  {incident.severity}
                                </Badge>
                              </div>
                              <p className="mt-2 text-sm text-gray-600">
                                {incident.description}
                              </p>
                              {incident.resolvedAt && (
                                <p className="text-sm text-gray-500 mt-2">
                                  Resolved at{" "}
                                  {new Date(
                                    incident.resolvedAt
                                  ).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateIncident(
                                incident.serviceId,
                                incident.id
                              )
                            }
                          >
                            Update
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="all" className="space-y-4 mt-6">
                {incidents.map((incident: Incident) => (
                  <Card key={incident.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          {getStatusIcon(incident.status)}
                          <div>
                            <h3 className="font-medium">{incident.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-500">
                                {getServiceName(incident.serviceId)}
                              </span>
                              <Badge
                                className={getSeverityColor(incident.severity)}
                              >
                                {incident.severity}
                              </Badge>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                              {incident.description}
                            </p>
                            <div className="mt-2 text-sm text-gray-500">
                              Started:{" "}
                              {new Date(incident.startedAt).toLocaleString()}
                              {incident.resolvedAt && (
                                <span className="ml-4">
                                  Resolved:{" "}
                                  {new Date(
                                    incident.resolvedAt
                                  ).toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateIncident(
                              incident.serviceId,
                              incident.id
                            )
                          }
                        >
                          Update
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
