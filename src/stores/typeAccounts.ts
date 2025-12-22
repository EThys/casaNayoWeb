import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import silentFetch from '@/utils/fetchWrapper'

export interface TypeAccount {
  typeAccountId: number
  name: string
}

const API_BASE_URL = 'https://server.casanayo.com'
const STORAGE_KEY = 'casanayo_type_accounts'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 heures en millisecondes

interface CachedData {
  typeAccounts: TypeAccount[]
  timestamp: number
}

export const useTypeAccountsStore = defineStore('typeAccounts', () => {
  const typeAccounts = ref<TypeAccount[]>([])
  const isLoading = ref(false)
  const lastFetchTime = ref<number | null>(null)

  // Check if cache is still valid
  const isCacheValid = computed(() => {
    if (!lastFetchTime.value) return false
    const now = Date.now()
    return now - lastFetchTime.value < CACHE_DURATION
  })

  // Load from localStorage
  const loadFromStorage = (): TypeAccount[] | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return null

      const cached: CachedData = JSON.parse(stored)
      const now = Date.now()

      // Check if cache is still valid
      if (now - cached.timestamp < CACHE_DURATION) {
        return cached.typeAccounts
      }

      // Cache expired, remove it
      localStorage.removeItem(STORAGE_KEY)
      return null
    } catch (error) {
      // Silent error handling
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
  }

  // Save to localStorage
  const saveToStorage = (accounts: TypeAccount[]) => {
    try {
      const cached: CachedData = {
        typeAccounts: accounts,
        timestamp: Date.now(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cached))
    } catch (error) {
      // Silent error handling
    }
  }

  // Fetch from API
  const fetchTypeAccounts = async (forceRefresh = false): Promise<TypeAccount[]> => {
    // If cache is valid and not forcing refresh, return cached data
    if (!forceRefresh && isCacheValid.value && typeAccounts.value.length > 0) {
      return typeAccounts.value
    }

    // Try to load from localStorage first
    if (!forceRefresh) {
      const cached = loadFromStorage()
      if (cached) {
        typeAccounts.value = cached
        lastFetchTime.value = Date.now()
        return cached
      }
    }

    // Fetch from API
    isLoading.value = true
    try {
      const response = await silentFetch(`${API_BASE_URL}/api/accounts/type`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'default',
        silent: true,
      })

      if (!response.ok) {
        throw new Error('Failed to fetch type accounts')
      }

      const data = await response.json()
      const accounts: TypeAccount[] = data.data || []

      // Update store
      typeAccounts.value = accounts
      lastFetchTime.value = Date.now()

      // Save to localStorage
      saveToStorage(accounts)

      return accounts
    } catch (error) {
      // If fetch fails and we have cached data, return it
      const cached = loadFromStorage()
      if (cached) {
        typeAccounts.value = cached
        return cached
      }
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Get type accounts (with caching)
  const getTypeAccounts = async (forceRefresh = false): Promise<TypeAccount[]> => {
    // If we have valid cached data, return it immediately
    if (!forceRefresh && isCacheValid.value && typeAccounts.value.length > 0) {
      return typeAccounts.value
    }

    // Otherwise fetch from API or localStorage
    return await fetchTypeAccounts(forceRefresh)
  }

  // Get type accounts excluding admin
  const getTypeAccountsExcludingAdmin = async (forceRefresh = false): Promise<TypeAccount[]> => {
    const accounts = await getTypeAccounts(forceRefresh)
    return accounts.filter((acc) => acc.typeAccountId !== 1)
  }

  // Clear cache
  const clearCache = () => {
    typeAccounts.value = []
    lastFetchTime.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  // Initialize store - load from localStorage if available
  const init = () => {
    const cached = loadFromStorage()
    if (cached) {
      typeAccounts.value = cached
      lastFetchTime.value = Date.now()
    }
  }

  // Initialize on store creation
  init()

  return {
    typeAccounts,
    isLoading,
    lastFetchTime,
    isCacheValid,
    getTypeAccounts,
    getTypeAccountsExcludingAdmin,
    fetchTypeAccounts,
    clearCache,
    init,
  }
})


