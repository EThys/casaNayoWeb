<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Service } from '@/types/property'
import {
  plumberServices,
  electricianServices,
  painterServices,
  architectServices,
  carpenterServices,
  tilerServices,
  refrigerationServices,
  adjusterServices,
} from '@/data/mockData'

interface ServiceCategory {
  id: string
  name: string
  services: Service[]
}

const serviceCategories: ServiceCategory[] = [
  { id: 'plumber', name: 'Plomberie', services: plumberServices },
  { id: 'electrician', name: 'Électricité', services: electricianServices },
  { id: 'painter', name: 'Peinture', services: painterServices },
  { id: 'architect', name: 'Architecture', services: architectServices },
  { id: 'carpenter', name: 'Menuiserie', services: carpenterServices },
  { id: 'tiler', name: 'Carrelage', services: tilerServices },
  { id: 'refrigeration', name: 'Climatisation', services: refrigerationServices },
  { id: 'adjuster', name: 'Métallerie', services: adjusterServices },
]

const selectedCategory = ref<string>('plumber')

const currentServices = computed(() => {
  const category = serviceCategories.find((c) => c.id === selectedCategory.value)
  return category ? category.services : []
})

// Scroll reveal animation
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    },
  )

  // Observer tous les éléments avec scroll-reveal
  const elements = document.querySelectorAll('.scroll-reveal')
  elements.forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    class="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 relative overflow-hidden"
  >
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header - Enhanced with Button on Right -->
      <div
        class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 scroll-reveal"
      >
        <!-- Left Side - Text -->
        <div class="flex-1">
          <h2
            class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up"
            style="font-family: 'Poppins', sans-serif"
          >
            Services Professionnels
          </h2>
          <p
            class="text-xl text-gray-600 max-w-3xl leading-relaxed animate-fade-in animation-delay-200"
          >
            Trouvez les <span class="text-blue-600 font-semibold">meilleurs professionnels</span> de
            l'immobilier en République Démocratique du Congo
          </p>
        </div>

        <!-- Right Side - View All Button -->
        <div class="lg:pb-2">
          <router-link
            to="/services"
            class="view-all-professionals inline-flex items-center space-x-3 px-6 py-3 bg-white hover:bg-blue-600 text-gray-900 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 border-2 border-gray-200 hover:border-blue-600 transform hover:scale-105 group whitespace-nowrap"
          >
            <span class="relative z-10">Voir tous les professionnels</span>
            <svg
              class="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Tabs Navigation - Enhanced -->
      <div class="mb-12 scroll-reveal animation-delay-400">
        <div class="bg-white rounded-2xl shadow-lg p-2 border border-gray-200">
          <nav class="flex space-x-2 overflow-x-auto scrollbar-hide" aria-label="Services">
            <button
              v-for="category in serviceCategories"
              :key="category.id"
              @click="selectedCategory = category.id"
              class="whitespace-nowrap py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center space-x-2 group relative overflow-hidden"
              :class="{
                'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105':
                  selectedCategory === category.id,
                'text-gray-600 hover:text-blue-600 hover:bg-blue-50':
                  selectedCategory !== category.id,
              }"
            >
              <span class="relative z-10">{{ category.name }}</span>
              <span
                class="relative z-10 px-2 py-0.5 rounded-full text-xs font-bold transition-all"
                :class="{
                  'bg-white/20 text-white': selectedCategory === category.id,
                  'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700':
                    selectedCategory !== category.id,
                }"
              >
                {{ category.services.length }}
              </span>
              <!-- Hover Effect Background -->
              <div
                v-if="selectedCategory !== category.id"
                class="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
              ></div>
            </button>
          </nav>
        </div>
      </div>

      <!-- Services Display - Enhanced with Transition -->
      <TransitionGroup
        name="service-cards"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <router-link
          v-for="(service, index) in currentServices.slice(0, 3)"
          :key="`${selectedCategory}-${service.id}-${index}`"
          :to="`/service/${service.id}`"
          class="card-shimmer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group hover:-translate-y-2 block"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="flex flex-col h-full">
            <!-- Service Image with Overlay -->
            <div class="relative h-56 overflow-hidden">
              <img
                :src="service.images[0]"
                :alt="service.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <!-- Gradient Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"
              ></div>

              <!-- Rating Badge -->
              <div
                class="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-90 transform group-hover:scale-110 transition-transform duration-300"
              >
                <div class="flex items-center space-x-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                  <span class="text-base font-bold">{{ service.rating }}</span>
                  <span class="text-sm opacity-90">({{ service.reviews }})</span>
                </div>
              </div>

              <!-- Verified Badge -->
              <div
                class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-green-600 px-3 py-1.5 rounded-lg shadow-lg flex items-center space-x-1"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-xs font-bold">Vérifié</span>
              </div>
            </div>

            <!-- Service Info -->
            <div class="p-6 flex-1 flex flex-col">
              <h3
                class="text-xl font-bold text-gray-900 mb-3 truncate group-hover:text-blue-600 transition-colors duration-300"
                style="font-family: 'Inter', sans-serif"
                :title="service.title"
              >
                {{ service.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-5 line-clamp-2 flex-1 leading-relaxed">
                {{ service.description }}
              </p>

              <!-- Location & Availability -->
              <div class="space-y-3 mb-5">
                <div
                  class="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 text-blue-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span class="font-medium">{{ service.location }}</span>
                </div>
                <div
                  v-if="service.availability"
                  class="flex items-center text-sm text-gray-700 bg-green-50 px-3 py-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 mr-2 text-green-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="font-medium">{{ service.availability }}</span>
                </div>
              </div>

              <!-- Features -->
              <div class="flex flex-wrap gap-2 mb-5">
                <span
                  v-for="feature in service.features.slice(0, 4)"
                  :key="feature"
                  class="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100"
                >
                  {{ feature }}
                </span>
              </div>

              <!-- Price & Contact -->
              <div class="flex items-center justify-between pt-5 border-t border-gray-100">
                <div>
                  <div class="flex items-baseline space-x-1">
                    <span class="text-sm text-gray-500 font-medium">À partir de</span>
                    <span
                      class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"
                      >{{ service.price }}</span
                    >
                    <span class="text-lg text-gray-600 font-semibold">$</span>
                  </div>
                  <div class="text-xs text-gray-500 font-medium mt-1">Tarif selon prestation</div>
                </div>
                <button
                  @click.prevent.stop
                  class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 flex items-center space-x-2 group"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <span>Voir détails</span>
                </button>
              </div>
            </div>
          </div>
        </router-link>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Smooth scroll for tab navigation */
.scrollbar-hide {
  scroll-behavior: smooth;
}

/* Animation delays */
.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

/* Fade in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in 0.8s ease-out;
}

/* Scroll reveal */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Service Cards Transition - Enhanced */
.service-cards-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.service-cards-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  position: absolute;
  width: 100%;
}

.service-cards-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.9);
  filter: blur(4px);
}

.service-cards-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
  filter: blur(4px);
}

.service-cards-move {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Grid container for proper transition */
.grid {
  position: relative;
}

/* Force white text on hover for "Voir tous les professionnels" button */
.view-all-professionals:hover span,
.view-all-professionals:hover svg {
  color: white !important;
}

.view-all-professionals:hover {
  background-color: #1976d2 !important;
  border-color: #1976d2 !important;
}
</style>
