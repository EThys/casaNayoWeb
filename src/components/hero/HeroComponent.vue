<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import PixiLiquidHero from './PixiLiquidHero.vue'
import type { SearchFilters, PropertyFeature } from '@/types/property'
import { PROPERTY_TYPE_LABELS, PROPERTY_FEATURES } from '@/types/property'

const router = useRouter()
const searchFilters = ref<SearchFilters>({
  location: '',
  type: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  bedrooms: undefined,
  bathrooms: undefined,
  rooms: undefined,
  minArea: undefined,
  maxArea: undefined,
  status: 'for-sale',
  parking: undefined,
  features: [],
})

const showAdvancedFilters = ref(false)
const selectedFeatures = ref<PropertyFeature[]>([])
const isLoaded = ref(false)
const activeTab = ref<'essentials' | 'amenities'>('essentials')

// Carrousel de textes pour les services avec effet typing
const servicesText = [
  "votre villa de rêve",
  "votre artisan de confiance",
  "votre appartement de luxe",
  "votre technicien expert",
  "votre terrain d'exception",
  "votre expert immobilier",
]
const currentServiceIndex = ref(0)
const displayedText = ref('')
const isDeleting = ref(false)
const typingSpeed = ref(100)

const heroTitle = ref<HTMLElement | null>(null)
const searchBarRef = ref<HTMLElement | null>(null)
const floaters = ref<HTMLElement[]>([])

// GSAP Powered Carousel for services
const typeText = () => {
  const nextIndex = (currentServiceIndex.value + 1) % servicesText.length
  const currentText = servicesText[currentServiceIndex.value]
  
  gsap.to('.typing-text', {
    opacity: 0,
    y: -20,
    duration: 0.5,
    onComplete: () => {
      currentServiceIndex.value = nextIndex
      displayedText.value = servicesText[nextIndex]
      gsap.fromTo('.typing-text', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
    }
  })
}

onMounted(() => {
  displayedText.value = servicesText[0]
  setInterval(typeText, 4000)
})

const initGSAPHero = () => {
  if (!heroTitle.value) return

  // Advanced Title Reveal - Cinematic staggered entrance
  const spans = heroTitle.value.querySelectorAll('span')
  gsap.from(spans, {
    y: 100,
    opacity: 0,
    filter: 'blur(30px)',
    scale: 0.8,
    rotateX: -30,
    stagger: 0.25,
    duration: 2,
    ease: 'expo.out',
    delay: 0.4
  })

  // Floating Organic Blobs Parallax (Background Life)
  floaters.value.forEach((floater, i) => {
    gsap.to(floater, {
      y: 'random(-60, 60)',
      x: 'random(-60, 60)',
      rotation: 'random(-25, 25)',
      duration: 'random(4, 7)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.8
    })
  })

  // 3D Parallax Mouse Tracking (Elite Depth)
  const heroSection = document.querySelector('.hero-section')
  if (heroSection) {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5) * 25
      const yPos = (clientY / window.innerHeight - 0.5) * 25
      
      gsap.to('.hero-parallax-bg', {
        x: xPos * -2,
        y: yPos * -2,
        rotationY: xPos * 0.6,
        rotationX: yPos * -0.6,
        duration: 1.5,
        ease: 'power2.out'
      })

      gsap.to('.hero-content-parallax', {
        x: xPos * 1.2,
        y: yPos * 1.2,
        duration: 1.2,
        ease: 'power2.out'
      })
    })
  }

  /* 
  // Magnetic Search Bar (Awwwards Grade) - DISABLED as per user request
  const searchBar = searchBarRef.value
  if (searchBar) {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = searchBar.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY)
      
      if (distance < 450) {
        gsap.to(searchBar, {
          x: (e.clientX - centerX) * 0.2,
          y: (e.clientY - centerY) * 0.2,
          scale: 1.05,
          duration: 0.7,
          ease: 'power3.out'
        })
      } else {
        gsap.to(searchBar, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.4)'
        })
      }
    })
  }
  */
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
    initGSAPHero()
  }, 100)

  // Démarrer l'effet de typing
  setTimeout(() => {
    typeText()
  }, 1000)
})

