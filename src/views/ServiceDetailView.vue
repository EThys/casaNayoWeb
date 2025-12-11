<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { findServiceById } from '@/data/mockData'

const route = useRoute()
const router = useRouter()
const service = ref(findServiceById(route.params.id as string) || null)
const currentImageIndex = ref(0)
const isFavorite = ref(false)
const isLoading = ref(true)
const showInterventionModal = ref(false)
const interventionForm = ref({
  name: '',
  email: '',
  phone: '',
  date: '',
  address: '',
  description: '',
})

const openInterventionModal = () => {
  showInterventionModal.value = true
}

const closeInterventionModal = () => {
  showInterventionModal.value = false
}

const submitInterventionRequest = () => {
  // Ici vous pouvez ajouter la logique d'envoi du formulaire
  console.log('Demande d\'intervention:', interventionForm.value)
  // Simuler l'envoi
  alert('Votre demande d\'intervention a été envoyée avec succès !')
  closeInterventionModal()
  // Réinitialiser le formulaire
  interventionForm.value = {
    name: '',
    email: '',
    phone: '',
    date: '',
    address: '',
    description: '',
  }
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    'moving-service': 'Déménagement',
    'butler-service': 'Majordome',
    'plumber': 'Plomberie',
    'electrician': 'Électricité',
    'painter': 'Peinture',
    'architect': 'Architecture',
    'carpenter': 'Menuiserie',
    'tiler': 'Carrelage',
    'refrigeration-technician': 'Climatisation',
    'adjuster': 'Métallerie',
  }
  return labels[category] || category
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
  <MainLayout>
    <div class="min-h-screen bg-gray-50">
      <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Chargement...</p>
      </div>
    </div>

    <div v-else-if="service">
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
            class="px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white"
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
            <div class="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
              <!-- Prix -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200">
                <div class="text-sm text-blue-600 font-semibold mb-1">À partir de</div>
                <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                  {{ formatPrice(service.price) }}
                </div>
                <div class="text-sm text-gray-600">Tarif selon prestation</div>
              </div>

              <!-- Bouton Principal -->
              <button
                @click="openInterventionModal"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
                <span>Demander une intervention</span>
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>

              <!-- Bouton Secondaire -->
              <button
                class="w-full border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span>Poser une question</span>
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

    <!-- Modal Demande d'Intervention -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showInterventionModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeInterventionModal"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="showInterventionModal"
            class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <!-- Header -->
            <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-3xl z-10">
              <button
                @click="closeInterventionModal"
                class="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
              >
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-white" style="font-family: 'Poppins', sans-serif">
                    Demande d'Intervention
                  </h2>
                  <p class="text-blue-100 text-sm">Remplissez le formulaire ci-dessous</p>
                </div>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitInterventionRequest" class="p-6 space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <!-- Nom -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="interventionForm.name"
                    type="text"
                    required
                    placeholder="John Doe"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="interventionForm.email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  />
                </div>

                <!-- Téléphone -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="interventionForm.phone"
                    type="tel"
                    required
                    placeholder="+243 XXX XXX XXX"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  />
                </div>

                <!-- Date -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Date souhaitée <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="interventionForm.date"
                    type="date"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  />
                </div>
              </div>

              <!-- Adresse -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="interventionForm.address"
                  type="text"
                  required
                  placeholder="Rue, quartier, commune..."
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Description du problème <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="interventionForm.description"
                  required
                  rows="4"
                  placeholder="Décrivez votre besoin en détail..."
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 resize-none"
                ></textarea>
              </div>

              <!-- Info Box -->
              <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
                <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                <div class="text-sm text-blue-800">
                  <p class="font-semibold mb-1">Réponse rapide garantie</p>
                  <p>Nous vous contacterons dans les 24h pour confirmer votre intervention.</p>
                </div>
              </div>

              <!-- Buttons -->
              <div class="flex space-x-4 pt-2">
                <button
                  type="button"
                  @click="closeInterventionModal"
                  class="flex-1 px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 flex items-center justify-center space-x-2"
                >
                  <span>Envoyer la demande</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
    </div>
  </MainLayout>
</template>

