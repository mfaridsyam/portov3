<template>
  <!-- Custom Cursor -->
  <div class="cur-ring" :class="{ hover: curHover }" :style="{ left: cur.x+'px', top: cur.y+'px' }"></div>
  <div class="cur-dot" :style="{ left: cur.x+'px', top: cur.y+'px' }"></div>

  <!-- Loading Screen -->
  <Transition name="ld-out">
    <div v-if="phase==='loading'" class="loader">
      <div class="ld-bar"><div class="ld-fill" :style="{ width: loadProgress + '%' }"></div></div>
      <div class="ld-body">
        <p class="ld-label">LOADING ASSETS...</p>
        <div class="ld-name">MFaridS</div>
        <p class="ld-sub">UI/UX Designer &amp; Frontend Developer</p>
      </div>
    </div>
  </Transition>

  <div v-if="phase!=='loading'" class="site" :class="{ 'site-visible': phase==='site' }">

    <!-- Fixed Header -->
    <header class="bar" :class="{ 'bar-light': barLight }">
      <span class="bar-l">MFaridS – {{ yr }} ©</span>
      <button class="bar-music" @click="toggleMusic">
        <span class="bm-dot" :class="{ on: musicPlaying }"></span>
        <span>BOO – H3ADBAND</span>
        <span v-if="musicPlaying" class="bm-bars"><i></i><i></i><i></i></span>
      </button>
      <audio ref="audioEl" :src="booSrc" preload="auto" loop></audio>
    </header>

    <!-- ═══ SECTION 1: HERO F.S ═══ -->
    <section class="s-hero">
      <div class="hero-pin">
        <div class="hero-letters" :style="{ opacity: hOp }">
          <span class="hl-f" :style="{ transform:'translateX('+hFx+'px)' }">F</span>
          <span class="hl-dot" :style="{ transform:'scale('+(1+hScale*.06)+')' }"></span>
          <span class="hl-s" :style="{ transform:'translateX('+hSx+'px)' }">S</span>
        </div>
        <div class="cue" :style="{ opacity: heroCue }">
          <div class="cue-m"><div class="cue-d"></div></div>
          <span>SCROLL DOWN</span>
        </div>
      </div>
    </section>

    <!-- ═══ SECTION 2: INTRO "Let Me Introduce My Self As [Role]" ═══ -->
    <section class="s-intro">
      <div class="intro-pin">
        <div class="intro-wrap" :style="{ opacity: introOp }">
          <div class="iline" :style="{ transform:'translateX('+iOff[0]+'px)', filter:'blur('+iBlur+'px)' }">
            <span class="itext">Let Me Introduce</span>
          </div>
          <div class="iline" :style="{ transform:'translateX('+iOff[1]+'px)', filter:'blur('+iBlur+'px)' }">
            <span class="itext">My Self <span class="ibox"></span></span>
          </div>
          <div class="iline role-line" :style="{ transform:'translateX('+iOff[2]+'px)', filter:'blur('+iBlur+'px)' }">
            <span class="itext">As&nbsp;</span>
            <span class="role-slot">
              <span class="role-word" :class="{ 'role-visible': roleVisible }">{{ displayRole }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SECTION 3: ABOUT (sticky scroll - photo → who i am → name → bio → quote) ═══ -->
    <section class="s-about" ref="refAbout">
      <div class="about-track">
        <div class="about-pin">

          <!-- Layer 1: Photo (appears after intro slides away) -->
          <div class="about-layer" :style="{ opacity: aPhoto, transform:'scale('+(0.88+aPhoto*0.12)+')' }">
            <div class="photo-frame">
              <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1773393847/IMG_5533_vo5k7w.jpg" alt="Farid Syam" />
            </div>
          </div>

          <!-- Layer 2: WHO I AM? (centered, then shrinks to label above name) -->
          <div class="about-layer who-layer">
            <!-- Big centered WHO I AM? (fades in while centered, then transitions to small label) -->
            <div class="who-center" :style="{ opacity: whoCenter }">
              <p class="who-text">WHO I AM?</p>
            </div>
          </div>

          <!-- Layer 3: Name only (WHO I AM small label + big name) -->
          <div class="about-layer" :style="{ opacity: aName }">
            <div class="name-block">
              <p class="name-tag">WHO I AM</p>
              <h2 class="big-name">Muhammad Farid Syam</h2>
            </div>
          </div>

          <!-- Layer 4: Bio text reveal -->
          <div class="about-layer" :style="{ opacity: aBio }">
            <div class="bio-block">
              <h3 class="mid-name">Muhammad Farid Syam</h3>
              <p class="bio-p">
                <span v-for="(w,i) in bioWords" :key="i" class="w" :style="{ color: bioColor(i) }">{{ w }}{{ i<bioWords.length-1?' ':'' }}</span>
              </p>
            </div>
          </div>

          <!-- Layer 5: Quote -->
          <div class="about-layer" :style="{ opacity: aQuote }">
            <div class="quote-block">
              <p class="quote-p">
                <span v-for="(w,i) in quoteWords" :key="i" class="w" :style="{ color: quoteColor(i) }">{{ w }}{{ i<quoteWords.length-1?' ':'' }}</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ SECTION 4: PROJECTS (light bg) ═══ -->
    <section class="s-work" ref="refWork">
      <div class="inner">
        <div class="sec-head">
          <span class="tag tag-dk" :class="anim('work',0)">SELECTED WORK</span>
          <h2 class="h-dk" :class="anim('work',1)">Projects</h2>
        </div>
        <div class="row-list">
          <div v-for="(p,i) in projects" :key="p.title" class="row" :class="anim('work',i+2)" @click="openProj(p)" @mouseenter="hovP=p" @mouseleave="hovP=null">
            <span class="rn">{{ String(i+1).padStart(2,'0') }}</span>
            <span class="rt">{{ p.title }}</span>
            <span class="rc">{{ p.role }}</span>
            <span class="ra">—</span>
          </div>
        </div>
      </div>
      <div class="img-follow" :class="{ on: hovP }" :style="{ left: cur.x+20+'px', top: cur.y-60+'px' }">
        <img v-if="hovP" :src="hovP.image" />
      </div>
    </section>

    <!-- ═══ SECTION 5: CERTIFICATES (dark bg) ═══ -->
    <section class="s-certs" ref="refCerts">
      <div class="inner">
        <div class="sec-head">
          <h2 :class="anim('certs',0)">Certificates</h2>
        </div>
        <div class="row-list">
          <div v-for="(c,i) in certificates" :key="c.title" class="row row-d" :class="anim('certs',i+1)" @click="openCert(c)" @mouseenter="hovC=c" @mouseleave="hovC=null">
            <span class="rt">{{ c.title }}</span>
            <span class="rc">{{ c.issuer }}</span>
            <span class="rd">{{ c.date }}</span>
            <span class="ra">—</span>
          </div>
        </div>
      </div>
      <div class="img-follow" :class="{ on: hovC }" :style="{ left: cur.x+20+'px', top: cur.y-60+'px' }">
        <img v-if="hovC" :src="hovC.images[0]" />
      </div>
    </section>

    <!-- ═══ SECTION 6: TOOLS & SKILLS (light bg, 6+6 grid) ═══ -->
    <section class="s-tech" ref="refTech">
      <div class="inner">
        <div class="sec-head">
          <span class="tag tag-dk" :class="anim('tech',0)">TECH STACK</span>
          <h2 class="h-dk" :class="anim('tech',1)">Tools &amp; Skills</h2>
        </div>
        <div class="tech-grid">
          <div v-for="(t,i) in techStack" :key="t.name" class="tc" :class="anim('tech',i+2)">
            <img :src="t.iconLight" :alt="t.name" />
            <span class="tc-n">{{ t.name }}</span>
            <span class="tc-c">{{ t.category }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SECTION 7: CONTACT TEASER — "Don't Be Shy, Make The First Move." ═══ -->
    <section class="s-phrase" ref="refPhrase">
      <div class="phrase-inner">
        <p class="ph-sm" :class="anim('phrase',0)">Dont Be Shy,</p>
        <h2 class="ph-big" :class="anim('phrase',1)">Make The First Move.</h2>
      </div>
    </section>

    <!-- ═══ SECTION 8: SUMMARY / CV ═══ -->
    <section class="s-summary" ref="refSummary">
      <div class="inner">
        <div class="sum-header" :class="anim('summary',0)">
          <p class="sum-label">Summary</p>
          <h2 class="sum-name">Muhammad Farid Syam</h2>
          <p class="sum-role">— UI/UX Designer &amp; Frontend Developer</p>
          <p class="sum-bio-txt">I'm a tech-savvy designer who loves building things for the web. With a solid foundation in Informatics Engineering, I spend my time mastering Figma and JavaScript. Currently, I'm diving deeper into the Vue.js ecosystem to build even better user experiences.</p>
        </div>
        <div class="sum-cols">
          <div class="sc" :class="anim('summary',1)">
            <h3 class="sc-h">Education</h3>
            <div class="sc-items">
              <div class="si">
                <div class="si-t">Informatics Engineering (Bachelor)</div>
                <div class="si-d"><span>Universitas Mikroskil</span><span class="dot">·</span><span>Medan, Indonesia</span><span class="dot">·</span><span>3.69/4.00</span></div>
              </div>
            </div>
          </div>
          <div class="sc" :class="anim('summary',2)">
            <h3 class="sc-h">Experiences</h3>
            <div class="sc-items">
              <div v-for="e in experiences" :key="e.name" class="si">
                <div class="si-t">{{ e.name }}</div>
                <div class="si-d"><span>{{ e.role }}</span><span class="dot">·</span><span>{{ e.period }}</span></div>
              </div>
            </div>
          </div>
          <div class="sc" :class="anim('summary',3)">
            <h3 class="sc-h">Selected Projects</h3>
            <div class="sc-items">
              <div v-for="p in projects.slice(0,5)" :key="p.title" class="si si-link" @click="openProj(p)">
                <div class="si-t">{{ p.title }} <i class="fas fa-arrow-up-right-from-square"></i></div>
                <div class="si-d"><span>{{ p.role }}</span></div>
              </div>
            </div>
          </div>
          <div class="sc" :class="anim('summary',4)">
            <h3 class="sc-h">Selected Activities</h3>
            <div class="sc-items">
              <div v-for="c in certificates.slice(0,4)" :key="c.title" class="si si-link" @click="openCert(c)">
                <div class="si-t">{{ c.title }} <i class="fas fa-arrow-up-right-from-square"></i></div>
                <div class="si-d"><span>{{ c.issuer }}</span><span class="dot">·</span><span>{{ c.date }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SECTION 9: CONTACT FORM ═══ -->
    <section class="s-contact" ref="refContact">
      <div class="contact-wrap">
        <div class="contact-hd" :class="anim('contact',0)">
          <span class="tag" style="color:var(--acc)">GET IN TOUCH</span>
          <h2 class="contact-title">Let's Work<br><em>Together.</em></h2>
          <p class="contact-sub">Open for freelance projects, collaborations, or a friendly chat about design and code.</p>
        </div>
        <div class="contact-body">
          <div class="contact-info" :class="anim('contact',1)">
            <div class="ci-avail"><span class="ci-dot"></span>Available for work</div>
            <div class="ci-links">
              <a href="https://linkedin.com/in/faridsyam" target="_blank" class="ci-lnk"><span>LinkedIn</span><span>↗</span></a>
              <a href="mailto:mfaridsyam@email.com" class="ci-lnk"><span>mfaridsyam@email.com</span><span>↗</span></a>
              <a href="https://github.com/faridsyam" target="_blank" class="ci-lnk"><span>GitHub</span><span>↗</span></a>
            </div>
            <div class="ci-tags"><span>UI/UX Design</span><span>Frontend Dev</span><span>Figma</span><span>Vue.js</span></div>
          </div>
          <form class="contact-form" :class="anim('contact',2)" @submit.prevent="send" novalidate>
            <input type="text" id="hp" tabindex="-1" style="position:absolute;left:-9999px;opacity:0" />
            <div class="cf-row">
              <div class="cf-f"><label>Name</label><input v-model="form.name" placeholder="Muhammad Farid Syam" :disabled="sending" /></div>
              <div class="cf-f"><label>Email</label><input v-model="form.email" type="email" placeholder="hello@example.com" :disabled="sending" /></div>
            </div>
            <div class="cf-f"><label>Message</label><textarea v-model="form.message" placeholder="Tell me about your project..." rows="5" :disabled="sending"></textarea></div>
            <button type="submit" :disabled="sending" class="cf-btn">
              <span>{{ sending ? 'Sending…' : 'Send Message' }}</span>
              <i :class="sending ? 'fas fa-spinner fa-spin' : 'fas fa-arrow-right'"></i>
            </button>
          </form>
        </div>
      </div>
    </section>

    <footer class="foot">
      <div class="foot-in">
        <span>© {{ yr }} Muhammad Farid Syam</span>
        <span>Made with <span style="color:#e55">♥</span> in Makassar</span>
      </div>
    </footer>

    <!-- Modals -->
    <Teleport to="body">
      <Transition name="mfade">
        <div v-if="actProj" class="overlay" @click.self="actProj=null">
          <div class="mbox proj-box">
            <button class="mclose" @click="actProj=null"><i class="fas fa-times"></i></button>
            <div class="proj-info">
              <h2>{{ actProj.title }}</h2>
              <p>{{ actProj.desc }}</p>
              <div class="proj-role"><small>ROLE</small><span>{{ actProj.role }}</span></div>
              <div class="proj-tags"><span v-for="b in actProj.badges" :key="b">{{ b }}</span></div>
            </div>
            <div class="proj-imgs"><img v-for="(img,i) in actProj.images" :key="i" :src="img" loading="lazy" /></div>
          </div>
        </div>
      </Transition>
      <Transition name="mfade">
        <div v-if="actCert" class="overlay" @click.self="actCert=null">
          <div class="mbox cert-box">
            <button class="mclose" @click="actCert=null"><i class="fas fa-times"></i></button>
            <div v-if="actCert.images.length>1" class="cert-nav">
              <button @click="ci=Math.max(0,ci-1)" :disabled="ci===0"><i class="fas fa-chevron-left"></i></button>
              <span>{{ ci+1 }} / {{ actCert.images.length }}</span>
              <button @click="ci=Math.min(actCert.images.length-1,ci+1)" :disabled="ci===actCert.images.length-1"><i class="fas fa-chevron-right"></i></button>
            </div>
            <img :src="actCert.images[ci]" />
            <div class="cert-info"><h3>{{ actCert.title }}</h3><p>{{ actCert.issuer }}</p><span>{{ actCert.date }}</span></div>
          </div>
        </div>
      </Transition>
      <Transition name="toast">
        <div v-if="toast.on" class="toast" :class="toast.t">
          <i :class="toast.t==='ok'?'fas fa-check-circle':'fas fa-times-circle'"></i>
          <div><strong>{{ toast.ttl }}</strong><p>{{ toast.msg }}</p></div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { projects, certificates, techStack, playlist } from '@/data/index.js'
import emailjs from '@emailjs/browser'

const phase = ref('loading')
const yr = new Date().getFullYear()
const loadProgress = ref(0)
let loadInterval = null

// Roles cycling
const roles = ['UI/UX Designer', 'Frontend Developer']
const roleIdx = ref(0)
const displayRole = ref(roles[0])
const roleVisible = ref(true)
let roleTimer = null

function cycleRole() {
  roleVisible.value = false
  setTimeout(() => {
    roleIdx.value = (roleIdx.value + 1) % roles.length
    displayRole.value = roles[roleIdx.value]
    roleVisible.value = true
  }, 400)
}

// Bio & Quote word-reveal
const BIO = `I'm a tech-savvy designer who loves building things for the web. With a solid foundation in Informatics Engineering, I spend my time mastering Figma and JavaScript. Currently, I'm diving deeper into the Vue.js ecosystem to build even better user experiences.`
const QUOTE = `"Design with soul, develop with logic."`
const bioWords = BIO.split(' ')
const quoteWords = QUOTE.split(' ')
const bioP = ref(0)
const quoteP = ref(0)
const barLight = ref(false)

onMounted(async () => {
  const t0 = Date.now(), dur = 3000
  loadInterval = setInterval(() => {
    loadProgress.value = Math.min(100, ((Date.now()-t0)/dur)*100)
    if (loadProgress.value >= 100) {
      clearInterval(loadInterval)
      setTimeout(() => {
        phase.value = 'fading'
        setTimeout(async () => {
          phase.value = 'site'
          await nextTick()
          initObservers()
          roleTimer = setInterval(cycleRole, 2600)
        }, 500)
      }, 200)
    }
  }, 16)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMouse, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onMouse)
  if (roleTimer) clearInterval(roleTimer)
  if (loadInterval) clearInterval(loadInterval)
})

// Custom cursor
const cur = reactive({ x: -200, y: -200 })
const curHover = ref(false)
function onMouse(e) {
  cur.x = e.clientX; cur.y = e.clientY
  const el = document.elementFromPoint(e.clientX, e.clientY)
  curHover.value = !!(el && el.closest('a,button,.row,.ci-lnk'))
}

// Scroll tracking
const scrollY = ref(0)
let musicDone = false
function onScroll() {
  scrollY.value = window.scrollY
  if (!musicDone && scrollY.value > window.innerHeight * .6) { musicDone = true; autoPlay() }
  updateAbout()
  updateBar()
}

function updateBar() {
  const lightSecs = [refWork.value, refTech.value]
  let light = false
  for (const el of lightSecs) {
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.top <= 50 && r.bottom >= 0) { light = true; break }
  }
  barLight.value = light
}

const VH = () => window.innerHeight
const heroLen = () => VH() * 1.3

// ── HERO F.S ──
const hScale = computed(() => Math.min(1, scrollY.value / (heroLen() * .8)))
const hFx = computed(() => -hScale.value * 155)
const hSx = computed(() => hScale.value * 155)
const hOp = computed(() => {
  const t = Math.min(1, scrollY.value / (heroLen() * .65))
  return t > .6 ? 1 - (t - .6) / .4 : 1
})
const heroCue = computed(() => Math.max(0, 1 - scrollY.value / 110))

// ── INTRO ──
const introLen = () => VH() * 3.5

const introOp = computed(() => {
  const start = heroLen() * .5
  const end = heroLen() * .85
  if (scrollY.value < start) return 0
  if (scrollY.value > end) return 1
  return (scrollY.value - start) / (end - start)
})

const iOff = computed(() => {
  const exitStart = heroLen() + introLen() * .55
  const exitEnd = heroLen() + introLen() * .95
  if (scrollY.value < exitStart) return [0, 0, 0]
  const t = Math.min(1, (scrollY.value - exitStart) / (exitEnd - exitStart))
  const m = window.innerWidth * .6
  return [-t * m, t * m, -t * m * .72]
})

const iBlur = computed(() => {
  const exitStart = heroLen() + introLen() * .55
  const exitEnd = heroLen() + introLen() * .95
  if (scrollY.value < exitStart) return 0
  return Math.min(1, (scrollY.value - exitStart) / (exitEnd - exitStart)) * 14
})
const introCue = computed(() => {
  const sh = heroLen() * .82, hi = heroLen() + VH() * .18
  if (scrollY.value < sh || scrollY.value > hi) return 0
  const mid = (sh + hi) / 2
  return scrollY.value < mid ? (scrollY.value - sh) / (mid - sh) : 1 - (scrollY.value - mid) / (hi - mid)
})

// ── ABOUT section (sticky scroll layers) ──
const refAbout = ref(null)
// Photo: appears first, after intro slides away
const aPhoto = ref(0)
// WHO I AM centered: visible while photo exits
const whoCenter = ref(0)
// Name block (WHO I AM small label + big name)
const aName = ref(0)
// Bio text
const aBio = ref(0)
// Quote
const aQuote = ref(0)

function cl(v, a, b) { return Math.min(b, Math.max(a, v)) }
function pr(v, s, e) { return cl((v - s) / (e - s), 0, 1) }

function updateAbout() {
  const el = refAbout.value
  if (!el) return
  const scrolled = -el.getBoundingClientRect().top
  if (scrolled < 0) {
    aPhoto.value = 0; whoCenter.value = 0; aName.value = 0
    aBio.value = 0; aQuote.value = 0
    bioP.value = 0; quoteP.value = 0
    return
  }
  const S = VH()

  // 1. Photo: fades in 0→S*0.8, fades out S*1.0→S*1.5
  if (scrolled < S * .05) aPhoto.value = pr(scrolled, 0, S * .2)
  else if (scrolled < S * 1.4) aPhoto.value = 1
  else aPhoto.value = cl(1 - pr(scrolled, S * 1.4, S * 1.8), 0, 1)

  // 2. WHO I AM? centered: appears S*1.2→S*1.7, fades S*2.2→S*2.7
  if (scrolled < S * 1.2) whoCenter.value = 0
  else if (scrolled < S * 1.7) whoCenter.value = pr(scrolled, S * 1.2, S * 1.7)
  else if (scrolled < S * 2.2) whoCenter.value = 1
  else whoCenter.value = cl(1 - pr(scrolled, S * 2.2, S * 2.7), 0, 1)

  // 3. Name block (WHO I AM small + big name): S*2.5→S*3.0, fades S*3.8→S*4.3
  if (scrolled < S * 2.5) aName.value = 0
  else if (scrolled < S * 3.0) aName.value = pr(scrolled, S * 2.5, S * 3.0)
  else if (scrolled < S * 3.8) aName.value = 1
  else aName.value = cl(1 - pr(scrolled, S * 3.8, S * 4.3), 0, 1)

  // 4. Bio: S*4.0→S*4.5, reveals words, fades S*6.5→S*7.0
  const bioStart = S * 4.0, bioRevEnd = S * 6.5, bioFadeEnd = S * 7.2
  if (scrolled < bioStart) { aBio.value = 0; bioP.value = 0 }
  else if (scrolled <= bioRevEnd) {
    aBio.value = pr(scrolled, bioStart, bioStart + S * .5)
    bioP.value = pr(scrolled, bioStart, bioRevEnd)
  } else {
    aBio.value = cl(1 - pr(scrolled, bioRevEnd, bioFadeEnd), 0, 1)
    bioP.value = 1
  }

  // 5. Quote: S*7.0→S*7.5, reveals words, fades S*9.5→S*10.0
  const qStart = S * 7.0, qRevEnd = S * 9.5, qFadeEnd = S * 10.2
  if (scrolled < qStart) { aQuote.value = 0; quoteP.value = 0 }
  else if (scrolled <= qRevEnd) {
    aQuote.value = pr(scrolled, qStart, qStart + S * .5)
    quoteP.value = pr(scrolled, qStart, qRevEnd)
  } else {
    aQuote.value = cl(1 - pr(scrolled, qRevEnd, qFadeEnd), 0, 1)
    quoteP.value = 1
  }
}

function bioColor(i) {
  return bioP.value >= i / bioWords.length ? '#E8E5DF' : 'rgba(232,229,223,0.12)'
}
function quoteColor(i) {
  return quoteP.value >= i / quoteWords.length ? '#E8E5DF' : 'rgba(232,229,223,0.12)'
}

// ── Section observers for scroll-reveal ──
const refWork = ref(null), refCerts = ref(null), refTech = ref(null)
const refPhrase = ref(null), refSummary = ref(null), refContact = ref(null)
const sVis = reactive({ work: false, certs: false, tech: false, phrase: false, summary: false, contact: false })
const SECS = ['work', 'certs', 'tech', 'phrase', 'summary', 'contact']

function initObservers() {
  const map = { work: refWork, certs: refCerts, tech: refTech, phrase: refPhrase, summary: refSummary, contact: refContact }
  SECS.forEach((k, idx) => {
    const el = map[k]?.value
    if (!el) return
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) sVis[k] = true
        else if (e.boundingClientRect.top > 0) SECS.forEach((s, i) => { if (i >= idx) sVis[s] = false })
      })
    }, { threshold: 0.06 }).observe(el)
  })
}

