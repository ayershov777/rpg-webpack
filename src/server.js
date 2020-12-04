let characters = {};

function startGameInterval(socket) {
  const intervalId = setInterval(() => {
    // console.log(characters);
    socket.emit('game state', characters);
  }, 1000/10);
}

import express from 'express';
import path from 'path';

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('client connected');
  
  socket.on('new character', (character) => {
    // console.log(character);
    characters[character.id] = character;
  });

  socket.on(('move character'), (character) => {
    console.log(character.x);
    characters[character.id].x = character.x;
    characters[character.id].y = character.y;
  });

  startGameInterval(socket);
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
