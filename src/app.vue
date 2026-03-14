<template>
  <div class="cur-ring" :class="{chover:curHover}" :style="{left:cur.x+'px',top:cur.y+'px'}"></div>
  <div class="cur-dot" :style="{left:cur.x+'px',top:cur.y+'px'}"></div>

  <Transition name="ldfade">
    <div v-if="loading" class="loader">
      <div class="ld-prog"><div class="ld-fill" :style="{width:ldPct+'%'}"></div></div>
      <div class="ld-cnt">
        <span class="ld-tag">LOADING</span>
        <div class="ld-name glitch-text" data-text="MFaridS">MFaridS</div>
        <span class="ld-sub">UI/UX Designer &amp; Frontend Developer</span>
      </div>
    </div>
  </Transition>

  <div v-if="!loading" class="fp-wrap">
    <header class="bar" :class="{blight: LIGHT_SECS.includes(cur_sec)}">
      <span class="bar-l">M. Farid Syam</span>
      <button class="bar-music" @click="toggleMusic">
        <span class="bmdot" :class="{bmon: musicOn}"></span>
        <span>{{ currentTrackTitle }}</span>
        <span v-if="musicOn" class="bmbars"><i></i><i></i><i></i></span>
      </button>
      <audio ref="aud" preload="auto" @ended="onTrackEnded"></audio>
    </header>

    <nav class="dots-nav" :class="{blight: LIGHT_SECS.includes(cur_sec)}">
      <button v-for="(s,i) in SECTIONS" :key="s.id"
        class="dnav-dot" :class="{active: cur_sec===i}"
        @click="goTo(i)" :title="s.label">
      </button>
    </nav>

    <!-- Mobile only arrow navigation -->
    <div class="mob-nav">
      <button class="mob-nav-btn" @click="prev" :disabled="cur_sec===0" :class="{disabled: cur_sec===0}">
        <i class="fas fa-chevron-up"></i>
      </button>
      <button class="mob-nav-btn" @click="next" :disabled="cur_sec===SECTIONS.length-1" :class="{disabled: cur_sec===SECTIONS.length-1}">
        <i class="fas fa-chevron-down"></i>
      </button>
    </div>

    <div class="fp-viewport" ref="vpRef"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd">
      <TransitionGroup :name="txName" tag="div" class="fp-slider">

        <div v-show="cur_sec===0" key="hero" class="fp-slide bg-dk">
          <div class="sec-hero">
            <div class="hero-letters glitch-letters">
              <span class="hlf glitch-text" data-text="F">F</span>
              <span class="hldot"></span>
              <span class="hls glitch-text" data-text="S">S</span>
            </div>
            <div class="cue">
              <div class="cue-m"><div class="cue-d"></div></div>
              <span>SCROLL DOWN</span>
            </div>
            <div class="swipe-cue">
              <div class="swipe-arrows">
                <span class="sw-arr sw-arr1">↑</span>
                <span class="sw-arr sw-arr2">↑</span>
              </div>
              <span class="swipe-lbl">SWIPE TWICE</span>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===1" key="intro" class="fp-slide bg-dk">
          <div class="sec-intro">
            <div class="ilines">
              <div class="il">Let Me Introduce</div>
              <div class="il">My Self</div>
              <div class="il il-role">As <span class="role-wrap"><span class="role-blur" :key="roleIdx">{{ roles[roleIdx] }}</span></span></div>
            </div>
          </div>
        </div>

        <!-- Photo section: mobile only between intro and about -->
        <div v-show="cur_sec===2" key="photo" class="fp-slide bg-dk">
          <div class="sec-photo">
            <div class="ph-img-wrap">
              <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1773393847/IMG_5533_vo5k7w.jpg" alt="Farid Syam"/>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===3" key="about" class="fp-slide bg-dk">
          <div class="sec-about">
            <div class="ab-marq">
              <div class="ab-track"><span v-for="n in 8" :key="n">— ABOUT ME </span></div>
            </div>
            <div class="ab-body">
              <div class="ab-photo">
                <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1773393847/IMG_5533_vo5k7w.jpg" alt="Farid Syam"/>
              </div>
              <div class="ab-txt">
                <span class="ab-tag">WHO I AM</span>
                <h2 class="ab-name"><span class="ab-fn">Muhammad Farid Syam</span></h2>
                <p class="ab-bio">I'm a <strong>UI/UX Designer</strong> and <strong>Frontend Developer</strong> based in West Sulawesi, Indonesia — someone who believes great digital products are built where thoughtful design meets clean code. With a foundation in Informatics Engineering, I've spent the past two years shaping user experiences in Figma and bringing them to life with JavaScript. Right now, I'm deepening my craft in the Vue.js ecosystem, turning ideas into interfaces that are not just functional, but genuinely enjoyable to use.</p>
                <div class="ab-bottom">
                  <blockquote>"Design with soul, develop with logic."</blockquote>
                  <div class="ab-stats">
                    <div class="ast"><span class="astn">11+</span><span class="astl">Projects</span></div>
                    <div class="ast"><span class="astn">6</span><span class="astl">Certificates</span></div>
                    <div class="ast"><span class="astn">2yr</span><span class="astl">Experience</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===4" key="work" class="fp-slide bg-dk">
          <div class="sec-list">
            <div class="sl-inner">
              <div class="slhd">
                <span class="sltag">SELECTED WORK</span>
                <h2 class="slh2">Projects</h2>
              </div>
              <div class="slrows" ref="workListRef">
                <div v-for="(p,j) in projects" :key="p.title"
                  class="slrow" :style="{animationDelay: j*0.04+'s'}"
                  @click="openProj(p)" @mouseenter="hovP=p" @mouseleave="hovP=null">
                  <span class="slrn">{{ String(j+1).padStart(2,'0') }}</span>
                  <span class="slrt">{{ p.title }}</span>
                  <span class="slrc">{{ p.badges.join(' & ') }}</span>
                  <span class="slra">—</span>
                </div>
              </div>
              <div class="scroll-hint">
                <span>↓ scroll</span>
              </div>
            </div>
            <div class="imgf" :class="{ifon:hovP}" :style="{left:cur.x+20+'px',top:cur.y-60+'px'}">
              <img v-if="hovP" :src="hovP.image"/>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===5" key="certs" class="fp-slide bg-dk">
          <div class="sec-list sec-list-dk">
            <div class="sl-inner">
              <div class="slhd">
                <span class="sltag">SELECTED ACTIVITIES</span>
                <h2 class="slh2">Certificates</h2>
              </div>
              <div class="slrows" ref="certListRef">
                <div v-for="(c,j) in certificates" :key="c.title"
                  class="slrow slrow-dk" :style="{animationDelay: j*0.05+'s'}"
                  @click="openCert(c)" @mouseenter="hovC=c" @mouseleave="hovC=null">
                  <span class="slrt">{{ c.title }}</span>
                  <span class="slrc">{{ c.issuer }}</span>
                  <span class="slrd">{{ c.date }}</span>
                  <span class="slra slra-dk">—</span>
                </div>
              </div>
              <div class="scroll-hint">
                <span>↓ scroll</span>
              </div>
            </div>
            <div class="imgf" :class="{ifon:hovC}" :style="{left:cur.x+20+'px',top:cur.y-60+'px'}">
              <img v-if="hovC" :src="hovC.images[0]"/>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===6" key="tech" class="fp-slide bg-dk">
          <div class="sec-list">
            <div class="sl-inner">
              <div class="slhd">
                <span class="sltag">TECH STACK</span>
                <h2 class="slh2">Tools &amp; Skills</h2>
              </div>
              <div class="tgrid">
                <div v-for="t in techStack" :key="t.name" class="tcell">
                  <div class="tcell-inner">
                    <img :src="t.iconDark" :alt="t.name"/>
                    <span class="tcn">{{ t.name }}</span>
                    <span class="tcc">{{ t.category }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===7" key="summary" class="fp-slide bg-dk">
          <div class="sec-summary">
            <div class="sl-inner">
              <div class="sum-hd">
                <p class="sum-lbl">Summary.</p>
                <h2 class="sum-name">Muhammad Farid Syam</h2>
                <p class="sum-role">— UI/UX Designer &amp; Frontend Developer</p>
                <p class="sum-bio">I craft clean, purposeful interfaces and bring them to life with code. Grounded in Informatics Engineering, I've spent the last two years sharpening my skills in Figma and JavaScript — and I'm currently leveling up with Vue.js to build faster, more dynamic web experiences. I believe great products live at the intersection of thoughtful design and solid engineering, and that's exactly where I choose to work.</p>
              </div>
              <div class="sum-cols">
                <div class="scol">
                  <h3 class="scolh">Education</h3>
                  <div class="sitems">
                    <div class="sitem">
                      <div class="simt">Informatics Engineering (Bachelor)</div>
                      <div class="simd"><span>Al Asyariah Mandar University</span><span class="sdot">·</span><span>3.53/4.00</span></div>
                    </div>
                  </div>
                </div>
                <div class="scol">
                  <h3 class="scolh">Selected Projects</h3>
                  <div class="sitems">
                    <div v-for="p in projects.slice(0,5)" :key="p.title" class="sitem slink" @click="openProj(p)">
                      <div class="simt">{{ p.title }} <i class="fas fa-arrow-up-right-from-square"></i></div>
                      <div class="simd"><span>{{ p.role }}</span></div>
                    </div>
                  </div>
                </div>
                <div class="scol">
                  <h3 class="scolh">Selected Activities</h3>
                  <div class="sitems">
                    <div v-for="c in certificates.slice(0,4)" :key="c.title" class="sitem slink" @click="openCert(c)">
                      <div class="simt">{{ c.title }} <i class="fas fa-arrow-up-right-from-square"></i></div>
                      <div class="simd"><span>{{ c.issuer }}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===8" key="phrase" class="fp-slide bg-dk">
          <div class="sec-phrase">
            <div class="ph-inner">
              <p class="phsm">Dont Be Shy,</p>
              <h2 class="phbig">Make The First<br>Move.</h2>
              <div class="ph-cta" @click="goTo(9)">
                <span>Get In Touch</span>
                <span class="ph-arr">↓</span>
              </div>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===9" key="contact" class="fp-slide bg-dk">
          <div class="sec-contact">
            <div class="sl-inner ct-inner">
              <div class="cthd">
                <span class="ctag">GET IN TOUCH</span>
                <h2 class="cttitle">Let's Work<br><em>Together.</em></h2>
                <p class="ctsub">Open for freelance projects, collaborations, or a friendly chat about design and code.</p>
              </div>
              <form class="ctform" @submit.prevent="send" novalidate>
                <input type="text" id="hp" tabindex="-1" style="position:absolute;left:-9999px;opacity:0"/>
                <div class="cfrow">
                  <div class="cff"><label>Name</label><input v-model="form.name" placeholder="Muhammad Farid Syam" :disabled="sending"/></div>
                  <div class="cff"><label>Email</label><input v-model="form.email" type="email" placeholder="hello@example.com" :disabled="sending"/></div>
                </div>
                <div class="cff"><label>Message</label><textarea v-model="form.message" placeholder="Tell me about your project..." rows="4" :disabled="sending"></textarea></div>
                <button type="submit" :disabled="sending" class="cfbtn">
                  <span>{{ sending ? 'Sending…' : 'Send Message' }}</span>
                  <i :class="sending?'fas fa-spinner fa-spin':'fas fa-arrow-right'"></i>
                </button>
              </form>
              <footer class="ctfoot">
                <span>© {{ yr }} Muhammad Farid Syam</span>
              </footer>
            </div>
          </div>
        </div>

      </TransitionGroup>
    </div>

    <Teleport to="body">
      <Transition name="mfade">
        <div v-if="actProj" class="overlay" @click.self="actProj=null">
          <div class="mbox-full">
            <button class="mclose" @click="actProj=null"><i class="fas fa-times"></i></button>
            <div class="mf-left">
              <img :src="actProj.image" :alt="actProj.title"/>
            </div>
            <div class="mf-right">
              <span class="mf-tag">PROJECT</span>
              <h2>{{ actProj.title }}</h2>
              <p>{{ actProj.desc }}</p>
              <div class="mf-role"><small>ROLE</small><span>{{ actProj.role }}</span></div>
              <div class="mf-tags"><span v-for="b in actProj.badges" :key="b">{{ b }}</span></div>
            </div>
          </div>
        </div>
      </Transition>
      <Transition name="mfade">
        <div v-if="actCert" class="overlay" @click.self="actCert=null">
          <div class="mbox-full mbox-cert">
            <button class="mclose" @click="actCert=null"><i class="fas fa-times"></i></button>
            <div class="mf-top">
              <img :src="actCert.images[ci]" :alt="actCert.title"/>
              <div v-if="actCert.images.length>1" class="cert-nav">
                <button @click="ci=Math.max(0,ci-1)" :disabled="ci===0"><i class="fas fa-chevron-left"></i></button>
                <span>{{ ci+1 }} / {{ actCert.images.length }}</span>
                <button @click="ci=Math.min(actCert.images.length-1,ci+1)" :disabled="ci===actCert.images.length-1"><i class="fas fa-chevron-right"></i></button>
              </div>
            </div>
            <div class="mf-bot">
              <span class="mf-tag">CERTIFICATE</span>
              <h2>{{ actCert.title }}</h2>
              <p>{{ actCert.issuer }}</p>
              <span class="mf-date">{{ actCert.date }}</span>
            </div>
          </div>
        </div>
      </Transition>
      <Transition name="notif-fade">
        <div v-if="toast.on" class="notif-overlay" @click.self="toast.on=false">
          <div class="notif-card">
            <button class="notif-close" @click="toast.on=false"><i class="fas fa-times"></i></button>
            <div class="notif-icon" :class="{error: toast.t==='err'}">
              <i :class="toast.t==='ok' ? 'fas fa-check' : 'fas fa-exclamation'"></i>
            </div>
            <div class="notif-msg">
              <h4>{{ toast.ttl }}</h4>
              <p>{{ toast.msg }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { projects, certificates, techStack, playlist } from '@/data/index.js'
import emailjs from '@emailjs/browser'

emailjs.init('UrpG9fqigxq0B2m7k')

const yr = new Date().getFullYear()

const SECTIONS = [
  {id:'hero',    label:'Hero'},
  {id:'intro',   label:'Intro'},
  {id:'photo',   label:'Photo'},
  {id:'about',   label:'About'},
  {id:'work',    label:'Projects'},
  {id:'certs',   label:'Certificates'},
  {id:'tech',    label:'Tools'},
  {id:'summary', label:'Summary'},
  {id:'phrase',  label:'Move'},
  {id:'contact', label:'Contact'},
]
const LIGHT_SECS = []

const loading = ref(true)
const ldPct = ref(0)
const cur_sec = ref(0)
const going = ref(false)
const txName = ref('slide-down')
const vpRef = ref(null)
const workListRef = ref(null)
const certListRef = ref(null)

let ldRaf = null
function startLoad() {
  const t0 = Date.now(), dur = 2600
  function tick() {
    const p = Math.min(100, (Date.now()-t0)/dur*100)
    ldPct.value = p
    if (p < 100) { ldRaf = requestAnimationFrame(tick) }
    else setTimeout(() => { loading.value = false }, 320)
  }
  ldRaf = requestAnimationFrame(tick)
}

function goTo(idx) {
  if (going.value || idx === cur_sec.value) return
  // Skip photo section (idx=2) on desktop (non-touch)
  const isDesktop = window.matchMedia('(pointer:fine)').matches
  if (isDesktop && idx === 2) {
    idx = idx > cur_sec.value ? 3 : 1
  }
  txName.value = idx > cur_sec.value ? 'slide-down' : 'slide-up'
  going.value = true
  cur_sec.value = idx
  if (!musicPlayed) { musicPlayed = true; tryPlay() }
  setTimeout(() => { going.value = false }, 820)
}

function next() {
  const isDesktop = window.matchMedia('(pointer:fine)').matches
  let target = cur_sec.value + 1
  if (isDesktop && target === 2) target = 3
  if (target < SECTIONS.length) goTo(target)
}
function prev() {
  const isDesktop = window.matchMedia('(pointer:fine)').matches
  let target = cur_sec.value - 1
  if (isDesktop && target === 2) target = 1
  if (target >= 0) goTo(target)
}

function getScrollableEl() {
  if (cur_sec.value === 4 && workListRef.value) return workListRef.value
  if (cur_sec.value === 5 && certListRef.value) return certListRef.value
  return null
}

let wheelAcc = 0, wheelTimer = null
function onWheel(e) {
  e.preventDefault()
  if (going.value) return
  const el = getScrollableEl()
  if (el) {
    const atTop = el.scrollTop <= 2
    const atBot = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
    if (e.deltaY > 0 && !atBot) { el.scrollTop += e.deltaY * 0.8; return }
    if (e.deltaY < 0 && !atTop) { el.scrollTop += e.deltaY * 0.8; return }
  }
  // Handle summary section internal scroll
  const summaryEl = cur_sec.value === 7 ? document.querySelector(".sec-summary") : null
  if (summaryEl) {
    const atTop = summaryEl.scrollTop <= 2
    const atBot = summaryEl.scrollTop + summaryEl.clientHeight >= summaryEl.scrollHeight - 4
    if (e.deltaY > 0 && !atBot) { summaryEl.scrollTop += e.deltaY * 0.8; return }
    if (e.deltaY < 0 && !atTop) { summaryEl.scrollTop += e.deltaY * 0.8; return }
  }
  wheelAcc += e.deltaY
  clearTimeout(wheelTimer)
  wheelTimer = setTimeout(() => { wheelAcc = 0 }, 200)
  if (Math.abs(wheelAcc) > 80) {
    if (wheelAcc > 0) next(); else prev()
    wheelAcc = 0
  }
}

// Touch: require 2 swipes on ALL sections on mobile to navigate
let touchY0 = 0, touchX0 = 0, touchSwipeCount = 0, lastSwipeSec = -1
let touchInList = false

function onTouchStart(e) {
  touchY0 = e.touches[0].clientY
  touchX0 = e.touches[0].clientX
  // Check if touch started inside a scrollable list
  touchInList = !!e.target.closest('.slrows')
  // Try to play music on first user touch (mobile autoplay policy)
  if (!musicPlayed) { musicPlayed = true; tryPlay() }
}

function onTouchEnd(e) {
  if (going.value) return

  const dy = touchY0 - e.changedTouches[0].clientY
  const dx = Math.abs(touchX0 - e.changedTouches[0].clientX)

  // If touch started inside list, never navigate — list handles its own scroll
  if (touchInList) { touchInList = false; return }

  if (dx > Math.abs(dy) || Math.abs(dy) < 40) return

  const el = getScrollableEl()
  if (el) {
    const atTop = el.scrollTop <= 2
    const atBot = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
    if (dy > 0 && !atBot) return
    if (dy < 0 && !atTop) return
  }

  // Summary section: check internal scroll
  const summaryEl = cur_sec.value === 7 ? document.querySelector(".sec-summary") : null
  if (summaryEl) {
    const atTop = summaryEl.scrollTop <= 2
    const atBot = summaryEl.scrollTop + summaryEl.clientHeight >= summaryEl.scrollHeight - 4
    if (dy > 0 && !atBot) return
    if (dy < 0 && !atTop) return
  }

  // About section mobile: check internal scroll
  const aboutEl = cur_sec.value === 3 ? document.querySelector('.ab-body') : null
  if (aboutEl) {
    const atTop = aboutEl.scrollTop <= 2
    const atBot = aboutEl.scrollTop + aboutEl.clientHeight >= aboutEl.scrollHeight - 4
    if (dy > 0 && !atBot) return
    if (dy < 0 && !atTop) return
  }

  // Double-swipe required on ALL sections (mobile only)
  if (lastSwipeSec === cur_sec.value) {
    touchSwipeCount++
  } else {
    touchSwipeCount = 1
    lastSwipeSec = cur_sec.value
  }
  if (touchSwipeCount < 2) return
  touchSwipeCount = 0
  lastSwipeSec = -1

  if (dy > 40) next(); else if (dy < -40) prev()
}

function onKey(e) {
  if (['ArrowDown','PageDown'].includes(e.key)) { e.preventDefault(); next() }
  if (['ArrowUp','PageUp'].includes(e.key)) { e.preventDefault(); prev() }
}

const cur = reactive({ x:-200, y:-200 })
const curHover = ref(false)
function onMouse(e) {
  cur.x = e.clientX; cur.y = e.clientY
  curHover.value = !!(document.elementFromPoint(e.clientX,e.clientY)?.closest('a,button,.slrow,.slink,.ph-cta'))
}

const roles = ['UI/UX Designer', 'Frontend Developer']
const roleIdx = ref(0)
let roleTimer = null

function cycleRole() {
  roleIdx.value = (roleIdx.value + 1) % roles.length
}

const aud = ref(null)
const musicOn = ref(false)
const currentTrackIdx = ref(0)
const currentTrackTitle = computed(() => playlist[currentTrackIdx.value]?.title || '')
let musicPlayed = false

function loadTrack(idx) {
  if (!aud.value) return
  currentTrackIdx.value = idx
  aud.value.src = playlist[idx].src
  aud.value.volume = 0.6
}
function tryPlay() {
  if (!aud.value) return
  if (!aud.value.src || aud.value.src === window.location.href) loadTrack(0)
  aud.value.volume = 0.6
  aud.value.play().then(() => { musicOn.value = true }).catch(() => {})
}
function toggleMusic() {
  if (!aud.value) return
  if (musicOn.value) { aud.value.pause(); musicOn.value = false }
  else { aud.value.volume = 0.6; aud.value.play().then(() => { musicOn.value = true }).catch(() => {}) }
}
function onTrackEnded() {
  const next = (currentTrackIdx.value + 1) % playlist.length
  loadTrack(next)
  if (musicOn.value) {
    aud.value.play().catch(() => {})
  }
}

const actProj = ref(null), actCert = ref(null), ci = ref(0)
const hovP = ref(null), hovC = ref(null)
function openProj(p) { actProj.value = p }
function openCert(c) { actCert.value = c; ci.value = 0 }

const form = reactive({ name:'', email:'', message:'' })
const sending = ref(false)
const toast = reactive({ on:false, t:'ok', ttl:'', msg:'' })
function showToast(t,ttl,msg) {
  Object.assign(toast,{on:true,t,ttl,msg})
  setTimeout(() => { toast.on = false }, 4000)
}
async function send() {
  if (document.getElementById('hp')?.value) return
  if (!form.name||!form.email||!form.message) return
  sending.value = true
  try {
    await emailjs.send('service_d1bb4t2', 'template_whcrepp', {
      name: form.name,
      email: form.email,
      message: form.message,
      reply_to: form.email
    })
    showToast('ok', 'Message Sent!', "I'll get back to you as soon as possible.")
    Object.assign(form, {name:'', email:'', message:''})
  } catch(err) {
    console.error('EmailJS error:', err)
    showToast('err', 'Failed to Send', 'Something went wrong. Please try again or contact me directly.')
  } finally {
    sending.value = false
  }
}

const experiences = [
  {name:'INCIT',role:'Fullstack Developer',period:'Dec 2024 – Present'},
  {name:'Creloka',role:'Fullstack Developer',period:'Mar 2022 – Nov 2024'},
  {name:'Panggilin',role:'Frontend Developer',period:'Jun 2021 – Mar 2022'},
]

onMounted(() => {
  startLoad()
  window.addEventListener('mousemove', onMouse, {passive:true})
  window.addEventListener('keydown', onKey)
  const vp = vpRef.value
  if (vp) vp.addEventListener('wheel', onWheel, {passive:false})
  document.addEventListener('wheel', onWheel, {passive:false})
  // Disable pinch zoom on mobile
  document.addEventListener('gesturestart', e => e.preventDefault(), {passive:false})
  document.addEventListener('gesturechange', e => e.preventDefault(), {passive:false})
  document.addEventListener('gestureend', e => e.preventDefault(), {passive:false})
  document.addEventListener('touchmove', e => {
    if (e.touches.length > 1) e.preventDefault()
  }, {passive:false})
  roleTimer = setInterval(cycleRole, 2800)
})
onUnmounted(() => {
  cancelAnimationFrame(ldRaf)
  window.removeEventListener('mousemove', onMouse)
  window.removeEventListener('keydown', onKey)
  const vp = vpRef.value
  if (vp) vp.removeEventListener('wheel', onWheel)
  document.removeEventListener('wheel', onWheel)
  clearInterval(roleTimer)
})
</script>

<style>
:root{--dk:#1b1b1b;--lt:#e8e5df;--tx:#e8e5df;--txd:rgba(232,229,223,.42);--txdk:#1a1a1a;--acc:#289DF2;--bdr:rgba(232,229,223,.09);--bdl:rgba(26,26,26,.12);--ser:Georgia,'Times New Roman',serif;--san:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;font-family:var(--san);background:var(--dk);color:var(--tx);touch-action:pan-x pan-y;-ms-touch-action:pan-x pan-y}
*{touch-action:manipulation}
::selection{background:rgba(40,157,242,.18)}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-thumb{background:rgba(232,229,223,.15);border-radius:3px}
body{cursor:none}
@media(pointer:coarse){body{cursor:auto}}

.cur-ring{position:fixed;pointer-events:none;z-index:9998;width:30px;height:30px;border-radius:50%;border:1px solid rgba(232,229,223,.3);transform:translate(-50%,-50%);transition:width .15s,height .15s,border-color .15s,background .15s}
.cur-ring.chover{width:44px;height:44px;border-color:var(--acc);background:rgba(40,157,242,.05)}
.cur-dot{position:fixed;pointer-events:none;z-index:9999;width:4px;height:4px;border-radius:50%;background:var(--acc);transform:translate(-50%,-50%)}
@media(pointer:coarse){.cur-ring,.cur-dot{display:none}}

@font-face{font-family:'PolySans';src:url('/src/assets/fonts/polysanstrial-bulky.otf') format('opentype');font-weight:400;font-style:normal}
.loader{position:fixed;inset:0;z-index:9000;background:var(--dk);display:flex;align-items:center;justify-content:center}
.ld-prog{position:absolute;top:0;left:0;right:0;height:2px;background:rgba(232,229,223,.07)}
.ld-fill{height:100%;background:#fff;transition:width .04s linear}
.ld-cnt{display:flex;flex-direction:column;align-items:center;gap:1.2rem;text-align:center}
.ld-tag{font-size:.5rem;letter-spacing:7px;text-transform:uppercase;color:rgba(232,229,223,.2)}
.ld-name{font-family:'PolySans',var(--san);font-size:clamp(3rem,10vw,7rem);font-weight:400;color:var(--tx);letter-spacing:-.02em;line-height:1}
.ld-sub{font-size:.56rem;letter-spacing:3px;color:rgba(232,229,223,.2)}

.glitch-text{position:relative;display:inline-block}
.glitch-text::before,.glitch-text::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%}

/* ld-name: clean glitch, starts immediately, repeats every 2.5s */
.ld-name.glitch-text::before{color:#289DF2;animation:ldGlitchA 2.5s infinite;clip-path:polygon(0 10%,100% 10%,100% 38%,0 38%)}
.ld-name.glitch-text::after{color:#ff4d8d;animation:ldGlitchB 2.5s infinite;clip-path:polygon(0 58%,100% 58%,100% 82%,0 82%)}
@keyframes ldGlitchA{
  0%{transform:translate(-4px,0);opacity:1}
  4%{transform:translate(3px,0);opacity:1}
  8%{transform:none;opacity:0}
  40%{opacity:0}
  42%{transform:translate(-3px,1px);opacity:1}
  46%{transform:translate(4px,0);opacity:0}
  100%{opacity:0}
}
@keyframes ldGlitchB{
  0%{transform:translate(4px,0);opacity:1}
  4%{transform:translate(-3px,0);opacity:1}
  8%{transform:none;opacity:0}
  40%{opacity:0}
  42%{transform:translate(3px,-1px);opacity:1}
  46%{transform:translate(-4px,0);opacity:0}
  100%{opacity:0}
}

/* hlf/hls: periodic glitch every 4s */
.hlf.glitch-text::before,.hls.glitch-text::before{color:#289DF2;animation:glitchA 4s infinite;clip-path:polygon(0 15%,100% 15%,100% 40%,0 40%)}
.hlf.glitch-text::after,.hls.glitch-text::after{color:#ff4d8d;animation:glitchB 4s infinite;clip-path:polygon(0 55%,100% 55%,100% 78%,0 78%)}
@keyframes glitchA{
  0%,85%{transform:none;opacity:0}
  86%{transform:translate(-5px,1px);opacity:1}
  87%{transform:translate(4px,-2px);opacity:1}
  88%{transform:translate(-3px,2px);opacity:0}
  89%{transform:translate(5px,0);opacity:1}
  90%,100%{transform:none;opacity:0}
}
@keyframes glitchB{
  0%,87%{transform:none;opacity:0}
  88%{transform:translate(5px,-1px);opacity:1}
  89%{transform:translate(-4px,2px);opacity:1}
  90%{transform:translate(3px,-1px);opacity:0}
  91%{transform:translate(-5px,0);opacity:1}
  92%,100%{transform:none;opacity:0}
}

.hero-letters{display:flex;align-items:center;user-select:none}
.hlf,.hls{font-family:var(--ser);font-size:clamp(8rem,28vw,22rem);font-weight:400;color:var(--tx);line-height:.88;display:inline-block}
.hldot{width:clamp(14px,2.5vw,32px);height:clamp(14px,2.5vw,32px);border-radius:50%;background:var(--acc);flex-shrink:0;margin:0 clamp(3px,.6vw,8px);align-self:flex-end;margin-bottom:clamp(8px,1.8vw,24px)}

.sec-hero{height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}

.fp-wrap{position:fixed;inset:0;display:flex;flex-direction:column}
.bar{position:fixed;top:0;left:0;right:0;z-index:800;display:flex;align-items:center;justify-content:space-between;padding:.85rem 4%;font-size:.58rem;letter-spacing:1.5px;color:rgba(232,229,223,.38);transition:color .35s,background .35s}
.bar.blight{color:rgba(26,26,26,.6)}
.bar.blight .bmdot{background:rgba(26,26,26,.25)}
.bar.blight .bmdot.bmon{background:var(--acc)}
.bar-music{display:flex;align-items:center;gap:.4rem;background:none;border:none;color:inherit;font-size:inherit;letter-spacing:inherit;cursor:none;font-family:inherit}
@media(pointer:coarse){.bar-music{cursor:pointer}}
.bmdot{width:6px;height:6px;border-radius:50%;background:rgba(232,229,223,.2);transition:all .3s;flex-shrink:0}
.bmdot.bmon{background:var(--acc);box-shadow:0 0 6px rgba(40,157,242,.5)}
.bmbars{display:flex;align-items:flex-end;gap:1.5px;height:10px;margin-left:2px}
.bmbars i{display:block;width:2px;background:var(--acc);border-radius:2px;animation:mbar 1s ease-in-out infinite}
.bmbars i:nth-child(2){animation-delay:.18s}.bmbars i:nth-child(3){animation-delay:.36s}
@keyframes mbar{0%,100%{height:3px}50%{height:10px}}

.dots-nav{position:fixed;right:1.6rem;top:50%;transform:translateY(-50%);z-index:801;display:flex;flex-direction:column;gap:.55rem}
.dnav-dot{width:6px;height:6px;border-radius:50%;border:none;background:rgba(232,229,223,.2);cursor:none;transition:all .3s;padding:0}
@media(pointer:coarse){.dnav-dot{cursor:pointer;width:8px;height:8px}}
.dnav-dot.active{background:var(--acc);transform:scale(1.4)}
.dots-nav.blight .dnav-dot{background:rgba(26,26,26,.22)}
.dots-nav.blight .dnav-dot.active{background:var(--acc)}

.mob-nav{display:none}
@media(pointer:coarse){
  .mob-nav{display:flex;flex-direction:column;gap:.4rem;position:fixed;right:1rem;bottom:6rem;z-index:802;align-items:center}
  .mob-nav-btn{width:38px;height:38px;border-radius:50%;border:1px solid rgba(232,229,223,.22);background:rgba(20,20,20,.65);backdrop-filter:blur(8px);color:rgba(232,229,223,.75);font-size:.72rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;-webkit-tap-highlight-color:transparent}
  .mob-nav-btn:active{transform:scale(.9)}
  .mob-nav-btn:not(.disabled){border-color:rgba(232,229,223,.3);color:rgba(232,229,223,.9)}
  .mob-nav-btn.disabled{opacity:.2;pointer-events:none}
}

.fp-viewport{flex:1;position:relative;overflow:hidden;touch-action:pan-y}
.fp-slider{position:relative;width:100%;height:100%}
.fp-slide{position:absolute;inset:0;overflow:hidden}
.bg-dk{background:var(--dk)}
.bg-lt{background:var(--lt)}

.slide-down-enter-active,.slide-down-leave-active,
.slide-up-enter-active,.slide-up-leave-active{transition:transform .75s cubic-bezier(.77,0,.18,1),opacity .5s ease}
.slide-down-enter-from{transform:translateY(100%);opacity:.7}
.slide-down-leave-to{transform:translateY(-100%);opacity:.7}
.slide-up-enter-from{transform:translateY(-100%);opacity:.7}
.slide-up-leave-to{transform:translateY(100%);opacity:.7}
.slide-down-enter-to,.slide-down-leave-from,.slide-up-enter-to,.slide-up-leave-from{transform:translateY(0);opacity:1}

.cue{position:absolute;bottom:7%;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;font-size:.5rem;letter-spacing:5px;color:rgba(232,229,223,.2);pointer-events:none}
.cue-m{width:16px;height:28px;border:1px solid rgba(232,229,223,.16);border-radius:18px;display:flex;align-items:flex-start;justify-content:center;padding-top:4px}
.cue-d{width:3px;height:3px;background:var(--acc);border-radius:50%;animation:cscr 1.8s ease-in-out infinite}
@keyframes cscr{0%{transform:translateY(0);opacity:1}75%{transform:translateY(11px);opacity:0}100%{transform:translateY(0);opacity:0}}

.swipe-cue{display:none;position:absolute;bottom:7%;left:50%;transform:translateX(-50%);flex-direction:column;align-items:center;gap:6px;pointer-events:none}
@media(pointer:coarse){.cue{display:none}.swipe-cue{display:flex}}
.swipe-arrows{display:flex;flex-direction:column;align-items:center;gap:2px}
.sw-arr{font-size:1rem;color:var(--acc);display:block;line-height:1}
.sw-arr1{animation:swpulse 1.6s ease-in-out infinite}
.sw-arr2{animation:swpulse 1.6s ease-in-out infinite .28s}
@keyframes swpulse{0%,100%{opacity:.15;transform:translateY(4px)}50%{opacity:.9;transform:translateY(0)}}
.swipe-lbl{font-size:.44rem;letter-spacing:5px;text-transform:uppercase;color:rgba(232,229,223,.2);margin-top:4px}

.ldfade-leave-active{transition:opacity .45s,transform .45s}
.ldfade-leave-to{opacity:0;transform:scale(1.03)}

.sec-intro{height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
.ilines{display:flex;flex-direction:column;align-items:flex-start;padding:0 5%;gap:.5rem;width:100%;max-width:1100px;margin:0 auto;flex-shrink:0}
.il{font-family:var(--ser);font-size:clamp(2rem,6.5vw,6.5rem);font-weight:400;color:var(--tx);line-height:1.1;white-space:nowrap}
@media(max-width:600px){.il{white-space:normal;font-size:clamp(1.9rem,8.5vw,3.5rem)}}
.il-role{display:flex;align-items:center;gap:.22em;white-space:nowrap}
@media(max-width:600px){.il-role{white-space:nowrap;overflow:hidden}}
.role-wrap{display:inline-block;font-style:italic;font-family:var(--ser);font-size:clamp(2rem,6.5vw,6.5rem);font-weight:400;line-height:1.1;white-space:nowrap}
@media(max-width:600px){.role-wrap{font-size:clamp(1.6rem,7.5vw,3rem)}}
.role-blur{display:inline-block;color:var(--acc);white-space:nowrap;animation:blurIn .55s ease forwards}
@keyframes blurIn{
  0%{filter:blur(12px);opacity:0}
  100%{filter:blur(0);opacity:1}
}

.sec-photo{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;padding:4rem 2rem 2rem;gap:1.5rem}
.ph-img-wrap{width:min(320px,82vw);aspect-ratio:3/4;border-radius:20px;overflow:hidden;border:1px solid var(--bdr);flex-shrink:0}
.ph-img-wrap img{width:100%;height:100%;object-fit:cover;filter:grayscale(15%)}
.ph-img-info{text-align:center}
.ph-img-name{font-family:var(--ser);font-size:clamp(1.6rem,7vw,2.4rem);font-weight:400;color:var(--tx);letter-spacing:-1px;margin-top:.5rem}
.sec-about{height:100%;display:flex;flex-direction:column;overflow:hidden;position:relative}
.sec-photo{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;padding:4rem 2rem 2rem;gap:1.5rem}
.ph-img-wrap{width:min(320px,82vw);aspect-ratio:3/4;border-radius:20px;overflow:hidden;border:1px solid var(--bdr);flex-shrink:0}
.ph-img-wrap img{width:100%;height:100%;object-fit:cover;filter:grayscale(15%)}
.ph-img-info{text-align:center}
.ph-img-name{font-family:var(--ser);font-size:clamp(1.6rem,7vw,2.4rem);font-weight:400;color:var(--tx);letter-spacing:-1px;margin-top:.5rem}
.ab-marq{overflow:hidden;position:absolute;bottom:0;left:0;right:0;padding:.5rem 0;z-index:1;pointer-events:none}
.ab-track{display:flex;width:max-content;animation:marq 22s linear infinite}
.ab-track span{font-family:var(--ser);font-size:clamp(2rem,4vw,3.8rem);color:rgba(232,229,223,.04);white-space:nowrap;padding:0 1.5rem;font-weight:400}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.ab-body{flex:1;display:grid;grid-template-columns:300px 1fr;gap:4rem;align-items:center;max-width:1200px;margin:0 auto;padding:4rem 5% 3rem;width:100%;overflow:visible}
.ab-photo{aspect-ratio:3/4;border-radius:16px;overflow:hidden;border:1px solid var(--bdr);flex-shrink:0;min-height:0}
.ab-photo img{width:100%;height:100%;object-fit:cover;filter:grayscale(15%)}
.ab-txt{overflow:visible;min-width:0}
.ab-tag{font-size:.52rem;letter-spacing:6px;text-transform:uppercase;color:var(--acc);display:block;margin-bottom:1rem}
.ab-name{font-family:var(--ser);font-size:clamp(2.2rem,3.8vw,3.8rem);font-weight:400;color:var(--tx);letter-spacing:-2px;line-height:1.05;margin-bottom:1rem;white-space:nowrap;overflow:visible}
.ab-fn{display:inline}
.ab-ln{display:inline}
.ab-bio{font-size:clamp(.82rem,1.1vw,.95rem);line-height:1.85;color:var(--txd);margin-bottom:1rem;text-align:justify}
.ab-bio strong{color:var(--tx)}
blockquote{border-left:2px solid var(--acc);padding:.35rem .8rem;font-style:italic;color:rgba(232,229,223,.3);font-size:.82rem;margin-bottom:0;flex:1;min-width:0}
.ab-stats{display:flex;gap:2rem;align-items:flex-start}
.ab-bottom{display:flex;align-items:center;gap:2rem;margin-top:1rem}
.ast{display:flex;flex-direction:column;flex-shrink:0}
.astn{font-family:var(--ser);font-size:2rem;font-weight:400;color:var(--tx);letter-spacing:-1px;line-height:1}
.astl{font-size:.46rem;letter-spacing:3px;text-transform:uppercase;color:rgba(232,229,223,.26);margin-top:.2rem}
@media(max-width:900px){
  .ab-body{grid-template-columns:220px 1fr;gap:2.5rem;padding:3.5rem 5% 2.5rem}
  .ab-name{font-size:clamp(1.8rem,3.5vw,3rem)}
}
@media(max-width:700px){
  .ab-body{grid-template-columns:1fr;padding:5rem 5% 4rem;gap:1.2rem;overflow-y:auto;align-items:flex-start;height:100%}
  .ab-photo{display:none}
  .ab-name{font-size:clamp(2rem,9vw,3.5rem);letter-spacing:-1.5px;white-space:normal}
  .ab-bio{font-size:.9rem;text-align:left}
  .ab-bottom{flex-direction:column;align-items:flex-start;gap:.8rem}
  blockquote{font-size:.78rem}
  .ab-stats{gap:1.8rem}
  .astn{font-size:2.2rem}
  .ab-tag{margin-bottom:.6rem}
}

.sec-list{height:100%;display:flex;align-items:center;overflow:hidden;position:relative}
.sl-inner{max-width:1100px;margin:0 auto;padding:0 5%;width:100%;overflow:hidden}
@media(max-width:700px){.sec-list{align-items:flex-start}.sl-inner{padding-top:5rem}}
.slhd{margin-bottom:1.6rem}
.slh2{font-family:var(--ser);font-size:clamp(1.8rem,4.5vw,4rem);font-weight:400;color:var(--tx);letter-spacing:-2px}
.slh2-dk{color:var(--txdk)}
.sltag{font-size:.52rem;letter-spacing:6px;text-transform:uppercase;color:rgba(232,229,223,.3);display:block;margin-bottom:.6rem}
.sltag-lt{color:rgba(26,26,26,.3)}
.slrows{border-top:1px solid var(--bdr);max-height:calc(100vh - 260px);overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none;touch-action:pan-y}
.slrows::-webkit-scrollbar{display:none}
.slrows-lt{border-top-color:var(--bdl)}
.scroll-hint{text-align:center;padding:.5rem 0;font-size:.52rem;letter-spacing:3px;text-transform:uppercase;color:rgba(232,229,223,.18);animation:blink 2s ease-in-out infinite}
.scroll-hint-lt .scroll-hint,.scroll-hint-lt{text-align:center;padding:.5rem 0;font-size:.52rem;letter-spacing:3px;text-transform:uppercase;color:rgba(26,26,26,.22);animation:blink 2s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:.4}50%{opacity:1}}
.slrow{display:grid;grid-template-columns:40px 1fr auto 22px;align-items:center;gap:1.2rem;padding:.95rem 0;border-bottom:1px solid var(--bdr);cursor:none;transition:padding-left .2s;animation:rowIn .55s both;min-width:0}
.slrow-lt{border-bottom-color:var(--bdl);cursor:none}
@media(pointer:coarse){.slrow{cursor:pointer}.slrow-lt{cursor:pointer}}
.slrow:hover{padding-left:.5rem}
@keyframes rowIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.slrn{font-size:.6rem;color:rgba(232,229,223,.22);letter-spacing:2px}
.slrn-lt{color:rgba(26,26,26,.24)}
.slrt{font-family:var(--ser);font-size:clamp(.85rem,1.8vw,1.4rem);color:var(--tx);font-weight:400}
.slrt-dk{color:var(--txdk)}
.slrc{font-size:.54rem;letter-spacing:2px;text-transform:uppercase;color:rgba(232,229,223,.25)}
.slrc-lt{color:rgba(26,26,26,.28)}
.slrd{font-size:.54rem;color:rgba(232,229,223,.3);white-space:nowrap}
.slra{font-size:.82rem;color:rgba(232,229,223,.14);transition:transform .2s,color .2s}
.slra-dk{color:rgba(26,26,26,.18)}
.slrow:hover .slra{transform:translateX(4px);color:var(--tx)}
.slrow-lt:hover .slra{color:var(--txdk)}
.slrow-dk{grid-template-columns:1fr auto auto 22px}
.imgf{position:fixed;width:180px;height:120px;border-radius:10px;overflow:hidden;pointer-events:none;z-index:700;opacity:0;transform:scale(.9);transition:opacity .2s,transform .2s}
.imgf.ifon{opacity:1;transform:scale(1)}
.imgf img{width:100%;height:100%;object-fit:cover}
@media(max-width:860px){.slrow{grid-template-columns:32px 1fr 18px}.slrc{display:none}.slrow-dk{grid-template-columns:1fr auto 18px}.imgf{display:none}}

.tgrid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--bdr);border:1px solid var(--bdr);border-radius:12px;overflow:hidden;margin-top:.6rem}
.tcell{background:rgba(255,255,255,.03);transition:background .2s;cursor:default;overflow:hidden;position:relative}
.tcell:hover{background:rgba(255,255,255,.06)}
.tcell:hover .tcell-inner{transform:translateY(-4px)}
.tcell::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--acc);transform:scaleX(0);transition:transform .3s cubic-bezier(.16,1,.3,1)}
.tcell:hover::after{transform:scaleX(1)}
.tcell img{width:44px;height:44px;object-fit:contain}
.tcn{font-size:.82rem;font-weight:600;color:var(--tx)}
.tcc{font-size:.5rem;letter-spacing:2px;text-transform:uppercase;color:var(--txd)}
.tcell-inner{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;padding:2.6rem 1.2rem;text-align:center;transition:transform .35s cubic-bezier(.16,1,.3,1)}
@media(max-width:1024px){.tgrid{grid-template-columns:repeat(4,1fr)}}
@media(max-width:600px){.tgrid{grid-template-columns:repeat(3,1fr)}.tcell-inner{padding:1.4rem .6rem}.tcell img{width:28px;height:28px}}
.sec-phrase{height:100%;display:flex;align-items:center;overflow:hidden}
.ph-inner{max-width:1100px;margin:0 auto;padding:0 5%;width:100%}
.phsm{font-size:clamp(.8rem,.9vw,.95rem);color:var(--txd);margin-bottom:1rem;letter-spacing:.5px}
.phbig{font-family:var(--ser);font-size:clamp(3rem,8vw,8rem);font-weight:400;color:var(--tx);letter-spacing:-3px;line-height:1.02;margin-bottom:2.5rem}
.ph-cta{display:inline-flex;align-items:center;gap:.8rem;border:1px solid rgba(232,229,223,.12);padding:.7rem 1.6rem;border-radius:2px;cursor:none;transition:all .3s}
@media(pointer:coarse){.ph-cta{cursor:pointer}}
.ph-cta:hover{border-color:var(--acc);color:var(--acc)}
.ph-cta span:first-child{font-size:.65rem;letter-spacing:3px;text-transform:uppercase;color:var(--txd);transition:color .3s}
.ph-cta:hover span:first-child{color:var(--acc)}
.ph-arr{font-size:.9rem;color:rgba(232,229,223,.25);transition:transform .3s,color .3s}
.ph-cta:hover .ph-arr{transform:translateY(3px);color:var(--acc)}

.sec-summary{height:100%;display:flex;align-items:flex-start;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-top:0}
.sec-summary .sl-inner{padding-top:5rem;padding-bottom:3rem}
.sum-hd{margin-bottom:2.5rem}
.sum-lbl{font-size:clamp(1.1rem,2vw,1.6rem);font-weight:700;color:var(--tx);text-decoration:underline;text-underline-offset:5px;margin-bottom:.9rem;display:block;font-family:var(--san)}
.sum-name{font-family:var(--san);font-size:clamp(2.2rem,5.5vw,5.5rem);font-weight:800;color:var(--tx);letter-spacing:-.04em;line-height:1;margin-bottom:.5rem;white-space:nowrap}
@media(max-width:900px){.sum-name{font-size:clamp(2rem,6vw,4rem);white-space:normal;line-height:.95}}
@media(max-width:700px){.sum-name{font-size:clamp(1.9rem,8vw,3.2rem);line-height:1;white-space:normal}}
.sum-role{font-size:.82rem;color:var(--txd);margin-bottom:.9rem}
.sum-bio{font-size:clamp(.85rem,1.2vw,.95rem);line-height:1.85;color:var(--txd);max-width:100%;text-align:justify}
.sum-cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2.5rem 3rem;border-top:1px solid var(--bdr);padding-top:2.5rem;margin-top:2.5rem}
@media(max-width:900px){.sum-cols{grid-template-columns:1fr 1fr;gap:2rem 2.5rem}}
@media(max-width:700px){.sum-cols{grid-template-columns:1fr;gap:2rem}}
.scolh{font-family:var(--ser);font-size:1rem;font-weight:400;color:var(--tx);margin-bottom:.85rem;padding-bottom:.45rem;border-bottom:1px solid var(--bdr)}
.sitems{display:flex;flex-direction:column;gap:.75rem}
.sitem{padding-bottom:.65rem;border-bottom:1px solid rgba(232,229,223,.04)}
.simt{font-size:.82rem;color:var(--tx);margin-bottom:.18rem;display:flex;align-items:center;gap:.3rem}
.simt i{font-size:.54rem;color:var(--acc);opacity:.5}
.simd{display:flex;flex-wrap:wrap;gap:.22rem;font-size:.68rem;color:var(--txd)}
.sdot{color:rgba(232,229,223,.18)}
.slink{cursor:none;transition:padding-left .17s}
@media(pointer:coarse){.slink{cursor:pointer}}
.slink:hover{padding-left:.3rem}
.slink:hover .simt{color:var(--acc)}

.sec-contact{height:100%;display:flex;align-items:center;justify-content:center;overflow-y:auto;-webkit-overflow-scrolling:touch}
.ct-inner{padding:4rem 5%;max-width:680px;width:100%}
@media(max-width:700px){.sec-contact{align-items:flex-start}.ct-inner{padding:5rem 5% 3rem}}
.cthd{margin-bottom:2rem;text-align:center}
.ctag{font-size:.52rem;letter-spacing:6px;text-transform:uppercase;color:var(--acc);display:block;margin-bottom:.7rem}
.cttitle{font-family:var(--ser);font-size:clamp(2rem,5vw,4.5rem);font-weight:400;color:var(--tx);letter-spacing:-3px;line-height:1.04;margin:.65rem 0 .9rem}
.cttitle em{font-style:italic;color:var(--acc)}
.ctsub{font-size:.88rem;line-height:1.8;color:var(--txd)}
.ctform{display:flex;flex-direction:column;gap:1.2rem;border-top:1px solid var(--bdr);padding-top:2rem}
.cfrow{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}
@media(max-width:600px){.cfrow{grid-template-columns:1fr}}
.cff{display:flex;flex-direction:column;gap:.3rem}
.cff label{font-size:.5rem;letter-spacing:4px;text-transform:uppercase;color:rgba(232,229,223,.22)}
.cff input,.cff textarea{width:100%;padding:.72rem 0;background:transparent;border:none;border-bottom:1px solid rgba(232,229,223,.1);color:var(--tx);font-family:inherit;font-size:.9rem;outline:none;transition:border-color .3s;cursor:none}
@media(pointer:coarse){.cff input,.cff textarea{cursor:text}}
.cff input:focus,.cff textarea:focus{border-bottom-color:var(--acc)}
.cff input::placeholder,.cff textarea::placeholder{color:rgba(232,229,223,.13)}
.cff textarea{resize:none;min-height:100px}
.cfbtn{align-self:flex-start;display:inline-flex;align-items:center;justify-content:center;gap:.65rem;min-width:180px;padding:.7rem 1.6rem;background:transparent;border:1px solid rgba(232,229,223,.12);border-radius:2px;color:var(--tx);font-family:inherit;font-size:.66rem;letter-spacing:3px;text-transform:uppercase;cursor:none;transition:all .3s;margin-top:.2rem}
@media(pointer:coarse){.cfbtn{cursor:pointer}}
.cfbtn:hover:not(:disabled){border-color:var(--acc);color:var(--acc);background:rgba(40,157,242,.04)}
.cfbtn:disabled{opacity:.5}
.cfbtn i{font-size:.7rem;transition:transform .3s}
.cfbtn:hover:not(:disabled) i{transform:translateX(4px)}
.ctfoot{margin-top:2.5rem;padding-top:1.2rem;border-top:1px solid var(--bdr);display:flex;justify-content:center;font-size:.6rem;color:rgba(232,229,223,.16);letter-spacing:.8px}

.overlay{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.92);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:0}
.mbox-full{position:relative;width:100%;height:100%;display:flex;overflow:hidden}
@media(max-width:700px){.mbox-full{flex-direction:column}}
.mbox-cert{flex-direction:row}
@media(max-width:700px){.mbox-cert{flex-direction:column}}
.mf-top{flex:1;background:#0d0d0d;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3.5rem 3rem 2rem;overflow:hidden;min-height:0}
.mf-top img{max-width:100%;width:auto;border-radius:10px;object-fit:contain;max-height:calc(100% - 4rem);flex:1;min-height:0}
.mf-top .cert-nav{margin-top:1rem;margin-bottom:0;align-self:center}
@media(max-width:700px){
  .mf-top{flex:none;height:60vh;padding:3.2rem 1.2rem 1.2rem}
  .mf-top img{max-height:calc(100% - 3.5rem);width:100%;object-fit:contain;flex:1}
}
.mf-bot{flex-shrink:0;padding:1.4rem 2rem;border-top:1px solid rgba(232,229,223,.07);background:#111;display:flex;flex-direction:column;gap:.4rem}
@media(min-width:701px){.mf-bot{width:260px;flex-shrink:0;padding:3.5rem 1.8rem;border-top:none;border-left:1px solid rgba(232,229,223,.07);height:100%;overflow-y:auto;gap:.9rem;justify-content:center}}
.mf-bot .mf-tag{font-size:.46rem;letter-spacing:5px;text-transform:uppercase;color:var(--acc);display:block}
.mf-bot h2{font-family:var(--ser);font-size:clamp(.9rem,1.6vw,1.3rem);font-weight:400;color:var(--tx);line-height:1.3;margin:0}
@media(max-width:700px){.mf-bot h2{font-size:.95rem}}
.mf-bot p{font-size:.72rem;color:var(--txd);margin:0;line-height:1.5}
.mf-date{font-size:.66rem;color:var(--acc)}
.mclose{position:fixed;top:1rem;right:1rem;z-index:1100;background:rgba(15,15,15,.9);border:1px solid rgba(232,229,223,.14);color:var(--tx);width:34px;height:34px;border-radius:50%;cursor:none;font-size:.82rem;display:flex;align-items:center;justify-content:center;transition:all .3s}
@media(pointer:coarse){.mclose{cursor:pointer}}
.mclose:hover{background:var(--acc);border-color:var(--acc)}
.mf-left{flex:1.2;background:#0d0d0d;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem 3rem;overflow-y:auto;-webkit-overflow-scrolling:touch}
.mf-left img{max-width:100%;border-radius:10px;object-fit:contain;max-height:80vh}
@media(max-width:700px){.mf-left{flex:none;height:55vh;padding:3rem 1.5rem}}
.mf-right{width:300px;flex-shrink:0;padding:4.5rem 2rem;border-left:1px solid rgba(232,229,223,.06);display:flex;flex-direction:column;gap:1rem;overflow-y:auto;-webkit-overflow-scrolling:touch}
@media(max-width:700px){.mf-right{width:100%;flex:none;height:45vh;border-left:none;border-top:1px solid rgba(232,229,223,.06);padding:1.5rem}}
.mf-tag{font-size:.48rem;letter-spacing:5px;text-transform:uppercase;color:var(--acc)}
.mf-right h2{font-family:var(--ser);font-size:clamp(1.2rem,2.2vw,1.8rem);font-weight:400;color:var(--tx);line-height:1.2}
.mf-right p{font-size:.8rem;line-height:1.7;color:var(--txd)}
.mf-role{margin-top:.5rem}
.mf-role small{font-size:.48rem;letter-spacing:4px;text-transform:uppercase;color:var(--acc);display:block;margin-bottom:.12rem}
.mf-role span{font-size:.78rem;color:rgba(232,229,223,.5)}
.mf-tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem}
.mf-tags span{font-size:.52rem;padding:.14rem .52rem;border:1px solid rgba(232,229,223,.12);border-radius:18px;color:var(--acc)}
.cert-nav{display:flex;align-items:center;gap:.8rem;margin-bottom:1rem;align-self:flex-start}
.cert-nav button{background:none;border:1px solid rgba(232,229,223,.12);color:var(--tx);width:30px;height:30px;border-radius:50%;cursor:none;transition:all .3s;display:flex;align-items:center;justify-content:center}
@media(pointer:coarse){.cert-nav button{cursor:pointer}}
.cert-nav button:disabled{opacity:.3}
.cert-nav span{font-size:.72rem;color:var(--txd)}
.mfade-enter-active,.mfade-leave-active{transition:opacity .22s}
.mfade-enter-from,.mfade-leave-to{opacity:0}

.notif-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:1.5rem}
.notif-card{background:rgba(20,20,20,.92);border:1px solid rgba(232,229,223,.12);border-radius:20px;padding:2.2rem 2rem;max-width:380px;width:100%;display:flex;flex-direction:column;align-items:center;gap:1.4rem;position:relative;box-shadow:0 24px 60px rgba(0,0,0,.6)}
.notif-close{position:absolute;top:.9rem;right:.9rem;width:32px;height:32px;background:rgba(232,229,223,.07);border:1px solid rgba(232,229,223,.12);border-radius:50%;color:rgba(232,229,223,.5);font-size:.72rem;cursor:none;display:flex;align-items:center;justify-content:center;transition:all .25s}
@media(pointer:coarse){.notif-close{cursor:pointer}}
.notif-close:hover{background:var(--acc);border-color:var(--acc);color:#fff;transform:rotate(90deg)}
.notif-icon{width:76px;height:76px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(40,157,242,.1);border:3px solid var(--acc);position:relative;flex-shrink:0}
.notif-icon::before{content:'';position:absolute;width:100%;height:100%;border-radius:50%;border:3px solid var(--acc);animation:notifPulse 1.6s ease-out infinite}
@keyframes notifPulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.55);opacity:0}}
.notif-icon i{font-size:2rem;color:var(--acc)}
.notif-icon.error{background:rgba(255,77,77,.1);border-color:#ff4d4d}
.notif-icon.error::before{border-color:#ff4d4d}
.notif-icon.error i{color:#ff4d4d}
.notif-msg{text-align:center}
.notif-msg h4{font-size:1.3rem;font-weight:700;color:var(--tx);margin-bottom:.4rem;font-family:var(--san)}
.notif-msg p{font-size:.85rem;color:var(--txd);line-height:1.65}
.notif-fade-enter-active,.notif-fade-leave-active{transition:opacity .3s,transform .3s}
.notif-fade-enter-from,.notif-fade-leave-to{opacity:0}
.notif-fade-enter-from .notif-card,.notif-fade-leave-to .notif-card{transform:scale(.9)}
.notif-fade-enter-to .notif-card,.notif-fade-leave-from .notif-card{transform:scale(1)}

</style>