function anim(sec, idx) {
  return { sr: true, 'sr-in': sVis[sec], [`sr-d${Math.min(idx, 8)}`]: true }
}

// ── Music ──
const audioEl = ref(null)
const musicPlaying = ref(false)
const booSrc = playlist[0].src
function autoPlay() {
  if (!audioEl.value) return
  audioEl.value.volume = 0.6
  audioEl.value.play().then(() => { musicPlaying.value = true }).catch(() => {})
}
function toggleMusic() {
  if (!audioEl.value) return
  if (musicPlaying.value) { audioEl.value.pause(); musicPlaying.value = false }
  else { audioEl.value.volume = 0.6; audioEl.value.play(); musicPlaying.value = true }
}

// ── Modals ──
const actProj = ref(null), actCert = ref(null), ci = ref(0)
const hovP = ref(null), hovC = ref(null)
function openProj(p) { actProj.value = p }
function openCert(c) { actCert.value = c; ci.value = 0 }

// ── Contact form ──
const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const toast = reactive({ on: false, t: 'ok', ttl: '', msg: '' })
function showToast(t, ttl, msg) { Object.assign(toast, { on: true, t, ttl, msg }); setTimeout(() => { toast.on = false }, 4000) }
async function send() {
  if (document.getElementById('hp')?.value) return
  if (!form.name || !form.email || !form.message) return
  sending.value = true
  try {
    await emailjs.send('service_qg8j9nh', 'template_j9ivxnn', { from_name: form.name, reply_to: form.email, message: form.message }, 'UrpG9fqigxq0B2m7k')
    showToast('ok', 'Sent!', "I'll get back to you soon.")
    Object.assign(form, { name: '', email: '', message: '' })
  } catch { showToast('err', 'Failed', 'Please try again.') }
  finally { sending.value = false }
}

