import { io } from "socket.io-client";

// Replace with your server IP (10.0.2.2 for emulator, LAN IP for physical phone)
const SERVER_URL = "http://10.0.2.2:3000";

export const socket = io(SERVER_URL, {
  transports: ["websocket"], // React Native needs websocket transport
});

// handle connect event
socket.on("connect", () => {
  console.log("✅ Connected to socket server:", socket.id);
});

// handle disconnect
socket.on("disconnect", () => {
  console.log("Disconnected from socket server");
});
