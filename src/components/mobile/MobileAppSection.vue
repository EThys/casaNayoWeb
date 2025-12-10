<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { isVisible, elementRef } = useScrollAnimation()
const activeStep = ref(1)
const phoneScale = ref(1)
const phoneRotate = ref(0)

const steps = [
  {
    id: 1,
    title: 'Recherchez notre plateforme',
    description:
      'Accédez à la plateforme de téléchargement correspondante à votre appareil (Google Play Store, App Store ou notre site officiel).',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
  {
    id: 2,
    title: 'Téléchargez et installez',
    description:
      'Appuyez sur le bouton de téléchargement et suivez les instructions pour l\'installation sur votre appareil.',
    icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 8m4 4v12',
  },
  {
    id: 3,
    title: 'Lancez l\'application',
    description:
      'Recherchez notre application, lancez-la et commencez à l\'utiliser immédiatement pour découvrir toutes nos fonctionnalités.',
    icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
  },
]

onMounted(() => {
  // Animate phone on mount
  setTimeout(() => {
    phoneScale.value = 1.05
    phoneRotate.value = 2
  }, 500)
  
  // Continuous subtle animation
  setInterval(() => {
    phoneScale.value = phoneScale.value === 1 ? 1.02 : 1
    phoneRotate.value = phoneRotate.value === 0 ? 1 : 0
  }, 3000)
})
</script>

<template>
  <section
    ref="elementRef"
    class="py-20 lg:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden"
    style="font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
  >
    <!-- Enhanced Background Pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Animated Orbs -->
      <div
        class="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl animate-float"
        style="animation-delay: 0s; animation-duration: 20s"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-float"
        style="animation-delay: 3s; animation-duration: 25s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl animate-float"
        style="animation-delay: 6s; animation-duration: 30s; transform: translate(-50%, -50%)"
      ></div>
      
      <!-- Geometric Shapes -->
      <div
        class="absolute top-20 right-32 w-32 h-32 border-4 border-white/20 rounded-2xl rotate-45 animate-float"
        style="animation-delay: 2s; animation-duration: 12s"
      ></div>
      <div
        class="absolute bottom-32 left-24 w-24 h-24 bg-white/10 rounded-full animate-float"
        style="animation-delay: 4s; animation-duration: 15s"
      ></div>
      
      <!-- Grid Pattern -->
      <div
        class="absolute inset-0 opacity-10"
        style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 50px 50px;"
      ></div>
      
      <!-- Dots Pattern -->
      <div
        class="absolute inset-0 opacity-15"
        style="background-image: radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px); background-size: 40px 40px;"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with Enhanced Animation - Left Aligned -->
      <div
        class="text-left mb-16 scroll-fade-in-up"
        :class="{ visible: isVisible }"
      >
        <div class="mb-6">
          <span
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold animate-scale-in border border-white/30 shadow-lg"
            :class="{ visible: isVisible }"
            style="animation-delay: 0.2s"
          >
            <span class="text-lg">📱</span>
            <span>Application Mobile</span>
          </span>
        </div>
        <h2
          class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-50 to-blue-100 bg-clip-text text-transparent leading-tight"
          style="text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2)"
        >
          Guide de téléchargement
        </h2>
        <div class="max-w-2xl">
          <p class="text-lg sm:text-xl text-blue-100 leading-relaxed">
            Suivez ces étapes simples pour télécharger et installer notre application mobile
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Steps Guide with Enhanced Animations -->
        <div class="space-y-6">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            class="scroll-fade-in-left group"
            :class="{ visible: isVisible, [`stagger-${index + 1}`]: true }"
            @mouseenter="activeStep = step.id"
          >
            <div
              class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl"
              :class="{
                'bg-white/20 border-white/40 scale-[1.02] shadow-2xl': activeStep === step.id,
              }"
            >
              <div class="flex items-start gap-6">
                <!-- Step Number with Pulse Animation -->
                <div
                  class="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-2xl transition-all duration-500 shadow-lg relative overflow-hidden"
                  :class="{
                    'bg-white text-blue-600 scale-110 shadow-2xl': activeStep === step.id,
                  }"
                >
                  <span class="relative z-10">{{ step.id }}</span>
                  <div
                    v-if="activeStep === step.id"
                    class="absolute inset-0 bg-white/30 rounded-2xl animate-ping"
                  ></div>
                </div>

                <!-- Step Content -->
                <div class="flex-1">
                  <div class="flex items-center gap-4 mb-3">
                    <div
                      class="p-3 bg-white/10 rounded-xl transition-all duration-500"
                      :class="{ 'bg-white/20 scale-110 rotate-6': activeStep === step.id }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-7 h-7 text-white transition-all duration-500"
                        :class="{ 'scale-110': activeStep === step.id }"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2.5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          :d="step.icon"
                        />
                      </svg>
                    </div>
                    <h3
                      class="text-2xl font-bold transition-all duration-500"
                      :class="{ 'text-blue-200 scale-105': activeStep === step.id }"
                    >
                      {{ step.title }}
                    </h3>
                  </div>
                  <p
                    class="text-blue-100 leading-relaxed text-lg transition-all duration-500"
                    :class="{ 'text-white': activeStep === step.id }"
                  >
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Download Buttons with Enhanced Animations -->
          <div
            class="mt-10 scroll-fade-in-up"
            :class="{ visible: isVisible }"
            style="animation-delay: 0.8s"
          >
            <p class="text-lg text-blue-200 mb-6 font-bold text-center sm:text-left">
              Téléchargez maintenant :
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                class="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7 h-7 mr-3 relative z-10 transition-transform duration-300 group-hover:rotate-12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                  />
                </svg>
                <div class="text-left relative z-10">
                  <div class="text-xs font-medium opacity-70">Télécharger sur</div>
                  <div class="text-xl font-bold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                class="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7 h-7 mr-3 relative z-10 transition-transform duration-300 group-hover:rotate-12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
                  />
                </svg>
                <div class="text-left relative z-10">
                  <div class="text-xs font-medium opacity-70">Disponible sur</div>
                  <div class="text-xl font-bold">Google Play</div>
                </div>
              </a>
            </div>
            <div class="mt-6 text-center sm:text-left">
              <a
                href="#"
                class="inline-flex items-center text-blue-200 hover:text-white text-base font-semibold underline transition-all duration-300 hover:scale-105"
              >
                <span>Ou téléchargez depuis notre site officiel</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Visual Guide / Phone Mockup with Enhanced Animation -->
        <div
          class="hidden lg:flex justify-center items-center scroll-fade-in-right"
          :class="{ visible: isVisible }"
        >
          <div
            class="relative transition-all duration-1000 ease-out"
            :style="{
              transform: `scale(${phoneScale}) rotate(${phoneRotate}deg)`,
            }"
          >
            <!-- Glow Effect -->
            <div
              class="absolute inset-0 bg-blue-400/30 rounded-[3rem] blur-3xl -z-10 animate-pulse"
              style="animation-duration: 3s"
            ></div>
            
            <!-- Phone Frame -->
            <div
              class="w-72 h-[550px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3.5rem] p-4 shadow-2xl border-4 border-white/10"
            >
              <div class="w-full h-full bg-white rounded-[3rem] overflow-hidden relative">
                <!-- Status Bar -->
                <div class="h-10 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                  <div class="w-40 h-1.5 bg-white/40 rounded-full"></div>
                </div>
                <!-- Screen Content -->
                <div class="h-[calc(100%-2.5rem)] bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-5">
                  <div class="space-y-4">
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-5">
                      <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg"></div>
                      <div class="text-sm font-bold text-gray-900">casaNayo</div>
                      <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
                    </div>
                    <!-- Search Bar -->
                    <div class="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                      <div class="text-sm text-gray-400">Rechercher...</div>
                    </div>
                    <!-- Property Cards -->
                    <div class="space-y-3">
                      <div class="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                        <div class="h-28 bg-gradient-to-br from-blue-200 to-indigo-200"></div>
                        <div class="p-3">
                          <div class="h-3.5 bg-gray-300 rounded-lg w-4/5 mb-2"></div>
                          <div class="h-2.5 bg-gray-200 rounded-lg w-3/5"></div>
                        </div>
                      </div>
                      <div class="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                        <div class="h-28 bg-gradient-to-br from-indigo-200 to-purple-200"></div>
                        <div class="p-3">
                          <div class="h-3.5 bg-gray-300 rounded-lg w-4/5 mb-2"></div>
                          <div class="h-2.5 bg-gray-200 rounded-lg w-3/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
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
section {
  font-family:
    'Circular',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
}

/* Enhanced Stagger animation delays */
.stagger-1 {
  transition-delay: 0.2s;
}

.stagger-2 {
  transition-delay: 0.4s;
}

.stagger-3 {
  transition-delay: 0.6s;
}

/* Pulse animation for active step */
@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Smooth scale animation */
.animate-scale-in {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-scale-in.visible {
  opacity: 1;
  transform: scale(1);
}
</style>
