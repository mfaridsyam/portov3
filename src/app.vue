<template>
  <div class="cur-ring" :class="{chover:curHover}" :style="{left:cur.x+'px',top:cur.y+'px'}"></div>
  <div class="cur-dot" :style="{left:cur.x+'px',top:cur.y+'px'}"></div>

  <Transition name="ldfade">
    <div v-if="loading" class="loader">
      <div class="ld-prog"><div class="ld-fill" :style="{width:ldPct+'%'}"></div></div>
      <div class="ld-cnt">
        <span class="ld-tag">LOADING</span>
        <div class="ld-num">{{ Math.floor(ldPct) }}<em>%</em></div>
        <span class="ld-sub">UI/UX Designer &amp; Frontend Developer</span>
      </div>
    </div>
  </Transition>

  <div v-if="!loading" class="fp-wrap">
    <header class="bar" :class="{blight: LIGHT_SECS.includes(cur_sec)}">
      <span class="bar-l">M. Farid Syam</span>
      <button class="bar-music" @click="toggleMusic">
        <span class="bmdot" :class="{bmon: musicOn}"></span>
        <span>BOO – H3ADBAND</span>
        <span v-if="musicOn" class="bmbars"><i></i><i></i><i></i></span>
      </button>
      <audio ref="aud" :src="booSrc" loop preload="auto"></audio>
    </header>

    <nav class="dots-nav" :class="{blight: LIGHT_SECS.includes(cur_sec)}">
      <button v-for="(s,i) in SECTIONS" :key="s.id"
        class="dnav-dot" :class="{active: cur_sec===i}"
        @click="goTo(i)" :title="s.label">
      </button>
    </nav>

    <div class="fp-viewport" ref="vpRef"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd">
      <TransitionGroup :name="txName" tag="div" class="fp-slider">

        <div v-show="cur_sec===0" key="hero" class="fp-slide bg-dk">
          <div class="sec-hero">
            <div class="hero-letters">
              <span class="hlf">F</span>
              <span class="hldot"></span>
              <span class="hls">S</span>
            </div>
            <div class="cue">
              <div class="cue-m"><div class="cue-d"></div></div>
              <span>SCROLL DOWN</span>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===1" key="intro" class="fp-slide bg-dk">
          <div class="sec-intro">
            <div class="ilines">
              <div class="il">Let Me Introduce</div>
              <div class="il">My Self</div>
              <div class="il il-role">As <span class="role-wrap"><span v-for="(ch, ci) in padded" :key="ci" class="role-ch" :class="{settled: ch.settled, inactive: !ch.active}">{{ ch.display }}</span></span></div>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===2" key="about" class="fp-slide bg-dk">
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
                <h2 class="ab-name"><span class="ab-fn">Muhammad</span><span class="ab-ln">Farid Syam</span></h2>
                <p class="ab-bio">I'm a <strong>UI/UX Designer</strong> and <strong>Frontend Developer</strong> based in West Sulawesi, Indonesia. I'm a tech-savvy designer who loves building things for the web. With a solid foundation in Informatics Engineering, I spend my time mastering Figma and JavaScript. Currently, I'm diving deeper into the Vue.js ecosystem to build even better user experiences.</p>
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

        <div v-show="cur_sec===3" key="work" class="fp-slide bg-lt">
          <div class="sec-list">
            <div class="sl-inner">
              <div class="slhd">
                <span class="sltag sltag-lt">SELECTED WORK</span>
                <h2 class="slh2 slh2-dk">Projects</h2>
              </div>
              <div class="slrows slrows-lt" ref="workListRef">
                <div v-for="(p,j) in projects" :key="p.title"
                  class="slrow slrow-lt" :style="{animationDelay: j*0.04+'s'}"
                  @click="openProj(p)" @mouseenter="hovP=p" @mouseleave="hovP=null">
                  <span class="slrn slrn-lt">{{ String(j+1).padStart(2,'0') }}</span>
                  <span class="slrt slrt-dk">{{ p.title }}</span>
                  <span class="slrc slrc-lt">{{ p.badges[0] }}</span>
                  <span class="slra slra-lt">—</span>
                </div>
              </div>
              <div class="scroll-hint-lt">
                <span>↓ scroll</span>
              </div>
            </div>
            <div class="imgf" :class="{ifon:hovP}" :style="{left:cur.x+20+'px',top:cur.y-60+'px'}">
              <img v-if="hovP" :src="hovP.image"/>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===4" key="certs" class="fp-slide bg-dk">
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

        <div v-show="cur_sec===5" key="tech" class="fp-slide bg-lt">
          <div class="sec-list">
            <div class="sl-inner">
              <div class="slhd">
                <span class="sltag sltag-lt">TECH STACK</span>
                <h2 class="slh2 slh2-dk">Tools &amp; Skills</h2>
              </div>
              <div class="tgrid">
                <div v-for="t in techStack" :key="t.name" class="tcell">
                  <div class="tcell-inner">
                    <img :src="t.iconLight" :alt="t.name"/>
                    <span class="tcn">{{ t.name }}</span>
                    <span class="tcc">{{ t.category }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="cur_sec===6" key="phrase" class="fp-slide bg-dk">
          <div class="sec-phrase">
            <div class="ph-inner">
              <p class="phsm">Dont Be Shy,</p>
              <h2 class="phbig">Make The First<br>Move.</h2>
              <div class="ph-cta" @click="goTo(8)">
                <span>Get In Touch</span>
                <span class="ph-arr">↓</span>
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
                <p class="sum-bio">I'm a tech-savvy designer who loves building things for the web. Mastering Figma and the Vue.js ecosystem to create better user experiences.</p>
              </div>
              <div class="sum-cols">
                <div class="scol">
                  <h3 class="scolh">Education</h3>
                  <div class="sitems">
                    <div class="sitem">
                      <div class="simt">Informatics Engineering</div>
                      <div class="simd"><span>Universitas Al Asyariah Mandar</span><span class="sdot">·</span><span>3.53/4.00</span></div>
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

        <div v-show="cur_sec===8" key="contact" class="fp-slide bg-dk">
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
                <span>Made with <span style="color:#e55">♥</span> in Makassar</span>
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
              <div v-if="actCert.images.length>1" class="cert-nav">
                <button @click="ci=Math.max(0,ci-1)" :disabled="ci===0"><i class="fas fa-chevron-left"></i></button>
                <span>{{ ci+1 }} / {{ actCert.images.length }}</span>
                <button @click="ci=Math.min(actCert.images.length-1,ci+1)" :disabled="ci===actCert.images.length-1"><i class="fas fa-chevron-right"></i></button>
              </div>
              <img :src="actCert.images[ci]" :alt="actCert.title"/>
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
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { projects, certificates, techStack, playlist } from '@/data/index.js'
import emailjs from '@emailjs/browser'

const yr = new Date().getFullYear()

const SECTIONS = [
  {id:'hero',    label:'Hero'},
  {id:'intro',   label:'Intro'},
  {id:'about',   label:'About'},
  {id:'work',    label:'Projects'},
  {id:'certs',   label:'Certificates'},
  {id:'tech',    label:'Tools'},
  {id:'phrase',  label:'Move'},
  {id:'summary', label:'Summary'},
  {id:'contact', label:'Contact'},
]
const LIGHT_SECS = [3, 5]

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
  txName.value = idx > cur_sec.value ? 'slide-down' : 'slide-up'
  going.value = true
  cur_sec.value = idx
  if (!musicPlayed && idx >= 1) { musicPlayed = true; tryPlay() }
  setTimeout(() => { going.value = false }, 820)
}

