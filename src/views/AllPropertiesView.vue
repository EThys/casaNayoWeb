<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import PropertyCard from '@/components/property/PropertyCard.vue'
import { propertiesForSale, propertiesForRent } from '@/data/mockData'
import type { Property, PropertyType } from '@/types/property'
import { PROPERTY_TYPE_LABELS } from '@/types/property'

const route = useRoute()
const router = useRouter()

// Get all properties
const allProperties = ref<Property[]>([...propertiesForSale, ...propertiesForRent])

// Filters
const selectedStatus = ref<'all' | 'for-sale' | 'for-rent'>('all')
const selectedType = ref<PropertyType | 'all'>('all')
const searchQuery = ref('')

// Initialize filters from query params
if (route.query.status) {
  selectedStatus.value = (route.query.status as 'all' | 'for-sale' | 'for-rent') || 'all'
}
if (route.query.type) {
  selectedType.value = (route.query.type as PropertyType | 'all') || 'all'
}
if (route.query.search) {
  searchQuery.value = (route.query.search as string) || ''
}

// Available types
const availableTypes = computed(() => {
  const types = new Set<PropertyType>()
  allProperties.value.forEach((p) => types.add(p.type))
  return Array.from(types)
})

// Filtered properties
const filteredProperties = computed(() => {
  let filtered = [...allProperties.value]

  // Filter by status
  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter((p) => p.status === selectedStatus.value)
  }

  // Filter by type
  if (selectedType.value !== 'all') {
    filtered = filtered.filter((p) => p.type === selectedType.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Update URL when filters change
const updateFilters = () => {
  const query: Record<string, string> = {}
  if (selectedStatus.value !== 'all') query.status = selectedStatus.value
  if (selectedType.value !== 'all') query.type = selectedType.value
  if (searchQuery.value.trim()) query.search = searchQuery.value.trim()

  router.replace({ query })
}

// Watch for filter changes
const handleStatusChange = (status: 'all' | 'for-sale' | 'for-rent') => {
  selectedStatus.value = status
  currentPage.value = 1
  updateFilters()
}

const handleTypeChange = (type: PropertyType | 'all') => {
  selectedType.value = type
  currentPage.value = 1
  updateFilters()
}

const handleSearch = () => {
  currentPage.value = 1
  updateFilters()
}

const resetFilters = () => {
  selectedStatus.value = 'all'
  selectedType.value = 'all'
  searchQuery.value = ''
  currentPage.value = 1
  updateFilters()
}

// Pagination
const currentPage = ref(1)
const itemsPerPage = 12

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProperties.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProperties.value.length / itemsPerPage)
})

const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Display range for pagination
const displayRange = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1
  const end = Math.min(currentPage.value * itemsPerPage, filteredProperties.value.length)
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
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold mb-2">Toutes les propriétés</h1>
          <p class="text-blue-100 text-lg">
            Découvrez notre sélection complète de biens immobiliers en RDC
          </p>
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
                placeholder="Rechercher par titre, localisation..."
                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                @keyup.enter="handleSearch"
              />
            </div>
          </div>

          <!-- Filter Pills -->
          <div class="flex flex-wrap gap-3">
            <!-- Status Filter -->
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-700">Statut :</span>
              <button
                @click="handleStatusChange('all')"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all"
                :class="
                  selectedStatus === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                "
              >
                Tous
              </button>
              <button
                @click="handleStatusChange('for-sale')"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all"
                :class="
                  selectedStatus === 'for-sale'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                "
              >
                À vendre
              </button>
              <button
                @click="handleStatusChange('for-rent')"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all"
                :class="
                  selectedStatus === 'for-rent'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                "
              >
                À louer
              </button>
            </div>

            <!-- Type Filter -->
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-700">Type :</span>
              <button
                @click="handleTypeChange('all')"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all"
                :class="
                  selectedType === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                "
              >
                Tous types
              </button>
              <button
                v-for="type in availableTypes"
                :key="type"
                @click="handleTypeChange(type)"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all capitalize"
                :class="
                  selectedType === type
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                "
              >
                {{ PROPERTY_TYPE_LABELS[type] }}
              </button>
            </div>
          </div>

          <!-- Results Count -->
          <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              <span class="font-semibold">{{ filteredProperties.length }}</span>
              {{ filteredProperties.length === 1 ? 'propriété trouvée' : 'propriétés trouvées' }}
            </div>
            <div v-if="filteredProperties.length > itemsPerPage" class="text-gray-500">
              Page {{ currentPage }} sur {{ totalPages }}
            </div>
          </div>
        </div>
      </div>

    <!-- Properties Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
        <!-- Grid with Properties -->
        <div v-if="filteredProperties.length > 0" class="mb-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <PropertyCard
              v-for="property in paginatedProperties"
              :key="property.id"
              :property="property"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="space-y-6 mt-12">
            <!-- Page Info -->
            <div class="text-center text-sm text-gray-600">
              Affichage de <span class="font-semibold text-gray-900">{{ displayRange.start }}</span> à 
              <span class="font-semibold text-gray-900">{{ displayRange.end }}</span> sur 
              <span class="font-semibold text-gray-900">{{ filteredProperties.length }}</span> propriétés
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
        <div
          v-else
          class="text-center py-16"
        >
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucune propriété trouvée</h3>
          <p class="text-gray-600 mb-4">
            Essayez de modifier vos critères de recherche
          </p>
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

