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
const isSharing = ref(false)
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

const showAllReviewsModal = ref(false)

const mockReviews = [
  {
    id: 'r1',
    userName: 'Sarah M.',
    userImage: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5,
    comment: 'Service impeccable ! Ponctuel et très professionnel. Je recommande vivement pour tout dépannage électrique.',
    date: '12 Déc 2023',
  },
  {
    id: 'r2',
    userName: 'Marc L.',
    userImage: 'https://i.pravatar.cc/150?u=marc',
    rating: 4,
    comment: 'Très satisfait de l\'intervention. Travail propre et soigné. Un petit retard compensé par la qualité du service.',
    date: '05 Déc 2023',
  },
  {
    id: 'r3',
    userName: 'Arnaud K.',
    userImage: 'https://i.pravatar.cc/150?u=arnaud',
    rating: 5,
    comment: 'Installation parfaite. De bons conseils pour l\'optimisation de la consommation électrique. Merci encore !',
    date: '28 Nov 2023',
  }
]

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

const handleShare = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: service.value?.title,
        text: service.value?.description,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papier !')
    }
  } catch (err) {
    console.error('Erreur lors du partage:', err)
  }
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
      <!-- Image Gallery Section -->
      <div class="relative h-[550px] lg:h-[650px] overflow-hidden bg-gray-950">
        <!-- Main Images -->
        <div class="relative w-full h-full">
          <img
            v-for="(image, index) in service.images"
            :key="`img-${index}`"
            :src="image"
            :alt="`${service.title} - Image ${index + 1}`"
            class="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
            :class="{
              'opacity-100 z-10 scale-100': currentImageIndex === index,
              'opacity-0 z-0 scale-110 blur-sm': currentImageIndex !== index,
            }"
          />
          <!-- Dark overlay for better text contrast at top -->
          <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none"></div>
        </div>

        <!-- Top Overlay: Category only -->
        <div class="absolute top-8 left-0 right-0 px-6 sm:px-10 flex justify-between items-start z-40 pointer-events-none">
          <div class="flex items-center gap-4 pointer-events-auto">
            <div 
              v-if="service"
              class="px-5 py-2.5 bg-blue-600/90 backdrop-blur-lg rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-500/40 border border-white/20 flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              {{ getCategoryLabel(service.category) }}
            </div>
          </div>
        </div>

        <!-- Bottom Left: Navigation Buttons -->
        <div class="absolute bottom-8 left-6 sm:left-10 flex items-center gap-3 z-40">
          <button
            @click="router.back()"
            class="w-12 h-12 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-white/20 active:scale-95 transition-all group"
            title="Retour"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="h-8 w-[1px] bg-white/20 mx-1"></div>

          <button
            @click="handleShare"
            class="w-12 h-12 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-white/20 active:scale-95 transition-all"
            title="Partager"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          <button
            @click="isFavorite = !isFavorite"
            class="w-12 h-12 backdrop-blur-xl border rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 overflow-hidden relative group/fav"
            :class="isFavorite ? 'bg-red-500 border-red-400 text-white' : 'bg-black/40 border-white/20 text-white hover:bg-white/20'"
            title="Favoris"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 transition-all duration-300 transform group-hover/fav:scale-110"
              :fill="isFavorite ? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.3"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <!-- Image Gallery Controls -->
        <div v-if="service.images.length > 1">
          <!-- Navigation Arrows -->
          <button
            @click="prevImage"
            class="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-white/20 transition-all z-30 active:scale-95 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextImage"
            class="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-white/20 transition-all z-30 active:scale-95 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Indicators -->
          <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 px-5 py-3 bg-black/30 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
            <button
              v-for="(img, index) in service.images"
              :key="index"
              @click="goToImage(index)"
              class="transition-all duration-500 rounded-full"
              :class="
                currentImageIndex === index
                  ? 'w-10 h-1.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              "
            ></button>
          </div>
        </div>
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

            <!-- Reviews Section -->
            <div v-if="service" class="border-t border-gray-200 pt-8 mt-4">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">Avis clients</h2>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="flex text-yellow-400">
                      <svg v-for="i in 5" :key="i" class="w-5 h-5" :fill="i <= Math.round(service.rating || 0) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="font-bold text-gray-900">{{ service.rating }}</span>
                    <span class="text-gray-500">· {{ service.reviews }} avis</span>
                  </div>
                </div>
                <button 
                  @click="showAllReviewsModal = true"
                  class="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Voir tous les avis
                </button>
              </div>

              <div class="space-y-6">
                <div v-for="review in mockReviews.slice(0, 2)" :key="review.id" class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <img :src="review.userImage" :alt="review.userName" class="w-10 h-10 rounded-full object-cover">
                      <div>
                        <div class="font-bold text-gray-900">{{ review.userName }}</div>
                        <div class="text-[10px] text-gray-500">{{ review.date }}</div>
                      </div>
                    </div>
                    <div class="flex text-yellow-400">
                      <svg v-for="i in 5" :key="i" class="w-4 h-4" :fill="i <= review.rating ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-gray-700 leading-relaxed text-sm italic">"{{ review.comment }}"</p>
                </div>
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
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-[1.02] flex items-center justify-center space-x-2 group"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
                <span>Demander une intervention</span>
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
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
  </div>

    <!-- Modal Demande d'Intervention -->
    <Teleport to="body">
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
          class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
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
                  <h2 class="text-2xl font-bold text-white">
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
  </Teleport>

    <!-- Modal Tous les Avis -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showAllReviewsModal"
          class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          @click.self="showAllReviewsModal = false"
        >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-8 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-8 scale-95"
        >
          <div
            v-if="showAllReviewsModal"
            class="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative overflow-hidden"
          >
            <!-- Header -->
            <div class="p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Tous les avis</h2>
                <p class="text-gray-500 text-sm mt-1">Basé sur {{ service?.reviews }} expériences</p>
              </div>
              <button
                @click="showAllReviewsModal = false"
                class="w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors group"
              >
                <svg class="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- List -->
            <div class="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <div v-for="review in mockReviews" :key="review.id" class="animate-in fade-in slide-in-from-bottom duration-500">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-4">
                    <img :src="review.userImage" :alt="review.userName" class="w-12 h-12 rounded-full object-cover ring-4 ring-blue-50">
                    <div>
                      <div class="font-bold text-gray-900 text-lg">{{ review.userName }}</div>
                      <div class="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-md inline-block">{{ review.date }}</div>
                    </div>
                  </div>
                  <div class="flex text-yellow-400 bg-yellow-50 px-3 py-1 rounded-full">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4" :fill="i <= review.rating ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <p class="text-gray-700 leading-relaxed pl-16 italic">"{{ review.comment }}"</p>
                <div class="mt-6 border-b border-gray-50 ml-16"></div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-8 border-t border-gray-100 bg-gray-50/50">
              <button 
                @click="showAllReviewsModal = false"
                class="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors shadow-lg"
              >
                Fermer
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
    </Teleport>
  </MainLayout>
</template>

