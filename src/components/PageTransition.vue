<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(false)
const progress = ref(0)
const loadingStage = ref(0)

const loadingMessages = [
  'Chargement',
  'Préparation',
  'Finalisation',
]

const currentMessage = computed(() => loadingMessages[loadingStage.value])

watch(
  () => route.path,
  () => {
    isLoading.value = true
    progress.value = 0
    loadingStage.value = 0
    
    // Simuler le chargement progressif avec étapes
    const interval = setInterval(() => {
      const increment = Math.random() * 25 + 10
      progress.value += increment
      
      // Changer le message selon la progression
      if (progress.value > 33 && loadingStage.value === 0) {
        loadingStage.value = 1
      } else if (progress.value > 66 && loadingStage.value === 1) {
        loadingStage.value = 2
      }
      
      if (progress.value >= 100) {
        progress.value = 100
        clearInterval(interval)
        setTimeout(() => {
          isLoading.value = false
          progress.value = 0
          loadingStage.value = 0
        }, 400)
      }
    }, 120)
  },
  { immediate: false }
)
</script>

<template>
  <!-- Page Loader -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isLoading" class="fixed inset-0 z-[9999] pointer-events-none">
      <!-- Progress Bar -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-300 ease-out shadow-lg shadow-blue-500/50"
          :style="{ width: `${progress}%` }"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      <!-- Overlay with Spinner -->
      <div class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <!-- Animated Logo Loader -->
        <div class="relative">
          <!-- Outer Ring -->
          <div class="w-24 h-24 rounded-full border-4 border-blue-100 absolute inset-0 animate-ping-slow"></div>
          
          <!-- Spinning Ring -->
          <div class="w-24 h-24 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-500 animate-spin-smooth"></div>
          
          <!-- Inner Logo -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center animate-pulse-scale shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-9 h-9 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
          </div>

          <!-- Orbiting Dots -->
          <div class="absolute inset-0 animate-spin-reverse-slow">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <div class="absolute inset-0 animate-spin-reverse-slow" style="animation-delay: 0.3s">
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <!-- Loading Text with Stage -->
        <div class="absolute bottom-1/3 left-1/2 -translate-x-1/2 space-y-2 text-center">
          <div class="flex items-center justify-center space-x-2">
            <span class="text-sm font-semibold text-blue-600" style="font-family: 'Poppins', sans-serif">
              {{ currentMessage }}
            </span>
            <div class="flex space-x-1">
              <div class="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0s"></div>
              <div class="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              <div class="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
          </div>
          <div class="text-xs text-gray-500 font-medium">
            {{ Math.round(progress) }}%
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

@keyframes spin-smooth {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-smooth {
  animation: spin-smooth 1s linear infinite;
}

@keyframes spin-reverse-slow {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.animate-spin-reverse-slow {
  animation: spin-reverse-slow 3s linear infinite;
}

@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

.animate-ping-slow {
  animation: ping-slow 2s ease-in-out infinite;
}

@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-pulse-scale {
  animation: pulse-scale 2s ease-in-out infinite;
}
</style>

