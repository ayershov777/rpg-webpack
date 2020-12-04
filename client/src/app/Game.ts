import World, { WorldPayload } from './World';
import Player from './Player';
import Character from './Character';

export default class Game {
  private readonly body: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly socket: any;
  private readonly world: World;
  private readonly player: Player;

  constructor(body: HTMLElement, canvas: HTMLElement, socket: any) {
    this.body = body;
    this.canvas = <HTMLCanvasElement> canvas;
    this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
    this.socket = socket;
    this.player = new Player(new Character({
      ctx: this.ctx,
      socket: this.socket,
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight
    }));
    this.world = new World(this.ctx, this.socket, this.player);

    socket.on('game state', this.handleGameState.bind(this));
  }

  public init(): void {
    this.initBody();
    this.initCanvas();
  }

  public resize(): void {
    this.canvas.height = this.body.clientHeight - 24;
    this.canvas.width = this.body.clientWidth - 24;
    // this.render();
  }

  public handleGameState(payload: WorldPayload): void {
    const paint = this.paint.bind(this);
    requestAnimationFrame(() => paint(payload));
  }

  private initBodyCss() {
    this.body.style.margin = "0";
    this.body.style.height = "100vh";
    this.body.style.width = "100vw";
    this.body.style.display = "flex";
    this.body.style.justifyContent = "center";
    this.body.style.alignItems = "center";
    this.body.style.backgroundColor = "brown";
  }

  private initBody() {
    this.initBodyCss();
    this.body.append(this.canvas);
  }

  private initCanvas() {
    this.canvas.style.backgroundColor = 'white';
    this.resize();
  }

  private paint(payload: WorldPayload) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.paint(payload);
  }
}

