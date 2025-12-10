<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-24 px-6 md:px-12 relative overflow-hidden"
  >
    <!-- Particules animées (plus subtiles et élégantes) -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div v-for="i in 15" :key="i" class="floating-particle" :style="particleStyle(i)"></div>
    </div>

    <div class="max-w-7xl mx-auto">
      <!-- Titre Section -->
      <div class="max-w-7xl mx-auto">
        <!-- Titre Section -->
        <div class="mb-20 opacity-0 animate-fade-in-up px-6 md:px-0">
          <span
            class="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold tracking-wider uppercase rounded-full shadow-sm mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Parcours Scolaire
          </span>

          <!-- Titre -->
          <h2
            class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 mt-4 leading-tight max-w-3xl"
          >
            Nos
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
              Niveaux
            </span>
            et
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400"
            >
              Sections
            </span>
          </h2>

          <!-- Sous-texte -->
          <p class="text-lg md:text-xl text-gray-600 max-w-2xl">
            Découvrez notre offre éducative complète, de la maternelle aux humanités, avec des
            sections adaptées à chaque projet d’avenir.
          </p>
        </div>
      </div>

      <!-- Grille des Niveaux -->
      <div ref="levelCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
        <div
          v-for="(level, i) in levels"
          :key="i"
          class="level-card opacity-0 transform translate-y-10 transition-all duration-700"
          :style="`--delay: ${i * 100}ms`"
        >
          <div
            class="group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full relative perspective-1000"
          >
            <!-- Image avec effet de zoom plus fluide -->
            <div class="h-48 overflow-hidden relative">
              <img
                :src="level.image"
                :alt="level.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-blue-700/20 to-transparent"></div>
              <!-- Icône avec effet de survol -->
              <div class="absolute top-4 left-4 z-10">
                <div
                  class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-50 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                >
                  <component :is="level.icon" class="h-6 w-6" :class="level.iconColor" />
                </div>
              </div>
            </div>
            <!-- Contenu -->
            <div class="p-8 text-center">
              <h3 class="text-2xl font-bold text-gray-800 mb-3">{{ level.title }}</h3>
              <p class="text-gray-600 leading-relaxed text-base">{{ level.description }}</p>
              <div class="mt-6 pt-4 border-t border-gray-100">
                <button
                  class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all transform"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Humanités -->
      <div class="mb-20 opacity-0 animate-fade-in-up px-6 md:px-0" style="animation-delay: 300ms">
        <!-- Bloc Titre -->
        <div class="relative mb-6">
          <!-- Accent décoratif -->
          <span
            class="absolute -left-4 top-2 h-12 w-1.5 rounded-full bg-gradient-to-b from-amber-400 to-yellow-500"
          ></span>

          <!-- Texte principal -->
          <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            Nos
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500"
            >
              Sections
            </span>
            en Humanités
          </h2>
        </div>

        <!-- Sous-texte -->
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl">
          En humanités, nous proposons trois sections pour préparer nos élèves à leur avenir
          académique et professionnel.
        </p>
      </div>

      <!-- Grille des Sections -->
      <div ref="sectionCards" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(section, i) in sections"
          :key="i"
          class="section-card opacity-0 transform translate-y-10 transition-all duration-700"
          :style="`--delay: ${i * 100}ms`"
        >
          <div
            class="group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full relative"
          >
            <div class="h-52 overflow-hidden relative">
              <img
                :src="section.image"
                :alt="section.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-blue-700/20 to-transparent"></div>
              <!-- Icône -->
              <div class="absolute top-4 left-4 z-10">
                <div
                  class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-50 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
                >
                  <component :is="section.icon" class="h-6 w-6" :class="section.iconColor" />
                </div>
              </div>
            </div>
            <!-- Contenu -->
            <div class="p-8 text-center">
              <h3 class="text-2xl font-bold text-gray-800 mb-3">{{ section.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ section.description }}</p>
              <div class="mt-6 pt-4 border-t border-gray-100">
                <button
                  class="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all transform"
                >
                  Découvrir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import {
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  ScaleIcon,
  BeakerIcon,
} from '@heroicons/vue/24/outline'

const levels = [
  {
    title: 'Maternelle',
    description:
      'Un environnement chaleureux et stimulant pour éveiller la curiosité et l’autonomie des tout-petits.',
    icon: UserGroupIcon,
    iconColor: 'text-blue-500',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Primaire',
    description:
      'Un enseignement structuré pour acquérir les bases solides en lecture, écriture, calcul et découverte du monde.',
    icon: AcademicCapIcon,
    iconColor: 'text-blue-600',
    image:
      'https://images.unsplash.com/photo-1577315861851-4d955e673e55?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Secondaire',
    description:
      'Un accompagnement personnalisé pour préparer les élèves aux défis académiques et humains de l’adolescence.',
    icon: BookOpenIcon,
    iconColor: 'text-amber-500',
    image:
      'https://images.unsplash.com/photo-1523241731259-69c5d2bda057?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Humanités',
    description:
      'Une préparation intensive aux études supérieures, avec des sections adaptées à chaque projet d’avenir.',
    icon: AcademicCapIcon,
    iconColor: 'text-yellow-500',
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  },
]

const sections = [
  {
    title: 'Commerciale & Gestion',
    description:
      'Pour les élèves intéressés par le monde des affaires, la gestion, le marketing et l’entrepreneuriat.',
    icon: BuildingStorefrontIcon,
    iconColor: 'text-amber-500',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Latin-Philosophie',
    description:
      'Pour les passionnés de lettres, de philosophie, d’histoire et de langues anciennes.',
    icon: ScaleIcon,
    iconColor: 'text-blue-500',
    image:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Scientifique',
    description:
      'Pour les esprits analytiques, avec un focus sur les mathématiques, la physique, la chimie et la biologie.',
    icon: BeakerIcon,
    iconColor: 'text-blue-600',
    image:
      'https://images.unsplash.com/photo-1571171637578-41bd244e5478?auto=format&fit=crop&w=1200&q=80',
  },
]

// Particules plus élégantes et moins nombreuses
const particleStyle = (i) => ({
  '--size': `${Math.random() * 4 + 2}px`,
  '--left': `${Math.random() * 100}%`,
  '--top': `${Math.random() * 100}%`,
  '--duration': `${Math.random() * 20 + 15}s`,
  '--delay': `${Math.random() * 3}s`,
  '--opacity': Math.random() * 0.3 + 0.1,
  '--color': ['#3b82f6', '#1d4ed8', '#f59e0b'][Math.floor(Math.random() * 3)],
})

// Animations au scroll
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.style.getPropertyValue('--delay') || '0ms'
          entry.target.style.transitionDelay = delay
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    },
    { threshold: 0.1 },
  )
  document.querySelectorAll('.level-card, .section-card').forEach((card) => {
    observer.observe(card)
  })
})
</script>

<style>
.floating-particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: var(--color);
  border-radius: 50%;
  left: var(--left);
  top: var(--top);
  opacity: var(--opacity);
  animation: float var(--duration) ease-in-out var(--delay) infinite;
}

.opacity-0 {
  opacity: 0;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(90deg);
  }
}
</style>
