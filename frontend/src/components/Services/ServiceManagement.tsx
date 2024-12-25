import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Plus,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  MoreVertical,
  LineChart,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Alert, AlertDescription } from "../ui/alert";
import { Service, ServiceStatus } from "../../types";
import { Navbar } from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AppRoutes, generatePath } from "../../types/routes";
import { useState } from "react";

// Define the delete service API function
const deleteService = async (orgId: string, serviceId: string) => {
  try {
    const response = await fetch(
      `/api/organizations/${orgId}/services/${serviceId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete service: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

export default function ServiceManagement({
  services,
  loading,
  error,
  orgId,
  onServiceDeleted,
}: {
  services: Service[];
  loading: boolean;
  error: string | null;
  orgId: string;
  onServiceDeleted: () => void;
}) {
  const navigate = useNavigate();
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleDeleteService = async () => {
    if (!serviceToDelete || !serviceToDelete.id) return;

    setIsDeleting(true);
    try {
      await deleteService(orgId, serviceToDelete.id);
      setNotification({
        type: "success",
        message: `${serviceToDelete.name} has been successfully deleted.`,
      });
      onServiceDeleted(); // Refresh the services list
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to delete the service. Please try again.",
      });
    } finally {
      setIsDeleting(false);
      setServiceToDelete(null);
      // Auto-dismiss notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case ServiceStatus.OPERATIONAL:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case ServiceStatus.DEGRADED_PERFORMANCE:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case ServiceStatus.PARTIAL_OUTAGE:
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case ServiceStatus.MAJOR_OUTAGE:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case ServiceStatus.OPERATIONAL:
        return "bg-green-500/10 text-green-500";
      case ServiceStatus.DEGRADED_PERFORMANCE:
        return "bg-yellow-500/10 text-yellow-500";
      case ServiceStatus.PARTIAL_OUTAGE:
        return "bg-orange-500/10 text-orange-500";
      case ServiceStatus.MAJOR_OUTAGE:
        return "bg-red-500/10 text-red-500";
      default:
        return "";
    }
  };

  const handleAddService = () => {
    navigate(AppRoutes.CreateService);
  };

  const handleEditService = (serviceId: string) => {
    const path = generatePath(AppRoutes.UpdateService, { serviceId });
    navigate(path + "?edit=true");
  };
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          Loading services...
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
          {/* Notification Alert */}
          {notification && (
            <div className="mb-4">
              <Alert
                variant={
                  notification.type === "success" ? "default" : "destructive"
                }
              >
                <AlertDescription className="flex justify-between items-center">
                  {notification.message}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => setNotification(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Services</h1>
            <Button onClick={handleAddService}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>

          {/* Services List */}
          <div className="space-y-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(service.currentStatus)}
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        {service.description && (
                          <p className="text-sm text-gray-500">
                            {service.description}
                          </p>
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
                      <Badge className={getStatusColor(service.currentStatus)}>
                        {service.currentStatus.replace(/_/g, " ")}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/services/update/${service.id}`)
                            }
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              service.id && handleEditService(service.id)
                            }
                          >
                            Edit Service
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setServiceToDelete(service)}
                          >
                            Delete Service
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={!!serviceToDelete}
            onOpenChange={() => setServiceToDelete(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  service "{serviceToDelete?.name}" and remove all associated
                  data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteService}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeleting ? "Deleting..." : "Delete Service"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
