<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { GameEngine, GameState } from './game/GameEngine';
import { Config } from './game/Config';
import GameMenu from './GameMenu.vue';

interface LeaderboardEntry {
  score: number;
  date: string;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const score = ref(0);
const state = ref<GameState>(GameState.START);
let engine: GameEngine | null = null;

const scaleFactor = ref(1);

const updateScale = () => {
  // Base dimensions of the game area
  const gameWidth = 1600;
  // Account for header height + margin (approx 60px)
  const gameHeight = 896 + 60;

  const widthRatio = window.innerWidth / gameWidth;
  const heightRatio = window.innerHeight / gameHeight;

  // Use the smaller ratio to ensure it always fits in both dimensions with a little margin (0.95)
  scaleFactor.value = Math.min(widthRatio, heightRatio) * 0.95;
};

// LocalStorage Persistent High Score & Leaderboard
const highScore = ref(parseInt(localStorage.getItem('ambusnake_high_score') || '0'));
const leaderboard = ref<LeaderboardEntry[]>(
  JSON.parse(localStorage.getItem('ambusnake_leaderboard') || '[]')
);

onMounted(() => {
  updateScale();
  window.addEventListener('resize', updateScale);

  if (canvasRef.value) {
    engine = new GameEngine(canvasRef.value);
    engine.onScoreChange = (s) => score.value = s;
    engine.onStateChange = (s) => handleStateChange(s);

    // Draw initial state before starting
    const ctx = canvasRef.value.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#a8e6cf';
      ctx.fillRect(0, 0, Config.BG_WIDTH, Config.BG_HEIGHT);
    }
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScale);
  if (engine) {
    engine.stop();
  }
});

const handleStateChange = (s: GameState) => {
  state.value = s;
  
  if (s === GameState.GAMEOVER) {
    // 1. Check & save high score
    if (score.value > highScore.value) {
      highScore.value = score.value;
      localStorage.setItem('ambusnake_high_score', score.value.toString());
    }
    
    // 2. Add to leaderboard & sort/slice
    const today = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    const newEntry: LeaderboardEntry = {
      score: score.value,
      date: today
    };
    
    const updated = [...leaderboard.value, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Keep top 5
      
    leaderboard.value = updated;
    localStorage.setItem('ambusnake_leaderboard', JSON.stringify(updated));
  }
};

const startGame = () => {
  if (engine) {
    engine.start();
  }
};
</script>

<template>
  <div class="snake-container" :style="{ transform: `scale(${scaleFactor})`, transformOrigin: 'center center' }">
    <!-- Game Header (Glass styled) -->
    <div class="header">
      <div class="logo-area">
        <h1>AmbuSnake</h1>
        <span class="tagline">Sauvez des vies à Strasbourg</span>
      </div>
      <div class="stats">
        <div class="stat-box record-box">
          <span class="label">🏆 RECORD</span>
          <span class="value">{{ highScore }}</span>
        </div>
        <div class="stat-box score-box">
          <span class="label">🚑 SCORE</span>
          <span class="value">{{ score }}</span>
        </div>
      </div>
    </div>

    <!-- Main Game Canvas Frame -->
    <div class="game-area">
      <canvas ref="canvasRef" class="game-canvas"></canvas>

      <!-- Integrated Game Menu (Start & Game Over Overlays) -->
      <GameMenu 
        :state="state" 
        :score="score" 
        :highScore="highScore" 
        :leaderboard="leaderboard" 
        @start="startGame" 
      />
    </div>
  </div>
</template>

<style scoped>
.snake-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Outfit', 'Inter', 'Roboto', sans-serif;
  color: white;
}

/* Glass styled Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  margin-bottom: 8px;
  padding: 6px 16px;
  background: rgba(15, 23, 42, 0.45);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.logo-area {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.logo-area h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: 0.8rem;
  color: #94a3b8;
  letter-spacing: 1px;
}

.stats {
  display: flex;
  gap: 12px;
}

.stat-box {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.record-box {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.3);
}

.score-box {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.stat-box .label {
  font-size: 0.7rem;
  font-weight: bold;
  color: #94a3b8;
  margin-bottom: 0;
  letter-spacing: 1px;
}

.record-box .label {
  color: #fbbf24;
}

.score-box .label {
  color: #60a5fa;
}

.stat-box .value {
  font-size: 1.2rem;
  font-weight: 900;
}

/* Canvas Area */
.game-area {
  position: relative;
  width: 1600px;
  height: 896px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
}

.game-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
