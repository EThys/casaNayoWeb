<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { countryCodes, type CountryCode } from '@/utils/countryCodes'
import { generateOTP, verifyOTP, resetPassword } from '@/services/api'

const router = useRouter()
const step = ref(1) // 1: Generate OTP, 2: Verify OTP, 3: Reset Password

const identifier = ref('')
const identifierType = ref<'email' | 'phone'>('email')
const phoneNumber = ref('')
const countryCode = ref('+243')
const selectedCountry = ref<CountryCode>(countryCodes[0])
const showCountryCodeDropdown = ref(false)
const otpCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const userId = ref<number | null>(null)

// Validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\s/g, '')
  return /^\d+$/.test(cleanPhone) && cleanPhone.length >= 6
}

const isValidOTP = computed(() => {
  return otpCode.value.length === 6 && /^\d+$/.test(otpCode.value)
})

const passwordStrength = computed(() => {
  const password = newPassword.value
  if (!password) return { level: 0, text: '', color: '' }

  let strength = 0
  if (password.length >= 6) strength++
  if (password.length >= 8) strength++
  if (password.match(/[a-z]/)) strength++
  if (password.match(/[A-Z]/)) strength++
  if (password.match(/[0-9]/)) strength++
  if (password.match(/[^a-zA-Z0-9]/)) strength++

  if (strength <= 2) return { level: strength, text: 'Faible', color: 'bg-red-500' }
  if (strength <= 4) return { level: strength, text: 'Moyen', color: 'bg-yellow-500' }
  return { level: strength, text: 'Fort', color: 'bg-green-500' }
})

const canProceedStep1 = computed(() => {
  if (identifierType.value === 'email') {
    return isValidEmail(identifier.value)
  } else {
    return isValidPhone(phoneNumber.value)
  }
})

const canProceedStep2 = computed(() => {
  return isValidOTP.value
})

const canProceedStep3 = computed(() => {
  return (
    newPassword.value.length >= 6 &&
    confirmPassword.value.length >= 6 &&
    newPassword.value === confirmPassword.value
  )
})

// Update country when country code changes
const updateCountry = () => {
  const country = countryCodes.find((c) => c.dialCode === countryCode.value)
  if (country) {
    selectedCountry.value = country
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.country-code-selector')) {
    showCountryCodeDropdown.value = false
  }
}

// Switch between email and phone
const switchIdentifiantType = (type: 'email' | 'phone') => {
  identifierType.value = type
  identifier.value = ''
  phoneNumber.value = ''
  errorMessage.value = ''
}

// Select country code
const selectCountryCode = (country: CountryCode) => {
  countryCode.value = country.dialCode
  selectedCountry.value = country
  showCountryCodeDropdown.value = false
}

// Initialize country on mount
onMounted(() => {
  updateCountry()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Step 1: Generate OTP
const handleGenerateOTP = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!canProceedStep1.value) {
    errorMessage.value = 'Veuillez remplir correctement le champ identifiant'
    return
  }

  isLoading.value = true

  try {
    let finalIdentifier = identifier.value
    if (identifierType.value === 'phone') {
      finalIdentifier = `${countryCode.value}${phoneNumber.value.replace(/\s/g, '')}`
    }

    await generateOTP(finalIdentifier)
    successMessage.value = 'Code OTP envoyé avec succès'
    step.value = 2
  } catch (error: any) {
    errorMessage.value = error.message || "Erreur lors de l'envoi du code OTP. Veuillez réessayer."
  } finally {
    isLoading.value = false
  }
}

