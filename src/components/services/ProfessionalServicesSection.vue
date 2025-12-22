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

const props = defineProps<{
  variant?: 'white' | 'blue'
}>()

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
  // Limit to 4 services as requested
  return category ? category.services.slice(0, 4) : []
})

const mousePosition = ref({ x: 0, y: 0 })
const sectionRef = ref<HTMLElement | null>(null)

const handleMouseMove = (e: MouseEvent) => {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  mousePosition.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section
    ref="sectionRef"
    :class="[
      'py-20 lg:py-24 relative overflow-hidden transition-all duration-1000',
      variant === 'blue' ? 'bg-[#1976D2] border-t border-white/5' : 'bg-slate-50/50'
    ]"
  >
    <!-- Background Decor - Refined Style -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <template v-if="variant === 'white'">
        <!-- Soft Mesh Gradient -->
        <div class="absolute inset-0 opacity-40">
          <div class="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-50 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
      </template>
      <template v-else>
        <!-- Blue Style Decor -->
        <div class="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" 
            class="w-full h-full object-cover opacity-20 mix-blend-overlay scale-110"
            alt="Professional services background"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-[#1976D2]/95 via-[#1976D2]/90 to-[#1976D2]/95"></div>
        </div>
        <div class="absolute inset-0 opacity-[0.05]"
             style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 80px 80px;">
        </div>
      </template>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Standardized Header -->
      <div
        class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <div class="flex-1 space-y-4">
          <h2
            :class="[
              'text-4xl md:text-6xl font-black tracking-tighter leading-tight',
              variant === 'white' ? 'text-slate-900' : 'text-white'
            ]"
          >
            Services <br class="md:hidden" />
            <span :class="variant === 'white' ? 'text-[#1976D2]' : 'text-white/80'">Professionnels</span>
          </h2>
          <p
            :class="[
              'text-lg md:text-xl max-w-2xl font-light leading-relaxed',
              variant === 'white' ? 'text-slate-500' : 'text-blue-50'
            ]"
          >
            Accédez à une sélection de prestataires qualifiés pour tous vos besoins immobiliers.
          </p>
        </div>

        <!-- View All Link Moved Here -->
        <div class="flex-shrink-0">
          <router-link
            to="/services"
            :class="[
              'inline-flex items-center space-x-3 px-8 py-4 font-black uppercase tracking-widest text-[10px] rounded-full border transition-all duration-500 active:scale-95 group',
              variant === 'white'
                ? 'bg-slate-900 text-white border-slate-900 hover:bg-[#1976D2] hover:border-[#1976D2]'
                : 'bg-white text-[#1976D2] border-white hover:bg-blue-50'
            ]"
          >
            <span>Voir tous les services</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Scrollable Category Selector -->
      <div 
        class="mb-12"
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :visibleOnce="{ opacity: 1, scale: 1, transition: { delay: 200 } }"
      >
        <nav class="flex items-center space-x-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 lg:mx-0 lg:px-0" aria-label="Services">
          <button
            v-for="category in serviceCategories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'whitespace-nowrap px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-500 flex items-center space-x-3 active:scale-95 border',
              selectedCategory === category.id
                ? (variant === 'white' 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                    : 'bg-white border-white text-[#1976D2] shadow-xl')
                : (variant === 'white'
                    ? 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                    : 'bg-white/10 border-white/10 text-white/60 hover:bg-white/20 hover:text-white')
            ]"
          >
            <span>{{ category.name }}</span>
            <span 
              class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
              :class="selectedCategory === category.id
                ? (variant === 'white' ? 'bg-white/20 text-white' : 'bg-[#1976D2]/10 text-[#1976D2]')
                : (variant === 'white' ? 'bg-slate-50 text-slate-400' : 'bg-white/5 text-white/40')"
            >
              {{ category.services.length }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Horizontal Row Display -->
      <div class="relative group">
        <TransitionGroup
          name="service-row"
          tag="div"
          class="flex space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide pb-12 -mx-4 px-4 lg:mx-0 lg:px-0"
        >
          <router-link
            v-for="(service, index) in currentServices"
            :key="`${selectedCategory}-${service.id}-${index}`"
            :to="`/service/${service.id}`"
            class="flex-shrink-0 w-[300px] md:w-[350px] lg:w-[400px] relative rounded-[40px] overflow-hidden group/card"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visibleOnce="{ 
              opacity: 1, 
              x: 0, 
              transition: { 
                delay: index * 100,
                type: 'spring',
                stiffness: 100,
                damping: 15
              } 
            }"
            :hovered="{ 
              y: -15, 
              scale: 1.02,
              transition: { type: 'spring', stiffness: 300 } 
            }"
          >
            <!-- Card Image -->
            <div class="aspect-[4/5] relative overflow-hidden rounded-[40px]">
              <img
                :src="service.images[0]"
                :alt="service.title"
                class="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity duration-700"></div>
              
              <!-- Content Overlay -->
              <div class="absolute inset-0 p-8 flex flex-col justify-end">
                <div class="space-y-4 transform transition-transform duration-700 group-hover/card:translate-y-[-10px]">
                  <div class="flex items-center justify-between">
                    <span class="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest text-white">
                      {{ service.location }}
                    </span>
                    <div class="flex items-center space-x-1">
                      <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-white text-xs font-bold">{{ service.rating }}</span>
                    </div>
                  </div>
                  
                  <h3 class="text-2xl lg:text-3xl font-black text-white tracking-tighter leading-tight group-hover/card:text-blue-200 transition-colors">
                    {{ service.title }}
                  </h3>
                  
                  <div class="flex items-center justify-between pt-4 border-t border-white/10">
                    <div class="flex flex-col">
                       <span class="text-white/40 text-[8px] font-black uppercase tracking-widest">À partir de</span>
                       <span class="text-2xl font-black text-white">${{ service.price }}</span>
                    </div>
                    
                    <div class="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl group-hover/card:scale-110 transition-all duration-500">
                       <svg class="w-5 h-5 transform rotate-[-45deg] transition-transform duration-500 group-hover/card:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                       </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.1); opacity: 0.6; }
}

.animate-pulse-slow {
  animation: pulse-slow 10s ease-in-out infinite;
}

.service-row-enter-active,
.service-row-leave-active {
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.service-row-enter-from,
.service-row-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

section {
  font-family: 'Inter', sans-serif;
}
</style>
