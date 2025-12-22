<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const services = [
  {
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    title: 'Achat & Vente',
    description:
      'Accompagnement complet pour l\'achat et la vente de votre bien immobilier avec expertise et négociation.',
    color: 'bg-blue-600',
  },
  {
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Location',
    description:
      'Gestion locative professionnelle et recherche de biens à louer adaptés à vos besoins.',
    color: 'bg-[#00A699]',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Évaluation',
    description:
      'Expertise et estimation précise de la valeur de votre bien immobilier par nos experts certifiés.',
    color: 'bg-[#FC642D]',
  },
  {
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    title: 'Conseil',
    description:
      'Conseils personnalisés pour vos projets immobiliers avec notre équipe d\'experts à votre écoute.',
    color: 'bg-[#484848]',
  },
]

const props = defineProps<{
  variant?: 'white' | 'blue'
}>()

const { isVisible, elementRef } = useScrollAnimation()
</script>

<template>
  <section
    ref="elementRef"
    class="relative py-20 lg:py-24 bg-[#1976D2] overflow-hidden border-t border-white/5"
  >
    <!-- Background Decor - Elite Style -->
    <div class="absolute inset-0 z-0">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1454165833767-027508496b4c?w=1600&q=80" 
          class="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110"
          alt="Services background"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-[#1976D2]/95 via-[#1976D2]/90 to-[#1976D2]/95"></div>
      </div>
      
      <!-- Premium Mesh Gradient -->
      <div class="absolute inset-0 opacity-40 mix-blend-overlay">
        <div class="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-400/30 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div class="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-white/10 rounded-full blur-[150px] animate-pulse-slow animation-delay-2000"></div>
      </div>

      <!-- Tech Grid Overlay -->
      <div class="absolute inset-0 opacity-[0.08] animate-grid-slide"
           style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 80px 80px;">
      </div>

      <!-- Cinema Grain -->
      <div class="absolute inset-0 opacity-[0.02] contrast-150 pointer-events-none z-50" 
           style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E');">
      </div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="text-left mb-16 space-y-4 transition-all duration-1000 ease-out"
        :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-10': !isVisible }"
      >
        <h2 class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
          Une expérience <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">sur mesure</span>
        </h2>
        <p class="text-blue-50 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Une gamme complète de solutions immobilières conçues pour l'excellence et la sérénité.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="transition-all duration-700 ease-out"
          :style="{ transitionDelay: `${index * 150}ms` }"
          :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-20': !isVisible }"
        >
          <div
            class="h-full bg-white/[0.05] backdrop-blur-xl rounded-[40px] p-8 lg:p-10 border border-white/10 hover:bg-white/[0.1] hover:border-white/30 hover:-translate-y-4 transition-all duration-500 group shadow-2xl"
          >
            <div
              :class="[
                'w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-white',
              ]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 text-[#1976D2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="service.icon"
                />
              </svg>
            </div>
            <h3 class="text-2xl font-black text-white mb-4 tracking-tighter group-hover:text-blue-100 transition-colors">
              {{ service.title }}
            </h3>
            <p class="text-blue-50/70 text-base leading-relaxed font-light line-clamp-2">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes grid-slide {
  from { background-position: 0 0; }
  to { background-position: 80px 80px; }
}

.animate-grid-slide {
  animation: grid-slide 20s linear infinite;
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.1); opacity: 0.6; }
}

.animate-pulse-slow {
  animation: pulse-slow 10s ease-in-out infinite;
}

.animation-delay-2000 { animation-delay: 2s; }

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}

section {
  font-family: 'Inter', sans-serif;
}
</style>
