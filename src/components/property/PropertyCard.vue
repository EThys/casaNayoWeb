<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Property } from '@/types/property'
import { PROPERTY_TYPE_LABELS } from '@/types/property'

const router = useRouter()

interface Props {
  property: Property
  variant?: 'grid' | 'list'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'grid'
})
const isFavorite = ref(false)
const currentImageIndex = ref(0)
const isHovered = ref(false)
const autoCarouselInterval = ref<any>(null)

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

const getTypeLabel = (type: Property['type']): string => {
  return PROPERTY_TYPE_LABELS[type] || type
}

const hasBedrooms = computed(() => {
  return props.property.bedrooms !== undefined && props.property.bedrooms > 0
})

const hasBathrooms = computed(() => {
  return props.property.bathrooms !== undefined && props.property.bathrooms > 0
})

const toggleFavorite = (e: Event) => {
  e.stopPropagation()
  isFavorite.value = !isFavorite.value
}

const nextImage = (e?: Event) => {
  if (e) e.stopPropagation()
  if (props.property.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.property.images.length
  }
}

const prevImage = (e: Event) => {
  e.stopPropagation()
  if (props.property.images.length > 1) {
    currentImageIndex.value =
      currentImageIndex.value === 0 ? props.property.images.length - 1 : currentImageIndex.value - 1
  }
}

const goToImage = (index: number, e: Event) => {
  e.stopPropagation()
  currentImageIndex.value = index
}

const startAutoCarousel = () => {
  if (props.property.images.length <= 1) return
  stopAutoCarousel()
  autoCarouselInterval.value = setInterval(() => {
    nextImage()
  }, 4000) // Change image every 4 seconds
}