function next() { if (cur_sec.value < SECTIONS.length-1) goTo(cur_sec.value+1) }
function prev() { if (cur_sec.value > 0) goTo(cur_sec.value-1) }

function getScrollableEl() {
  if (cur_sec.value === 3 && workListRef.value) return workListRef.value
  if (cur_sec.value === 4 && certListRef.value) return certListRef.value
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
  wheelAcc += e.deltaY
  clearTimeout(wheelTimer)
  wheelTimer = setTimeout(() => { wheelAcc = 0 }, 150)
  if (Math.abs(wheelAcc) > 60) {
    if (wheelAcc > 0) next(); else prev()
    wheelAcc = 0
  }
}

let touchY0 = 0, touchX0 = 0
function onTouchStart(e) {
  touchY0 = e.touches[0].clientY
  touchX0 = e.touches[0].clientX
}
function onTouchEnd(e) {
  if (going.value) return
  const dy = touchY0 - e.changedTouches[0].clientY
  const dx = Math.abs(touchX0 - e.changedTouches[0].clientX)
  if (dx > Math.abs(dy) || Math.abs(dy) < 35) return
  const el = getScrollableEl()
  if (el) {
    const atTop = el.scrollTop <= 2
    const atBot = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
    if (dy > 0 && !atBot) return
    if (dy < 0 && !atTop) return
  }
  if (dy > 35) next(); else if (dy < -35) prev()
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

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
function rndChar() { return CHARS[Math.floor(Math.random() * CHARS.length)] }

const longestRole = roles.reduce((a, b) => a.length > b.length ? a : b)

const scrambledChars = ref(
  roles[0].split('').map(ch => ({ display: ch === ' ' ? '\u00A0' : ch, settled: true, visible: true }))
)

const padded = ref(
  Array.from({ length: longestRole.length }, (_, i) => ({
    display: i < roles[0].length ? (roles[0][i] === ' ' ? '\u00A0' : roles[0][i]) : '\u00A0',
    settled: true,
    active: i < roles[0].length
  }))
)

let scrambleId = 0
function scrambleTo(target) {
  const id = ++scrambleId
  const targetArr = target.split('')

  padded.value = padded.value.map((_, i) => ({
    display: i < padded.value.length ? padded.value[i].display : '\u00A0',
    settled: false,
    active: i < targetArr.length
  }))

  for (let i = 0; i < longestRole.length; i++) {
    const targetChar = i < targetArr.length ? targetArr[i] : null
    const delay = i * 55
    const duration = 280
    const t0 = performance.now()

    ;(function animChar(idx) {
      function tick(now) {
        if (scrambleId !== id) return
        const elapsed = now - t0
        if (elapsed < delay) { requestAnimationFrame(tick); return }
        const progress = elapsed - delay
        if (progress < duration) {
          if (padded.value[idx] && targetChar !== null) {
            padded.value[idx].display = rndChar()
            padded.value[idx].active = true
          } else if (padded.value[idx]) {
            padded.value[idx].display = '\u00A0'
            padded.value[idx].active = false
          }
          requestAnimationFrame(tick)
        } else {
          if (padded.value[idx]) {
            if (targetChar !== null) {
              padded.value[idx].display = targetChar === ' ' ? '\u00A0' : targetChar
              padded.value[idx].settled = true
              padded.value[idx].active = true
            } else {
              padded.value[idx].display = '\u00A0'
              padded.value[idx].settled = true
              padded.value[idx].active = false
            }
          }
        }
      }
      requestAnimationFrame(tick)
    })(i)
  }
}

function cycleRole() {
  roleIdx.value = (roleIdx.value + 1) % roles.length
  scrambleTo(roles[roleIdx.value])
}

const aud = ref(null)
const musicOn = ref(false)
const booSrc = playlist[0].src
let musicPlayed = false
function tryPlay() {
  if (!aud.value) return
  aud.value.volume = 0.6
  aud.value.play().then(() => { musicOn.value = true }).catch(() => {})
}
function toggleMusic() {
  if (!aud.value) return
  if (musicOn.value) { aud.value.pause(); musicOn.value = false }
  else { aud.value.volume = 0.6; aud.value.play(); musicOn.value = true }
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
    await emailjs.send('service_qg8j9nh','template_j9ivxnn',{from_name:form.name,reply_to:form.email,message:form.message},'UrpG9fqigxq0B2m7k')
    showToast('ok','Sent!',"I'll get back to you soon.")
    Object.assign(form,{name:'',email:'',message:''})
  } catch { showToast('err','Failed','Please try again.') }
  finally { sending.value = false }
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
  roleTimer = setInterval(cycleRole, 2800)
})
onUnmounted(() => {
  cancelAnimationFrame(ldRaf)
  window.removeEventListener('mousemove', onMouse)
  window.removeEventListener('keydown', onKey)
  const vp = vpRef.value
  if (vp) vp.removeEventListener('wheel', onWheel)
  clearInterval(roleTimer)
})
</script>

