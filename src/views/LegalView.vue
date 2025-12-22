<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

const scrollY = ref(0)
const handleScroll = () => {
  scrollY.value = window.scrollY
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
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80" 
            class="w-full h-full object-cover opacity-30 scale-110"
            :style="{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }"
            alt="Legal background"
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div class="text-white/60 text-[12px] font-black uppercase tracking-[0.4em]">Informations Légales</div>
          </div>
          
          <h1 
            class="text-6xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
          >
            Mentions <br /> <span class="text-blue-200">Légales</span>
          </h1>

          <p class="text-white/70 max-w-xl text-lg font-medium leading-relaxed mb-6" 
             v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 1000 } }">
            Dernière mise à jour : 22 Décembre 2025.
          </p>
        </div>
      </div>

      <!-- Seamless Elite Content Area -->
      <div class="max-w-4xl mx-auto px-6 relative z-30 -mt-24 pb-32">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }"
          class="bg-white/80 backdrop-blur-3xl border border-white/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[40px] p-8 md:p-12 space-y-12"
        >
          <section>
            <h2 class="text-2xl font-black mb-6 flex items-center gap-4 text-slate-900">
              <span class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs text-white">01</span>
              Éditeur du Site
            </h2>
            <div class="text-slate-600 leading-relaxed space-y-4">
              <p>Le site Internet <strong>casaNayo</strong> est édité par la société <strong>CASA NAYO SAS</strong>, société par actions simplifiée au capital de 50 000 euros, dont le siège social est situé à :</p>
              <address class="not-italic bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-900 font-medium">
                Avenue de la Justice, Gombe<br/>
                Kinshasa, RD Congo
              </address>
              <p>Immatriculée au Registre du Commerce et des Sociétés sous le numéro 123 456 789.</p>
            </div>
          </section>

          <section>
            <h2 class="text-2xl font-black mb-6 flex items-center gap-4 text-slate-900">
              <span class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs text-white">02</span>
              Directeur de la Publication
            </h2>
            <p class="text-slate-600 leading-relaxed font-medium">
              Le directeur de la publication du site est Monsieur <strong class="text-slate-900">Gaius Handjila</strong>, en sa qualité de Président.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-black mb-6 flex items-center gap-4 text-slate-900">
              <span class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs text-white">03</span>
              Hébergement
            </h2>
            <p class="text-slate-600 leading-relaxed">
              Le site est hébergé par la société <strong class="text-slate-900">CloudElite Services</strong> :
              <br/>
              Adresse : 456 Avenue des Data, 69000 Lyon, France
              <br/>
              Téléphone : +33 (0)1 23 45 67 89
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-black mb-6 flex items-center gap-4 text-slate-900">
              <span class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs text-white">04</span>
              Propriété Intellectuelle
            </h2>
            <p class="text-slate-600 leading-relaxed">
              L'intégralité du site casaNayo est protégée par les législations françaises et internationales relatives à la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>
        </div>

        <!-- Footer link back -->
        <div class="mt-12 text-center">
          <router-link to="/" class="text-slate-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-widest">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </router-link>
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
