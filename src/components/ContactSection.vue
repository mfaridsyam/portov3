<template>
  <section id="contact" class="contact">
    <div class="contact-inner">
      <p class="section-tag reveal-up">GET IN TOUCH</p>
      <h2 class="reveal-up" style="transition-delay:.08s">Let's Work Together</h2>
      <p class="contact-sub reveal-up" style="transition-delay:.16s">
        Open for freelance projects, collaborations, or a friendly chat about design and code.
      </p>

      <div class="contact-grid">
        <div class="contact-lottie reveal-up" style="transition-delay:.2s">
          <div id="lottie-contact"></div>
          <div class="contact-badges">
            <span><i class="fas fa-paint-brush"></i> UI/UX Design</span>
            <span><i class="fas fa-code"></i> Frontend Dev</span>
          </div>
        </div>

        <form class="contact-form reveal-up" style="transition-delay:.28s" @submit.prevent="sendMessage" novalidate>
          <input type="text" name="website" id="hp" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;opacity:0" />
          <div class="field"><input v-model="form.name" type="text" placeholder="Your Name" required :disabled="sending" /></div>
          <div class="field"><input v-model="form.email" type="email" placeholder="Your Email" required :disabled="sending" /></div>
          <div class="field"><textarea v-model="form.message" placeholder="Your Message" rows="5" required :disabled="sending"></textarea></div>
          <button type="submit" :disabled="sending">
            <i :class="sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
            {{ sending ? 'Sending…' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="notif">
        <div v-if="notif.show" class="notif" :class="notif.type">
          <i :class="notif.type === 'success' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
          <div>
            <strong>{{ notif.title }}</strong>
            <p>{{ notif.text }}</p>
          </div>
          <button @click="notif.show = false"><i class="fas fa-times"></i></button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import emailjs from '@emailjs/browser'
import lottie from 'lottie-web'

const form    = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const notif   = reactive({ show: false, type: 'success', title: '', text: '' })

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
      from_name: form.name, reply_to: form.email, message: form.message
    }, 'UrpG9fqigxq0B2m7k')
    showNotif('success', 'Message Sent!', "Thank you — I'll get back to you soon.")
    Object.assign(form, { name: '', email: '', message: '' })
  } catch {
    showNotif('error', 'Oops!', 'Something went wrong. Please try again.')
  } finally { sending.value = false }
}

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById('lottie-contact'),
    renderer: 'svg', loop: true, autoplay: true,
    path: 'https://res.cloudinary.com/dnacoymkh/raw/upload/v1772692529/email_adxthp.json'
  })
})
</script>

<style scoped>
.contact {
  padding: 8rem 6%;
  background: var(--bg-secondary);
}
.contact-inner { max-width: 1000px; margin: 0 auto; }
.section-tag {
  font-size: 0.6rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
}
h2 {
  font-family: "PolySans Bulky", sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -2px;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}
.contact-sub {
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 500px;
  line-height: 1.7;
  margin-bottom: 4rem;
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 4rem;
  align-items: start;
}
.contact-lottie { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
#lottie-contact { width: 100%; max-width: 240px; height: 220px; }
.contact-badges { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
.contact-badges span {
  font-size: 0.75rem;
  padding: 0.35rem 0.9rem;
  border: 1px solid rgba(var(--accent-rgb), 0.3);
  border-radius: 50px;
  color: var(--accent);
  display: flex; align-items: center; gap: 0.4rem;
}

.contact-form { display: flex; flex-direction: column; gap: 1rem; }
.field input, .field textarea {
  width: 100%;
  padding: 0.9rem 1.1rem;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.3s;
}
.field input:focus, .field textarea:focus { border-color: var(--accent); }
.field input::placeholder, .field textarea::placeholder { color: var(--text-muted); opacity: 0.6; }
.field textarea { resize: vertical; min-height: 130px; }
button[type=submit] {
  padding: 0.9rem;
  background: var(--accent); color: #fff;
  border: none; border-radius: 10px;
  font-size: 0.9rem; font-weight: 600;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  transition: all 0.3s;
}
button[type=submit]:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-2px); }
button[type=submit]:disabled { opacity: 0.6; cursor: not-allowed; }

/* notification */
.notif {
  position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.1rem 1.4rem;
  display: flex; align-items: flex-start; gap: 0.8rem;
  max-width: 340px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}
.notif.success { border-left: 3px solid var(--accent); }
.notif.error   { border-left: 3px solid #ff4d4d; }
.notif i:first-child { font-size: 1.3rem; margin-top: 2px; }
.notif.success i:first-child { color: var(--accent); }
.notif.error   i:first-child { color: #ff4d4d; }
.notif strong { display: block; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.2rem; }
.notif p { font-size: 0.8rem; color: var(--text-muted); margin: 0; }
.notif button { background: none; border: none; cursor: pointer; color: var(--text-muted); margin-left: auto; font-size: 0.85rem; }

.notif-enter-active, .notif-leave-active { transition: all 0.3s ease; }
.notif-enter-from, .notif-leave-to { opacity: 0; transform: translateX(20px); }

@media (max-width: 700px) {
  .contact-grid { grid-template-columns: 1fr; }
}
</style>