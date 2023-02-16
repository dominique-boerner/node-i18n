import { io } from "socket.io-client";

/**
 * Create and return a socket connection.
 */
export const useSocketIO = () => {
  const socket = io("ws://localhost:3000");
  return {
    socket,
  };
};
