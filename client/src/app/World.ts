import Character from "./Character";
import Player from "./Player";
import WorldObject, { WorldObjectPayload } from "./WorldObject";

type WorldObjects = Record<string, WorldObject>;

export type WorldPayload = Record<string, WorldObjectPayload>;

export default class World {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly socket: any;
  private readonly objects: WorldObjects;

  constructor(ctx: CanvasRenderingContext2D, socket: any, player: Player) {
    this.ctx = ctx;
    this.socket = socket;

    this.objects = {
      [player.character.id]: player.character,
    };
  }

  public paint(payload: WorldPayload) {
    const ids = Object.keys(payload);
    ids.forEach(id => {
      const character = <Character> this.objects[id];
      if(character)
        character.paint(payload[id]);
      else
        this.objects[id] = new Character({
          ...payload[id],
          ctx: this.ctx,
          socket: this.socket
        });
    });
  }
}