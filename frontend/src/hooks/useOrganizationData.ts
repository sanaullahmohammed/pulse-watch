import { useEffect, useState, useCallback } from "react";
import { Incident, Service, Team, TeamMember } from "../types";
import {
  mockTeamMembers,
  mockTeams,
  sampleIncidents,
  sampleServices,
} from "../common/remove-utils";

interface UseOrganizationDataReturn {
  services: Service[];
  incidents: Incident[];
  teams: Team[];
  teamMembers: TeamMember[];
  isLoading: boolean;
  error: string | null;
  refetchData: () => Promise<void>;
}

const useOrganizationData = (
  organizationId: string
): UseOrganizationDataReturn => {
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Uncomment during integration
  // const fetchOrganizationData = useCallback(async () => {
  //   if (!organizationId) return;

  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     // Fetch services and teams in parallel
  //     const [servicesResponse, teamsResponse] = await Promise.all([
  //       fetch(`/api/organizations/${organizationId}/services`),
  //       fetch(`/api/organizations/${organizationId}/teams`),
  //     ]);

  //     if (!servicesResponse.ok || !teamsResponse.ok) {
  //       throw new Error("Failed to fetch organization data");
  //     }

  //     const servicesData: Service[] = await servicesResponse.json();
  //     const teamsData: Team[] = await teamsResponse.json();

  //     // Set services and teams
  //     setServices(servicesData);
  //     setTeams(teamsData);

  //     // Fetch team members and incidents in parallel
  //     const [teamMembersData, incidentsData] = await Promise.all([
  //       Promise.all(
  //         teamsData.map((team) =>
  //           fetch(
  //             `/api/organizations/${organizationId}/teams/${team.id}/members`
  //           )
  //             .then((res) => res.json())
  //             .then((members: TeamMember[]) => members)
  //         )
  //       ),
  //       Promise.all(
  //         servicesData.map((service) =>
  //           fetch(
  //             `/api/organizations/${organizationId}/services/${service.id}/incidents`
  //           )
  //             .then((res) => res.json())
  //             .then((serviceIncidents: Incident[]) => serviceIncidents)
  //         )
  //       ),
  //     ]);

  //     // Set team members and incidents
  //     setTeamMembers(teamMembersData.flat());
  //     setIncidents(
  //       incidentsData
  //         .flat()
  //         .sort(
  //           (a, b) =>
  //             new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  //         )
  //     );
  //   } catch (err) {
  //     const errorMessage =
  //       err instanceof Error
  //         ? err.message
  //         : "An error occurred while fetching organization data";
  //     setError(errorMessage);
  //     console.error("Error fetching organization data:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [organizationId]);

  // Mock data fetching function
  const fetchMockData = useCallback(() => {
    setServices(sampleServices);
    setIncidents(sampleIncidents);
    setTeamMembers(mockTeamMembers);
    setTeams(mockTeams);
    setIsLoading(false);
  }, []);

  // Refetch function that can be called from outside
  const refetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Remove this when API is ready
      // await fetchOrganizationData();
      fetchMockData();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while refetching organization data";
      setError(errorMessage);
      console.error("Error refetching organization data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchMockData /* fetchOrganizationData */]);

  useEffect(() => {
    // TODO: Remove fetchMockData when API is ready
    // fetchOrganizationData();
    fetchMockData();
  }, [organizationId, fetchMockData /* fetchOrganizationData */]);

  return {
    services,
    incidents,
    teams,
    teamMembers,
    isLoading,
    error,
    refetchData,
  };
};

export default useOrganizationData;
