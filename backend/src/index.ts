import http from "node:http";
import app from "./infrastructure/http/express/server.js";
import { createSocketServer } from "./infrastructure/websocket/socket.js";

const server = http.createServer(app);

// Initialize WebSocket server and extend Prisma client
const { prismaWithSocket } = createSocketServer(server);

// Make the extended Prisma client available to routes
app.locals.prisma = prismaWithSocket;

server.listen(process.env.PORT, () => {
  console.log(`HTTP server running on PORT: ${process.env.PORT}`);
  console.log("WebSocket server initialized");
});

server.on("error", (error) => {
  console.error("Server error:", error);
});
