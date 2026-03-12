<template>
  <div ref="wrapper" class="intro-wrapper">
    <div class="intro-stage">

      <div class="intro-bg" :class="{ dark: isDark }"></div>

      <svg class="line-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">

        <path ref="l1" class="line"
          :stroke="isDark ? '#289DF2' : '#0F3775'"
          :style="{ strokeDashoffset: offsets[0], opacity: lineAlpha }"
          fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
          d="M -100,480 C 80,480 160,260 340,330 C 480,390 520,180 640,250 C 760,320 730,510 790,450 C 850,390 820,290 900,280 C 980,270 990,400 1060,360 C 1130,320 1180,200 1300,265 C 1400,320 1460,460 1600,390"
        />

        <path ref="l2" class="line"
          :stroke="isDark ? '#289DF2' : '#0F3775'"
          :style="{ strokeDashoffset: offsets[1], opacity: lineAlpha * 0.50 }"
          fill="none" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"
          d="M -100,160 C 150,160 210,340 410,280 C 570,230 600,80 730,140 C 860,200 850,380 1000,300 C 1110,240 1160,90 1320,155 C 1410,190 1480,300 1620,230"
        />

        <path ref="l3" class="line"
          :stroke="isDark ? '#289DF2' : '#0F3775'"
          :style="{ strokeDashoffset: offsets[2], opacity: lineAlpha * 0.38 }"
          fill="none" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"
          d="M -100,720 C 180,720 290,530 500,600 C 670,655 720,780 920,710 C 1060,660 1100,490 1280,565 C 1370,610 1440,710 1620,670"
        />

        <path ref="l4" class="line"
          :stroke="isDark ? '#289DF2' : '#0F3775'"
          :style="{ strokeDashoffset: offsets[3], opacity: lineAlpha * 0.28 }"
          fill="none" stroke-width="0.85" stroke-linecap="round" stroke-linejoin="round"
          d="M 200,800 C 330,745 450,610 610,665 C 740,710 810,820 970,765 C 1090,720 1140,585 1290,645 C 1370,678 1430,760 1550,730"
        />

        <path ref="l5" class="line"
          :stroke="isDark ? '#289DF2' : '#0F3775'"
          :style="{ strokeDashoffset: offsets[4], opacity: lineAlpha * 0.22 }"
          fill="none" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"
          d="M 120,80 C 310,40 460,170 660,100 C 820,50 920,195 1080,125 C 1200,75 1300,40 1480,88"
        />

      </svg>

      <div class="intro-text"
        :style="{ opacity: textOpacity, transform: `translateY(${textY}px) scale(${textScale})` }"
      >
        <h1 class="intro-name">MFaridS</h1>
        <p class="intro-sub">UI/UX Designer &amp; Frontend Developer</p>
        <div class="intro-hint" :style="{ opacity: hintOpacity }">
          <span>scroll to enter</span>
          <div class="hint-line"></div>
        </div>
      </div>

      <div class="prog-track">
        <div class="prog-fill" :style="{ transform: `scaleX(${progress})` }"></div>
      </div>

      <div class="intro-enter"
        :style="{ opacity: enterOpacity, transform: `translateX(-50%) translateY(${(1-enterOpacity)*12}px)` }"
      >
        <div class="e-line"></div>
        <span>entering portfolio</span>
        <div class="e-line"></div>
      </div>

    </div>

    <!-- WAJIB ada: spacer yang membuat halaman bisa discroll -->
    <div class="intro-spacer"></div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

const emit    = defineEmits(['done'])
const { isDark } = useTheme()

const wrapper  = ref(null)
const progress = ref(0)
const emitted  = ref(false)
const lengths  = ref([3400, 2900, 2700, 1600, 1800])

const l1 = ref(null), l2 = ref(null), l3 = ref(null)
const l4 = ref(null), l5 = ref(null)

onMounted(() => {
  const els = [l1.value, l2.value, l3.value, l4.value, l5.value]
  const measured = els.map(el => el ? el.getTotalLength() : 3000)
  lengths.value = measured
  els.forEach((el, i) => {
    if (!el) return
    el.style.strokeDasharray  = measured[i]
    el.style.strokeDashoffset = measured[i]
  })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))

