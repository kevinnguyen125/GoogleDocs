const serverSocket = (io) => {
  io.on('connection', (socket) => {
    // Client Connection Confirmation
    socket.on('clientConnection', () => {
      console.log('A client has connected!');
      socket.emit('serverConnection');
    });

    // Server Receives Error from Client
    socket.on('errorMessage', err => console.log('CLIENT SENT ERROR:', err));

    // Server Receives Document State in JSON from Client, Broadcasts to Everyone Else
    socket.on('clientSendingDoc', (documentContentState) => {
      socket.broadcast.emit('serverSendingDoc', documentContentState);
    });
  });
};

export default serverSocket;
