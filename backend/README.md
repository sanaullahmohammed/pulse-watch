# API and WebSocket Documentation

## Table of Contents
1. [REST API](#rest-api)
   1. [Status](#1-status)
   2. [Users](#2-users)
   3. [Organizations](#3-organizations)
   4. [Teams](#4-teams)
   5. [Team Members](#5-team-members)
   6. [Services](#6-services)
   7. [Incidents](#7-incidents)
2. [WebSocket Events](#websocket-events)
   1. [dbUpdate Event](#1-dbupdate-event)

# REST API

## 1. Status
### 1.1. Get Organization Status
- **GET** `/api/status`
- Returns incidents and services for all organizations
- **Response**: Array of status objects containing organization details, services, and incidents
- **Status Codes**
  - `200` Success
  - `500` Server Error

## 2. Users
### 2.1. Get All Users
- **GET** `/api/users`
- Retrieves all users
- **Response**: Array of user objects
- **Status Codes**
  - `200` Success
  - `500` Server Error

### 2.2. Create User
- **POST** `/api/users`
- Creates a new user
- **Request Body**
  ```json
  {
    "email": "string (required)",
    "name": "string (required)",
    "authorizationId": "string (required)"
  }
  ```
- **Status Codes**
  - `201` Created
  - `500` Server Error

### 2.3. Get User by ID
- **GET** `/api/users/:userId`
- Retrieves a specific user by ID
- **Parameters**
  - `userId`: User identifier
- **Status Codes**
  - `200` Success
  - `500` Server Error

### 2.4. Update User
- **PUT** `/api/users/:userId`
- Updates an existing user
- **Parameters**
  - `userId`: User identifier
- **Request Body**
  ```json
  {
    "email": "string (optional)",
    "name": "string (optional)",
    "authorizationId": "string (optional)"
  }
  ```
- **Status Codes**
  - `200` Success
  - `500` Server Error

### 2.5. Delete User
- **DELETE** `/api/users/:userId`
- Deletes a user
- **Parameters**
  - `userId`: User identifier
- **Status Codes**
  - `204` No Content
  - `500` Server Error

## 3. Organizations
### 3.1. Get All Organizations
- **GET** `/api/organizations`
- Retrieves all organizations
- **Response**: Array of organization objects
- **Status Codes**
  - `200` Success
  - `500` Server Error

### 3.2. Create Organization
- **POST** `/api/organizations`
- Creates a new organization
- **Request Body**
  ```json
  {
    "name": "string (required)",
    "ownerId": "string (required)"
  }
  ```
- **Status Codes**
  - `201` Created
  - `500` Server Error

### 3.3. Get Organization by ID
- **GET** `/api/organizations/:organizationId`
- Retrieves a specific organization
- **Parameters**
  - `organizationId`: Organization identifier
- **Status Codes**
  - `200` Success
  - `500` Server Error

## 4. Teams
### 4.1. Get Teams
- **GET** `/api/organizations/:organizationId/teams`
- Retrieves all teams for an organization
- **Parameters**
  - `organizationId`: Organization identifier
- **Status Codes**
  - `200` Success
  - `500` Server Error

### 4.2. Create Team
- **POST** `/api/organizations/:organizationId/teams`
- Creates a new team in an organization
- **Parameters**
  - `organizationId`: Organization identifier
- **Request Body**
  ```json
  {
    "name": "string (required)"
  }
  ```
- **Status Codes**
  - `201` Created
  - `500` Server Error

### 4.3. Get Team by ID
- **GET** `/api/organizations/:organizationId/teams/:teamId`
- Retrieves a specific team
- **Parameters**
  - `organizationId`: Organization identifier
  - `teamId`: Team identifier
- **Status Codes**
  - `200` Success
  - `500` Server Error

## 5. Team Members
### 5.1. Get Team Members
- **GET** `/api/organizations/:organizationId/teams/:teamId/members`
- Retrieves all members of a team
- **Parameters**
  - `organizationId`: Organization identifier
  - `teamId`: Team identifier
- **Status Codes**
  - `200` Success
  - `500` Server Error

### 5.2. Create Team Member
- **POST** `/api/organizations/:organizationId/teams/:teamId/members`
- Adds a member to a team
- **Parameters**
  - `organizationId`: Organization identifier
  - `teamId`: Team identifier
- **Request Body**
  ```json
  {
    "userId": "string (required)",
    "role": "enum (required) - OrganizationRole"
  }
  ```
- **Status Codes**
  - `201` Created
  - `500` Server Error

### 5.3. Update Team Member
- **PUT** `/api/organizations/:organizationId/teams/:teamId/members/:teamMemberId`
- Updates a team member's role or team
- **Parameters**
  - `organizationId`: Organization identifier
  - `teamId`: Team identifier
  - `teamMemberId`: Team member identifier
- **Request Body**
  ```json
  {
    "role": "enum (required) - OrganizationRole",
    "newTeamId": "string (optional)"
  }
  ```
- **Status Codes**
  - `200` Success
  - `500` Server Error

## 6. Services
### 6.1. Get Services
- **GET** `/api/organizations/:organizationId/services`
- Retrieves all services for an organization
- **Parameters**
  - `organizationId`: Organization identifier
- **Status Codes**
  - `200` Success
  - `500` Server Error

### 6.2. Create Service
- **POST** `/api/organizations/:organizationId/services`
- Creates a new service
- **Parameters**
  - `organizationId`: Organization identifier
- **Request Body**
  ```json
  {
    "name": "string (required)",
    "description": "string (optional)",
    "currentStatus": "enum (required) - ServiceStatus",
    "uptimePercentage": "number (required)"
  }
  ```
- **Status Codes**
  - `201` Created
  - `500` Server Error

### 6.3. Update Service
- **PUT** `/api/organizations/:organizationId/services/:serviceId`
- Updates an existing service
- **Parameters**
  - `organizationId`: Organization identifier
  - `serviceId`: Service identifier
- **Request Body**
  ```json
  {
    "name": "string (optional)",
    "description": "string (optional)",
    "currentStatus": "enum (optional) - ServiceStatus",
    "uptimePercentage": "number (optional)"
  }
  ```
- **Status Codes**
  - `200` Success
  - `500` Server Error

### 6.4. Delete Service
- **DELETE** `/api/organizations/:organizationId/services/:serviceId`
- Deletes a service
- **Parameters**
  - `organizationId`: Organization identifier
  - `serviceId`: Service identifier
- **Status Codes**
  - `204` No Content
  - `500` Server Error

## 7. Incidents
### 7.1. Get Incidents
- **GET** `/api/organizations/:organizationId/services/:serviceId/incidents`
- Retrieves all incidents for a service
- **Parameters**
  - `organizationId`: Organization identifier
  - `serviceId`: Service identifier
- **Status Codes**
  - `200` Success
  - `500` Server Error

### 7.2. Create Incident
- **POST** `/api/organizations/:organizationId/services/:serviceId/incidents`
- Creates a new incident
- **Parameters**
  - `organizationId`: Organization identifier
  - `serviceId`: Service identifier
- **Request Body**
  ```json
  {
    "title": "string (required)",
    "description": "string (required)",
    "severity": "enum (required) - IncidentSeverity",
    "status": "enum (required) - IncidentStatus",
    "resolvedAt": "date (optional)"
  }
  ```
- **Status Codes**
  - `201` Created
  - `500` Server Error

### 7.3. Update Incident
- **PUT** `/api/organizations/:organizationId/services/:serviceId/incidents/:incidentId`
- Updates an existing incident
- **Parameters**
  - `organizationId`: Organization identifier
  - `serviceId`: Service identifier
  - `incidentId`: Incident identifier
- **Request Body**
  ```json
  {
    "title": "string (optional)",
    "description": "string (optional)",
    "severity": "enum (optional) - IncidentSeverity",
    "status": "enum (optional) - IncidentStatus",
    "resolvedAt": "date (optional)"
  }
  ```
- **Status Codes**
  - `201` Success
  - `500` Server Error

### 7.4. Delete Incident
- **DELETE** `/api/organizations/:organizationId/services/:serviceId/incidents/:incidentId`
- Deletes an incident
- **Parameters**
  - `organizationId`: Organization identifier
  - `serviceId`: Service identifier
  - `incidentId`: Incident identifier
- **Status Codes**
  - `204` No Content
  - `500` Server Error

# WebSocket Events

## 1. dbUpdate Event
The `dbUpdate` event is emitted whenever there are database operations performed. The event payload follows a consistent structure for all database operations.

### Event Payload Structure
```json
{
  "model": string,    // The model/table being operated on
  "action": string,   // The type of database operation
  "data": {          // The data involved in the operation
    "id": string,    // Unique identifier
    "name": string,  // Name field
    // ... other model-specific fields
  }
}
```

### Supported Actions
1. **create**
   - Emitted when a new record is created
   ```json
   {
     "model": "Organization",
     "action": "create",
     "data": {
       "id": "06f87955-c5f6-43b4-bfcd-845a7f456f62",
       "name": "Hello World"
     }
   }
   ```

2. **findUnique**
   - Emitted when a record is retrieved using a unique identifier
   ```json
   {
     "model": "Organization",
     "action": "findUnique",
     "data": {
       "id": "06f87955-c5f6-43b4-bfcd-845a7f456f62",
       "name": "Hello World"
     }
   }
   ```

3. **findFirstOrThrow**
   - Emitted when searching for the first matching record
   ```json
   {
     "model": "Organization",
     "action": "findFirstOrThrow",
     "data": {
       "id": "06f87955-c5f6-43b4-bfcd-845a7f456f62",
       "name": "Hello World"
     }
   }
   ```

### Usage
```javascript
// Connect to the WebSocket server
const socket = io('localhost:8080');

// Listen for database updates
socket.on('dbUpdate', (payload) => {
  const { model, action, data } = payload;
  
  // Handle the database update based on model and action
  console.log(`${model} ${action}:`, data);
});
```

#### Postman
![image](https://github.com/user-attachments/assets/274e387d-fe25-428e-b459-fd9da12fa2ad)


### Common Models
The event can be emitted for any of the following models:
- Organization
- Team
- TeamMember
- Service
- Incident
- User

Each model will include its specific fields in the data object, but all will follow the same event structure with model, action, and data properties.