<style>
:root{--dk:#1b1b1b;--lt:#e8e5df;--tx:#e8e5df;--txd:rgba(232,229,223,.42);--txdk:#1a1a1a;--acc:#289DF2;--bdr:rgba(232,229,223,.09);--bdl:rgba(26,26,26,.12);--ser:Georgia,'Times New Roman',serif;--san:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;font-family:var(--san);background:var(--dk);color:var(--tx)}
::selection{background:rgba(40,157,242,.18)}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-thumb{background:rgba(232,229,223,.15);border-radius:3px}
body{cursor:none}
@media(pointer:coarse){body{cursor:auto}}

.cur-ring{position:fixed;pointer-events:none;z-index:9998;width:30px;height:30px;border-radius:50%;border:1px solid rgba(232,229,223,.3);transform:translate(-50%,-50%);transition:width .15s,height .15s,border-color .15s,background .15s}
.cur-ring.chover{width:44px;height:44px;border-color:var(--acc);background:rgba(40,157,242,.05)}
.cur-dot{position:fixed;pointer-events:none;z-index:9999;width:4px;height:4px;border-radius:50%;background:var(--acc);transform:translate(-50%,-50%)}
@media(pointer:coarse){.cur-ring,.cur-dot{display:none}}

.loader{position:fixed;inset:0;z-index:9000;background:var(--dk);display:flex;align-items:center;justify-content:center}
.ld-prog{position:absolute;top:0;left:0;right:0;height:2px;background:rgba(232,229,223,.07)}
.ld-fill{height:100%;background:var(--acc);transition:width .04s linear}
.ld-cnt{display:flex;flex-direction:column;align-items:center;gap:.8rem;text-align:center}
.ld-tag{font-size:.5rem;letter-spacing:7px;text-transform:uppercase;color:rgba(232,229,223,.2)}
.ld-num{font-family:var(--ser);font-size:clamp(5rem,18vw,11rem);font-weight:400;color:var(--tx);line-height:1;letter-spacing:-4px}
.ld-num em{font-style:normal;font-size:.38em;color:var(--acc);letter-spacing:0}
.ld-sub{font-size:.56rem;letter-spacing:3px;color:rgba(232,229,223,.2)}
.ldfade-leave-active{transition:opacity .45s,transform .45s}
.ldfade-leave-to{opacity:0;transform:scale(1.03)}

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
@media(pointer:coarse){.dnav-dot{cursor:pointer;width:10px;height:10px}}
.dnav-dot.active{background:var(--acc);transform:scale(1.4)}
.dots-nav.blight .dnav-dot{background:rgba(26,26,26,.22)}
.dots-nav.blight .dnav-dot.active{background:var(--acc)}

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

.sec-hero{height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
.hero-letters{display:flex;align-items:center;user-select:none}
.hlf,.hls{font-family:var(--ser);font-size:clamp(8rem,28vw,22rem);font-weight:400;color:var(--tx);line-height:.88;display:inline-block}
.hldot{width:clamp(14px,2.5vw,32px);height:clamp(14px,2.5vw,32px);border-radius:50%;background:var(--acc);flex-shrink:0;margin:0 clamp(3px,.6vw,8px);align-self:flex-end;margin-bottom:clamp(8px,1.8vw,24px)}

.sec-intro{height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden}
.ilines{display:flex;flex-direction:column;align-items:flex-start;padding:0 5%;gap:.5rem}
.il{font-family:var(--ser);font-size:clamp(2rem,6.5vw,6.5rem);font-weight:400;color:var(--tx);line-height:1.1;white-space:nowrap}
@media(max-width:600px){.il{white-space:normal;font-size:clamp(1.9rem,8.5vw,3.5rem)}}
.il-role{display:flex;align-items:baseline;gap:.22em;white-space:nowrap}
@media(max-width:600px){.il-role{white-space:nowrap;overflow:hidden}}
.role-wrap{display:inline-block;font-style:italic;font-family:var(--ser);font-size:clamp(2rem,6.5vw,6.5rem);font-weight:400;line-height:1.1;white-space:nowrap;overflow:hidden}
@media(max-width:600px){.role-wrap{font-size:clamp(1.6rem,7.5vw,3rem)}}
.role-ch{display:inline-block;color:var(--acc);font-style:italic;transition:color .1s ease}
.role-ch.settled{color:var(--acc)}
.role-ch:not(.settled).active{color:rgba(40,157,242,.4)}
.role-ch.inactive{color:transparent;pointer-events:none}

.sec-about{height:100%;display:flex;flex-direction:column;overflow:hidden;position:relative}
.ab-marq{overflow:hidden;position:absolute;bottom:0;left:0;right:0;padding:.5rem 0;z-index:1;pointer-events:none}
.ab-track{display:flex;width:max-content;animation:marq 22s linear infinite}
.ab-track span{font-family:var(--ser);font-size:clamp(2rem,4vw,3.8rem);color:rgba(232,229,223,.04);white-space:nowrap;padding:0 1.5rem;font-weight:400}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.ab-body{flex:1;display:grid;grid-template-columns:320px 1fr;gap:4rem;align-items:center;max-width:1100px;margin:0 auto;padding:4rem 5% 3rem;width:100%;overflow:hidden}
.ab-photo{aspect-ratio:3/4;border-radius:16px;overflow:hidden;border:1px solid var(--bdr);flex-shrink:0;min-height:0}
.ab-photo img{width:100%;height:100%;object-fit:cover;filter:grayscale(15%)}
.ab-tag{font-size:.52rem;letter-spacing:6px;text-transform:uppercase;color:var(--acc);display:block;margin-bottom:1rem}
.ab-name{font-family:var(--ser);font-size:clamp(2.2rem,4.5vw,4rem);font-weight:400;color:var(--tx);letter-spacing:-2px;line-height:1.03;margin-bottom:1.2rem;display:flex;flex-direction:column}
.ab-fn{display:block}
.ab-ln{display:block}
.ab-bio{font-size:clamp(.88rem,1.2vw,1rem);line-height:1.85;color:var(--txd);margin-bottom:1.1rem}
.ab-bio strong{color:var(--tx)}
blockquote{border-left:2px solid var(--acc);padding:.4rem 1rem;font-style:italic;color:rgba(232,229,223,.3);font-size:.88rem;margin-bottom:1.6rem}
.ab-stats{display:flex;gap:2.5rem}
.ast{display:flex;flex-direction:column}
.astn{font-family:var(--ser);font-size:2.2rem;font-weight:400;color:var(--tx);letter-spacing:-1px;line-height:1}
.astl{font-size:.5rem;letter-spacing:3px;text-transform:uppercase;color:rgba(232,229,223,.26);margin-top:.2rem}
@media(max-width:900px){
  .ab-body{grid-template-columns:240px 1fr;gap:2.5rem;padding:3.5rem 5% 2.5rem}
}
@media(max-width:700px){
  .ab-body{grid-template-columns:1fr;padding:4.5rem 5% 3rem;gap:1.5rem;overflow-y:auto;align-items:flex-start}
  .ab-photo{display:none}
  .ab-name{font-size:clamp(2.8rem,12vw,5rem);letter-spacing:-2.5px}
  .ab-bio{font-size:.93rem}
  .ab-stats{gap:2.2rem}
  .astn{font-size:2.6rem}
  .ab-tag{margin-bottom:1rem}
}

.sec-list{height:100%;display:flex;align-items:center;overflow:hidden;position:relative}
.sl-inner{max-width:1100px;margin:0 auto;padding:0 5%;width:100%}
.slhd{margin-bottom:1.6rem}
.slh2{font-family:var(--ser);font-size:clamp(1.8rem,4.5vw,4rem);font-weight:400;color:var(--tx);letter-spacing:-2px}
.slh2-dk{color:var(--txdk)}
.sltag{font-size:.52rem;letter-spacing:6px;text-transform:uppercase;color:rgba(232,229,223,.3);display:block;margin-bottom:.6rem}
.sltag-lt{color:rgba(26,26,26,.3)}
.slrows{border-top:1px solid var(--bdr);max-height:calc(100vh - 260px);overflow-y:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:rgba(232,229,223,.12) transparent}
.slrows-lt{border-top-color:var(--bdl);scrollbar-color:rgba(26,26,26,.12) transparent}
.scroll-hint{text-align:center;padding:.5rem 0;font-size:.52rem;letter-spacing:3px;text-transform:uppercase;color:rgba(232,229,223,.18);animation:blink 2s ease-in-out infinite}
.scroll-hint-lt .scroll-hint,.scroll-hint-lt{text-align:center;padding:.5rem 0;font-size:.52rem;letter-spacing:3px;text-transform:uppercase;color:rgba(26,26,26,.22);animation:blink 2s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:.4}50%{opacity:1}}
.slrow{display:grid;grid-template-columns:40px 1fr auto 22px;align-items:center;gap:1.2rem;padding:.95rem 0;border-bottom:1px solid var(--bdr);cursor:none;transition:padding-left .2s,background .2s;animation:rowIn .55s both}
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

.tgrid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--bdl);border:1px solid var(--bdl);border-radius:12px;overflow:hidden;margin-top:.6rem}
.tcell{background:var(--lt);transition:background .2s;cursor:default;overflow:hidden;position:relative}
.tcell-inner{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:2rem 1rem;text-align:center;transition:transform .35s cubic-bezier(.16,1,.3,1)}
.tcell:hover .tcell-inner{transform:translateY(-4px)}
.tcell::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--acc);transform:scaleX(0);transition:transform .3s cubic-bezier(.16,1,.3,1)}
.tcell:hover::after{transform:scaleX(1)}
.tcell img{width:32px;height:32px;object-fit:contain}
.tcn{font-size:.7rem;font-weight:600;color:var(--txdk)}
.tcc{font-size:.44rem;letter-spacing:2px;text-transform:uppercase;color:rgba(26,26,26,.28)}
@media(max-width:1024px){.tgrid{grid-template-columns:repeat(4,1fr)}}
@media(max-width:600px){.tgrid{grid-template-columns:repeat(3,1fr)}.tcell-inner{padding:1.4rem .6rem}}

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
.sum-bio{font-size:clamp(.85rem,1.2vw,.92rem);line-height:1.78;color:var(--txd);max-width:560px}
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
.ct-inner{padding:2rem 5%;max-width:680px;margin:0 auto;width:100%}
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
.cfbtn{align-self:flex-start;display:inline-flex;align-items:center;gap:.65rem;padding:.7rem 1.6rem;background:transparent;border:1px solid rgba(232,229,223,.12);border-radius:2px;color:var(--tx);font-family:inherit;font-size:.66rem;letter-spacing:3px;text-transform:uppercase;cursor:none;transition:all .3s;margin-top:.2rem}
@media(pointer:coarse){.cfbtn{cursor:pointer}}
.cfbtn:hover:not(:disabled){border-color:var(--acc);color:var(--acc);background:rgba(40,157,242,.04)}
.cfbtn:disabled{opacity:.5}
.cfbtn i{font-size:.7rem;transition:transform .3s}
.cfbtn:hover:not(:disabled) i{transform:translateX(4px)}
.ctfoot{margin-top:2.5rem;padding-top:1.2rem;border-top:1px solid var(--bdr);display:flex;justify-content:space-between;font-size:.6rem;color:rgba(232,229,223,.16);letter-spacing:.8px;flex-wrap:wrap;gap:.5rem}

