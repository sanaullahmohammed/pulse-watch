import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Team, TeamMember } from "../../types";

const TeamMembersCard = ({
  teams,
  teamMembers,
  loading,
}: {
  teams: Team[];
  teamMembers: TeamMember[];
  loading: boolean;
}) => {
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    totalTeams: 0,
  });

  useEffect(() => {
    const totalMembers = teamMembers.length;
    const totalTeams = teams.length;

    setTeamStats({
      totalMembers,
      totalTeams,
    });
  }, [teams, teamMembers]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Team Members</CardTitle>
        <Users className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? "..." : teamStats.totalMembers}
        </div>
        <p className="text-xs text-gray-500">
          {loading ? "Loading..." : `Across ${teamStats.totalTeams} teams`}
        </p>
      </CardContent>
    </Card>
  );
};

export default TeamMembersCard;
