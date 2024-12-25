import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";
import {
  ArrowLeft,
  AlertCircle,
  MessageSquare,
  Clock,
  Shield,
} from "lucide-react";
import {
  Incident,
  IncidentSeverity,
  IncidentStatus,
  Service,
} from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Mock data for testing
const MOCK_INCIDENT: Incident = {
  id: "1",
  title: "API Performance Degradation",
  description: "Major performance issues detected in API endpoints",
  status: IncidentStatus.INVESTIGATING,
  severity: IncidentSeverity.MAJOR,
  serviceId: "1",
  startedAt: "2024-03-24T08:00:00Z",
  resolvedAt: null,
  createdAt: "2024-03-24T08:00:00Z",
  updatedAt: "2024-03-24T08:00:00Z",
};

interface IncidentUpdate {
  status: IncidentStatus;
  message: string;
  timestamp: string;
}

const MOCK_UPDATES: IncidentUpdate[] = [
  {
    status: IncidentStatus.INVESTIGATING,
    message: "Investigating increased latency in API responses",
    timestamp: "2024-03-24T08:00:00Z",
  },
];

export default function UpdateIncident({
  services,
  organizationId,
}: {
  services: Service[];
  organizationId: string;
}) {
  const navigate = useNavigate();
  const { serviceId, incidentId } = useParams();

  const [incident, setIncident] = useState<Incident | null>(null);
  const [updates, setUpdates] = useState<IncidentUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    status: IncidentStatus.INVESTIGATING,
    message: "",
  });

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/organizations/${organizationId}/services/${serviceId}/incidents/${incidentId}`);
        // if (!response.ok) throw new Error('Failed to fetch incident');
        // const data = await response.json();
        // setIncident(data);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIncident(MOCK_INCIDENT);
        setUpdates(MOCK_UPDATES);
        setFormData({
          status: MOCK_INCIDENT.status,
          message: "",
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch incident"
        );
      } finally {
        setLoading(false);
      }
    };

    if (serviceId && incidentId) {
      fetchIncident();
    }
  }, [serviceId, incidentId, organizationId]);

  const handlePostUpdate = async () => {
    try {
      if (!formData.message.trim()) {
        // Add error notification here
        return;
      }

      // TODO: Replace with actual API call
      // const response = await fetch(`/api/organizations/${organizationId}/services/${serviceId}/incidents/${incidentId}/updates`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Failed to post update');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setFormData((prev) => ({ ...prev, message: "" }));

      // Refresh incident data
      // TODO: Replace with actual API call to get latest updates
      setUpdates([
        {
          status: formData.status,
          message: formData.message,
          timestamp: new Date().toISOString(),
        },
        ...updates,
      ]);
    } catch (error) {
      console.error("Error posting update:", error);
      // Add error notification here
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading incident details...</div>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="p-8 max-w-4xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || "Incident not found"}</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button
            variant="outline"
            className="mr-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{incident.title}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-gray-500">
                {services.find((s) => s.id === incident.serviceId)?.name}
              </span>
              <Badge variant="outline">
                {incident.status.replace(/_/g, " ")}
              </Badge>
            </div>
          </div>
        </div>
        {incident.status !== IncidentStatus.RESOLVED && (
          <Button
            className="bg-black text-white hover:bg-black/90"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                status: IncidentStatus.RESOLVED,
              }))
            }
          >
            Resolve Incident
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* New Update Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Post New Update</h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: IncidentStatus) =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(IncidentStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="Provide an update on the incident..."
                    className="h-32"
                  />
                  <p className="text-sm text-gray-500">
                    Include any relevant details about current status and next
                    steps
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-black text-white hover:bg-black/90"
                    onClick={handlePostUpdate}
                    type="button"
                  >
                    Post Update
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Update Timeline */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Update Timeline</h2>
              <div className="space-y-6">
                {updates.map((update, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="mt-1">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2">
                        {update.status.replace(/_/g, " ")}
                      </Badge>
                      <p className="text-gray-600 mb-2">{update.message}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(update.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Incident Details</h3>
              <div className="space-y-4">
                <div className="text-sm">
                  <div className="text-gray-500 mb-1">Started</div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {new Date(incident.startedAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500 mb-1">Severity</div>
                  <Badge variant="outline">{incident.severity}</Badge>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500 mb-1">Affected Service</div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    {services.find((s) => s.id === incident.serviceId)?.name}
                  </div>
                </div>
                {incident.resolvedAt && (
                  <div className="text-sm">
                    <div className="text-gray-500 mb-1">Resolved</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(incident.resolvedAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              All updates will be visible on your public status page.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
