# pulse-watch-plivo-hiring-assignment

### Index

- [About](#about)
- [Setup Details](#setup)
- [Features](#features)
- [Implementation Status](#imp-status)
  - [Completed Implementation](#completed)
  - [**Pending Implementation**](#pending)
- [Tech Stack](#tech-stack)
- [Architecture Diagrams](#arch-diagrams)
  - [Authentication Flow](#auth-flow)
  - [Service and Incident Management Flow](#service-and-incident-flow)
  - [Database ER (entity-relationship) Diagram](#db-er)
- [APIs in Backend](#api-request-response)
- [URLs in UI](#urls)

## About <a id="about"></a>

Pulse Watch is a Status Page Application allowing users to maintain and manage services, incidents, schedule maintenance. Proving users with real-time updates and it includes both an administrative interface for managing services and a public-facing status page for end users

## Setup Details <a id="setup"></a>

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)

- [Frontend Demo with Mock Data](https://sanaullahmohammed.github.io/pulse-watch-plivo-hiring-assignment/#/dashboard)

## Features <a id="features"></a>

- User Authentication and Team Management
- Multi-tenant Organization Support
- Service Status Management
- Incident and Maintenance Tracking
- Real-time Updates via WebSocket
- Public Status Page
- Modern UI with ShadcnUI

## Implementation Status <a id="completed"></a>

### Completed Components <a id="pending"></a>

1. Frontend Development
   The frontend implementation has successfully delivered the following features:

   - Public Status Page
     - Service listing functionality with active and past incidents across organizations
     - Organization-based filtering system
     - Authentication interface with Sign In and Sign Up capabilities
     - Dashboard access for authenticated users
   - Dashboard Features
     - Statistical overview displaying active incidents, services, and team member metrics
     - Recent services display implementation
     - Comprehensive service management interface
     - Incident management system with filtering capabilities
     - Team management functionality
   - Mock data integration for demonstration purposes

2. Backend Development
   The backend infrastructure has been established with:

   - Complete database schema design
   - PostgreSQL database implementation with defined relationships
   - Comprehensive API endpoints for:
     - Organizations
     - Services
     - Incidents
     - Teams
     - Team Members
     - Users
     - WebSocket connections for real-time updates

- Docker configuration for backend services

### Pending Implementation <a id="imp-status"></a>

1. Integration and Deployment

- Frontend and backend integration
- Authentication system implementation with Clerk
- Deployment configuration and execution
- GitHub Actions setup for automated deployments

2. Additional Features

- Email notification system
- Email invitation system for users
- Common error page implementation
- WebSocket connection between frontend and backend
- Team editing functionality

3. Code Quality and Architecture

- Clean Code Architecture principles implementation
- Error validation enhancements
- Frontend component optimization for reusability

4. Testing Implementation

- End-to-end testing using Playwright
- Unit testing coverage
- Integration testing

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
    Organization ||--|| User : "owned by"
    Organization ||--o{ Team : contains
    Organization ||--o{ Service : manages
    Team ||--o{ TeamMember : includes
    User ||--o{ TeamMember : "is member of"
    Service ||--o{ Incident : reports
    Service ||--o{ StatusHistory : tracks
    Incident ||--o{ IncidentUpdate : logs

    Organization {
        string id PK
        string name
        string slug UK
        string ownerId FK
        datetime createdAt
        datetime updatedAt
    }

    User {
        string id PK
        string email UK
        string name
        string authorizationId UK
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
        OrganizationRole role
        datetime createdAt
        datetime updatedAt
    }

    Service {
        string id PK
        string name
        string description
        ServiceStatus currentStatus
        float uptimePercentage
        string organizationId FK
        datetime createdAt
        datetime updatedAt
    }

    Incident {
        string id PK
        string title
        string description
        IncidentSeverity severity
        IncidentStatus status
        string serviceId FK
        datetime startedAt
        datetime resolvedAt
        datetime createdAt
        datetime updatedAt
    }

    StatusHistory {
        string id PK
        string serviceId FK
        ServiceStatus status
        string message
        datetime createdAt
    }

    IncidentUpdate {
        string id PK
        string incidentId FK
        string message
        IncidentStatus status
        datetime createdAt
    }
```

## API in Backend <a href="api-request-response"></a>

[https://github.com/sanaullahmohammed/pulse-watch-plivo-hiring-assignment/blob/main/backend/README.md](https://github.com/sanaullahmohammed/pulse-watch-plivo-hiring-assignment/blob/main/backend/README.md)

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
