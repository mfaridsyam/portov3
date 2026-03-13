<template>

  <!-- ══════════════════════════════════════════════ -->
  <!--  CUSTOM CURSOR                                 -->
  <!-- ══════════════════════════════════════════════ -->
  <div class="cursor" :class="{ hover: cursorHover }"
    :style="{ left: cursor.x + 'px', top: cursor.y + 'px' }"
  ></div>
  <div class="cursor-dot"
    :style="{ left: cursor.x + 'px', top: cursor.y + 'px' }"
  ></div>

  <!-- ══════════════════════════════════════════════ -->
  <!--  LOADING SCREEN                               -->
  <!-- ══════════════════════════════════════════════ -->
  <Transition name="loader-out">
    <div v-if="phase === 'loading'" class="loader">
      <div class="loader-bar">
        <div class="loader-bar-fill" :style="{ width: loadPct + '%' }"></div>
      </div>
      <div class="loader-body">
        <p class="loader-label">{{ loaderLabel }}</p>
        <div class="loader-pct">{{ loadPct }}<span>%</span></div>
      </div>
    </div>
  </Transition>

  <!-- ══════════════════════════════════════════════ -->
  <!--  MAIN SITE                                    -->
  <!-- ══════════════════════════════════════════════ -->
  <div v-if="phase === 'site'" class="site">

    <!-- Top bar -->
    <header class="topbar">
      <span class="topbar-left">FS — {{ currentYear }} ©</span>
      <nav class="topbar-center">
        <a @click.prevent="scrollTo('intro')">INTRO</a>
        <a @click.prevent="scrollTo('about')">ABOUT</a>
        <a @click.prevent="scrollTo('work')">WORK</a>
        <a @click.prevent="scrollTo('contact')">CONTACT</a>
      </nav>
      <button class="topbar-right" @click="toggleTheme">
        {{ isDark ? 'LIGHT' : 'DARK' }}
      </button>
    </header>

    <!-- ─── SECTION 1: HERO F.S ─────────────────── -->
    <section class="sec-hero" id="hero" ref="secHero">
      <div class="hero-sticky">
        <!-- giant F.S letters -->
        <div class="hero-letters" :style="{ transform: `scale(${heroScale})`, opacity: heroOpacity }">
          <span class="hero-f" :style="{ transform: `translateX(${heroFX}px)` }">F</span>
          <span class="hero-dot">.</span>
          <span class="hero-s" :style="{ transform: `translateX(${heroSX}px)` }">S</span>
        </div>
        <!-- Scroll cue -->
        <div class="hero-cue" :style="{ opacity: heroCueOpacity }">
          <div class="cue-mouse"><div class="cue-dot"></div></div>
          <span>Scroll Down</span>
        </div>
      </div>
    </section>

    <!-- ─── SECTION 2: INTRO "Let Me Introduce" ─── -->
    <section class="sec-intro" id="intro" ref="secIntro">
      <div class="intro-sticky" :style="{ opacity: introOpacity }">
        <div class="intro-lines">
          <div class="intro-line"
            :style="{ transform: `translateX(${introOffsets[0]}px)`, filter: `blur(${introBlur}px)` }"
          >
            <span>Let Me Introduce</span>
          </div>
          <div class="intro-line intro-line-2"
            :style="{ transform: `translateX(${introOffsets[1]}px)`, filter: `blur(${introBlur}px)` }"
          >
            <span>My self</span>
            <div class="intro-photo">
              <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1772046344/vecpic_fn1deb.png" alt="Farid" />
            </div>
          </div>
          <div class="intro-line"
            :style="{ transform: `translateX(${introOffsets[2]}px)`, filter: `blur(${introBlur}px)` }"
          >
            <span class="intro-accent">As Designer.</span>
          </div>
        </div>

        <!-- Scroll cue bottom -->
        <div class="intro-cue" :style="{ opacity: introCueOpacity }">
          <div class="cue-mouse"><div class="cue-dot"></div></div>
          <span>Scroll Down</span>
        </div>
      </div>
    </section>

    <!-- ─── SECTION 3: SPECIALIZATION ────────────── -->
    <section class="sec-spec" ref="secSpec">
      <div class="spec-sticky">
        <div class="spec-tag reveal-up">UI/UX DESIGNER & FRONTEND DEVELOPER</div>
        <h2 class="spec-heading reveal-up" style="transition-delay:.08s">
          Specializing In<br>Creative Interface<br><em>Design.</em>
        </h2>
        <!-- arrow circle cursor hint -->
        <div class="spec-arrow-circle" :style="{ opacity: specArrowOpacity }">
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke="var(--text)" stroke-width="1"/>
            <path d="M20 12 L20 28 M14 22 L20 28 L26 22" stroke="var(--text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- ─── SECTION 4: ABOUT ──────────────────────── -->
    <section class="sec-about" id="about" ref="secAbout">
      <div class="about-inner">
        <div class="about-left">
          <p class="about-tag reveal-up">WHO I AM</p>
          <div class="about-photo reveal-up" style="transition-delay:.06s">
            <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1772046344/vecpic_fn1deb.png" alt="Farid Syam" />
          </div>
        </div>
        <div class="about-right">
          <h2 class="reveal-up">Muhammad<br>Farid Syam</h2>
          <p class="about-bio reveal-up" style="transition-delay:.1s">
            Greetings, I'm <strong>Muhammad Farid Syam</strong>, a UI/UX Designer &
            Frontend Developer based in Indonesia. I specialize in crafting web interfaces
            that aren't just static pages but dynamic, intuitive journeys built with Figma
            and Vue.js.
          </p>
          <blockquote class="reveal-up" style="transition-delay:.18s">
            "Design with soul, develop with logic."
          </blockquote>
          <div class="about-stats reveal-up" style="transition-delay:.26s">
            <div class="astat" v-for="s in stats" :key="s.label">
              <div class="astat-n">{{ s.value }}</div>
              <div class="astat-l">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SECTION 5: SELECTED WORK ─────────────── -->
    <section class="sec-work" id="work" ref="secWork">
      <div class="work-inner">
        <div class="work-header">
          <div class="work-tag reveal-up">SELECTED WORK</div>
          <h2 class="work-title reveal-up" style="transition-delay:.06s">Projects</h2>
        </div>

        <!-- Projects list — editorial style -->
        <div class="work-list">
          <div
            v-for="(proj, i) in projects"
            :key="proj.title"
            class="work-item reveal-up"
            :style="`transition-delay:${i * 0.05}s`"
            @click="openProject(proj)"
            @mouseenter="hoverProject = proj"
            @mouseleave="hoverProject = null"
          >
            <span class="wi-num">{{ String(i+1).padStart(2,'0') }}</span>
            <span class="wi-title">{{ proj.title }}</span>
            <span class="wi-cat">{{ proj.badges[0] }}</span>
            <span class="wi-arrow">→</span>
          </div>
        </div>

        <!-- Hover preview image -->
        <div class="work-preview" :class="{ active: hoverProject }"
          :style="{ left: cursor.x + 20 + 'px', top: cursor.y - 60 + 'px' }"
        >
          <img v-if="hoverProject" :src="hoverProject.image" :alt="hoverProject.title" />
        </div>
      </div>
    </section>

    <!-- ─── SECTION 6: CERTIFICATES ──────────────── -->
    <section class="sec-certs" ref="secCerts">
      <div class="certs-inner">
        <div class="work-tag reveal-up">CERTIFICATES</div>
        <div class="certs-grid">
          <div
            v-for="(cert, i) in certificates"
            :key="cert.title"
            class="cert-card reveal-up"
            :style="`transition-delay:${i * 0.07}s`"
            @click="openCert(cert)"
          >
            <div class="cc-img">
              <img :src="cert.images[0]" :alt="cert.title" loading="lazy" />
              <div class="cc-overlay"><i class="fas fa-expand-alt"></i></div>
            </div>
            <div class="cc-info">
              <h3>{{ cert.title }}</h3>
              <p>{{ cert.issuer }}</p>
              <span>{{ cert.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SECTION 7: TECH STACK ─────────────────── -->
    <section class="sec-tech" ref="secTech">
      <div class="tech-inner">
        <div class="work-tag reveal-up">TECH STACK</div>
        <div class="tech-marquee-wrap">
          <div class="tech-marquee">
            <div class="tech-track">
              <div class="tech-chip" v-for="(t,i) in [...techStack,...techStack]" :key="i">
                <img :src="isDark ? t.iconDark : t.iconLight" :alt="t.name" />
                <span>{{ t.name }}</span>
              </div>
            </div>
          </div>
          <!-- second row reversed -->
          <div class="tech-marquee tech-marquee-rev">
            <div class="tech-track">
              <div class="tech-chip" v-for="(t,i) in [...techStack,...techStack].reverse()" :key="i">
                <img :src="isDark ? t.iconDark : t.iconLight" :alt="t.name" />
                <span>{{ t.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SECTION 8: CONTACT ────────────────────── -->
    <section class="sec-contact" id="contact" ref="secContact">
      <div class="contact-inner">
        <div class="work-tag reveal-up">GET IN TOUCH</div>
        <h2 class="contact-heading reveal-up" style="transition-delay:.06s">
          Let's Work<br><em>Together.</em>
        </h2>
        <div class="contact-grid">
          <div class="contact-lottie reveal-up" style="transition-delay:.12s">
            <div id="lottie-contact"></div>
            <div class="contact-chips">
              <span><i class="fas fa-paint-brush"></i> UI/UX Design</span>
              <span><i class="fas fa-code"></i> Frontend Dev</span>
            </div>
          </div>
          <form class="contact-form reveal-up" style="transition-delay:.2s" @submit.prevent="sendMessage" novalidate>
            <input type="text" name="website" id="hp" tabindex="-1" style="position:absolute;left:-9999px;opacity:0" />
            <input v-model="form.name"    type="text"  placeholder="Your Name"    required :disabled="sending" />
            <input v-model="form.email"   type="email" placeholder="Your Email"   required :disabled="sending" />
            <textarea v-model="form.message" placeholder="Your Message" rows="5"  required :disabled="sending"></textarea>
            <button type="submit" :disabled="sending">
              <i :class="sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
              {{ sending ? 'Sending…' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <span>© {{ currentYear }} MFaridS — All Rights Reserved.</span>
      <span>UI/UX Designer & Frontend Developer</span>
    </footer>

    <!-- Music Player -->
    <MusicPlayer />

    <!-- ── MODALS ── -->
    <Teleport to="body">
      <!-- Project modal -->
      <Transition name="mfade">
        <div v-if="activeProject" class="modal-overlay" @click.self="activeProject=null">
          <div class="modal-proj">
            <button class="mclose" @click="activeProject=null"><i class="fas fa-times"></i></button>
            <div class="mp-side">
              <h2>{{ activeProject.title }}</h2>
              <p>{{ activeProject.desc }}</p>
              <div class="mp-role">
                <small>ROLE</small>
                <span>{{ activeProject.role }}</span>
              </div>
              <div class="mp-badges">
                <span v-for="b in activeProject.badges" :key="b">{{ b }}</span>
              </div>
            </div>
            <div class="mp-imgs">
              <img v-for="(img,i) in activeProject.images" :key="i" :src="img" :alt="activeProject.title" loading="lazy" />
            </div>
          </div>
        </div>
      </Transition>

      <!-- Cert modal -->
      <Transition name="mfade">
        <div v-if="activeCert" class="modal-overlay" @click.self="activeCert=null">
          <div class="modal-cert">
            <button class="mclose" @click="activeCert=null"><i class="fas fa-times"></i></button>
            <div v-if="activeCert.images.length > 1" class="cert-nav">
              <button @click="certIdx = Math.max(0, certIdx-1)" :disabled="certIdx===0"><i class="fas fa-chevron-left"></i></button>
              <span>{{ certIdx+1 }} / {{ activeCert.images.length }}</span>
              <button @click="certIdx = Math.min(activeCert.images.length-1, certIdx+1)" :disabled="certIdx===activeCert.images.length-1"><i class="fas fa-chevron-right"></i></button>
            </div>
            <img :src="activeCert.images[certIdx]" :alt="activeCert.title" />
            <div class="cert-modal-info">
              <h3>{{ activeCert.title }}</h3>
              <p>{{ activeCert.issuer }}</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Toast -->
      <Transition name="toast">
        <div v-if="toast.show" class="toast" :class="toast.type">
          <i :class="toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
          <div><strong>{{ toast.title }}</strong><p>{{ toast.text }}</p></div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { projects, certificates, techStack } from '@/data/index.js'
import MusicPlayer from '@/components/MusicPlayer.vue'
import emailjs from '@emailjs/browser'
import lottie from 'lottie-web'

const { isDark, toggle: themeToggle } = useTheme()

// ── Theming ─────────────────────────────────────────────────────────
function toggleTheme() { themeToggle() }

// ── Phase ────────────────────────────────────────────────────────────
const phase   = ref('loading')
const loadPct = ref(0)
const labels  = ['Initializing...', 'Loading assets...', 'Building world...', 'Welcome.']
const loaderLabel = ref(labels[0])

onMounted(async () => {
  // Loading animation
  const dur = 2600
  const t0  = Date.now()
  const tick = () => {
    const p = Math.min(100, Math.round((Date.now() - t0) / dur * 100))
    loadPct.value = p
    loaderLabel.value = labels[Math.min(3, Math.floor(p / 26))]
    if (p < 100) requestAnimationFrame(tick)
    else setTimeout(async () => {
      phase.value = 'site'
      await nextTick()
      initReveal()
      initLottie()
    }, 380)
  }
  requestAnimationFrame(tick)

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMouse, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onMouse)
})

// ── Custom cursor ─────────────────────────────────────────────────────
const cursor      = reactive({ x: -100, y: -100 })
const cursorHover = ref(false)
function onMouse(e) {
  cursor.x = e.clientX
  cursor.y = e.clientY
  // hover check
  const el = document.elementFromPoint(e.clientX, e.clientY)
  cursorHover.value = !!(el && el.closest('a, button, .work-item, .cert-card, .work-item'))
}

// ── Scroll state ──────────────────────────────────────────────────────
const scrollY  = ref(0)
const secHero  = ref(null)
const secIntro = ref(null)
const secSpec  = ref(null)
const secAbout = ref(null)

function onScroll() { scrollY.value = window.scrollY }

// ── HERO: F.S parallax spread apart on scroll ─────────────────────────
const heroScale = computed(() => {
  if (!secHero.value) return 1
  const t = Math.min(1, scrollY.value / (window.innerHeight * 0.7))
  return 1 + t * 0.15
})
const heroFX = computed(() => {
  const t = Math.min(1, scrollY.value / (window.innerHeight * 0.7))
  return -t * 180
})
const heroSX = computed(() => {
  const t = Math.min(1, scrollY.value / (window.innerHeight * 0.7))
  return t * 180
})
const heroOpacity = computed(() => {
  const t = Math.min(1, scrollY.value / (window.innerHeight * 0.5))
  return t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1
})
const heroCueOpacity = computed(() => Math.max(0, 1 - scrollY.value / 150))

// ── INTRO: lines slide out left/right on scroll ────────────────────────
const introOffsets = computed(() => {
  if (!secIntro.value) return [0, 0, 0]
  const top   = secIntro.value.offsetTop
  const h     = secIntro.value.offsetHeight - window.innerHeight
  const raw   = (scrollY.value - top) / h
  const t     = Math.max(0, Math.min(1, raw))
  const maxPx = window.innerWidth * 0.55
  // odd lines go left, even go right — scrubs both ways
  return [
    -t * maxPx,        // left
     t * maxPx,        // right
    -t * maxPx * 0.8,  // left (slightly slower)
  ]
})
const introOpacity = computed(() => {
  if (!secIntro.value) return 1
  const top = secIntro.value.offsetTop
  const h   = secIntro.value.offsetHeight - window.innerHeight
  const t   = Math.max(0, Math.min(1, (scrollY.value - top) / h))
  if (t < 0.02) return t / 0.02
  return 1
})
const introBlur = computed(() => {
  if (!secIntro.value) return 0
  const top = secIntro.value.offsetTop
  const h   = secIntro.value.offsetHeight - window.innerHeight
  const t   = Math.max(0, Math.min(1, (scrollY.value - top) / h))
  return t > 0.5 ? (t - 0.5) / 0.5 * 12 : 0
})
const introCueOpacity = computed(() => {
  if (!secIntro.value) return 1
  const top = secIntro.value.offsetTop
  return Math.max(0, 1 - Math.max(0, scrollY.value - top) / 200)
})

// ── SPEC: down arrow opacity ──────────────────────────────────────────
const specArrowOpacity = computed(() => {
  if (!secSpec.value) return 0
  const top = secSpec.value.offsetTop
  const t   = Math.max(0, Math.min(1, (scrollY.value - top + 300) / 300))
  return t
})

// ── Scroll to section ─────────────────────────────────────────────────
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ── Reveal ─────────────────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
    })
  }, { threshold: 0.08 })
  document.querySelectorAll('.reveal-up').forEach(el => obs.observe(el))
}

