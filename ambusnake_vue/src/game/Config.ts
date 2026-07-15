export const Config = {
  BOX_SIZE: 64,
  BG_WIDTH: 1600,
  BG_HEIGHT: 896,
  get BOX_COUNT_WIDTH() { return this.BG_WIDTH / this.BOX_SIZE; },
  get BOX_COUNT_HEIGHT() { return this.BG_HEIGHT / this.BOX_SIZE; },
  INITIAL_SPEED_MS: 150, // Time between moves
  SPEED_DECREMENT_MS: 2, // Speed increase per patient
  MIN_SPEED_MS: 50,
  SCORE_PER_PATIENT: 10,
};
