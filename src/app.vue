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

    <nav class="dots-nav">
      <button v-for="(s,i) in SECTIONS" :key="s.id"
        class="dnav-dot" :class="{active: cur_sec===i}"
        @click="goTo(i)" :title="s.label">
      </button>
    </nav>

    <div class="fp-viewport" ref="vpRef">
      <TransitionGroup :name="txName" tag="div" class="fp-slider">
        <div v-for="(sec,i) in SECTIONS" v-show="cur_sec===i" :key="sec.id"
          class="fp-slide" :class="['bg-'+sec.bg]">

          <div v-if="sec.id==='hero'" class="sec-hero">
            <div class="hero-letters">
              <span class="hlf" :style="{transform:'translateX('+hFx+'px)'}">F</span>
              <span class="hldot"></span>
              <span class="hls" :style="{transform:'translateX('+hSx+'px)'}">S</span>
            </div>
            <div class="cue" :style="{opacity: cur_sec===0?1:0}">
              <div class="cue-m"><div class="cue-d"></div></div>
              <span>SCROLL DOWN</span>
            </div>
          </div>

          <div v-else-if="sec.id==='intro'" class="sec-intro">
            <div class="ilines">
              <div class="il">Let Me Introduce</div>
              <div class="il il2">
                My Self
                <span class="il-img"><img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1773393847/IMG_5533_vo5k7w.jpg" alt=""/></span>
              </div>
              <div class="il">As <em>{{ displayRole }}</em></div>
            </div>
          </div>

          <div v-else-if="sec.id==='about'" class="sec-about">
            <div class="ab-marq">
              <div class="ab-track"><span v-for="n in 8" :key="n">— ABOUT ME </span></div>
            </div>
            <div class="ab-body">
              <div class="ab-photo">
                <img src="https://res.cloudinary.com/dnacoymkh/image/upload/v1773393847/IMG_5533_vo5k7w.jpg" alt="Farid Syam"/>
              </div>
              <div class="ab-txt">
                <span class="ab-tag">WHO I AM</span>
                <h2 class="ab-name">Muhammad<br>Farid Syam</h2>
                <p class="ab-bio">I'm a <strong>UI/UX Designer</strong> and <strong>Frontend Developer</strong> based in Makassar, Indonesia. I specialize in crafting digital interfaces that feel alive — intuitive journeys built with Figma and Vue.js.</p>
                <blockquote>"Design with soul, develop with logic."</blockquote>
                <div class="ab-stats">
                  <div class="ast"><span class="astn">11+</span><span class="astl">Projects</span></div>
                  <div class="ast"><span class="astn">6</span><span class="astl">Certificates</span></div>
                  <div class="ast"><span class="astn">2yr</span><span class="astl">Experience</span></div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="sec.id==='work'" class="sec-list">
            <div class="sl-inner">
              <div class="slhd">
                <span class="sltag">SELECTED WORK</span>
                <h2>Projects</h2>
              </div>
              <div class="slrows">
                <div v-for="(p,j) in projects" :key="p.title"
                  class="slrow" :style="{animationDelay: j*0.04+'s'}"
                  @click="openProj(p)" @mouseenter="hovP=p" @mouseleave="hovP=null">
                  <span class="slrn">{{ String(j+1).padStart(2,'0') }}</span>
                  <span class="slrt">{{ p.title }}</span>
                  <span class="slrc">{{ p.badges[0] }}</span>
                  <span class="slra">—</span>
                </div>
              </div>
            </div>
            <div class="imgf" :class="{ifon:hovP}" :style="{left:cur.x+20+'px',top:cur.y-60+'px'}">
              <img v-if="hovP" :src="hovP.image"/>
            </div>
          </div>

          <div v-else-if="sec.id==='certs'" class="sec-list sec-list-dk">
            <div class="sl-inner">
              <div class="slhd slhd-dk">
                <span class="sltag">CERTIFICATES</span>
                <h2>Selected Activities</h2>
              </div>
              <div class="slrows slrows-dk">
                <div v-for="(c,j) in certificates" :key="c.title"
                  class="slrow slrow-dk" :style="{animationDelay: j*0.05+'s'}"
                  @click="openCert(c)" @mouseenter="hovC=c" @mouseleave="hovC=null">
                  <span class="slrt">{{ c.title }}</span>
                  <span class="slrc slrc-dk">{{ c.issuer }}</span>
                  <span class="slrd">{{ c.date }}</span>
                  <span class="slra slra-dk">—</span>
                </div>
              </div>
            </div>
            <div class="imgf" :class="{ifon:hovC}" :style="{left:cur.x+20+'px',top:cur.y-60+'px'}">
              <img v-if="hovC" :src="hovC.images[0]"/>
            </div>
          </div>

          <div v-else-if="sec.id==='tech'" class="sec-list">
            <div class="sl-inner">
              <div class="slhd">
                <span class="sltag">TECH STACK</span>
                <h2>Tools &amp; Skills</h2>
              </div>
              <div class="tgrid">
                <div v-for="t in techStack" :key="t.name" class="tcell">
                  <img :src="t.iconLight" :alt="t.name"/>
                  <span class="tcn">{{ t.name }}</span>
                  <span class="tcc">{{ t.category }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="sec.id==='phrase'" class="sec-phrase">
            <div class="ph-inner">
              <p class="phsm">Dont Be Shy,</p>
              <h2 class="phbig">Make The First<br>Move.</h2>
            </div>
          </div>

          <div v-else-if="sec.id==='summary'" class="sec-summary">
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
                      <div class="simt">Informatics Engineering (Bachelor)</div>
                      <div class="simd"><span>Universitas Mikroskil</span><span class="sdot">·</span><span>3.69/4.00</span></div>
                    </div>
                  </div>
                </div>
                <div class="scol">
                  <h3 class="scolh">Experiences</h3>
                  <div class="sitems">
                    <div v-for="e in experiences" :key="e.name" class="sitem">
                      <div class="simt">{{ e.name }}</div>
                      <div class="simd"><span>{{ e.role }}</span><span class="sdot">·</span><span>{{ e.period }}</span></div>
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

          <div v-else-if="sec.id==='contact'" class="sec-contact">
            <div class="sl-inner ct-inner">
              <div class="cthd">
                <span class="ctag">GET IN TOUCH</span>
                <h2 class="cttitle">Let's Work<br><em>Together.</em></h2>
                <p class="ctsub">Open for freelance projects, collaborations, or a friendly chat about design and code.</p>
              </div>
              <div class="ctbody">
                <div class="ctinfo">
                  <div class="ctavail"><span class="ctdot"></span>Available for work</div>
                  <div class="ctlinks">
                    <a href="https://linkedin.com/in/faridsyam" target="_blank" class="ctlnk"><span>LinkedIn</span><span>↗</span></a>
                    <a href="mailto:mfaridsyam@email.com" class="ctlnk"><span>mfaridsyam@email.com</span><span>↗</span></a>
                    <a href="https://github.com/faridsyam" target="_blank" class="ctlnk"><span>GitHub</span><span>↗</span></a>
                  </div>
                  <div class="cttags"><span>UI/UX Design</span><span>Frontend Dev</span><span>Figma</span><span>Vue.js</span></div>
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
              </div>
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
          <div class="mbox proj-box">
            <button class="mclose" @click="actProj=null"><i class="fas fa-times"></i></button>
            <div class="pinfo">
              <h2>{{ actProj.title }}</h2>
              <p>{{ actProj.desc }}</p>
              <div class="prole"><small>ROLE</small><span>{{ actProj.role }}</span></div>
              <div class="ptags"><span v-for="b in actProj.badges" :key="b">{{ b }}</span></div>
            </div>
            <div class="pimgs"><img v-for="(img,i) in actProj.images" :key="i" :src="img" loading="lazy"/></div>
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
            <img :src="actCert.images[ci]"/>
            <div class="certinfo"><h3>{{ actCert.title }}</h3><p>{{ actCert.issuer }}</p><span>{{ actCert.date }}</span></div>
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
  { id:'hero',    bg:'dk', label:'Hero' },
  { id:'intro',   bg:'dk', label:'Intro' },
  { id:'about',   bg:'dk', label:'About' },
  { id:'work',    bg:'lt', label:'Projects' },
  { id:'certs',   bg:'dk', label:'Certificates' },
  { id:'tech',    bg:'lt', label:'Tools' },
  { id:'phrase',  bg:'dk', label:'Move' },
  { id:'summary', bg:'dk', label:'Summary' },
  { id:'contact', bg:'dk', label:'Contact' },
]
const LIGHT_SECS = [3,5]

