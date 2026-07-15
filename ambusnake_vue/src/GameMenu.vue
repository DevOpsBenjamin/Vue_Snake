<script setup lang="ts">
import { GameState } from './game/GameEngine';
// @ts-ignore
import imgSplash from '@/assets/Splash.png';

interface LeaderboardEntry {
  score: number;
  date: string;
}

defineProps<{
  state: GameState;
  score: number;
  highScore: number;
  leaderboard: LeaderboardEntry[];
}>();

defineEmits<{
  (e: 'start'): void;
}>();
</script>

<template>
  <div>
    <!-- START MENU OVERLAY (Glassmorphism & Splash Background) -->
    <div v-if="state === GameState.START" class="overlay" :style="{ backgroundImage: `url(${imgSplash})` }">
      <div class="blur-shield"></div>
      <div class="glass-card">
        <div class="card-header">
          <h2 class="title">AMBUSNAKE</h2>
          <p class="subtitle">Strasbourg Emergency Drive</p>
        </div>

        <!-- Top Scores Table -->
        <div class="leaderboard-section" v-if="leaderboard.length > 0">
          <h3>🏆 CLASSEMENT SECOURISTES</h3>
          <div class="table-container">
            <table class="leaderboard-table">
              <thead>
                <tr>
                  <th>RANG</th>
                  <th>SCORE</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(entry, index) in leaderboard" :key="index" :class="{ 'top-1': index === 0 }">
                  <td class="rank-cell">
                    <span class="rank-badge">{{ index + 1 }}</span>
                  </td>
                  <td class="score-cell">{{ entry.score }} pts</td>
                  <td class="date-cell">{{ entry.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="leaderboard-section empty" v-else>
          <p class="first-game">Aucune mission enregistrée.<br>Prenez le volant pour sauver des vies !</p>
        </div>

        <button class="btn btn-primary" @click="$emit('start')">COMMENCER LA MISSION</button>
      </div>
    </div>

    <!-- GAME OVER OVERLAY (Glassmorphism & Splash Background) -->
    <div v-if="state === GameState.GAMEOVER" class="overlay" :style="{ backgroundImage: `url(${imgSplash})` }">
      <div class="blur-shield danger-shield"></div>
      <div class="glass-card danger-card">
        <div class="card-header">
          <h2 class="title alert">FIN DE MISSION</h2>
          <p class="subtitle">Ambulance accidentée</p>
        </div>
        
        <div class="result-details">
          <div class="score-result">
            <span class="lbl">Patients sauvés</span>
            <span class="val">{{ score }} pts</span>
          </div>
          
          <div v-if="score >= highScore && score > 0" class="new-record-badge">
            🔥 NOUVEAU RECORD !
          </div>
        </div>

        <!-- Current Ranking Table -->
        <div class="leaderboard-section">
          <h3>🏆 CLASSEMENT ACTUEL</h3>
          <div class="table-container">
            <table class="leaderboard-table">
              <thead>
                <tr>
                  <th>RANG</th>
                  <th>SCORE</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(entry, index) in leaderboard" :key="index" :class="{ 'top-1': index === 0 }">
                  <td class="rank-cell">
                    <span class="rank-badge">{{ index + 1 }}</span>
                  </td>
                  <td class="score-cell">{{ entry.score }} pts</td>
                  <td class="date-cell">{{ entry.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button class="btn btn-secondary" @click="$emit('start')">REPARTIR EN MISSION</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Glassmorphism Overlays */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

/* Dark transparent shields over the splash background image to blur it */
.blur-shield {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(10px) saturate(130%);
  -webkit-backdrop-filter: blur(10px) saturate(130%);
  z-index: 1;
}

.danger-shield {
  background: rgba(28, 10, 10, 0.65);
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
}

/* Premium Glassmorphism Card container */
.glass-card {
  position: relative;
  width: 520px;
  padding: 40px;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  text-align: center;
  transition: all 0.3s ease;
}

.danger-card {
  border-color: rgba(239, 68, 68, 0.25);
  background: rgba(24, 18, 18, 0.82);
  box-shadow: 0 30px 70px rgba(239, 68, 68, 0.15);
}

.card-header {
  margin-bottom: 28px;
}

.glass-card .title {
  font-size: 3rem;
  font-weight: 900;
  margin: 0 0 6px 0;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-card .title.alert {
  background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-card .subtitle {
  font-size: 1.05rem;
  color: #94a3b8;
  margin: 0;
  letter-spacing: 1px;
}

/* Leaderboard design */
.leaderboard-section {
  width: 100%;
  margin-bottom: 32px;
}

.leaderboard-section h3 {
  font-size: 0.95rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #60a5fa;
  margin: 0 0 16px 0;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 8px;
}

.danger-card .leaderboard-section h3 {
  color: #f87171;
}

.table-container {
  max-height: 220px;
  overflow-y: auto;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  text-align: left;
}

.leaderboard-table th {
  padding: 10px 16px;
  font-size: 0.75rem;
  color: #64748b;
  letter-spacing: 1px;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.leaderboard-table td {
  padding: 12px 16px;
  color: #e2e8f0;
}

.leaderboard-table tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.leaderboard-table tr.top-1 {
  background: rgba(245, 158, 11, 0.08);
}

.leaderboard-table tr.top-1 .rank-badge {
  background: #fbbf24;
  color: #1e1b4b;
}

.leaderboard-table tr.top-1 .score-cell {
  color: #fbbf24;
  font-weight: bold;
}

.rank-cell {
  width: 60px;
}

.rank-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  font-weight: bold;
  color: #cbd5e1;
}

.score-cell {
  font-weight: 600;
}

.date-cell {
  color: #64748b;
  font-size: 0.85rem;
  text-align: right;
}

.leaderboard-section.empty {
  padding: 24px 0;
}

.first-game {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
}

/* Result panel in Game Over */
.result-details {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.15);
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.score-result {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-result .lbl {
  font-size: 0.85rem;
  color: #94a3b8;
  letter-spacing: 1px;
}

.score-result .val {
  font-size: 2.2rem;
  font-weight: 900;
  color: #ffffff;
}

.new-record-badge {
  background: #fbbf24;
  color: #1e1b4b;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 4px 16px;
  border-radius: 20px;
  letter-spacing: 1px;
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.4);
}

/* Dynamic Buttons */
.btn {
  width: 100%;
  padding: 16px 32px;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.35);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%);
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #f87171 0%, #dc2626 100%);
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.55);
  transform: translateY(-2px);
}

.btn-secondary:active {
  transform: translateY(0);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
  }
}
</style>
