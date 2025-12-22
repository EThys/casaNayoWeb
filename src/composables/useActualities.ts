import { ref, computed } from 'vue'
import { fetchActualities, fetchActualityById, updateActuality, createActuality, type ApiActuality, type UpdateActualityRequest } from '@/services/api'

export const useActualities = () => {
  const actualities = ref<ApiActuality[]>([])
  const currentActuality = ref<ApiActuality | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Load all actualities
  const loadActualities = async (params?: {
    page?: number
    size?: number
    category?: string
    status?: string
  }) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await fetchActualities(params)
      if (response.success && response.data) {
        actualities.value = Array.isArray(response.data) ? response.data : [response.data]
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors du chargement des actualités'
      console.error('Error loading actualities:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Load single actuality
  const loadActuality = async (id: number) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await fetchActualityById(id)
      if (response.success && response.data) {
        currentActuality.value = response.data
        // Also update in the list if it exists
        const index = actualities.value.findIndex((a) => a.id === id)
        if (index !== -1) {
          actualities.value[index] = response.data
        }
        return response.data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors du chargement de l\'actualité'
      console.error('Error loading actuality:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update actuality and refresh data
  const updateActualityById = async (id: number, data: UpdateActualityRequest) => {
    try {
      isLoading.value = true
      error.value = null
      
      console.log('🔄 useActualities: Mise à jour de l\'actualité', id, 'avec les données:', data)
      
      const response = await updateActuality(id, data)
      
      console.log('📥 useActualities: Réponse reçue:', response)
      
      if (response.success && response.data) {
        const updatedData = response.data
        
        console.log('✅ useActualities: Données mises à jour:', updatedData)
        
        // IMPORTANT: Force reactivity by creating a new object reference
        const updatedActuality = { ...updatedData }
        
        // Update current actuality if it's the one being edited
        if (currentActuality.value?.id === id) {
          console.log('🔄 useActualities: Mise à jour de currentActuality')
          currentActuality.value = updatedActuality
        }
        
        // Update in the list - use splice to trigger reactivity
        const index = actualities.value.findIndex((a) => a.id === id)
        if (index !== -1) {
          console.log(`🔄 useActualities: Mise à jour de l'actualité à l'index ${index}`)
          // Replace the item at index to trigger Vue reactivity
          actualities.value.splice(index, 1, updatedActuality)
          console.log('✅ useActualities: Liste mise à jour, nouvelle longueur:', actualities.value.length)
        } else {
          console.log('➕ useActualities: Ajout de l\'actualité à la liste')
          // If not in list, add it
          actualities.value.push(updatedActuality)
        }
        
        // Force Vue to detect the change
        actualities.value = [...actualities.value]
        
        return updatedActuality
      } else {
        console.error('❌ useActualities: Réponse invalide:', response)
        throw new Error('Réponse invalide de l\'API')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de l\'actualité'
      console.error('❌ useActualities: Erreur:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Create new actuality
  const createNewActuality = async (data: UpdateActualityRequest) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await createActuality(data)
      
      if (response.success && response.data) {
        // Add to list
        actualities.value.unshift(response.data)
        return response.data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la création de l\'actualité'
      console.error('Error creating actuality:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties
  const publishedActualities = computed(() => {
    return actualities.value.filter((a) => a.status === 'published')
  })

  const featuredActualities = computed(() => {
    return actualities.value.filter((a) => a.featured)
  })

  const actualitiesByCategory = computed(() => {
    return (category: string) => {
      return actualities.value.filter((a) => a.category === category)
    }
  })

  return {
    actualities,
    currentActuality,
    isLoading,
    error,
    loadActualities,
    loadActuality,
    updateActualityById,
    createNewActuality,
    publishedActualities,
    featuredActualities,
    actualitiesByCategory,
  }
}

