import { v4 as uuid } from 'uuid';

export type WorldObjectConstructorParams = {
  ctx: CanvasRenderingContext2D;
  socket: any;
  id?: string;
  x: number;
  y: number;
  speed?: number;
  direction?: number;
};

export type WorldObjectPayload = {
  id: string;
  x: number;
  y: number;
};

export default abstract class WorldObject {
  public readonly id: string;
  public readonly socket: any;
  protected ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  protected speed: number;
  protected direction: number;
  
  protected constructor(params: WorldObjectConstructorParams) {
    this.id = params.id || uuid();
    this.socket = params.socket;
    this.ctx = params.ctx;
    this.x = params.x;
    this.y = params.y;
    this.speed = params.speed || 0;
    this.direction = params.direction || 0;
  }

  public update(payload: WorldObjectPayload): void {
    this.x = payload.x;
    this.y = payload.y;
  }

  public abstract paint(payload: any): void;
}
