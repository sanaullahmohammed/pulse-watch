import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Service } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const RecentActivity = ({
  services,
  loading,
  error,
}: {
  services: Service[];
  loading: boolean;
  error: string | null;
}) => {
  const navigate = useNavigate();

  const servicesWithUpdates = services.map((service) => ({
    ...service,
    updatedAt: service.createdAt, // Initially set updatedAt to createdAt
  }));

  const latestServices = [...servicesWithUpdates]
    .sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <>
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : (
              latestServices.map((service) => {
                const formattedDate = service.updatedAt
                  ? new Date(service.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Date not available";

                return (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-500">
                        Current Status:{" "}
                        {service.currentStatus.replace(/_/g, " ")}
                        {service.description && (
                          <span className="block mt-1">
                            {service.description}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {formattedDate}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-[160px] p-1 bg-white border rounded-md shadow-md"
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/services/update/${service.id}`)
                            }
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:text-gray-900"
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/services/update/${service.id}?edit=true`
                              )
                            }
                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:text-gray-900"
                          >
                            Edit Service
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RecentActivity;
