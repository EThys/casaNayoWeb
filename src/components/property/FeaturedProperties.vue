<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Property } from '@/types/property'
import PropertyCard from './PropertyCard.vue'

interface Props {
  properties: Property[]
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 8,
})

const selectedFilter = ref<string>('all')
const displayedProperties = computed(() => {
  let filtered = props.properties
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter((p) => p.type === selectedFilter.value)
  }
  return filtered.slice(0, props.limit)
})

const filters = [
  { value: 'all', label: 'Tout', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { value: 'house', label: 'Maisons', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { value: 'apartment', label: 'Appartements', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { value: 'villa', label: 'Villas', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
]
</script>

<template>
  <section
    class="py-8 lg:py-12 bg-white"
    style="font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with Filters -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 class="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
              Explorez les propriétés
            </h2>
            <p class="text-sm lg:text-base text-gray-600">
              {{ displayedProperties.length }} propriétés disponibles
            </p>
          </div>
          <!-- View Toggle (Unique touch) -->
          <div class="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              class="p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              class="p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Filter Pills (Unique touch - Style App) -->
        <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="selectedFilter = filter.value"
            class="flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap flex-shrink-0"
            :class="
              selectedFilter === filter.value
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="filter.icon"
              />
            </svg>
            <span class="text-sm font-medium">{{ filter.label }}</span>
          </button>
        </div>
      </div>

      <!-- Properties Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <PropertyCard
          v-for="property in displayedProperties"
          :key="property.id"
          :property="property"
        />
      </div>

      <!-- Load More Button (App style) -->
      <div class="text-center mt-10">
        <router-link
          to="/properties"
          class="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"
        >
          <span>Afficher plus</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
