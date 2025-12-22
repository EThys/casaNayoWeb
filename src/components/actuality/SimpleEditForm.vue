<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Modifier l'actualité #{{ actualityId }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Title -->
      <div>
        <label class="block text-sm font-semibold mb-2">Titre *</label>
        <input
          v-model="formData.title"
          type="text"
          required
          class="w-full px-4 py-2 border rounded"
          placeholder="Titre"
        />
      </div>

      <!-- Summary -->
      <div>
        <label class="block text-sm font-semibold mb-2">Résumé *</label>
        <textarea
          v-model="formData.summary"
          rows="3"
          required
          class="w-full px-4 py-2 border rounded"
          placeholder="Résumé"
        ></textarea>
      </div>

      <!-- Content -->
      <div>
        <label class="block text-sm font-semibold mb-2">Contenu *</label>
        <textarea
          v-model="formData.content"
          rows="5"
          required
          class="w-full px-4 py-2 border rounded"
          placeholder="Contenu"
        ></textarea>
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-semibold mb-2">Catégorie *</label>
        <input
          v-model="formData.category"
          type="text"
          required
          class="w-full px-4 py-2 border rounded"
          placeholder="Catégorie"
        />
      </div>

      <!-- Author -->
      <div>
        <label class="block text-sm font-semibold mb-2">Auteur *</label>
        <input
          v-model="formData.author"
          type="text"
          required
          class="w-full px-4 py-2 border rounded"
          placeholder="Auteur"
        />
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-semibold mb-2">Statut</label>
        <select v-model="formData.status" class="w-full px-4 py-2 border rounded">
          <option value="draft">Brouillon</option>
          <option value="published">Publié</option>
        </select>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        <span v-if="isSubmitting">Enregistrement...</span>
        <span v-else>Enregistrer</span>
      </button>
    </form>

    <!-- Messages -->
    <div v-if="successMessage" class="mt-4 p-4 bg-green-100 text-green-700 rounded">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
      {{ errorMessage }}
    </div>

    <!-- Debug Info -->
    <div v-if="debugInfo" class="mt-4 p-4 bg-gray-100 rounded text-xs">
      <strong>Debug:</strong>
      <pre>{{ JSON.stringify(debugInfo, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { updateActuality, fetchActualityById, type UpdateActualityRequest, type ApiActuality } from '@/services/api'

interface Props {
  actualityId: number
}

const props = defineProps<Props>()

const formData = ref<UpdateActualityRequest>({
  title: '',
  summary: '',
  content: '',
  category: '',
  author: '',
  status: 'draft',
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const debugInfo = ref<any>(null)

// Load initial data
onMounted(async () => {
  try {
    const response = await fetchActualityById(props.actualityId)
    if (response.success && response.data) {
      formData.value = {
        title: response.data.title || '',
        summary: response.data.summary || '',
        content: response.data.content || '',
        category: response.data.category || '',
        author: response.data.author || '',
        status: response.data.status || 'draft',
      }
      debugInfo.value = { loaded: response.data }
    }
  } catch (err) {
    errorMessage.value = 'Erreur lors du chargement'
    console.error(err)
  }
})

// Handle submit
const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    successMessage.value = ''
    errorMessage.value = ''
    debugInfo.value = null

    console.log('📝 Formulaire simple - Données:', formData.value)

    // Prepare data
    const dataToSend: UpdateActualityRequest = {
      title: formData.value.title?.trim(),
      summary: formData.value.summary?.trim(),
      content: formData.value.content?.trim(),
      category: formData.value.category?.trim(),
      author: formData.value.author?.trim(),
      status: formData.value.status,
    }

    console.log('📤 Formulaire simple - Données à envoyer:', dataToSend)

    const response = await updateActuality(props.actualityId, dataToSend)

    console.log('📥 Formulaire simple - Réponse:', response)

    if (response.success && response.data) {
      // Update form with response
      formData.value = {
        title: response.data.title || '',
        summary: response.data.summary || '',
        content: response.data.content || '',
        category: response.data.category || '',
        author: response.data.author || '',
        status: response.data.status || 'draft',
      }

      successMessage.value = 'Modification réussie !'
      debugInfo.value = { 
        sent: dataToSend,
        received: response.data,
        response: response
      }

      // Reload to verify
      setTimeout(async () => {
        try {
          const reloaded = await fetchActualityById(props.actualityId)
          debugInfo.value = {
            ...debugInfo.value,
            reloaded: reloaded.data
          }
          console.log('🔄 Formulaire simple - Rechargé:', reloaded.data)
        } catch (err) {
          console.error('Erreur rechargement:', err)
        }
      }, 1000)
    } else {
      throw new Error('Réponse invalide')
    }
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Erreur'
    console.error('❌ Formulaire simple - Erreur:', err)
    debugInfo.value = { error: err }
  } finally {
    isSubmitting.value = false
  }
}
</script>


