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

const { isVisible, elementRef } = useScrollAnimation()
</script>

<template>
  <section
    ref="elementRef"
    class="relative py-16 lg:py-24 bg-gray-50 overflow-hidden"
  >
    <!-- Decorative Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="decorative-orb w-96 h-96 bg-indigo-400/10"
        style="top: 20%; left: -5%; animation-delay: 1s"
      ></div>
      <div
        class="decorative-orb w-[450px] h-[450px] bg-blue-400/10"
        style="bottom: 10%; right: -5%; animation-delay: 4s; animation-duration: 20s"
      ></div>
      <div class="decorative-dots opacity-20"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="text-center mb-12 lg:mb-16 scroll-fade-in-up"
        :class="{ visible: isVisible }"
      >
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Pourquoi nous choisir ?
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Nous offrons les meilleurs services immobiliers pour vous aider à trouver votre bien idéal
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="scroll-fade-in-left"
          :class="{ visible: isVisible, [`stagger-${index + 1}`]: index % 2 === 0 }"
        >
          <div
            class="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="w-14 h-14 bg-blue-600/10 rounded-full flex items-center justify-center mb-6 transform hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="feature.icon"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600 text-sm lg:text-base">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
}
</style>