const loading = ref(true)
const ldPct = ref(0)
const cur_sec = ref(0)
const going = ref(false)
const txName = ref('slide-down')
const vpRef = ref(null)

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
  setTimeout(() => { going.value = false }, 780)
}

function next() { if (cur_sec.value < SECTIONS.length-1) goTo(cur_sec.value+1) }
function prev() { if (cur_sec.value > 0) goTo(cur_sec.value-1) }

let wheelAcc = 0, wheelTimer = null
function onWheel(e) {
  if (going.value) { e.preventDefault(); return }
  const isScrollable = e.target.closest('.slrows,.pimgs,.sum-cols,.ctbody')
  if (isScrollable) {
    const el = isScrollable
    const atTop = el.scrollTop === 0
    const atBot = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
    if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBot)) { e.preventDefault() }
    else return
  } else { e.preventDefault() }
  wheelAcc += e.deltaY
  clearTimeout(wheelTimer)
  wheelTimer = setTimeout(() => { wheelAcc = 0 }, 120)
  if (Math.abs(wheelAcc) > 55) {
    if (wheelAcc > 0) next(); else prev()
    wheelAcc = 0
  }
}

let touchY0 = 0
function onTouchStart(e) { touchY0 = e.touches[0].clientY }
function onTouchEnd(e) {
  const dy = touchY0 - e.changedTouches[0].clientY
  if (Math.abs(dy) > 40) { if (dy > 0) next(); else prev() }
}

