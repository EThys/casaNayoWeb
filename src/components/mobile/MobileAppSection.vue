<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const props = defineProps<{
  variant?: 'white' | 'blue'
}>()

const steps = [
  {
    id: 1,
    title: 'Ouvrir la boutique',
    description: 'Accédez à l\'App Store ou Google Play Store sur votre smartphone.',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
  {
    id: 2,
    title: 'Rechercher Casa Nayo',
    description: 'Tapez "Casa Nayo" dans la barre de recherche.',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  },
  {
    id: 3,
    title: 'Télécharger & Installer',
    description: 'Appuyez sur "Installer" et laissez la magie opérer.',
    icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
  },
]

const { isVisible, elementRef } = useScrollAnimation()
const activeStep = ref(1)
const phoneScale = ref(1)
const phoneRotate = ref(0)

onMounted(() => {
})
</script>

<template>
  <section
    ref="elementRef"
    :class="[
      'py-20 lg:py-24 relative overflow-hidden transition-colors duration-1000',
      variant === 'blue' ? 'bg-[#1976D2] text-white' : 'bg-white text-slate-900 border-t border-slate-100'
    ]"
  >
    <!-- Background Decor - Elite Style -->
    <div class="absolute inset-0 z-0">
      <template v-if="variant === 'white'">
        <!-- Premium Mesh Gradient -->
        <div class="absolute inset-0 opacity-40 mix-blend-multiply">
          <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-100 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000"></div>
        </div>

        <!-- Abstract Connectivity Patterns -->
        <svg class="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="#1976D2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
          
          <path d="M0 100 Q 250 50 500 100 T 1000 100" fill="none" stroke="#1976D2" stroke-width="0.5" class="animate-dash" stroke-dasharray="10,10" />
          <path d="M0 200 Q 300 150 600 200 T 1200 200" fill="none" stroke="#1976D2" stroke-width="0.5" class="animate-dash-reverse" stroke-dasharray="10,10" />
        </svg>

        <!-- Tech Grid Overlay -->
        <div class="absolute inset-0 opacity-[0.02]"
             style="background-image: linear-gradient(#1976D2 1px, transparent 1px), linear-gradient(90deg, #1976D2 1px, transparent 1px); background-size: 80px 80px;">
        </div>
      </template>

      <template v-else>
        <!-- Blue Style Decor -->
        <div class="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512428559083-a401c3782b5a?w=1600&q=80" 
            class="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110"
            alt="Mobile app background"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-[#1976D2]/95 via-[#1976D2]/90 to-[#1976D2]/95"></div>
        </div>
        
        <div class="absolute inset-0 opacity-[0.05] animate-grid-slide"
             style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 80px 80px;">
        </div>
      </template>

      <!-- Cinema Grain -->
      <div class="absolute inset-0 opacity-[0.015] contrast-125 pointer-events-none z-50" 
           style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E');">
      </div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div 
        class="text-left mb-20 space-y-4"
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 1000 } }"
      >
        <h2
          :class="[
            'text-4xl md:text-6xl font-black tracking-tighter leading-tight',
            variant === 'white' ? 'text-slate-900' : 'text-white'
          ]"
        >
          Guide de <span :class="variant === 'white' ? 'text-[#1976D2]' : 'text-blue-100'">téléchargement</span>
        </h2>
        <p :class="[
          'text-lg md:text-xl max-w-2xl font-light leading-relaxed',
          variant === 'white' ? 'text-slate-500' : 'text-blue-100/70'
        ]">
          Suivez ces étapes simples pour accéder à l'écosystème Casa Nayo sur votre mobile.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Steps Guide -->
        <div class="space-y-6">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            @mouseenter="activeStep = step.id"
          >
            <div
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :visibleOnce="{ opacity: 1, x: 0, transition: { delay: index * 100 } }"
              class="relative rounded-[40px] p-8 border transition-all duration-700 cursor-pointer overflow-hidden group"
              :class="[
                variant === 'white'
                  ? (activeStep === step.id ? 'bg-white border-[#1976D2] shadow-[0_40px_80px_-20px_rgba(25,118,210,0.15)] -translate-y-2' : 'bg-white border-slate-100 hover:border-blue-100')
                  : (activeStep === step.id ? 'bg-white/10 border-white/30 -translate-y-2' : 'bg-white/5 border-white/10')
              ]"
            >
              <!-- Background accent for active white step -->
              <div v-if="variant === 'white' && activeStep === step.id" class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent"></div>
              <div class="flex items-center gap-8 relative z-10">
                <!-- Step Number -->
                <div
                  class="flex-shrink-0 w-16 h-16 rounded-[24px] border flex items-center justify-center font-black text-2xl transition-all duration-700"
                  :class="[
                    variant === 'white'
                      ? (activeStep === step.id ? 'bg-[#1976D2] text-white rotate-6 shadow-2xl scale-110' : 'bg-white border-slate-200 text-slate-400')
                      : (activeStep === step.id ? 'bg-white text-[#1976D2] scale-110' : 'bg-white/5 border-white/10 text-white')
                  ]"
                >
                  {{ step.id }}
                </div>

                <!-- Step Content -->
                <div class="flex-1">
                  <h3
                    class="text-2xl font-black tracking-tighter mb-2 transition-all duration-500"
                    :class="[
                      activeStep === step.id 
                        ? (variant === 'white' ? 'text-[#1976D2]' : 'text-blue-300')
                        : (variant === 'white' ? 'text-slate-900 group-hover:text-[#1976D2]' : 'text-white')
                    ]"
                  >
                    {{ step.title }}
                  </h3>
                  <p
                    class="leading-relaxed font-light transition-all duration-500"
                    :class="[
                      activeStep === step.id 
                        ? (variant === 'white' ? 'text-slate-600' : 'text-white')
                        : (variant === 'white' ? 'text-slate-400' : 'text-blue-100/50')
                    ]"
                  >
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Download Buttons -->
          <div
            class="mt-12 pt-6 border-t"
            :class="[
              variant === 'white' ? 'border-slate-100' : 'border-white/5'
            ]"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 500 } }"
          >
            <div class="flex flex-col sm:flex-row gap-6">
              <a
                href="#"
                :class="[
                  'group inline-flex items-center space-x-4 px-8 py-5 rounded-3xl transition-all duration-500 border active:scale-95 shadow-xl',
                  variant === 'white'
                    ? 'bg-slate-50 hover:bg-slate-900 border-slate-200 hover:border-slate-900 text-slate-900 hover:text-white'
                    : 'bg-white/5 hover:bg-white border-white/10 hover:border-white text-white hover:text-[#1976D2]'
                ]"
              >
                <svg
                  class="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div class="text-left">
                  <span class="block text-[10px] font-black uppercase tracking-[0.2em] opacity-50">App Store</span>
                  <span class="text-xl font-black tracking-tight">iPhone</span>
                </div>
              </a>
              
              <a
                href="#"
                :class="[
                  'group inline-flex items-center space-x-4 px-8 py-5 rounded-3xl transition-all duration-500 border active:scale-95 shadow-xl',
                  variant === 'white'
                    ? 'bg-slate-50 hover:bg-slate-900 border-slate-200 hover:border-slate-900 text-slate-900 hover:text-white'
                    : 'bg-white/5 hover:bg-white border-white/10 hover:border-white text-white hover:text-[#003B95]'
                ]"
              >
                <svg
                  class="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div class="text-left">
                  <span class="block text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Google Play</span>
                  <span class="text-xl font-black tracking-tight">Android</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Phone Mockup -->
        <div
          class="hidden lg:flex justify-center items-center"
          v-motion
          :initial="{ opacity: 0, scale: 0.8, rotateY: 30 }"
          :visibleOnce="{ 
            opacity: 1, 
            scale: 1, 
            rotateY: 0, 
            transition: { 
              type: 'spring', 
              stiffness: 50,
              damping: 10,
              delay: 300
            } 
          }"
          :enter="{
            scale: 1.05,
            transition: {
              repeat: Infinity,
              repeatType: 'mirror',
              duration: 3000,
              ease: 'easeInOut'
            }
          }"
        >
          <div class="relative">
            <!-- Premium Glow -->
            <div
              :class="[
                'absolute inset-0 rounded-[3.5rem] blur-[80px] -z-10 animate-pulse-slow',
                variant === 'white' ? 'bg-blue-100' : 'bg-blue-600/30'
              ]"
            ></div>

            <!-- Phone Frame -->
            <div
              :class="[
                'w-80 h-[640px] rounded-[4.5rem] p-4 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.3)] relative border-[6px]',
                variant === 'white' ? 'bg-slate-900 border-slate-200' : 'bg-slate-900 border-white/10'
              ]"
            >
              <!-- Phone Reflection/Glow -->
              <div class="absolute inset-0 rounded-[4rem] overflow-hidden pointer-events-none">
                <div class="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>
              </div>

              <!-- Screen -->
              <div class="w-full h-full bg-[#1976D2] rounded-[3.5rem] overflow-hidden relative border border-white/10 shadow-inner">
                <!-- Status Bar -->
                <div class="h-14 bg-black/20 flex items-center justify-center border-b border-white/5 backdrop-blur-md">
                   <!-- Island / Notch -->
                  <div class="w-28 h-7 bg-black rounded-full flex items-center justify-end px-4 gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#1976D2]/50"></div>
                    <div class="w-1 h-1 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                <!-- Mock App Content -->
                <div class="p-6 space-y-8">
                  <div class="flex items-center justify-between">
                    <div class="w-12 h-12 bg-white rounded-2xl shadow-xl"></div>
                    <div class="w-10 h-10 bg-white/10 rounded-full"></div>
                  </div>
                  
                  <div class="space-y-4">
                    <div class="h-8 bg-white/20 rounded-xl w-3/4"></div>
                    <div class="h-4 bg-white/10 rounded-lg w-1/2"></div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div class="aspect-square bg-white/10 rounded-3xl border border-white/5"></div>
                    <div class="aspect-square bg-white/10 rounded-3xl border border-white/5"></div>
                  </div>
                  
                  <div class="h-32 bg-gradient-to-br from-white/20 to-transparent rounded-3xl border border-white/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes dash {
  from { stroke-dashoffset: 200; }
  to { stroke-dashoffset: 0; }
}

@keyframes dash-reverse {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 200; }
}

.animate-dash {
  animation: dash 30s linear infinite;
}

.animate-dash-reverse {
  animation: dash-reverse 40s linear infinite;
}

@keyframes grid-slide {
  from { background-position: 0 0; }
  to { background-position: 80px 80px; }
}

.animate-grid-slide {
  animation: grid-slide 20s linear infinite;
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.5; }
}

.animate-pulse-slow {
  animation: pulse-slow 10s ease-in-out infinite;
}

.animation-delay-2000 { animation-delay: 2s; }

section {
  font-family: 'Inter', sans-serif;
}
</style>
