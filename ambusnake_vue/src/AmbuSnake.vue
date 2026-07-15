<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { GameEngine, GameState } from './game/GameEngine';
import { Config } from './game/Config';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const score = ref(0);
const state = ref<GameState>(GameState.START);
let engine: GameEngine | null = null;

onMounted(() => {
  if (canvasRef.value) {
    engine = new GameEngine(canvasRef.value);
    engine.onScoreChange = (s) => score.value = s;
    engine.onStateChange = (s) => state.value = s;

    // Draw initial state before starting
    const ctx = canvasRef.value.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#a8e6cf';
      ctx.fillRect(0, 0, Config.BG_WIDTH, Config.BG_HEIGHT);
      ctx.fillStyle = 'black';
      ctx.font = '48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Press Start to Play', Config.BG_WIDTH / 2, Config.BG_HEIGHT / 2);
    }
  }
});

onUnmounted(() => {
  if (engine) {
    engine.stop();
  }
});

const startGame = () => {
  if (engine) {
    engine.start();
  }
};
</script>

<template>
  <div class="snake-container">
    <div class="header">
      <h1>AmbuSnake</h1>
      <div class="score">Score: {{ score }}</div>
    </div>

    <div class="game-area">
      <canvas ref="canvasRef" class="game-canvas"></canvas>

      <div v-if="state === GameState.START" class="overlay">
        <h2>Ready?</h2>
        <button @click="startGame">Start Game</button>
      </div>

      <div v-if="state === GameState.GAMEOVER" class="overlay">
        <h2>Game Over!</h2>
        <p>Final Score: {{ score }}</p>
        <button @click="startGame">Play Again</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.snake-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Manrope', 'Roboto', sans-serif;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  margin-bottom: 10px;
}

.header h1 {
  margin: 0;
  font-size: 2rem;
}

.score {
  font-size: 1.5rem;
  font-weight: bold;
}

.game-area {
  position: relative;
  width: 1600px;
  height: 896px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  background: #a8e6cf;
}

.game-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.overlay h2 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.overlay p {
  font-size: 2rem;
  margin-bottom: 2rem;
}

button {
  padding: 15px 30px;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #e55a5a;
}
</style>
