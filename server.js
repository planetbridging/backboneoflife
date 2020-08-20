const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = 3000 || process.env.PORT;
const io = socketio(server);

const botName = 'back bot';
const formatMessage = require('./messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./users');

app.use(express.static(path.join(__dirname, 'public')));
server.listen(port, () => console.log('backboneoflife running on: ' + port));

io.on('connection', socket => {
  console.log("New connection");
  socket.emit('message', 'Welcome to backboneoflife');
  socket.broadcast.emit('message', 'A user has joined');

  //on disconnect
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  });

  //listen for message
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
  });


});
