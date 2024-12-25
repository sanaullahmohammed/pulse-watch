import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Github, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { AppRoutes } from "../../types/routes";

interface UserFormData {
  email: string;
  password: string;
}

interface OrganizationFormData {
  name: string;
  slug: string;
}

const SignUpFlow = () => {
  const [step, setStep] = useState(1);
  const [userFormData, setUserFormData] = useState<UserFormData>({
    email: "",
    password: "",
  });
  const [orgFormData, setOrgFormData] = useState<OrganizationFormData>({
    name: "",
    slug: "",
  });
  const navigate = useNavigate();

  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrgFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrgFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]/g, "-");
      setOrgFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Submitting:", {
        user: userFormData,
        organization: orgFormData,
      });
      navigate(AppRoutes.Dashboard);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      // Preserve organization form data
      const preservedOrgData = { ...orgFormData };
      setOrgFormData(preservedOrgData);
    }
  };

  const renderUserForm = () => (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              value={userFormData.email}
              onChange={handleUserFormChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={userFormData.password}
              onChange={handleUserFormChange}
            />
          </div>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => console.log("GitHub OAuth")}
              type="button"
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => console.log("Google OAuth")}
              type="button"
            >
              <Mail className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
            <Button type="submit" className="w-full">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Button
            variant="outline"
            onClick={() => navigate(AppRoutes.SignUp)}
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Button>
        </div>
      </CardFooter>
    </>
  );

  const renderOrgForm = () => (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create your organization
        </CardTitle>
        <CardDescription className="text-center">
          Set up your organization to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Acme Inc."
              required
              value={orgFormData.name}
              onChange={handleOrgFormChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              name="slug"
              type="text"
              placeholder="acme"
              required
              value={orgFormData.slug}
              onChange={handleOrgFormChange}
            />
            <p className="text-sm text-gray-500">
              https://status.yourdomain.com/{orgFormData.slug}
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" className="w-full">
              Create Organization
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Card className="w-full">
          {step === 1 ? renderUserForm() : renderOrgForm()}
        </Card>
      </div>
    </div>
  );
};

export default SignUpFlow;
