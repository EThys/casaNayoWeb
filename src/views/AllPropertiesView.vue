<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import MainLayout from '@/layouts/MainLayout.vue'
import PropertyCard from '@/components/property/PropertyCard.vue'
import { fetchProperties } from '@/services/api'
import { transformApiPropertiesToProperties } from '@/utils/propertyTransformer'
import type { Property, PropertyType, PropertyFeature } from '@/types/property'
import { PROPERTY_TYPE_LABELS, PROPERTY_FEATURES } from '@/types/property'

const route = useRoute()
const router = useRouter()

// Refs for animations
const heroTitleRef = ref<HTMLElement | null>(null)
const scrollY = ref(0)

// View State
const viewMode = ref<'grid' | 'list'>('grid')
const isFilterMenuOpen = ref(false)

// Get all properties from API
const allProperties = ref<Property[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Filters
const selectedStatus = ref<'all' | 'for-sale' | 'for-rent'>('all')
const selectedType = ref<PropertyType | 'all'>('all')
const searchQuery = ref('')
const selectedFeatures = ref<PropertyFeature[]>([])
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)

// Initialize filters from query params
const initFiltersFromQuery = () => {
  if (route.query.status) selectedStatus.value = (route.query.status as any) || 'all'
  if (route.query.type) selectedType.value = (route.query.type as any) || 'all'
  if (route.query.search) searchQuery.value = (route.query.search as string) || ''
}

// Fetch properties from API
const loadProperties = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await fetchProperties()
    allProperties.value = transformApiPropertiesToProperties(response.properties.content)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur lors du chargement des propriétés'
  } finally {
    isLoading.value = false
  }
}

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  initFiltersFromQuery()
  loadProperties()
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

// Filtered properties
const filteredProperties = computed(() => {
  let filtered = [...allProperties.value]

  if (selectedStatus.value !== 'all') filtered = filtered.filter((p) => p.status === selectedStatus.value)
  if (selectedType.value !== 'all') filtered = filtered.filter((p) => p.type === selectedType.value)
  if (minPrice.value) filtered = filtered.filter((p) => p.price >= (minPrice.value || 0))
  if (maxPrice.value) filtered = filtered.filter((p) => p.price <= (maxPrice.value || Infinity))
  
  if (selectedFeatures.value.length > 0) {
    filtered = filtered.filter((p) => 
      selectedFeatures.value.every(f => p.features?.includes(f))
    )
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Update URL
const updateFilters = () => {
  const query: Record<string, string> = {}
  if (selectedStatus.value !== 'all') query.status = selectedStatus.value
  if (selectedType.value !== 'all') query.type = selectedType.value
  if (searchQuery.value.trim()) query.search = searchQuery.value.trim()
  router.replace({ query })
}

const toggleFeature = (feature: PropertyFeature) => {
  const index = selectedFeatures.value.indexOf(feature)
  if (index > -1) selectedFeatures.value.splice(index, 1)
  else selectedFeatures.value.push(feature)
}

const resetFilters = () => {
  selectedStatus.value = 'all'
  selectedType.value = 'all'
  searchQuery.value = ''
  selectedFeatures.value = []
  minPrice.value = null
  maxPrice.value = null
  updateFilters()
}

// Pagination
const currentPage = ref(1)
const itemsPerPage = 12

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProperties.value.slice(start, itemsPerPage * currentPage.value)
})

const totalPages = computed(() => Math.ceil(filteredProperties.value.length / itemsPerPage))
const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  for (let i = 1; i <= totalPages.value; i++) pages.push(i)
  return pages.slice(0, 7)
})

const displayRange = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1
  const end = Math.min(currentPage.value * itemsPerPage, filteredProperties.value.length)
  return { start, end }
})
</script>

