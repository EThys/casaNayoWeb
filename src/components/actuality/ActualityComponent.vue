<template>
  <section
    class="news-section py-24 px-6 md:px-12 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden"
  >
    <!-- Éléments décoratifs de fond -->
    <div
      class="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl -z-10"
    ></div>

    <div class="max-w-7xl mx-auto">
      <!-- En-tête de section -->
      <div class="text-center mb-16 relative">
        <div
          class="inline-flex items-center justify-center mb-4 px-4 py-2 bg-blue-100 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-blue-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <span class="text-blue-600 font-medium">Actualités récentes</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Actualités & Événements</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Restez informé des dernières nouvelles, événements et activités de notre établissement.
        </p>
      </div>

      <!-- Filtres de catégories -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="(category, index) in categories"
          :key="index"
          @click="activeCategory = category"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
            activeCategory === category
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm',
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Grille des actualités -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(news, index) in filteredNews"
          :key="index"
          class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <!-- Image de l'actualité -->
          <div class="relative overflow-hidden h-56">
            <img
              :src="news.image"
              :alt="news.title"
              class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <!-- Badge de catégorie -->
            <div class="absolute top-4 left-4">
              <span
                class="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600"
              >
                {{ news.category }}
              </span>
            </div>
            <!-- Date -->
            <div class="absolute bottom-4 left-4 flex items-center text-white/90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
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
              <span class="text-sm">{{ news.date }}</span>
            </div>
          </div>

          <!-- Contenu de l'actualité -->
          <div class="p-6">
            <h3
              class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300"
            >
              {{ news.title }}
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ news.excerpt }}
            </p>
            <div class="flex items-center justify-between">
              <a
                href="#"
                class="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300"
              >
                Lire la suite
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <div class="flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                <span class="text-xs">{{ news.views }} vues</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Événements à venir -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-16">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Événements à venir</h3>
            <p class="text-gray-600">Ne manquez pas nos prochains événements importants</p>
          </div>
          <button
            class="px-6 py-3 bg-white border border-gray-200 rounded-lg text-blue-600 font-medium hover:bg-gray-50 transition-colors duration-300 shadow-sm"
          >
            Voir tous les événements
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(event, index) in upcomingEvents"
            :key="index"
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-lg flex flex-col items-center justify-center"
              >
                <span class="text-blue-600 font-bold text-lg">{{ event.day }}</span>
                <span class="text-blue-500 text-xs uppercase">{{ event.month }}</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">{{ event.title }}</h4>
                <div class="flex items-center text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                  {{ event.location }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
        <div class="text-center max-w-2xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Restez informé</h3>
          <p class="text-gray-600 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et événements
            directement dans votre boîte mail.
          </p>
          <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors duration-300"
              required
            />
            <button
              type="submit"
              class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md shadow-blue-500/25"
            >
              S'inscrire
            </button>
          </form>
          <p class="text-xs text-gray-400 mt-4">
            En vous inscrivant, vous acceptez notre politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Catégories d'actualités
const categories = ref(['Tous', 'Événements', 'Pédagogie', 'Vie scolaire', 'Projets', 'Sport'])
const activeCategory = ref('Tous')

// Données des actualités
const news = ref([
  {
    title: 'Journée Portes Ouvertes 2023',
    excerpt:
      'Venez découvrir notre établissement et nos formations lors de notre journée portes ouvertes le samedi 14 octobre.',
    category: 'Événements',
    date: '14 Oct 2023',
    image:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    views: 245,
  },
  {
    title: "Nouveau partenariat avec l'Université de Kinshasa",
    excerpt:
      "Signature d'une convention de partenariat pour favoriser l'orientation et la poursuite d'études de nos élèves.",
    category: 'Pédagogie',
    date: '8 Oct 2023',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    views: 187,
  },
  {
    title: 'Compétition sportive inter-classes',
    excerpt:
      'La grande compétition sportive annuelle se tiendra du 20 au 25 novembre. Inscriptions ouvertes !',
    category: 'Sport',
    date: '5 Oct 2023',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    views: 156,
  },
  {
    title: 'Projet écologique : jardin pédagogique',
    excerpt:
      'Les élèves de 4ème ont inauguré le nouveau jardin pédagogique dans le cadre du projet développement durable.',
    category: 'Projets',
    date: '2 Oct 2023',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    views: 203,
  },
  {
    title: 'Remise des diplômes 2023',
    excerpt:
      'Cérémonie de remise des diplômes pour les élèves de terminale qui ont obtenu leur baccalauréat.',
    category: 'Vie scolaire',
    date: '28 Sep 2023',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    views: 312,
  },
  {
    title: 'Ateliers de orientation professionnelle',
    excerpt:
      "Des professionnels viendront présenter leurs métiers et accompagner nos élèves dans leur projet d'orientation.",
    category: 'Pédagogie',
    date: '25 Sep 2023',
    image:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    views: 174,
  },
])

// Événements à venir
const upcomingEvents = ref([
  {
    day: '18',
    month: 'Oct',
    title: 'Réunion parents-professeurs',
    location: 'Salle de conférence',
  },
  { day: '21', month: 'Oct', title: 'Forum des métiers', location: 'Espace polyvalent' },
  { day: '28', month: 'Oct', title: 'Sortie pédagogique Musée', location: 'Musée National' },
])

// Filtrage des actualités par catégorie
const filteredNews = computed(() => {
  if (activeCategory.value === 'Tous') {
    return news.value
  }
  return news.value.filter((item) => item.category === activeCategory.value)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-section {
  scroll-margin-top: 2rem;
}

/* Animation d'entrée pour les cartes */
.grid > div {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

.grid > div:nth-child(1) {
  animation-delay: 0.1s;
}
.grid > div:nth-child(2) {
  animation-delay: 0.2s;
}
.grid > div:nth-child(3) {
  animation-delay: 0.3s;
}
.grid > div:nth-child(4) {
  animation-delay: 0.4s;
}
.grid > div:nth-child(5) {
  animation-delay: 0.5s;
}
.grid > div:nth-child(6) {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de survol amélioré pour les cartes */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>
