import io from 'socket.io-client';
import { EditorState, convertFromRaw } from 'draft-js';

// 'app' is the 'this' from App Component
const clientSocket = (app) => {
  const socket = io('http://localhost:8080');

  // Initial Connection to Server Confirmation
  socket.emit('clientConnection');
  socket.on('serverConnection', () => {
    console.log('Successfully connected to server socket!');
  });

  // Client Receives Error from Server
  socket.on('errorMessage', err => console.log('SERVER SENT ERROR:', err));

  // Client Receives Document State from Server & Updates Editor
  socket.on('serverSendingDoc', (documentContentState) => {
    app.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(documentContentState))) });
  });

  return socket;
};

export default clientSocket;
