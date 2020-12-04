import Character from './Character';

export default class Player {
  public character: Character;
  
  constructor(character: Character) {
    this.character = character;
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      console.log('keydown');
      if (e.code === 'ArrowRight') {
        this.moveRight();
      }
    });
  }

  public moveRight() {
    console.log(this.character)
    this.character.socket.emit('move character', {
      id: this.character.id,
      x: this.character.x + 8,
      y: this.character.y
    });
  }
}