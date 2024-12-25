import { useState, useEffect } from "react";
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
import { IncidentSeverity, IncidentStatus, Service } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes, generatePath } from "../../types/routes";
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

interface ReportIncidentForm {
  serviceId: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  initialMessage: string;
  notifyUsers: boolean;
}

export default function ReportIncidentPage({
  organizationId,
  services,
}: {
  organizationId: string;
  services: Service[];
}) {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReportIncidentForm>({
    defaultValues: {
      serviceId: serviceId || "",
      title: "",
      description: "",
      severity: IncidentSeverity.MINOR,
      status: IncidentStatus.INVESTIGATING,
      initialMessage: "",
      notifyUsers: true,
    },
  });

  // Set serviceId when it changes in URL
  useEffect(() => {
    if (serviceId) {
      form.setValue("serviceId", serviceId);
    }
  }, [serviceId, form]);

  const handleSubmit = async (data: ReportIncidentForm) => {
    setIsSubmitting(true);

    try {
      const formattedData = {
        ...data,
        startedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        resolvedAt: null,
      };

      const response = await fetch(
        `/api/organizations/${organizationId}/services/${data.serviceId}/incidents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create incident");
      }

      // Navigate back to service page if serviceId exists, otherwise to incident management
      if (serviceId) {
        navigate(`/services/update/${serviceId}`);
      } else {
        navigate(AppRoutes.IncidentManagement);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: "Failed to create incident. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (serviceId) {
      navigate(generatePath(AppRoutes.UpdateService, { serviceId }));
    } else {
      navigate(AppRoutes.IncidentManagement);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="outline" className="mr-4" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {serviceId ? "Back to Service" : "Back to Incidents"}
        </Button>
        <h1 className="text-2xl font-bold">Report New Incident</h1>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This incident will be immediately visible on your public status page.
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
                  name="serviceId"
                  rules={{ required: "Affected service is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Affected Service *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!!serviceId}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem
                              key={service.id}
                              value={service.id as string}
                            >
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Rest of the form fields remain the same */}
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Incident title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incident Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., API Performance Degradation"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-500">
                        A clear, concise title describing the incident
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="severity"
                    rules={{ required: "Severity is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Severity *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(IncidentSeverity).map((severity) => (
                              <SelectItem key={severity} value={severity}>
                                {severity.replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Status *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(IncidentStatus).map((status) => (
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

                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: "Incident description is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incident Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the incident in detail..."
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-500">
                        Provide detailed information about what happened and the
                        impact
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="initialMessage"
                  rules={{ required: "Initial message is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide an initial status update..."
                          className="h-24"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-500">
                        This will be the first public message about this
                        incident
                      </p>
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
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white hover:bg-black/90"
                >
                  {isSubmitting ? "Reporting..." : "Report Incident"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
