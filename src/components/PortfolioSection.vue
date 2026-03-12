<template>
  <section id="portfolio" class="portfolio">
    <div class="orb orb-p1"></div>
    <div class="orb orb-p2"></div>

    <div class="portfolio-container">
      <!-- Header -->
      <div class="section-header reveal">
        <p class="eyebrow">My Work</p>
        <h2>Portfolio <span class="highlight">Showcase</span></h2>
        <p class="subtitle">A collection of projects I've designed and developed — blending creativity, functionality, and modern technology.</p>
        <div class="header-line"></div>
      </div>

      <!-- Tabs -->
      <div class="tabs reveal" style="transition-delay:0.1s">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- Projects tab -->
      <div v-if="activeTab === 'projects'">
        <div class="projects-grid">
          <div
            v-for="(proj, i) in visibleProjects"
            :key="proj.title"
            class="proj-card reveal"
            :style="`transition-delay:${(i % 3) * 0.07}s`"
            @click="openProject(proj)"
          >
            <div class="proj-img">
              <img :src="proj.image" :alt="proj.title" loading="lazy" />
              <div class="proj-overlay">
                <i class="fas fa-expand-alt"></i>
              </div>
            </div>
            <div class="proj-body">
              <h3>{{ proj.title }}</h3>
              <p>{{ proj.desc }}</p>
              <div class="badge-row">
                <span v-for="b in proj.badges" :key="b" class="badge">{{ b }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="see-more" v-if="projects.length > initialCount">
          <button class="btn-see-more" @click="showAll = !showAll">
            <span>{{ showAll ? 'Show Less' : 'See More Projects' }}</span>
            <i :class="showAll ? 'fas fa-chevron-up' : 'fas fa-arrow-right'"></i>
          </button>
        </div>
      </div>

      <!-- Certificates tab -->
      <div v-if="activeTab === 'certificates'">
        <div class="certs-grid">
          <div
            v-for="(cert, i) in certificates"
            :key="cert.title"
            class="cert-card reveal"
            :style="`transition-delay:${i * 0.06}s`"
            @click="openCert(cert)"
          >
            <div class="cert-img">
              <img :src="cert.images[0]" :alt="cert.title" loading="lazy" />
              <div v-if="cert.images.length > 1" class="multi-badge">
                <i class="fas fa-images"></i> {{ cert.images.length }}
              </div>
            </div>
            <div class="cert-body">
              <h3>{{ cert.title }}</h3>
              <p>{{ cert.issuer }}</p>
              <span class="cert-date">{{ cert.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech stack tab -->
      <div v-if="activeTab === 'techstack'">
        <div class="tech-grid">
          <div
            v-for="(tech, i) in techStack"
            :key="tech.name"
            class="tech-card reveal"
            :style="`transition-delay:${i * 0.04}s`"
          >
            <div class="tech-icon">
              <img :src="isDark ? tech.iconDark : tech.iconLight" :alt="tech.name" />
            </div>
            <div class="tech-info">
              <span class="tech-name">{{ tech.name }}</span>
              <span class="tech-cat">{{ tech.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project modal -->
    <Teleport to="body">
      <div v-if="activeProject" class="modal-overlay" @click.self="activeProject = null">
        <div class="proj-modal">
          <button class="modal-close" @click="activeProject = null"><i class="fas fa-times"></i></button>
          <div class="proj-modal-sidebar">
            <h2>{{ activeProject.title }}</h2>
            <span class="modal-role">{{ activeProject.role }}</span>
            <div class="modal-section">
              <h4>About this project</h4>
              <p>{{ activeProject.desc }}</p>
            </div>
            <div class="modal-section">
              <h4>Tech & Design</h4>
              <div class="modal-badges">
                <span v-for="b in activeProject.badges" :key="b" class="badge">{{ b }}</span>
              </div>
            </div>
          </div>
          <div class="proj-modal-images">
            <img v-for="(img, i) in activeProject.images" :key="i" :src="img" :alt="activeProject.title + ' ' + (i+1)" loading="lazy" />
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Certificate modal -->
    <Teleport to="body">
      <div v-if="activeCert" class="modal-overlay" @click.self="activeCert = null">
        <div class="cert-modal">
          <button class="modal-close" @click="activeCert = null"><i class="fas fa-times"></i></button>
          <img
            :src="activeCert.images[certIdx]"
            :alt="activeCert.title"
          />
          <div v-if="activeCert.images.length > 1" class="cert-nav">
            <button @click="certIdx = (certIdx - 1 + activeCert.images.length) % activeCert.images.length">
              <i class="fas fa-chevron-left"></i>
            </button>
            <span>{{ certIdx + 1 }} / {{ activeCert.images.length }}</span>
            <button @click="certIdx = (certIdx + 1) % activeCert.images.length">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { projects, certificates, techStack } from '@/data/index.js'

const { isDark } = useTheme()

const tabs = [
  { id: 'projects',     label: 'Projects',    icon: 'fas fa-code' },
  { id: 'certificates', label: 'Certificates',icon: 'fas fa-award' },
  { id: 'techstack',    label: 'Tech Stack',  icon: 'fas fa-layer-group' }
]

const activeTab     = ref('projects')
const showAll       = ref(false)
const activeProject = ref(null)
const activeCert    = ref(null)
const certIdx       = ref(0)
const initialCount  = 6

const visibleProjects = computed(() =>
  showAll.value ? projects : projects.slice(0, initialCount)
)

function openProject(p) { activeProject.value = p }
function openCert(c)    { activeCert.value = c; certIdx.value = 0 }
</script>

<style scoped>
.portfolio {
  padding: 9rem 8%;
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}
.orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; opacity: 0.25; }
.orb-p1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(var(--accent-rgb),0.35),transparent 70%); top: 10%; left: -10%; animation: fp1 24s ease-in-out infinite; }
.orb-p2 { width: 450px; height: 450px; background: radial-gradient(circle, rgba(var(--accent-rgb),0.2),transparent 70%); bottom: 5%; right: -8%; animation: fp2 30s ease-in-out infinite; }
@keyframes fp1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(50px,-40px)} }
@keyframes fp2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,50px)} }

