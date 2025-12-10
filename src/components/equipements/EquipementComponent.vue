<script setup>
import { ref, onMounted } from 'vue'
import {
  BeakerIcon,
  ComputerDesktopIcon,
  BookOpenIcon,
  TrophyIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'

const menuOpen = ref(false)
const cards = [
  {
    id: 'laboratoires',
    title: 'Laboratoires Scientifiques',
    description:
      "Espaces équipés de matériel de pointe pour l'expérimentation et la recherche scientifique.",
    icon: BeakerIcon,
    bgIcon: 'bg-blue-50',
    textIcon: 'text-blue-500',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    id: 'informatique',
    title: 'Laboratoire Informatique',
    description:
      'Des salles modernes avec ordinateurs performants et connexion haut débit pour développer vos compétences numériques.',
    icon: ComputerDesktopIcon,
    bgIcon: 'bg-purple-50',
    textIcon: 'text-purple-500',
    bgGradient: 'from-purple-50 to-purple-100',
  },
  {
    id: 'bibliotheque',
    title: 'Bibliothèque',
    description:
      'Un espace calme et riche en ouvrages pour accompagner vos recherches et approfondir vos connaissances.',
    icon: BookOpenIcon,
    bgIcon: 'bg-green-50',
    textIcon: 'text-green-500',
    bgGradient: 'from-green-50 to-green-100',
  },
  {
    id: 'sport',
    title: 'Infrastructures Sportives',
    description:
      'Des installations sportives modernes pour encourager la santé, l’esprit d’équipe et le dépassement de soi.',
    icon: TrophyIcon,
    bgIcon: 'bg-orange-50',
    textIcon: 'text-orange-500',
    bgGradient: 'from-orange-50 to-orange-100',
  },
]

const deviceCards = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    },
    { threshold: 0.1 },
  )
  if (deviceCards.value) {
    const cards = deviceCards.value.querySelectorAll('.device-card')
    cards.forEach((card, index) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(20px)'
      card.style.transition = `all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 100}ms`
      observer.observe(card)
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Background décoratif -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30 pointer-events-none"
    ></div>
    <div
      class="absolute -top-10 -left-10 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
    ></div>
    <div
      class="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"
    ></div>

    <!-- Navigation -->
    <header
      class="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-10 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <span class="font-extrabold text-xl text-gray-800 tracking-tight">Mont Thabor</span>
              <span class="block text-xs text-gray-500 font-medium -mt-1">Complexe Scolaire</span>
            </div>
          </div>
          <nav class="hidden md:flex space-x-1">
            <a
              v-for="(card, i) in cards"
              :key="i"
              :href="`#${card.id}`"
              class="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {{ card.title.split(' ')[0] }}
            </a>
          </nav>
          <button
            @click="menuOpen = !menuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ChevronDownIcon
              class="w-6 h-6 text-gray-700"
              :class="{ 'transform rotate-180': menuOpen }"
            />
          </button>
        </div>
        <div v-if="menuOpen" class="mt-4 md:hidden space-y-2">
          <a
            v-for="(card, i) in cards"
            :key="i"
            :href="`#${card.id}`"
            class="block px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            {{ card.title }}
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <span
          class="inline-block px-5 py-3 bg-white/80 text-blue-600 font-semibold tracking-wider uppercase rounded-full mb-6 shadow-sm"
        >
          Infrastructure Moderne
        </span>
        <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Nos
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >Équipements</span
          >
          Pédagogiques
        </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Découvrez notre environnement d'apprentissage moderne conçu pour favoriser l'excellence
          académique et l'épanouissement personnel.
        </p>
      </div>

      <!-- Cards Grid -->
      <div ref="deviceCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(card, i) in cards"
          :key="i"
          :id="card.id"
          class="device-card bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
        >
          <div class="p-8 text-center h-full flex flex-col justify-between">
            <div>
              <div
                class="w-20 h-20 mx-auto mb-6 rounded-xl flex items-center justify-center"
                :class="[card.bgIcon, 'shadow-md']"
              >
                <component :is="card.icon" class="h-10 w-10" :class="card.textIcon" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ card.title }}</h3>
              <p class="text-gray-600 leading-relaxed mb-6">{{ card.description }}</p>
            </div>
            <button
              class="mt-auto px-5 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@keyframes float {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  50% {
    transform: translate(20px, -30px) scale(1.1);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.animate-float {
  animation: float 12s infinite ease-in-out;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
