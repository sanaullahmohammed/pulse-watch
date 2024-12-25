import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { ServiceStatus } from "../../types";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../types/routes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";

interface CreateServiceForm {
  name: string;
  description: string;
  currentStatus: ServiceStatus;
  uptimePercentage: number;
}

export default function CreateServicePage({
  organizationId,
}: {
  organizationId: string;
}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateServiceForm>({
    defaultValues: {
      name: "",
      description: "",
      currentStatus: ServiceStatus.OPERATIONAL,
      uptimePercentage: 100,
    },
  });

  const handleSubmit = async (data: CreateServiceForm) => {
    setIsSubmitting(true);

    try {
      const formattedData = {
        ...data,
        uptimePercentage: Number(data.uptimePercentage.toFixed(2)),
      };

      const response = await fetch(
        `/api/organizations/${organizationId}/services`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create service");
      }

      navigate(AppRoutes.ServiceManagement);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: "Failed to create service. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Button
          variant="outline"
          className="mr-4"
          onClick={() => navigate(AppRoutes.ServiceManagement)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>
        <h1 className="text-2xl font-bold">Create New Service</h1>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          New services will be visible on your public status page once created.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{
                    required: "Service name is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., API Gateway" {...field} />
                      </FormControl>
                      <p className="text-sm text-gray-500">
                        This name will be displayed on your status page
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what this service does..."
                          className="h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="uptimePercentage"
                  rules={{
                    required: "Uptime percentage is required",
                    min: {
                      value: 0,
                      message: "Uptime percentage must be at least 0",
                    },
                    max: {
                      value: 100,
                      message: "Uptime percentage cannot exceed 100",
                    },
                    validate: {
                      decimal: (value) =>
                        /^\d+(\.\d{0,2})?$/.test(value.toString()) ||
                        "Uptime percentage must have at most 2 decimal places",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Uptime Percentage *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          placeholder="99.99"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? "" : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Status Settings</h3>

                <FormField
                  control={form.control}
                  name="currentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ServiceStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {form.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(AppRoutes.ServiceManagement)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Service"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
