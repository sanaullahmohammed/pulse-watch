import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowLeft, Activity, Settings, Bell, Pencil } from "lucide-react";
import {
  IncidentStatus,
  Service,
  ServiceStatus,
  Incident,
  IncidentSeverity,
} from "../../types";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppRoutes } from "../../types/routes";
import { useEffect, useState } from "react";

const MOCK_SERVICE: Service = {
  id: "1",
  name: "API Gateway",
  description: "Main API Gateway Service",
  currentStatus: ServiceStatus.OPERATIONAL,
  uptimePercentage: 99.99,
  organizationId: "1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock data for testing
const MOCK_INCIDENTS: Incident[] = [
  {
    id: "1",
    title: "API Latency Issues",
    description: "Experiencing increased latency in API responses",
    status: IncidentStatus.RESOLVED,
    severity: IncidentSeverity.MAJOR,
    createdAt: "2024-03-25T10:00:00Z",
    updatedAt: "2024-03-25T12:00:00Z",
    serviceId: "1",
    startedAt: "",
  },
  {
    id: "2",
    title: "Database Connection Errors",
    description: "Intermittent database connection failures",
    status: IncidentStatus.MONITORING,
    severity: IncidentSeverity.CRITICAL,
    createdAt: "2024-03-26T15:00:00Z",
    updatedAt: "2024-03-26T15:30:00Z",
    serviceId: "1",
    startedAt: "",
  },
];

export default function UpdateServicePage() {
  const navigate = useNavigate();
  const { serviceId, orgId } = useParams();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";

  const [service, setService] = useState<Service | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingIncidents, setLoadingIncidents] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: ServiceStatus.OPERATIONAL,
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        // TODO : In production, replace with actual API call
        // const response = await fetch(`/api/organizations/${orgId}/services/${serviceId}`);
        // if (!response.ok) throw new Error('Failed to fetch service');
        // const data = await response.json();
        // setService(data);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setService(MOCK_SERVICE);
        setFormData({
          name: MOCK_SERVICE.name,
          description: MOCK_SERVICE.description || "",
          status: MOCK_SERVICE.currentStatus,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch service"
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchIncidents = async () => {
      try {
        setLoadingIncidents(true);
        // TODO : In production, replace with actual API call
        // const response = await fetch(`/api/organizations/${orgId}/services/${serviceId}/incidents`);
        // if (!response.ok) throw new Error('Failed to fetch incidents');
        // const data = await response.json();
        // setIncidents(data);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIncidents(MOCK_INCIDENTS);
      } catch (err) {
        console.error("Failed to fetch incidents:", err);
      } finally {
        setLoadingIncidents(false);
      }
    };

    if (serviceId) {
      fetchService();
      fetchIncidents();
    }
  }, [serviceId, orgId]);

  const handleUpdateService = async () => {
    try {
      // TODO : In production, replace with actual API call
      const response = await fetch(`/api/organizations/${orgId}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: serviceId,
          name: formData.name,
          description: formData.description,
          currentStatus: formData.status,
        }),
      });
      if (!response.ok) throw new Error("Failed to update service");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(AppRoutes.ServiceManagement);
    } catch (error) {
      console.error("Error updating service:", error);
      // Add error notification here
    }
  };

  const getSeverityColor = (severity: IncidentSeverity) => {
    switch (severity) {
      case IncidentSeverity.CRITICAL:
        return "bg-red-500/10 text-red-500";
      case IncidentSeverity.MAJOR:
        return "bg-orange-500/10 text-orange-500";
      case IncidentSeverity.MINOR:
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case IncidentStatus.INVESTIGATING:
        return "bg-purple-500/10 text-purple-500";
      case IncidentStatus.IDENTIFIED:
        return "bg-blue-500/10 text-blue-500";
      case IncidentStatus.MONITORING:
        return "bg-yellow-500/10 text-yellow-500";
      case IncidentStatus.RESOLVED:
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading service details...</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="p-8 max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || "Service not found"}</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button
            variant="outline"
            className="mr-4"
            onClick={() => navigate(AppRoutes.ServiceManagement)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{service.name}</h1>
            <p className="text-gray-500">{service.description}</p>
          </div>
        </div>
        <Badge className="bg-green-500/10 text-green-500">
          {service.currentStatus.replace(/_/g, " ")}
        </Badge>
      </div>

      {/* Main Content */}
      <Tabs defaultValue={isEdit ? "settings" : "overview"}>
        <TabsList className="mb-6 bg-transparent space-x-2">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-black data-[state=active]:text-white bg-white text-black"
          >
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-black data-[state=active]:text-white bg-white text-black"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="incidents"
            className="data-[state=active]:bg-black data-[state=active]:text-white bg-white text-black"
          >
            <Bell className="h-4 w-4 mr-2" />
            Incidents
          </TabsTrigger>
        </TabsList>

        <div className="w-full">
          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Current Status</h3>
                    <div className="text-2xl font-bold text-green-500">
                      {service.currentStatus.replace(/_/g, " ")}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Last updated{" "}
                      {new Date(service.updatedAt || "").toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Uptime</h3>
                    <div className="text-2xl font-bold">
                      {service.uptimePercentage.toFixed(2)}%
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Service Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: ServiceStatus) =>
                          setFormData((prev) => ({ ...prev, status: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ServiceStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate(AppRoutes.ServiceManagement)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-black text-white hover:bg-black/90"
                      onClick={handleUpdateService}
                      type="button"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents">
            <Card>
              <CardHeader className="flex-row flex items-center justify-between">
                <CardTitle>Incidents</CardTitle>
                <Button
                  onClick={() => navigate(`/incidents/manage/${serviceId}/new`)}
                  className="bg-black text-white hover:bg-black/90"
                >
                  Create Incident
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                {loadingIncidents ? (
                  <div className="text-center py-4">Loading incidents...</div>
                ) : incidents.length === 0 ? (
                  <div className="text-center text-gray-500">
                    No incidents reported for this service.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {incidents.map((incident) => (
                      <Card key={incident.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium">
                                  {incident.title}
                                </h3>
                                <Badge
                                  className={getSeverityColor(
                                    incident.severity
                                  )}
                                >
                                  {incident.severity}
                                </Badge>
                                <Badge
                                  className={getStatusColor(incident.status)}
                                >
                                  {incident.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">
                                {incident.description}
                              </p>
                              <p className="text-xs text-gray-400">
                                Created:{" "}
                                {new Date(
                                  incident.createdAt as string
                                ).toLocaleString()}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(
                                  `/incidents/manage/${serviceId}/${incident.id}`
                                )
                              }
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