.overlay{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.92);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:0}
.mbox-full{position:relative;width:100%;height:100%;display:flex;overflow:hidden}
@media(max-width:700px){.mbox-full{flex-direction:column}}
.mbox-cert{flex-direction:row}
@media(max-width:700px){.mbox-cert{flex-direction:column}}
.mf-top{flex:1;background:#0d0d0d;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3.5rem 3rem 2rem;overflow:hidden;min-height:0}
.mf-top img{max-width:100%;width:auto;border-radius:10px;object-fit:contain;max-height:calc(100% - 1rem)}
.mf-top .cert-nav{margin-bottom:1.2rem;align-self:center}
@media(max-width:700px){
  .mf-top{flex:none;height:58vh;padding:3.2rem 1.2rem 1.2rem}
  .mf-top img{max-height:100%;width:100%;object-fit:contain}
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

.toast{position:fixed;bottom:2rem;right:2rem;z-index:9999;background:#1b1b1b;border:1px solid var(--bdr);border-radius:10px;padding:.82rem 1.1rem;display:flex;align-items:flex-start;gap:.65rem;max-width:280px;box-shadow:0 10px 40px rgba(0,0,0,.5)}
.toast.ok{border-left:3px solid var(--acc)}
.toast.err{border-left:3px solid #e55}
.toast i:first-child{font-size:.95rem;margin-top:2px}
.toast.ok i:first-child{color:var(--acc)}
.toast.err i:first-child{color:#e55}
.toast strong{font-size:.8rem;display:block;margin-bottom:.1rem}
.toast p{font-size:.7rem;color:var(--txd);margin:0}
.toast-enter-active,.toast-leave-active{transition:all .3s}
.toast-enter-from,.toast-leave-to{opacity:0;transform:translateX(12px)}
</style>