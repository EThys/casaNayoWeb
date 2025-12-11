<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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

// Carrousel de textes pour les services avec effet typing
const servicesText = [
  'bien immobilier',
  'plombier expert',
  'électricien qualifié',
  'architecte professionnel',
  'menuisier expérimenté',
  'frigoriste certifié',
  'peintre professionnel',
  'femme de ménage',
  'carreleur expert',
]
const currentServiceIndex = ref(0)
const displayedText = ref('')
const isDeleting = ref(false)
const typingSpeed = ref(100)

// Effet de machine à écrire avec variations de vitesse
const typeText = () => {
  const currentText = servicesText[currentServiceIndex.value]

  if (!isDeleting.value) {
    // Écrire le texte caractère par caractère
    if (displayedText.value.length < currentText.length) {
      displayedText.value = currentText.substring(0, displayedText.value.length + 1)
      // Vitesse variable pour un effet plus naturel
      typingSpeed.value = Math.random() * 100 + 50 // Entre 50ms et 150ms
      setTimeout(typeText, typingSpeed.value)
    } else {
      // Pause plus longue pour laisser lire le texte complet
      setTimeout(() => {
        isDeleting.value = true
        typeText()
      }, 2500)
    }
  } else {
    // Effacer le texte plus rapidement
    if (displayedText.value.length > 0) {
      displayedText.value = currentText.substring(0, displayedText.value.length - 1)
      typingSpeed.value = 30 // Effacement rapide
      setTimeout(typeText, typingSpeed.value)
    } else {
      // Passer au texte suivant après une courte pause
      isDeleting.value = false
      currentServiceIndex.value = (currentServiceIndex.value + 1) % servicesText.length
      setTimeout(typeText, 700)
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
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
  <!-- Hero Section - Modern Split Design with Decorations -->
  <div class="hero-section relative min-h-[90vh] flex items-center overflow-hidden">
    <!-- Background with Image -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')] bg-cover bg-center bg-no-repeat animate-ken-burns"
      ></div>
      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(
            to right,
            rgba(25, 118, 210, 0.95),
            rgba(25, 118, 210, 0.85) 50%,
            rgba(25, 118, 210, 0.6)
          );
        "
      ></div>

      <!-- Decorative Floating Elements -->
      <div
        class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float-delayed"
      ></div>
      <div
        class="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-400/5 rounded-full blur-2xl animate-pulse-slow"
      ></div>

      <!-- Animated Shapes -->
      <div
        class="absolute top-40 right-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce-slow"
      ></div>
      <div
        class="absolute bottom-40 left-1/3 w-3 h-3 bg-blue-400/40 rounded-full animate-ping-slow"
      ></div>
      <div
        class="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-300/50 rounded-full animate-pulse"
      ></div>

      <!-- Enhanced Grid Pattern with Animation -->
      <div
        class="absolute inset-0 opacity-20 animate-grid-slide"
        style="
          background-image:
            linear-gradient(rgba(25, 118, 210, 0.4) 2px, transparent 2px),
            linear-gradient(90deg, rgba(25, 118, 210, 0.4) 2px, transparent 2px);
          background-size: 80px 80px;
        "
      ></div>

      <!-- Diagonal Grid Overlay -->
      <div
        class="absolute inset-0 opacity-10 animate-grid-pulse"
        style="
          background-image:
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(25, 118, 210, 0.5) 40px,
              rgba(25, 118, 210, 0.5) 42px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(25, 118, 210, 0.5) 40px,
              rgba(25, 118, 210, 0.5) 42px
            );
        "
      ></div>

      <!-- Animated Grid Lines -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Horizontal lines -->
        <div
          class="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent top-1/4 animate-line-slide-horizontal"
        ></div>
        <div
          class="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent top-2/4 animate-line-slide-horizontal animation-delay-200"
        ></div>
        <div
          class="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent top-3/4 animate-line-slide-horizontal animation-delay-400"
        ></div>

        <!-- Vertical lines -->
        <div
          class="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent left-1/4 animate-line-slide-vertical"
        ></div>
        <div
          class="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-blue-300/40 to-transparent left-2/4 animate-line-slide-vertical animation-delay-300"
        ></div>
        <div
          class="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent left-3/4 animate-line-slide-vertical animation-delay-500"
        ></div>
      </div>

      <!-- Geometric Decorative Shapes -->
      <div
        class="absolute top-1/4 left-1/3 w-32 h-32 border-2 border-blue-400/20 rotate-45 animate-rotate-slow"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/4 w-24 h-24 border-2 border-blue-300/20 rounded-full animate-scale-pulse"
      ></div>
      <div
        class="absolute top-2/3 left-1/4 w-20 h-20 border-2 border-blue-400/20 animate-rotate-reverse"
      ></div>

      <!-- Floating Particles -->
      <div
        class="absolute top-1/4 right-1/3 w-2 h-2 bg-blue-300/60 rounded-full animate-float-particle"
      ></div>
      <div
        class="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-float-particle animation-delay-200"
      ></div>
      <div
        class="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-blue-300/70 rounded-full animate-float-particle animation-delay-400"
      ></div>
      <div
        class="absolute top-3/4 right-2/3 w-1 h-1 bg-blue-400/60 rounded-full animate-float-particle animation-delay-600"
      ></div>

      <!-- Light Beams -->
      <div
        class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-400/20 via-transparent to-transparent animate-beam-fade"
      ></div>
      <div
        class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-300/20 via-transparent to-transparent animate-beam-fade animation-delay-300"
      ></div>

      <!-- Corner Accents -->
      <div
        class="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-blue-400/30 animate-corner-expand"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-blue-400/30 animate-corner-expand animation-delay-200"
      ></div>
    </div>

    <!-- Content -->
    <div
      class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 pt-24 sm:pt-32"
    >
      <div
        class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start"
        :class="{ 'animate-fade-in-up': isLoaded }"
      >
        <!-- LEFT COLUMN - Text Content (3/5) -->
        <div class="lg:col-span-3 space-y-8">
          <div class="space-y-4">
            <h1
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up"
              style="font-family: 'Poppins', sans-serif"
            >
              <span class="inline-block animate-slide-right text-white">Trouvez votre</span><br />
              <span class="inline-block drop-shadow-lg min-h-[1.2em]">
                <span class="typing-text">{{ displayedText }}</span>
                <span class="typing-cursor">|</span> </span
              ><br />
              <span class="inline-block animate-slide-right animation-delay-400 text-white"
                >idéal</span
              >
            </h1>

            <p
              class="text-lg sm:text-xl text-white font-normal leading-relaxed max-w-xl animate-fade-in animation-delay-600"
            >
              Propriétés et services professionnels en
              <span class="text-white font-semibold">République Démocratique du Congo</span>
            </p>
          </div>

          <!-- Stats -->
          <div
            class="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl animate-fade-in-up animation-delay-800"
          >
            <div
              class="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-110 group"
            >
              <div
                class="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors"
              >
                50K+
              </div>
              <div class="text-xs text-white/80 group-hover:text-white transition-colors">
                Propriétés
              </div>
              <div
                class="h-1 w-0 group-hover:w-full bg-white rounded-full mt-2 transition-all duration-500"
              ></div>
            </div>
            <div
              class="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-110 group"
            >
              <div
                class="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors"
              >
                1K+
              </div>
              <div class="text-xs text-white/80 group-hover:text-white transition-colors">
                Professionnels
              </div>
              <div
                class="h-1 w-0 group-hover:w-full bg-white rounded-full mt-2 transition-all duration-500"
              ></div>
            </div>
            <div
              class="text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-110 group"
            >
              <div
                class="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors"
              >
                10+
              </div>
              <div class="text-xs text-white/80 group-hover:text-white transition-colors">
                Villes
              </div>
              <div
                class="h-1 w-0 group-hover:w-full bg-white rounded-full mt-2 transition-all duration-500"
              ></div>
            </div>
          </div>

          <!-- Popular Locations -->
          <div class="hidden lg:block animate-fade-in animation-delay-1000">
            <p class="text-sm font-semibold text-white mb-4">🌍 Destinations populaires</p>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="(loc, index) in popularLocations.slice(0, 6)"
                :key="loc"
                @click="selectLocation(loc)"
                :style="{ animationDelay: `${1200 + index * 100}ms` }"
                class="px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-105 animate-fade-in"
              >
                {{ loc }}
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN - Search Card (2/5) -->
        <div class="lg:col-span-2 animate-scale-in animation-delay-400">
          <div
            class="bg-white rounded-2xl shadow-2xl overflow-hidden p-6 relative group hover:shadow-blue-500/20 transition-all duration-500"
          >
            <!-- Decorative Corner -->
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-bl-full"
            ></div>

            <div class="relative">
              <h3
                class="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2"
                style="font-family: 'Poppins', sans-serif"
              >
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Rechercher
              </h3>
              <p class="text-sm text-gray-500 mb-4">Trouvez votre bien idéal</p>
            </div>

            <!-- Compact Search Form -->
            <div class="space-y-4">
              <!-- Location -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Localisation</label>
                <input
                  v-model="searchFilters.location"
                  type="text"
                  placeholder="Ville, quartier..."
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base transition-all hover:border-blue-300"
                  @keyup.enter="handleSearch"
                  list="location-suggestions"
                />
                <datalist id="location-suggestions">
                  <option v-for="loc in popularLocations" :key="loc" :value="loc" />
                </datalist>
              </div>

              <!-- Type -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  v-model="searchFilters.type"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base cursor-pointer transition-all hover:border-blue-300"
                >
                  <option :value="undefined">Tous types</option>
                  <option value="house">Maison</option>
                  <option value="apartment">Appartement</option>
                  <option value="villa">Villa</option>
                  <option value="office">Bureau</option>
                  <option value="land">Terrain</option>
                </select>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                <select
                  v-model="searchFilters.status"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base cursor-pointer transition-all hover:border-blue-300"
                >
                  <option value="for-sale">À vendre</option>
                  <option value="for-rent">À louer</option>
                </select>
              </div>

              <!-- Search Button -->
              <button
                @click="handleSearch"
                class="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl text-base transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center space-x-2 group relative overflow-hidden"
                style="font-family: 'Poppins', sans-serif"
              >
                <div
                  class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span class="relative z-10">Rechercher</span>
              </button>
            </div>

            <!-- Advanced Filters Link -->
            <button
              @click="showAdvancedFilters = !showAdvancedFilters"
              class="mt-4 text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span class="group-hover:translate-x-1 transition-transform">Plus de filtres</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Filters Modal -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showAdvancedFilters"
          class="modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          @click="showAdvancedFilters = false"
        >
          <div
            class="modal-filters bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto relative transition-all duration-300 z-[10000]"
            @click.stop
          >
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-gray-900">Filtres avancés</h3>
                <button
                  @click="showAdvancedFilters = false"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="space-y-5">
                <!-- Budget -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Prix minimum (CDF)
                    </label>
                    <input
                      v-model.number="searchFilters.minPrice"
                      type="number"
                      min="0"
                      placeholder="Prix min"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base transition-all hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Prix maximum (CDF)
                    </label>
                    <input
                      v-model.number="searchFilters.maxPrice"
                      type="number"
                      min="0"
                      placeholder="Prix max"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base transition-all hover:border-gray-300"
                    />
                  </div>
                </div>

                <!-- Characteristics -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2"> Pièces </label>
                    <input
                      v-model.number="searchFilters.rooms"
                      type="number"
                      min="0"
                      placeholder="Toutes"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base transition-all hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2"> Chambres </label>
                    <input
                      v-model.number="searchFilters.bedrooms"
                      type="number"
                      min="0"
                      placeholder="Toutes"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base transition-all hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Salles de bain
                    </label>
                    <input
                      v-model.number="searchFilters.bathrooms"
                      type="number"
                      min="0"
                      placeholder="Toutes"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base transition-all hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2"> Parking </label>
                    <input
                      v-model.number="searchFilters.parking"
                      type="number"
                      min="0"
                      placeholder="Tous"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base transition-all hover:border-gray-300"
                    />
                  </div>
                </div>

                <!-- Surface -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Surface min (m²)
                    </label>
                    <input
                      v-model.number="searchFilters.minArea"
                      type="number"
                      min="0"
                      placeholder="Surface min"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base transition-all hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Surface max (m²)
                    </label>
                    <input
                      v-model.number="searchFilters.maxArea"
                      type="number"
                      min="0"
                      placeholder="Surface max"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base transition-all hover:border-gray-300"
                    />
                  </div>
                </div>

                <!-- Features -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Caractéristiques
                  </label>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="feature in PROPERTY_FEATURES"
                      :key="feature"
                      @click="toggleFeature(feature)"
                      type="button"
                      class="px-5 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all capitalize"
                      :class="
                        selectedFeatures.includes(feature)
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      "
                    >
                      {{ feature }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  @click="clearFilters"
                  class="px-6 py-3 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Réinitialiser
                </button>
                <button
                  @click="applyFiltersAndClose"
                  class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
.hero-section {
  font-family:
    'Roboto',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  cursor:
    url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='8' fill='%2310b981' opacity='0.8'/%3E%3Ccircle cx='12' cy='12' r='3' fill='white'/%3E%3C/svg%3E")
      12 12,
    auto;
}

.hero-section button,
.hero-section a,
.hero-section input,
.hero-section select {
  cursor:
    url("data:image/svg+xml,%3Csvg width='28' height='28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='14' cy='14' r='10' fill='%2310b981' opacity='0.9'/%3E%3Ccircle cx='14' cy='14' r='4' fill='white'/%3E%3C/svg%3E")
      14 14,
    pointer;
}

/* Force default cursor in modal for better visibility */
.modal-backdrop {
  cursor: default !important;
}

.modal-filters,
.modal-filters * {
  cursor: auto !important;
}

.modal-filters button,
.modal-filters a,
.modal-filters input,
.modal-filters select,
.modal-filters textarea {
  cursor: pointer !important;
}

.modal-filters input[type='text'],
.modal-filters input[type='number'],
.modal-filters textarea {
  cursor: text !important;
}

/* Animations */
@keyframes ken-burns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.animate-ken-burns {
  animation: ken-burns 20s ease-in-out infinite alternate;
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-float-delayed {
  animation: float-delayed 25s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping-slow {
  animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slide-down 0.6s ease-out;
}

@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-right {
  animation: slide-right 0.8s ease-out;
}

@keyframes slide-left {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-left {
  animation: slide-left 0.8s ease-out;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.6s ease-out;
}

/* Animation delays */
.animation-delay-200 {
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  animation-fill-mode: backwards;
}

.animation-delay-600 {
  animation-delay: 0.6s;
  animation-fill-mode: backwards;
}

.animation-delay-800 {
  animation-delay: 0.8s;
  animation-fill-mode: backwards;
}

.animation-delay-1000 {
  animation-delay: 1s;
  animation-fill-mode: backwards;
}

/* Typing Effect Animation - Ultra Modern */
.typing-text {
  display: inline-block;
  position: relative;
  color: #ffffff;
  font-weight: 700;
  text-shadow:
    0 0 30px rgba(255, 255, 255, 0.8),
    0 0 60px rgba(255, 255, 255, 0.6),
    0 2px 10px rgba(0, 0, 0, 0.3);
  animation: text-glow-white 2s ease-in-out infinite;
}

@keyframes text-gradient {
  0%,
  100% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
}

@keyframes text-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 15px rgba(25, 118, 210, 0.5))
      drop-shadow(0 0 30px rgba(25, 118, 210, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(25, 118, 210, 0.7))
      drop-shadow(0 0 40px rgba(25, 118, 210, 0.5));
  }
}

@keyframes text-glow-white {
  0%,
  100% {
    text-shadow:
      0 0 30px rgba(255, 255, 255, 0.8),
      0 0 60px rgba(255, 255, 255, 0.6),
      0 2px 10px rgba(0, 0, 0, 0.3);
  }
  50% {
    text-shadow:
      0 0 40px rgba(255, 255, 255, 1),
      0 0 80px rgba(255, 255, 255, 0.8),
      0 2px 15px rgba(0, 0, 0, 0.4);
  }
}

.typing-cursor {
  display: inline-block;
  margin-left: 5px;
  width: 3px;
  height: 1em;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    #2196f3 20%,
    #1976d2 50%,
    #2196f3 80%,
    transparent 100%
  );
  animation:
    blink 1s step-end infinite,
    cursor-glow 1.5s ease-in-out infinite;
  box-shadow:
    0 0 10px rgba(25, 118, 210, 0.6),
    0 0 20px rgba(25, 118, 210, 0.4);
  border-radius: 1px;
}

@keyframes blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

@keyframes cursor-glow {
  0%,
  100% {
    box-shadow:
      0 0 10px rgba(25, 118, 210, 0.6),
      0 0 20px rgba(25, 118, 210, 0.4);
  }
  50% {
    box-shadow:
      0 0 20px rgba(25, 118, 210, 0.8),
      0 0 30px rgba(25, 118, 210, 0.6),
      0 0 40px rgba(25, 118, 210, 0.4);
  }
}

/* Animation d'apparition des lettres */
@keyframes letter-pop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive cursor */
@media (max-width: 768px) {
  .hero-section {
    cursor: default;
  }

  .hero-section button,
  .hero-section a,
  .hero-section input,
  .hero-section select {
    cursor: pointer;
  }
}
</style>
