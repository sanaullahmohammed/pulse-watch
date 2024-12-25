import { Socket } from "socket.io";

export const handleSocketConnection = (socket: Socket): void => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("subscribe", (organizationId: string) => {
    socket.join(`org-${organizationId}`);
    console.log(
      `Client ${socket.id} subscribed to organization ${organizationId}`
    );
  });

  socket.on("unsubscribe", (organizationId: string) => {
    socket.leave(`org-${organizationId}`);
    console.log(
      `Client ${socket.id} unsubscribed from organization ${organizationId}`
    );
  });
};
