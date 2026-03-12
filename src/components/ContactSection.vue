<template>
  <section id="contact" class="contact">
    <div class="contact-container">
      <!-- Header -->
      <div class="section-header reveal">
        <p class="eyebrow">Get In Touch</p>
        <h2>Contact <span class="highlight">Me</span></h2>
        <div class="header-line"></div>
      </div>

      <div class="contact-grid">
        <!-- Left: info + lottie -->
        <div class="contact-left reveal">
          <div id="lottie-contact"></div>
          <div class="contact-info">
            <h3>Let's Work Together</h3>
            <p>Open for freelance projects, collaborations, or just a friendly chat about design and code.</p>
            <div class="contact-badges">
              <span class="cbadge"><i class="fas fa-paint-brush"></i> UI/UX Design</span>
              <span class="cbadge"><i class="fas fa-code"></i> Frontend Dev</span>
            </div>
          </div>
        </div>

        <!-- Right: form -->
        <div class="contact-form-wrap reveal" style="transition-delay:0.1s">
          <div class="form-card">
            <h3>Send a Message</h3>
            <p class="form-sub">Have something to discuss? I'd love to hear from you.</p>

            <form @submit.prevent="sendMessage" novalidate>
              <!-- Honeypot -->
              <input type="text" name="website" id="hp" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;opacity:0" />

              <div class="field-group">
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Your Name"
                  required
                  :disabled="sending"
                />
              </div>
              <div class="field-group">
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Your Email"
                  required
                  :disabled="sending"
                />
              </div>
              <div class="field-group">
                <textarea
                  v-model="form.message"
                  placeholder="Your Message"
                  rows="5"
                  required
                  :disabled="sending"
                ></textarea>
              </div>

              <button type="submit" class="btn-submit" :disabled="sending">
                <i :class="sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
                {{ sending ? 'Sending…' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <Teleport to="body">
      <Transition name="notif">
        <div v-if="notif.show" class="notif" :class="notif.type">
          <div class="notif-icon">
            <i :class="notif.type === 'success' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
          </div>
          <div class="notif-msg">
            <strong>{{ notif.title }}</strong>
            <p>{{ notif.text }}</p>
          </div>
          <button class="notif-close" @click="notif.show = false"><i class="fas fa-times"></i></button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import emailjs from '@emailjs/browser'
import lottie from 'lottie-web'

const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const notif = reactive({ show: false, type: 'success', title: '', text: '' })

function showNotif(type, title, text) {
  Object.assign(notif, { show: true, type, title, text })
  setTimeout(() => { notif.show = false }, 4000)
}

async function sendMessage() {
  if (document.getElementById('hp')?.value) return
  if (!form.name || !form.email || !form.message) return

  sending.value = true
  try {
    await emailjs.send('service_qg8j9nh', 'template_j9ivxnn', {
      from_name: form.name,
      reply_to:  form.email,
      message:   form.message
    }, 'UrpG9fqigxq0B2m7k')

    showNotif('success', 'Message Sent!', 'Thank you — I\'ll get back to you soon.')
    Object.assign(form, { name: '', email: '', message: '' })
  } catch {
    showNotif('error', 'Oops!', 'Something went wrong. Please try again.')
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById('lottie-contact'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://res.cloudinary.com/dnacoymkh/raw/upload/v1772692529/email_adxthp.json'
  })
})
</script>

<style scoped>
.contact {
  padding: 9rem 8%;
  background: var(--bg-primary);
  position: relative;
}

.contact-container { max-width: 1100px; margin: 0 auto; }

.section-header { text-align: center; margin-bottom: 5rem; }
.eyebrow { font-size: 0.72rem; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); margin-bottom: 0.8rem; }
h2 { font-family: "PolySans Bulky", sans-serif; font-size: clamp(2rem,4vw,3rem); font-weight: 700; color: var(--text-primary); margin-bottom: 1rem; }
.header-line { width: 40px; height: 2px; background: var(--accent); margin: 0 auto; border-radius: 2px; }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 5rem;
  align-items: center;
}

.contact-left { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1.8rem; }
#lottie-contact { width: 100%; max-width: 260px; height: 240px; }

.contact-info h3 { font-family: "PolySans Bulky", sans-serif; font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem; }
.contact-info p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.75; margin-bottom: 1.2rem; }
.contact-badges { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
.cbadge {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  background: rgba(var(--accent-rgb),0.08);
  border: 1px solid rgba(var(--accent-rgb),0.25);
  border-radius: 50px; font-size: 0.78rem; font-weight: 600; color: var(--accent);
}

.form-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
}
.form-card h3 { font-size: 1.4rem; font-weight: 700; color: var(--accent); margin-bottom: 0.4rem; }
.form-sub { font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.8rem; }

.field-group { margin-bottom: 1.2rem; }
input, textarea {
  width: 100%;
  padding: 0.85rem 1.1rem;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.92rem;
  font-family: inherit;
  transition: border-color 0.3s, background 0.3s;
  outline: none;
}
input:focus, textarea:focus {
  border-color: var(--accent);
  background: var(--bg-card-hover);
}
input::placeholder, textarea::placeholder { color: var(--text-muted); opacity: 0.6; }
textarea { resize: vertical; min-height: 130px; }
input:disabled, textarea:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-submit {
  width: 100%;
  padding: 0.9rem;
  background: var(--accent); color: #fff;
  border: none; border-radius: var(--radius-sm);
  font-size: 0.95rem; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  transition: all 0.3s;
}
.btn-submit:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 6px 18px var(--shadow); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.notif {
  position: fixed;
  bottom: 2rem; right: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.2rem 1.5rem;
  display: flex; align-items: center; gap: 1rem;
  max-width: 360px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  z-index: 9999;
}
.notif.success { border-left: 3px solid var(--accent); }
.notif.error   { border-left: 3px solid #ff4d4d; }
.notif-icon i { font-size: 1.6rem; }
.notif.success .notif-icon i { color: var(--accent); }
.notif.error   .notif-icon i { color: #ff4d4d; }
.notif-msg strong { display: block; font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.2rem; }
.notif-msg p { font-size: 0.82rem; color: var(--text-muted); margin: 0; }
.notif-close { background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 0.9rem; margin-left: auto; padding: 2px; transition: color 0.2s; }
.notif-close:hover { color: var(--text-primary); }

.notif-enter-active, .notif-leave-active { transition: all 0.35s ease; }
.notif-enter-from { opacity: 0; transform: translateX(30px); }
.notif-leave-to   { opacity: 0; transform: translateX(30px); }

@media (max-width: 900px) {
  .contact { padding: 6rem 6%; }
  .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  .contact-left { order: -1; }
}
</style>