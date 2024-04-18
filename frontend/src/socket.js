import io from "socket.io-client";

let socket;

const connectionSocket = (userId) => {
  socket = io("http://localhost:5000", {
    query: `userId=${userId}`,
  });
};
export { socket, connectionSocket };
