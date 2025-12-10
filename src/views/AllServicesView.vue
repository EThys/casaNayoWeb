<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBarComponent from '@/components/navbar/NavBarComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import ServiceCard from '@/components/property/ServiceCard.vue'
import { movingServices, butlerServices } from '@/data/mockData'
import type { Service } from '@/types/property'

const route = useRoute()
const router = useRouter()

// Get all services
const allServices = ref<Service[]>([...movingServices, ...butlerServices])

// Filters
const selectedCategory = ref<'all' | 'moving-service' | 'butler-service'>(
  (route.query.category as 'all' | 'moving-service' | 'butler-service') || 'all'
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

// Watch for filter changes
const handleCategoryChange = (category: 'all' | 'moving-service' | 'butler-service') => {
  selectedCategory.value = category
  updateFilters()
}

const handleSearch = () => {
  updateFilters()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBarComponent />

    <div class="pt-16 pb-12">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold mb-2">Tous les services</h1>
          <p class="text-blue-100 text-lg">
            Découvrez nos services de déménagement et de majordome
          </p>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
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

          <!-- Filter Pills -->
          <div class="flex flex-wrap gap-3">
            <!-- Category Filter -->
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-700">Catégorie :</span>
              <button
                @click="handleCategoryChange('all')"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all"
                :class="
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                "
              >
                Tous
              </button>
              <button
                @click="handleCategoryChange('moving-service')"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all"
                :class="
                  selectedCategory === 'moving-service'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                "
              >
                Déménagement
              </button>
              <button
                @click="handleCategoryChange('butler-service')"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all"
                :class="
                  selectedCategory === 'butler-service'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                "
              >
                Majordome
              </button>
            </div>
          </div>

          <!-- Results Count -->
          <div class="mt-4 text-sm text-gray-600">
            <span class="font-semibold">{{ filteredServices.length }}</span>
            {{ filteredServices.length === 1 ? 'service trouvé' : 'services trouvés' }}
          </div>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          v-if="filteredServices.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ServiceCard
            v-for="service in filteredServices"
            :key="service.id"
            :service="service"
          />
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
            @click="
              selectedCategory = 'all'
              searchQuery = ''
              updateFilters()
            "
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>



