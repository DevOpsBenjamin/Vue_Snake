import { Config } from './Config';
import type { Position } from './Snake';
import { images } from './assets';

export class Bonus {
  public position: Position = { x: 0, y: 0 };

  constructor() {
    this.spawn([]);
  }

  public spawn(snakeSegments: Position[]) {
    let valid = false;
    while (!valid) {
      this.position.x = Math.floor(Math.random() * Config.BOX_COUNT_WIDTH);
      this.position.y = Math.floor(Math.random() * Config.BOX_COUNT_HEIGHT);

      valid = true;
      for (const segment of snakeSegments) {
        if (segment.x === this.position.x && segment.y === this.position.y) {
          valid = false;
          break;
        }
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const x = this.position.x * Config.BOX_SIZE;
    const y = this.position.y * Config.BOX_SIZE;
    ctx.drawImage(images.bonus, x, y, Config.BOX_SIZE, Config.BOX_SIZE);
  }
}
