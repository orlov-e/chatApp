import io from "socket.io-client";

const socket = io("http://localhost:4000/", {
  query: {
    userId: window.localStorage.userId,
  },
});

window.socket = socket;

export default socket;
