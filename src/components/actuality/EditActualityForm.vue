<template>
  <div class="max-w-4xl mx-auto p-6">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">
          Titre <span class="text-red-500">*</span>
        </label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          required
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder="Titre de l'actualité"
        />
      </div>

      <!-- Summary -->
      <div>
        <label for="summary" class="block text-sm font-semibold text-gray-700 mb-2">
          Résumé <span class="text-red-500">*</span>
        </label>
        <textarea
          id="summary"
          v-model="formData.summary"
          rows="3"
          required
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          placeholder="Résumé de l'actualité"
        ></textarea>
      </div>

      <!-- Content -->
      <div>
        <label for="content" class="block text-sm font-semibold text-gray-700 mb-2">
          Contenu <span class="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          v-model="formData.content"
          rows="10"
          required
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          placeholder="Contenu de l'actualité"
        ></textarea>
      </div>

      <!-- Category -->
      <div>
        <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">
          Catégorie <span class="text-red-500">*</span>
        </label>
        <select
          id="category"
          v-model="formData.category"
          required
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="Recherche">Recherche</option>
          <option value="Événements">Événements</option>
          <option value="Pédagogie">Pédagogie</option>
          <option value="Vie scolaire">Vie scolaire</option>
          <option value="Projets">Projets</option>
          <option value="Sport">Sport</option>
        </select>
      </div>

      <!-- Author -->
      <div>
        <label for="author" class="block text-sm font-semibold text-gray-700 mb-2">
          Auteur <span class="text-red-500">*</span>
        </label>
        <input
          id="author"
          v-model="formData.author"
          type="text"
          required
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder="Nom de l'auteur"
        />
      </div>

      <!-- Learning Points -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Points d'apprentissage
        </label>
        <div v-for="(point, index) in formData.learning_points" :key="index" class="flex gap-2 mb-2">
          <input
            v-model="formData.learning_points[index]"
            type="text"
            class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            :placeholder="`Point ${index + 1}`"
          />
          <button
            type="button"
            @click="removeLearningPoint(index)"
            class="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        </div>
        <button
          type="button"
          @click="addLearningPoint"
          class="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          + Ajouter un point
        </button>
      </div>

      <!-- Key Points -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Points clés
        </label>
        <div v-for="(point, index) in formData.key_points" :key="index" class="flex gap-2 mb-2">
          <input
            v-model="formData.key_points[index]"
            type="text"
            class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            :placeholder="`Point clé ${index + 1}`"
          />
          <button
            type="button"
            @click="removeKeyPoint(index)"
            class="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        </div>
        <button
          type="button"
          @click="addKeyPoint"
          class="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          + Ajouter un point clé
        </button>
      </div>

      <!-- Tags -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Tags
        </label>
        <div class="flex flex-wrap gap-2 mb-2">
          <span
            v-for="(tag, index) in formData.tags"
            :key="index"
            class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            {{ tag }}
            <button
              type="button"
              @click="removeTag(index)"
              class="text-blue-700 hover:text-blue-900"
            >
              ×
            </button>
          </span>
        </div>
        <div class="flex gap-2">
          <input
            v-model="newTag"
            type="text"
            @keyup.enter.prevent="addTag"
            class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Ajouter un tag (Entrée pour ajouter)"
          />
          <button
            type="button"
            @click="addTag"
            class="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>

      <!-- Status -->
      <div>
        <label for="status" class="block text-sm font-semibold text-gray-700 mb-2">
          Statut
        </label>
        <select
          id="status"
          v-model="formData.status"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          <option value="draft">Brouillon</option>
          <option value="published">Publié</option>
        </select>
      </div>

      <!-- Featured -->
      <div class="flex items-center gap-2">
        <input
          id="featured"
          v-model="formData.featured"
          type="checkbox"
          class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label for="featured" class="text-sm font-semibold text-gray-700">
          Mettre en vedette
        </label>
      </div>

      <!-- Submit Button -->
      <div class="flex gap-4 pt-4">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting">Enregistrement...</span>
          <span v-else>Enregistrer les modifications</span>
        </button>
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
        >
          Annuler
        </button>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="p-4 bg-green-100 text-green-700 rounded-xl">
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="p-4 bg-red-100 text-red-700 rounded-xl">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useActualities } from '@/composables/useActualities'
import type { ApiActuality, UpdateActualityRequest } from '@/services/api'

interface Props {
  actualityId?: number
  initialData?: ApiActuality
}

const props = defineProps<Props>()
const emit = defineEmits<{
  saved: [actuality: ApiActuality]
  cancel: []
}>()

const { updateActualityById, loadActuality, currentActuality, isLoading, error } = useActualities()

const formData = ref<UpdateActualityRequest>({
  title: '',
  summary: '',
  content: '',
  learning_points: [],
  key_points: [],
  tags: [],
  category: '',
  author: '',
  status: 'draft',
  featured: false,
})