// Villes du Congo Kinshasa
const popularLocations = [
  'Kinshasa',
  'Lubumbashi',
  'Mbuji-Mayi',
  'Kananga',
  'Kisangani',
  'Bukavu',
  'Goma',
  'Kolwezi',
  'Matadi',
  'Boma',
]

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const toggleFeature = (feature: PropertyFeature) => {
  const index = selectedFeatures.value.indexOf(feature)
  if (index > -1) {
    selectedFeatures.value.splice(index, 1)
  } else {
    selectedFeatures.value.push(feature)
  }
  searchFilters.value.features = [...selectedFeatures.value]
}

const clearFilters = () => {
  searchFilters.value = {
    location: '',
    type: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
    rooms: undefined,
    minArea: undefined,
    maxArea: undefined,
    status: 'for-sale',
    parking: undefined,
    features: [],
  }
  selectedFeatures.value = []
  showAdvancedFilters.value = false
}

const activeFiltersCount = computed(() => {
  let count = 0
  if (searchFilters.value.location) count++
  if (searchFilters.value.type) count++
  if (searchFilters.value.minPrice || searchFilters.value.maxPrice) count++
  if (searchFilters.value.bedrooms) count++
  if (searchFilters.value.bathrooms) count++
  if (searchFilters.value.rooms) count++
  if (searchFilters.value.minArea || searchFilters.value.maxArea) count++
  if (searchFilters.value.parking) count++
  if (selectedFeatures.value.length > 0) count++
  return count
})

const applyFiltersAndClose = () => {
  handleSearch()
  showAdvancedFilters.value = false
}

const handleSearch = () => {
  router.push({
    path: '/properties',
    query: {
      ...Object.fromEntries(
        Object.entries(searchFilters.value).filter(([_, v]) => v !== undefined && v !== ''),
      ),
      features: searchFilters.value.features?.join(','),
    },
  })
}

const selectLocation = (location: string) => {
  searchFilters.value.location = location
  handleSearch()
}
</script>

