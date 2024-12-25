import { Incident } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Activity } from "lucide-react";

const ActiveIncidentsCard = ({
  incidents,
  loading,
  error,
}: {
  incidents: Incident[];
  loading: boolean;
  error: string | null;
}) => {
  const activeIncidents = incidents.filter(
    (incident) => incident.status !== "RESOLVED"
  ).length;
  const totalIncidents = incidents.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
        <Activity className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>
            <div className="text-2xl font-bold">...</div>
            <p className="text-xs text-gray-500">Loading incidents...</p>
          </div>
        ) : error ? (
          <div>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{activeIncidents}</div>
            <p className="text-xs text-gray-500">
              {activeIncidents === 0
                ? "All systems operational"
                : `${totalIncidents} total incidents`}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveIncidentsCard;
