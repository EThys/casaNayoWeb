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

const { isVisible, elementRef } = useScrollAnimation()
</script>

<template>
  <section
    ref="elementRef"
    class="relative py-16 lg:py-24 bg-white overflow-hidden"
  >
    <!-- Decorative Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="decorative-orb w-[500px] h-[500px] bg-blue-400/5"
        style="top: -10%; right: -10%; animation-delay: 0s"
      ></div>
      <div
        class="decorative-orb w-[400px] h-[400px] bg-indigo-400/5"
        style="bottom: -10%; left: -10%; animation-delay: 3s; animation-duration: 18s"
      ></div>
      <div class="decorative-grid"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="text-center mb-12 lg:mb-16 scroll-fade-in-up"
        :class="{ visible: isVisible }"
      >
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Nos services
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Une gamme complète de services immobiliers pour répondre à tous vos besoins
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="scroll-scale-in"
          :class="{ visible: isVisible, [`stagger-${index + 1}`]: true }"
        >
          <div
            class="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div
              :class="[
                'w-14 h-14 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300',
                service.color,
              ]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="service.icon"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ service.title }}</h3>
            <p class="text-gray-600 leading-relaxed text-sm lg:text-base">{{ service.description }}</p>
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
