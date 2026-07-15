import { Config } from './Config';
import { InputManager } from './Input';
import { Snake } from './Snake';
import { Bonus } from './Bonus';
import { images } from './assets';

export enum GameState {
  START,
  RUNNING,
  GAMEOVER
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private input: InputManager;
  private snake: Snake;
  private bonus: Bonus;

  public state: GameState = GameState.START;
  public score: number = 0;

  private lastTime: number = 0;
  private moveTimer: number = 0;
  private currentSpeed: number = Config.INITIAL_SPEED_MS;
  private animationFrameId: number = 0;

  public onScoreChange?: (score: number) => void;
  public onStateChange?: (state: GameState) => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.input = new InputManager();
    this.snake = new Snake();
    this.bonus = new Bonus();

    // Resize canvas based on Config
    this.canvas.width = Config.BG_WIDTH;
    this.canvas.height = Config.BG_HEIGHT;
  }

  public start() {
    this.snake.reset();
    this.bonus.spawn(this.snake.segments);
    this.score = 0;
    this.currentSpeed = Config.INITIAL_SPEED_MS;
    this.state = GameState.RUNNING;
    if (this.onScoreChange) this.onScoreChange(this.score);
    if (this.onStateChange) this.onStateChange(this.state);

    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  public stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.input.destroy();
  }

  private loop(currentTime: number) {
    if (this.state !== GameState.RUNNING) return;

    this.animationFrameId = requestAnimationFrame(this.loop.bind(this));

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    this.moveTimer += deltaTime;

    if (this.moveTimer >= this.currentSpeed) {
      this.moveTimer = 0;
      this.update();
    }

    this.draw();
  }

  private update() {
    const dir = this.input.popNextDir();
    this.snake.move(dir);

    // Check collision with Bonus
    const head = this.snake.segments[0];
    if (head.x === this.bonus.position.x && head.y === this.bonus.position.y) {
      this.snake.shouldGrow = true;
      this.score += Config.SCORE_PER_PATIENT;
      this.currentSpeed = Math.max(Config.MIN_SPEED_MS, this.currentSpeed - Config.SPEED_DECREMENT_MS);
      this.bonus.spawn(this.snake.segments);
      if (this.onScoreChange) this.onScoreChange(this.score);
    }

    // Check collision with walls or self
    if (this.snake.checkCollision()) {
      this.state = GameState.GAMEOVER;
      if (this.onStateChange) this.onStateChange(this.state);
    }
  }

  private draw() {
    // Draw background grid
    const pattern = this.ctx.createPattern(images.bg, 'repeat');
    if (pattern) {
      this.ctx.fillStyle = pattern;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.ctx.fillStyle = '#a8e6cf';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.bonus.draw(this.ctx);
    this.snake.draw(this.ctx, this.input.getCurrentDir());
  }
}
