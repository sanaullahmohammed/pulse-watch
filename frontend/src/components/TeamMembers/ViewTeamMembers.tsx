import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, MoreVertical, UserPlus, Users, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../types/routes";
import { Navbar } from "../Navbar/Navbar";
import { TeamMember, Team } from "../../types";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";

interface TeamMembersPageProps {
  teamMembers: TeamMember[];
  teams: Team[];
  loading: boolean;
  error: string | null;
  organizationId: string;
  onTeamMemberUpdate?: () => void;
}

export default function TeamMembersPage({
  teamMembers,
  teams,
  loading,
  error,
  organizationId,
  onTeamMemberUpdate,
}: TeamMembersPageProps) {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // TODO: Uncomment for API integration
  // const makeApiCall = async (url: string, method: string, data: any) => {
  //   const response = await fetch(url, {
  //     method,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`API call failed: ${response.statusText}`);
  //   }

  //   return response.json();
  // };

  const getTeamName = (teamId: string): string => {
    const team = teams.find((t) => t.id === teamId);
    return team?.name || "Unknown Team";
  };

  const handleRemoveMember = async (teamId: string, userId: string) => {
    setRemovingMemberId(userId);

    try {
      console.log("Would remove member:", { teamId, userId, organizationId });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAlert({
        type: "success",
        message: "Member has been successfully removed from the team.",
      });

      if (onTeamMemberUpdate) {
        onTeamMemberUpdate();
      }
    } catch (error) {
      console.error("Error removing team member:", error);
      setAlert({
        type: "error",
        message: "Failed to remove team member. Please try again.",
      });
    } finally {
      setRemovingMemberId(null);
    }
  };

  const handleEditMember = (teamId: string, userId: string) => {
    const path = AppRoutes.EditTeamMeber.replace(":teamId", teamId).replace(
      ":userId",
      userId
    );
    navigate(path);
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesTeam =
      selectedTeam === "all" || member.teamId === selectedTeam;
    const matchesSearch =
      searchQuery.trim() === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          Loading team members...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 ml-64 flex items-center justify-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 ml-64">
        <div className="p-8">
          {alert && (
            <Alert
              className={`mb-4 ${
                alert.type === "error" ? "bg-red-50" : "bg-green-50"
              }`}
            >
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Team Members</h1>
              <p className="text-gray-500">
                Manage your team members and their access
              </p>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => navigate(AppRoutes.CreateTeam)}
                className="bg-black text-white hover:bg-black/90"
              >
                <Users className="mr-2 h-4 w-4" />
                Create Team
              </Button>
              <Button
                onClick={() => navigate(AppRoutes.AddTeamMembers)}
                className="bg-black text-white hover:bg-black/90"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No team members found
              </div>
            ) : (
              filteredMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-gray-500">
                            {member.email}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline">{member.role}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            <Users className="h-3 w-3 inline mr-1" />
                            {getTeamName(member.teamId)}
                          </p>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={removingMemberId === member.userId}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleEditMember(member.teamId, member.userId)
                            }
                          >
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleEditMember(member.teamId, member.userId)
                            }
                          >
                            Change Team
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() =>
                              handleRemoveMember(member.teamId, member.userId)
                            }
                            disabled={removingMemberId === member.userId}
                          >
                            {removingMemberId === member.userId
                              ? "Removing..."
                              : "Remove from Team"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
