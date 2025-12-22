<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { countryCodes, getCountryNameByDialCode, type CountryCode } from '@/utils/countryCodes'
import { registerUser } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useTypeAccountsStore } from '@/stores/typeAccounts'

const router = useRouter()
const authStore = useAuthStore()
const typeAccountsStore = useTypeAccountsStore()
const step = ref(1)
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  countryCode: '+243',
  country: '',
  city: '',
  address: '',
  password: '',
  confirmPassword: '',
  typeAccountId: 0,
  username: '',
  acceptTerms: false,
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const showCountryCodeDropdown = ref(false)
const selectedCountry = ref<CountryCode>(countryCodes[0])

// Computed properties for type accounts from store
// Filter types from store
const filteredTypeAccounts = computed(() =>
  typeAccountsStore.typeAccounts.filter((acc) => acc.typeAccountId !== 1),
)

const loadingAccounts = computed(() => typeAccountsStore.isLoading)

// Update country when country code changes
const updateCountry = () => {
  const country = countryCodes.find((c) => c.dialCode === formData.value.countryCode)
  if (country) {
    selectedCountry.value = country
    formData.value.country = country.name
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.country-code-selector')) {
    showCountryCodeDropdown.value = false
  }
}

// Initialize country on mount
onMounted(async () => {
  updateCountry()
  await loadTypeAccounts()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const loadTypeAccounts = async () => {
  try {
    // Use store to get type accounts (with caching)
    await typeAccountsStore.getTypeAccountsExcludingAdmin()
  } catch (error) {
    errorMessage.value = 'Erreur lors du chargement des types de comptes'
  }
}

const passwordStrength = computed(() => {
  const password = formData.value.password
  if (!password) return { level: 0, text: '', color: '' }

  let strength = 0
  // Minimum 6 caractères
  if (password.length >= 6) strength++
  // Plus de 8 caractères
  if (password.length >= 8) strength++
  // Contient des lettres minuscules
  if (password.match(/[a-z]/)) strength++
  // Contient des lettres majuscules
  if (password.match(/[A-Z]/)) strength++
  // Contient des chiffres
  if (password.match(/[0-9]/)) strength++
  // Contient des caractères spéciaux
  if (password.match(/[^a-zA-Z0-9]/)) strength++

  // Moins strict : juste informer, pas bloquer
  if (strength <= 2) return { level: strength, text: 'Faible', color: 'bg-red-500' }
  if (strength <= 4) return { level: strength, text: 'Moyen', color: 'bg-yellow-500' }
  return { level: strength, text: 'Fort', color: 'bg-green-500' }
})

const canProceedStep1 = computed(() => {
  return (
    formData.value.firstName &&
    formData.value.lastName &&
    formData.value.email &&
    formData.value.phoneNumber &&
    formData.value.city &&
    formData.value.address
  )
})

const canProceedStep2 = computed(() => {
  return (
    formData.value.password &&
    formData.value.confirmPassword &&
    formData.value.password === formData.value.confirmPassword &&
    formData.value.password.length >= 6
  )
})

const canProceedStep3 = computed(() => {
  return formData.value.typeAccountId > 0 && formData.value.username
})

const nextStep = () => {
  if (step.value === 1 && canProceedStep1.value) {
    step.value = 2
  } else if (step.value === 2 && canProceedStep2.value) {
    step.value = 3
  }
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const selectCountryCode = (country: CountryCode) => {
  formData.value.countryCode = country.dialCode
  selectedCountry.value = country
  formData.value.country = country.name
  showCountryCodeDropdown.value = false
}

const handleRegister = async () => {
  errorMessage.value = ''

  if (!formData.value.acceptTerms) {
    errorMessage.value = "Veuillez accepter les conditions d'utilisation"
    return
  }

  if (!canProceedStep3.value) {
    errorMessage.value = 'Veuillez sélectionner au moins un type de compte'
    return
  }

  isLoading.value = true

  try {
    // Concatenate country code + phone number
    const fullPhone = `${formData.value.countryCode}${formData.value.phoneNumber.replace(/\s/g, '')}`

    const actorData = {
      lastName: formData.value.lastName,
      firstName: formData.value.firstName,
      address: formData.value.address,
      images: null,
      cardFront: null,
      cardBack: null,
      typeCardId: 1, // Default or select in UI if needed
      parrainId: 0,
      numberCard: '',
    }

    const userData = {
      phone: fullPhone,
      password: formData.value.password,
      email: formData.value.email,
      username: formData.value.username,
      city: formData.value.city,
      country: formData.value.country,
    }

    const accountData = [
      {
        typeAccount: formData.value.typeAccountId,
      },
    ]

    const response = await registerUser(userData, actorData, accountData)

    // Save auth data to store and localStorage
    if (response && response.token) {
      authStore.setAuth(response)
    }

    // Success - redirect to home or dashboard
    router.push('/')
  } catch (error: any) {
    errorMessage.value = error.message || "Erreur lors de l'inscription. Veuillez réessayer."
  } finally {
    isLoading.value = false
  }
}

const handleGoogleSignup = () => {
  // Google signup implementation
}

const handleFacebookSignup = () => {
  // Facebook signup implementation
}
</script>

<template>
  <div
    class="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50"
  >
    <!-- Decorative Background Digital Layers - Elite Aesthetic -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <!-- Fixed Grain Texture -->
      <div class="absolute inset-0 opacity-[0.03] contrast-150 z-50 pointer-events-none" 
           style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E');">
      </div>

      <!-- Kinetic Blobs -->
      <div class="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-blob-drift"></div>
      <div class="absolute bottom-20 right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] animate-blob-drift-reverse"></div>
      
      <!-- Tech Grid Overlay -->
      <div class="absolute inset-0 opacity-[0.03] animate-grid-slide"
           style="background-image: linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px); background-size: 60px 60px;">
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
      <div class="w-full max-w-2xl space-y-8 animate-scale-in">
        <!-- Logo & Back to Home -->
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-black text-blue-600 tracking-tighter">
            casaNayo
          </h2>
          <router-link
            to="/"
            class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span class="text-sm font-semibold">Retour à l'accueil</span>
          </router-link>
        </div>

        <!-- Registration Card -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8 relative overflow-hidden">
          <!-- Decorative Corner -->
          <div
            class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full"
          ></div>

          <!-- Header -->
          <div class="relative">
            <h2
              class="text-3xl font-black text-slate-900 mb-2 tracking-tighter"
            >
              Nouveau Compte
            </h2>
            <p class="text-slate-500 font-medium text-sm">Rejoignez l'élite de l'immobilier en RDC.</p>
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
                class="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500"
                :class="
                  step >= s
                    ? 'bg-blue-600 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)]'
                    : 'bg-white border-2 border-slate-200 text-slate-400'
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
                class="text-[10px] mt-3 font-black uppercase tracking-widest text-center"
                :class="step >= s ? 'text-blue-600' : 'text-slate-400'"
              >
                {{ s === 1 ? 'Identité' : s === 2 ? 'Sécurité' : 'Profil' }}
              </span>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-fade-in"
          >
            <svg
              class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-red-800 text-sm">{{ errorMessage }}</span>
          </div>

          <!-- Step 1: Basic Info -->
          <form v-if="step === 1" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Prénom <span class="text-red-500">*</span></label
                >
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="formData.firstName"
                    type="text"
                    required
                    placeholder="John"
                    class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Nom <span class="text-red-500">*</span></label
                >
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="formData.lastName"
                    type="text"
                    required
                    placeholder="Doe"
                    class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700"
                >Email <span class="text-red-500">*</span></label
              >
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
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="votre@email.com"
                  class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700"
                >Téléphone <span class="text-red-500">*</span></label
              >
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
                      <input
                        type="text"
                        placeholder="Rechercher un pays..."
                        class="w-full px-3 py-2 border border-gray-200 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        @input="
                          (e) => {
                            const search = (e.target as HTMLInputElement).value.toLowerCase()
                            // Filter countries based on search
                          }
                        "
                      />
                      <div class="space-y-1">
                        <button
                          v-for="country in countryCodes"
                          :key="country.code"
                          type="button"
                          @click="selectCountryCode(country)"
                          class="w-full flex items-center space-x-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                          :class="formData.countryCode === country.dialCode ? 'bg-blue-100' : ''"
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
                    v-model="formData.phoneNumber"
                    type="tel"
                    required
                    placeholder="XXX XXX XXX"
                    class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Ville <span class="text-red-500">*</span></label
                >
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="formData.city"
                    type="text"
                    required
                    placeholder="Kinshasa"
                    class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Adresse <span class="text-red-500">*</span></label
                >
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="formData.address"
                    type="text"
                    required
                    placeholder="123 Rue Example"
                    class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  />
                </div>
              </div>
            </div>

            <button
              @click="nextStep"
              type="button"
              :disabled="!canProceedStep1"
              class="w-full py-4.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.6)] disabled:opacity-30 disabled:cursor-not-allowed group active:scale-[0.98]"
            >
              Étape Suivante
            </button>
          </form>

          <!-- Step 2: Security -->
          <form v-if="step === 2" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700"
                >Mot de passe <span class="text-red-500">*</span></label
              >
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
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  class="w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all hover:border-blue-400 text-sm"
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
              <div v-if="formData.password" class="space-y-2">
                <div class="flex items-center space-x-2">
                  <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      class="h-full transition-all duration-300"
                      :class="passwordStrength.color"
                      :style="{ width: `${(passwordStrength.level / 5) * 100}%` }"
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
              <label class="block text-sm font-semibold text-gray-700"
                >Confirmer le mot de passe <span class="text-red-500">*</span></label
              >
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
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  class="w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all hover:border-blue-400 text-sm"
                  :class="
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500'
                      : ''
                  "
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
                v-if="formData.confirmPassword && formData.password !== formData.confirmPassword"
                class="text-xs text-red-600"
              >
                Les mots de passe ne correspondent pas
              </p>
            </div>

            <div class="flex space-x-4">
              <button
                @click="prevStep"
                type="button"
                class="flex-1 py-4.5 border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px]"
              >
                Retour
              </button>
              <button
                @click="nextStep"
                type="button"
                :disabled="!canProceedStep2"
                class="flex-1 py-4.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.6)] disabled:opacity-30 disabled:cursor-not-allowed group active:scale-[0.98]"
              >
                Continuer
              </button>
            </div>
          </form>

          <!-- Step 3: User Type -->
          <form v-if="step === 3" @submit.prevent="handleRegister" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700"
                >Nom d'utilisateur <span class="text-red-500">*</span></label
              >
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  v-model="formData.username"
                  type="text"
                  required
                  placeholder="johndoe"
                  class="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all hover:border-blue-400 text-sm"
                />
              </div>
            </div>

            <div class="space-y-6">
              <p class="text-sm text-gray-600 mb-4">
                Sélectionnez au moins un type de compte. Vous pouvez choisir un type dans
                l'immobilier et/ou un type dans les services.
              </p>

              <div v-if="loadingAccounts" class="text-center py-8">
                <svg
                  class="animate-spin h-8 w-8 text-blue-600 mx-auto"
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
                <p class="text-gray-600 mt-2">Chargement des types de comptes...</p>
              </div>

              <div v-else class="space-y-6">
                <!-- Account Type selection -->
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700">
                    Type de compte <span class="text-red-500">*</span>
                  </label>
                  <div class="grid grid-cols-1 gap-3">
                    <button
                      v-for="account in filteredTypeAccounts"
                      :key="account.typeAccountId"
                      type="button"
                      @click="formData.typeAccountId = account.typeAccountId"
                      :class="
                        formData.typeAccountId === account.typeAccountId
                          ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                          : 'border-slate-100 bg-slate-50/50 hover:border-blue-300'
                      "
                      class="flex items-center justify-between p-5 border rounded-2xl transition-all text-left group"
                    >
                      <div class="flex items-center space-x-4">
                        <div
                          :class="
                            formData.typeAccountId === account.typeAccountId
                              ? 'bg-blue-600 border-blue-600'
                              : 'bg-white border-slate-200'
                          "
                          class="w-6 h-6 rounded-full border-2 shadow-sm flex-shrink-0 flex items-center justify-center transition-all"
                        >
                          <div v-if="formData.typeAccountId === account.typeAccountId" class="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <span class="font-bold text-sm tracking-tight">{{ account.name }}</span>
                      </div>
                      <svg
                        v-if="formData.typeAccountId === account.typeAccountId"
                        class="w-5 h-5 text-blue-600 animate-scale-in"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Info message -->
                <div v-if="formData.typeAccountId === 0" class="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p class="text-xs text-yellow-800">⚠️ Veuillez sélectionner un type de compte</p>
                </div>
              </div>
            </div>

            <!-- Terms & Conditions -->
            <label class="flex items-start cursor-pointer group">
              <input
                v-model="formData.acceptTerms"
                type="checkbox"
                required
                class="mt-1 w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                J'accepte les
                <a href="#" class="text-blue-600 hover:underline font-semibold"
                  >conditions d'utilisation</a
                >
                et la
                <a href="#" class="text-blue-600 hover:underline font-semibold"
                  >politique de confidentialité</a
                >
              </span>
            </label>

            <div class="flex space-x-4">
              <button
                @click="prevStep"
                type="button"
                class="flex-1 py-4.5 border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px]"
              >
                Retour
              </button>
              <button
                type="submit"
                :disabled="isLoading || !formData.acceptTerms || !canProceedStep3"
                class="flex-1 py-4.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.6)] disabled:opacity-30 disabled:cursor-not-allowed group active:scale-[0.98] flex items-center justify-center space-x-2"
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
                <span>{{ isLoading ? 'Progression...' : 'Créer mon compte' }}</span>
              </button>
            </div>
          </form>

          <!-- Login Link -->
          <div class="text-center">
            <p class="text-gray-600">
              Vous avez déjà un compte?
              <router-link
                to="/login"
                class="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all ml-1"
              >
                Se connecter
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob-drift {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes blob-drift-reverse {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-30px, 50px) scale(0.9); }
  66% { transform: translate(20px, -20px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
}

.animate-blob-drift {
  animation: blob-drift 20s ease-in-out infinite;
}

.animate-blob-drift-reverse {
  animation: blob-drift-reverse 25s ease-in-out infinite;
}

@keyframes grid-slide {
  from { background-position: 0 0; }
  to { background-position: 60px 60px; }
}

.animate-grid-slide {
  animation: grid-slide 20s linear infinite;
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
  animation: scale-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
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
