<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Property, Service } from '@/types/property'
import PropertyCard from './PropertyCard.vue'
import ServiceCard from './ServiceCard.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const router = useRouter()

interface Props {
  title: string
  subtitle?: string
  properties: Property[]
  services?: Service[]
  category: 'for-sale' | 'for-rent' | 'moving-service' | 'butler-service'
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 4,
  services: () => [],
})

const { isVisible, elementRef } = useScrollAnimation()

const displayedItems = computed(() => {
  if (props.category === 'moving-service' || props.category === 'butler-service') {
    return props.services?.slice(0, props.limit) || []
  }
  return props.properties
    .filter((p) => p.category === props.category)
    .slice(0, props.limit)
})

const hasItems = computed(() => {
  if (props.category === 'moving-service' || props.category === 'butler-service') {
    return (props.services?.length || 0) > 0
  }
  return props.properties.filter((p) => p.category === props.category).length > 0
})

const getViewAllLink = computed(() => {
  if (props.category === 'moving-service' || props.category === 'butler-service') {
    return { path: '/services', query: { category: props.category } }
  }
  return { path: '/properties', query: { status: props.category } }
})
</script>

<template>
  <section
    ref="elementRef"
    v-if="hasItems"
    class="relative py-12 lg:py-16 overflow-hidden"
    :class="{
      'bg-gradient-to-br from-white via-blue-50/30 to-gray-50': category === 'for-sale',
      'bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/20': category === 'for-rent',
      'bg-gradient-to-br from-gray-50 via-blue-50/20 to-white': category === 'moving-service',
      'bg-gradient-to-br from-white via-purple-50/20 to-blue-50/30': category === 'butler-service',
    }"
    style="font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
  >
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Decorative elements for all sections -->
      <template v-if="category === 'for-sale' || category === 'for-rent' || category === 'moving-service'">
        
        <!-- Animated Floating Orbs -->
        <div
          class="decorative-orb w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-indigo-500/15"
          style="top: -15%; right: -10%; animation-delay: 0s; animation-duration: 25s"
        ></div>
        <div
          class="decorative-orb w-[450px] h-[450px] bg-gradient-to-br from-indigo-400/20 to-purple-500/15"
          style="bottom: -15%; left: -10%; animation-delay: 3s; animation-duration: 20s"
        ></div>
        <div
          class="decorative-orb w-[350px] h-[350px] bg-gradient-to-br from-blue-300/15 to-cyan-400/10"
          style="top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: 6s; animation-duration: 30s"
        ></div>
        
        <!-- Geometric Shapes -->
        <div
          class="absolute top-20 right-20 w-32 h-32 border-4 border-blue-300/20 rounded-lg rotate-45 animate-float"
          style="animation-delay: 1s; animation-duration: 8s"
        ></div>
        <div
          class="absolute bottom-32 left-24 w-24 h-24 bg-indigo-300/15 rounded-full animate-float"
          style="animation-delay: 4s; animation-duration: 10s"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-purple-300/20 rotate-12 animate-float"
          style="animation-delay: 2s; animation-duration: 12s"
        ></div>
        
        <!-- Grid Pattern -->
        <div
          class="absolute inset-0 opacity-20"
          style="background-image: linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px); background-size: 60px 60px;"
        ></div>
        
        <!-- Dots Pattern -->
        <div
          class="absolute inset-0 opacity-15"
          style="background-image: radial-gradient(circle, rgba(99, 102, 241, 0.2) 1.5px, transparent 1.5px); background-size: 40px 40px;"
        ></div>
        
        <!-- Light Rays -->
        <div
          class="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-300/10 to-transparent"
          style="transform: rotate(15deg);"
        ></div>
        <div
          class="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-indigo-300/10 to-transparent"
          style="transform: rotate(-10deg);"
        ></div>
      </template>
      
      <!-- Special Abstract Background for "Services de majordome" -->
      <template v-else-if="category === 'butler-service'">
        <!-- Gradient Background -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/60 to-cyan-50/40"
        ></div>
        
        <!-- Animated Floating Orbs - Multiple Layers -->
        <div
          class="decorative-orb w-[600px] h-[600px] bg-gradient-to-br from-blue-400/25 to-indigo-500/20"
          style="top: -20%; right: -15%; animation-delay: 0s; animation-duration: 30s"
        ></div>
        <div
          class="decorative-orb w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/20 to-purple-500/15"
          style="bottom: -20%; left: -15%; animation-delay: 4s; animation-duration: 25s"
        ></div>
        <div
          class="decorative-orb w-[400px] h-[400px] bg-gradient-to-br from-blue-300/20 to-cyan-400/15"
          style="top: 30%; left: 20%; animation-delay: 2s; animation-duration: 35s"
        ></div>
        <div
          class="decorative-orb w-[350px] h-[350px] bg-gradient-to-br from-indigo-300/15 to-blue-300/10"
          style="bottom: 25%; right: 25%; animation-delay: 6s; animation-duration: 28s"
        ></div>
        
        <!-- Geometric Shapes - Elegant -->
        <div
          class="absolute top-16 right-32 w-40 h-40 border-4 border-blue-300/25 rounded-2xl rotate-12 animate-float"
          style="animation-delay: 1s; animation-duration: 10s"
        ></div>
        <div
          class="absolute bottom-40 left-32 w-32 h-32 bg-indigo-300/20 rounded-full animate-float"
          style="animation-delay: 3s; animation-duration: 12s"
        ></div>
        <div
          class="absolute top-1/2 right-1/3 w-24 h-24 border-3 border-cyan-300/20 rotate-45 rounded-lg animate-float"
          style="animation-delay: 5s; animation-duration: 14s"
        ></div>
        <div
          class="absolute bottom-20 right-16 w-20 h-20 bg-blue-300/15 rounded-full animate-float"
          style="animation-delay: 2s; animation-duration: 11s"
        ></div>
        <div
          class="absolute top-1/4 left-1/3 w-28 h-28 border-2 border-indigo-300/20 rotate-12 animate-float"
          style="animation-delay: 4s; animation-duration: 13s"
        ></div>
        
        <!-- Elegant Grid Pattern -->
        <div
          class="absolute inset-0 opacity-25"
          style="background-image: linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px); background-size: 70px 70px;"
        ></div>
        
        <!-- Dots Pattern - Refined -->
        <div
          class="absolute inset-0 opacity-20"
          style="background-image: radial-gradient(circle, rgba(99, 102, 241, 0.25) 2px, transparent 2px); background-size: 45px 45px;"
        ></div>
        
        <!-- Light Rays - Blue -->
        <div
          class="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-300/15 to-transparent"
          style="transform: rotate(12deg);"
        ></div>
        <div
          class="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-300/15 to-transparent"
          style="transform: rotate(-8deg);"
        ></div>
        <div
          class="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-300/12 to-transparent"
          style="transform: rotate(5deg);"
        ></div>
        
        <!-- Decorative Circles -->
        <div
          class="absolute top-10 right-10 w-16 h-16 border-2 border-blue-300/30 rounded-full animate-float"
          style="animation-delay: 1.5s; animation-duration: 9s"
        ></div>
        <div
          class="absolute bottom-16 left-20 w-12 h-12 border-2 border-indigo-300/30 rounded-full animate-float"
          style="animation-delay: 3.5s; animation-duration: 11s"
        ></div>
      </template>
      
      <!-- Default Background for other categories -->
      <template v-else>
        <div
          class="decorative-orb w-96 h-96 bg-blue-400/10"
          :style="{ top: '10%', right: '10%', animationDelay: '0s' }"
        ></div>
        <div
          class="decorative-orb w-72 h-72 bg-indigo-400/10"
          :style="{ bottom: '10%', left: '10%', animationDelay: '2s', animationDuration: '15s' }"
        ></div>
        <div class="decorative-dots opacity-30"></div>
      </template>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with Scroll Animation -->
      <div
        class="mb-8 scroll-fade-in-up"
        :class="{ visible: isVisible }"
      >
        <div class="flex items-center justify-between gap-4 mb-2">
          <div class="flex-1">
            <h2 class="text-2xl lg:text-3xl font-semibold text-gray-900">{{ title }}</h2>
            <p v-if="subtitle" class="text-sm lg:text-base text-gray-600 mt-1">{{ subtitle }}</p>
          </div>
          <router-link
            :to="getViewAllLink"
            class="view-all-btn inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 whitespace-nowrap flex-shrink-0 hover-lift group shadow-md hover:shadow-xl hover:shadow-blue-500/30"
          >
            <span class="relative z-10">Voir tout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Grid with Stagger Animation -->
      <div
        v-if="category === 'moving-service' || category === 'butler-service'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        <div
          v-for="(service, index) in displayedItems as Service[]"
          :key="service.id"
          class="scroll-fade-in-up"
          :class="{ visible: isVisible, [`stagger-${index + 1}`]: true }"
        >
          <ServiceCard :service="service" />
        </div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(property, index) in displayedItems"
          :key="property.id"
          class="scroll-fade-in-up"
          :class="{ visible: isVisible, [`stagger-${index + 1}`]: true }"
        >
          <PropertyCard :property="property" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Force white text on hover for "Voir tout" button */
.view-all-btn:hover span,
.view-all-btn:hover svg {
  color: white !important;
}

.view-all-btn:hover {
  background-color: #1976D2 !important;
  border-color: #1976D2 !important;
}
</style>
