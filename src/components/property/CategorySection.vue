<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Property, Service } from '@/types/property'
import PropertyCard from './PropertyCard.vue'
import ServiceCard from './ServiceCard.vue'

const router = useRouter()

interface Props {
  title: string
  subtitle?: string
  properties?: Property[]
  services?: Service[]
  category: 'for-sale' | 'for-rent' | 'moving-service' | 'butler-service'
  variant?: 'white' | 'blue'
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 4,
  properties: () => [],
  services: () => [],
  variant: 'white',
})

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
  return { path: `/category/${props.category}` }
})
</script>

<template>
  <section
    v-if="hasItems"
    :class="[
      'relative py-20 lg:py-24 overflow-hidden transition-colors duration-1000',
      variant === 'white' 
        ? 'bg-white border-t border-slate-100' 
        : 'bg-[#1976D2] border-t border-white/5'
    ]"
  >
    <!-- Background Decor - Elite Style -->
    <div class="absolute inset-0 z-0">
      <!-- White Style Decor -->
      <template v-if="variant === 'white'">
        <!-- Premium Mesh Gradient -->
        <div class="absolute inset-0 opacity-30 mix-blend-multiply">
          <div class="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div class="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-slate-100 rounded-full blur-[150px] animate-pulse-slow animation-delay-2000"></div>
        </div>

        <!-- Tech Grid Overlay -->
        <div class="absolute inset-0 opacity-[0.02]"
             style="background-image: linear-gradient(#1976D2 1px, transparent 1px), linear-gradient(90deg, #1976D2 1px, transparent 1px); background-size: 80px 80px;">
        </div>
      </template>

      <!-- Blue Style Decor -->
      <template v-else>
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0">
          <img 
            :src="category === 'for-sale' ? 'https://images.unsplash.com/photo-1600585154340-be6199f7c009?w=1600&q=80' : 'https://images.unsplash.com/photo-1600607687940-c52fb0729a5c?w=1600&q=80'" 
            class="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110"
            alt="Property category background"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-[#1976D2]/95 via-[#1976D2]/90 to-[#1976D2]/95"></div>
        </div>
        
        <!-- Tech Grid Overlay -->
        <div class="absolute inset-0 opacity-[0.08] animate-grid-slide"
             style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 80px 80px;">
        </div>
      </template>

      <!-- Cinema Grain (Always) -->
      <div class="absolute inset-0 opacity-[0.015] contrast-125 pointer-events-none z-50" 
           style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E');">
      </div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
      >
        <!-- Left Side - Text -->
        <div class="flex-1 space-y-4 text-left">
          <h2
            :class="[
              'text-4xl md:text-6xl font-black tracking-tighter leading-tight',
              variant === 'white' ? 'text-slate-900' : 'text-white'
            ]"
          >
            {{ title }}
          </h2>
          <p
            v-if="subtitle"
            :class="[
              'text-xl max-w-3xl leading-relaxed font-light',
              variant === 'white' ? 'text-slate-500' : 'text-blue-50'
            ]"
          >
            {{ subtitle }}
          </p>
        </div>
          
        <router-link
          :to="getViewAllLink"
          :class="[
            'inline-flex items-center space-x-4 px-8 py-4 font-black uppercase tracking-[0.3em] text-[10px] rounded-24 transition-all duration-500 border active:scale-95 shadow-xl group whitespace-nowrap',
            variant === 'white'
              ? 'bg-white hover:bg-[#1976D2] text-[#1976D2] hover:text-white border-slate-200 hover:border-[#1976D2]'
              : 'bg-white/5 hover:bg-white text-white hover:text-[#1976D2] border-white/10 hover:border-white'
          ]"
        >
          <span>Voir tout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </router-link>
      </div>

      <!-- Grid with v-motion -->
      <div
        v-if="category === 'moving-service' || category === 'butler-service'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        <div
          v-for="(service, index) in displayedItems as Service[]"
          :key="service.id"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ 
            opacity: 1, 
            y: 0, 
            transition: { 
              delay: index * 100,
              type: 'spring',
              stiffness: 100,
              damping: 15
            } 
          }"
        >
          <ServiceCard :service="service" />
        </div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(property, index) in (displayedItems as Property[])"
          :key="property.id"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ 
            opacity: 1, 
            y: 0, 
            transition: { 
              delay: index * 100,
              type: 'spring',
              stiffness: 100,
              damping: 15
            } 
          }"
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

@keyframes grid-slide {
  from { background-position: 0 0; }
  to { background-position: 80px 80px; }
}

.animate-grid-slide {
  animation: grid-slide 20s linear infinite;
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.1); opacity: 0.3; }
}

.animate-pulse-slow {
  animation: pulse-slow 10s ease-in-out infinite;
}

</style>
