<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

const scrollY = ref(0)
const handleScroll = () => {
  scrollY.value = window.scrollY
}

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  submitSuccess.value = true
  
  // Reset form
  contactForm.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    submitSuccess.value = false
  }, 5000)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <MainLayout :show-footer="true">
    <div class="min-h-screen bg-white overflow-x-hidden">
      <!-- Elite Majestic Hero Section -->
      <div class="relative min-h-[50vh] flex items-center overflow-hidden bg-[#1976D2] pt-40 pb-48">
        <!-- Digital & Cinematic Layers -->
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1600&q=80" 
            class="w-full h-full object-cover opacity-30 scale-110"
            :style="{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }"
            alt="Contact background"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-[#1976D2]/95 via-[#1976D2]/80 to-white"></div>
          
          <!-- Animated Background Grid -->
          <div class="absolute inset-0 opacity-[0.05] animate-grid-slide" 
               style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 60px 60px;">
          </div>
        </div>
        
        <div class="max-w-7xl mx-auto px-10 relative z-10 w-full">
          <div 
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 1000 } }"
            class="flex items-center gap-4 mb-8"
          >
            <div class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="text-white/60 text-[12px] font-black uppercase tracking-[0.4em]">Parlons de votre projet</div>
          </div>
          
          <h1 
            class="text-6xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
          >
            Contactez <br /> <span class="text-blue-200">casaNayo</span>
          </h1>

          <p class="text-white/70 max-w-xl text-lg font-medium leading-relaxed mb-6" 
             v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 1000 } }">
            Notre équipe est à votre écoute pour vous accompagner dans tous vos projets immobiliers et de services à Kinshasa.
          </p>
        </div>
      </div>

      <!-- Seamless Elite Content Area -->
      <div class="max-w-6xl mx-auto px-6 relative z-30 -mt-24 pb-32">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Information Sidebar -->
          <div 
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 600, duration: 800 } }"
            class="lg:col-span-1 space-y-6"
          >
            <div class="bg-white/80 backdrop-blur-3xl border border-white/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[40px] p-8 space-y-8">
              <div>
                <h3 class="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Siège Social</h3>
                <p class="text-slate-900 font-bold text-lg leading-tight">
                  Avenue de la Justice, Gombe<br/>
                  Kinshasa, RD Congo
                </p>
              </div>

              <div>
                <h3 class="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Contact Direct</h3>
                <div class="space-y-3">
                  <a href="mailto:contact@casanayo.com" class="block text-slate-600 hover:text-blue-600 font-bold transition-colors">contact@casanayo.com</a>
                  <a href="tel:+243854434602" class="block text-slate-600 hover:text-blue-600 font-bold transition-colors">+243 854 434 602</a>
                </div>
              </div>

              <div>
                <h3 class="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Heures d'ouverture</h3>
                <p class="text-slate-600 font-medium">
                  Lundi - Vendredi : 08h00 - 18h00<br/>
                  Samedi : 09h00 - 13h00
                </p>
              </div>

              <div class="pt-6 border-t border-slate-100 flex gap-4">
                <a href="#" class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <span class="sr-only">Facebook</span>
                  <!-- Simple FB Icon -->
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <span class="sr-only">LinkedIn</span>
                  <!-- Simple LinkedIn Icon -->
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 700, duration: 800 } }"
            class="lg:col-span-2"
          >
            <div class="bg-white/80 backdrop-blur-3xl border border-white/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[40px] p-8 md:p-12 relative overflow-hidden">
              <h2 class="text-3xl font-black mb-8 tracking-tight text-slate-900">Envoyez-nous un message</h2>
              
              <form @submit.prevent="handleSubmit" class="space-y-6 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Nom Complet</label>
                    <input 
                      v-model="contactForm.name"
                      type="text" 
                      required
                      placeholder="Gaius Handjila" 
                      class="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Adresse Email</label>
                    <input 
                      v-model="contactForm.email"
                      type="email" 
                      required
                      placeholder="votre@email.com" 
                      class="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Sujet</label>
                  <input 
                    v-model="contactForm.subject"
                    type="text" 
                    required
                    placeholder="Comment pouvons-nous vous aider ?" 
                    class="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold placeholder:text-slate-300"
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Message</label>
                  <textarea 
                    v-model="contactForm.message"
                    required
                    rows="5"
                    placeholder="Décrivez votre projet ou votre question..." 
                    class="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold placeholder:text-slate-300 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full py-5 bg-[#1976D2] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <span v-if="isSubmitting">Envoi en cours...</span>
                  <template v-else>
                    Envoyer le message
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </template>
                </button>
              </form>

              <!-- Success Overlay -->
              <Transition
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-if="submitSuccess" class="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8">
                  <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-black text-slate-900 mb-2">Message envoyé !</h3>
                  <p class="text-slate-600 font-medium">Merci pour votre intérêt. Nous vous répondrons dans les plus brefs délais.</p>
                  <button @click="submitSuccess = false" class="mt-8 text-blue-600 font-black uppercase tracking-widest text-[10px]">Envoyer un autre message</button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
@keyframes grid-slide {
  0% { transform: translateY(0); }
  100% { transform: translateY(60px); }
}
.animate-grid-slide {
  animation: grid-slide 20s linear infinite;
}
</style>