const stopAutoCarousel = () => {
  if (autoCarouselInterval.value) {
    clearInterval(autoCarouselInterval.value)
    autoCarouselInterval.value = null
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
  if (props.property.images.length > 1) {
    startAutoCarousel()
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
  stopAutoCarousel()
}

onMounted(() => {
  // Start auto carousel on mount if there are multiple images
  if (props.property.images.length > 1) {
    startAutoCarousel()
  }
})

onUnmounted(() => {
  stopAutoCarousel()
})

// Unique touch: Determine if property is "New" or "Popular"
const isNew = ref(Math.random() > 0.7)
const isPopular = ref(Math.random() > 0.6)
</script>

<template>
  <div
    class="property-card group bg-white cursor-pointer transition-all duration-700 overflow-hidden border border-slate-100/50 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] relative"
    :class="[
      variant === 'list' ? 'flex flex-row h-72 rounded-[40px]' : 'flex flex-col rounded-[32px]',
      { 'transform -translate-y-3 scale-[1.01]': isHovered && variant === 'grid' }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="router.push(`/property/${property.id}`)"
  >
    <!-- Image Container with Auto Carousel -->
    <div 
      class="relative overflow-hidden"
      :class="variant === 'list' ? 'w-2/5 h-full' : 'h-72'"
    >
      <div class="relative w-full h-full">
        <!-- Image with smooth fade transition -->
        <div class="relative w-full h-full">
          <img
            v-for="(image, index) in property.images"
            :key="`img-${index}`"
            :src="image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'"
            :alt="`${property.title} - Image ${index + 1}`"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            :class="{
              'opacity-100 z-10': currentImageIndex === index,
              'opacity-0 z-0 pointer-events-none': currentImageIndex !== index,
            }"
            loading="lazy"
            style="transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);"
          />
          <!-- Overlay gradient on hover -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"
          ></div>
        </div>

        <!-- Image Navigation (Visible on hover) -->
        <div
          v-if="property.images.length > 1"
          class="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 z-30"
        >
          <button
            @click="prevImage"
            class="w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-white transition-all duration-300 transform hover:rotate-[-5deg]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            @click="nextImage"
            class="w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-white transition-all duration-300 transform hover:rotate-[5deg]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <!-- Image Indicators (Always visible if more than 1 image) -->
        <div
          v-if="property.images.length > 1"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full"
        >
          <button
            v-for="(img, index) in property.images"
            :key="index"
            @click="goToImage(index, $event)"
            @mouseenter="stopAutoCarousel"
            @mouseleave="startAutoCarousel"
            class="transition-all duration-300 rounded-full hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white/50"
            :class="
              currentImageIndex === index
                ? 'w-8 h-2 bg-white shadow-lg'
                : 'w-2 h-2 bg-white/60 hover:bg-white/80'
            "
            :aria-label="`Image ${index + 1} sur ${property.images.length}`"
          ></button>
        </div>
      </div>

      <!-- Favorite Button with enhanced hover -->
      <button
        @click="toggleFavorite"
        class="absolute top-5 right-5 w-11 h-11 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 z-30 group/fav"
        :class="{
          'bg-blue-600 shadow-blue-500/40': isFavorite,
          'bg-white/80 hover:bg-white': !isFavorite,
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 transition-all duration-300"
          :class="isFavorite ? 'text-white scale-110' : 'text-gray-700'"
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

      <!-- Unique Badges (Nouveau/Populaire) -->
      <div class="absolute top-4 left-4 flex flex-col gap-2 z-30">
        <span
          v-if="isNew"
          class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white shadow-xl backdrop-blur-md"
        >
          Nouveau
        </span>
        <span
          v-if="isPopular"
          class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500 text-white shadow-xl backdrop-blur-md"
        >
          Populaire
        </span>
      </div>
    </div>

    <!-- Content with enhanced hover effects -->
    <div 
      class="p-8 transition-all duration-500 flex flex-col justify-between" 
      :class="[
        variant === 'list' ? 'flex-1' : '',
        { 'bg-gradient-to-br from-gray-50 to-white': isHovered }
      ]"
    >
      <!-- Location -->
      <div class="flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3.5 h-3.5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
        </svg>
        <span class="text-[11px] font-black uppercase tracking-widest text-slate-400 truncate">
          {{ property.location }}
        </span>
      </div>

      <!-- Title -->
      <h3
        class="text-xl font-black text-slate-900 mb-4 tracking-tighter leading-tight group-hover:text-blue-600 transition-colors"
        :title="property.title"
      >
        {{ property.title }}
      </h3>

      <!-- Features Icons - Compact -->
      <div 
        class="flex items-center gap-4 text-gray-600 mb-6 text-sm flex-wrap"
        :class="variant === 'list' ? 'mb-auto' : 'mb-3'"
      >
        <span
          v-if="hasBedrooms"
          class="transition-colors duration-300"
          :class="{ 'text-blue-600 font-semibold': isHovered }"
        >
          {{ property.bedrooms }} chambres
        </span>
        <span v-if="hasBedrooms && hasBathrooms">·</span>
        <span
          v-if="hasBathrooms"
          class="transition-colors duration-300"
          :class="{ 'text-blue-600 font-semibold': isHovered }"
        >
          {{ property.bathrooms }} salles de bain
        </span>
        <span v-if="(hasBedrooms || hasBathrooms) && property.area">·</span>
        <span
          v-if="property.area"
          class="transition-colors duration-300"
          :class="{ 'text-blue-600 font-semibold': isHovered }"
        >
          {{ property.area }} m²
        </span>
        <span v-if="property.capacity && (hasBedrooms || hasBathrooms || property.area)">·</span>
        <span
          v-if="property.capacity"
          class="transition-colors duration-300"
          :class="{ 'text-blue-600 font-semibold': isHovered }"
        >
          Capacité: {{ property.capacity }} pers.
        </span>
      </div>

      <!-- Price -->
      <div class="flex items-baseline justify-between pt-3 border-t border-gray-100">
        <div class="transition-transform duration-300" :class="{ 'scale-105': isHovered }">
          <span
            class="text-2xl font-black text-slate-900 tracking-tighter"
          >
            {{ formatPrice(property.price) }}
          </span>
          <span
            v-if="property.status === 'for-rent'"
            class="text-gray-600 text-sm font-medium ml-1 transition-colors duration-300"
            :class="{ 'text-blue-600': isHovered }"
          >
            /mois
          </span>
        </div>
        <div class="flex items-center gap-1 transition-transform duration-300" :class="{ 'scale-110': isHovered }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-blue-600 transition-transform duration-300"
            :class="{ 'rotate-12': isHovered }"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="text-sm font-bold text-gray-900">4.8</span>
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
  line-clamp: 2;
  overflow: hidden;
}

.property-card {
  border-radius: 1rem;
  will-change: transform;
}

/* Smooth image transition */
.property-card img {
  will-change: opacity;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
