import express, { Express } from "express";
import { getOrganizations } from "../../../application/handlers/organization/getOrganizations.js";
import { createOrganizations } from "../../../application/handlers/organization/createOrganizations.js";
import { getOrganizationById } from "../../../application/handlers/organization/getOrganization.js";
import { getTeams } from "../../../application/handlers/organization/getTeams.js";
import { createTeam } from "../../../application/handlers/organization/createTeam.js";
import { getTeamByIdAndOrganizationId } from "../../../application/handlers/organization/getTeamByIdAndOrganizationId.js";
import { getTeamMembers } from "../../../application/handlers/organization/getTeamMembers.js";
import { createTeamMember } from "../../../application/handlers/organization/createTeamMember.js";
import { updateTeamMember } from "../../../application/handlers/organization/updateTeamMember.js";
import { getServices } from "../../../application/handlers/organization/getServices.js";
import { createService } from "../../../application/handlers/organization/createService.js";
import { updateService } from "../../../application/handlers/organization/updateService.js";
import { deleteService } from "../../../application/handlers/organization/deleteService.js";
import { getIncidents } from "../../../application/handlers/organization/getIncidents.js";
import { createIncident } from "../../../application/handlers/organization/createIncident.js";
import { updateIncident } from "../../../application/handlers/organization/updateIncident.js";
import { deleteIncident } from "../../../application/handlers/organization/deleteIncident.js";
import { getIncidentsAndServicesByOrganization } from "../../../application/handlers/organization/getIncidentsAndServicesByOrganization.js";
import { getUsers } from "../../../application/handlers/users/getUsers.js";
import { createUser } from "../../../application/handlers/users/createUser.js";
import { getUserById } from "../../../application/handlers/users/getUserById.js";
import { updateUser } from "../../../application/handlers/users/updateUser.js";
import { deleteUser } from "../../../application/handlers/users/deleteUser.js";

const app: Express = express();

app.use(express.json());

app.route("/api/status").get(getIncidentsAndServicesByOrganization);

app.route("/api/users").get(getUsers).post(createUser);
app
  .route("/api/users/:userId")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

app.route("/api/organizations").get(getOrganizations).post(createOrganizations);
app.route("/api/organizations/:organizationId").get(getOrganizationById);

app
  .route("/api/organizations/:organizationId/teams")
  .get(getTeams)
  .post(createTeam);
app
  .route("/api/organizations/:organizationId/teams/:teamId")
  .get(getTeamByIdAndOrganizationId);

app
  .route("/api/organizations/:organizationId/teams/:teamId/members")
  .get(getTeamMembers)
  .post(createTeamMember);
app
  .route(
    "/api/organizations/:organizationId/teams/:teamId/members/:teamMemberId"
  )
  .put(updateTeamMember);

app
  .route("/api/organizations/:organizationId/services")
  .get(getServices)
  .post(createService);
app
  .route("/api/organizations/:organizationId/services/:serviceId")
  .put(updateService)
  .delete(deleteService);

app
  .route("/api/organizations/:organizationId/services/:serviceId/incidents")
  .get(getIncidents)
  .post(createIncident);

app
  .route(
    "/api/organizations/:organizationId/services/:serviceId/incidents/:incidentId"
  )
  .put(updateIncident)
  .delete(deleteIncident);

export default app;
