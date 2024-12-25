import { PrismaClient } from "@prisma/client";
import { Server as SocketServer } from "socket.io";

// Create the base Prisma client
export const prisma = new PrismaClient();

// Function to add socket extension to existing Prisma client
export const extendPrismaWithSocket = (io: SocketServer) => {
  return prisma.$extends({
    name: "prisma-socket-extension",
    query: {
      async $allOperations({ operation, model, args, query }) {
        console.log(`Prisma Operation: ${operation} on model: ${model}`);
        const result = await query(args);

        const trackedModels = ["Service", "Incident", "Organization"];

        if (trackedModels.includes(model as string)) {
          const eventData = {
            model,
            action: operation,
            data: result,
            timestamp: new Date(),
          };

          console.log("Emitting socket event:", eventData);

          if (result?.organizationId) {
            console.log(`Emitting to org: ${result.organizationId}`);
            io.to(`org-${result.organizationId}`).emit("dbUpdate", eventData);
          } else {
            console.log("Broadcasting to all clients");
            io.emit("dbUpdate", eventData);
          }

          // Log connected clients
          const rooms = io.sockets.adapter.rooms;
          console.log("Connected rooms:", [...rooms.keys()]);
        }

        return result;
      },
    },
  });
};
