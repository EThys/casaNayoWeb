import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface TypeAccount {
  typeAccountId: number
  name: string
}

export interface User {
  userId: number
  typeAccount: TypeAccount
  email: string
  username: string
  phone: string
  city: string
  country: string
  certified: boolean
  premium: boolean
}

export interface Professional {
  [key: string]: any
  firstName: string
  lastName: string
  fullName: string
  address: string
  images?: string
  cardFront?: string
  cardBack?: string
  typeCard?: any
  numberCard?: string
  user?: User
}

export interface AuthResponse {
  message?: string
  member: {
    user: User
    accounts: any[]
    profile: Professional
  }
  token: string
  refresh_token: string
}

const STORAGE_KEYS = {
  TOKEN: 'casanayo_token',
  REFRESH_TOKEN: 'casanayo_refresh_token',
  USER: 'casanayo_user',
  ACCOUNTS: 'casanayo_accounts',
  PROFESSIONAL: 'casanayo_professional',
  AUTH_DATA: 'casanayo_auth_data',
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const user = ref<User | null>(null)
  const accounts = ref<any[]>([])
  const professional = ref<Professional | null>(null)
  const authData = ref<AuthResponse | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Load from localStorage on initialization
  const loadFromStorage = () => {
    try {
      const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN)
      const storedRefreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
      const storedAccounts = localStorage.getItem(STORAGE_KEYS.ACCOUNTS)
      const storedProfessional = localStorage.getItem(STORAGE_KEYS.PROFESSIONAL)
      const storedAuthData = localStorage.getItem(STORAGE_KEYS.AUTH_DATA)

      if (storedToken) token.value = storedToken
      if (storedRefreshToken) refreshToken.value = storedRefreshToken
      if (storedUser) user.value = JSON.parse(storedUser)
      if (storedAccounts) accounts.value = JSON.parse(storedAccounts)
      if (storedProfessional) professional.value = JSON.parse(storedProfessional)
      if (storedAuthData) authData.value = JSON.parse(storedAuthData)
    } catch (error) {
      // Silent error handling
      clearAuth()
    }
  }

  // Save to localStorage
  const saveToStorage = (authResponse: AuthResponse) => {
    try {
      token.value = authResponse.token
      refreshToken.value = authResponse.refresh_token
      user.value = authResponse.member.user
      accounts.value = authResponse.member.accounts
      professional.value = authResponse.member.profile
      authData.value = authResponse

      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, authResponse.token)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authResponse.refresh_token)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authResponse.member.user))
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(authResponse.member.accounts))
      if (professional.value) {
        localStorage.setItem(STORAGE_KEYS.PROFESSIONAL, JSON.stringify(professional.value))
      }
      localStorage.setItem(STORAGE_KEYS.AUTH_DATA, JSON.stringify(authResponse))
    } catch (error) {
      // Silent error handling
    }
  }

  // Clear auth data
  const clearAuth = () => {
    token.value = null
    refreshToken.value = null
    user.value = null
    accounts.value = []
    professional.value = null
    authData.value = null

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.ACCOUNTS)
    localStorage.removeItem(STORAGE_KEYS.PROFESSIONAL)
    localStorage.removeItem(STORAGE_KEYS.AUTH_DATA)
  }

  // Set auth data (for registration/login)
  const setAuth = (authResponse: AuthResponse) => {
    saveToStorage(authResponse)
  }

  // Initialize store
  loadFromStorage()

  return {
    token,
    refreshToken,
    user,
    accounts,
    professional,
    authData,
    isAuthenticated,
    setAuth,
    clearAuth,
    loadFromStorage,
  }
})


