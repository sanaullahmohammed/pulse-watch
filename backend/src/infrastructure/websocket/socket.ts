import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { extendPrismaWithSocket } from "../db/prisma/index.js";
import { handleSocketConnection } from "./socket-events.js";

export const createSocketServer = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Extend the existing Prisma client with socket functionality
  const prismaWithSocket = extendPrismaWithSocket(io);

  // Set up connection handler
  io.on("connection", handleSocketConnection);

  return { io, prismaWithSocket };
};
