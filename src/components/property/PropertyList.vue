<script setup lang="ts">
import { computed } from 'vue'
import type { Property, SearchFilters } from '@/types/property'
import PropertyCard from './PropertyCard.vue'

interface Props {
  properties: Property[]
  filters?: SearchFilters
}

const props = withDefaults(defineProps<Props>(), {
  filters: () => ({}),
})

const filteredProperties = computed(() => {
  let result = [...props.properties]

  if (props.filters.location) {
    const locationLower = props.filters.location.toLowerCase()
    result = result.filter((p) => p.location.toLowerCase().includes(locationLower))
  }

  if (props.filters.type) {
    result = result.filter((p) => p.type === props.filters.type)
  }

  if (props.filters.status) {
    result = result.filter((p) => p.status === props.filters.status)
  }

  if (props.filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= props.filters.minPrice!)
  }

  if (props.filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= props.filters.maxPrice!)
  }

  if (props.filters.bedrooms !== undefined) {
    result = result.filter((p) => p.bedrooms >= props.filters.bedrooms!)
  }

  if (props.filters.bathrooms !== undefined) {
    result = result.filter((p) => p.bathrooms >= props.filters.bathrooms!)
  }

  return result
})
</script>

<template>
  <div class="property-list">
    <div v-if="filteredProperties.length === 0" class="text-center py-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-24 h-24 mx-auto text-gray-300 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">Aucune propriété trouvée</h3>
      <p class="text-gray-500">Essayez de modifier vos critères de recherche</p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <PropertyCard
        v-for="property in filteredProperties"
        :key="property.id"
        :property="property"
      />
    </div>
  </div>
</template>

<style scoped>
.property-list {
  font-family: 'Inter', sans-serif;
}
</style>

