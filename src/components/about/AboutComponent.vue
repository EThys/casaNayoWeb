<script setup>
import { onMounted, ref } from 'vue'
import {
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  ScaleIcon,
  FlagIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'

// Icônes pour les cartes de valeurs
const MissionIcon = AcademicCapIcon

const VisionIcon = GlobeAltIcon

const ValuesIcon = ShieldCheckIcon

const valueCards = ref([
  {
    title: 'Mission',
    content:
      'Former des leaders intègres et compétents, capables de transformer la société par leurs valeurs.',
    icon: MissionIcon,
  },
  {
    title: 'Vision',
    content:
      "Être une référence nationale en matière d'excellence académique et de formation humaine.",
    icon: VisionIcon,
  },
  {
    title: 'Valeurs',
    content: 'Discipline, solidarité, excellence et respect inspirent notre communauté éducative.',
    icon: ValuesIcon,
  },
])

// Génération de styles pour les particules d'arrière-plan améliorées
const particleStyle = (index) => {
  const size = Math.random() * 8 + 2
  const duration = Math.random() * 15 + 15
  const delay = Math.random() * 5
  const opacity = Math.random() * 0.3 + 0.1
  const colors = [
    `rgba(59, 130, 246, ${opacity})`,
    `rgba(99, 102, 241, ${opacity})`,
    `rgba(139, 92, 246, ${opacity})`,
    `rgba(168, 85, 247, ${opacity})`,
  ]
  const color = colors[Math.floor(Math.random() * colors.length)]

  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animation: `float ${duration}s ease-in-out ${delay}s infinite`,
    backgroundColor: color,
    boxShadow: `0 0 ${size * 2}px ${size}px ${color}`,
  }
}

onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated')

        // Animation supplémentaire pour les cartes
        if (entry.target.classList.contains('animate-card')) {
          const delay = entry.target.style.animationDelay || '0s'
          setTimeout(
            () => {
              entry.target.classList.add('pop-in')
            },
            parseFloat(delay) * 1000 + 500,
          )
        }
      }
    })
  }, observerOptions)

  // Observer tous les éléments avec des classes d'animation
  document.querySelectorAll('[class*="animate-"]').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<template>
  <div
    class="about-section min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden relative"
  >
    <!-- Background animé avec particules améliorées -->
    <div class="particles-container absolute inset-0 -z-10 overflow-hidden">
      <div v-for="i in 50" :key="i" class="particle" :style="particleStyle(i)"></div>
    </div>

    <!-- Nouveaux éléments de background géométriques -->
    <div class="geometric-shapes absolute inset-0 overflow-hidden -z-10">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <!-- Décoration en background améliorée avec animation morphing -->
    <div
      class="blob absolute top-10 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 animate-blob"
    ></div>
    <div
      class="blob absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-indigo-300/20 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"
    ></div>
    <div
      class="blob absolute top-1/2 left-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl -z-10 animate-blob animation-delay-4000"
    ></div>

    <section class="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <!-- Introduction avec animation améliorée -->
      <div class="grid md:grid-cols-2 gap-16 items-center mb-32">
        <div class="animate-slide-in-left">
          <div class="mb-8">
            <span class="text-[#124170] font-semibold tracking-wider uppercase"
              >Notre Héritage</span
            >
            <h2 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight mt-4">
              Notre
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-[#124170] to-[#124170] relative"
              >
                Histoire
                <svg
                  class="absolute -bottom-4 left-0 w-full"
                  viewBox="0 0 200 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 18C50 18 100 10 200 10"
                    stroke="url(#underline-gradient)"
                    stroke-width="4"
                    fill="none"
                    stroke-linecap="round"
                  />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#3b82f6" />
                      <stop offset="100%" stop-color="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
          </div>
          <p class="text-lg md:text-xl leading-relaxed text-gray-700 mb-8">
            Fondé en 1996 par la Congrégation des
            <span class="font-semibold text-blue-700 relative inline-block highlight-text"
              >Sœurs de Saintes Marie de Matadi (SSMM)</span
            >, le
            <span class="font-semibold text-blue-700 relative inline-block highlight-text"
              >Complexe Scolaire Mont Thabor</span
            >
            s'engage à offrir une éducation complète et de qualité, alliant excellence académique et
            formation humaine.
          </p>
          <div class="flex items-center space-x-4 mt-10">
            <div class="flex items-center bg-white rounded-full p-2 shadow-md">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span class="mx-3 font-bold text-blue-900">26+ Ans d'Excellence</span>
            </div>
          </div>
        </div>

        <!-- Conteneur d'images avec superposition moderne amélioré -->
        <div class="relative animate-slide-in-right">
          <!-- Image principale avec effet de profondeur amélioré -->
          <div
            class="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/50 relative image-container z-10 group"
          >
            <img
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
              alt="Notre histoire"
              class="w-full h-96 object-cover transform transition-all duration-1000 group-hover:scale-110"
            />
            <div class="image-overlay"></div>

            <!-- Badge superposé amélioré -->
            <div
              class="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20 transform transition-all duration-300 hover:scale-105"
            >
              <div
                class="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span class="font-bold text-blue-800">Depuis 1996</span>
            </div>
          </div>

          <!-- Deuxième image superposée en angle améliorée -->
          <div
            class="absolute -bottom-6 -right-6 w-48 h-60 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/80 z-20 transform rotate-6 transition-all duration-700 hover:rotate-3 hover:shadow-3xl"
          >
            <img
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
              alt="Étudiants du Complexe Scolaire Mont Thabor"
              class="w-full h-full object-cover transform transition-all duration-700 hover:scale-110"
            />
            <!-- Encadré décoratif amélioré -->
            <div
              class="absolute inset-0 border-2 border-white/50 rounded-2xl pointer-events-none"
            ></div>
          </div>

          <!-- Troisième élément décoratif amélioré -->
          <div
            class="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl shadow-xl z-0 transform -rotate-12 flex items-center justify-center transition-all duration-700 hover:rotate-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>

          <!-- Ligne décorative connectant les éléments améliorée -->
          <svg
            class="absolute top-1/2 right-16 w-24 h-24 text-blue-300/50 z-10"
            viewBox="0 0 100 100"
          >
            <path
              d="M10,50 Q30,30 50,50 T90,50"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-dasharray="5,5"
            />
          </svg>
        </div>
      </div>

      <!-- Section Valeurs avec design amélioré -->
      <div class="grid md:grid-cols-3 gap-10 mb-32">
        <div
          v-for="(card, index) in valueCards"
          :key="card.title"
          class="relative group animate-card"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <div
            class="h-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-200"
          >
            <!-- Icône -->
            <div
              class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-200/50 transition-all duration-500"
            >
              <component :is="card.icon" class="w-8 h-8 text-white" />
            </div>

            <!-- Titre -->
            <h3 class="text-2xl font-extrabold tracking-tight text-gray-900 mb-3">
              {{ card.title }}
            </h3>

            <!-- Contenu -->
            <p class="text-gray-600 leading-relaxed text-lg">
              {{ card.content }}
            </p>

            <!-- Accent border -->
            <div
              class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Animations d'entrée améliorées */
.animate-slide-in-left {
  opacity: 0;
  transform: translateX(-50px) rotate3d(0, 1, 0, 15deg);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-slide-in-right {
  opacity: 0;
  transform: translateX(50px) rotate3d(0, 1, 0, -15deg);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-card {
  opacity: 0;
  transform: translateY(30px) scale(0.95) rotateX(10deg);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* États animés */
.animated {
  opacity: 1;
  transform: translate(0) scale(1) rotate3d(0, 0, 0, 0deg);
}

.pop-in {
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Nouvelles animations keyframes */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(5deg);
  }
  66% {
    transform: translateY(10px) rotate(-5deg);
  }
}

@keyframes blob {
  0%,
  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: scale(1) rotate(0deg);
  }
  25% {
    border-radius: 50% 60% 70% 40% / 60% 50% 50% 60%;
    transform: scale(1.05) rotate(5deg);
  }
  50% {
    border-radius: 40% 60% 70% 30% / 40% 60% 40% 70%;
    transform: scale(1.1) rotate(-5deg);
  }
  75% {
    border-radius: 70% 30% 50% 50% / 30% 70% 60% 70%;
    transform: scale(1.05) rotate(3deg);
  }
}

@keyframes popIn {
  0% {
    transform: scale(1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes float-slower {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-blob {
  animation: blob 15s ease-in-out infinite both;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 8s ease-in-out infinite;
}

/* Styles pour les particules améliorées */
.particles-container {
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(1px);
}

/* Nouveaux éléments géométriques */
.geometric-shapes {
  pointer-events: none;
}

.shape {
  position: absolute;
  opacity: 0.03;
  background: linear-gradient(45deg, #3b82f6, #6366f1);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  animation: float-slow 15s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 15%;
  right: 10%;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  animation: float-slower 20s ease-in-out infinite;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 40%;
  right: 20%;
  clip-path: circle(50% at 50% 50%);
  animation: float-slow 18s ease-in-out infinite reverse;
}

.shape-4 {
  width: 250px;
  height: 250px;
  bottom: 25%;
  left: 15%;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: float-slower 22s ease-in-out infinite;
}

/* Overlay d'image amélioré */
.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

/* Effet de surlignage pour le texte */
.highlight-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to top, rgba(59, 130, 246, 0.2) 0%, transparent 100%);
  z-index: -1;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease;
}

.highlight-text:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* Bouton CTA amélioré */
.cta-button {
  background: white;
  color: #1e40af;
  font-weight: bold;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: inline-flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  border: none;
  outline: none;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.cta-button:active {
  transform: translateY(-1px);
}

/* Animation des icônes améliorée */
.icon-container {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.icon-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.3) 100%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.icon-container:hover::after {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .geometric-shapes {
    display: none;
  }

  .shape {
    display: none;
  }
}
</style>
