<template>
  <section id="home" class="hero">
    <!-- Ambient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="hero-inner">
      <!-- Left: content -->
      <div class="hero-content reveal" ref="contentEl">
        <div class="status open">
          <span class="dot"></span>
          <span>Open Commission</span>
        </div>

        <h1>
          <span class="line">UI/UX Designer</span>
          <span class="line accent">Frontend Developer</span>
        </h1>

        <p class="hero-desc">
          I'm passionate about designing clean UI/UX and building clean front-end interfaces,
          focusing on intuitive, user-centered experiences that balance aesthetics and usability.
        </p>

        <div class="hero-footer">
          <div class="badges">
            <span class="badge"><i class="fab fa-figma"></i> Figma</span>
            <span class="badge"><i class="fab fa-js"></i> JavaScript</span>
          </div>
          <a href="#portfolio" class="btn-primary" @click.prevent="scrollTo('portfolio')">
            Explore Projects
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- Right: Lottie -->
      <div class="hero-visual reveal" style="transition-delay:0.15s">
        <div id="lottie-hero"></div>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="scroll-cue">
      <span>scroll</span>
      <div class="cue-line"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import lottie from 'lottie-web'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById('lottie-hero'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://res.cloudinary.com/dnacoymkh/raw/upload/v1772046333/uisvg_vqr13z.json'
  })
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8%;
  position: relative;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  opacity: 0.3;
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(var(--accent-rgb),0.4), transparent 70%);
  top: 5%; left: -10%;
  animation: floatOrb1 22s ease-in-out infinite;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(var(--accent-rgb),0.25), transparent 70%);
  bottom: 5%; right: -8%;
  animation: floatOrb2 28s ease-in-out infinite;
}
@keyframes floatOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,40px)} }
@keyframes floatOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,-40px)} }

.hero-inner {
  display: flex;
  align-items: center;
  gap: 4rem;
  width: 100%;
  max-width: 1200px;
  z-index: 1;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
  letter-spacing: 0.3px;
}
.status.open {
  color: #22a800;
  border: 1.5px solid #22a800;
  background: rgba(34, 168, 0, 0.06);
}
.dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22a800;
  animation: pulse 1.8s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34,168,0,0.5); }
  70% { box-shadow: 0 0 0 7px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}

h1 {
  font-family: "PolySans Bulky", sans-serif;
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1.18;
  font-weight: 700;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}
.line { display: block; color: var(--text-primary); }
.accent { color: var(--accent); }

.hero-desc {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-muted);
  max-width: 540px;
  margin-bottom: 2rem;
}

.hero-footer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.badges { display: flex; gap: 0.7rem; }
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.3s;
}
.badge:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(var(--accent-rgb),0.06);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.8rem;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}
.btn-primary i { font-size: 0.8rem; transition: transform 0.3s; }
.btn-primary:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(var(--accent-rgb),0.3); }
.btn-primary:hover i { transform: translateX(3px); }

.hero-visual { flex: 1; display: flex; justify-content: center; }
#lottie-hero { width: 100%; max-width: 460px; height: 380px; }

.scroll-cue {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  font-size: 0.6rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0.7;
  animation: cueBounce 2s ease-in-out infinite;
}
.cue-line {
  width: 1px; height: 28px;
  background: var(--accent);
  animation: lineGrow 2s ease-in-out infinite;
}
@keyframes cueBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(5px)} }
@keyframes lineGrow { 0%,100%{height:20px;opacity:0.5} 50%{height:32px;opacity:1} }

.hero-content { flex: 1; }

@media (max-width: 900px) {
  .hero { padding-top: 100px; padding-bottom: 3rem; }
  .hero-inner { flex-direction: column; text-align: left; gap: 2rem; }
  .hero-visual { order: -1; }
  #lottie-hero { max-width: 300px; height: 260px; }
  .scroll-cue { display: none; }
}
@media (max-width: 480px) {
  .hero { padding: 90px 6% 3rem; }
  h1 { font-size: 2rem; }
  .hero-footer { flex-direction: column; align-items: flex-start; }
  .btn-primary { width: 100%; justify-content: center; }
}
</style>