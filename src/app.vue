<template>

  <!-- ══ CUSTOM CURSOR ══════════════════════════════ -->
  <div class="cur-ring" :class="{ hover: curHover }"
    :style="{ left: cur.x+'px', top: cur.y+'px' }"></div>
  <div class="cur-dot"
    :style="{ left: cur.x+'px', top: cur.y+'px' }"></div>

  <!-- ══ LOADING ════════════════════════════════════ -->
  <Transition name="ld-out">
    <div v-if="phase==='loading'" class="loader">
      <div class="ld-bar"><div class="ld-fill" :style="{ width: pct+'%' }"></div></div>
      <div class="ld-body">
        <p class="ld-label">{{ ldLabel }}</p>
        <div class="ld-num">{{ pct }}<span>%</span></div>
        <p class="ld-sub">UI/UX Designer &amp; Frontend Developer</p>
      </div>
    </div>
  </Transition>

  <!-- ══ SITE ═══════════════════════════════════════ -->
  <div v-if="phase==='site'" class="site">

    <!-- Top bar -->
    <header class="bar">
      <span class="bar-l">FS — {{ yr }} ©</span>
      <nav class="bar-c">
        <a @click.prevent="go('s-intro')">INTRO</a>
        <a @click.prevent="go('s-about')">ABOUT</a>
        <a @click.prevent="go('s-work')">WORK</a>
        <a @click.prevent="go('s-contact')">CONTACT</a>
      </nav>
      <span class="bar-r">MENU</span>
    </header>

    <!-- ─── 1. HERO F.S ──────────────────────────── -->
    <section class="s-hero" ref="refHero">
      <div class="hero-pin">
        <div class="hero-letters"
          :style="{ transform: 'scale('+hScale+')', opacity: hOp }">
          <span class="hl-f" :style="{ transform: 'translateX('+hFx+'px)' }">F</span>
          <span class="hl-dot">.</span>
          <span class="hl-s" :style="{ transform: 'translateX('+hSx+'px)' }">S</span>
        </div>
        <div class="cue" :style="{ opacity: heroCue }">
          <div class="cue-m"><div class="cue-d"></div></div>
          <span>Scroll Down</span>
        </div>
      </div>
    </section>

    <!-- ─── 2. INTRO "Let Me Introduce" ─────────── -->
    <section class="s-intro" id="s-intro" ref="refIntro">
      <div class="intro-pin" :style="{ opacity: introOp }">
        <div class="intro-lines">
          <div class="iline"
            :style="{ transform:'translateX('+iOff[0]+'px)', filter:'blur('+iBlur+'px)' }">
            <span>Let Me Introduce</span>
          </div>
          <div class="iline iline-2"
            :style="{ transform:'translateX('+iOff[1]+'px)', filter:'blur('+iBlur+'px)' }">
            <span>My self</span>
            <span class="iline-img">
              <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1772046344/vecpic_fn1deb.png" alt="" />
            </span>
          </div>
          <div class="iline"
            :style="{ transform:'translateX('+iOff[2]+'px)', filter:'blur('+iBlur+'px)' }">
            <span class="ia">As <em>Designer.</em></span>
          </div>
        </div>
        <div class="cue" :style="{ opacity: introCue }">
          <div class="cue-m"><div class="cue-d"></div></div>
          <span>Scroll Down</span>
        </div>
      </div>
    </section>

    <!-- ─── 3. ABOUT ME ──────────────────────────── -->
    <section class="s-about" id="s-about">
      <div class="about-marquee">
        <div class="am-track">
          <span v-for="n in 6" :key="n">— ABOUT ME </span>
        </div>
      </div>
      <div class="about-body">
        <div class="about-photo reveal-up">
          <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1772046344/vecpic_fn1deb.png" alt="Farid Syam" />
        </div>
        <div class="about-text">
          <p class="about-tag reveal-up">WHO I AM</p>
          <h2 class="reveal-up" style="transition-delay:.06s">Muhammad<br>Farid Syam</h2>
          <p class="about-bio reveal-up" style="transition-delay:.12s">
            Greetings, I'm <strong>Muhammad Farid Syam</strong>, a UI/UX Designer &amp;
            Frontend Developer based in Makassar, Indonesia. I specialize in crafting
            digital interfaces that are not just static pages — but dynamic, intuitive
            journeys, built with Figma and Vue.js.
          </p>
          <blockquote class="reveal-up" style="transition-delay:.18s">
            "Design with soul, develop with logic."
          </blockquote>
          <div class="about-stats reveal-up" style="transition-delay:.24s">
            <div v-for="s in stats" :key="s.l" class="ast">
              <div class="ast-n">{{ s.v }}</div>
              <div class="ast-l">{{ s.l }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── 4. SELECTED WORK ─────────────────────── -->
    <section class="s-work" id="s-work">
      <div class="sw-inner">
        <div class="sec-hed">
          <span class="sec-tag reveal-up">SELECTED WORK</span>
          <h2 class="reveal-up" style="transition-delay:.06s">Projects</h2>
        </div>
        <div class="list-wrap">
          <div
            v-for="(p,i) in projects" :key="p.title"
            class="li reveal-up" :style="'transition-delay:'+i*.04+'s'"
            @click="openProj(p)"
            @mouseenter="hovP=p" @mouseleave="hovP=null"
          >
            <span class="li-n">{{ String(i+1).padStart(2,'0') }}</span>
            <span class="li-t">{{ p.title }}</span>
            <span class="li-c">{{ p.badges[0] }}</span>
            <span class="li-a">→</span>
          </div>
        </div>
        <div class="prev" :class="{ on: hovP }"
          :style="{ left: cur.x+20+'px', top: cur.y-60+'px' }">
          <img v-if="hovP" :src="hovP.image" :alt="hovP.title" />
        </div>
      </div>
    </section>

    <!-- ─── 5. CERTIFICATES ──────────────────────── -->
    <section class="s-certs">
      <div class="sw-inner">
        <div class="sec-hed">
          <span class="sec-tag reveal-up" style="color:var(--acc)">CERTIFICATES</span>
          <h2 class="reveal-up" style="transition-delay:.06s">Selected Activities</h2>
        </div>
        <div class="cert-list">
          <div
            v-for="(c,i) in certificates" :key="c.title"
            class="celi reveal-up" :style="'transition-delay:'+i*.05+'s'"
            @click="openCert(c)"
            @mouseenter="hovC=c" @mouseleave="hovC=null"
          >
            <span class="celi-t">{{ c.title }}</span>
            <span class="celi-d">{{ c.date }}</span>
            <span class="celi-i">{{ c.issuer }}</span>
            <span class="celi-a">→</span>
          </div>
        </div>
        <div class="prev" :class="{ on: hovC }"
          :style="{ left: cur.x+20+'px', top: cur.y-60+'px' }">
          <img v-if="hovC" :src="hovC.images[0]" :alt="hovC.title" />
        </div>
      </div>
    </section>

    <!-- ─── 6. TECH STACK ────────────────────────── -->
    <section class="s-tech">
      <div class="sw-inner">
        <div class="sec-hed">
          <span class="sec-tag reveal-up">TECH STACK</span>
          <h2 class="reveal-up" style="transition-delay:.06s">Tools &amp; Skills</h2>
        </div>
        <div class="tech-cats">
          <div v-for="(group, cat) in techGroups" :key="cat" class="tcat reveal-up">
            <h3 class="tcat-h">{{ cat }}</h3>
            <div class="tcat-items">
              <div v-for="t in group" :key="t.name" class="titem">
                <img :src="t.iconDark" :alt="t.name" />
                <span>{{ t.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── 7. PHRASE ────────────────────────────── -->
    <section class="s-phrase">
      <div class="phrase-inner">
        <p class="phrase-sm reveal-up">Dont Be Shy,</p>
        <h2 class="phrase-big reveal-up" style="transition-delay:.08s">Make The First Move.</h2>
      </div>
    </section>

    <!-- ─── 8. SUMMARY ───────────────────────────── -->
    <section class="s-summary" id="s-summary">
      <div class="sw-inner">
        <!-- Big name header -->
        <div class="sum-hero reveal-up">
          <h2 class="sum-title">Muhammad<br>Farid Syam.</h2>
          <p class="sum-role">— UI/UX Designer &amp; Frontend Developer —</p>
          <p class="sum-bio">
            Hi there! 👋 Welcome to my portfolio. I'm a designer and developer who believes in
            <strong>Functionality + Aesthetics = Satisfaction</strong>. Crafting seamless digital
            experiences, one pixel at a time.
          </p>
          <a href="#" class="sum-cv" download>
            <i class="fas fa-download"></i> Download CV
          </a>
        </div>

        <!-- 2-col info -->
        <div class="sum-grid">
          <div class="sum-col">
            <h3 class="sum-col-h">Education</h3>
            <div class="sum-items">
              <div class="sitem">
                <div class="sitem-t">Informatics Engineering (Bachelor)</div>
                <div class="sitem-d">
                  <span>Universitas Mikroskil</span>
                  <span class="sdot">•</span>
                  <span>Medan, Indonesia</span>
                  <span class="sdot">•</span>
                  <span>3.69/4.00</span>
                </div>
              </div>
            </div>
          </div>

          <div class="sum-col">
            <h3 class="sum-col-h">Experiences</h3>
            <div class="sum-items">
              <div v-for="exp in experiences" :key="exp.name" class="sitem">
                <div class="sitem-t">{{ exp.name }}</div>
                <div class="sitem-d">
                  <span>{{ exp.role }}</span>
                  <span class="sdot">•</span>
                  <span>{{ exp.period }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="sum-col">
            <h3 class="sum-col-h">Selected Projects</h3>
            <div class="sum-items">
              <div v-for="p in projects.slice(0,5)" :key="p.title" class="sitem sitem-link" @click="openProj(p)">
                <div class="sitem-t">{{ p.title }} <i class="fas fa-arrow-up-right-from-square"></i></div>
                <div class="sitem-d">
                  <span>{{ p.role }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="sum-col">
            <h3 class="sum-col-h">Selected Activities</h3>
            <div class="sum-items">
              <div v-for="c in certificates.slice(0,4)" :key="c.title" class="sitem sitem-link" @click="openCert(c)">
                <div class="sitem-t">{{ c.title }} <i class="fas fa-arrow-up-right-from-square"></i></div>
                <div class="sitem-d">
                  <span>{{ c.issuer }}</span>
                  <span class="sdot">•</span>
                  <span>{{ c.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── 9. CONTACT ───────────────────────────── -->
    <section class="s-contact" id="s-contact">
      <div class="sw-inner">
        <span class="sec-tag reveal-up" style="color:var(--acc)">GET IN TOUCH</span>
        <h2 class="contact-h reveal-up" style="transition-delay:.06s">
          Let's Work<br><em>Together.</em>
        </h2>
        <div class="contact-grid">
          <div class="cg-left reveal-up" style="transition-delay:.12s">
            <div id="lottie-c"></div>
            <div class="cg-chips">
              <span><i class="fas fa-paint-brush"></i> UI/UX Design</span>
              <span><i class="fas fa-code"></i> Frontend Dev</span>
            </div>
            <div class="cg-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener">
                <i class="fab fa-linkedin"></i> LinkedIn
              </a>
              <a href="mailto:mfaridsyam@email.com">
                <i class="fas fa-envelope"></i> Email
              </a>
            </div>
          </div>
          <form class="cg-form reveal-up" style="transition-delay:.2s" @submit.prevent="send" novalidate>
            <input type="text" name="website" id="hp" tabindex="-1" style="position:absolute;left:-9999px;opacity:0" />
            <div class="cf-field">
              <input v-model="form.name" type="text" placeholder="Your Name" required :disabled="sending" />
            </div>
            <div class="cf-field">
              <input v-model="form.email" type="email" placeholder="Your Email" required :disabled="sending" />
            </div>
            <div class="cf-field">
              <textarea v-model="form.message" placeholder="Your Message" rows="5" required :disabled="sending"></textarea>
            </div>
            <button type="submit" :disabled="sending">
              <i :class="sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
              {{ sending ? 'Sending…' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- ─── 9. FOOTER ────────────────────────────── -->
    <footer class="site-foot">
      <div class="foot-inner">
        <div class="foot-l">
          <span>© {{ yr }} Muhammad Farid Syam</span>
          <span>UI/UX Designer &amp; Frontend Developer</span>
        </div>
        <div class="foot-r">
          <span>Made with <span class="heart">♥</span> in Makassar</span>
        </div>
      </div>
    </footer>

    <!-- Music player -->
    <div class="music-wrap">
      <audio ref="audioEl" :src="booSrc" preload="auto" loop></audio>
      <button class="music-btn" @click="toggleMusic">
        <i :class="musicPlaying ? 'fas fa-pause' : 'fas fa-music'"></i>
        <span class="music-label">{{ musicPlaying ? 'BOO – H3ADBAND' : 'BOO – H3ADBAND' }}</span>
        <div class="music-bars" v-if="musicPlaying">
          <span></span><span></span><span></span><span></span>
        </div>
      </button>
    </div>

    <!-- ══ MODALS ══════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="mfade">
        <div v-if="actProj" class="moverlay" @click.self="actProj=null">
          <div class="mbox proj-mbox">
            <button class="mcls" @click="actProj=null"><i class="fas fa-times"></i></button>
            <div class="pm-side">
              <h2>{{ actProj.title }}</h2>
              <p>{{ actProj.desc }}</p>
              <div class="pm-role">
                <small>ROLE</small>
                <span>{{ actProj.role }}</span>
              </div>
              <div class="pm-badges">
                <span v-for="b in actProj.badges" :key="b">{{ b }}</span>
              </div>
            </div>
            <div class="pm-imgs">
              <img v-for="(img,i) in actProj.images" :key="i" :src="img" :alt="actProj.title" loading="lazy" />
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="mfade">
        <div v-if="actCert" class="moverlay" @click.self="actCert=null">
          <div class="mbox cert-mbox">
            <button class="mcls" @click="actCert=null"><i class="fas fa-times"></i></button>
            <div v-if="actCert.images.length>1" class="cert-nav">
              <button @click="ci=Math.max(0,ci-1)" :disabled="ci===0"><i class="fas fa-chevron-left"></i></button>
              <span>{{ ci+1 }} / {{ actCert.images.length }}</span>
              <button @click="ci=Math.min(actCert.images.length-1,ci+1)" :disabled="ci===actCert.images.length-1"><i class="fas fa-chevron-right"></i></button>
            </div>
            <img :src="actCert.images[ci]" :alt="actCert.title" />
            <div class="cert-info">
              <h3>{{ actCert.title }}</h3>
              <p>{{ actCert.issuer }}</p>
              <span>{{ actCert.date }}</span>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="toast">
        <div v-if="toast.on" class="toast" :class="toast.t">
          <i :class="toast.t==='ok' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
          <div><strong>{{ toast.ttl }}</strong><p>{{ toast.msg }}</p></div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { projects, certificates, techStack, playlist } from '@/data/index.js'
import emailjs from '@emailjs/browser'
import lottie from 'lottie-web'

const { isDark } = useTheme()

// ── Phase & loader ──────────────────────────────────────
const phase = ref('loading')
const pct   = ref(0)
const ldLabels = ['Initializing...','Loading assets...','Almost ready...','Welcome.']
const ldLabel  = ref(ldLabels[0])
const yr       = new Date().getFullYear()

onMounted(async () => {
  const dur = 2800, t0 = Date.now()
  const tick = () => {
    const p = Math.min(100, Math.round((Date.now()-t0)/dur*100))
    pct.value = p
    ldLabel.value = ldLabels[Math.min(3, Math.floor(p/26))]
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

// ── Cursor ──────────────────────────────────────────────
const cur      = reactive({ x: -200, y: -200 })
const curHover = ref(false)
function onMouse(e) {
  cur.x = e.clientX; cur.y = e.clientY
  const el = document.elementFromPoint(e.clientX, e.clientY)
  curHover.value = !!(el && el.closest('a,button,.li,.celi'))
}

// ── Scroll ──────────────────────────────────────────────
const scrollY  = ref(0)
const refHero  = ref(null)
const refIntro = ref(null)
let musicTriggered = false
function onScroll() {
  scrollY.value = window.scrollY
  if (!musicTriggered && scrollY.value > window.innerHeight * 0.65) {
    musicTriggered = true
    playBoo()
  }
}

// ── Hero ────────────────────────────────────────────────
const hScale = computed(() => 1 + Math.min(1, scrollY.value/(window.innerHeight*.7)) * 0.12)
const hFx    = computed(() => -Math.min(1, scrollY.value/(window.innerHeight*.7)) * 200)
const hSx    = computed(() =>  Math.min(1, scrollY.value/(window.innerHeight*.7)) * 200)
const hOp    = computed(() => {
  const t = Math.min(1, scrollY.value/(window.innerHeight*.5))
  return t > .7 ? 1-(t-.7)/.3 : 1
})
const heroCue = computed(() => Math.max(0, 1 - scrollY.value/160))

// ── Intro ────────────────────────────────────────────────
const iOff = computed(() => {
  if (!refIntro.value) return [0,0,0]
  const top = refIntro.value.offsetTop
  const h   = refIntro.value.offsetHeight - window.innerHeight
  const t   = Math.max(0, Math.min(1, (scrollY.value-top)/(h*.75)))
  const max = window.innerWidth * .52
  return [-t*max, t*max, -t*max*.85]
})
const introOp = computed(() => {
  if (!refIntro.value) return 1
  const top = refIntro.value.offsetTop
  const t   = Math.max(0, Math.min(1, (scrollY.value-top)/(refIntro.value.offsetHeight-window.innerHeight)))
  return t < .02 ? t/.02 : 1
})
const iBlur = computed(() => {
  if (!refIntro.value) return 0
  const top = refIntro.value.offsetTop
  const h   = refIntro.value.offsetHeight - window.innerHeight
  const t   = Math.max(0, Math.min(1, (scrollY.value-top)/h))
  return t > .6 ? (t-.6)/.4 * 14 : 0
})
const introCue = computed(() => {
  if (!refIntro.value) return 1
  return Math.max(0, 1-Math.max(0, scrollY.value-refIntro.value.offsetTop)/200)
})

// ── Nav ──────────────────────────────────────────────────
function go(id) { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }

// ── Reveal ───────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: .08 })
  document.querySelectorAll('.reveal-up').forEach(el => obs.observe(el))
}

// ── Lottie ───────────────────────────────────────────────
function initLottie() {
  const el = document.getElementById('lottie-c')
  if (el) lottie.loadAnimation({
    container: el, renderer: 'svg', loop: true, autoplay: true,
    path: 'https://res.cloudinary.com/dnacoymkh/raw/upload/v1772692529/email_adxthp.json'
  })
}

// ── Music (BOO auto after scroll) ───────────────────────
const audioEl     = ref(null)
const musicPlaying = ref(false)
const booSrc = playlist[0].src
function playBoo() {
  if (!audioEl.value) return
  audioEl.value.volume = 0.6
  audioEl.value.play().then(() => { musicPlaying.value = true }).catch(() => {})
}
function toggleMusic() {
  if (!audioEl.value) return
  if (musicPlaying.value) { audioEl.value.pause(); musicPlaying.value = false }
  else { audioEl.value.volume = 0.6; audioEl.value.play(); musicPlaying.value = true }
}

// ── Tech grouped by category ─────────────────────────────
const techGroups = computed(() => {
  const g = {}
  techStack.forEach(t => { if (!g[t.category]) g[t.category] = []; g[t.category].push(t) })
  return g
})

// ── Modals ───────────────────────────────────────────────
const actProj = ref(null), actCert = ref(null), ci = ref(0)
const hovP = ref(null), hovC = ref(null)
function openProj(p) { actProj.value = p }
function openCert(c) { actCert.value = c; ci.value = 0 }

// ── Contact ──────────────────────────────────────────────
const form    = reactive({ name:'', email:'', message:'' })
const sending = ref(false)
const toast   = reactive({ on:false, t:'ok', ttl:'', msg:'' })
function showToast(t,ttl,msg) {
  Object.assign(toast, { on:true, t, ttl, msg })
  setTimeout(() => { toast.on = false }, 4000)
}
async function send() {
  if (document.getElementById('hp')?.value) return
  if (!form.name||!form.email||!form.message) return
  sending.value = true
  try {
    await emailjs.send('service_qg8j9nh','template_j9ivxnn',{
      from_name:form.name, reply_to:form.email, message:form.message
    },'UrpG9fqigxq0B2m7k')
    showToast('ok','Sent!',"I'll get back to you soon.")
    Object.assign(form,{name:'',email:'',message:''})
  } catch { showToast('err','Failed','Please try again.') }
  finally { sending.value = false }
}

const stats = [{ v:'11+',l:'Projects'},{ v:'6',l:'Certificates'},{ v:'2yr',l:'Experience'}]

const experiences = [
  { name:'INCIT',     role:'Fullstack Developer', period:'Dec 2024 – Present' },
  { name:'Creloka',   role:'Fullstack Developer', period:'Mar 2022 – Nov 2024' },
  { name:'Panggilin', role:'Frontend Developer',  period:'Jun 2021 – Mar 2022' },
]
</script>

<style>
:root{--bg:#0d0d0d;--bgl:#e8e5df;--tx:#e8e5df;--txd:rgba(232,229,223,.45);--txdk:#1a1a1a;--acc:#289DF2;--acc-r:40,157,242;--bdr:rgba(232,229,223,.09);--ser:'Georgia','Times New Roman',serif;--san:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:auto;overflow-x:hidden;}
body{font-family:var(--san);background:var(--bg);color:var(--tx);overflow-x:hidden;cursor:none;}
::selection{background:rgba(var(--acc-r),.2);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:rgba(232,229,223,.12);border-radius:4px;}
.reveal-up{opacity:0;transform:translateY(36px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1);}
.reveal-up.visible{opacity:1;transform:none;}

/* CURSOR */
.cur-ring{position:fixed;pointer-events:none;z-index:9998;width:34px;height:34px;border-radius:50%;border:1px solid rgba(232,229,223,.4);transform:translate(-50%,-50%);transition:width .18s,height .18s,border-color .18s,background .18s;}
.cur-ring.hover{width:56px;height:56px;border-color:var(--acc);background:rgba(40,157,242,.06);}
.cur-dot{position:fixed;pointer-events:none;z-index:9999;width:5px;height:5px;border-radius:50%;background:var(--acc);transform:translate(-50%,-50%);}

/* LOADER */
.loader{position:fixed;inset:0;z-index:9000;background:var(--bg);display:flex;align-items:center;justify-content:center;}
.ld-bar{position:absolute;top:0;left:0;right:0;height:2px;background:rgba(232,229,223,.07);}
.ld-fill{height:100%;background:var(--acc);transition:width .06s linear;}
.ld-body{text-align:center;display:flex;flex-direction:column;align-items:center;gap:1rem;}
.ld-label{font-size:.6rem;letter-spacing:5px;text-transform:uppercase;color:rgba(232,229,223,.3);}
.ld-num{font-family:var(--ser);font-size:clamp(5rem,18vw,12rem);font-weight:400;color:var(--tx);line-height:1;letter-spacing:-4px;}
.ld-num span{font-size:.35em;color:var(--acc);letter-spacing:0;}
.ld-sub{font-size:.62rem;letter-spacing:4px;color:rgba(232,229,223,.22);}
.ld-out-leave-active{transition:opacity .5s ease;}
.ld-out-leave-to{opacity:0;}

/* TOP BAR */
.bar{position:fixed;top:0;left:0;right:0;z-index:800;display:flex;align-items:center;justify-content:space-between;padding:1.2rem 4%;font-size:.6rem;letter-spacing:2px;color:rgba(232,229,223,.4);mix-blend-mode:difference;}
.bar-c{display:flex;gap:2.2rem;}
.bar-c a{cursor:none;color:inherit;text-decoration:none;transition:color .2s;}
.bar-c a:hover{color:var(--tx);}

/* SCROLL CUE */
.cue{position:absolute;bottom:8%;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:10px;font-size:.57rem;letter-spacing:5px;text-transform:uppercase;color:rgba(232,229,223,.3);pointer-events:none;}
.cue-m{width:20px;height:34px;border:1px solid rgba(232,229,223,.25);border-radius:20px;display:flex;align-items:flex-start;justify-content:center;padding-top:5px;}
.cue-d{width:4px;height:4px;background:var(--acc);border-radius:50%;animation:cscr 1.8s ease-in-out infinite;}
@keyframes cscr{0%{transform:translateY(0);opacity:1;}75%{transform:translateY(14px);opacity:0;}100%{transform:translateY(0);opacity:0;}}

/* HERO */
.s-hero{height:240vh;position:relative;}
.hero-pin{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.hero-letters{display:flex;align-items:baseline;gap:.02em;will-change:transform;user-select:none;}
.hl-f,.hl-s{font-family:var(--ser);font-size:clamp(12rem,34vw,26rem);font-weight:400;color:var(--tx);line-height:.85;will-change:transform;}
.hl-dot{font-family:var(--ser);font-size:clamp(8rem,18vw,14rem);color:var(--acc);line-height:1.1;margin:0 -.05em;align-self:flex-end;}

/* INTRO */
.s-intro{height:380vh;position:relative;}
.intro-pin{position:sticky;top:0;height:100vh;display:flex;align-items:center;padding:0 5%;overflow:hidden;}
.intro-lines{width:100%;}
.iline{display:flex;align-items:center;gap:.4em;will-change:transform;overflow:hidden;}
.iline span{font-family:var(--ser);font-size:clamp(3rem,8.5vw,8rem);font-weight:400;color:var(--tx);line-height:1.1;white-space:nowrap;}
.ia em{font-style:italic;color:var(--acc);}
.iline-2{padding-left:8%;}
.iline-img{display:inline-flex;width:clamp(55px,7vw,88px);height:clamp(55px,7vw,88px);border-radius:10px;overflow:hidden;flex-shrink:0;border:1px solid var(--bdr);}
.iline-img img{width:100%;height:100%;object-fit:cover;}

/* ABOUT */
.s-about{background:var(--bg);padding-bottom:8rem;overflow:hidden;}
.about-marquee{overflow:hidden;margin-bottom:4rem;border-top:1px solid var(--bdr);}
.am-track{display:flex;width:max-content;animation:marq 22s linear infinite;padding:1.2rem 0;}
.am-track span{font-family:var(--ser);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:400;color:rgba(232,229,223,.07);white-space:nowrap;padding:0 2rem;letter-spacing:-1px;}
@keyframes marq{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.about-body{max-width:1100px;margin:0 auto;padding:0 5%;display:grid;grid-template-columns:300px 1fr;gap:6rem;align-items:start;}
.about-photo{aspect-ratio:3/4;border-radius:16px;overflow:hidden;border:1px solid var(--bdr);}
.about-photo img{width:100%;height:100%;object-fit:cover;filter:grayscale(30%);}
.about-tag{font-size:.6rem;letter-spacing:6px;text-transform:uppercase;color:var(--acc);margin-bottom:1.2rem;display:block;}
.about-text h2{font-family:var(--ser);font-size:clamp(2rem,4.5vw,3.6rem);font-weight:400;color:var(--tx);letter-spacing:-2px;line-height:1.1;margin-bottom:1.6rem;}
.about-bio{font-size:.96rem;line-height:1.85;color:var(--txd);margin-bottom:1.6rem;max-width:540px;}
.about-bio strong{color:var(--tx);font-weight:600;}
blockquote{border-left:2px solid var(--acc);padding:.5rem 1.2rem;font-style:italic;color:rgba(232,229,223,.38);font-size:.95rem;margin-bottom:2.2rem;}
.about-stats{display:flex;gap:3rem;}
.ast-n{font-family:var(--ser);font-size:2.5rem;font-weight:400;color:var(--tx);letter-spacing:-2px;line-height:1;}
.ast-l{font-size:.58rem;letter-spacing:3px;text-transform:uppercase;color:rgba(232,229,223,.3);margin-top:.3rem;}

/* SHARED SECTION */
.sw-inner{max-width:1100px;margin:0 auto;padding:0 5%;}
.sec-hed{margin-bottom:3.5rem;}
.sec-tag{font-size:.6rem;letter-spacing:6px;text-transform:uppercase;color:rgba(232,229,223,.35);display:block;margin-bottom:.8rem;}
.sec-hed h2{font-family:var(--ser);font-size:clamp(2.2rem,5.5vw,5rem);font-weight:400;color:var(--tx);letter-spacing:-2px;}

/* WORK */
.s-work{padding:10rem 0 8rem;background:var(--bgl);}
.s-work .sec-tag{color:rgba(26,26,26,.38);}
.s-work .sec-hed h2{color:var(--txdk);}
.list-wrap{border-top:1px solid rgba(26,26,26,.1);}
.li{display:grid;grid-template-columns:48px 1fr auto 28px;align-items:center;gap:1.5rem;padding:1.3rem 0;border-bottom:1px solid rgba(26,26,26,.1);cursor:none;transition:padding-left .25s;}
.li:hover{padding-left:.8rem;}
.li-n{font-size:.68rem;color:rgba(26,26,26,.3);letter-spacing:2px;}
.li-t{font-family:var(--ser);font-size:clamp(1rem,2.2vw,1.7rem);color:var(--txdk);font-weight:400;}
.li-c{font-size:.62rem;letter-spacing:3px;text-transform:uppercase;color:rgba(26,26,26,.38);}
.li-a{font-size:1.1rem;color:rgba(26,26,26,.3);transition:transform .2s;}
.li:hover .li-a{transform:translateX(6px);color:var(--txdk);}
.prev{position:fixed;width:220px;height:148px;border-radius:10px;overflow:hidden;pointer-events:none;z-index:700;opacity:0;transform:scale(.9);transition:opacity .22s,transform .22s;}
.prev.on{opacity:1;transform:scale(1);}
.prev img{width:100%;height:100%;object-fit:cover;}

/* CERTS */
.s-certs{padding:10rem 0 8rem;background:var(--bg);}
.cert-list{border-top:1px solid var(--bdr);}
.celi{display:grid;grid-template-columns:1fr 80px auto 28px;align-items:center;gap:1.5rem;padding:1.3rem 0;border-bottom:1px solid var(--bdr);cursor:none;transition:padding-left .25s;}
.celi:hover{padding-left:.8rem;}
.celi-t{font-family:var(--ser);font-size:clamp(1rem,2vw,1.5rem);color:var(--tx);font-weight:400;}
.celi-d{font-size:.65rem;letter-spacing:2px;color:var(--txd);white-space:nowrap;}
.celi-i{font-size:.65rem;letter-spacing:1px;color:rgba(232,229,223,.32);}
.celi-a{font-size:1rem;color:rgba(232,229,223,.25);transition:transform .2s;}
.celi:hover .celi-a{transform:translateX(6px);color:var(--tx);}

/* TECH */
.s-tech{padding:10rem 0 8rem;background:var(--bgl);}
.s-tech .sec-tag{color:rgba(26,26,26,.38);}
.s-tech .sec-hed h2{color:var(--txdk);}
.tech-cats{display:flex;flex-direction:column;gap:3rem;}
.tcat-h{font-size:.58rem;letter-spacing:5px;text-transform:uppercase;color:rgba(26,26,26,.35);margin-bottom:1.2rem;padding-bottom:.6rem;border-bottom:1px solid rgba(26,26,26,.1);}
.tcat-items{display:flex;flex-wrap:wrap;gap:.8rem;}
.titem{display:flex;align-items:center;gap:.55rem;padding:.55rem 1.1rem;background:rgba(26,26,26,.05);border:1px solid rgba(26,26,26,.1);border-radius:50px;transition:border-color .25s,transform .25s;cursor:default;}
.titem:hover{border-color:rgba(26,26,26,.3);transform:translateY(-2px);}
.titem img{width:22px;height:22px;object-fit:contain;}
.titem span{font-size:.75rem;color:var(--txdk);}

/* PHRASE */
.s-phrase{padding:12rem 5%;background:var(--bg);display:flex;align-items:center;}
.phrase-sm{font-size:1rem;letter-spacing:2px;color:var(--txd);margin-bottom:1rem;}
.phrase-big{font-family:var(--ser);font-size:clamp(2.5rem,7vw,6.5rem);font-weight:400;color:var(--tx);line-height:1.1;letter-spacing:-2px;}

/* CONTACT */
.s-contact{padding:10rem 0 8rem;background:var(--bg);}
.contact-h{font-family:var(--ser);font-size:clamp(2.2rem,6vw,5rem);font-weight:400;color:var(--tx);letter-spacing:-2px;line-height:1.1;margin-bottom:4rem;}
.contact-h em{font-style:italic;color:var(--acc);}
.contact-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:4rem;}
.cg-left{display:flex;flex-direction:column;align-items:center;gap:1.5rem;}
#lottie-c{width:100%;max-width:210px;height:190px;}
.cg-chips{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;}
.cg-chips span{font-size:.7rem;padding:.3rem .85rem;border:1px solid var(--bdr);border-radius:50px;color:var(--acc);display:flex;align-items:center;gap:.4rem;}
.cg-links{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;}
.cg-links a{font-size:.72rem;letter-spacing:1px;color:var(--txd);text-decoration:none;display:flex;align-items:center;gap:.4rem;padding:.4rem .8rem;border:1px solid var(--bdr);border-radius:50px;transition:all .25s;cursor:none;}
.cg-links a:hover{color:var(--acc);border-color:rgba(var(--acc-r),.4);}
.cg-form{display:flex;flex-direction:column;gap:1rem;}
.cf-field input,.cf-field textarea{width:100%;padding:.85rem 1rem;background:rgba(232,229,223,.04);border:1px solid var(--bdr);border-radius:10px;color:var(--tx);font-family:inherit;font-size:.9rem;outline:none;transition:border-color .3s;cursor:none;}
.cf-field input:focus,.cf-field textarea:focus{border-color:var(--acc);}
.cf-field input::placeholder,.cf-field textarea::placeholder{color:rgba(232,229,223,.22);}
.cf-field textarea{resize:vertical;min-height:130px;}
.cg-form button{padding:.88rem;background:var(--acc);color:#fff;border:none;border-radius:10px;font-size:.9rem;font-weight:600;cursor:none;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .3s;}
.cg-form button:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-2px);}
.cg-form button:disabled{opacity:.6;cursor:not-allowed;}

/* FOOTER */
.site-foot{padding:2.5rem 5%;border-top:1px solid var(--bdr);background:var(--bg);}
.foot-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;}
.foot-l,.foot-r{font-size:.68rem;color:rgba(232,229,223,.25);letter-spacing:1px;}
.foot-l{display:flex;flex-direction:column;gap:.3rem;}
.heart{color:#e55;}

/* MUSIC */
.music-wrap{position:fixed;bottom:1.8rem;right:1.8rem;z-index:900;}
.music-btn{display:flex;align-items:center;gap:.6rem;padding:.6rem 1rem .6rem .8rem;background:rgba(13,13,13,.88);backdrop-filter:blur(12px);border:1px solid var(--bdr);border-radius:50px;color:var(--tx);cursor:none;font-size:.68rem;letter-spacing:1px;transition:border-color .3s;}
.music-btn:hover{border-color:rgba(var(--acc-r),.5);}
.music-btn i{color:var(--acc);font-size:.85rem;}
.music-label{color:rgba(232,229,223,.45);max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.music-bars{display:flex;align-items:flex-end;gap:2px;height:14px;}
.music-bars span{width:3px;background:var(--acc);border-radius:2px;animation:bar 1s ease-in-out infinite;}
.music-bars span:nth-child(2){animation-delay:.2s;}
.music-bars span:nth-child(3){animation-delay:.4s;}
.music-bars span:nth-child(4){animation-delay:.1s;}
@keyframes bar{0%,100%{height:4px;}50%{height:14px;}}

/* MODALS */
.moverlay{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.82);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:2rem;}
.mbox{position:relative;background:#111;border:1px solid var(--bdr);border-radius:20px;overflow:hidden;max-height:88vh;width:100%;}
.mcls{position:absolute;top:1.2rem;right:1.2rem;z-index:10;background:rgba(232,229,223,.07);border:none;color:var(--tx);width:36px;height:36px;border-radius:50%;cursor:none;font-size:.9rem;display:flex;align-items:center;justify-content:center;transition:all .3s;}
.mcls:hover{background:var(--acc);}
.proj-mbox{display:flex;max-width:860px;}
.pm-side{width:280px;flex-shrink:0;padding:2.5rem 2rem;border-right:1px solid var(--bdr);display:flex;flex-direction:column;gap:1rem;}
.pm-side h2{font-family:var(--ser);font-size:1.5rem;font-weight:400;}
.pm-side p{font-size:.82rem;line-height:1.7;color:var(--txd);}
.pm-role small{font-size:.58rem;letter-spacing:4px;text-transform:uppercase;color:var(--acc);display:block;margin-bottom:.2rem;}
.pm-role span{font-size:.85rem;color:rgba(232,229,223,.6);}
.pm-badges{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:auto;}
.pm-badges span{font-size:.62rem;padding:.2rem .7rem;border:1px solid var(--bdr);border-radius:20px;color:var(--acc);}
.pm-imgs{flex:1;overflow-y:auto;padding:2rem;display:flex;flex-direction:column;gap:1rem;}
.pm-imgs img{width:100%;border-radius:10px;}
.cert-mbox{max-width:640px;padding:2rem;}
.cert-nav{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;}
.cert-nav button{background:none;border:1px solid var(--bdr);color:var(--tx);width:32px;height:32px;border-radius:50%;cursor:none;transition:all .3s;}
.cert-nav button:disabled{opacity:.3;}
.cert-nav span{font-size:.8rem;color:var(--txd);}
.cert-mbox img{width:100%;border-radius:10px;}
.cert-info{margin-top:1.2rem;}
.cert-info h3{font-size:1rem;margin-bottom:.3rem;}
.cert-info p{font-size:.8rem;color:var(--txd);margin-bottom:.2rem;}
.cert-info span{font-size:.7rem;color:var(--acc);}
.mfade-enter-active,.mfade-leave-active{transition:opacity .28s;}
.mfade-enter-from,.mfade-leave-to{opacity:0;}

/* TOAST */
.toast{position:fixed;bottom:2rem;right:2rem;z-index:9999;background:#161616;border:1px solid var(--bdr);border-radius:12px;padding:1rem 1.3rem;display:flex;align-items:flex-start;gap:.8rem;max-width:320px;box-shadow:0 10px 40px rgba(0,0,0,.5);}
.toast.ok{border-left:3px solid var(--acc);}
.toast.err{border-left:3px solid #e55;}
.toast i:first-child{font-size:1.2rem;margin-top:2px;}
.toast.ok i:first-child{color:var(--acc);}
.toast.err i:first-child{color:#e55;}
.toast strong{font-size:.88rem;display:block;margin-bottom:.2rem;}
.toast p{font-size:.78rem;color:var(--txd);margin:0;}
.toast-enter-active,.toast-leave-active{transition:all .3s;}
.toast-enter-from,.toast-leave-to{opacity:0;transform:translateX(20px);}

/* SUMMARY */
.s-summary{padding:10rem 0 8rem;background:var(--bg);border-top:1px solid var(--bdr);}
.sum-hero{margin-bottom:6rem;max-width:800px;}
.sum-title{font-family:var(--ser);font-size:clamp(3rem,8vw,7rem);font-weight:400;color:var(--tx);letter-spacing:-3px;line-height:1;margin-bottom:1.2rem;}
.sum-role{font-size:.78rem;letter-spacing:4px;color:var(--acc);margin-bottom:1.5rem;}
.sum-bio{font-size:1rem;line-height:1.8;color:var(--txd);max-width:580px;margin-bottom:2rem;}
.sum-bio strong{color:var(--tx);}
.sum-cv{display:inline-flex;align-items:center;gap:.5rem;padding:.7rem 1.5rem;border:1px solid var(--bdr);border-radius:50px;color:var(--tx);text-decoration:none;font-size:.78rem;letter-spacing:2px;text-transform:uppercase;transition:all .3s;cursor:none;}
.sum-cv:hover{border-color:var(--acc);color:var(--acc);}
.sum-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem 6rem;border-top:1px solid var(--bdr);padding-top:4rem;}
.sum-col-h{font-family:var(--ser);font-size:1.3rem;font-weight:400;color:var(--tx);margin-bottom:1.5rem;padding-bottom:.8rem;border-bottom:1px solid var(--bdr);}
.sum-items{display:flex;flex-direction:column;gap:1.2rem;}
.sitem{padding-bottom:1rem;border-bottom:1px solid rgba(232,229,223,.05);}
.sitem-t{font-size:.88rem;color:var(--tx);margin-bottom:.35rem;display:flex;align-items:center;gap:.4rem;}
.sitem-t i{font-size:.65rem;color:var(--acc);opacity:.6;}
.sitem-d{display:flex;flex-wrap:wrap;align-items:center;gap:.3rem;font-size:.72rem;color:var(--txd);}
.sdot{color:rgba(232,229,223,.2);}
.sitem-link{cursor:none;transition:padding-left .2s;}
.sitem-link:hover{padding-left:.5rem;}
.sitem-link:hover .sitem-t{color:var(--acc);}

/* RESPONSIVE */
@media(max-width:900px){
  .about-body{grid-template-columns:1fr;gap:3rem;}
  .about-photo{max-width:260px;}
  .contact-grid{grid-template-columns:1fr;}
  .proj-mbox{flex-direction:column;}
  .pm-side{width:100%;border-right:none;border-bottom:1px solid var(--bdr);}
  .li{grid-template-columns:36px 1fr 28px;}
  .li-c{display:none;}
  .celi{grid-template-columns:1fr auto 28px;}
  .celi-i{display:none;}
  .bar-c{display:none;}
  .hl-f,.hl-s{font-size:clamp(8rem,22vw,18rem);}
  .sum-grid{grid-template-columns:1fr;}
}
</style>