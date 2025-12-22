<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

const scrollY = ref(0)
const activeFaqIndex = ref<number | null>(null)

const faqItems = [
  {
    question: "Comment créer un compte sur casaNayo ?",
    answer: "Pour créer un compte, cliquez sur le bouton 'Rejoindre' ou 'Inscription' dans la barre de navigation. Remplissez le formulaire avec vos informations personnelles et validez. Vous recevrez un email de confirmation pour activer votre compte."
  },
  {
    question: "Comment publier une annonce immobilière ?",
    answer: "Une fois connecté à votre compte propriétaire ou agence, accédez à votre tableau de bord et cliquez sur 'Publier une annonce'. Suivez les étapes pour ajouter des photos, la description, le prix et la localisation de votre bien."
  },
  {
    question: "Comment réserver un service professionnel ?",
    answer: "Parcourez notre catalogue de services, sélectionnez le professionnel qui vous convient, remplissez le formulaire de demande d'intervention sur sa page de profil, et vous serez contacté sous 24h pour confirmer l'intervention."
  },
  {
    question: "Les paiements sont-ils sécurisés ?",
    answer: "Oui, casaNayo utilise des protocoles de sécurité avancés et des partenaires de paiement certifiés pour garantir la sécurité de toutes vos transactions sur la plateforme."
  },
  {
    question: "Comment contacter le support client ?",
    answer: "Vous pouvez nous contacter via le formulaire de contact sur la page 'Contact', ou par email à support@casanayo.com. Notre équipe est disponible du lundi au vendredi de 9h à 18h."
  }
]

const toggleFaq = (index: number) => {
  activeFaqIndex.value = activeFaqIndex.value === index ? null : index
}

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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
            class="w-full h-full object-cover opacity-30 scale-110"
            :style="{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }"
            alt="Help background"
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="text-white/60 text-[12px] font-black uppercase tracking-[0.4em]">Centre d'Assistance</div>
          </div>
          
          <h1 
            class="text-6xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
          >
            Comment <br /> pouvons-nous <span class="text-blue-200">aider ?</span>
          </h1>

          <p class="text-white/70 max-w-xl text-lg font-medium leading-relaxed mb-6" 
             v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 1000 } }">
            Trouvez les réponses à vos questions ou contactez notre équipe pour un accompagnement sur-mesure.
          </p>
        </div>
      </div>

      <!-- Seamless Elite Content Area -->
      <div class="max-w-4xl mx-auto px-6 relative z-30 -mt-24 pb-32">
        <!-- Floating Support Card -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }"
          class="bg-white/80 backdrop-blur-3xl border border-white/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[40px] p-8 md:p-12 mb-20"
        >
          <h2 class="text-3xl font-black mb-10 tracking-tight text-slate-900 border-l-4 border-blue-600 pl-6">Questions Fréquentes</h2>
          
          <div class="space-y-6">
            <div 
              v-for="(item, index) in faqItems" 
              :key="index"
              class="group"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full text-left p-8 bg-slate-50/50 hover:bg-white rounded-3xl border border-slate-100 hover:border-blue-200 transition-all flex items-center justify-between"
                :class="{ 'border-blue-500 bg-white shadow-xl shadow-blue-500/5': activeFaqIndex === index }"
              >
                <span class="text-lg font-bold text-slate-900 transition-colors" :class="{ 'text-blue-600': activeFaqIndex === index }">{{ item.question }}</span>
                <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-500" :class="{ 'rotate-180 bg-blue-600 text-white': activeFaqIndex === index }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div 
                class="overflow-hidden transition-all duration-500 ease-in-out"
                :class="activeFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
              >
                <div class="p-8 pt-4 text-slate-600 leading-relaxed text-lg bg-slate-50/30 rounded-b-3xl -mt-4">
                  {{ item.answer }}
                </div>
              </div>
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