function onScroll() {
  if (!wrapper.value) return
  // Hitung dari posisi wrapper di halaman
  const wrapperTop  = wrapper.value.offsetTop
  const totalScroll = wrapper.value.offsetHeight - window.innerHeight
  const scrolled    = window.scrollY - wrapperTop
  progress.value    = Math.min(1, Math.max(0, scrolled / totalScroll))

  if (progress.value >= 0.98 && !emitted.value) {
    emitted.value = true
    emit('done')
  }
}

const offsets = computed(() => {
  const t      = progress.value
  const delays = [0, 0.05, 0.08, 0.12, 0.10]
  const ends   = [1.00, 0.88, 0.92, 0.80, 0.84]
  return lengths.value.map((len, i) => {
    const span = ends[i] - delays[i]
    const draw = Math.max(0, Math.min(1, (t - delays[i]) / span))
    return len * (1 - draw)
  })
})

const lineAlpha = computed(() => {
  const t = progress.value
  if (t < 0.05) return t / 0.05
  if (t > 0.92) return 1 - (t - 0.92) / 0.08
  return 1
})

const textOpacity = computed(() => {
  const t = progress.value
  if (t < 0.38) return 1
  if (t < 0.60) return 1 - (t - 0.38) / 0.22
  return 0
})
const textY = computed(() => {
  const t = progress.value
  if (t < 0.38) return 0
  return -((t - 0.38) / 0.22) * 24
})
const textScale = computed(() => {
  const t = progress.value
  if (t < 0.38) return 1
  return 1 - ((t - 0.38) / 0.22) * 0.05
})
const hintOpacity  = computed(() => Math.max(0, 1 - progress.value / 0.18))
const enterOpacity = computed(() => {
  const t = progress.value
  if (t < 0.80) return 0
  return Math.min(1, (t - 0.80) / 0.20)
})
</script>

<style scoped>
.intro-wrapper {
  position: relative;
  height: 500vh;
  width: 100%;
}

.intro-spacer {
  height: 400vh;
}

.intro-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-bg {
  position: absolute;
  inset: 0;
  background: #ffffff;
  transition: background 0.4s ease;
  z-index: 0;
}
.intro-bg.dark { background: #0a0a0a; }

.line-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.line { transition: none; }

.intro-text {
  position: relative;
  z-index: 2;
  text-align: center;
  pointer-events: none;
  will-change: opacity, transform;
}
.intro-name {
  font-family: "PolySans Bulky", sans-serif;
  font-size: clamp(3rem, 9vw, 7.5rem);
  font-weight: 900;
  letter-spacing: -4px;
  color: var(--text-primary);
  line-height: 1;
}
.intro-sub {
  margin-top: 1.1rem;
  font-size: clamp(0.6rem, 1.3vw, 0.85rem);
  color: var(--accent);
  letter-spacing: 6px;
  text-transform: uppercase;
}
.intro-hint {
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 0.58rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--text-muted);
  animation: hintFloat 2.4s ease-in-out infinite;
}
.hint-line {
  width: 1px; height: 28px;
  background: var(--accent);
  animation: hintLine 2.4s ease-in-out infinite;
}
@keyframes hintFloat {
  0%,100% { transform: translateY(0); opacity: 0.45; }
  50%     { transform: translateY(8px); opacity: 1; }
}
@keyframes hintLine {
  0%,100% { height: 16px; opacity: 0.4; }
  50%     { height: 36px; opacity: 1; }
}

.prog-track {
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 1px;
  background: rgba(15, 55, 117, 0.06);
  z-index: 3;
}
.prog-fill {
  height: 100%; width: 100%;
  background: var(--accent);
  transform-origin: left center;
  transform: scaleX(0);
  opacity: 0.55;
}

.intro-enter {
  position: absolute;
  bottom: 9%; left: 50%;
  transform: translateX(-50%);
  display: flex; align-items: center; gap: 18px;
  z-index: 3;
  pointer-events: none;
  white-space: nowrap;
}
.intro-enter span {
  font-size: 0.56rem;
  letter-spacing: 7px;
  text-transform: uppercase;
  color: var(--accent);
}
.e-line {
  width: 36px; height: 1px;
  background: var(--accent);
  opacity: 0.6;
}
</style>