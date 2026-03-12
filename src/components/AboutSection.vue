<template>
  <section id="about" class="about">
    <div class="about-container">
      <!-- Header -->
      <div class="section-header reveal">
        <p class="eyebrow">Who I Am</p>
        <h2>About <span class="highlight">Me</span></h2>
        <div class="header-line"></div>
      </div>

      <!-- Content row -->
      <div class="about-grid">
        <!-- Image -->
        <div class="about-img-wrap reveal">
          <div class="img-frame">
            <img
              src="https://res.cloudinary.com/dnacoymkh/image/upload/v1772046344/vecpic_fn1deb.png"
              alt="Farid Syam"
              loading="lazy"
            />
          </div>
          <div class="img-accent"></div>
        </div>

        <!-- Text -->
        <div class="about-text reveal" style="transition-delay:0.1s">
          <h3>Hello, I'm</h3>
          <h2 class="name">Muhammad Farid Syam</h2>

          <p class="bio">
            I'm a tech-savvy designer who loves building things for the web. With a solid foundation
            in Informatics Engineering, I spend my time mastering Figma and JavaScript. Currently,
            I'm diving deeper into the Vue.js ecosystem to build even better user experiences.
          </p>

          <blockquote>
            <span class="quote-mark">"</span>
            Design with soul, develop with logic.
            <span class="quote-mark">"</span>
          </blockquote>

          <div class="about-actions">
            <a href="#portfolio" class="btn-outline" @click.prevent="scrollTo('portfolio')">
              <i class="fas fa-code"></i> View Projects
            </a>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-row">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="stat-card reveal"
          :style="`transition-delay:${i * 0.1}s`"
        >
          <div class="stat-icon"><i :class="stat.icon"></i></div>
          <div class="stat-num">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-desc">{{ stat.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const stats = [
  { icon: 'fas fa-code',  value: '11', label: 'Projects',    desc: 'UI/UX and websites crafted' },
  { icon: 'fas fa-award', value: '6',  label: 'Certificates', desc: 'Professional skills validated' },
  { icon: 'fas fa-globe', value: '2',  label: 'Years',        desc: 'Continuous learning journey' }
]
</script>

<style scoped>
.about {
  padding: 9rem 8%;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.about-container { max-width: 1100px; margin: 0 auto; }

.section-header { text-align: center; margin-bottom: 5rem; }
.eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.8rem;
}
h2 {
  font-family: "PolySans Bulky", sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}
.header-line {
  width: 40px; height: 2px;
  background: var(--accent);
  margin: 0 auto;
  border-radius: 2px;
}

.about-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 5rem;
  align-items: center;
  margin-bottom: 5rem;
}

.about-img-wrap { position: relative; }
.img-frame {
  position: relative;
  z-index: 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 1;
  max-width: 320px;
}
.img-frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.img-frame:hover img { transform: scale(1.04); }
.img-accent {
  position: absolute;
  top: 16px; left: 16px;
  width: 100%; height: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  border: 2px solid rgba(var(--accent-rgb), 0.3);
  border-radius: var(--radius-lg);
  z-index: 0;
}

.about-text h3 {
  font-size: 1.1rem;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 0.3rem;
}
.name {
  font-family: "PolySans Bulky", sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.4rem;
  line-height: 1.2;
}
.bio {
  font-size: 0.97rem;
  line-height: 1.85;
  color: var(--text-muted);
  margin-bottom: 1.8rem;
}
blockquote {
  background: rgba(var(--accent-rgb), 0.06);
  border-left: 3px solid var(--accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 1rem 1.4rem;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--text-primary);
  margin-bottom: 1.8rem;
}
.quote-mark { font-size: 1.3rem; color: var(--accent); font-style: normal; }

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.6rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;
}
.btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(var(--accent-rgb), 0.06);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.8rem;
  transition: all 0.35s ease;
  cursor: default;
  position: relative;
  overflow: hidden;
}
.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px; height: 0;
  background: var(--accent);
  border-radius: 0 0 2px 2px;
  transition: height 0.35s ease;
}
.stat-card:hover::before { height: 100%; }
.stat-card:hover { border-color: rgba(var(--accent-rgb), 0.4); transform: translateY(-4px); box-shadow: 0 12px 30px var(--shadow); }

.stat-icon {
  width: 44px; height: 44px;
  background: rgba(var(--accent-rgb), 0.1);
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1rem;
}
.stat-icon i { font-size: 1.3rem; color: var(--accent); }
.stat-num {
  font-family: "PolySans Bulky", sans-serif;
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 0.3rem;
}
.stat-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.3rem;
}
.stat-desc { font-size: 0.82rem; color: var(--text-muted); }

@media (max-width: 900px) {
  .about { padding: 6rem 6%; }
  .about-grid { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
  .img-frame { margin: 0 auto; }
  .img-accent { left: 50%; transform: translateX(-50%); }
  blockquote { text-align: left; }
}
@media (max-width: 600px) {
  .stats-row { grid-template-columns: 1fr; }
}
</style>