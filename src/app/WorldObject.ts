export type WorldObjectConstructorParams = {
  socket: any;
  id: string;
  x: number;
  y: number;
}

export default abstract class WorldObject {
  protected readonly socket: any;
  protected readonly id: string;
  protected x: number;
  protected y: number;
  
  protected constructor(params: WorldObjectConstructorParams) {
    this.socket = params.socket;
    this.id = params.id;
    this.x = params.x;
    this.y = params.y;
  }

  protected getState() {
    return {
      id: this.id,
      x: this.x,
      y: this.y
    }
  }
}
