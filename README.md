# pulse-watch-plivo-hiring-assignment

Pulse Watch is a Status Page Application allowing users to maintain and manage services, incidents, schedule maintenance. Proving users with real-time updates and it includes both an administrative interface for managing services and a public-facing status page for end users

### Index

- [Features](#features)
- [Tasks](#tasks)
- [Tech Stack](#tech-stack)
- [Architecture Diagrams](#arch-diagrams)
  - [Authentication Flow](#auth-flow)
  - [Service and Incident Management Flow](#service-and-incident-flow)
  - [Database ER (entity-relationship) Diagram](#db-er)
- [APIs in Backend](#api-request-response)
- [URLs in UI](#urls)

## Features <a id="features"></a>

- User Authentication and Team Management
- Multi-tenant Organization Support
- Service Status Management
- Incident and Maintenance Tracking
- Real-time Updates via WebSocket
- Public Status Page
- Modern UI with ShadcnUI

## Tasks <a id="tasks"></a>

- Frontend
  - Public Status Page
    - [x] List Services , Active and Past Incidents of All Organizations
    - [x] Filter based on Organization
    - [x] SignIn and SignUp Buttons
    - [x] My Dashboard button for Logged In User
  - Dashboard
    - [x] Show statistics for Active Incidents, Services and Team Members
    - [x] Show Recent Services
  - Services
    - [x] View Services
    - [x] Update Service
    - [x] Create New Service
  - Incidents
    - [x] View Incidents
      - Lists "Active", "Resolved" and "All" incidents with service names
    - [x] Report Incident
    - [x] Report Incident under Specific Service
    - [x] Update Incident
    - [x] User can filter based on Services
  - Team / Team Members
    - [x] View Team Members
    - [x] Create Team
    - [ ] Edit Team
    - [x] Edit Team or Change Role for Team Member
    - [x] Add "Freelancer User" as Team Member
  - [x] SignIn/SignUp Page
  - [x] Create your Organization as part of SignUp
  - [ ] Common Error Page
  - [ ] Websocket connection between backend and frontend
- Backend
  - [x] Create Schema Design for DB
  - [x] Create Relations in PostgreSQL DB
  - [ ] Multi-Tenant Creation
  - [x] APIs for Organizations
  - [x] APIs for Services
  - [x] APIs for Incidents
  - [x] APIs for Teams
  - [x] APIs for Team Members
  - [x] APIs for Users
  - [x] API for Websocket connection for live updates
- [ ] Authentication with Clerk
- [ ] Integrate Frontend with Backend
- [x] Write Docker Compose file for Backend
- Testing
  - [ ] Add e2e test with Playwright
  - [ ] Add unit tests as required
- Deployment
  - [ ] Docker Compose
  - [ ] Deploy on Vercel or Heroku
  - [ ] GHA Setup for Auto-Updates
- General Code Practices
  - [ ] Follow Clean Code Architecture Principes
  - [ ] Iteration for Error Validations
  - [ ] Iteration to Clean frontend code to create more reusable components
- Future TODOs
  - [ ] Implement Email Notifications
  - [ ] Implement Email Invitations for Users

## Tech Stack <a id="tech-stack"></a>

- Frontend
  - `React 18`: Frontend framework
  - `TypeScript`: Static typing and enhanced developer experience
  - `Vite`: Build tool and development server
  - `TailwindCSS`: Utility-first CSS framework
  - `ShadcnUI`: Component library for consistent design
  - `React Router DOM`: Client-side routing
  - `React Hook Form`: Form handling and validation
  - `Lucide React`: Icon library
- Backend
  - `Express.js`: Node.js web application framework for building RESTful APIs
  - `Prisma`: Modern database ORM and toolkit for type-safe database operations
  - `TypeScript`: Programming language adding static types to JavaScript
  - `Node.js`: JavaScript runtime environment for server-side execution
  - `ESLint`: Code quality tool for identifying and fixing problems
  - `ts-node`: TypeScript execution engine and REPL for Node.js
  - `@prisma/client`: Auto-generated database client for type-safe queries
  - `Express Types`: TypeScript definitions for Express.js framework

## Architecture Diagrams <a id="arch-diagrams"></a>

### Authentication Flow <a id="auth-flow"></a>

```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend
    participant Auth as Auth Service
    participant BE as Backend
    participant DB as Database

    %% Public Status View
    User->>FE: Visit Public Status Page
    FE->>BE: GET /api/status
    BE->>DB: Fetch Public Data
    DB-->>BE: Return Data
    BE-->>FE: Return PublicStatusResponse
    FE-->>User: Display Status Page

    %% Authentication Flow
    User->>FE: Click SignUp/SignIn
    FE->>Auth: Authenticate User
    Auth-->>FE: Return Auth Token

    %% Organization Creation/Selection
    alt New Organization
        User->>FE: Create Organization
        FE->>BE: POST /api/organizations
        BE->>DB: Create Organization & Set User as OWNER
        DB-->>BE: Confirm Creation
        BE-->>FE: Return OrganizationResponse
    else Select Existing Organization
        User->>FE: Select Organization
        FE->>BE: PUT /api/organizations/{orgId}/users/{userId}/roles
        BE->>DB: Update User Role
        DB-->>BE: Confirm Update
    end

    FE-->>User: Redirect to Dashboard
```

### Service and Incident Management Flow <a id="service-incident-flow"></a>

```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend
    participant BE as Backend
    participant WS as WebSocket
    participant DB as Database

    User->>FE: Access Dashboard
    FE->>BE: GET /api/organizations/{orgId}/services
    BE->>DB: Fetch Services
    DB-->>BE: Return Services
    BE-->>FE: Return ServiceResponse[]

    User->>FE: Create Service
    FE->>BE: POST /api/organizations/{orgId}/services
    BE->>DB: Store Service
    DB-->>BE: Confirm Creation
    BE->>WS: Broadcast Status Update
    BE-->>FE: Return ServiceResponse

    User->>FE: Create Incident
    FE->>BE: POST /api/organizations/{orgId}/services/{serviceId}/incidents
    BE->>DB: Store Incident
    DB-->>BE: Confirm Creation
    BE->>WS: Broadcast Incident Update
    BE-->>FE: Return IncidentResponse

    User->>FE: Manage Team
    FE->>BE: POST /api/organizations/{orgId}/teams
    BE->>DB: Create/Update Team
    DB-->>BE: Confirm Update
    BE-->>FE: Return TeamResponse

    User->>FE: Add Team Member
    FE->>BE: POST /api/organizations/{orgId}/teams/{teamId}/members
    BE->>DB: Add Member
    DB-->>BE: Confirm Addition
    BE-->>FE: Return TeamMemberResponse
```

### Database ER (entity-relationship) Diagram <a id="db-er"></a>

```mermaid
erDiagram
    Organization ||--o{ User : has
    Organization ||--o{ Team : contains
    Organization ||--o{ Service : manages
    Team ||--o{ TeamMember : includes
    User ||--o{ TeamMember : is
    Service ||--o{ Incident : reports
    Service ||--o{ StatusUpdate : tracks
    Incident ||--o{ IncidentUpdate : logs

    Organization {
        string id PK
        string name
        string slug
        datetime createdAt
        datetime updatedAt
    }

    User {
        string id PK
        string email
        string name
        enum role
        string authorizationId
        string organizationId FK
        datetime createdAt
        datetime updatedAt
    }

    Team {
        string id PK
        string name
        string organizationId FK
        datetime createdAt
        datetime updatedAt
    }

    TeamMember {
        string id PK
        string teamId FK
        string userId FK
        enum role
        datetime createdAt
        datetime updatedAt
    }

    Service {
        string id PK
        string name
        string description
        enum currentStatus
        float uptimePercentage
        string organizationId FK
        datetime createdAt
        datetime updatedAt
    }

    Incident {
        string id PK
        string title
        string description
        enum severity
        enum status
        string serviceId FK
        datetime startedAt
        datetime resolvedAt
        datetime createdAt
        datetime updatedAt
    }

    StatusUpdate {
        string id PK
        string serviceId FK
        enum status
        datetime createdAt
    }

    IncidentUpdate {
        string id PK
        string incidentId FK
        string message
        enum status
        datetime createdAt
    }
```

## API in Backend <a id="api-request-response"></a>

```

1. Organization Endpoints <a id="org-endpoints"></a>

- GET /api/organizations (Accessible: All authenticated users)
- GET BY ORG ID /api/organizations/{orgId} (OWNER, ADMIN)
- POST /api/organizations (Accessible: Any authenticated user)
- PUT /api/organizations/{orgId} (OWNER, ADMIN)
- DELETE /api/organizations/{orgId} (OWNER only)


2. Team Endpoints <a id="team-end"></a>

- GET /api/organizations/{orgId}/teams (OWNER, ADMIN, TEAM_ADMIN)
- GET BY TEAM ID /api/organizations/{orgId}/teams/{teamId} (OWNER, ADMIN, TEAM_ADMIN, TEAM_MEMBER)
- POST /api/organizations/{orgId}/teams (OWNER, ADMIN)
- PUT /api/organizations/{orgId}/teams/{teamId} (OWNER, ADMIN, TEAM_ADMIN)
- DELETE /api/organizations/{orgId}/teams/{teamId} (OWNER, ADMIN)

3. Team Member Endpoints <a id="team-member-end"></a>

- GET /api/organizations/{orgId}/teams/{teamId}/members (OWNER, ADMIN, TEAM_ADMIN, TEAM_MEMBER)
- POST /api/organizations/{orgId}/teams/{teamId}/members (OWNER, ADMIN, TEAM_ADMIN)
- PUT /api/organizations/{orgId}/teams/{teamId}/members/{userId} (OWNER, ADMIN, TEAM_ADMIN)
- DELETE /api/organizations/{orgId}/teams/{teamId}/members/{userId} (OWNER, ADMIN, TEAM_ADMIN)

4. Service Endpoints <a id="service-end"></a>

- GET /api/organizations/{orgId}/services (All roles)
- GET BY SERVICE ID /api/organizations/{orgId}/services/{serviceId} (OWNER, ADMIN, SERVICE_MANAGER)
- POST /api/organizations/{orgId}/services (OWNER, ADMIN, SERVICE_MANAGER)
- PUT /api/organizations/{orgId}/services/{serviceId} (OWNER, ADMIN, SERVICE_MANAGER, STATUS_REPORTER)
- DELETE /api/organizations/{orgId}/services/{serviceId} (OWNER, ADMIN)

5. Incident Endpoints <a id="incident-end"></a>

- GET /api/organizations/{orgId}/services/{serviceId}/incidents (All roles)
- GET BY INCIDENT ID /api/organizations/{orgId}/services/{serviceId}/incidents/{incidentId} (All roles
- POST /api/organizations/{orgId}/services/{serviceId}/incidents (OWNER, ADMIN, SERVICE_MANAGER, STATUS_REPORTER)
- PUT /api/organizations/{orgId}/services/{serviceId}/incidents/{incidentId} (OWNER, ADMIN, SERVICE_MANAGER, STATUS_REPORTER)
- DELETE /api/organizations/{orgId}/services/{serviceId}/incidents/{incidentId} (OWNER, ADMIN, SERVICE_MANAGER)

6. Public Status Page Response

- GET /api/status

7. Users

- GET /api/organizations/{orgId}/users (OWNER, ADMIN)
- POST /api/organizations/{orgId}/users/invite (OWNER, ADMIN)
- PUT /api/organizations/{orgId}/users/{userId}/roles (OWNER, ADMIN)

```

## URLs in UI <a id="urls"></a>

```

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

```
