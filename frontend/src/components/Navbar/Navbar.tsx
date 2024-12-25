import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Activity, Bell, Server, Users } from "lucide-react";
import { AppRoutes } from "../../types/routes";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Activity, label: "Overview", route: AppRoutes.Dashboard },
    { icon: Server, label: "Services", route: AppRoutes.ServiceManagement },
    { icon: Bell, label: "Incidents", route: AppRoutes.IncidentManagement },
    { icon: Users, label: "Team", route: AppRoutes.ViewTeamMembers },
  ];

  const isActiveRoute = (route: string) => {
    if (route === AppRoutes.Dashboard) {
      return location.pathname === "/dashboard";
    }
    // Check for both the base services route and the manage route
    if (route === AppRoutes.ServiceManagement) {
      return location.pathname === "/services/manage";
    }

    if (route === AppRoutes.IncidentManagement) {
      return location.pathname === "/incidents/manage";
    }

    if (route === AppRoutes.ViewTeamMembers) {
      return location.pathname === "/teams/view-members";
    }
    return location.pathname.startsWith(route.split("/")[1]);
  };

  return (
    <div className="fixed w-64 h-full bg-white border-r">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">TechCorp Admin</h1>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.route);

          return (
            <Button
              key={item.label}
              variant={isActive ? "default" : "outline"}
              className={`w-full justify-start ${
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }`}
              onClick={() => navigate(item.route)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
