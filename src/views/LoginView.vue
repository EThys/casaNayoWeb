<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { countryCodes, type CountryCode } from '@/utils/countryCodes'
import { login } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const identifiant = ref('')
const password = ref('')
const identifiantType = ref<'email' | 'phone'>('email')
const phoneNumber = ref('')
const countryCode = ref('+243')
const selectedCountry = ref<CountryCode>(countryCodes[0])
const showPassword = ref(false)
const showCountryCodeDropdown = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// Validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPhone = (phone: string): boolean => {
  // Remove spaces and check if it's numeric
  const cleanPhone = phone.replace(/\s/g, '')
  return /^\d+$/.test(cleanPhone) && cleanPhone.length >= 6
}

const isFormValid = computed(() => {
  if (identifiantType.value === 'email') {
    return isValidEmail(identifiant.value) && password.value.length >= 6
  } else {
    return isValidPhone(phoneNumber.value) && password.value.length >= 6
  }
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
  identifiantType.value = type
  identifiant.value = ''
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

const handleLogin = async () => {
  errorMessage.value = ''

  // Validation
  if (identifiantType.value === 'email') {
    if (!isValidEmail(identifiant.value)) {
      errorMessage.value = 'Veuillez entrer un email valide'
      return
    }
  } else {
    if (!isValidPhone(phoneNumber.value)) {
      errorMessage.value = 'Veuillez entrer un numéro de téléphone valide'
      return
    }
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Le mot de passe doit contenir au moins 6 caractères'
    return
  }

  isLoading.value = true

  try {
    // Prepare identifiant
    let finalIdentifiant = identifiant.value
    if (identifiantType.value === 'phone') {
      // Concatenate country code + phone number
      finalIdentifiant = `${countryCode.value}${phoneNumber.value.replace(/\s/g, '')}`
    }

    const response = await login(finalIdentifiant, password.value)

    // Save auth data to store and localStorage
    if (response && response.token) {
      authStore.setAuth(response)
    }

    // Success - redirect to home
    router.push('/')
  } catch (error: any) {
    errorMessage.value = error.message || 'Erreur lors de la connexion. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = () => {
  // Google login implementation
}

const handleFacebookLogin = () => {
  // Facebook login implementation
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

    <!-- Left Side - Image/Branding -->
    <div
      class="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-12 items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')] bg-cover bg-center opacity-20"
      ></div>

      <!-- Decorative Elements -->
      <div
        class="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-lg rotate-12 animate-float"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-32 h-32 border-2 border-white/20 rounded-full animate-scale-pulse"
      ></div>

      <div class="relative z-10 max-w-md space-y-12 animate-fade-in-up">
        <div class="space-y-6">
          <div
            class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
          >
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-3"></div>
            <span class="text-[10px] font-black uppercase tracking-[0.3em] text-white">Elite Ecosystem</span>
          </div>

          <h1
            class="text-6xl font-black text-white leading-[0.9] tracking-tighter"
          >
            L'Exception<br />
            <span class="text-blue-400">Habitat</span>
          </h1>

          <p class="text-lg text-white/60 leading-relaxed font-light">
            Une expérience immobilière de classe mondiale commence ici. Accédez à l'excellence immobilière en RDC.
          </p>
        </div>

        <!-- Features -->
        <div class="space-y-4">
          <div class="flex items-start space-x-3 text-white/90">
            <svg
              class="w-6 h-6 text-blue-200 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>50,000+ propriétés disponibles</span>
          </div>
          <div class="flex items-start space-x-3 text-white/90">
            <svg
              class="w-6 h-6 text-blue-200 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>1,000+ professionnels certifiés</span>
          </div>
          <div class="flex items-start space-x-3 text-white/90">
            <svg
              class="w-6 h-6 text-blue-200 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Service client 24/7</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
      <div class="w-full max-w-md space-y-8 animate-scale-in">
        <!-- Logo for Mobile -->
        <div class="lg:hidden text-center">
          <h2 class="text-3xl font-bold text-blue-600">
            CasaNayo
          </h2>
        </div>

        <!-- Login Card -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8 relative overflow-hidden">
          <!-- Decorative Corner -->
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full"
          ></div>

          <div class="relative">
            <h2
              class="text-3xl font-black text-slate-900 mb-2 tracking-tighter"
            >
              Connexion
            </h2>
            <p class="text-slate-500 font-medium text-sm">Prêt pour l'excellence ? Accédez à votre compte.</p>
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-fade-in"
          >
            <svg
              class="w-5 h-5 text-red-600 shrink-0 mt-0.5"
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

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Identifiant Type Toggle -->
            <div class="flex gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                @click="switchIdentifiantType('email')"
                :class="
                  identifiantType === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                "
                class="flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all"
              >
                Email
              </button>
              <button
                type="button"
                @click="switchIdentifiantType('phone')"
                :class="
                  identifiantType === 'phone' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                "
                class="flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all"
              >
                Téléphone
              </button>
            </div>

            <!-- Email Input -->
            <div v-if="identifiantType === 'email'" class="space-y-2">
              <label for="email" class="block text-sm font-semibold text-gray-700">
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
                  v-model="identifiant"
                  id="email"
                  type="email"
                  required
                  placeholder="votre@email.com"
                  :class="identifiant && !isValidEmail(identifiant) ? 'border-red-300' : ''"
                  class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 text-base"
                />
              </div>
              <p v-if="identifiant && !isValidEmail(identifiant)" class="text-xs text-red-600">
                Veuillez entrer un email valide
              </p>
            </div>

            <!-- Phone Input -->
            <div v-if="identifiantType === 'phone'" class="space-y-2">
              <label for="phone" class="block text-sm font-semibold text-gray-700">
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
                    id="phone"
                    type="tel"
                    required
                    placeholder="XXX XXX XXX"
                    :class="phoneNumber && !isValidPhone(phoneNumber) ? 'border-red-300' : ''"
                    class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 text-base"
                  />
                </div>
              </div>
              <p v-if="phoneNumber && !isValidPhone(phoneNumber)" class="text-xs text-red-600">
                Veuillez entrer un numéro de téléphone valide (minimum 6 chiffres)
              </p>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-semibold text-gray-700">
                Mot de passe <span class="text-red-500">*</span>
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
                  v-model="password"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  :class="password && password.length < 6 ? 'border-red-300' : ''"
                  class="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 text-base"
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
              <p v-if="password && password.length < 6" class="text-xs text-red-600">
                Le mot de passe doit contenir au moins 6 caractères
              </p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <label class="flex items-center cursor-pointer group">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                />
                <span
                  class="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors"
                >
                  Se souvenir de moi
                </span>
              </label>
              <router-link
                to="/forgot-password"
                class="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all"
              >
                Mot de passe oublié?
              </router-link>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full py-4.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group active:scale-[0.98]"
            >
              <svg
                v-if="isLoading"
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Progression...' : 'Authentification' }}</span>
            </button>
          </form>

          <!-- Sign Up Link -->
          <div class="text-center">
            <p class="text-gray-600">
              Pas encore de compte?
              <router-link
                to="/register"
                class="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all ml-1"
              >
                Créer un compte
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

.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
}

.animate-scale-in {
  animation: scale-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
}
</style>