<template>
  <!-- Hero Section - Ultra Modern Design -->
  <div class="hero-section relative min-h-screen flex items-center overflow-hidden bg-[#0A0F1C]">
    <!-- PixiJS Liquid Background Layer -->
    <PixiLiquidHero 
        image-url="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80" 
    />

    <!-- Dynamic Background Layer -->
    <div class="absolute inset-0 z-0 perspective-1000">
      <!-- Organic Blobs (Interactive) -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="i in 3" :key="i" 
             :ref="(el: any) => el && floaters.push(el)"
             class="absolute opacity-20 blur-[100px] rounded-full"
             :class="[
               i === 1 ? 'w-[500px] h-[500px] bg-blue-500 top-[-10%] left-[-10%]' : '',
               i === 2 ? 'w-[400px] h-[400px] bg-indigo-600 bottom-[-10%] right-[-10%]' : '',
               i === 3 ? 'w-[300px] h-[300px] bg-cyan-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''
             ]"
        ></div>
      </div>

      <!-- High-end Background Image with 3D Parallax (Keep as fallback or overlay mix) -->
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity animate-ken-burns hero-parallax-bg"
      ></div>
      
      <!-- Premium Mesh Gradient -->
      <div class="absolute inset-0 opacity-60 mix-blend-overlay">
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse-slow animation-delay-1000"></div>
      </div>


      <!-- Modern UI Elements - Animated Grid -->
      <div class="absolute inset-0 opacity-[0.03] animate-grid-slide"
           style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 60px 60px;">
      </div>

      <!-- Animated Tech Lines -->
      <div class="absolute inset-0 overflow-hidden opacity-10">
        <div class="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent top-1/4 animate-line-slide-horizontal"></div>
        <div class="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent top-2/4 animate-line-slide-horizontal animation-delay-2000"></div>
        <div class="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent top-3/4 animate-line-slide-horizontal animation-delay-4000"></div>
      </div>
    </div>


    <!-- Content Wrapper -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 hero-content-parallax">
        <div class="flex flex-col items-center text-center space-y-16">
          <!-- Brand & Hero Text - Elite Typography -->
          <div class="max-w-4xl space-y-10 transition-all duration-1000 ease-out" :class="{ 'opacity-100 translate-y-0': isLoaded, 'opacity-0 translate-y-10': !isLoaded }">
          

            <h1 ref="heroTitle" class="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              <span class="block">Votre plateforme</span>
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-600 animate-shimmer mt-2">tout-en-un</span>
            </h1>

            <div class="space-y-8 flex flex-col items-center">
              <p class="text-xl md:text-3xl text-white font-medium tracking-tight animate-fade-in animation-delay-400 max-w-3xl h-10 flex items-center">
                Immobilier <span class="text-blue-400 mx-2">&</span> Services pour <span class="typing-text text-blue-400 ml-2">{{ displayedText }}</span>
              </p>
              
              <div class="max-w-3xl space-y-4 animate-fade-in animation-delay-600">
                <p class="text-lg md:text-xl text-slate-200 font-bold leading-relaxed">
                  Maisons à louer ou acheter, et tous les artisans de confiance pour vos projets.
                </p>
                <p class="text-base md:text-lg text-slate-400 font-light leading-relaxed">
                  De la recherche de votre maison à son entretien au quotidien, CasaNayo vous connecte aux meilleurs professionnels. Location, vente, maçons, plombiers... Trouvez tout, en un clic.
                </p>
              </div>
            </div>
          </div>

        <!-- Compact Horizontal Search Area -->
        <div 
          ref="searchBarRef" 
          class="w-full max-w-5xl"
          v-motion
          :initial="{ opacity: 0, y: 100, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20, delay: 800 } }"
        >
          <div class="relative max-w-5xl mx-auto group/search">
            <!-- Subtle Glow -->
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-[32px] blur-2xl opacity-0 group-hover/search:opacity-100 transition duration-1000"></div>
            
            <div class="relative glass-card bg-[#0A0F1C]/40 backdrop-blur-[40px] border border-white/10 rounded-[32px] p-3 md:p-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] flex flex-wrap lg:flex-nowrap items-center gap-3 md:gap-2">
              
              <!-- Buy/Rent Toggle -->
              <div class="flex p-1 bg-white/5 rounded-2xl border border-white/5 relative min-w-[200px]">
                <div 
                  class="absolute inset-y-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-blue-600 rounded-xl"
                  :style="{ left: searchFilters.status === 'for-sale' ? '4px' : '50%', width: 'calc(50% - 4px)' }"
                ></div>
                <button 
                  v-for="status in ['for-sale', 'for-rent']" 
                  :key="status"
                  @click="searchFilters.status = status as any"
                  class="relative z-10 flex-1 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300"
                  :class="searchFilters.status === status ? 'text-white' : 'text-slate-400 hover:text-slate-200'"
                >
                  {{ status === 'for-sale' ? 'Acheter' : 'Louer' }}
                </button>
              </div>

              <!-- Location Input -->
              <div class="flex-1 min-w-[280px] md:min-w-[250px] relative px-4 border-l md:border-l border-white/10 md:border-white/5 py-2 md:py-0">
                <label class="block text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1 ml-1">Localisation</label>
                <input
                  v-model="searchFilters.location"
                  type="text"
                  placeholder="Gombe, Kinshasa..."
                  class="w-full bg-transparent text-sm text-white placeholder:text-slate-600 outline-none font-medium"
                />
              </div>

              <!-- Type Select -->
              <div class="flex-1 min-w-[200px] md:min-w-[180px] relative px-4 border-l md:border-l border-white/10 md:border-white/5 py-2 md:py-0">
                <label class="block text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1 ml-1">Type de bien</label>
                <div class="relative">
                  <select v-model="searchFilters.type" class="w-full bg-transparent text-sm text-white appearance-none outline-none font-medium cursor-pointer">
                    <option :value="undefined" class="bg-[#0A0F1C]">Tous les types</option>
                    <option value="house" class="bg-[#0A0F1C]">Villa d'Exception</option>
                    <option value="apartment" class="bg-[#0A0F1C]">Appartement Luxe</option>
                    <option value="land" class="bg-[#0A0F1C]">Terrain Prestige</option>
                  </select>
                </div>
              </div>

              <!-- Budget Input -->
              <div class="flex-1 min-w-[180px] relative px-4 border-l border-white/5">
                <label class="block text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1 ml-1">Budget Max ($)</label>
                <input v-model.number="searchFilters.maxPrice" type="number" placeholder="Ex: 500k" class="w-full bg-transparent text-sm text-white placeholder:text-slate-600 outline-none font-medium" />
              </div>

              <!-- Search Button & Filters Trigger -->
              <div class="flex items-center gap-2 pr-2 ml-auto">
                <button 
                  @click="showAdvancedFilters = true"
                  class="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all text-slate-400 hover:text-white"
                  title="Filtres Avancés"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </button>
                <button
                  @click="handleSearch"
                  class="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center active:scale-95"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Elite Scroll Indicator -->
    <div 
        class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-4 animate-fade-in animation-delay-4000 pointer-events-none"
        :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }"
    >
        <span class="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Découvrir</span>
        <div class="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center animate-bounce shadow-2xl">
            <svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>

    <!-- Modern Search Overlay - Elite Modal -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-400 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showAdvancedFilters"
          class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#0A0F1C]/80 backdrop-blur-md"
        >
          <!-- Modal Container -->
          <div class="relative w-full max-w-2xl bg-[#F8FAFC] border border-slate-200 rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
            <!-- Modal Header with Tabs -->
            <div class="px-8 pt-8 pb-4 border-b border-white/5 space-y-6">
              <div class="flex justify-between items-start">
                <div class="space-y-1">
                  <h2 class="text-3xl font-black text-slate-900 tracking-tight">Filtres Elite</h2>
                  <p class="text-blue-700 text-[10px] font-bold uppercase tracking-[0.2em]">Affinez votre recherche</p>
                </div>
                <button
                  @click="showAdvancedFilters = false"
                  class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Tabs Navigation -->
              <div class="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 w-fit">
                <button 
                  @click="activeTab = 'essentials'"
                  class="px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] rounded-xl transition-all duration-300"
                  :class="activeTab === 'essentials' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'"
                >
                  Critères
                </button>
                <button 
                  @click="activeTab = 'amenities'"
                  class="px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] rounded-xl transition-all duration-300"
                  :class="activeTab === 'amenities' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'"
                >
                  Équipements
                </button>
              </div>
            </div>

            <!-- Modal Body -->
            <div class="px-8 py-8 h-[450px] overflow-y-auto custom-scrollbar">
              <transition
                mode="out-in"
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
              >
                <!-- Essentials Tab -->
                <div v-if="activeTab === 'essentials'" class="space-y-10">
                  <!-- Type Grid -->
                  <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Type de bien</label>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button 
                        v-for="type in ['house', 'apartment', 'villa', 'studio']" 
                        :key="type"
                        @click="searchFilters.type = type as any"
                        :class="searchFilters.type === type ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-slate-400'"
                        class="py-3 px-2 rounded-2xl border text-xs font-bold transition-all hover:bg-white/10 capitalize"
                      >
                        {{ type }}
                      </button>
                    </div>
                  </div>

                  <!-- Price & Area Row -->
                  <div class="grid grid-cols-2 gap-8">
                    <div class="space-y-4">
                      <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Budget ($)</label>
                      <div class="flex items-center space-x-2">
                        <input v-model.number="searchFilters.minPrice" type="number" placeholder="Min" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50" />
                        <span class="text-slate-700">-</span>
                        <input v-model.number="searchFilters.maxPrice" type="number" placeholder="Max" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50" />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Surface (m²)</label>
                      <div class="flex items-center space-x-2">
                        <input v-model.number="searchFilters.minArea" type="number" placeholder="Min" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50" />
                        <span class="text-slate-700">-</span>
                        <input v-model.number="searchFilters.maxArea" type="number" placeholder="Max" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50" />
                      </div>
                    </div>
                  </div>

                  <!-- Specifics Grid -->
                  <div class="space-y-8">
                    <div v-for="kind in [{key: 'rooms', label: 'Pièces'}, {key: 'bedrooms', label: 'Chambres'}, {key: 'bathrooms', label: 'Bains'}]" :key="kind.key" class="space-y-4">
                      <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{{ kind.label }}</label>
                      <div class="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
                        <button 
                          v-for="n in 6" :key="n"
                          @click="(searchFilters as any)[kind.key] = n === 6 ? undefined : n"
                          :class="(searchFilters as any)[kind.key] === (n === 6 ? undefined : n) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-slate-500 border border-white/5'"
                          class="h-10 rounded-xl font-bold text-xs transition-all hover:bg-white/10"
                        >
                          {{ n === 6 ? 'Tout' : (n === 5 ? '5+' : n) }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Amenities Tab -->
                <div v-else class="space-y-6">
                  <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Équipements & Services</label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button
                      v-for="feature in PROPERTY_FEATURES"
                      :key="feature"
                      @click="toggleFeature(feature)"
                      class="px-4 py-4 text-[10px] font-bold text-left rounded-2xl border transition-all flex items-center space-x-3"
                      :class="selectedFeatures.includes(feature) ? 'bg-blue-600/20 text-blue-400 border-blue-600/50' : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/20'"
                    >
                      <div class="w-2 h-2 rounded-full" :class="selectedFeatures.includes(feature) ? 'bg-blue-400 pulse' : 'bg-slate-700'"></div>
                      <span>{{ feature }}</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Modal Footer -->
            <div class="px-8 py-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
              <button
                @click="clearFilters"
                class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
              >
                Réinitialiser
              </button>
              <button
                @click="applyFiltersAndClose"
                class="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95"
              >
                Voir les biens
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>

.hero-section {
  font-family: 'Inter', sans-serif;
}

/* Glassmorphism 2.0 - Elite Multi-layered */
.glass-card {
  box-shadow: 
    0 40px 100px -20px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 0 20px rgba(255, 255, 255, 0.02);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.glass-card:hover {
  transform: translateY(-8px) scale(1.01);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 60px 120px -20px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(59, 130, 246, 0.3);
}

/* Ken Burns Elite */
@keyframes ken-burns {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.15) translate(-1%, -1%); }
}

