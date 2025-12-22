/**
 * Helper function to update actuality and force reload
 * This ensures the UI reflects the changes immediately
 */

import { updateActuality, fetchActualityById, type UpdateActualityRequest, type ApiActualityResponse } from '@/services/api'

export interface ActualityUpdateResult {
  success: boolean
  data: any
  message?: string
  error?: string
}

/**
 * Update actuality and reload to ensure UI is updated
 */
export const updateActualityWithReload = async (
  actualityId: number,
  data: UpdateActualityRequest
): Promise<ActualityUpdateResult> => {
  try {
    console.log('🔄 updateActualityWithReload: Début de la mise à jour', { actualityId, data })

    // Step 1: Update the actuality
    const updateResponse = await updateActuality(actualityId, data)
    console.log('✅ updateActualityWithReload: Mise à jour réussie', updateResponse)

    if (!updateResponse.success || !updateResponse.data) {
      throw new Error('Réponse invalide de l\'API')
    }

    // Step 2: Immediately reload to get the latest data
    console.log('🔄 updateActualityWithReload: Rechargement des données...')
    const reloadResponse = await fetchActualityById(actualityId)
    console.log('✅ updateActualityWithReload: Données rechargées', reloadResponse)

    if (!reloadResponse.success || !reloadResponse.data) {
      console.warn('⚠️ updateActualityWithReload: Impossible de recharger, utilisation des données de mise à jour')
      return {
        success: true,
        data: updateResponse.data,
        message: updateResponse.message || 'Actualité mise à jour avec succès'
      }
    }

    // Step 3: Return the reloaded data (most up-to-date)
    return {
      success: true,
      data: reloadResponse.data,
      message: updateResponse.message || 'Actualité mise à jour avec succès'
    }
  } catch (error) {
    console.error('❌ updateActualityWithReload: Erreur', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Erreur inconnue lors de la mise à jour'
    }
  }
}

/**
 * Transform camelCase to snake_case for API
 */
export const transformToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformToSnakeCase)
  } else if (obj !== null && typeof obj === 'object') {
    const transformed: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
        transformed[snakeKey] = transformToSnakeCase(obj[key])
      }
    }
    return transformed
  }
  return obj
}

/**
 * Transform snake_case to camelCase from API
 */
export const transformToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformToCamelCase)
  } else if (obj !== null && typeof obj === 'object') {
    const transformed: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
        transformed[camelKey] = transformToCamelCase(obj[key])
      }
    }
    return transformed
  }
  return obj
}