// ── Lottie ─────────────────────────────────────────────────────────────
function initLottie() {
  const el = document.getElementById('lottie-contact')
  if (el) lottie.loadAnimation({
    container: el, renderer: 'svg', loop: true, autoplay: true,
    path: 'https://res.cloudinary.com/dnacoymkh/raw/upload/v1772692529/email_adxthp.json'
  })
}

// ── Modals ─────────────────────────────────────────────────────────────
const activeProject = ref(null)
const activeCert    = ref(null)
const certIdx       = ref(0)
const hoverProject  = ref(null)
function openProject(p) { activeProject.value = p }
function openCert(c)    { activeCert.value = c; certIdx.value = 0 }

// ── Contact ────────────────────────────────────────────────────────────
const form    = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const toast   = reactive({ show: false, type: 'success', title: '', text: '' })

function showToast(type, title, text) {
  Object.assign(toast, { show: true, type, title, text })
  setTimeout(() => { toast.show = false }, 4000)
}
async function sendMessage() {
  if (document.getElementById('hp')?.value) return
  if (!form.name || !form.email || !form.message) return
  sending.value = true
  try {
    await emailjs.send('service_qg8j9nh', 'template_j9ivxnn', {
      from_name: form.name, reply_to: form.email, message: form.message
    }, 'UrpG9fqigxq0B2m7k')
    showToast('success', 'Sent!', "I'll get back to you soon.")
    Object.assign(form, { name: '', email: '', message: '' })
  } catch {
    showToast('error', 'Failed', 'Please try again.')
  } finally { sending.value = false }
}

