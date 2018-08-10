const serverSocket = (io) => {
  io.on('connection', (socket) => {
    io.currentDocRooms = {};

    // Client Connection Confirmation
    socket.on('clientConnection', () => {
      console.log('A client has connected!');
      socket.emit('serverConnection');
    });

    // Server Receives Error from Client
    socket.on('errorMessage', err => console.log('CLIENT SENT ERROR:', err));

    socket.on('clientSendingUsername', (username) => {
      socket.username = username;
      socket.emit('serverMessage', `Welcome to Google Docs, ${socket.username}!`);
    });

    // Server Receives Client Request to Join Document ID Room
    socket.on('clientConnectingToDocument', (docId) => {
      socket.join(docId);
      socket.currentDocRoomId = docId;
      io.in(docId).emit('serverMessage', `${socket.username} has joined room ${docId}!`);
      if (io.currentDocRooms[docId]) {
        socket.emit('serverSendingDoc', io.currentDocRooms[docId]);
      }
      // io.sockets.clients(docId).forEach(c => console.log('L27 User:', c.username));
    });

    // Server Receives Document State in JSON from Client, Broadcasts to Everyone Else
    socket.on('clientSendingDoc', (documentContentState) => {
      io.currentDocRooms[socket.currentDocRoomId] = documentContentState;
      socket.to(socket.currentDocRoom).emit('serverSendingDoc', documentContentState);
    });
  });
};

export default serverSocket;
