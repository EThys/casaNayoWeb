<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)

const isMobile = computed(() => windowWidth.value < 1024)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value >= 1024) {
    isMobileMenuOpen.value = false
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', () => {
    isUserMenuOpen.value = false
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header
    class="fixed w-full z-50 transition-all duration-300 bg-white shadow-md"
  >
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo - Modern & Elegant -->
        <router-link
          to="/"
          class="flex items-center space-x-3 z-60 group"
          @click="isMobileMenuOpen = false"
        >
          <div
            class="w-11 h-11 bg-[#1976D2] rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div class="flex flex-col -space-y-1">
            <span
              class="text-2xl font-bold tracking-tight text-gray-900"
              style="font-family: 'Poppins', sans-serif"
            >
              casaNayo
            </span>
            <span
              class="text-xs font-medium tracking-wider text-[#1976D2]"
            >
              Immobilier RDC
            </span>
          </div>
        </router-link>

        <!-- Desktop Menu - Google Style -->
        <nav v-if="!isMobile" class="flex items-center space-x-1">
          <!-- Properties Dropdown -->
          <div
            class="relative"
            @mouseenter="activeDropdown = 'properties'"
            @mouseleave="activeDropdown = null"
          >
            <button
              class="px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center space-x-2 text-gray-800 hover:bg-blue-50 hover:text-blue-700"
              style="font-family: 'Inter', sans-serif"
            >
              <span>Propriétés</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': activeDropdown === 'properties' }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="activeDropdown === 'properties'"
                class="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
              >
                <router-link
                  to="/category/for-sale"
                  class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  style="font-family: 'Google Sans', 'Roboto', sans-serif"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  À vendre
                </router-link>
                <router-link
                  to="/category/for-rent"
                  class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  style="font-family: 'Google Sans', 'Roboto', sans-serif"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  À louer
                </router-link>
                <router-link
                  to="/category/moving-service"
                  class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  style="font-family: 'Google Sans', 'Roboto', sans-serif"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  Déménagement
                </router-link>
                <router-link
                  to="/category/butler-service"
                  class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  style="font-family: 'Google Sans', 'Roboto', sans-serif"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Majordome
                </router-link>
              </div>
            </transition>
          </div>

          <!-- About -->
          <router-link
            to="/about"
            class="px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 text-gray-800 hover:bg-blue-50 hover:text-blue-700"
            style="font-family: 'Inter', sans-serif"
          >
            À propos
          </router-link>

          <!-- Help -->
          <router-link
            to="/help"
            class="px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 text-gray-800 hover:bg-blue-50 hover:text-blue-700"
            style="font-family: 'Inter', sans-serif"
          >
            Aide
          </router-link>

          <!-- Contact Button -->
          <router-link
            to="/contact"
            class="px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
            style="font-family: 'Inter', sans-serif"
          >
            Nous contacter
          </router-link>

          <!-- User Menu - Modern Style -->
          <div class="relative ml-3">
            <button
              @click.stop="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 border-2 shadow-md hover:shadow-lg border-gray-200 bg-white hover:border-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </button>

            <!-- User Dropdown Menu -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                @click.stop
              >
                <div class="px-4 py-2.5 border-b border-gray-100">
                  <div
                    class="font-medium text-gray-900 text-sm"
                    style="font-family: 'Google Sans', 'Roboto', sans-serif"
                  >
                    Menu
                  </div>
                </div>
                <router-link
                  to="/login"
                  class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  style="font-family: 'Google Sans', 'Roboto', sans-serif"
                >
                  Connexion
                </router-link>
                <router-link
                  to="/signup"
                  class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  style="font-family: 'Google Sans', 'Roboto', sans-serif"
                >
                  Inscription
                </router-link>
                <div class="border-t border-gray-100 my-1"></div>
                <router-link
                  to="/help"
                  class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  style="font-family: 'Google Sans', 'Roboto', sans-serif"
                >
                  Aide
                </router-link>
                <router-link
                  to="/about"
                  class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  style="font-family: 'Google Sans', 'Roboto', sans-serif"
                >
                  À propos
                </router-link>
              </div>
            </transition>
          </div>
        </nav>

        <!-- Mobile Button -->
        <button
          v-if="isMobile"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-2 rounded-lg transition-colors duration-200 z-60 text-gray-700 hover:bg-gray-100"
        >
          <svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in transform"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobile && isMobileMenuOpen"
        class="lg:hidden bg-white border-t border-gray-200 shadow-lg absolute top-16 inset-x-0 pb-4 pt-2"
      >
        <div class="px-4 space-y-0.5">
          <router-link
            to="/"
            class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-sm font-normal"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            Accueil
          </router-link>
          <router-link
            to="/about"
            class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-sm font-normal"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            À propos
          </router-link>
          <router-link
            to="/help"
            class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-sm font-normal"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            Aide
          </router-link>
          <router-link
            to="/contact"
            class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-sm font-normal"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            Contact
          </router-link>
          <div class="border-t border-gray-200 my-2"></div>
          <div
            class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
          >
            Catégories
          </div>
          <router-link
            to="/category/for-sale"
            class="flex items-center px-8 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors duration-150 text-sm"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            À vendre
          </router-link>
          <router-link
            to="/category/for-rent"
            class="flex items-center px-8 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors duration-150 text-sm"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            À louer
          </router-link>
          <router-link
            to="/category/moving-service"
            class="flex items-center px-8 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors duration-150 text-sm"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            Déménagement
          </router-link>
          <router-link
            to="/category/butler-service"
            class="flex items-center px-8 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors duration-150 text-sm"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            Majordome
          </router-link>
          <div class="border-t border-gray-200 my-2"></div>
          <router-link
            to="/login"
            class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-sm font-normal"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            Connexion
          </router-link>
          <router-link
            to="/about"
            class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-sm font-normal"
            style="font-family: 'Google Sans', 'Roboto', sans-serif"
            @click="isMobileMenuOpen = false"
          >
            À propos
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
header {
  font-family: 'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Google Sans font fallback */
@font-face {
  font-family: 'Google Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular');
}

@font-face {
  font-family: 'Google Sans';
  font-style: normal;
  font-weight: 500;
  src: local('Roboto Medium'), local('Roboto-Medium');
}
</style>