.portfolio-container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }

.section-header { text-align: center; margin-bottom: 3.5rem; }
.eyebrow { font-size: 0.72rem; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); margin-bottom: 0.8rem; }
h2 { font-family: "PolySans Bulky", sans-serif; font-size: clamp(2rem,4vw,3rem); font-weight: 700; color: var(--text-primary); margin-bottom: 0.8rem; }
.subtitle { font-size: 0.95rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 1rem; line-height: 1.7; }
.header-line { width: 40px; height: 2px; background: var(--accent); margin: 0 auto; border-radius: 2px; }

.tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
}
.tab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.tab-btn:hover { border-color: rgba(var(--accent-rgb),0.4); color: var(--accent); background: rgba(var(--accent-rgb),0.05); }
.tab-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.proj-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s;
  display: flex;
  flex-direction: column;
}
.proj-card:hover { border-color: rgba(var(--accent-rgb),0.5); transform: translateY(-5px); box-shadow: 0 16px 40px var(--shadow); }
.proj-img { position: relative; height: 200px; overflow: hidden; background: var(--input-bg); }
.proj-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.4s; }
.proj-card:hover .proj-img img { transform: scale(1.08); }
.proj-overlay {
  position: absolute; inset: 0;
  background: rgba(var(--accent-rgb), 0.5);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
}
.proj-card:hover .proj-overlay { opacity: 1; }
.proj-overlay i { font-size: 1.8rem; color: #fff; }
.proj-body { padding: 1.4rem; flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
.proj-body h3 { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); transition: color 0.3s; }
.proj-card:hover .proj-body h3 { color: var(--accent); }
.proj-body p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; flex: 1; }
.badge-row { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.4rem; }
.badge {
  padding: 0.3rem 0.7rem;
  background: rgba(var(--accent-rgb),0.08);
  border: 1px solid rgba(var(--accent-rgb),0.25);
  border-radius: 20px;
  font-size: 0.72rem; font-weight: 600;
  color: var(--accent);
}

.see-more { display: flex; justify-content: center; margin-top: 2rem; }
.btn-see-more {
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 0.8rem 2rem;
  background: var(--accent); color: #fff;
  border: none; border-radius: var(--radius-sm);
  font-size: 0.9rem; font-weight: 600; cursor: pointer;
  transition: all 0.3s;
}
.btn-see-more:hover { background: var(--accent-hover); transform: translateY(-2px); }