function onKey(e) {
  if (['ArrowDown','PageDown'].includes(e.key)) next()
  if (['ArrowUp','PageUp'].includes(e.key)) prev()
}

const cur = reactive({ x:-200, y:-200 })
const curHover = ref(false)
function onMouse(e) {
  cur.x = e.clientX; cur.y = e.clientY
  curHover.value = !!(document.elementFromPoint(e.clientX,e.clientY)?.closest('a,button,.slrow,.ctlnk,.slink'))
}

const hFx = computed(() => cur_sec.value === 0 ? 0 : -160)
const hSx = computed(() => cur_sec.value === 0 ? 0 : 160)

const roles = ['UI/UX Designer', 'Frontend Developer']
const roleIdx = ref(0)
const displayRole = ref(roles[0])
let roleTimer = null
function cycleRole() {
  roleIdx.value = (roleIdx.value+1) % roles.length
  displayRole.value = roles[roleIdx.value]
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
  vpRef.value?.addEventListener('wheel', onWheel, {passive:false})
  vpRef.value?.addEventListener('touchstart', onTouchStart, {passive:true})
  vpRef.value?.addEventListener('touchend', onTouchEnd, {passive:true})
  roleTimer = setInterval(cycleRole, 2800)
})
onUnmounted(() => {
  cancelAnimationFrame(ldRaf)
  window.removeEventListener('mousemove', onMouse)
  window.removeEventListener('keydown', onKey)
  vpRef.value?.removeEventListener('wheel', onWheel)
  vpRef.value?.removeEventListener('touchstart', onTouchStart)
  vpRef.value?.removeEventListener('touchend', onTouchEnd)
  clearInterval(roleTimer)
})
</script>

