export enum Dir {
  Up,
  Down,
  Left,
  Right
}

export class InputManager {
  private currentDir: Dir = Dir.Right;
  private nextDir: Dir = Dir.Right;
  private boundHandler: (e: KeyboardEvent) => void;

  constructor() {
    this.boundHandler = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this.boundHandler);
  }

  public destroy() {
    window.removeEventListener('keydown', this.boundHandler);
  }

  private handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
      case 'z':
      case 'Z':
        if (this.currentDir !== Dir.Down) this.nextDir = Dir.Up;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (this.currentDir !== Dir.Up) this.nextDir = Dir.Down;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
      case 'q':
      case 'Q':
        if (this.currentDir !== Dir.Right) this.nextDir = Dir.Left;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (this.currentDir !== Dir.Left) this.nextDir = Dir.Right;
        break;
    }
  }

  public popNextDir(): Dir {
    this.currentDir = this.nextDir;
    return this.currentDir;
  }

  public getCurrentDir(): Dir {
    return this.currentDir;
  }
}