const experiences = [
  { name: 'INCIT', role: 'Fullstack Developer', period: 'Dec 2024 – Present' },
  { name: 'Creloka', role: 'Fullstack Developer', period: 'Mar 2022 – Nov 2024' },
  { name: 'Panggilin', role: 'Frontend Developer', period: 'Jun 2021 – Mar 2022' },
]
</script>

<style>
/* ════════════════════════════════
   CSS VARIABLES & RESET
════════════════════════════════ */
:root {
  --bg: #1b1b1b;
  --bgl: #e8e5df;
  --tx: #e8e5df;
  --txd: rgba(232,229,223,.42);
  --txdk: #1a1a1a;
  --acc: #289DF2;
  --bdr: rgba(232,229,223,.09);
  --bdrl: rgba(26,26,26,.12);
  --ser: Georgia,'Times New Roman',serif;
  --san: -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
}
*,*::before,*::after { margin:0; padding:0; box-sizing:border-box }
html { scroll-behavior:auto; overflow-x:hidden }
body { font-family:var(--san); background:var(--bg); color:var(--tx); overflow-x:hidden; cursor:none }
::selection { background:rgba(40,157,242,.18) }
::-webkit-scrollbar { width:2px }
::-webkit-scrollbar-thumb { background:rgba(232,229,223,.1) }

