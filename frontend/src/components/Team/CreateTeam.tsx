import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../types/routes";

interface TeamFormProps {
  teamId?: string;
  initialData?: {
    name: string;
  };
  // Adding organizationId as a prop since we need it for API calls
  organizationId: string;
}

export default function TeamFormPage({
  teamId,
  initialData,
  organizationId,
}: TeamFormProps) {
  const [teamName, setTeamName] = useState(initialData?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!teamId;
  const navigate = useNavigate();

  // Helper function to make API calls
  const makeApiCall = async (
    url: string,
    method: "POST" | "PUT",
    data: any
  ) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          // Add any authentication headers your API requires
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }

    setIsLoading(true);

    try {
      if (isEditMode) {
        // Update existing team
        await makeApiCall(
          `/api/organizations/${organizationId}/teams/${teamId}`,
          "PUT",
          { name: teamName }
        );
      } else {
        // Create new team
        await makeApiCall(
          `/api/organizations/${organizationId}/teams`,
          "POST",
          { name: teamName }
        );
      }

      // Navigate back to team members page on success
      navigate(AppRoutes.ViewTeamMembers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button
          variant="outline"
          className="mr-4"
          onClick={() => navigate(AppRoutes.ViewTeamMembers)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Teams
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Update Team" : "Create New Team"}
        </h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500">
                Choose a clear and descriptive name for your team
              </p>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(AppRoutes.ViewTeamMembers)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
              >
                {isLoading
                  ? "Processing..."
                  : isEditMode
                  ? "Update Team"
                  : "Create Team"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
