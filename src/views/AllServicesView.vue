<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import MainLayout from '@/layouts/MainLayout.vue'
import ServiceCard from '@/components/property/ServiceCard.vue'
import { 
  movingServices, 
  butlerServices,
  plumberServices,
  electricianServices,
  painterServices,
  architectServices,
  carpenterServices,
  tilerServices,
  refrigerationServices,
  adjusterServices
} from '@/data/mockData'
import type { Service, ServiceCategory } from '@/types/property'

const route = useRoute()
const router = useRouter()

// Refs for animations
const heroTitleRef = ref<HTMLElement | null>(null)
const scrollY = ref(0)
const isFilterMenuOpen = ref(false)

// Get all services
const allServices = ref<Service[]>([
  ...movingServices, 
  ...butlerServices,
  ...plumberServices,
  ...electricianServices,
  ...painterServices,
  ...architectServices,
  ...carpenterServices,
  ...tilerServices,
  ...refrigerationServices,
  ...adjusterServices
])

// Filters
const selectedCategory = ref<ServiceCategory | 'all'>(
  (route.query.category as ServiceCategory | 'all') || 'all'
)
const searchQuery = ref((route.query.search as string) || '')

// Filtered services
const filteredServices = computed(() => {
  let filtered = [...allServices.value]

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter((s) => s.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.location.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Update URL when filters change
const updateFilters = () => {
  const query: Record<string, string> = {}
  if (selectedCategory.value !== 'all') query.category = selectedCategory.value
  if (searchQuery.value.trim()) query.search = searchQuery.value.trim()
  router.replace({ query })
}

// Service categories
const serviceCategories = [
  { id: 'all', name: 'Tous les services', icon: '🛠️' },
  { id: 'housekeeper', name: 'Ménage', icon: '🧹' },
  { id: 'moving-service', name: 'Déménagement', icon: '📦' },
  { id: 'electrician', name: 'Électricité', icon: '⚡' },
  { id: 'plumber', name: 'Plomberie', icon: '🔧' },
  { id: 'mason', name: 'Maçonnerie', icon: '🧱' },
  { id: 'carpenter', name: 'Menuiserie', icon: '🪚' },
  { id: 'painter', name: 'Peinture', icon: '🎨' },
  { id: 'butler-service', name: 'Majordome', icon: '🏠' },
  { id: 'refrigeration-technician', name: 'Froid & Clim', icon: '❄️' },
  { id: 'tiler', name: 'Carrelage', icon: '🧱' },
  { id: 'architect', name: 'Architecture', icon: '📐' },
  { id: 'adjuster', name: 'Ajusteur', icon: '🔩' },
] as const

const handleCategoryChange = (category: ServiceCategory | 'all') => {
  selectedCategory.value = category
  currentPage.value = 1
  isFilterMenuOpen.value = false
  updateFilters()
}

const resetFilters = () => {
  selectedCategory.value = 'all'
  searchQuery.value = ''
  currentPage.value = 1
  updateFilters()
}

// Pagination
const currentPage = ref(1)
const itemsPerPage = 12

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredServices.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredServices.value.length / itemsPerPage))
const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  if (heroTitleRef.value) {
    gsap.from(heroTitleRef.value, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out'
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const displayRange = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1
  const end = Math.min(currentPage.value * itemsPerPage, filteredServices.value.length)
  return { start, end }
})

const visiblePages = computed(() => {
  const pages: number[] = []
  for (let i = 1; i <= totalPages.value; i++) pages.push(i)
  return pages.slice(0, 7)
})
</script>

<template>
  <MainLayout :show-footer="true">
    <div class="min-h-screen bg-white overflow-x-hidden">
      <!-- Elite Majestic Hero Section -->
      <div class="relative min-h-[55vh] flex items-center overflow-hidden bg-[#1976D2] pt-40 pb-56">
        <!-- Digital & Cinematic Layers -->
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6954?w=1600&q=80" 
            class="w-full h-full object-cover opacity-25 scale-110"
            :style="{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }"
            alt="Services background"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-[#1976D2]/95 via-[#1976D2]/80 to-white"></div>
          
          <!-- Animated Background Grid -->
          <div class="absolute inset-0 opacity-[0.05] animate-grid-slide" 
               style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 60px 60px;">
          </div>

          <!-- Cinematic Grain -->
          <div class="absolute inset-0 opacity-[0.03] contrast-150 pointer-events-none" 
               style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E');">
          </div>
        </div>
        
        <div class="max-w-7xl mx-auto px-10 relative z-10 w-full">
          <div 
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 1000 } }"
            class="flex items-center gap-4 mb-8"
          >
            <div class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="text-white/60 text-[12px] font-black uppercase tracking-[0.4em]">Services de Confiance</div>
          </div>
          
          <h1 
            ref="heroTitleRef"
            class="text-6xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
          >
             Des Experts <br /> pour <span class="text-blue-200">Bâtir</span>
          </h1>

          <p class="text-white/70 max-w-xl text-lg font-medium leading-relaxed mb-12" 
             v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 1000 } }">
            Accédez à un réseau de professionnels congolais qualifiés pour tous vos besoins. Qualité, rigueur et savoir-faire local pour vos projets.
          </p>

          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 1000 } }"
            class="flex items-center gap-10"
          >
            <div class="flex flex-col">
              <span class="text-3xl font-black text-white">{{ allServices.length }}</span>
              <span class="text-[10px] uppercase font-black tracking-widest text-white/50">Professionnels</span>
            </div>
            <div class="w-px h-10 bg-white/20"></div>
            <div class="flex flex-col">
              <span class="text-3xl font-black text-white">{{ serviceCategories.length - 1 }}</span>
              <span class="text-[10px] uppercase font-black tracking-widest text-white/50">Spécialités</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Seamless Elite Content Area -->
      <div class="max-w-7xl mx-auto px-6 md:px-10 relative z-30 -mt-24 pb-32">
        <!-- Floating Glassmorphic Filter Hub -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }"
          class="bg-white/70 backdrop-blur-3xl border border-white/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[40px] p-4 mb-20 flex flex-col md:flex-row items-center gap-4 md:gap-8"
        >
          <!-- Search Input -->
          <div class="relative flex-1 w-full group">
            <svg class="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 transition-transform group-focus-within:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Rechercher un maçon, plombier, architecte..." 
              class="w-full pl-14 pr-6 py-5 bg-white/50 rounded-3xl text-sm font-bold border-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
            />
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center gap-3">
             <div class="relative">
                <button 
                    @click="isFilterMenuOpen = !isFilterMenuOpen"
                    class="px-8 py-5 rounded-3xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>{{ serviceCategories.find(c => c.id === selectedCategory)?.name }}</span>
                </button>

                <!-- Filter Dropdown overlay -->
                <div v-if="isFilterMenuOpen" class="absolute top-full mt-4 right-0 w-64 bg-white border border-slate-100 rounded-3xl shadow-2xl p-4 overflow-hidden z-50">
                    <div class="max-h-80 overflow-y-auto custom-scrollbar">
                        <button 
                            v-for="category in serviceCategories"
                            :key="category.id"
                            @click="handleCategoryChange(category.id as ServiceCategory | 'all')"
                            class="w-full text-left px-5 py-4 rounded-2xl text-[13px] font-bold uppercase tracking-tight transition-all flex items-center gap-3"
                            :class="selectedCategory === category.id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'"
                        >
                            <span>{{ category.icon }}</span>
                            <span>{{ category.name }}</span>
                        </button>
                    </div>
                </div>
             </div>
             
             <button @click="resetFilters" class="p-5 rounded-3xl bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
             </button>
          </div>
        </div>

        <!-- Service Gallery -->
        <div v-if="filteredServices.length > 0">
          <div class="flex items-center justify-between mb-16">
            <h2 class="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400">Services à Kinshasa & au Congo</h2>
            <div class="px-6 py-2 bg-blue-50 border border-blue-100 rounded-full">
              <span class="text-[12px] font-black uppercase tracking-[0.3em] text-blue-600">
                {{ filteredServices.length }} Experts disponibles
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            <ServiceCard
              v-for="(service, index) in paginatedServices"
              :key="service.id"
              :service="service"
              v-motion
              :initial="{ opacity: 0, scale: 0.95, y: 50 }"
              :enter="{ 
                opacity: 1, 
                scale: 1,
                y: 0, 
                transition: { 
                  delay: index * 60,
                  duration: 1000,
                  ease: [0.23, 1, 0.32, 1]
                } 
              }"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-32 flex justify-center">
             <div class="flex items-center gap-4 bg-slate-50 p-2.5 rounded-[32px] border border-slate-100 shadow-sm">
                <button 
                  @click="goToPage(currentPage - 1)" 
                  :disabled="currentPage === 1"
                  class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-white border border-slate-200 text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-900 hover:text-white"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div class="flex items-center gap-2">
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    class="w-12 h-12 rounded-2xl text-xs font-black transition-all"
                    :class="currentPage === page ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'text-slate-400 hover:text-slate-900'"
                  >
                    {{ page }}
                  </button>
                </div>

                <button 
                  @click="goToPage(currentPage + 1)" 
                  :disabled="currentPage === totalPages"
                  class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-white border border-slate-200 text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-900 hover:text-white"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
             </div>
          </div>
        </div>

        <div v-else class="py-40 flex flex-col items-center text-center">
          <div class="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center mb-10 border border-slate-100">
             <svg class="w-12 h-12 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
               <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             </svg>
          </div>
          <h3 class="text-3xl font-black text-slate-900 tracking-tight mb-4">Aucun expert trouvé</h3>
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] max-w-sm leading-loose">Nous n'avons pas encore de professionnel correspondant à cette recherche dans notre réseau.</p>
          <button @click="resetFilters" class="mt-12 px-12 py-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-[24px] shadow-2xl shadow-slate-900/40 hover:scale-105 active:scale-95 transition-all">Voir tout</button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
@keyframes grid-slide {
  from { background-position: 0 0; }
  to { background-position: 80px 80px; }
}

.animate-grid-slide {
  animation: grid-slide 20s linear infinite;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(37, 99, 235, 0.1);
  border-radius: 20px;
}
</style>
