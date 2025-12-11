<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  { id: 'all', name: 'Tous les services', icon: '🏠' },
  { id: 'plumber', name: 'Plomberie', icon: '🔧' },
  { id: 'electrician', name: 'Électricité', icon: '⚡' },
  { id: 'painter', name: 'Peinture', icon: '🎨' },
  { id: 'architect', name: 'Architecture', icon: '📐' },
  { id: 'carpenter', name: 'Menuiserie', icon: '🪚' },
  { id: 'tiler', name: 'Carrelage', icon: '🧱' },
  { id: 'refrigeration-technician', name: 'Frigoriste', icon: '❄️' },
  { id: 'adjuster', name: 'Ajusteur', icon: '🔩' },
  { id: 'moving-service', name: 'Déménagement', icon: '📦' },
  { id: 'butler-service', name: 'Majordome', icon: '🎩' },
] as const

// Watch for filter changes
const handleCategoryChange = (category: ServiceCategory | 'all') => {
  selectedCategory.value = category
  currentPage.value = 1
  updateFilters()
}

const handleSearch = () => {
  currentPage.value = 1
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
  const end = start + itemsPerPage
  return filteredServices.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredServices.value.length / itemsPerPage)
})

const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Display range for pagination
const displayRange = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1
  const end = Math.min(currentPage.value * itemsPerPage, filteredServices.value.length)
  return { start, end }
})

// Visible page numbers (show max 7 pages)
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 3) {
      pages.push(1, 2, 3, 4, '...', total)
    } else if (currentPage.value >= total - 2) {
      pages.push(1, '...', total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '...', currentPage.value - 1, currentPage.value, currentPage.value + 1, '...', total)
    }
  }
  
  return pages
})
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div>
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 relative overflow-hidden">
        <!-- Decorative Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="text-white/80 text-sm font-medium">Services Professionnels RDC</div>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold mb-3">Tous les services</h1>
          <p class="text-blue-100 text-lg max-w-3xl">
            Découvrez tous nos services professionnels pour vos projets immobiliers en République Démocratique du Congo
          </p>
          <div class="mt-6 flex items-center gap-4 flex-wrap">
            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span class="text-2xl font-bold">{{ allServices.length }}</span>
              <span class="text-sm text-white/90">Services disponibles</span>
            </div>
            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span class="text-2xl font-bold">{{ serviceCategories.length - 1 }}</span>
              <span class="text-sm text-white/90">Catégories</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white border-b border-gray-200 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <!-- Search Bar -->
          <div class="mb-6">
            <div class="relative max-w-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un service..."
                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                @keyup.enter="handleSearch"
              />
            </div>
          </div>

          <!-- Filter Tabs -->
          <div class="relative">
            <div class="overflow-x-auto scrollbar-hide pb-2">
              <div class="flex gap-2 min-w-max">
                <button
                  v-for="category in serviceCategories"
                  :key="category.id"
                  @click="handleCategoryChange(category.id as ServiceCategory | 'all')"
                  class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap"
                  :class="
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-blue-600'
                  "
                >
                  <span class="text-lg">{{ category.icon }}</span>
                  <span>{{ category.name }}</span>
                  <span 
                    class="px-2 py-0.5 rounded-full text-xs font-bold"
                    :class="
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    "
                  >
                    {{ category.id === 'all' ? allServices.length : allServices.filter(s => s.category === category.id).length }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Results Count -->
          <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              <span class="font-semibold">{{ filteredServices.length }}</span>
              {{ filteredServices.length === 1 ? 'service trouvé' : 'services trouvés' }}
            </div>
            <div v-if="filteredServices.length > itemsPerPage" class="text-gray-500">
              Page {{ currentPage }} sur {{ totalPages }}
            </div>
          </div>
        </div>
      </div>

    <!-- Services Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
        <!-- Grid with Services -->
        <div
          v-if="filteredServices.length > 0"
          class="mb-12"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ServiceCard
              v-for="service in paginatedServices"
              :key="service.id"
              :service="service"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="space-y-6 mt-12">
            <!-- Page Info -->
            <div class="text-center text-sm text-gray-600">
              Affichage de <span class="font-semibold text-gray-900">{{ displayRange.start }}</span> à 
              <span class="font-semibold text-gray-900">{{ displayRange.end }}</span> sur 
              <span class="font-semibold text-gray-900">{{ filteredServices.length }}</span> services
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-center items-center gap-2">
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 shadow-sm hover:shadow-md'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                <span class="hidden sm:inline">Précédent</span>
              </button>

              <button
                v-for="(page, index) in visiblePages"
                :key="index"
                @click="typeof page === 'number' ? goToPage(page) : null"
                :disabled="page === '...'"
                class="px-4 py-2 rounded-lg font-medium transition-all min-w-[44px]"
                :class="page === '...' ? 'bg-transparent text-gray-400 cursor-default' : currentPage === page ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 shadow-sm hover:shadow-md'"
              >
                {{ page }}
              </button>

              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 shadow-sm hover:shadow-md'"
              >
                <span class="hidden sm:inline">Suivant</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun service trouvé</h3>
          <p class="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
          <button
            @click="resetFilters"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
    </div>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