const newTag = ref('')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Initialize form with actuality data
const initializeForm = (actuality: ApiActuality) => {
  formData.value = {
    title: actuality.title || '',
    summary: actuality.summary || '',
    content: actuality.content || '',
    learning_points: actuality.learning_points ? [...actuality.learning_points] : [],
    key_points: actuality.key_points ? [...actuality.key_points] : [],
    tags: actuality.tags ? [...actuality.tags] : [],
    category: actuality.category || '',
    author: actuality.author || '',
    status: actuality.status || 'draft',
    featured: actuality.featured || false,
  }
}

// Watch for current actuality changes
watch(currentActuality, (newActuality) => {
  if (newActuality) {
    initializeForm(newActuality)
  }
})

// Load actuality if ID is provided
onMounted(async () => {
  if (props.actualityId) {
    try {
      await loadActuality(props.actualityId)
      if (currentActuality.value) {
        initializeForm(currentActuality.value)
      }
    } catch (err) {
      errorMessage.value = 'Erreur lors du chargement de l\'actualité'
    }
  } else if (props.initialData) {
    initializeForm(props.initialData)
  }
})

// Watch for error from composable
watch(error, (newError) => {
  if (newError) {
    errorMessage.value = newError
  }
})

// Handle form submission
const handleSubmit = async () => {
  if (!props.actualityId) {
    errorMessage.value = 'ID de l\'actualité manquant'
    return
  }

  try {
    isSubmitting.value = true
    successMessage.value = ''
    errorMessage.value = ''

    console.log('📝 Données du formulaire avant envoi:', formData.value)

    // Prepare update data - only send fields that have values
    const updateData: UpdateActualityRequest = {
      title: formData.value.title?.trim() || undefined,
      summary: formData.value.summary?.trim() || undefined,
      content: formData.value.content?.trim() || undefined,
      learning_points: formData.value.learning_points?.filter((p) => p && p.trim() !== '') || undefined,
      key_points: formData.value.key_points?.filter((p) => p && p.trim() !== '') || undefined,
      tags: formData.value.tags?.filter((t) => t && t.trim() !== '') || undefined,
      category: formData.value.category?.trim() || undefined,
      author: formData.value.author?.trim() || undefined,
      status: formData.value.status || undefined,
      featured: formData.value.featured !== undefined ? formData.value.featured : undefined,
    }

    // Remove undefined values to avoid sending empty fields
    const cleanedData: UpdateActualityRequest = {}
    Object.keys(updateData).forEach((key) => {
      const value = updateData[key as keyof UpdateActualityRequest]
      if (value !== undefined && value !== null && value !== '') {
        cleanedData[key as keyof UpdateActualityRequest] = value
      }
    })

    console.log('📤 Données nettoyées à envoyer:', cleanedData)
    console.log('🆔 ID de l\'actualité:', props.actualityId)

    // Update actuality
    const updatedActuality = await updateActualityById(props.actualityId, cleanedData)

    console.log('✅ Réponse de l\'API:', updatedActuality)

    if (updatedActuality) {
      // IMPORTANT: Update form data with the response to ensure reactivity
      console.log('🔄 Mise à jour du formulaire avec les nouvelles données')
      initializeForm(updatedActuality)
      
      // Force Vue to detect the change by creating a new reference
      formData.value = { ...formData.value }
      
      successMessage.value = 'Actualité mise à jour avec succès !'
      emit('saved', updatedActuality)
      
      // Reload the actuality to ensure we have the latest data
      try {
        await loadActuality(props.actualityId)
        console.log('🔄 Actualité rechargée après modification')
      } catch (reloadError) {
        console.warn('⚠️ Erreur lors du rechargement:', reloadError)
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    } else {
      throw new Error('Aucune donnée retournée par l\'API')
    }
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour:', err)
    errorMessage.value = err instanceof Error ? err.message : 'Erreur lors de la mise à jour'
  } finally {
    isSubmitting.value = false
  }
}

// Tag management
const addTag = () => {
  if (newTag.value.trim() && !formData.value.tags?.includes(newTag.value.trim())) {
    if (!formData.value.tags) {
      formData.value.tags = []
    }
    formData.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  if (formData.value.tags) {
    formData.value.tags.splice(index, 1)
  }
}

// Learning points management
const addLearningPoint = () => {
  if (!formData.value.learning_points) {
    formData.value.learning_points = []
  }
  formData.value.learning_points.push('')
}

const removeLearningPoint = (index: number) => {
  if (formData.value.learning_points) {
    formData.value.learning_points.splice(index, 1)
  }
}

// Key points management
const addKeyPoint = () => {
  if (!formData.value.key_points) {
    formData.value.key_points = []
  }
  formData.value.key_points.push('')
}

const removeKeyPoint = (index: number) => {
  if (formData.value.key_points) {
    formData.value.key_points.splice(index, 1)
  }
}
</script>

