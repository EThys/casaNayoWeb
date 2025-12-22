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
    :class="[
      'fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] w-[90%] max-w-6xl rounded-[32px] border',
      isScrolled 
        ? 'bg-white/90 backdrop-blur-2xl border-slate-200/60 py-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]' 
        : 'bg-white/40 backdrop-blur-xl border-white/40 py-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]'
    ]"
  >
    <div class="mx-auto px-6 md:px-10">
      <div class="flex justify-between items-center h-14">
        <!-- Logo - Elite Minimalist -->
        <router-link
          to="/"
          class="flex items-center space-x-3 z-60 group relative"
          @click="isMobileMenuOpen = false"
        >
          <div
            class="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[360deg] shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)] group-hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.5)]"
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
          <div class="flex flex-col -space-y-1 overflow-hidden">
            <span
              class="text-2xl font-black tracking-tighter text-slate-900 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              casaNayo
            </span>
          
          </div>
        </router-link>

        <!-- Desktop Menu - Elite Style -->
        <nav v-if="!isMobile" class="flex items-center space-x-1 bg-white px-2 py-1.5 rounded-2xl border border-slate-200/60 shadow-sm">
          <!-- Properties Dropdown -->
          <div
            class="relative group"
            @mouseenter="activeDropdown = 'properties'"
            @mouseleave="activeDropdown = null"
          >
            <button
              class="nav-link px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center space-x-2 text-slate-600 hover:text-slate-900 rounded-xl"
            >
              <span>Propriétés</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3.5 h-3.5 transition-transform duration-500"
                :class="{ 'rotate-180 text-blue-400': activeDropdown === 'properties' }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <transition
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-4 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-4 scale-95"
            >
              <div
                v-if="activeDropdown === 'properties'"
                class="absolute top-[calc(100%+12px)] left-0 w-72 bg-white rounded-3xl border border-slate-100 p-2 z-50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]"
              >
                <div class="space-y-1">
                  <router-link
                    v-for="(item, idx) in [
                      { to: '/category/for-sale', label: 'À vendre', desc: 'Investissez dans le futur', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                      { to: '/category/for-rent', label: 'À louer', desc: 'Trouvez votre confort', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
                    ]"
                    :key="idx"
                    :to="item.to"
                    class="flex items-center px-4 py-4 text-[11px] font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-2xl transition-all duration-300 group/item"
                  >
                    <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mr-4 group-hover/item:bg-blue-600 group-hover/item:shadow-[0_8px_16px_-4px_rgba(37,99,235,0.3)] transition-all duration-300">
                      <svg class="w-5 h-5 text-blue-600 group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                      </svg>
                    </div>
                    <div class="flex flex-col">
                      <span class="text-slate-900 group-hover/item:text-blue-600 transition-colors uppercase tracking-wider">{{ item.label }}</span>
                      <span class="text-[9px] font-medium text-slate-400 group-hover/item:text-slate-500 normal-case tracking-normal">{{ item.desc }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </transition>
          </div>

          <!-- Services Dropdown -->
          <div
            class="relative group"
            @mouseenter="activeDropdown = 'services'"
            @mouseleave="activeDropdown = null"
          >
            <button
              class="nav-link px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center space-x-2 text-slate-600 hover:text-slate-900 rounded-xl"
            >
              <span>Services</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3.5 h-3.5 transition-transform duration-500"
                :class="{ 'rotate-180 text-blue-400': activeDropdown === 'services' }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <transition
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-4 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-4 scale-95"
            >
              <div
                v-if="activeDropdown === 'services'"
                class="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-[32px] border border-slate-100 p-4 z-50 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)]"
              >
                <div class="grid grid-cols-2 gap-2">
                  <router-link
                    v-for="(item, idx) in [
                      { to: '/services?category=housekeeper', label: 'Femme de ménage', desc: 'Entretien pro', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
                      { to: '/services?category=moving-service', label: 'Déménagement', desc: 'Sérénité totale', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
                      { to: '/services?category=electrician', label: 'Électricien', desc: 'Installation & dépannage', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                      { to: '/services?category=plumber', label: 'Plombier', desc: 'Fuites & installations', icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z' },
                      { to: '/services?category=mason', label: 'Maçon', desc: 'Gros œuvre & béton', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                      { to: '/services?category=carpenter', label: 'Menuisier', desc: 'Bois & finitions', icon: 'M7 21h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2zM7 5V3m10 2V3M5 11h14M5 15h14' },
                      { to: '/services?category=painter', label: 'Peintre', desc: 'Murs & plafonds', icon: 'M7 21v-4m0 0V5a2 2 0 012-2h5a2 2 0 012 2v12m-9 0h9m-9 0a2 2 0 002 2h5a2 2 0 002-2M7 17h9' },
                      { to: '/services?category=butler-service', label: 'Majordome', desc: 'Intendance privée', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                      { to: '/services?category=refrigeration-technician', label: 'Frigoriste', desc: 'Clim & froid', icon: 'M21 12H3m9 9v-18m5.657 2.343l-11.314 11.314m0-11.314l11.314 11.314' },
                      { to: '/services?category=tiler', label: 'Carreleur', desc: 'Sols & faïences', icon: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z' }
                    ]"
                    :key="idx"
                    :to="item.to"
                    class="flex items-center px-4 py-3.5 text-[11px] font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-2xl transition-all duration-300 group/item"
                  >
                    <div class="w-10 h-10 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center mr-4 group-hover/item:bg-blue-600 group-hover/item:shadow-[0_8px_16px_-4px_rgba(37,99,235,0.3)] transition-all duration-300">
                      <svg class="w-5 h-5 text-blue-600 group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                      </svg>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="text-slate-900 group-hover/item:text-blue-600 transition-colors uppercase tracking-wider truncate">{{ item.label }}</span>
                      <span class="text-[9px] font-medium text-slate-400 group-hover/item:text-slate-500 normal-case tracking-normal truncate">{{ item.desc }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </transition>
          </div>

          <!-- About -->
          <router-link
            to="/about"
            class="nav-link px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 hover:text-slate-900 transition-all duration-300"
          >
            À propos
          </router-link>

          <!-- Help -->
          <router-link
            to="/help"
            class="nav-link px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 hover:text-slate-900 transition-all duration-300"
          >
            Aide
          </router-link>

          <!-- Contact Button - Elite -->
          <router-link
            to="/contact"
            class="relative px-7 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white overflow-hidden group/btn ml-2"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-500 group-hover/btn:scale-110 rounded-2xl shadow-[0_10px_20px_-5px_rgba(37,99,235,0.2)] group-hover/btn:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)]"></div>
            <span class="relative z-10 flex items-center">
              Contact
              <svg class="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </router-link>

          <!-- User Menu -->
          <div class="relative ml-4">
            <button
              @click.stop="isUserMenuOpen = !isUserMenuOpen"
              class="relative w-11 h-11 rounded-2xl border border-slate-200/60 bg-white flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-blue-500 hover:shadow-[0_8px_20px_rgba(37,99,235,0.08)] group/user"
            >
              <div class="absolute inset-0 bg-blue-500 opacity-0 group-hover/user:opacity-5 transition-opacity"></div>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-500 group-hover/user:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            <!-- User Dropdown Menu -->
            <transition
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-4 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-4 scale-95"
            >
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-3 w-64 bg-white rounded-3xl border border-slate-100 p-2 z-50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]"
                @click.stop
              >
                <div class="px-5 py-4 mb-1 border-b border-slate-50">
                  <span class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Compte Elite</span>
                </div>
                <div class="space-y-1">
                  <router-link
                    v-for="(item, idx) in [
                      { to: '/login', label: 'Connexion', icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' },
                      { to: '/signup', label: 'Inscription', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
                      { to: '/help', label: 'Support Client', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' }
                    ]"
                    :key="idx"
                    :to="item.to"
                    class="flex items-center px-4 py-3.5 text-[11px] font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-2xl transition-all duration-300 group/uitem"
                  >
                    <svg class="w-4 h-4 mr-3 text-slate-400 group-hover/uitem:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                    </svg>
                    {{ item.label }}
                  </router-link>
                </div>
              </div>
            </transition>
          </div>
        </nav>

        <!-- Mobile Button - Elite Minimalist -->
        <button
          v-if="isMobile"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="relative w-12 h-12 rounded-2xl bg-white border border-slate-200/60 flex items-center justify-center z-[110] transition-all duration-300 active:scale-95 shadow-sm"
        >
          <div class="flex flex-col space-y-1.5 items-center justify-center">
            <span class="w-6 h-0.5 bg-slate-900 transition-all duration-500 rounded-full" :class="{ 'rotate-45 translate-y-[4px]': isMobileMenuOpen }"></span>
            <span class="w-6 h-0.5 bg-slate-900 transition-all duration-500 rounded-full" :class="{ '-rotate-45 -translate-y-[4px]': isMobileMenuOpen }"></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu - Elite Fullscreen -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        enter-from-class="opacity-0 backdrop-blur-0 translate-y-10"
        enter-to-class="opacity-100 backdrop-blur-3xl translate-y-0"
        leave-active-class="transition duration-500 ease-in"
        leave-from-class="opacity-100 backdrop-blur-3xl translate-y-0"
        leave-to-class="opacity-0 backdrop-blur-0 translate-y-10"
      >
        <div
          v-if="isMobile && isMobileMenuOpen"
          class="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6"
        >
          <!-- Background Decor -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-400 rounded-full blur-[150px]"></div>
          </div>

          <nav class="relative z-10 w-full px-10 flex flex-col items-center space-y-10">
            <div class="flex flex-col items-center space-y-6">
              <span class="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Exploration</span>
              <router-link
                v-for="(item, idx) in [
                  { to: '/', label: 'Accueil' },
                  { to: '/properties', label: 'Immobilier' },
                  { to: '/all-services', label: 'Services' },
                  { to: '/about', label: 'Notre Univers' },
                  { to: '/contact', label: 'Contact' }
                ]"
                :key="idx"
                :to="item.to"
                class="mobile-nav-link text-5xl font-black text-slate-900 tracking-tighter hover:text-blue-600 transition-all duration-300"
                @click="isMobileMenuOpen = false"
              >
                {{ item.label }}
              </router-link>
            </div>

            <div class="w-24 h-px bg-slate-100"></div>

            <div class="flex flex-col items-center space-y-6">
              <router-link to="/login" class="text-slate-400 font-black uppercase tracking-[0.3em] text-xs hover:text-blue-600 transition-colors" @click="isMobileMenuOpen = false">Connexion</router-link>
              <router-link to="/signup" class="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-500/10 active:scale-95 transition-all" @click="isMobileMenuOpen = false">Rejoindre</router-link>
            </div>
          </nav>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<style scoped>
header {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
}

/* Glassmorphism Crystal */
header {
  border-color: rgba(0, 0, 0, 0.05);
}

.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 1px;
  background: #3b82f6;
  transition: all 0.3s ease;
  transform: translateX(-50%);
  opacity: 0;
}

.nav-link:hover::after {
  width: 20px;
  opacity: 1;
}

/* Elite Mobile Overlay Animations */
.mobile-nav-link {
  animation: stagger-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
}

.mobile-nav-link:nth-child(2) { animation-delay: 0.1s; }
.mobile-nav-link:nth-child(3) { animation-delay: 0.2s; }
.mobile-nav-link:nth-child(4) { animation-delay: 0.3s; }
.mobile-nav-link:nth-child(5) { animation-delay: 0.4s; }

@keyframes stagger-in {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
    filter: blur(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* Active Link Glow */
.router-link-active:not(.group) {
  position: relative;
  color: #fff !important;
}

.router-link-active:not(.group)::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 12px #3b82f6;
}

/* Custom Scrollbar for Dropdowns Elite */
.backdrop-blur-3xl::-webkit-scrollbar {
  width: 5px;
}

.backdrop-blur-3xl::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.backdrop-blur-3xl::-webkit-scrollbar-track {
  background: transparent;
}

@media (max-width: 1024px) {
  header {
    top: 0 !important;
  }
}
</style>
