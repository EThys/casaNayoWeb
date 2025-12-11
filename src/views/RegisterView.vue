<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const step = ref(1)
const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userType: 'client', // client, professional, owner
  acceptTerms: false,
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const passwordStrength = computed(() => {
  const password = formData.value.password
  if (!password) return { level: 0, text: '', color: '' }
  
  let strength = 0
  if (password.length >= 8) strength++
  if (password.match(/[a-z]/)) strength++
  if (password.match(/[A-Z]/)) strength++
  if (password.match(/[0-9]/)) strength++
  if (password.match(/[^a-zA-Z0-9]/)) strength++
  
  if (strength <= 2) return { level: strength, text: 'Faible', color: 'bg-red-500' }
  if (strength <= 3) return { level: strength, text: 'Moyen', color: 'bg-yellow-500' }
  return { level: strength, text: 'Fort', color: 'bg-green-500' }
})

const canProceedStep1 = computed(() => {
  return formData.value.fullName && formData.value.email && formData.value.phone
})

const canProceedStep2 = computed(() => {
  return formData.value.password && 
         formData.value.confirmPassword && 
         formData.value.password === formData.value.confirmPassword &&
         formData.value.password.length >= 8
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

const handleRegister = async () => {
  errorMessage.value = ''
  
  if (!formData.value.acceptTerms) {
    errorMessage.value = 'Veuillez accepter les conditions d\'utilisation'
    return
  }
  
  isLoading.value = true
  
  // Simuler une requête API
  setTimeout(() => {
    isLoading.value = false
    router.push('/login')
  }, 1500)
}

const handleGoogleSignup = () => {
  console.log('Google signup')
}

const handleFacebookSignup = () => {
  console.log('Facebook signup')
}
</script>

<template>
  <div class="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-300/5 rounded-full blur-2xl animate-pulse-slow"></div>
      
      <!-- Animated Grid -->
      <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
      <div class="w-full max-w-2xl space-y-8 animate-scale-in">
        <!-- Logo & Back to Home -->
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-bold text-blue-600" style="font-family: 'Poppins', sans-serif">
            CasaNayo
          </h2>
          <router-link
            to="/"
            class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span class="text-sm font-semibold">Retour à l'accueil</span>
          </router-link>
        </div>

        <!-- Registration Card -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8 relative overflow-hidden">
          <!-- Decorative Corner -->
          <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full"></div>
          
          <!-- Header -->
          <div class="relative">
            <h2 class="text-3xl font-bold text-gray-900 mb-2" style="font-family: 'Poppins', sans-serif">
              Créer un compte
            </h2>
            <p class="text-gray-600">Rejoignez la communauté CasaNayo</p>
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
                :class="step >= s ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-300 text-gray-400'"
              >
                <svg v-if="step > s" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span v-else>{{ s }}</span>
              </div>
              <span class="text-xs mt-2 font-semibold" :class="step >= s ? 'text-blue-600' : 'text-gray-400'">
                {{ s === 1 ? 'Infos' : s === 2 ? 'Sécurité' : 'Type' }}
              </span>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-fade-in">
            <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span class="text-red-800 text-sm">{{ errorMessage }}</span>
          </div>

          <!-- Step 1: Basic Info -->
          <form v-if="step === 1" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Nom complet</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  v-model="formData.fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Email</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
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
              <label class="block text-sm font-semibold text-gray-700">Téléphone</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <input
                  v-model="formData.phone"
                  type="tel"
                  required
                  placeholder="+243 XXX XXX XXX"
                  class="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                />
              </div>
            </div>

            <button
              @click="nextStep"
              type="button"
              :disabled="!canProceedStep1"
              class="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              style="font-family: 'Poppins', sans-serif"
            >
              Continuer
            </button>
          </form>

          <!-- Step 2: Security -->
          <form v-if="step === 2" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Mot de passe</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  class="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
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
                  <span class="text-xs font-semibold" :class="passwordStrength.color.replace('bg-', 'text-')">
                    {{ passwordStrength.text }}
                  </span>
                </div>
                <p class="text-xs text-gray-500">
                  Utilisez 8 caractères minimum avec majuscules, chiffres et symboles
                </p>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Confirmer le mot de passe</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <input
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  class="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300"
                  :class="formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300' : ''"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                </button>
              </div>
              <p v-if="formData.confirmPassword && formData.password !== formData.confirmPassword" class="text-xs text-red-600">
                Les mots de passe ne correspondent pas
              </p>
            </div>

            <div class="flex space-x-4">
              <button
                @click="prevStep"
                type="button"
                class="flex-1 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-bold rounded-xl transition-all"
              >
                Retour
              </button>
              <button
                @click="nextStep"
                type="button"
                :disabled="!canProceedStep2"
                class="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                style="font-family: 'Poppins', sans-serif"
              >
                Continuer
              </button>
            </div>
          </form>

          <!-- Step 3: User Type -->
          <form v-if="step === 3" @submit.prevent="handleRegister" class="space-y-6">
            <div class="space-y-4">
              <label class="block text-sm font-semibold text-gray-700 mb-4">
                Je souhaite utiliser CasaNayo en tant que :
              </label>
              
              <!-- Client -->
              <label class="relative flex items-start p-5 border-2 rounded-xl cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50"
                :class="formData.userType === 'client' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'">
                <input
                  v-model="formData.userType"
                  type="radio"
                  value="client"
                  class="mt-1 w-5 h-5 text-blue-600 cursor-pointer"
                />
                <div class="ml-4 flex-1">
                  <div class="flex items-center space-x-2">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <span class="font-bold text-gray-900">Client</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">
                    Je cherche une propriété ou un service professionnel
                  </p>
                </div>
              </label>

              <!-- Professional -->
              <label class="relative flex items-start p-5 border-2 rounded-xl cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50"
                :class="formData.userType === 'professional' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'">
                <input
                  v-model="formData.userType"
                  type="radio"
                  value="professional"
                  class="mt-1 w-5 h-5 text-blue-600 cursor-pointer"
                />
                <div class="ml-4 flex-1">
                  <div class="flex items-center space-x-2">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span class="font-bold text-gray-900">Professionnel</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">
                    Je propose mes services (plombier, électricien, architecte, etc.)
                  </p>
                </div>
              </label>

              <!-- Owner -->
              <label class="relative flex items-start p-5 border-2 rounded-xl cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50"
                :class="formData.userType === 'owner' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'">
                <input
                  v-model="formData.userType"
                  type="radio"
                  value="owner"
                  class="mt-1 w-5 h-5 text-blue-600 cursor-pointer"
                />
                <div class="ml-4 flex-1">
                  <div class="flex items-center space-x-2">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    <span class="font-bold text-gray-900">Propriétaire</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">
                    Je souhaite publier mes biens immobiliers
                  </p>
                </div>
              </label>
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
                <a href="#" class="text-blue-600 hover:underline font-semibold">conditions d'utilisation</a>
                et la
                <a href="#" class="text-blue-600 hover:underline font-semibold">politique de confidentialité</a>
              </span>
            </label>

            <!-- Buttons -->
            <div class="flex space-x-4">
              <button
                @click="prevStep"
                type="button"
                class="flex-1 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-bold rounded-xl transition-all"
              >
                Retour
              </button>
              <button
                type="submit"
                :disabled="isLoading || !formData.acceptTerms"
                class="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                style="font-family: 'Poppins', sans-serif"
              >
                <svg v-if="isLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isLoading ? 'Création...' : 'Créer mon compte' }}</span>
              </button>
            </div>
          </form>

          <!-- Divider -->
          <div v-if="step === 1" class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500 font-medium">Ou s'inscrire avec</span>
            </div>
          </div>

          <!-- Social Signup -->
          <div v-if="step === 1" class="grid grid-cols-2 gap-4">
            <button
              @click="handleGoogleSignup"
              type="button"
              class="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all space-x-2 group"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Google</span>
            </button>

            <button
              @click="handleFacebookSignup"
              type="button"
              class="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all space-x-2 group"
            >
              <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Facebook</span>
            </button>
          </div>

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
@keyframes float {
  0%, 100% {
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

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
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

