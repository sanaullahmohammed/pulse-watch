// Route parameters interface
export interface RouteParams {
  serviceId?: string;
}

// App routes enum for type-safe navigation
export enum AppRoutes {
  // SignIn / SignUp routes
  SignUp = "signup",

  // Public routes
  PublicStatus = "/",

  // Root
  Dashboard = "/dashboard",

  // Team routes
  AddTeamMembers = "/teams/add-members",
  CreateTeam = "/teams/create",
  ViewTeamMembers = "/teams/view-members",
  EditTeamMeber = "/teams/edit-member/:teamId/:userId",

  // Service routes
  CreateService = "/services/create",
  ServiceManagement = "/services/manage",
  UpdateService = "/services/update/:serviceId",

  // Incident routes
  IncidentManagement = "/incidents/manage",
  UpdateIncident = "/incidents/manage/:serviceId/:incidentId",
  ReportServiceSpecificIncident = "/incidents/manage/:serviceId/new",
  ReportIncident = "/incidents/report",
}

// Helper function to generate paths with parameters
export const generatePath = (
  route: AppRoutes,
  params?: RouteParams
): string => {
  let path = route.toString();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value || "");
    });
  }

  return path;
};

/**
 * 
 
/                           -> Dashboard
/teams/add-members         -> Add Team Members
/teams/create             -> Create Team
/teams/view-members       -> View Team Members
/services/create          -> Create Service
/services/manage          -> Service Management
/services/update/:serviceId -> Update Service
/incidents/manage         -> Incident Management
/incidents/report         -> Report Incident
/status                   -> Public Status Page

 */
