import { io, Socket } from "socket.io-client";

let socket: Socket | undefined;

const connectSocket = (firebaseIdToken: string, serverUrl:  string) => {
  socket = io(serverUrl, {
    transports: ["websocket"],
    auth: {
      token: firebaseIdToken
    }
  });
  socket.on("connect", () => {
    console.log("Connected to socket server: ", socket?.id);
  });
  socket.on("disconnect", () => {
    console.log(" Disconnected from server");
  });
  socket.on("connect_error", (err) => {
    console.log("Socket connection error:", err.message);
  });
  socket.emit("info", "carlos012100@gmail.com")
};
const getSocket= () => {
  return socket
}
export default { getSocket, connectSocket};
