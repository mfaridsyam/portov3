<template>
  <div class="music-player" :class="{ playing }" @click="toggle">
    <div class="mp-icon">
      <i class="fas fa-music"></i>
      <div v-if="playing" class="sound-waves">
        <span></span><span></span><span></span>
      </div>
    </div>
    <div class="mp-info">
      <div class="mp-title">{{ currentTrack.title }}</div>
      <div class="mp-status">{{ playing ? 'Now playing' : 'Tap to play' }}</div>
    </div>
    <audio ref="audio" @ended="nextTrack"></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { playlist } from '@/data/index.js'

const audio = ref(null)
const playing = ref(false)
const trackIdx = ref(0)

const currentTrack = computed(() => playlist[trackIdx.value])

function toggle() {
  if (!audio.value) return
  if (!audio.value.src) audio.value.src = currentTrack.value.src
  if (playing.value) {
    audio.value.pause()
    playing.value = false
  } else {
    audio.value.play().then(() => { playing.value = true }).catch(() => {})
  }
}

function nextTrack() {
  trackIdx.value = (trackIdx.value + 1) % playlist.length
  if (audio.value) {
    audio.value.src = currentTrack.value.src
    audio.value.play().then(() => { playing.value = true }).catch(() => {})
  }
}
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 1.5rem; right: 1.5rem;
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 50px;
  padding: 0.6rem 1.1rem;
  display: flex; align-items: center; gap: 0.7rem;
  z-index: 998;
  cursor: pointer;
  max-width: 220px;
  transition: all 0.35s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
.music-player:hover {
  box-shadow: 0 8px 30px var(--shadow);
  transform: translateY(-2px);
  border-color: rgba(var(--accent-rgb), 0.4);
}

.mp-icon {
  width: 32px; height: 32px;
  background: rgba(var(--accent-rgb),0.12);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  position: relative;
  transition: background 0.3s;
}
.music-player:hover .mp-icon { background: var(--accent); }
.music-player:hover .mp-icon i { color: #fff; }
.mp-icon i { font-size: 0.8rem; color: var(--accent); position: relative; z-index: 1; }

.sound-waves {
  position: absolute; inset: 0;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center; gap: 2px;
}
.sound-waves span {
  display: block; width: 2px;
  background: var(--accent);
  border-radius: 2px;
  animation: wave 0.9s ease-in-out infinite;
}
.sound-waves span:nth-child(1) { height: 8px; animation-delay: 0s; }
.sound-waves span:nth-child(2) { height: 14px; animation-delay: 0.15s; }
.sound-waves span:nth-child(3) { height: 8px; animation-delay: 0.3s; }
@keyframes wave {
  0%,100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1.4); }
}

.mp-info { flex: 1; min-width: 0; }
.mp-title {
  font-size: 0.75rem; font-weight: 600; color: var(--accent);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.mp-status { font-size: 0.62rem; color: var(--text-muted); }

@media (max-width: 480px) {
  .music-player { bottom: 1rem; right: 1rem; max-width: 180px; }
}
</style>