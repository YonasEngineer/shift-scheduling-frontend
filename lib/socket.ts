// socket.ts (create once)
import { io, Socket } from "socket.io-client";

export const socketConnection = (userId: string) => {
  const socket: Socket = io(`${process.env.NEXT_PUBLIC_API_URL}/staff`, {
    query: {
      userId,
    },
    transports: ["websocket"], // 👈 avoids polling issues
  });
  return socket;
};