<template>
  <MainLayout :show-footer="true">
    <div class="min-h-screen bg-white overflow-x-hidden">
      <!-- Elite Majestic Hero Section - UNTOUCHED -->
      <div class="relative min-h-[55vh] flex items-center overflow-hidden bg-[#1976D2] pt-40 pb-56">
        <!-- Digital & Cinematic Layers -->
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" 
            class="w-full h-full object-cover opacity-30 scale-110"
            :style="{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }"
            alt="Properties background"
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
            <div class="text-white/60 text-[12px] font-black uppercase tracking-[0.4em]">Le Logement pour Tous</div>
          </div>
          
          <h1 
            ref="heroTitleRef"
            class="text-6xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
          >
            Trouvez <br /> votre <span class="text-blue-200">Chez-vous</span>
          </h1>

          <p class="text-white/70 max-w-xl text-lg font-medium leading-relaxed mb-12" 
             v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 400, duration: 1000 } }">
            Parce que chaque Congolais mérite un toit de qualité. Découvrez notre sélection de maisons accessibles et modernes pour bâtir votre avenir.
          </p>
        </div>
      </div>

      <!-- Seamless Elite Content Area -->
      <div class="max-w-7xl mx-auto px-6 md:px-10 relative z-30 -mt-24 pb-32">
        <!-- Quick Access Category Hub -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 700, duration: 800 } }"
          class="mb-8 overflow-hidden"
        >
          <div class="flex overflow-x-auto scrollbar-hide gap-3 pb-4">
            <button
              @click="selectedType = 'all'"
              class="px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 border"
              :class="selectedType === 'all' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20 scale-105' 
                : 'bg-white/80 backdrop-blur-md text-slate-500 border-white/50 hover:border-blue-400'"
            >
               Tous les types
            </button>
            <button
              v-for="(label, type) in PROPERTY_TYPE_LABELS"
              :key="type"
              @click="selectedType = type as any"
              class="px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 border flex items-center justify-center text-center"
              :class="selectedType === type 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20 scale-105' 
                : 'bg-white/80 backdrop-blur-md text-slate-500 border-white/50 hover:border-blue-400'"
            >
               {{ label }}
            </button>
          </div>
        </div>

        <!-- Floating Glassmorphic Filter Hub -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 800, duration: 800 } }"
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
              placeholder="Rechercher un lieu, un style..." 
              class="w-full pl-14 pr-6 py-5 bg-white/50 rounded-3xl text-sm font-bold border-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
            />
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center gap-3">
             <button 
                @click="isFilterMenuOpen = !isFilterMenuOpen"
                class="px-8 py-5 rounded-3xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
             >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Filtres Avancés</span>
             </button>
             
             <!-- View Toggle -->
             <div class="bg-slate-100 rounded-3xl p-1.5 flex items-center gap-1">
                <button 
                  @click="viewMode = 'grid'"
                  class="p-3 rounded-2xl transition-all"
                  :class="viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                >
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                   </svg>
                </button>
                <button 
                  @click="viewMode = 'list'"
                  class="p-3 rounded-2xl transition-all"
                  :class="viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                >
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                   </svg>
                </button>
             </div>
          </div>
        </div>

        <!-- Advanced Filter Overlay (Revealed from click) -->
        <div 
          v-if="isFilterMenuOpen"
          v-motion
          :initial="{ opacity: 0, scale: 0.95, y: -20 }"
          :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 500, ease: 'expo.out' } }"
          class="bg-slate-50 border border-slate-100 rounded-[40px] p-10 mb-20 grid grid-cols-1 md:grid-cols-4 gap-12 relative overflow-hidden"
        >
          <!-- Status -->
          <div class="space-y-4">
            <label class="text-[12px] font-black text-slate-400 uppercase tracking-widest">Type d'Offre</label>
            <div class="flex flex-col gap-2">
              <button 
                v-for="status in ['all', 'for-sale', 'for-rent']" 
                :key="status"
                @click="selectedStatus = status as any"
                class="text-left px-5 py-3 rounded-2xl text-[11px] font-bold uppercase transition-all"
                :class="selectedStatus === status ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-white'"
              >
                {{ status === 'all' ? 'Toutes' : status === 'for-sale' ? 'Vente' : 'Location' }}
              </button>
            </div>
          </div>

          <!-- Type -->
          <div class="space-y-4">
            <label class="text-[12px] font-black text-slate-400 uppercase tracking-widest">Type de Maison</label>
            <div class="flex flex-col gap-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
              <button 
                @click="selectedType = 'all'"
                class="text-left px-5 py-3 rounded-2xl text-[11px] font-bold uppercase transition-all"
                :class="selectedType === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white'"
              >
                Tous les types
              </button>
              <button 
                v-for="(label, type) in PROPERTY_TYPE_LABELS" 
                :key="type"
                @click="selectedType = type as any"
                class="text-left px-5 py-3 rounded-2xl text-[11px] font-bold uppercase transition-all"
                :class="selectedType === type ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white'"
              >
                {{ label }}
              </button>
            </div>
          </div>

          <!-- Budget -->
          <div class="space-y-4">
            <label class="text-[12px] font-black text-slate-400 uppercase tracking-widest">Enveloppe ($)</label>
            <div class="flex flex-col gap-3">
              <input v-model.number="minPrice" type="number" placeholder="Min" class="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 text-xs font-bold outline-none" />
              <input v-model.number="maxPrice" type="number" placeholder="Max" class="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 text-xs font-bold outline-none" />
            </div>
          </div>

          <!-- Features -->
          <div class="space-y-4">
            <label class="text-[12px] font-black text-slate-400 uppercase tracking-widest">Options</label>
            <div class="grid grid-cols-1 gap-2 h-40 overflow-y-auto custom-scrollbar pr-2">
              <button 
                v-for="feature in PROPERTY_FEATURES" 
                :key="feature"
                @click="toggleFeature(feature)"
                class="flex items-center gap-3 group"
              >
                <div class="w-5 h-5 rounded-lg border transition-all flex items-center justify-center"
                     :class="selectedFeatures.includes(feature) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 group-hover:border-blue-300'">
                  <svg v-if="selectedFeatures.includes(feature)" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-[11px] font-bold uppercase tracking-tight" :class="selectedFeatures.includes(feature) ? 'text-slate-900' : 'text-slate-400'">{{ feature }}</span>
              </button>
            </div>
          </div>

          <!-- Reset -->
          <div class="absolute bottom-4 right-10">
            <button @click="resetFilters" class="text-[12px] font-black text-blue-600 uppercase tracking-[0.2em] hover:scale-105 transition-all">Réinitialiser tout</button>
          </div>
        </div>

        <!-- Property Gallery -->
        <div v-if="isLoading" class="py-40 flex flex-col items-center gap-6">
           <div class="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin shadow-2xl shadow-blue-500/20"></div>
           <p class="text-[12px] font-black uppercase tracking-[0.4em] text-blue-600">Recherche en cours...</p>
        </div>

        <div v-else-if="filteredProperties.length > 0">
          <div 
            :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16' : 'flex flex-col gap-12'"
          >
            <PropertyCard
              v-for="(property, index) in paginatedProperties"
              :key="property.id"
              :property="property"
              :variant="viewMode"
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

          <!-- Enhanced Pagination -->
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
                    @click="goToPage(page as number)"
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
          <div class="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center mb-10 border border-slate-100 shadow-inner">
             <svg class="w-12 h-12 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
               <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
             </svg>
          </div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight mb-4">Aucun résultat trouvé</h2>
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] max-w-sm leading-loose">Nous n'avons pas encore d'offres correspondant à ces critères. Réessayez avec d'autres options.</p>
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