.certs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.cert-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s;
}
.cert-card:hover { border-color: rgba(var(--accent-rgb),0.5); transform: translateY(-4px); box-shadow: 0 14px 35px var(--shadow); }
.cert-img { position: relative; height: 180px; overflow: hidden; background: var(--input-bg); }
.cert-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.4s; }
.cert-card:hover .cert-img img { transform: scale(1.06); }
.multi-badge {
  position: absolute; top: 12px; right: 12px;
  background: rgba(var(--accent-rgb),0.9); color: #fff;
  padding: 0.25rem 0.6rem; border-radius: 20px; font-size: 0.72rem; font-weight: 600;
  display: flex; align-items: center; gap: 0.3rem;
}
.cert-body { padding: 1.2rem; }
.cert-body h3 { font-size: 1rem; font-weight: 700; color: var(--accent); margin-bottom: 0.3rem; }
.cert-body p { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.3rem; }
.cert-date { font-size: 0.78rem; color: var(--text-muted); }

.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.tech-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 1rem 1.2rem;
  display: flex; align-items: center; gap: 0.9rem;
  transition: all 0.3s;
  cursor: default;
}
.tech-card:hover { border-color: rgba(var(--accent-rgb),0.4); transform: translateY(-3px); box-shadow: 0 8px 20px var(--shadow); }
.tech-icon { width: 42px; height: 42px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.tech-icon img { width: 100%; height: 100%; object-fit: contain; }
.tech-info { display: flex; flex-direction: column; gap: 0.2rem; }
.tech-name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); transition: color 0.3s; }
.tech-card:hover .tech-name { color: var(--accent); }
.tech-cat { font-size: 0.75rem; color: var(--text-muted); }

.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(10px);
  z-index: 9000;
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
}
.modal-close {
  position: absolute; top: 1.2rem; right: 1.2rem;
  width: 44px; height: 44px;
  background: rgba(255,255,255,0.1);
  border: 1.5px solid var(--accent);
  border-radius: 50%;
  color: var(--accent); font-size: 1.1rem;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; z-index: 10;
}
.modal-close:hover { background: var(--accent); color: #fff; transform: rotate(90deg); }

.proj-modal {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  width: 100%; max-width: 1200px;
  max-height: 88vh;
  display: grid;
  grid-template-columns: 360px 1fr;
  overflow: hidden;
  position: relative;
}
.proj-modal-sidebar {
  padding: 2.5rem;
  overflow-y: auto;
  border-right: 1px solid var(--border);
}
.proj-modal-sidebar h2 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; line-height: 1.3; }
.modal-role { display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 2rem; }
.modal-section { margin-bottom: 1.8rem; padding-bottom: 1.8rem; border-bottom: 1px solid var(--border); }
.modal-section:last-child { border-bottom: none; }
.modal-section h4 { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.8rem; letter-spacing: 0.3px; }
.modal-section p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.75; }
.modal-badges { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.proj-modal-images { overflow-y: auto; display: flex; flex-direction: column; }
.proj-modal-images img { width: 100%; display: block; }

.cert-modal {
  position: relative;
  max-width: 900px;
  width: 100%;
}
.cert-modal img { width: 100%; height: auto; max-height: 80vh; object-fit: contain; border-radius: var(--radius-md); display: block; }
.cert-nav {
  display: flex; align-items: center; justify-content: center; gap: 1.5rem;
  margin-top: 1rem;
  color: #fff; font-size: 0.85rem;
}
.cert-nav button {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff; border-radius: 50%; width: 36px; height: 36px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.cert-nav button:hover { background: rgba(255,255,255,0.25); }

@media (max-width: 1024px) {
  .projects-grid { grid-template-columns: repeat(2,1fr); }
  .certs-grid { grid-template-columns: repeat(2,1fr); }
  .tech-grid { grid-template-columns: repeat(3,1fr); }
  .proj-modal { grid-template-columns: 1fr; max-height: 90vh; }
  .proj-modal-sidebar { border-right: none; border-bottom: 1px solid var(--border); }
}
@media (max-width: 768px) {
  .portfolio { padding: 6rem 6%; }
  .projects-grid, .certs-grid { grid-template-columns: 1fr; }
  .tech-grid { grid-template-columns: repeat(2,1fr); }
  .tabs { grid-template-columns: 1fr; gap: 0.6rem; }
}
@media (max-width: 480px) {
  .tech-grid { grid-template-columns: 1fr; }
}
</style>