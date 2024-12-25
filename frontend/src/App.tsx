import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddTeamMembers from "./components/TeamMembers/AddTeamMembers";
import CreateService from "./components/Services/CreateService";
import CreateTeam from "./components/Team/CreateTeam";
import IncidentManagement from "./components/Incidents/IncidentManagement";
import PublicStatus from "./components/PublicStatusPage/PublicStatus";
import ReportIncident from "./components/Incidents/ReportIncident";
import ServiceManagement from "./components/Services/ServiceManagement";
import UpdateService from "./components/Services/UpdateService";
import ViewTeamMembers from "./components/TeamMembers/ViewTeamMembers";
import Dashboard from "./components/Dashboard/Dashboard";
import useOrganizationData from "./hooks/useOrganizationData";
import UpdateIncident from "./components/Incidents/UpdateIncident";
import UpdateTeamMembers from "./components/TeamMembers/UpdateTeamMembers";
import SignUpFlow from "./components/Auth/AuthPage";

const App = () => {
  // TODO : Get organizationId from the endpoint for user
  const organizationId = "1";
  const {
    services,
    incidents,
    teams,
    teamMembers,
    isLoading,
    error,
    refetchData,
  } = useOrganizationData(organizationId || "1");

  const handleServiceDeleted = async () => {
    try {
      await refetchData();
    } catch (error) {
      console.error("Failed to refresh data after service deletion:", error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Auth page */}
        <Route path="/signup" element={<SignUpFlow />} />

        {/* Public status page */}
        <Route path="/" element={<PublicStatus />} />

        {/* Root route redirects to dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              teams={teams}
              teamMembers={teamMembers}
              services={services}
              incidents={incidents}
              loading={isLoading}
              error={error}
            />
          }
        />

        {/* Team-related routes */}
        <Route path="/teams">
          <Route
            path="add-members"
            element={<AddTeamMembers teams={teams} />}
          />
          <Route
            path="create"
            element={<CreateTeam organizationId={organizationId} />}
          />
          <Route
            path="view-members"
            element={
              <ViewTeamMembers
                teamMembers={teamMembers}
                teams={teams}
                error={error}
                loading={isLoading}
                organizationId={organizationId}
              />
            }
          />
          <Route
            path="edit-member/:teamId/:userId"
            element={<UpdateTeamMembers teams={teams} />}
          />
        </Route>

        {/* Service-related routes */}
        <Route path="/services">
          <Route
            path="create"
            element={<CreateService organizationId={organizationId} />}
          />
          <Route
            path="manage"
            element={
              <ServiceManagement
                services={services}
                loading={isLoading}
                error={error}
                orgId={organizationId}
                onServiceDeleted={handleServiceDeleted}
              />
            }
          />
          <Route path="update/:serviceId" element={<UpdateService />} />
        </Route>

        {/* Incident-related routes */}
        <Route path="/incidents">
          <Route
            path="manage"
            element={
              <IncidentManagement
                incidents={incidents}
                services={services}
                loading={isLoading}
                error={error}
              />
            }
          />
          <Route
            path="manage/:serviceId/:incidentId"
            element={
              <UpdateIncident
                services={services}
                organizationId={organizationId}
              />
            }
          />
          <Route
            path="manage/:serviceId/new"
            element={
              <ReportIncident
                organizationId={organizationId}
                services={services}
              />
            }
          />
          <Route
            path="report"
            element={
              <ReportIncident
                organizationId={organizationId}
                services={services}
              />
            }
          />
        </Route>

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
