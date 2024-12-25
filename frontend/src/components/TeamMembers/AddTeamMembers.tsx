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

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
}

interface AddTeamMemberForm {
  userId: string;
  name: string;
  email: string;
  role: UserRoles;
  teamId: string;
}

// Mock data for testing
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

export default function AddTeamMemberPage({ teams }: { teams: Team[] }) {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddTeamMemberForm>({
    userId: "",
    name: "",
    email: "",
    role: UserRoles.TEAM_MEMBER,
    teamId: "",
  });

  // Fetch available users
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

  const handleUserSelect = (userId: string) => {
    const selectedUser = users.find((user) => user.id === userId);
    if (selectedUser) {
      setFormData((prev) => ({
        ...prev,
        userId: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.teamId || !formData.userId) return;

    try {
      setIsLoading(true);

      // TODO: In production, uncomment this block
      // const response = await fetch(`/api/organizations/${orgId}/teams/${formData.teamId}/members`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     userId: formData.userId,
      //     name: formData.name,
      //     email: formData.email,
      //     role: formData.role,
      //     teamId: formData.teamId,
      //   }),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to create team member");
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Creating team member with data:", formData);

      navigate(AppRoutes.ViewTeamMembers);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create team member"
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold">Add Team Member</h1>
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
              <div className="space-y-2">
                <Label>User</Label>
                <Select
                  value={formData.userId}
                  onValueChange={handleUserSelect}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                Selected user will be added to the team with the specified role.
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
                disabled={isLoading || !formData.teamId || !formData.userId}
              >
                {isLoading ? "Adding..." : "Add to Team"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
