<script setup lang="ts">
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const features = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Sécurité garantie',
    description: 'Toutes nos transactions sont sécurisées et transparentes',
  },
  {
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Meilleurs prix',
    description: 'Nous négocions les meilleurs prix pour vous',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Disponible 24/7',
    description: 'Notre équipe est disponible pour vous aider à tout moment',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    title: 'Agents experts',
    description: 'Une équipe d\'agents immobiliers certifiés et expérimentés',
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
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" 
          class="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110"
          alt="Luxury home background"
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
      <!-- Header Aligned Left -->
      <div
        class="text-left mb-20 space-y-4"
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 1000, ease: 'easeOut' } }"
      >

        <h2 class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight max-w-3xl">
          Pourquoi choisir <br class="hidden md:block" /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">l'excellence ?</span>
        </h2>
        <p class="text-blue-50 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
          Nous redéfinissons les standards de l'immobilier en RDC par l'innovation et la transparence.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="group relative"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ 
            opacity: 1, 
            y: 0, 
            transition: { 
              delay: index * 100,
              type: 'spring',
              stiffness: 50
            } 
          }"
          :hovered="{ 
            y: -10,
            scale: 1.02,
            transition: { type: 'spring', stiffness: 300, damping: 10 } 
          }"
        >
          <!-- Feature Card - Awwwards Glassmorphism -->
          <div class="relative h-full bg-white/[0.08] backdrop-blur-xl border border-white/20 rounded-[40px] p-8 lg:p-10 transition-all duration-500 overflow-hidden shadow-2xl">
            <!-- Numbering Display -->
            <div class="absolute -top-6 -right-6 text-9xl font-black text-white/[0.03] transition-colors duration-500 group-hover:text-white/[0.06]">
              0{{ index + 1 }}
            </div>

            <div class="relative z-10 flex flex-col h-full">
              <div class="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
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
                    :d="feature.icon"
                  />
                </svg>
              </div>
              
              <h3 class="text-2xl font-black text-white mb-4 tracking-tighter group-hover:text-blue-100 transition-colors">
                {{ feature.title }}
              </h3>
              
              <p class="text-blue-50/70 text-base leading-relaxed font-light">
                {{ feature.description }}
              </p>
            </div>

            <!-- Bottom decorative glow -->
            <div class="absolute bottom-[-50px] left-[50%] translate-x-[-50%] w-[120px] h-[120px] bg-white/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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

section {
  font-family: 'Inter', sans-serif;
}
</style>