<style>
:root{--dk:#1b1b1b;--lt:#e8e5df;--tx:#e8e5df;--txd:rgba(232,229,223,.42);--txdk:#1a1a1a;--acc:#289DF2;--bdr:rgba(232,229,223,.09);--bdl:rgba(26,26,26,.12);--ser:Georgia,'Times New Roman',serif;--san:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;font-family:var(--san);background:var(--dk);color:var(--tx);cursor:none}
::selection{background:rgba(40,157,242,.18)}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-thumb{background:rgba(232,229,223,.1)}

.cur-ring{position:fixed;pointer-events:none;z-index:9998;width:30px;height:30px;border-radius:50%;border:1px solid rgba(232,229,223,.3);transform:translate(-50%,-50%);transition:width .15s,height .15s,border-color .15s,background .15s}
.cur-ring.chover{width:44px;height:44px;border-color:var(--acc);background:rgba(40,157,242,.05)}
.cur-dot{position:fixed;pointer-events:none;z-index:9999;width:4px;height:4px;border-radius:50%;background:var(--acc);transform:translate(-50%,-50%)}

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
.bar{position:fixed;top:0;left:0;right:0;z-index:800;display:flex;align-items:center;justify-content:space-between;padding:.85rem 4%;font-size:.58rem;letter-spacing:1.5px;color:rgba(232,229,223,.3);transition:color .4s;mix-blend-mode:difference}
.bar.blight{color:rgba(26,26,26,.38)}
.bar-music{display:flex;align-items:center;gap:.4rem;background:none;border:none;color:inherit;font-size:inherit;letter-spacing:inherit;cursor:none;font-family:inherit}
.bmdot{width:6px;height:6px;border-radius:50%;background:rgba(232,229,223,.18);transition:all .3s;flex-shrink:0}
.bmdot.bmon{background:var(--acc);box-shadow:0 0 6px rgba(40,157,242,.5)}
.bmbars{display:flex;align-items:flex-end;gap:1.5px;height:10px;margin-left:2px}
.bmbars i{display:block;width:2px;background:var(--acc);border-radius:2px;animation:mbar 1s ease-in-out infinite}
.bmbars i:nth-child(2){animation-delay:.18s}.bmbars i:nth-child(3){animation-delay:.36s}
@keyframes mbar{0%,100%{height:3px}50%{height:10px}}

.dots-nav{position:fixed;right:1.8rem;top:50%;transform:translateY(-50%);z-index:801;display:flex;flex-direction:column;gap:.55rem}
.dnav-dot{width:6px;height:6px;border-radius:50%;border:none;background:rgba(232,229,223,.18);cursor:none;transition:all .3s;padding:0}
.dnav-dot.active{background:var(--acc);transform:scale(1.4)}

.fp-viewport{flex:1;position:relative;overflow:hidden}
.fp-slider{position:relative;width:100%;height:100%}
.fp-slide{position:absolute;inset:0;overflow:hidden}
.bg-dk{background:var(--dk)}
.bg-lt{background:var(--lt)}

.slide-down-enter-active,.slide-down-leave-active,
.slide-up-enter-active,.slide-up-leave-active{transition:transform .75s cubic-bezier(.77,0,.18,1),opacity .55s ease}
.slide-down-enter-from{transform:translateY(100%);opacity:.6}
.slide-down-leave-to{transform:translateY(-100%);opacity:.6}
.slide-up-enter-from{transform:translateY(-100%);opacity:.6}
.slide-up-leave-to{transform:translateY(100%);opacity:.6}
.slide-down-enter-to,.slide-down-leave-from,
.slide-up-enter-to,.slide-up-leave-from{transform:translateY(0);opacity:1}

.cue{position:absolute;bottom:7%;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;font-size:.5rem;letter-spacing:5px;color:rgba(232,229,223,.2);pointer-events:none;transition:opacity .6s}
.cue-m{width:16px;height:28px;border:1px solid rgba(232,229,223,.16);border-radius:18px;display:flex;align-items:flex-start;justify-content:center;padding-top:4px}
.cue-d{width:3px;height:3px;background:var(--acc);border-radius:50%;animation:cscr 1.8s ease-in-out infinite}
@keyframes cscr{0%{transform:translateY(0);opacity:1}75%{transform:translateY(11px);opacity:0}100%{transform:translateY(0);opacity:0}}

.sec-hero{height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
.hero-letters{display:flex;align-items:center;user-select:none}
.hlf,.hls{font-family:var(--ser);font-size:clamp(8rem,28vw,22rem);font-weight:400;color:var(--tx);line-height:.88;display:inline-block;transition:transform 1.1s cubic-bezier(.16,1,.3,1)}
.hldot{width:clamp(14px,2.5vw,32px);height:clamp(14px,2.5vw,32px);border-radius:50%;background:var(--acc);flex-shrink:0;margin:0 clamp(3px,.6vw,8px);align-self:flex-end;margin-bottom:clamp(8px,1.8vw,24px)}

.sec-intro{height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden}
.ilines{display:flex;flex-direction:column;align-items:center;padding:0 4%;text-align:center;gap:.2rem}
.il{font-family:var(--ser);font-size:clamp(2.4rem,7vw,7rem);font-weight:400;color:var(--tx);line-height:1.08;display:flex;align-items:center;gap:.3em;white-space:nowrap}
.il em{color:var(--acc);font-style:italic}
.il2{padding-left:6%}
.il-img{width:clamp(52px,6vw,82px);height:clamp(52px,6vw,82px);border-radius:10px;overflow:hidden;border:1px solid var(--bdr);flex-shrink:0}
.il-img img{width:100%;height:100%;object-fit:cover}

.sec-about{height:100%;display:flex;flex-direction:column;overflow:hidden}
.ab-marq{overflow:hidden;border-bottom:1px solid var(--bdr);padding:.8rem 0}
.ab-track{display:flex;width:max-content;animation:marq 20s linear infinite}
.ab-track span{font-family:var(--ser);font-size:clamp(1.8rem,4vw,3.5rem);color:rgba(232,229,223,.05);white-space:nowrap;padding:0 1.5rem;font-weight:400}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.ab-body{flex:1;display:grid;grid-template-columns:280px 1fr;gap:4rem;align-items:center;max-width:1050px;margin:0 auto;padding:2rem 5%;width:100%}
.ab-photo{aspect-ratio:3/4;border-radius:16px;overflow:hidden;border:1px solid var(--bdr)}
.ab-photo img{width:100%;height:100%;object-fit:cover;filter:grayscale(20%)}
.ab-tag{font-size:.52rem;letter-spacing:6px;text-transform:uppercase;color:var(--acc);display:block;margin-bottom:.9rem}
.ab-name{font-family:var(--ser);font-size:clamp(1.8rem,4vw,3.2rem);font-weight:400;color:var(--tx);letter-spacing:-2px;line-height:1.08;margin-bottom:1.2rem}
.ab-bio{font-size:.9rem;line-height:1.85;color:var(--txd);margin-bottom:1.2rem}
.ab-bio strong{color:var(--tx)}
blockquote{border-left:2px solid var(--acc);padding:.4rem 1rem;font-style:italic;color:rgba(232,229,223,.32);font-size:.88rem;margin-bottom:1.6rem}
.ab-stats{display:flex;gap:2.5rem}
.ast{display:flex;flex-direction:column}
.astn{font-family:var(--ser);font-size:2rem;font-weight:400;color:var(--tx);letter-spacing:-1px;line-height:1}
.astl{font-size:.52rem;letter-spacing:3px;text-transform:uppercase;color:rgba(232,229,223,.26);margin-top:.2rem}

.sec-list{height:100%;display:flex;flex-direction:column;justify-content:center;overflow:hidden}
.sec-list-dk .slhd h2{color:var(--tx)}
.sl-inner{max-width:1100px;margin:0 auto;padding:0 5%;width:100%}
.slhd{margin-bottom:2rem}
.slhd h2{font-family:var(--ser);font-size:clamp(2rem,5vw,4.2rem);font-weight:400;color:var(--txdk);letter-spacing:-2px}
.slhd-dk h2{color:var(--tx)}
.sltag{font-size:.52rem;letter-spacing:6px;text-transform:uppercase;color:rgba(26,26,26,.3);display:block;margin-bottom:.65rem}
.slrows{border-top:1px solid var(--bdl);overflow-y:auto;max-height:55vh}
.slrows-dk{border-top-color:var(--bdr)}
.slrow{display:grid;grid-template-columns:42px 1fr auto 20px;align-items:center;gap:1.4rem;padding:1rem 0;border-bottom:1px solid var(--bdl);cursor:none;transition:padding-left .2s;animation:rowIn .55s both}
.slrow-dk{border-bottom-color:var(--bdr)}
.slrow:hover{padding-left:.55rem}
@keyframes rowIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.slrn{font-size:.6rem;color:rgba(26,26,26,.25);letter-spacing:2px}
.slrt{font-family:var(--ser);font-size:clamp(.88rem,1.9vw,1.45rem);color:var(--txdk);font-weight:400}
.slrow-dk .slrt{color:var(--tx)}
.slrc{font-size:.56rem;letter-spacing:2px;text-transform:uppercase;color:rgba(26,26,26,.28)}
.slrc-dk{color:rgba(232,229,223,.26)}
.slrd{font-size:.56rem;color:rgba(232,229,223,.32);white-space:nowrap}
.slra{font-size:.85rem;color:rgba(26,26,26,.18);transition:transform .2s}
.slra-dk{color:rgba(232,229,223,.14)}
.slrow:hover .slra{transform:translateX(4px);color:var(--txdk)}
.slrow-dk:hover .slra{color:var(--tx)}
.imgf{position:fixed;width:180px;height:120px;border-radius:10px;overflow:hidden;pointer-events:none;z-index:700;opacity:0;transform:scale(.9);transition:opacity .2s,transform .2s}
.imgf.ifon{opacity:1;transform:scale(1)}
.imgf img{width:100%;height:100%;object-fit:cover}

.tgrid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--bdl);border:1px solid var(--bdl);border-radius:12px;overflow:hidden;margin-top:.5rem}
.tcell{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:2rem 1rem;background:var(--lt);transition:background .2s;text-align:center;cursor:default}
.tcell:hover{background:#dedad2}
.tcell img{width:34px;height:34px;object-fit:contain}
.tcn{font-size:.7rem;font-weight:600;color:var(--txdk)}
.tcc{font-size:.45rem;letter-spacing:2px;text-transform:uppercase;color:rgba(26,26,26,.28)}

.sec-phrase{height:100%;display:flex;align-items:center;overflow:hidden}
.ph-inner{max-width:1100px;margin:0 auto;padding:0 5%;width:100%}
.phsm{font-size:.9rem;color:var(--txd);margin-bottom:.7rem;letter-spacing:.5px}
.phbig{font-family:var(--ser);font-size:clamp(2.8rem,7vw,6.5rem);font-weight:400;color:var(--tx);letter-spacing:-3px;line-height:1.06}

.sec-summary{height:100%;display:flex;align-items:center;overflow:hidden}
.sum-hd{margin-bottom:2.2rem}
.sum-lbl{font-size:clamp(1.3rem,2.2vw,1.8rem);font-weight:700;color:var(--tx);text-decoration:underline;text-underline-offset:5px;margin-bottom:1rem;display:block;font-family:var(--san)}
.sum-name{font-family:var(--san);font-size:clamp(2.2rem,5.5vw,5rem);font-weight:800;color:var(--tx);letter-spacing:-.04em;line-height:.95;margin-bottom:.5rem}
.sum-role{font-size:.82rem;color:var(--txd);margin-bottom:.9rem}
.sum-bio{font-size:.88rem;line-height:1.78;color:var(--txd);max-width:580px}
.sum-cols{display:grid;grid-template-columns:1fr 1fr;gap:2rem 4rem;border-top:1px solid var(--bdr);padding-top:2rem;overflow-y:auto;max-height:42vh}
.scolh{font-family:var(--ser);font-size:1rem;font-weight:400;color:var(--tx);margin-bottom:.8rem;padding-bottom:.45rem;border-bottom:1px solid var(--bdr)}
.sitems{display:flex;flex-direction:column;gap:.7rem}
.sitem{padding-bottom:.6rem;border-bottom:1px solid rgba(232,229,223,.04)}
.simt{font-size:.82rem;color:var(--tx);margin-bottom:.18rem;display:flex;align-items:center;gap:.3rem}
.simt i{font-size:.54rem;color:var(--acc);opacity:.5}
.simd{display:flex;flex-wrap:wrap;gap:.2rem;font-size:.68rem;color:var(--txd)}
.sdot{color:rgba(232,229,223,.18)}
.slink{cursor:none;transition:padding-left .17s}
.slink:hover{padding-left:.3rem}
.slink:hover .simt{color:var(--acc)}

.sec-contact{height:100%;display:flex;align-items:center;overflow-y:auto}
.ct-inner{padding-top:4.5rem;padding-bottom:2rem}
.cthd{margin-bottom:2.5rem}
.ctag{font-size:.52rem;letter-spacing:6px;text-transform:uppercase;color:var(--acc);display:block;margin-bottom:.65rem}
.cttitle{font-family:var(--ser);font-size:clamp(2.2rem,5vw,4.5rem);font-weight:400;color:var(--tx);letter-spacing:-3px;line-height:1.04;margin:.6rem 0 .9rem}
.cttitle em{font-style:italic;color:var(--acc)}
.ctsub{font-size:.86rem;line-height:1.78;color:var(--txd);max-width:380px}
.ctbody{display:grid;grid-template-columns:1fr 1.6fr;gap:3.5rem;border-top:1px solid var(--bdr);padding-top:2.5rem}
.ctinfo{display:flex;flex-direction:column;gap:1.8rem}
.ctavail{display:inline-flex;align-items:center;gap:.55rem;font-size:.6rem;letter-spacing:3px;text-transform:uppercase;color:rgba(232,229,223,.35)}
.ctdot{width:7px;height:7px;border-radius:50%;background:#3ddc84;box-shadow:0 0 7px rgba(61,220,132,.4);animation:pdot 2s ease-in-out infinite}
@keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.76)}}
.ctlinks{display:flex;flex-direction:column}
.ctlnk{display:flex;align-items:center;justify-content:space-between;padding:.85rem 0;border-bottom:1px solid var(--bdr);text-decoration:none;cursor:none;transition:padding-left .25s}
.ctlnk:first-child{border-top:1px solid var(--bdr)}
.ctlnk:hover{padding-left:.4rem}
.ctlnk span:first-child{font-size:.82rem;color:var(--txd);transition:color .25s}
.ctlnk:hover span:first-child{color:var(--tx)}
.ctlnk span:last-child{font-size:.85rem;color:rgba(232,229,223,.14);transition:all .25s}
.ctlnk:hover span:last-child{color:var(--acc);transform:translate(3px,-3px);display:inline-block}
.cttags{display:flex;flex-wrap:wrap;gap:.3rem}
.cttags span{font-size:.5rem;letter-spacing:2px;text-transform:uppercase;padding:.2rem .6rem;border:1px solid var(--bdr);border-radius:3px;color:rgba(232,229,223,.22)}
.ctform{display:flex;flex-direction:column;gap:1.1rem}
.cfrow{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem}
.cff{display:flex;flex-direction:column;gap:.3rem}
.cff label{font-size:.5rem;letter-spacing:4px;text-transform:uppercase;color:rgba(232,229,223,.22)}
.cff input,.cff textarea{width:100%;padding:.7rem 0;background:transparent;border:none;border-bottom:1px solid rgba(232,229,223,.09);color:var(--tx);font-family:inherit;font-size:.87rem;outline:none;transition:border-color .3s;cursor:none}
.cff input:focus,.cff textarea:focus{border-bottom-color:var(--acc)}
.cff input::placeholder,.cff textarea::placeholder{color:rgba(232,229,223,.12)}
.cff textarea{resize:none;min-height:95px}
.cfbtn{align-self:flex-start;display:inline-flex;align-items:center;gap:.65rem;padding:.68rem 1.5rem;background:transparent;border:1px solid rgba(232,229,223,.1);border-radius:2px;color:var(--tx);font-family:inherit;font-size:.65rem;letter-spacing:3px;text-transform:uppercase;cursor:none;transition:all .3s;margin-top:.2rem}
.cfbtn:hover:not(:disabled){border-color:var(--acc);color:var(--acc);background:rgba(40,157,242,.04)}
.cfbtn:disabled{opacity:.5}
.cfbtn i{font-size:.7rem;transition:transform .3s}
.cfbtn:hover:not(:disabled) i{transform:translateX(4px)}
.ctfoot{margin-top:2.5rem;padding-top:1.2rem;border-top:1px solid var(--bdr);display:flex;justify-content:space-between;font-size:.6rem;color:rgba(232,229,223,.16);letter-spacing:.8px}

