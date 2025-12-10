<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBarComponent from '@/components/navbar/NavBarComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import { findServiceById } from '@/data/mockData'

const route = useRoute()
const router = useRouter()
const service = ref(findServiceById(route.params.id as string) || null)
const currentImageIndex = ref(0)
const isFavorite = ref(false)
const isLoading = ref(true)

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

const getCategoryLabel = (category: string): string => {
  return category === 'moving-service' ? 'Déménagement' : 'Majordome'
}

const nextImage = () => {
  if (service.value && service.value.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % service.value.images.length
  }
}

const prevImage = () => {
  if (service.value && service.value.images.length > 1) {
    currentImageIndex.value =
      currentImageIndex.value === 0
        ? service.value.images.length - 1
        : currentImageIndex.value - 1
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
}

onMounted(() => {
  if (!service.value) {
    // Rediriger vers la page d'accueil si le service n'existe pas
    router.push('/')
  }
  isLoading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBarComponent />

    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Chargement...</p>
      </div>
    </div>

    <div v-else-if="service" class="pt-16">
      <!-- Image Gallery -->
      <div class="relative h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
        <div class="relative w-full h-full">
          <img
            v-for="(image, index) in service.images"
            :key="`img-${index}`"
            :src="image"
            :alt="`${service.title} - Image ${index + 1}`"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            :class="{
              'opacity-100 z-10': currentImageIndex === index,
              'opacity-0 z-0': currentImageIndex !== index,
            }"
          />
        </div>

        <!-- Navigation Buttons -->
        <button
          v-if="service.images.length > 1"
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
          v-if="service.images.length > 1"
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
          v-if="service.images.length > 1"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20"
        >
          <button
            v-for="(img, index) in service.images"
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

        <!-- Category Badge -->
        <div class="absolute top-4 left-4 z-20">
          <span
            class="px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md shadow-lg"
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
                {{ service.title }}
              </h1>
              <div class="flex items-center gap-4 text-gray-600 mb-4">
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
                  <span>{{ service.location }}</span>
                </div>
                <span v-if="service.rating" class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="font-semibold">{{ service.rating }}</span>
                  <span v-if="service.reviews" class="text-gray-500">
                    ({{ service.reviews }} avis)
                  </span>
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p class="text-gray-700 leading-relaxed">{{ service.description }}</p>
            </div>

            <!-- Features -->
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Services inclus</h2>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="feature in service.features"
                  :key="feature"
                  class="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
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
                  {{ formatPrice(service.price) }}
                </div>
                <div class="text-gray-600">par service</div>
              </div>

              <button
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
              >
                Réserver maintenant
              </button>

              <button
                class="w-full border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-4 rounded-xl transition-all duration-300 mb-4"
              >
                Contacter le prestataire
              </button>

              <div class="border-t border-gray-200 pt-4 space-y-3">
                <div class="flex items-center gap-2 text-gray-600">
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
                <div class="flex items-center gap-2 text-gray-600">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span class="text-sm">Service vérifié et assuré</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