// ── Static data ────────────────────────────────────────────────────────
const currentYear = new Date().getFullYear()
const stats = [
  { value: '11+', label: 'Projects' },
  { value: '6',   label: 'Certificates' },
  { value: '2yr', label: 'Experience' }
]
</script>

<style>
/* ─── CURSOR ──────────────────────────────────────────────────────── */
.cursor {
  position: fixed;
  width: 36px; height: 36px;
  border: 1px solid rgba(232,229,223,0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%,-50%);
  transition: width .2s, height .2s, border-color .2s;
}
.cursor.hover {
  width: 60px; height: 60px;
  border-color: var(--accent);
}
.cursor-dot {
  position: fixed;
  width: 5px; height: 5px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%,-50%);
}

/* ─── LOADER ──────────────────────────────────────────────────────── */
.loader {
  position: fixed; inset: 0; z-index: 9000;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
}
.loader-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: rgba(232,229,223,0.08);
}
.loader-bar-fill {
  height: 100%;
  background: var(--accent);
  transition: width .06s linear;
}
.loader-body {
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
}
.loader-label {
  font-size: 0.6rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: rgba(232,229,223,0.35);
}
.loader-pct {
  font-family: var(--serif);
  font-size: clamp(5rem, 18vw, 12rem);
  font-weight: 400;
  color: var(--text);
  line-height: 1;
  letter-spacing: -4px;
}
.loader-pct span { font-size: 0.35em; color: var(--accent); letter-spacing: 0; }
.loader-out-leave-active { transition: opacity .5s ease; }
.loader-out-leave-to { opacity: 0; }

