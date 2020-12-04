import Game from './app/Game';

// load socket.io from CDN
const socket = io();

let game;

window.onload = () => {
  const canvas = document.querySelector('canvas');
  game = new Game(document.body, canvas, socket);
  game.init();
}

window.onresize = () => game.resize();