// Step 2: Verify OTP
const handleVerifyOTP = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!canProceedStep2.value) {
    errorMessage.value = 'Veuillez entrer un code OTP valide (6 chiffres)'
    return
  }

  isLoading.value = true

  try {
    let finalIdentifier = identifier.value
    if (identifierType.value === 'phone') {
      finalIdentifier = `${countryCode.value}${phoneNumber.value.replace(/\s/g, '')}`
    }

    const response = await verifyOTP(finalIdentifier, otpCode.value)
    userId.value = response.userId
    successMessage.value = 'Code OTP vérifié avec succès'
    step.value = 3
  } catch (error: any) {
    errorMessage.value = error.message || 'Code OTP invalide. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}

// Step 3: Reset Password
const handleResetPassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!canProceedStep3.value) {
    errorMessage.value = 'Veuillez remplir correctement tous les champs'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas'
    return
  }

  if (!userId.value) {
    errorMessage.value = 'Erreur: ID utilisateur manquant'
    return
  }

  isLoading.value = true

  try {
    await resetPassword(newPassword.value, userId.value)
    successMessage.value = 'Mot de passe réinitialisé avec succès'

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error: any) {
    errorMessage.value =
      error.message || 'Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}

const prevStep = () => {
  if (step.value > 1) {
    step.value--
    errorMessage.value = ''
    successMessage.value = ''
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50"
  >
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
        style="animation-delay: 1s"
      ></div>
    </div>

    <div class="w-full max-w-md space-y-8 animate-scale-in relative z-10">
      <!-- Logo -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-blue-600">
          CasaNayo
        </h2>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8 relative overflow-hidden">
        <!-- Decorative Corner -->
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full"
        ></div>

        <div class="relative">
          <h2
            class="text-3xl font-bold text-gray-900 mb-2"
          >
            Mot de passe oublié
          </h2>
          <p class="text-gray-600">Réinitialisez votre mot de passe en 3 étapes</p>
        </div>

        <!-- Progress Steps -->
        <div class="flex items-center justify-between relative">
          <div class="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div
            class="absolute top-5 left-0 h-1 bg-blue-600 -z-10 transition-all duration-500"
            :style="{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }"
          ></div>

          <div v-for="s in 3" :key="s" class="flex flex-col items-center">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
              :class="
                step >= s
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white border-2 border-gray-300 text-gray-400'
              "
            >
              <svg v-if="step > s" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span v-else>{{ s }}</span>
            </div>
            <span
              class="text-xs mt-2 font-semibold"
              :class="step >= s ? 'text-blue-600' : 'text-gray-400'"
            >
              {{ s === 1 ? 'Identifiant' : s === 2 ? 'Vérification' : 'Nouveau mot de passe' }}
            </span>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-fade-in"
        >
          <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-red-800 text-sm">{{ errorMessage }}</span>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3 animate-fade-in"
        >
          <svg
            class="w-5 h-5 text-green-600 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-green-800 text-sm">{{ successMessage }}</span>
        </div>

        <!-- Step 1: Generate OTP -->
        <form v-if="step === 1" @submit.prevent="handleGenerateOTP" class="space-y-6">
          <!-- Identifiant Type Toggle -->
          <div class="flex gap-2 p-1 bg-gray-100 rounded-xl">
            <!-- <button
              type="button"
              @click="switchIdentifiantType('email')"
              :class="
                identifierType === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              "
              class="flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all"
            >
              Email
            </button> -->
            <button
              type="button"
              @click="switchIdentifiantType('phone')"
              :class="
                identifierType === 'phone' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              "
              class="flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all"
            >
              Téléphone
            </button>
          </div>

          <!-- Email Input -->
          <div v-if="identifierType === 'email'" class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                v-model="identifier"
                type="email"
                required
                placeholder="votre@email.com"
                :class="identifier && !isValidEmail(identifier) ? 'border-red-300' : ''"
                class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
              />
            </div>
            <p v-if="identifier && !isValidEmail(identifier)" class="text-xs text-red-600">
              Veuillez entrer un email valide
            </p>
          </div>

          <!-- Phone Input -->
          <div v-if="identifierType === 'phone'" class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Téléphone <span class="text-red-500">*</span>
            </label>
            <div class="flex gap-2">
              <!-- Country Code Selector -->
              <div class="relative country-code-selector">
                <button
                  type="button"
                  @click.stop="showCountryCodeDropdown = !showCountryCodeDropdown"
                  class="flex items-center space-x-2 px-4 py-3.5 border-2 border-gray-200 rounded-xl hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                >
                  <span class="text-xl">{{ selectedCountry.flag }}</span>
                  <span class="text-sm font-medium text-gray-700">{{
                    selectedCountry.dialCode
                  }}</span>
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <!-- Dropdown -->
                <div
                  v-if="showCountryCodeDropdown"
                  class="absolute z-50 mt-2 w-80 max-h-64 overflow-y-auto bg-white border-2 border-gray-200 rounded-xl shadow-lg"
                  @click.stop
                >
                  <div class="p-2">
                    <div class="space-y-1">
                      <button
                        v-for="country in countryCodes"
                        :key="country.code"
                        type="button"
                        @click="selectCountryCode(country)"
                        class="w-full flex items-center space-x-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                        :class="countryCode === country.dialCode ? 'bg-blue-100' : ''"
                      >
                        <span class="text-xl">{{ country.flag }}</span>
                        <span class="flex-1 text-sm font-medium text-gray-700">{{
                          country.name
                        }}</span>
                        <span class="text-sm text-gray-500">{{ country.dialCode }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Phone Number Input -->
              <div class="flex-1 relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  v-model="phoneNumber"
                  type="tel"
                  required
                  placeholder="XXX XXX XXX"
                  :class="phoneNumber && !isValidPhone(phoneNumber) ? 'border-red-300' : ''"
                  class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                />
              </div>
            </div>
            <p v-if="phoneNumber && !isValidPhone(phoneNumber)" class="text-xs text-red-600">
              Veuillez entrer un numéro de téléphone valide (minimum 6 chiffres)
            </p>
          </div>

          <button
            type="submit"
            :disabled="isLoading || !canProceedStep1"
            class="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <svg
              v-if="isLoading"
              class="animate-spin h-5 w-5"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ isLoading ? 'Envoi...' : 'Envoyer le code OTP' }}</span>
          </button>
        </form>

        <!-- Step 2: Verify OTP -->
        <form v-if="step === 2" @submit.prevent="handleVerifyOTP" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Code OTP <span class="text-red-500">*</span>
            </label>
            <input
              v-model="otpCode"
              type="text"
              required
              maxlength="6"
              placeholder="000000"
              class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 text-center text-2xl tracking-widest font-mono"
              :class="otpCode && !isValidOTP ? 'border-red-300' : ''"
            />
            <p class="text-xs text-gray-500 text-center">Entrez le code à 6 chiffres reçu</p>
            <p v-if="otpCode && !isValidOTP" class="text-xs text-red-600 text-center">
              Le code doit contenir 6 chiffres
            </p>
          </div>

          <div class="flex space-x-4">
            <button
              type="button"
              @click="prevStep"
              class="flex-1 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-bold rounded-xl transition-all"
            >
              Retour
            </button>
            <button
              type="submit"
              :disabled="isLoading || !canProceedStep2"
              class="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg
                v-if="isLoading"
                class="animate-spin h-5 w-5"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>{{ isLoading ? 'Vérification...' : 'Vérifier' }}</span>
            </button>
          </div>
        </form>

        <!-- Step 3: Reset Password -->
        <form v-if="step === 3" @submit.prevent="handleResetPassword" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Nouveau mot de passe <span class="text-red-500">*</span>
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                v-model="newPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                :class="newPassword && newPassword.length < 6 ? 'border-red-300' : ''"
                class="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
              >
                <svg
                  v-if="!showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>

            <!-- Password Strength -->
            <div v-if="newPassword" class="space-y-2">
              <div class="flex items-center space-x-2">
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full transition-all duration-300"
                    :class="passwordStrength.color"
                    :style="{ width: `${(passwordStrength.level / 6) * 100}%` }"
                  ></div>
                </div>
                <span
                  class="text-xs font-semibold"
                  :class="passwordStrength.color.replace('bg-', 'text-')"
                >
                  {{ passwordStrength.text }}
                </span>
              </div>
              <p class="text-xs text-gray-500">Minimum 6 caractères recommandés</p>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Confirmer le mot de passe <span class="text-red-500">*</span>
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                :class="
                  confirmPassword && (confirmPassword.length < 6 || confirmPassword !== newPassword)
                    ? 'border-red-300'
                    : ''
                "
                class="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
              >
                <svg
                  v-if="!showConfirmPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
            <p
              v-if="confirmPassword && confirmPassword !== newPassword"
              class="text-xs text-red-600"
            >
              Les mots de passe ne correspondent pas
            </p>
          </div>

          <div class="flex space-x-4">
            <button
              type="button"
              @click="prevStep"
              class="flex-1 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-bold rounded-xl transition-all"
            >
              Retour
            </button>
            <button
              type="submit"
              :disabled="isLoading || !canProceedStep3"
              class="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg
                v-if="isLoading"
                class="animate-spin h-5 w-5"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>{{ isLoading ? 'Réinitialisation...' : 'Réinitialiser' }}</span>
            </button>
          </div>
        </form>

        <!-- Back to Login -->
        <div class="text-center">
          <router-link
            to="/login"
            class="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all"
          >
            ← Retour à la connexion
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.95);
  }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.6s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>
