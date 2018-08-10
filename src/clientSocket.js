import io from 'socket.io-client';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

// 'app' is the 'this' from App Component
const clientSocket = (app) => {
  const socket = io('http://localhost:8080');

  // Initial Connection to Server Confirmation
  socket.emit('clientConnection');
  socket.on('serverConnection', () => {
    console.log('Successfully connected to server socket!');
  });

  // Client Receives General Message from Server
  socket.on('serverMessage', (msg) => {
    console.log(msg);
  });

  // Client Receives Error from Server
  socket.on('errorMessage', err => console.log('SERVER SENT ERROR:', err));

  // Client Sending Login Username to Server upon Successful Login
  socket.sendUsername = (username) => {
    socket.emit('clientSendingUsername', username);
  };

  // Client Sending Document State to Server & Updates Editor
  socket.sendContentState = (currentES) => {
    socket.emit('clientSendingDoc', JSON.stringify(convertToRaw(currentES.getCurrentContent())));
  };

  // Client Requests Server to Join Document ID Room
  socket.connectToDocument = (docId) => {
    socket.emit('clientConnectingToDocument', docId);
  };

  // Client Receives Document State from Server & Updates Editor
  socket.on('serverSendingDoc', (documentContentState) => {
    app.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(documentContentState))) });
  });

  return socket;
};

export default clientSocket;
