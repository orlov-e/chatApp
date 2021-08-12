const socketConnection = (io) => {
  io.sockets.on("connect", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(userId, "Is Online!", socket.id);
  });
};

module.exports = socketConnection;
