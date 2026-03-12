<template>
  <nav :class="{ scrolled, dark: isDark }">
    <a href="#home" class="logo" @click.prevent="scrollTo('home')">
      <img
        :src="isDark
          ? 'https://res.cloudinary.com/dnacoymkh/image/upload/v1772514344/logoweb_m20q95.png'
          : 'https://res.cloudinary.com/dnacoymkh/image/upload/v1772514345/logoweb1_jetyft.png'"
        alt="MFaridS"
        loading="lazy"
      />
    </a>

    <!-- Desktop links -->
    <ul class="nav-links">
      <li v-for="link in links" :key="link.id">
        <a
          :href="'#' + link.id"
          :class="{ active: activeSection === link.id }"
          @click.prevent="scrollTo(link.id)"
        >{{ link.label }}</a>
      </li>
    </ul>

    <div class="nav-right">
      <!-- Theme toggle -->
      <button class="theme-toggle" @click="toggle" :aria-label="isDark ? 'Light mode' : 'Dark mode'">
        <span class="toggle-track">
          <i :class="isDark ? 'fas fa-moon' : 'fas fa-sun'"></i>
        </span>
      </button>

      <!-- Burger -->
      <button class="burger" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <div class="mobile-drawer" :class="{ open: mobileOpen }" @click.self="mobileOpen = false">
      <ul>
        <li v-for="link in links" :key="link.id">
          <a
            :href="'#' + link.id"
            @click.prevent="scrollTo(link.id); mobileOpen = false"
          >{{ link.label }}</a>
        </li>
      </ul>
    </div>
    <div class="drawer-overlay" :class="{ open: mobileOpen }" @click="mobileOpen = false"></div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()

const scrolled     = ref(false)
const mobileOpen   = ref(false)
const activeSection = ref('home')

const links = [
  { id: 'home',      label: 'Home' },
  { id: 'about',     label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact',   label: 'Contact' }
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function onScroll() {
  scrolled.value = window.scrollY > 20

  // Active section detection
  const sections = links.map(l => document.getElementById(l.id)).filter(Boolean)
  let current = 'home'
  for (const s of sections) {
    if (s.getBoundingClientRect().top <= 100) current = s.id
  }
  activeSection.value = current
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
nav {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 1.1rem 8%;
  gap: 2rem;
  background: transparent;
  transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease;
}

nav.scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--border);
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}

.logo img {
  height: 26px;
  width: auto;
  display: block;
  transition: opacity 0.2s;
}
.logo:hover img { opacity: 0.7; }

.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  margin-left: auto;
}

.nav-links a {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  transition: color 0.3s;
  letter-spacing: 0.3px;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 1.5px;
  background: var(--accent);
  transition: width 0.3s;
}
.nav-links a:hover,
.nav-links a.active { color: var(--accent); }
.nav-links a:hover::after,
.nav-links a.active::after { width: 100%; }

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.theme-toggle {
  background: none;
  border: 1.5px solid var(--border);
  border-radius: 50px;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 0.85rem;
  transition: border-color 0.3s, background 0.3s;
  display: flex;
  align-items: center;
}
.theme-toggle:hover {
  border-color: var(--accent);
  background: rgba(var(--accent-rgb), 0.08);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.burger span {
  display: block;
  width: 22px; height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}
.burger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.burger.open span:nth-child(2) { opacity: 0; }
.burger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

.mobile-drawer {
  position: fixed;
  top: 0; right: -100%;
  width: min(300px, 75vw);
  height: 100vh;
  background: var(--bg-card);
  border-left: 1px solid var(--border);
  z-index: 1001;
  transition: right 0.4s cubic-bezier(0.4,0,0.2,1);
  padding: 5rem 2.5rem 2rem;
}
.mobile-drawer.open { right: 0; }

.mobile-drawer ul { list-style: none; display: flex; flex-direction: column; gap: 1.8rem; }
.mobile-drawer a {
  text-decoration: none;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.2s, padding-left 0.2s;
  display: block;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border);
}
.mobile-drawer a:hover { color: var(--accent); padding-left: 6px; }

.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.drawer-overlay.open { opacity: 1; pointer-events: all; }

@media (max-width: 768px) {
  nav { padding: 0.9rem 6%; }
  .nav-links { display: none; }
  .burger { display: flex; }
}
</style>