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
  <!-- Hero Section - Beautiful Design -->
  <div class="hero-section relative min-h-[700px] flex items-center justify-center overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')] bg-cover bg-center bg-no-repeat"
        style="transform: scale(1.05); filter: brightness(0.55)"
      ></div>
      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/75 to-indigo-900/80"
      ></div>
      <!-- Subtle Pattern -->
      <div
        class="absolute inset-0 opacity-10"
        style="
          background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
          background-size: 30px 30px;
        "
      ></div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      :class="{ 'animate-fade-in-up': isLoaded }"
    >
      <!-- Main Title -->
      <div class="text-center mb-14">
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
          style="font-family: 'Poppins', sans-serif; text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4)"
        >
          Trouvez votre
          <span class="text-blue-300 font-bold">bien immobilier</span>
        </h1>
        <p
          class="text-xl sm:text-2xl text-white/95 font-light max-w-2xl mx-auto leading-relaxed"
          style="text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3)"
        >
          Recherchez parmi plus de 50 000 annonces en République Démocratique du Congo
        </p>
      </div>

      <!-- Simple One-Line Search Bar -->
      <div class="max-w-5xl mx-auto">
        <div
          class="bg-white rounded-full shadow-2xl overflow-hidden border border-white/30 transition-all duration-300"
          :class="{ 'ring-4 ring-blue-500/20 shadow-3xl': showAdvancedFilters }"
        >
          <!-- Single Line Search -->
          <div class="flex items-center px-2 py-2">
            <!-- Location Icon & Input -->
            <div class="flex-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-400 ml-4 mr-3 flex-shrink-0"
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
              <input
                v-model="searchFilters.location"
                type="text"
                placeholder="Ville, quartier, commune..."
                class="flex-1 text-base text-gray-900 placeholder-gray-400 outline-none bg-transparent py-3"
                @keyup.enter="handleSearch"
                @focus="showAdvancedFilters = false"
                list="location-suggestions"
              />
              <datalist id="location-suggestions">
                <option v-for="loc in popularLocations" :key="loc" :value="loc" />
              </datalist>
            </div>

            <!-- Divider -->
            <div class="w-px h-8 bg-gray-300 mx-2"></div>

            <!-- Type Select -->
            <div class="relative min-w-[140px]">
              <select
                v-model="searchFilters.type"
                class="w-full pl-4 pr-8 py-3 text-base text-gray-700 bg-transparent border-none outline-none cursor-pointer appearance-none"
                @focus="showAdvancedFilters = false"
              >
                <option :value="undefined">Tous types</option>
                <option value="house">Maison</option>
                <option value="apartment">Appartement</option>
                <option value="villa">Villa</option>
                <option value="office">Bureau</option>
                <option value="warehouse">Entrepôt</option>
                <option value="land">Terrain</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <!-- Divider -->
            <div class="w-px h-8 bg-gray-300 mx-2"></div>

            <!-- Status Select -->
            <div class="relative min-w-[120px]">
              <select
                v-model="searchFilters.status"
                class="w-full pl-4 pr-8 py-3 text-base text-gray-700 bg-transparent border-none outline-none cursor-pointer appearance-none"
                @focus="showAdvancedFilters = false"
              >
                <option value="for-sale">À vendre</option>
                <option value="for-rent">À louer</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <!-- Search Button -->
            <button
              @click="handleSearch"
              class="ml-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 whitespace-nowrap"
              style="font-family: 'Poppins', sans-serif"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Rechercher</span>
            </button>
          </div>

          <!-- Advanced Filters Toggle -->
          <div
            class="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50"
          >
            <button
              @click="showAdvancedFilters = !showAdvancedFilters"
              class="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-transform group-hover:rotate-90"
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
              <span>Filtres avancés</span>
              <span
                v-if="activeFiltersCount > 0"
                class="ml-2 px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full"
              >
                {{ activeFiltersCount }}
              </span>
            </button>
            <button
              v-if="activeFiltersCount > 0"
              @click="clearFilters"
              class="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              Réinitialiser
            </button>
          </div>

          <!-- Advanced Filters Panel -->
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[600px]"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 max-h-[600px]"
            leave-to-class="opacity-0 max-h-0"
          >
            <div
              v-if="showAdvancedFilters"
              class="border-t border-gray-200 bg-white p-6 overflow-hidden"
            >
              <div class="max-w-4xl mx-auto space-y-5">
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
            </div>
          </transition>
        </div>

        <!-- Popular Destinations -->
        <div class="mt-10 text-center">
          <div class="flex flex-wrap justify-center gap-3">
            <button
              v-for="loc in popularLocations.slice(0, 8)"
              :key="loc"
              @click="selectLocation(loc)"
              class="px-6 py-3 text-sm text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 hover:border-white/50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              {{ loc }}
            </button>
          </div>
        </div>
      </div>
    </div>
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
}
</style>
