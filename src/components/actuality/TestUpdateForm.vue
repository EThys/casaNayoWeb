<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Test de Modification - Actualité #{{ actualityId }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block mb-2">Titre</label>
        <input v-model="formData.title" type="text" class="w-full p-2 border rounded" />
      </div>
      
      <div>
        <label class="block mb-2">Résumé</label>
        <textarea v-model="formData.summary" rows="3" class="w-full p-2 border rounded"></textarea>
      </div>
      
      <button type="submit" :disabled="loading" class="px-4 py-2 bg-blue-600 text-white rounded">
        {{ loading ? 'Modification...' : 'Modifier' }}
      </button>
    </form>

    <div v-if="result" class="mt-4 p-4 bg-gray-100 rounded">
      <h3 class="font-bold mb-2">Résultat:</h3>
      <pre class="text-xs">{{ JSON.stringify(result, null, 2) }}</pre>
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { updateActualityWithReload } from '@/utils/actualityHelper'

const props = defineProps<{
  actualityId: number
  initialData?: any
}>()

const formData = ref({
  title: props.initialData?.title || '',
  summary: props.initialData?.summary || '',
})

const loading = ref(false)
const result = ref<any>(null)
const error = ref('')

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    result.value = null

    console.log('🧪 TEST: Début de la modification')
    console.log('🧪 TEST: ID:', props.actualityId)
    console.log('🧪 TEST: Données:', formData.value)

    const updateResult = await updateActualityWithReload(props.actualityId, {
      title: formData.value.title,
      summary: formData.value.summary,
    })

    console.log('🧪 TEST: Résultat:', updateResult)

    if (updateResult.success) {
      result.value = updateResult.data
      formData.value = {
        title: updateResult.data.title || updateResult.data.title || '',
        summary: updateResult.data.summary || updateResult.data.summary || '',
      }
      alert('✅ Modification réussie ! Vérifiez la console pour les détails.')
    } else {
      error.value = updateResult.error || 'Erreur inconnue'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur'
    console.error('🧪 TEST: Erreur:', err)
  } finally {
    loading.value = false
  }
}
</script>