/* ════════════════════════════════
   SCROLL REVEAL UTILITY
════════════════════════════════ */
.sr { opacity:0; transform:translateY(22px); transition:opacity .72s cubic-bezier(.16,1,.3,1),transform .72s cubic-bezier(.16,1,.3,1) }
.sr.sr-in { opacity:1; transform:none }
.sr-d0{transition-delay:0s}.sr-d1{transition-delay:.07s}.sr-d2{transition-delay:.14s}
.sr-d3{transition-delay:.21s}.sr-d4{transition-delay:.27s}.sr-d5{transition-delay:.33s}
.sr-d6{transition-delay:.39s}.sr-d7{transition-delay:.45s}.sr-d8{transition-delay:.51s}

/* ════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════ */
.cur-ring { position:fixed; pointer-events:none; z-index:9998; width:30px; height:30px; border-radius:50%; border:1px solid rgba(232,229,223,.3); transform:translate(-50%,-50%); transition:all .16s }
.cur-ring.hover { width:44px; height:44px; border-color:var(--acc); background:rgba(40,157,242,.05) }
.cur-dot { position:fixed; pointer-events:none; z-index:9999; width:4px; height:4px; border-radius:50%; background:var(--acc); transform:translate(-50%,-50%) }

/* ════════════════════════════════
   LOADING SCREEN
════════════════════════════════ */
.loader { position:fixed; inset:0; z-index:9000; background:#1b1b1b; display:flex; align-items:center; justify-content:center }
.ld-bar { position:absolute; top:0; left:0; right:0; height:2px; background:rgba(232,229,223,.07) }
.ld-fill { height:100%; background:var(--tx); transition:width .05s linear; border-radius:0 2px 2px 0 }
.ld-body { display:flex; flex-direction:column; align-items:center; gap:1rem; text-align:center }
.ld-label { font-size:.52rem; letter-spacing:7px; text-transform:uppercase; color:rgba(232,229,223,.26) }
.ld-name { font-family:var(--san); font-size:clamp(3.5rem,13vw,7.5rem); font-weight:800; letter-spacing:-.03em; color:#e8e5df; line-height:1 }
.ld-sub { font-size:.56rem; letter-spacing:3.5px; color:rgba(232,229,223,.26) }
.ld-out-leave-active { transition:opacity .5s,transform .5s }
.ld-out-leave-to { opacity:0; transform:scale(1.02) }
.site { opacity:0; transition:opacity .6s }
.site-visible { opacity:1 }

/* ════════════════════════════════
   HEADER BAR
════════════════════════════════ */
.bar { position:fixed; top:0; left:0; right:0; z-index:800; display:flex; align-items:center; justify-content:space-between; padding:.9rem 4%; font-size:.6rem; letter-spacing:1.5px; color:rgba(232,229,223,.32); transition:color .35s }
.bar.bar-light { color:rgba(26,26,26,.42) }
.bar.bar-light .bm-dot { background:rgba(26,26,26,.35) !important }
.bar.bar-light .bm-dot.on { background:var(--acc) !important }
.bar-music { display:flex; align-items:center; gap:.45rem; background:none; border:none; color:inherit; font-size:inherit; letter-spacing:inherit; cursor:none; padding:0; font-family:inherit }
.bm-dot { width:7px; height:7px; border-radius:50%; background:rgba(232,229,223,.22); transition:all .3s; flex-shrink:0 }
.bm-dot.on { background:var(--acc) !important; box-shadow:0 0 7px rgba(40,157,242,.5) }
.bm-bars { display:flex; align-items:flex-end; gap:1.5px; height:10px; margin-left:2px }
.bm-bars i { display:block; width:2.5px; background:var(--acc); border-radius:2px; animation:mbar 1s ease-in-out infinite }
.bm-bars i:nth-child(2){animation-delay:.18s}.bm-bars i:nth-child(3){animation-delay:.36s}
@keyframes mbar{0%,100%{height:3px}50%{height:10px}}

/* ════════════════════════════════
   SCROLL CUE (mouse icon)
════════════════════════════════ */
.cue { position:absolute; bottom:7%; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; font-size:.5rem; letter-spacing:5px; color:rgba(232,229,223,.22); pointer-events:none; transition:opacity .4s }
.cue-m { width:17px; height:29px; border:1px solid rgba(232,229,223,.17); border-radius:18px; display:flex; align-items:flex-start; justify-content:center; padding-top:4px }
.cue-d { width:3px; height:3px; background:var(--acc); border-radius:50%; animation:cscr 1.8s ease-in-out infinite }
@keyframes cscr{0%{transform:translateY(0);opacity:1}75%{transform:translateY(11px);opacity:0}100%{transform:translateY(0);opacity:0}}

/* ════════════════════════════════
   SECTION 1 — HERO F.S
════════════════════════════════ */
.s-hero { height:130vh; position:relative }
.hero-pin { position:sticky; top:0; height:100vh; display:flex; align-items:center; justify-content:center; overflow:hidden }
.hero-letters { display:flex; align-items:center; user-select:none }
.hl-f,.hl-s { font-family:var(--ser); font-size:clamp(8rem,26vw,20rem); font-weight:400; color:var(--tx); line-height:.88; will-change:transform; display:inline-block }
.hl-dot { width:clamp(16px,2.8vw,36px); height:clamp(16px,2.8vw,36px); border-radius:50%; background:var(--acc); flex-shrink:0; margin:0 clamp(4px,.8vw,10px); align-self:flex-end; margin-bottom:clamp(10px,2vw,28px); will-change:transform }

/* ════════════════════════════════
   SECTION 2 — INTRO
════════════════════════════════ */
.intro-fixed { display:none }
.s-intro { height:350vh; position:relative }
.intro-pin { position:sticky; top:0; height:100vh; display:flex; align-items:center; justify-content:center; overflow:hidden }
.intro-wrap { width:100%; display:flex; flex-direction:column; align-items:center; padding:0 4%; text-align:center }
.iline { display:flex; align-items:center; justify-content:center; line-height:1.04; will-change:transform }
.role-line { gap:.1em }
.itext { font-family:var(--ser); font-size:clamp(2.8rem,7.5vw,7.5rem); font-weight:400; color:var(--tx); white-space:nowrap }
/* The small square (□) after "My Self" */
.ibox { display:inline-block; width:.65em; height:.65em; background:rgba(232,229,223,.25); border-radius:3px; margin-left:.25em; vertical-align:middle; position:relative; top:-.08em }
/* Role cycling slot */
.role-slot { display:inline-block }
.role-word { font-family:var(--ser); font-size:clamp(2.8rem,7.5vw,7.5rem); font-weight:400; color:var(--acc); white-space:nowrap; display:inline-block; opacity:0; transition:opacity .35s ease }
.role-word.role-visible { opacity:1 }
.role-swap-enter-active,.role-swap-leave-active,.role-swap-enter-from,.role-swap-leave-to { display:none }

/* ════════════════════════════════
   SECTION 3 — ABOUT (sticky scroll)
   about-track height = 1100vh gives ~11 "screens" of scroll
════════════════════════════════ */
.s-about { background:var(--bg); position:relative }
.about-track { height:1100vh; position:relative }
.about-pin { position:sticky; top:0; height:100vh; display:flex; align-items:center; justify-content:center; overflow:hidden }
.about-layer { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; will-change:opacity }

/* WHO I AM? centered */
.who-layer { pointer-events:none }
.who-center { text-align:center }
.who-text { font-family:var(--san); font-size:clamp(2.5rem,8vw,7rem); font-weight:700; letter-spacing:.1em; color:rgba(232,229,223,.18); text-align:center; text-transform:uppercase }

/* Photo */
.photo-frame { width:clamp(200px,28vw,380px); aspect-ratio:3/4; border-radius:18px; overflow:hidden; border:1px solid rgba(232,229,223,.08); will-change:transform }
.photo-frame img { width:100%; height:100%; object-fit:cover }

/* Name block */
.name-block { text-align:center }
.name-tag { font-size:.53rem; letter-spacing:6px; text-transform:uppercase; color:rgba(232,229,223,.26); margin-bottom:.9rem; display:block }
.big-name { font-family:var(--ser); font-size:clamp(3rem,9vw,8rem); font-weight:400; color:var(--tx); letter-spacing:-2px; line-height:1 }

/* Bio block */
.bio-block { max-width:820px; padding:0 5%; text-align:center }
.mid-name { font-family:var(--ser); font-size:clamp(2rem,5vw,4rem); font-weight:400; color:var(--tx); letter-spacing:-1px; margin-bottom:1.4rem }
.bio-p { font-size:clamp(.9rem,1.4vw,1.06rem); line-height:1.9; max-width:660px; margin:0 auto }

/* Quote block */
.quote-block { max-width:980px; padding:0 5%; text-align:center }
.quote-p { font-family:var(--ser); font-size:clamp(1.8rem,4.5vw,4.5rem); font-weight:400; font-style:italic; line-height:1.28; letter-spacing:-.5px }
.w { display:inline; transition:color .28s ease }

/* ════════════════════════════════
   SHARED INNER / SECTION HEAD
════════════════════════════════ */
.inner { max-width:1100px; margin:0 auto; padding:0 5% }
.tag { font-size:.54rem; letter-spacing:6px; text-transform:uppercase; color:rgba(232,229,223,.26); display:block; margin-bottom:.8rem }
.tag-dk { color:rgba(26,26,26,.3) !important }
.sec-head { margin-bottom:2.6rem }
.sec-head h2 { font-family:var(--ser); font-size:clamp(2.2rem,5vw,4.5rem); font-weight:400; color:var(--tx); letter-spacing:-2px }
.h-dk { color:var(--txdk) !important }

/* ════════════════════════════════
   SECTION 4 — PROJECTS (light bg)
════════════════════════════════ */
.s-work { padding:8rem 0 7rem; background:#e8e5df }
.s-work .sec-head h2 { color:var(--txdk) }
.row-list { border-top:1px solid var(--bdrl) }
.row { display:grid; grid-template-columns:42px 1fr auto 20px; align-items:center; gap:1.5rem; padding:1.1rem 0; border-bottom:1px solid var(--bdrl); cursor:none; transition:padding-left .22s }
.row:hover { padding-left:.6rem }
.row-d { grid-template-columns:1fr auto auto 20px }
.rn { font-size:.62rem; color:rgba(26,26,26,.26); letter-spacing:2px }
.rt { font-family:var(--ser); font-size:clamp(.9rem,2vw,1.52rem); color:var(--txdk); font-weight:400 }
.rc { font-size:.58rem; letter-spacing:2px; text-transform:uppercase; color:rgba(26,26,26,.3) }
.rd { font-size:.58rem; letter-spacing:2px; color:rgba(26,26,26,.36); white-space:nowrap }
.ra { font-size:.88rem; color:rgba(26,26,26,.22); transition:transform .2s }
.row:hover .ra { transform:translateX(4px); color:var(--txdk) }
.img-follow { position:fixed; width:185px; height:124px; border-radius:10px; overflow:hidden; pointer-events:none; z-index:700; opacity:0; transform:scale(.9); transition:opacity .2s,transform .2s }
.img-follow.on { opacity:1; transform:scale(1) }
.img-follow img { width:100%; height:100%; object-fit:cover }

/* ════════════════════════════════
   SECTION 5 — CERTIFICATES (dark bg)
════════════════════════════════ */
.s-certs { padding:8rem 0 7rem; background:var(--bg) }
.s-certs .sec-head h2 { color:var(--tx); font-size:clamp(2.5rem,6vw,5rem) }
.s-certs .row-list { border-top-color:var(--bdr) }
.s-certs .row { border-bottom-color:var(--bdr); grid-template-columns:1fr auto auto 24px }
.s-certs .row:hover .ra { color:var(--tx) }
.s-certs .rt { color:var(--tx) }
.s-certs .rc { color:rgba(232,229,223,.27) }
.s-certs .rd { color:rgba(232,229,223,.36) }
.s-certs .ra { color:rgba(232,229,223,.16) }

/* ════════════════════════════════
   SECTION 6 — TOOLS & SKILLS (light bg)
   Desktop: 6 columns × 2 rows = 12 tools
════════════════════════════════ */
.s-tech { background:#e8e5df; min-height:100vh; display:flex; align-items:center; padding:5rem 0 }
/* 6 columns on desktop */
.tech-grid {
  display:grid;
  grid-template-columns:repeat(6,1fr);
  gap:1px;
  background:rgba(26,26,26,.1);
  border:1px solid rgba(26,26,26,.1);
  border-radius:14px;
  overflow:hidden
}
.tc { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.48rem; padding:2.4rem 1rem; background:#e8e5df; transition:background .2s; text-align:center; cursor:default }
.tc:hover { background:#dedad2 }
.tc img { width:36px; height:36px; object-fit:contain }
.tc-n { font-size:.74rem; font-weight:600; color:var(--txdk) }
.tc-c { font-size:.48rem; letter-spacing:2px; text-transform:uppercase; color:rgba(26,26,26,.3) }

/* ════════════════════════════════
   SECTION 7 — PHRASE (dark bg)
   "Don't Be Shy, Make The First Move."
════════════════════════════════ */
.s-phrase { min-height:100vh; background:var(--bg); display:flex; align-items:center }
.phrase-inner { max-width:1100px; margin:0 auto; padding:0 5% }
.ph-sm { font-size:.9rem; color:var(--txd); margin-bottom:.75rem; letter-spacing:1px }
.ph-big { font-family:var(--ser); font-size:clamp(2.5rem,6vw,5.5rem); font-weight:400; color:var(--tx); letter-spacing:-2px; line-height:1.08 }

/* ════════════════════════════════
   SECTION 8 — SUMMARY / CV (dark bg)
════════════════════════════════ */
.s-summary { padding:8rem 0 7rem; background:var(--bg); border-top:1px solid var(--bdr) }
.sum-header { margin-bottom:3.5rem }
.sum-label { font-family:var(--san); font-size:clamp(1.4rem,2.5vw,2rem); font-weight:700; color:var(--tx); text-decoration:underline; text-underline-offset:6px; margin-bottom:1.4rem; display:block }
.sum-name { font-family:var(--san); font-size:clamp(2.8rem,7vw,6.5rem); font-weight:800; color:var(--tx); letter-spacing:-.04em; line-height:.96; margin-bottom:.65rem }
.sum-role { font-size:.87rem; color:var(--txd); margin-bottom:1.1rem; letter-spacing:.5px }
.sum-bio-txt { font-size:.94rem; line-height:1.8; color:var(--txd); max-width:680px }
.sum-cols { display:grid; grid-template-columns:1fr 1fr; gap:3rem 5rem; border-top:1px solid var(--bdr); padding-top:3rem; margin-top:3.5rem }
.sc-h { font-family:var(--ser); font-size:1.12rem; font-weight:400; color:var(--tx); margin-bottom:1rem; padding-bottom:.55rem; border-bottom:1px solid var(--bdr) }
.sc-items { display:flex; flex-direction:column; gap:.85rem }
.si { padding-bottom:.75rem; border-bottom:1px solid rgba(232,229,223,.04) }
.si-t { font-size:.84rem; color:var(--tx); margin-bottom:.22rem; display:flex; align-items:center; gap:.34rem }
.si-t i { font-size:.56rem; color:var(--acc); opacity:.5 }
.si-d { display:flex; flex-wrap:wrap; gap:.26rem; font-size:.7rem; color:var(--txd) }
.dot { color:rgba(232,229,223,.2) }
.si-link { cursor:none; transition:padding-left .18s }
.si-link:hover { padding-left:.35rem }
.si-link:hover .si-t { color:var(--acc) }

/* ════════════════════════════════
   SECTION 9 — CONTACT (dark bg)
   title centered horizontally
════════════════════════════════ */
.s-contact { background:var(--bg); min-height:100vh; display:flex; align-items:center; justify-content:center }
.contact-wrap { width:100%; max-width:1100px; padding:6rem 5% }
.contact-hd { margin-bottom:3.5rem }
.contact-tag { font-size:.54rem; letter-spacing:6px; text-transform:uppercase; color:var(--acc); display:block; margin-bottom:.8rem }
.contact-title { font-family:var(--ser); font-size:clamp(2.5rem,5.5vw,5rem); font-weight:400; color:var(--tx); letter-spacing:-3px; line-height:1.04; margin:.9rem 0 1.2rem }
.contact-title em { font-style:italic; color:var(--acc) }
.contact-sub { font-size:.91rem; line-height:1.8; color:var(--txd); max-width:420px }
.contact-body { display:grid; grid-template-columns:1fr 1.6fr; gap:4.5rem; border-top:1px solid var(--bdr); padding-top:3rem }
.contact-info { display:flex; flex-direction:column; gap:2.2rem }
.ci-avail { display:inline-flex; align-items:center; gap:.6rem; font-size:.64rem; letter-spacing:3px; text-transform:uppercase; color:rgba(232,229,223,.38) }
.ci-dot { width:7px; height:7px; border-radius:50%; background:#3ddc84; box-shadow:0 0 7px rgba(61,220,132,.4); animation:pdot 2s ease-in-out infinite }
@keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.78)}}
.ci-links { display:flex; flex-direction:column }
.ci-lnk { display:flex; align-items:center; justify-content:space-between; padding:.92rem 0; border-bottom:1px solid var(--bdr); text-decoration:none; cursor:none; transition:padding-left .28s }
.ci-lnk:first-child { border-top:1px solid var(--bdr) }
.ci-lnk:hover { padding-left:.45rem }
.ci-lnk span:first-child { font-size:.86rem; color:var(--txd); transition:color .3s }
.ci-lnk:hover span:first-child { color:var(--tx) }
.ci-lnk span:last-child { font-size:.88rem; color:rgba(232,229,223,.15); transition:color .3s,transform .3s }
.ci-lnk:hover span:last-child { color:var(--acc); transform:translate(3px,-3px); display:inline-block }
.ci-tags { display:flex; flex-wrap:wrap; gap:.38rem }
.ci-tags span { font-size:.54rem; letter-spacing:2px; text-transform:uppercase; padding:.24rem .64rem; border:1px solid var(--bdr); border-radius:3px; color:rgba(232,229,223,.24) }
.contact-form { display:flex; flex-direction:column; gap:1.2rem }
.cf-row { display:grid; grid-template-columns:1fr 1fr; gap:1.2rem }
.cf-f { display:flex; flex-direction:column; gap:.36rem }
.cf-f label { font-size:.53rem; letter-spacing:4px; text-transform:uppercase; color:rgba(232,229,223,.24) }
.cf-f input,.cf-f textarea { width:100%; padding:.76rem 0; background:transparent; border:none; border-bottom:1px solid rgba(232,229,223,.1); color:var(--tx); font-family:inherit; font-size:.9rem; outline:none; transition:border-color .3s; cursor:none }
.cf-f input:focus,.cf-f textarea:focus { border-bottom-color:var(--acc) }
.cf-f input::placeholder,.cf-f textarea::placeholder { color:rgba(232,229,223,.13) }
.cf-f textarea { resize:none; min-height:108px }
.cf-btn { align-self:flex-start; display:inline-flex; align-items:center; gap:.7rem; padding:.74rem 1.6rem; background:transparent; border:1px solid rgba(232,229,223,.12); border-radius:2px; color:var(--tx); font-family:inherit; font-size:.68rem; letter-spacing:3px; text-transform:uppercase; cursor:none; transition:all .3s; margin-top:.3rem }
.cf-btn:hover:not(:disabled) { border-color:var(--acc); color:var(--acc); background:rgba(40,157,242,.04) }
.cf-btn:disabled { opacity:.5 }
.cf-btn i { font-size:.72rem; transition:transform .3s }
.cf-btn:hover:not(:disabled) i { transform:translateX(4px) }

/* ════════════════════════════════
   FOOTER
════════════════════════════════ */
.foot { padding:2rem 5%; border-top:1px solid var(--bdr); background:var(--bg) }
.foot-in { max-width:1100px; margin:0 auto; display:flex; justify-content:space-between; font-size:.62rem; color:rgba(232,229,223,.17); letter-spacing:1px }

/* ════════════════════════════════
   MODALS
════════════════════════════════ */
.overlay { position:fixed; inset:0; z-index:1000; background:rgba(0,0,0,.85); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:2rem }
.mbox { position:relative; background:#1b1b1b; border:1px solid var(--bdr); border-radius:16px; overflow:hidden; max-height:88vh; width:100% }
.mclose { position:absolute; top:.9rem; right:.9rem; z-index:10; background:rgba(232,229,223,.07); border:none; color:var(--tx); width:31px; height:31px; border-radius:50%; cursor:none; font-size:.82rem; display:flex; align-items:center; justify-content:center; transition:all .3s }
.mclose:hover { background:var(--acc) }
.proj-box { display:flex; max-width:820px }
.proj-info { width:250px; flex-shrink:0; padding:2rem 1.6rem; border-right:1px solid var(--bdr); display:flex; flex-direction:column; gap:.82rem }
.proj-info h2 { font-family:var(--ser); font-size:1.3rem; font-weight:400 }
.proj-info p { font-size:.76rem; line-height:1.7; color:var(--txd) }
.proj-role small { font-size:.52rem; letter-spacing:4px; text-transform:uppercase; color:var(--acc); display:block; margin-bottom:.14rem }
.proj-role span { font-size:.8rem; color:rgba(232,229,223,.52) }
.proj-tags { display:flex; flex-wrap:wrap; gap:.3rem; margin-top:auto }
.proj-tags span { font-size:.56rem; padding:.14rem .56rem; border:1px solid var(--bdr); border-radius:18px; color:var(--acc) }
.proj-imgs { flex:1; overflow-y:auto; padding:1.8rem; display:flex; flex-direction:column; gap:.9rem }
.proj-imgs img { width:100%; border-radius:8px }
.cert-box { max-width:600px; padding:2rem }
.cert-nav { display:flex; align-items:center; gap:.9rem; margin-bottom:1rem }
.cert-nav button { background:none; border:1px solid var(--bdr); color:var(--tx); width:30px; height:30px; border-radius:50%; cursor:none; transition:all .3s }
.cert-nav button:disabled { opacity:.3 }
.cert-nav span { font-size:.75rem; color:var(--txd) }
.cert-box img { width:100%; border-radius:8px }
.cert-info { margin-top:1rem }
.cert-info h3 { font-size:.92rem; margin-bottom:.2rem }
.cert-info p { font-size:.74rem; color:var(--txd); margin-bottom:.12rem }
.cert-info span { font-size:.63rem; color:var(--acc) }
.mfade-enter-active,.mfade-leave-active { transition:opacity .24s }
.mfade-enter-from,.mfade-leave-to { opacity:0 }

/* ════════════════════════════════
   TOAST
════════════════════════════════ */
.toast { position:fixed; bottom:2rem; right:2rem; z-index:9999; background:#1b1b1b; border:1px solid var(--bdr); border-radius:11px; padding:.86rem 1.2rem; display:flex; align-items:flex-start; gap:.7rem; max-width:290px; box-shadow:0 10px 40px rgba(0,0,0,.5) }
.toast.ok { border-left:3px solid var(--acc) }
.toast.err { border-left:3px solid #e55 }
.toast i:first-child { font-size:1rem; margin-top:2px }
.toast.ok i:first-child { color:var(--acc) }
.toast.err i:first-child { color:#e55 }
.toast strong { font-size:.82rem; display:block; margin-bottom:.12rem }
.toast p { font-size:.71rem; color:var(--txd); margin:0 }
.toast-enter-active,.toast-leave-active { transition:all .3s }
.toast-enter-from,.toast-leave-to { opacity:0; transform:translateX(13px) }

/* ════════════════════════════════
   RESPONSIVE
════════════════════════════════ */
/* Tablet: 4 columns for tech */
@media(max-width:1024px) {
  .tech-grid { grid-template-columns:repeat(4,1fr) }
}
@media(max-width:860px) {
  .contact-body { grid-template-columns:1fr; gap:2.8rem }
  .cf-row { grid-template-columns:1fr }
  .proj-box { flex-direction:column }
  .proj-info { width:100%; border-right:none; border-bottom:1px solid var(--bdr) }
  .row { grid-template-columns:34px 1fr 20px }.rc { display:none }
  .row-d { grid-template-columns:1fr auto 20px }
  .sum-cols { grid-template-columns:1fr }
  .tech-grid { grid-template-columns:repeat(3,1fr) }
  .itext,.role-word { font-size:clamp(2rem,7vw,4rem) !important; white-space:normal }
  .big-name { font-size:clamp(2rem,8vw,4rem) }
  .quote-p { font-size:clamp(1.4rem,5vw,3rem) }
}
@media(max-width:480px) {
  .tech-grid { grid-template-columns:repeat(2,1fr) }
  .itext,.role-word { font-size:clamp(1.7rem,7vw,3rem) !important }
}
</style>