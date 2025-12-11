<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import VisitRequestModal from '@/components/property/VisitRequestModal.vue'
import { PROPERTY_TYPE_LABELS } from '@/types/property'
import { findPropertyById } from '@/data/mockData'

const route = useRoute()
const router = useRouter()
const property = ref(findPropertyById(route.params.id as string) || null)
const currentImageIndex = ref(0)
const isFavorite = ref(false)
const isLoading = ref(true)
const showVisitModal = ref(false)

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

const nextImage = () => {
  if (property.value && property.value.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % property.value.images.length
  }
}

const prevImage = () => {
  if (property.value && property.value.images.length > 1) {
    currentImageIndex.value =
      currentImageIndex.value === 0
        ? property.value.images.length - 1
        : currentImageIndex.value - 1
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
}

onMounted(() => {
  if (!property.value) {
    // Rediriger vers la page d'accueil si la propriété n'existe pas
    router.push('/')
  }
  isLoading.value = false
})
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-gray-50">
      <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Chargement...</p>
      </div>
    </div>

    <div v-else-if="property">
      <!-- Image Gallery -->
      <div class="relative h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
        <div class="relative w-full h-full">
          <img
            v-for="(image, index) in property.images"
            :key="`img-${index}`"
            :src="image"
            :alt="`${property.title} - Image ${index + 1}`"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            :class="{
              'opacity-100 z-10': currentImageIndex === index,
              'opacity-0 z-0': currentImageIndex !== index,
            }"
          />
        </div>

        <!-- Navigation Buttons -->
        <button
          v-if="property.images.length > 1"
          @click="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          v-if="property.images.length > 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Image Indicators -->
        <div
          v-if="property.images.length > 1"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20"
        >
          <button
            v-for="(img, index) in property.images"
            :key="index"
            @click="goToImage(index)"
            class="transition-all duration-300 rounded-full"
            :class="
              currentImageIndex === index
                ? 'w-8 h-2 bg-white shadow-lg'
                : 'w-2 h-2 bg-white/60 hover:bg-white/80'
            "
          ></button>
        </div>

        <!-- Favorite Button -->
        <button
          @click="isFavorite = !isFavorite"
          class="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-20"
          :class="{ 'bg-blue-600': isFavorite }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 transition-colors"
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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Header -->
            <div>
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {{ property.title }}
              </h1>
              <div class="flex items-center gap-4 text-gray-600">
                <div class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
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
                  <span>{{ property.location }}</span>
                </div>
                <span class="text-gray-400">·</span>
                <span>{{ PROPERTY_TYPE_LABELS[property.type] }}</span>
              </div>
            </div>

            <!-- Description -->
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p class="text-gray-700 leading-relaxed">{{ property.description }}</p>
            </div>

            <!-- Features -->
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Caractéristiques</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                  v-if="property.bedrooms"
                  class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-blue-600"
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
                  <div>
                    <div class="text-sm text-gray-600">Chambres</div>
                    <div class="text-lg font-semibold text-gray-900">
                      {{ property.bedrooms }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="property.bathrooms"
                  class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-600">Salles de bain</div>
                    <div class="text-lg font-semibold text-gray-900">
                      {{ property.bathrooms }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-600">Surface</div>
                    <div class="text-lg font-semibold text-gray-900">{{ property.area }} m²</div>
                  </div>
                </div>
                <div
                  v-if="property.parking"
                  class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-600">Parking</div>
                    <div class="text-lg font-semibold text-gray-900">{{ property.parking }}</div>
                  </div>
                </div>
                <div
                  v-if="property.yearBuilt"
                  class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <div class="text-sm text-gray-600">Année</div>
                    <div class="text-lg font-semibold text-gray-900">
                      {{ property.yearBuilt }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Features List -->
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Équipements</h2>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="feature in property.features"
                  :key="feature"
                  class="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium capitalize"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div class="mb-6">
                <div class="text-3xl font-bold text-gray-900 mb-2">
                  {{ formatPrice(property.price) }}
                </div>
                <div v-if="property.status === 'for-rent'" class="text-gray-600">
                  par mois
                </div>
              </div>

              <button
                @click="showVisitModal = true"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
              >
                Planifier une visite
              </button>

              <div class="border-t border-gray-200 pt-4">
                <div class="flex items-center gap-2 text-gray-600 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="text-sm">Réponse généralement sous 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Visit Request Modal -->
    <VisitRequestModal
      v-if="showVisitModal && property"
      :property-title="property.title"
      :property-location="property.location"
      @close="showVisitModal = false"
    />
    </div>
  </MainLayout>
</template>

