import { Service, ServiceStatus } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Server } from "lucide-react";
const ServicesCard = ({
  services,
  loading,
  error,
}: {
  services: Service[];
  loading: boolean;
  error: string | null;
}) => {
  const activeServices = services.filter(
    (service) => service.currentStatus === ServiceStatus.OPERATIONAL
  ).length;
  const totalServices = services.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Services</CardTitle>
        <Server className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? "..." : totalServices}
        </div>
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : (
          <p className="text-xs text-gray-500">
            {loading ? "Loading..." : `${activeServices} operational services`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ServicesCard;
