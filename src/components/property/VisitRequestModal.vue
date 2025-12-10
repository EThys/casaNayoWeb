<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  propertyTitle: string
  propertyLocation: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true

  // Simuler l'envoi du formulaire
  await new Promise((resolve) => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSubmitted.value = true

  // Fermer le modal après 2 secondes
  setTimeout(() => {
    emit('close')
    // Réinitialiser le formulaire
    formData.value = {
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    }
    isSubmitted.value = false
  }, 2000)
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Demander une visite</h2>
          <p class="text-sm text-gray-600 mt-1">{{ propertyTitle }}</p>
          <p class="text-sm text-gray-500">{{ propertyLocation }}</p>
        </div>
        <button
          @click="closeModal"
          class="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Success Message -->
        <div
          v-if="isSubmitted"
          class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p class="font-semibold text-green-900">Demande envoyée avec succès !</p>
            <p class="text-sm text-green-700">Nous vous contacterons bientôt pour confirmer votre visite.</p>
          </div>
        </div>

        <!-- Form -->
        <form v-else @submit="handleSubmit" class="space-y-5">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
              Nom complet <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Votre nom"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="votre@email.com"
            />
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
              Téléphone <span class="text-red-500">*</span>
            </label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <!-- Date and Time -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="date" class="block text-sm font-semibold text-gray-700 mb-2">
                Date préférée <span class="text-red-500">*</span>
              </label>
              <input
                id="date"
                v-model="formData.preferredDate"
                type="date"
                required
                :min="new Date().toISOString().split('T')[0]"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label for="time" class="block text-sm font-semibold text-gray-700 mb-2">
                Heure préférée <span class="text-red-500">*</span>
              </label>
              <input
                id="time"
                v-model="formData.preferredTime"
                type="time"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
              Message (optionnel)
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              rows="4"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              placeholder="Informations supplémentaires ou questions..."
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="!isSubmitting">Envoyer la demande</span>
              <span v-else class="flex items-center gap-2">
                <svg
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Envoi en cours...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>