.animate-ken-burns {
  animation: ken-burns 60s linear infinite alternate;
}

/* Grid Animation */
@keyframes grid-slide {
  from { background-position: 0 0; }
  to { background-position: 120px 120px; }
}

.animate-grid-slide {
  animation: grid-slide 20s linear infinite;
}

/* Horizontal Line Slide */
@keyframes line-slide-horizontal {
  0% { transform: translateX(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

.animate-line-slide-horizontal {
  animation: line-slide-horizontal 20s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

/* Gradient Slide for Button */
@keyframes gradient-slide {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-slide {
  background-size: 200% 200%;
  animation: gradient-slide 3s ease infinite;
}

/* Shimmer Animation */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.animate-shimmer {
  background-size: 200% auto;
  animation: shimmer 8s linear infinite;
}

/* Typing Cursor */
.typing-cursor {
  display: inline-block;
  width: 3px;
  height: 0.8em;
  background-color: #3b82f6;
  margin-left: 4px;
  animation: blink 1s step-end infinite;
  vertical-align: middle;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

/* Premium Animations */
.animate-fade-in {
  animation: fade-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-pulse-slow {
  animation: pulse-slow 10s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.1); opacity: 0.6; }
}

.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
.animation-delay-1000 { animation-delay: 1s; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* Custom Select Reset for Glassmorphism */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-position: right 1.25rem center;
  background-repeat: no-repeat;
  background-size: 1.2em 1.2em;
}

/* Pulse Animation */
@keyframes pulse-soft {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 1; }
  100% { transform: scale(1); opacity: 0.5; }
}

.pulse {
  animation: pulse-soft 2s infinite ease-in-out;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

/* Mobile Cursor Override */
@media (max-width: 1024px) {
  .hero-section { cursor: default !important; }
}
</style>
