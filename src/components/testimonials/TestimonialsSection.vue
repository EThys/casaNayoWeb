<script setup lang="ts">
import { ref } from 'vue'

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

const testimonials = ref<Testimonial[]>([
  {
    name: 'Marie Dubois',
    role: 'Propriétaire',
    content:
      'Excellent service ! L\'équipe nous a accompagnés avec professionnalisme pour l\'achat de notre première maison. Nous recommandons vivement.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    name: 'Jean Martin',
    role: 'Investisseur',
    content:
      'Une expertise remarquable et une négociation efficace. Nous avons trouvé plusieurs biens intéressants grâce à leur réseau. Très satisfait !',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    name: 'Sophie Laurent',
    role: 'Locataire',
    content:
      'Service de location impeccable. L\'équipe est réactive et professionnelle. J\'ai trouvé mon appartement idéal en quelques jours seulement.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
])
</script>

<template>
  <section class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Ce que disent nos clients
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez les témoignages de nos clients satisfaits
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Rating -->
          <div class="flex items-center mb-4">
            <div class="flex space-x-1">
              <svg
                v-for="i in 5"
                :key="i"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <p class="text-gray-700 mb-6 leading-relaxed text-sm lg:text-base">
            "{{ testimonial.content }}"
          </p>

          <!-- Author -->
          <div class="flex items-center">
            <img
              :src="testimonial.avatar"
              :alt="testimonial.name"
              class="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-gray-100"
            />
            <div>
              <div class="font-semibold text-gray-900 text-sm lg:text-base">
                {{ testimonial.name }}
              </div>
              <div class="text-xs lg:text-sm text-gray-500">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
}
</style>
