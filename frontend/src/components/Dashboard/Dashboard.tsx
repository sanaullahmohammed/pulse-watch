import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../types/routes";
import { Navbar } from "../Navbar/Navbar";
import ActiveIncidentsCard from "./ActiveIncidentCard";
import ServicesCard from "./ServicesCard";
import TeamMembersCard from "./TeamMembersCard";
import { Incident, Service, Team, TeamMember } from "../../types";
import RecentActivity from "./RecentActivity";
import { Plus, Bell } from "lucide-react";

export default function Dashboard({
  services,
  incidents,
  teams,
  teamMembers,
  loading,
  error,
}: {
  services: Service[];
  incidents: Incident[];
  teams: Team[];
  teamMembers: TeamMember[];
  loading: boolean;
  error: string | null;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto">
        <div className="p-4 lg:p-8 w-full">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto"
                onClick={() => navigate(AppRoutes.CreateService)}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Service
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate(AppRoutes.ReportIncident)}
              >
                <Bell className="mr-2 h-4 w-4" />
                Report Incident
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ActiveIncidentsCard
              incidents={incidents}
              loading={loading}
              error={error}
            />
            <ServicesCard services={services} loading={loading} error={error} />
            <TeamMembersCard
              teams={teams}
              teamMembers={teamMembers}
              loading={loading}
            />
          </div>

          {/* Recent Activity */}
          <RecentActivity services={services} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
