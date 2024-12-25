import { ServiceStatus } from "../../types";

export const StatusIndicator = ({
  status,
  className = "",
}: {
  status: ServiceStatus;
  className?: string;
}) => {
  const colors = {
    [ServiceStatus.OPERATIONAL]: "bg-green-500",
    [ServiceStatus.DEGRADED_PERFORMANCE]: "bg-yellow-500",
    [ServiceStatus.PARTIAL_OUTAGE]: "bg-orange-500",
    [ServiceStatus.MAJOR_OUTAGE]: "bg-red-500",
  };

  return (
    <div className={`h-3 w-3 rounded-full ${colors[status]} ${className}`} />
  );
};
