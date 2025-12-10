<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden relative py-12 px-4 sm:px-6 lg:px-8"
  >
    <!-- Background animé (particules) -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div
        v-for="i in 15"
        :key="i"
        class="absolute rounded-full opacity-70 animate-float"
        :style="{
          width: `${Math.random() * 80 + 30}px`,
          height: `${Math.random() * 80 + 30}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}33, transparent 70%)`,
          animationDuration: `${Math.random() * 20 + 15}s`,
          animationDelay: `${Math.random() * 5}s`,
          filter: 'blur(6px)',
        }"
      ></div>
    </div>

    <!-- Header -->
    <div class="max-w-7xl mx-auto text-center mb-16">
      <div
        class="inline-flex items-center px-5 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full mb-8 shadow-sm border border-white/30 dark:border-gray-700/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-3 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="text-lg font-semibold text-gray-800 dark:text-gray-200">Emploi du Temps</span>
      </div>
      <h1
        class="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6"
      >
        Organisation Scolaire
      </h1>
      <p class="max-w-4xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
        Découvrez l’emploi du temps interactif et détaillé pour chaque niveau, conçu pour une
        expérience d’apprentissage optimale.
      </p>
    </div>

    <!-- Onglets -->
    <div class="max-w-7xl mx-auto mb-14">
      <div class="flex justify-center flex-wrap gap-4">
        <button
          v-for="level in levels"
          :key="level.name"
          @click="activeLevel = level.name"
          class="px-7 py-3.5 rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/30"
          :class="{
            'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg':
              activeLevel === level.name,
            'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-700/90':
              activeLevel !== level.name,
          }"
        >
          {{ level.label }}
        </button>
      </div>
    </div>

    <!-- Carousel natif avec défilement automatique -->
    <div
      class="max-w-7xl mx-auto mb-14 relative"
      @mouseenter="pauseAutoSlide"
      @mouseleave="resumeAutoSlide"
    >
      <!-- Bouton précédent -->
      <button
        @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Conteneur du carousel -->
      <div class="overflow-hidden rounded-2xl">
        <div
          class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)` }"
        >
          <div
            v-for="(day, dayIndex) in schedule[activeLevel]"
            :key="dayIndex"
            class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3"
            :style="{ flexBasis: `${100 / visibleSlides}%` }"
          >
            <div
              class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/30 p-7 h-full relative group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              ></div>
              <div class="relative z-10">
                <!-- En-tête jour -->
                <div
                  class="flex items-center justify-between mb-7 pb-4 border-b border-gray-200/50 dark:border-gray-700/50"
                >
                  <div class="flex items-center">
                    <div
                      class="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white mr-4 shadow-md"
                    >
                      <span class="font-bold text-xl">{{ day.day.slice(0, 3) }}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ day.day }}</h3>
                  </div>
                  <span
                    class="px-4 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm"
                  >
                    {{ day.note }}
                  </span>
                </div>
                <!-- Liste horaires -->
                <ul class="space-y-5">
                  <li
                    v-for="(slot, slotIndex) in day.slots"
                    :key="slotIndex"
                    class="flex items-start gap-5 text-left p-4 rounded-xl transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                  >
                    <div
                      class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold shadow-inner border border-white/30 dark:border-gray-700/30 flex-shrink-0"
                    >
                      {{ slot.time }}
                    </div>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                        {{ slot.title }}
                      </p>
                      <p class="text-gray-600 dark:text-gray-300 text-sm mt-1.5">{{ slot.desc }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton suivant -->
      <button
        @click="nextSlide"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Pagination -->
      <div class="flex justify-center mt-6 space-x-2">
        <button
          v-for="(_, index) in schedule[activeLevel]"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="{
            'bg-blue-500 w-8': currentSlide === index,
            'bg-gray-300 dark:bg-gray-600 w-3': currentSlide !== index,
          }"
        ></button>
      </div>
    </div>

    <!-- Note supplémentaire -->
    <div
      class="max-w-5xl mx-auto mt-20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-md"
    >
      <div class="flex items-start">
        <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 text-blue-600 dark:text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="text-left">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">À Savoir</h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Les horaires sont conçus pour équilibrer apprentissage, détente et développement
            personnel.
            <span class="block mt-2"
              >Les rassemblements du matin sont obligatoires et les pauses sont à respecter pour le
              bien-être de tous.</span
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Toggle Mode Sombre -->
    <button
      @click="toggleDarkMode"
      class="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/30"
    >
      <svg
        v-if="!isDark"
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012.95 9.045M12 21a9 9 0 01-9-9m12 3a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'

const isDark = ref(false)
const activeLevel = ref('humanites')
const currentSlide = ref(0)
const visibleSlides = ref(1)
const autoSlideInterval = ref(null)
const isAutoSlidePaused = ref(false)
const colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b']

const levels = [
  { name: 'maternelle', label: 'Maternelle' },
  { name: 'primaire', label: 'Primaire' },
  { name: 'secondaire', label: 'Secondaire' },
  { name: 'humanites', label: 'Humanités' },
]

const schedule = {
  maternelle: [
    {
      day: 'Lundi',
      note: 'Cours normal',
      slots: [
        { time: '08h00', title: 'Accueil', desc: 'Rassemblement et prière' },
        { time: '08h30', title: 'Cours', desc: 'Activités éducatives' },
        { time: '09h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '10h00', title: 'Cours', desc: 'Jeux et apprentissage' },
        { time: '11h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Mardi',
      note: 'Cours normal',
      slots: [
        { time: '08h00', title: 'Accueil', desc: 'Rassemblement et prière' },
        { time: '08h30', title: 'Cours', desc: 'Activités éducatives' },
        { time: '09h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '10h00', title: 'Cours', desc: 'Jeux et apprentissage' },
        { time: '11h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Mercredi',
      note: 'Cours normal',
      slots: [
        { time: '08h00', title: 'Accueil', desc: 'Rassemblement et prière' },
        { time: '08h30', title: 'Cours', desc: 'Activités éducatives' },
        { time: '09h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '10h00', title: 'Cours', desc: 'Jeux et apprentissage' },
        { time: '11h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Jeudi',
      note: 'Cours normal',
      slots: [
        { time: '08h00', title: 'Accueil', desc: 'Rassemblement et prière' },
        { time: '08h30', title: 'Cours', desc: 'Activités éducatives' },
        { time: '09h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '10h00', title: 'Cours', desc: 'Jeux et apprentissage' },
        { time: '11h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Vendredi',
      note: 'Cours normal',
      slots: [
        { time: '08h00', title: 'Accueil', desc: 'Rassemblement et prière' },
        { time: '08h30', title: 'Cours', desc: 'Activités éducatives' },
        { time: '09h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '10h00', title: 'Cours', desc: 'Jeux et apprentissage' },
        { time: '11h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Samedi',
      note: 'Pas de cours',
      slots: [{ time: '---', title: 'Pas de cours', desc: '---' }],
    },
  ],
  primaire: [
    {
      day: 'Lundi',
      note: 'Rassemblement',
      slots: [
        {
          time: '07h30',
          title: 'Rassemblement',
          desc: 'Avec la sœur préfète et le directeur des études',
        },
        { time: '08h00', title: 'Cours', desc: 'Maths, Français, Sciences' },
        { time: '10h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '12h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Mardi',
      note: 'Cours normal',
      slots: [
        { time: '07h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '08h00', title: 'Cours', desc: 'Maths, Français, Sciences' },
        { time: '10h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '12h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Mercredi',
      note: 'Cours normal',
      slots: [
        { time: '07h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '08h00', title: 'Cours', desc: 'Maths, Français, Sciences' },
        { time: '10h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '12h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Jeudi',
      note: 'Cours normal',
      slots: [
        { time: '07h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '08h00', title: 'Cours', desc: 'Maths, Français, Sciences' },
        { time: '10h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '12h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Vendredi',
      note: 'Rassemblement',
      slots: [
        {
          time: '07h30',
          title: 'Rassemblement',
          desc: 'Avec la sœur préfète et le directeur des études',
        },
        { time: '08h00', title: 'Cours', desc: 'Maths, Français, Sciences' },
        { time: '10h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '12h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Samedi',
      note: 'Fin tôt',
      slots: [
        { time: '07h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '08h00', title: 'Cours', desc: 'Révisions et exercices' },
        { time: '09h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '10h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
  ],
  secondaire: [
    {
      day: 'Lundi',
      note: 'Rassemblement',
      slots: [
        {
          time: '12h30',
          title: 'Rassemblement',
          desc: 'Avec la sœur préfète et le directeur des études',
        },
        { time: '13h00', title: 'Cours', desc: 'Maths, Sciences, Langues' },
        { time: '15h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '17h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Mardi',
      note: 'Cours normal',
      slots: [
        { time: '12h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '13h00', title: 'Cours', desc: 'Maths, Sciences, Langues' },
        { time: '15h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '17h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Mercredi',
      note: 'Cours normal',
      slots: [
        { time: '12h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '13h00', title: 'Cours', desc: 'Maths, Sciences, Langues' },
        { time: '15h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '17h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Jeudi',
      note: 'Fin tôt',
      slots: [
        { time: '12h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '13h00', title: 'Cours', desc: 'Maths, Sciences, Langues' },
        { time: '16h30', title: 'Fin', desc: 'Réunion pédagogique' },
      ],
    },
    {
      day: 'Vendredi',
      note: 'Rassemblement',
      slots: [
        {
          time: '12h30',
          title: 'Rassemblement',
          desc: 'Avec la sœur préfète et le directeur des études',
        },
        { time: '13h00', title: 'Cours', desc: 'Maths, Sciences, Langues' },
        { time: '15h30', title: 'Récréation', desc: 'Pause détente' },
        { time: '17h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Samedi',
      note: 'Pas de cours',
      slots: [{ time: '---', title: 'Pas de cours', desc: '---' }],
    },
  ],
  humanites: [
    {
      day: 'Lundi',
      note: 'Rassemblement',
      slots: [
        {
          time: '07h30',
          title: 'Rassemblement',
          desc: 'Avec la sœur préfète et le directeur des études',
        },
        { time: '08h00', title: 'Cours', desc: 'Maths, Philosophie, Langues' },
        { time: '10h45', title: 'Récréation', desc: 'Pause détente' },
        { time: '12h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Mardi',
      note: 'Cours normal',
      slots: [
        { time: '07h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '08h00', title: 'Cours', desc: 'Maths, Philosophie, Langues' },
        { time: '10h45', title: 'Récréation', desc: 'Pause détente' },
        { time: '12h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Mercredi',
      note: 'Cours normal',
      slots: [
        { time: '07h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '08h00', title: 'Cours', desc: 'Maths, Philosophie, Langues' },
        { time: '10h45', title: 'Récréation', desc: 'Pause détente' },
        { time: '12h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Jeudi',
      note: 'Fin tôt',
      slots: [
        { time: '07h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '08h00', title: 'Cours', desc: 'Maths, Philosophie, Langues' },
        { time: '11h30', title: 'Fin', desc: 'Réunion pédagogique' },
      ],
    },
    {
      day: 'Vendredi',
      note: 'Cours normal',
      slots: [
        { time: '07h30', title: 'Accueil', desc: 'Prière et organisation' },
        { time: '08h00', title: 'Cours', desc: 'Maths, Philosophie, Langues' },
        { time: '10h45', title: 'Récréation', desc: 'Pause détente' },
        { time: '12h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
    {
      day: 'Samedi',
      note: 'Rassemblement',
      slots: [
        {
          time: '07h30',
          title: 'Rassemblement',
          desc: 'Avec la sœur préfète et le directeur des études',
        },
        { time: '08h00', title: 'Cours', desc: 'Maths, Philosophie, Langues' },
        { time: '11h30', title: 'Fin', desc: 'Retour à la maison' },
      ],
    },
  ],
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkMode', isDark.value)
}

const nextSlide = () => {
  const maxSlide = schedule[activeLevel.value].length - visibleSlides.value
  currentSlide.value = currentSlide.value >= maxSlide ? 0 : currentSlide.value + 1
}

const prevSlide = () => {
  const maxSlide = schedule[activeLevel.value].length - visibleSlides.value
  currentSlide.value = currentSlide.value <= 0 ? maxSlide : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoSlide = () => {
  if (autoSlideInterval.value) clearInterval(autoSlideInterval.value)
  autoSlideInterval.value = setInterval(() => {
    if (!isAutoSlidePaused.value) {
      nextSlide()
    }
  }, 5000)
}

const pauseAutoSlide = () => {
  isAutoSlidePaused.value = true
}

const resumeAutoSlide = () => {
  isAutoSlidePaused.value = false
}

const updateVisibleSlides = () => {
  if (window.innerWidth >= 1024) {
    visibleSlides.value = 3
  } else if (window.innerWidth >= 768) {
    visibleSlides.value = 2
  } else {
    visibleSlides.value = 1
  }
}

watch(activeLevel, () => {
  currentSlide.value = 0
})

onMounted(() => {
  if (localStorage.getItem('darkMode') === 'true') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  updateVisibleSlides()
  window.addEventListener('resize', updateVisibleSlides)
  startAutoSlide()
})

onUnmounted(() => {
  if (autoSlideInterval.value) clearInterval(autoSlideInterval.value)
  window.removeEventListener('resize', updateVisibleSlides)
})
</script>

<style>
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-25px) rotate(3deg);
  }
  66% {
    transform: translateY(15px) rotate(-3deg);
  }
}
.animate-float {
  animation: float infinite ease-in-out;
}

/* Animation pour les slides */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s ease-in-out;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