.overlay{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:2rem}
.mbox{position:relative;background:#1b1b1b;border:1px solid var(--bdr);border-radius:16px;overflow:hidden;max-height:88vh;width:100%}
.mclose{position:absolute;top:.9rem;right:.9rem;z-index:10;background:rgba(232,229,223,.07);border:none;color:var(--tx);width:30px;height:30px;border-radius:50%;cursor:none;font-size:.8rem;display:flex;align-items:center;justify-content:center;transition:all .3s}
.mclose:hover{background:var(--acc)}
.proj-box{display:flex;max-width:820px}
.pinfo{width:245px;flex-shrink:0;padding:2rem 1.5rem;border-right:1px solid var(--bdr);display:flex;flex-direction:column;gap:.75rem}
.pinfo h2{font-family:var(--ser);font-size:1.25rem;font-weight:400}
.pinfo p{font-size:.75rem;line-height:1.7;color:var(--txd)}
.prole small{font-size:.5rem;letter-spacing:4px;text-transform:uppercase;color:var(--acc);display:block;margin-bottom:.12rem}
.prole span{font-size:.78rem;color:rgba(232,229,223,.5)}
.ptags{display:flex;flex-wrap:wrap;gap:.28rem;margin-top:auto}
.ptags span{font-size:.54rem;padding:.12rem .52rem;border:1px solid var(--bdr);border-radius:18px;color:var(--acc)}
.pimgs{flex:1;overflow-y:auto;padding:1.8rem;display:flex;flex-direction:column;gap:.85rem}
.pimgs img{width:100%;border-radius:8px}
.cert-box{max-width:580px;padding:1.8rem}
.cert-nav{display:flex;align-items:center;gap:.8rem;margin-bottom:.9rem}
.cert-nav button{background:none;border:1px solid var(--bdr);color:var(--tx);width:29px;height:29px;border-radius:50%;cursor:none;transition:all .3s}
.cert-nav button:disabled{opacity:.3}
.cert-nav span{font-size:.73rem;color:var(--txd)}
.cert-box img{width:100%;border-radius:8px}
.certinfo{margin-top:.9rem}
.certinfo h3{font-size:.9rem;margin-bottom:.18rem}
.certinfo p{font-size:.72rem;color:var(--txd);margin-bottom:.1rem}
.certinfo span{font-size:.62rem;color:var(--acc)}
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

@media(max-width:1024px){.tgrid{grid-template-columns:repeat(4,1fr)}}
@media(max-width:860px){
  .ab-body{grid-template-columns:1fr;gap:2rem;padding:1rem 5%}
  .ab-photo{max-width:180px;aspect-ratio:1/1}
  .ctbody{grid-template-columns:1fr}
  .cfrow{grid-template-columns:1fr}
  .proj-box{flex-direction:column}
  .pinfo{width:100%;border-right:none;border-bottom:1px solid var(--bdr)}
  .sum-cols{grid-template-columns:1fr}
  .tgrid{grid-template-columns:repeat(3,1fr)}
  .slrow{grid-template-columns:30px 1fr 16px}
  .slrc{display:none}
  .dots-nav{display:none}
  .il{font-size:clamp(1.8rem,7vw,3.5rem);white-space:normal;text-align:center}
}
@media(max-width:480px){.tgrid{grid-template-columns:repeat(2,1fr)}}
</style>