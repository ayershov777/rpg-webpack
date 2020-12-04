import WorldObject, { WorldObjectConstructorParams, WorldObjectPayload } from './WorldObject';

type CharacterConstructorParams = WorldObjectConstructorParams & {
  radius?: number;
}

type CharacterPayload = {
  id: string;
  x: number;
  y: number;
  radius: number;
}

export default class Character extends WorldObject {
  private radius: number;

  constructor(params: CharacterConstructorParams) {
    super(params);
    this.radius = params.radius || 32;

    if(!params.id) {
      this.socket.emit('new character', {
        id: this.id,
        x: this.x,
        y: this.y,
        radius: this.radius
      });
    }
  }

  public paint(payload: WorldObjectPayload): void {
    this.x = payload.x;
    this.y = payload.y;

    const centerX = this.x + this.radius;
    const centerY = this.y + this.radius;
    
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}
