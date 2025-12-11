<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Service } from '@/types/property'

const router = useRouter()

interface Props {
  service: Service
}

const props = defineProps<Props>()
const isFavorite = ref(false)
const currentImageIndex = ref(0)

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

const getCategoryLabel = (category: Service['category']): string => {
  return category === 'moving-service' ? 'Déménagement' : 'Majordome'
}

const getCategoryIcon = (category: Service['category']): string => {
  return category === 'moving-service'
    ? 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
    : 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
}

const toggleFavorite = (e: Event) => {
  e.stopPropagation()
  isFavorite.value = !isFavorite.value
}
</script>

<template>
  <div
    class="service-card card-shimmer bg-white cursor-pointer group transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl"
    style="font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
    @click="router.push(`/service/${service.id}`)"
  >
    <!-- Image Container -->
    <div class="relative h-64 overflow-hidden">
      <div class="relative w-full h-full">
        <img
          :src="service.images[currentImageIndex] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'"
          :alt="service.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>

      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <span
          class="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md"
          :class="
            service.category === 'moving-service'
              ? 'bg-[#00A699] text-white'
              : 'bg-[#FC642D] text-white'
          "
        >
          {{ getCategoryLabel(service.category) }}
        </span>
      </div>

      <!-- Favorite Button -->
      <button
        @click="toggleFavorite"
        class="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200 z-10"
        :class="{ 'bg-blue-600': isFavorite }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 transition-colors"
          :class="isFavorite ? 'text-white' : 'text-gray-700'"
          :fill="isFavorite ? 'currentColor' : 'none'"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Location & Rating -->
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-600 font-medium truncate">{{ service.location }}</span>
        <div v-if="service.rating" class="flex items-center gap-1 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="text-sm font-medium text-gray-900">{{ service.rating }}</span>
        </div>
      </div>

      <!-- Title -->
      <h3
        class="text-base font-semibold text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors"
        :title="service.title"
      >
        {{ service.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ service.description }}</p>

      <!-- Features -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="(feature, index) in service.features.slice(0, 3)"
          :key="index"
          class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
        >
          {{ feature }}
        </span>
      </div>

      <!-- Price -->
      <div class="flex items-baseline justify-between">
        <div>
          <span class="text-base font-semibold text-gray-900">
            {{ formatPrice(service.price) }}
          </span>
          <span class="text-gray-600 text-sm font-normal ml-1">/service</span>
        </div>
        <div v-if="service.reviews" class="text-xs text-gray-500">
          ({{ service.reviews }} avis)
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