/* ─── TOP BAR ─────────────────────────────────────────────────────── */
.topbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 800;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.2rem 3.5%;
  color: rgba(232,229,223,0.55);
  font-size: 0.62rem;
  letter-spacing: 2px;
  mix-blend-mode: difference;
}
.topbar-center { display: flex; gap: 2.4rem; }
.topbar-center a {
  cursor: none;
  letter-spacing: 2px;
  text-decoration: none;
  color: inherit;
  transition: color .2s;
}
.topbar-center a:hover { color: var(--accent); }
.topbar-right {
  background: none; border: none; color: inherit;
  cursor: none; font-size: 0.62rem; letter-spacing: 2px;
}

/* ─── HERO ─────────────────────────────────────────────────────────── */
.sec-hero {
  height: 250vh;
  position: relative;
}
.hero-sticky {
  position: sticky; top: 0;
  height: 100vh;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.hero-letters {
  display: flex; align-items: baseline; gap: 0.02em;
  will-change: transform;
  user-select: none;
}
.hero-f, .hero-s {
  font-family: var(--serif);
  font-size: clamp(14rem, 36vw, 28rem);
  font-weight: 400;
  color: var(--text);
  line-height: 0.85;
  display: block;
  will-change: transform;
}
.hero-dot {
  font-family: var(--serif);
  font-size: clamp(10rem, 20vw, 16rem);
  color: var(--accent);
  line-height: 1.1;
  margin: 0 -0.05em;
  align-self: flex-end;
}
.hero-cue {
  position: absolute; bottom: 8%;
  left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-size: 0.58rem; letter-spacing: 5px; text-transform: uppercase;
  color: rgba(232,229,223,0.35);
}

/* Mouse scroll cue */
.cue-mouse {
  width: 20px; height: 34px;
  border: 1px solid rgba(232,229,223,0.3);
  border-radius: 20px;
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 5px;
}
.cue-dot {
  width: 4px; height: 4px;
  background: var(--accent);
  border-radius: 50%;
  animation: cScroll 1.8s ease-in-out infinite;
}
@keyframes cScroll {
  0% { transform: translateY(0); opacity: 1; }
  75% { transform: translateY(14px); opacity: 0; }
  100% { transform: translateY(0); opacity: 0; }
}

/* ─── INTRO ────────────────────────────────────────────────────────── */
.sec-intro {
  height: 400vh;
  position: relative;
}
.intro-sticky {
  position: sticky; top: 0;
  height: 100vh;
  display: flex; align-items: center;
  padding: 0 5%;
  overflow: hidden;
}
.intro-lines { width: 100%; }
.intro-line {
  display: flex; align-items: center; gap: 0.4em;
  will-change: transform;
  overflow: hidden;
}
.intro-line span {
  font-family: var(--serif);
  font-size: clamp(3.5rem, 9vw, 8.5rem);
  font-weight: 400;
  color: var(--text);
  line-height: 1.1;
  white-space: nowrap;
}
.intro-accent { color: var(--accent) !important; }
.intro-line-2 { padding-left: 8%; }
.intro-photo {
  display: inline-flex;
  width: clamp(60px, 7vw, 90px); height: clamp(60px, 7vw, 90px);
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.intro-photo img { width: 100%; height: 100%; object-fit: cover; }
.intro-cue {
  position: absolute; bottom: 8%;
  left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-size: 0.58rem; letter-spacing: 5px; text-transform: uppercase;
  color: rgba(232,229,223,0.35);
}

/* ─── SPECIALIZATION ───────────────────────────────────────────────── */
.sec-spec {
  min-height: 100vh;
  background: var(--bg-light);
  display: flex; align-items: center;
  padding: 10rem 5%;
  position: relative;
}
.spec-sticky {
  width: 100%; max-width: 1000px;
}
.spec-tag {
  font-size: 0.6rem; letter-spacing: 6px; text-transform: uppercase;
  color: rgba(26,26,26,0.4);
  margin-bottom: 2rem;
}
.spec-heading {
  font-family: var(--serif);
  font-size: clamp(3rem, 7.5vw, 7rem);
  font-weight: 400;
  color: var(--text-dark);
  line-height: 1.1;
  letter-spacing: -2px;
}
.spec-heading em { font-style: italic; color: #555; }
.spec-arrow-circle {
  position: absolute;
  bottom: 10%; right: 8%;
  width: clamp(70px, 10vw, 110px); height: clamp(70px, 10vw, 110px);
  transition: opacity .4s;
}
.spec-arrow-circle svg { width: 100%; height: 100%; }

/* ─── ABOUT ────────────────────────────────────────────────────────── */
.sec-about {
  padding: 10rem 5%;
  background: var(--bg);
}
.about-inner {
  max-width: 1100px; margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 6rem;
  align-items: start;
}
.about-tag {
  font-size: 0.6rem; letter-spacing: 6px; text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem; display: block;
}
.about-photo {
  aspect-ratio: 3/4;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
}
.about-photo img { width: 100%; height: 100%; object-fit: cover; }
.about-right h2 {
  font-family: var(--serif);
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  font-weight: 400;
  color: var(--text);
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 1.8rem;
}
.about-bio {
  font-size: 0.97rem; line-height: 1.85;
  color: rgba(232,229,223,0.55);
  margin-bottom: 1.8rem;
  max-width: 560px;
}
.about-bio strong { color: var(--text); font-weight: 600; }
blockquote {
  border-left: 2px solid var(--accent);
  padding: 0.5rem 1.2rem;
  font-style: italic;
  color: rgba(232,229,223,0.45);
  font-size: 0.95rem;
  margin-bottom: 2.5rem;
}
.about-stats { display: flex; gap: 3.5rem; }
.astat-n {
  font-family: var(--serif);
  font-size: 2.6rem;
  font-weight: 400;
  color: var(--text);
  letter-spacing: -2px;
  line-height: 1;
}
.astat-l {
  font-size: 0.58rem; letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(232,229,223,0.35);
  margin-top: 0.3rem;
}

/* ─── WORK ─────────────────────────────────────────────────────────── */
.sec-work { padding: 10rem 5%; background: var(--bg-light); }
.work-inner { max-width: 1100px; margin: 0 auto; }
.work-header { margin-bottom: 4rem; }
.work-tag {
  font-size: 0.6rem; letter-spacing: 6px; text-transform: uppercase;
  color: rgba(26,26,26,0.4);
  margin-bottom: 1rem; display: block;
}
.work-title {
  font-family: var(--serif);
  font-size: clamp(2.5rem, 6vw, 5.5rem);
  font-weight: 400;
  color: var(--text-dark);
  letter-spacing: -2px;
}

/* Editorial list */
.work-list { border-top: 1px solid rgba(26,26,26,0.12); }
.work-item {
  display: grid;
  grid-template-columns: 50px 1fr auto 30px;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(26,26,26,0.12);
  cursor: none;
  transition: background .2s;
}
.work-item:hover { padding-left: 1rem; }
.wi-num  { font-size: 0.7rem; color: rgba(26,26,26,0.3); letter-spacing: 2px; }
.wi-title{ font-family: var(--serif); font-size: clamp(1.1rem, 2.5vw, 1.8rem); color: var(--text-dark); font-weight: 400; }
.wi-cat  { font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase; color: rgba(26,26,26,0.4); }
.wi-arrow{ font-size: 1.2rem; color: rgba(26,26,26,0.3); transition: transform .2s; }
.work-item:hover .wi-arrow { transform: translateX(6px); color: var(--text-dark); }

/* Hover image preview */
.work-preview {
  position: fixed;
  width: 220px; height: 150px;
  border-radius: 10px;
  overflow: hidden;
  pointer-events: none;
  z-index: 700;
  opacity: 0;
  transform: scale(0.9);
  transition: opacity .25s, transform .25s;
}
.work-preview.active { opacity: 1; transform: scale(1); }
.work-preview img { width: 100%; height: 100%; object-fit: cover; }

/* ─── CERTS ────────────────────────────────────────────────────────── */
.sec-certs { padding: 10rem 5%; background: var(--bg); }
.certs-inner { max-width: 1100px; margin: 0 auto; }
.sec-certs .work-tag { color: var(--accent); margin-bottom: 3rem; }
.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
.cert-card {
  background: rgba(232,229,223,0.03);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  cursor: none;
  transition: transform .3s, border-color .3s;
}
.cert-card:hover { transform: translateY(-5px); border-color: rgba(var(--accent-rgb),.4); }
.cc-img { aspect-ratio: 4/3; position: relative; overflow: hidden; }
.cc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.cert-card:hover .cc-img img { transform: scale(1.04); }
.cc-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 1.3rem;
  opacity: 0; transition: opacity .3s;
}
.cert-card:hover .cc-overlay { opacity: 1; }
.cc-info { padding: 1.1rem 1.2rem 1.3rem; }
.cc-info h3 { font-size: 0.95rem; color: var(--text); margin-bottom: 0.3rem; }
.cc-info p  { font-size: 0.75rem; color: rgba(232,229,223,0.45); margin-bottom: 0.3rem; }
.cc-info span { font-size: 0.65rem; color: var(--accent); }

/* ─── TECH MARQUEE ─────────────────────────────────────────────────── */
.sec-tech { padding: 8rem 0; background: var(--bg-light); overflow: hidden; }
.tech-inner { }
.sec-tech .work-tag { padding: 0 5%; margin-bottom: 3rem; color: rgba(26,26,26,0.4); }
.tech-marquee-wrap { display: flex; flex-direction: column; gap: 1rem; }
.tech-marquee { overflow: hidden; width: 100%; }
.tech-track {
  display: flex; gap: 1rem; width: max-content;
  animation: marquee 28s linear infinite;
}
.tech-marquee-rev .tech-track { animation-direction: reverse; }
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.tech-chip {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.7rem 1.4rem;
  background: rgba(26,26,26,0.06);
  border: 1px solid rgba(26,26,26,0.1);
  border-radius: 50px;
  white-space: nowrap;
  flex-shrink: 0;
}
.tech-chip img { width: 24px; height: 24px; object-fit: contain; }
.tech-chip span { font-size: 0.78rem; color: var(--text-dark); }

/* ─── CONTACT ──────────────────────────────────────────────────────── */
.sec-contact { padding: 10rem 5%; background: var(--bg); }
.contact-inner { max-width: 1000px; margin: 0 auto; }
.sec-contact .work-tag { color: var(--accent); margin-bottom: 1.5rem; display: block; }
.contact-heading {
  font-family: var(--serif);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 400;
  color: var(--text);
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 4rem;
}
.contact-heading em { font-style: italic; color: var(--accent); }
.contact-grid {
  display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem;
}
.contact-lottie { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
#lottie-contact { width: 100%; max-width: 220px; height: 200px; }
.contact-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
.contact-chips span {
  font-size: 0.7rem; padding: 0.3rem 0.85rem;
  border: 1px solid var(--border);
  border-radius: 50px; color: var(--accent);
  display: flex; align-items: center; gap: 0.4rem;
}

.contact-form { display: flex; flex-direction: column; gap: 1rem; }
.contact-form input,
.contact-form textarea {
  width: 100%; padding: 0.85rem 1rem;
  background: rgba(232,229,223,0.04);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  font-family: inherit; font-size: 0.9rem;
  outline: none; transition: border-color .3s;
  cursor: none;
}
.contact-form input:focus,
.contact-form textarea:focus { border-color: var(--accent); }
.contact-form input::placeholder,
.contact-form textarea::placeholder { color: rgba(232,229,223,0.25); }
.contact-form textarea { resize: vertical; min-height: 130px; }
.contact-form button {
  padding: 0.9rem;
  background: var(--accent); color: #fff;
  border: none; border-radius: 10px;
  font-size: 0.9rem; font-weight: 600; cursor: none;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  transition: all .3s;
}
.contact-form button:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-2px); }
.contact-form button:disabled { opacity: .6; cursor: not-allowed; }

/* ─── FOOTER ───────────────────────────────────────────────────────── */
.site-footer {
  padding: 2rem 5%;
  border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.7rem;
  color: rgba(232,229,223,0.3);
  letter-spacing: 1px;
}

/* ─── MODALS ───────────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,.8);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 2rem;
}
.modal-proj {
  display: flex;
  background: #111;
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  max-height: 88vh;
  width: 100%; max-width: 860px;
}
.mclose {
  position: absolute; top: 1.2rem; right: 1.2rem; z-index: 10;
  background: rgba(232,229,223,.08);
  border: none; color: var(--text);
  width: 36px; height: 36px; border-radius: 50%;
  cursor: none; font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center;
  transition: all .3s;
}
.mclose:hover { background: var(--accent); }
.mp-side {
  width: 280px; flex-shrink: 0;
  padding: 2.5rem 2rem;
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 1rem;
  position: relative;
}
.mp-side h2 { font-family: var(--serif); font-size: 1.5rem; font-weight: 400; }
.mp-side p  { font-size: 0.82rem; line-height: 1.7; color: rgba(232,229,223,.5); }
.mp-role small { font-size: 0.58rem; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); display: block; margin-bottom: .2rem; }
.mp-role span  { font-size: 0.85rem; color: rgba(232,229,223,.65); }
.mp-badges { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: auto; }
.mp-badges span { font-size: .62rem; padding: .2rem .7rem; border: 1px solid var(--border); border-radius: 20px; color: var(--accent); }
.mp-imgs { flex: 1; overflow-y: auto; padding: 2rem; display: flex; flex-direction: column; gap: 1rem; }
.mp-imgs img { width: 100%; border-radius: 10px; display: block; }
.modal-cert {
  position: relative;
  background: #111;
  border: 1px solid var(--border);
  border-radius: 20px; overflow: hidden;
  max-width: 680px; width: 100%;
  padding: 2rem;
}
.cert-nav { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.cert-nav button { background: none; border: 1px solid var(--border); color: var(--text); width: 32px; height: 32px; border-radius: 50%; cursor: none; transition: all .3s; }
.cert-nav button:disabled { opacity: .3; }
.cert-nav span { font-size: .8rem; color: rgba(232,229,223,.4); }
.modal-cert img { width: 100%; border-radius: 10px; }
.cert-modal-info { margin-top: 1.2rem; }
.cert-modal-info h3 { font-size: 1rem; margin-bottom: .3rem; }
.cert-modal-info p  { font-size: .8rem; color: rgba(232,229,223,.45); }
.mfade-enter-active, .mfade-leave-active { transition: opacity .3s; }
.mfade-enter-from,   .mfade-leave-to     { opacity: 0; }

/* ─── TOAST ────────────────────────────────────────────────────────── */
.toast {
  position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
  background: #161616; border: 1px solid var(--border);
  border-radius: 12px; padding: 1rem 1.3rem;
  display: flex; align-items: flex-start; gap: .8rem;
  max-width: 320px;
  box-shadow: 0 10px 40px rgba(0,0,0,.5);
}
.toast.success { border-left: 3px solid var(--accent); }
.toast.error   { border-left: 3px solid #e55; }
.toast i:first-child { font-size: 1.2rem; margin-top: 2px; }
.toast.success i:first-child { color: var(--accent); }
.toast.error   i:first-child { color: #e55; }
.toast strong { font-size: .88rem; display: block; margin-bottom: .2rem; }
.toast p { font-size: .78rem; color: rgba(232,229,223,.5); margin: 0; }
.toast-enter-active, .toast-leave-active { transition: all .3s; }
.toast-enter-from,   .toast-leave-to     { opacity: 0; transform: translateX(20px); }

/* ─── RESPONSIVE ───────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .about-inner { grid-template-columns: 1fr; gap: 3rem; }
  .about-photo { max-width: 260px; }
  .contact-grid { grid-template-columns: 1fr; }
  .modal-proj { flex-direction: column; }
  .mp-side { width: 100%; border-right: none; border-bottom: 1px solid var(--border); }
  .work-item { grid-template-columns: 36px 1fr 30px; }
  .wi-cat { display: none; }
  .hero-f, .hero-s { font-size: clamp(8rem, 24vw, 20rem); }
  .topbar-center { display: none; }
}
</style>