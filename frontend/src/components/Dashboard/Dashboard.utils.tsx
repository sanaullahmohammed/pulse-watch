import { Activity, Server, Users } from "lucide-react";

export const statsCards = [
  {
    name: "Active Incidents",
    icon: () => <Activity className="h-4 w-4 text-gray-500" />,
  },
  {
    name: "Total Services",
    icon: () => <Server className="h-4 w-4 text-gray-500" />,
  },
  {
    name: "Team Members",
    icon: () => <Users className="h-4 w-4 text-gray-500" />,
  },
];
