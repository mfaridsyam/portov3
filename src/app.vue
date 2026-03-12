<template>
  <!-- Phase 1: Scroll intro -->
  <div v-if="phase === 'intro'">
    <ScrollIntro @done="onIntroDone" />
  </div>

  <!-- Phase 2: Portfolio -->
  <Transition name="port-fade">
    <div v-if="phase === 'portfolio'" class="port-root">
      <TheNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <TheFooter />
      <MusicPlayer />
    </div>
  </Transition>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import ScrollIntro      from '@/components/ScrollIntro.vue'
import TheNavbar        from '@/components/TheNavbar.vue'
import HeroSection      from '@/components/HeroSection.vue'
import AboutSection     from '@/components/AboutSection.vue'
import PortfolioSection from '@/components/PortfolioSection.vue'
import ContactSection   from '@/components/ContactSection.vue'
import TheFooter        from '@/components/TheFooter.vue'
import MusicPlayer      from '@/components/MusicPlayer.vue'

const phase = ref('intro')

const saved = localStorage.getItem('theme')
if (saved !== 'light') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

async function onIntroDone() {
  phase.value = 'portfolio'
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'instant' })
  await nextTick()
  initReveal()
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    },
    { threshold: 0.10 }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
}
</script>

<style>
.port-fade-enter-active { transition: opacity 0.9s ease; }
.port-fade-enter-from   { opacity: 0; }
.port-root { min-height: 100vh; }
</style>