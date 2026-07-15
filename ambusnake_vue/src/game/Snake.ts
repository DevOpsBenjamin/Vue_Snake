import { Config } from './Config';
import { Dir } from './Input';
import { images } from './assets';

export interface Position {
  x: number;
  y: number;
}

export class Snake {
  public segments: Position[] = [];
  public shouldGrow = false;

  constructor() {
    this.reset();
  }

  public reset() {
    this.segments = [
      { x: Math.floor(Config.BOX_COUNT_WIDTH / 2), y: Math.floor(Config.BOX_COUNT_HEIGHT / 2) },
      { x: Math.floor(Config.BOX_COUNT_WIDTH / 2) - 1, y: Math.floor(Config.BOX_COUNT_HEIGHT / 2) }
    ];
    this.shouldGrow = false;
  }

  public move(dir: Dir) {
    const head = this.segments[0];
    let newX = head.x;
    let newY = head.y;

    switch (dir) {
      case Dir.Up: newY -= 1; break;
      case Dir.Down: newY += 1; break;
      case Dir.Left: newX -= 1; break;
      case Dir.Right: newX += 1; break;
    }

    this.segments.unshift({ x: newX, y: newY });

    if (!this.shouldGrow) {
      this.segments.pop();
    } else {
      this.shouldGrow = false;
    }
  }

  public checkCollision(): boolean {
    const head = this.segments[0];

    // Wall collision
    if (head.x < 0 || head.x >= Config.BOX_COUNT_WIDTH || head.y < 0 || head.y >= Config.BOX_COUNT_HEIGHT) {
      return true;
    }

    // Self collision
    for (let i = 1; i < this.segments.length; i++) {
      if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
        return true;
      }
    }

    return false;
  }

  public draw(ctx: CanvasRenderingContext2D, currentDir: Dir) {
    for (let i = 0; i < this.segments.length; i++) {
      const segment = this.segments[i];
      const x = segment.x * Config.BOX_SIZE;
      const y = segment.y * Config.BOX_SIZE;

      ctx.save();
      ctx.translate(x + Config.BOX_SIZE / 2, y + Config.BOX_SIZE / 2);

      if (i === 0) {
        // Rotate head based on direction
        let angle = 0;
        switch (currentDir) {
          case Dir.Up: angle = -Math.PI / 2; break;
          case Dir.Down: angle = Math.PI / 2; break;
          case Dir.Left: angle = Math.PI; break;
          case Dir.Right: angle = 0; break;
        }
        ctx.rotate(angle);
        ctx.drawImage(images.head, -Config.BOX_SIZE / 2, -Config.BOX_SIZE / 2, Config.BOX_SIZE, Config.BOX_SIZE);
      } else {
        // Draw body
        // Determine rotation for body depending on the next segment to make a train look better.
        // For simplicity, we just draw the body image without rotation, or rotate it based on the previous segment.
        let angle = 0;
        let prev = this.segments[i - 1];
        if (prev.x > segment.x) angle = 0;
        else if (prev.x < segment.x) angle = Math.PI;
        else if (prev.y > segment.y) angle = Math.PI / 2;
        else if (prev.y < segment.y) angle = -Math.PI / 2;

        ctx.rotate(angle);
        ctx.drawImage(images.body, -Config.BOX_SIZE / 2, -Config.BOX_SIZE / 2, Config.BOX_SIZE, Config.BOX_SIZE);
      }
      ctx.restore();
    }
  }
}
