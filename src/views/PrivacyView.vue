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
            src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80" 
            class="w-full h-full object-cover opacity-30 scale-110"
            :style="{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }"
            alt="Privacy background"
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="text-white/60 text-[12px] font-black uppercase tracking-[0.4em]">Protection des Données</div>
          </div>
          
          <h1 
            class="text-6xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
          >
            Confiden <br /> <span class="text-blue-200">tialité</span>
          </h1>

          <p class="text-white/70 max-w-xl text-lg font-medium leading-relaxed mb-6" 
             v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 1000 } }">
            Votre confiance est notre priorité. Voici comment nous traitons vos données.
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
            <h2 class="text-2xl font-black mb-6 text-slate-900 border-l-4 border-blue-600 pl-6">Collecte des informations</h2>
            <p class="text-slate-600 leading-relaxed text-lg font-medium">
              Nous recueillons des informations lorsque vous vous inscrivez sur notre plateforme, lorsque vous vous connectez à votre compte, ou lorsque vous remplissez un formulaire. Les informations recueillies incluent votre nom, votre adresse e-mail, et votre numéro de téléphone.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-black mb-6 text-slate-900 border-l-4 border-blue-600 pl-6">Utilisation des informations</h2>
            <div class="space-y-4">
              <p class="text-slate-900 font-bold mb-4">Toutes les informations que nous recueillons peuvent être utilisées pour :</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="benefit in [
                  'Personnaliser votre expérience',
                  'Améliorer notre site Web',
                  'Améliorer le service client',
                  'Vous contacter par e-mail',
                  'Gérer un concours ou une enquête',
                  'Traiter vos transactions'
                ]" :key="benefit" class="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div class="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span class="text-slate-700 font-medium">{{ benefit }}</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-2xl font-black mb-6 text-slate-900 border-l-4 border-blue-600 pl-6">Protection des données</h2>
            <p class="text-slate-600 leading-relaxed text-lg">
              Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-black mb-6 text-slate-900 border-l-4 border-blue-600 pl-6">Consentement</h2>
            <p class="text-slate-600 leading-relaxed text-lg">
              En utilisant notre site, vous consentez à notre politique de confidentialité.
            </p>
            <div class="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-3xl">
              <p class="text-blue-800 font-bold">Important</p>
              <p class="text-blue-700">Vous avez le droit d'accéder, de modifier ou de demander la suppression de vos données à tout moment en contactant notre support.</p>
            </div>
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
