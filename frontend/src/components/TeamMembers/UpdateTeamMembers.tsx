import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Team, UserRoles } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "../../types/routes";

// Define interfaces for our data types
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
}

interface UpdateTeamMemberForm {
  role: UserRoles;
  teamId: string;
}

// Mock data for development
const MOCK_USERS: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: UserRoles.FREELANCER,
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: UserRoles.FREELANCER,
  },
  {
    id: "user-3",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: UserRoles.FREELANCER,
  },
  {
    id: "user-4",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: UserRoles.FREELANCER,
  },
];

export default function UpdateTeamMemberPage({
  teams = [], // Provide default empty array for teams
}: {
  teams: Team[];
}) {
  const navigate = useNavigate();
  const { orgId, teamId, userId } = useParams();

  // State management for the component
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [formData, setFormData] = useState<UpdateTeamMemberForm>({
    role: UserRoles.TEAM_MEMBER,
    teamId: teamId || "",
  });

  // First fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        // TODO: In production, uncomment this block and remove mock data
        // const response = await fetch(`/api/organizations/${orgId}/users`);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch users");
        // }
        // const data = await response.json();
        // const freelancers = data.filter((user: User) => user.role === UserRoles.FREELANCER);
        // setUsers(freelancers);

        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUsers(MOCK_USERS);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [orgId]);

  // Then find and set the specific user details when users are loaded
  useEffect(() => {
    if (!userId || !Array.isArray(users) || users.length === 0) return;

    const foundUser = users.find((user) => user.id === userId);
    if (foundUser) {
      setUserDetails(foundUser);
      setFormData((prev) => ({
        ...prev,
        role: foundUser.role,
        teamId: teamId || prev.teamId,
      }));
    } else {
      setError("User not found in the system");
    }
  }, [users, userId, teamId]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!orgId || !teamId || !userId) {
      setError("Missing required parameters");
      return;
    }

    try {
      setIsLoading(true);

      // TODO: In production, uncomment this block
      // const response = await fetch(`/api/organizations/${orgId}/teams/${teamId}/members/${userId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     role: formData.role,
      //     teamId: formData.teamId,
      //   }),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to update team member");
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate(AppRoutes.ViewTeamMembers);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update team member"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (isLoading && !userDetails) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center">
          Loading user details...
        </div>
      </div>
    );
  }

  // Show error state if user not found
  if (!userDetails && !isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            className="mr-4"
            onClick={() => navigate(AppRoutes.ViewTeamMembers)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Team
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || "Unable to find user details"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button
          variant="outline"
          className="mr-4"
          onClick={() => navigate(AppRoutes.ViewTeamMembers)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Team
        </Button>
        <h1 className="text-2xl font-bold">Edit Team Member</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* User Information - Read Only */}
              <div className="space-y-2">
                <Label>User</Label>
                <div className="p-2 border rounded-md bg-gray-50">
                  <p className="font-medium">{userDetails?.name}</p>
                  <p className="text-sm text-gray-500">{userDetails?.email}</p>
                </div>
              </div>

              {/* Team Selection */}
              <div className="space-y-2">
                <Label>Team</Label>
                <Select
                  value={formData.teamId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, teamId: value }))
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      role: value as UserRoles,
                    }))
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(UserRoles)
                      .filter(
                        (role) =>
                          role !== UserRoles.OWNER &&
                          role !== UserRoles.FREELANCER
                      )
                      .map((role) => (
                        <SelectItem key={role} value={role}>
                          {role.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You can update the team member's role or team assignment.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate(AppRoutes.ViewTeamMembers)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="bg-black text-white hover:bg-black/90"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Member"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
