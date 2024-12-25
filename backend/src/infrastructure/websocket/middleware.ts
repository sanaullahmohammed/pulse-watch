import { Server } from "socket.io";
import { Prisma } from "@prisma/client";

type TrackedModel = "Service" | "Incident" | "Maintenance";

export const createPrismaMiddleware = (io: Server) => {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>
  ) => {
    const result = await next(params);

    const trackedModels: TrackedModel[] = [
      "Service",
      "Incident",
      "Maintenance",
    ];

    if (trackedModels.includes(params.model as TrackedModel)) {
      const eventData = {
        model: params.model,
        action: params.action,
        data: result,
        timestamp: new Date(),
      };

      if (result.organizationId) {
        io.to(`org-${result.organizationId}`).emit("dbUpdate", eventData);
      } else {
        io.emit("dbUpdate", eventData);
      }
    }

    return result;
  };
};
