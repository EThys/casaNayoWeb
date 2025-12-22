<template>
  <footer class="relative py-24 pb-12 overflow-hidden bg-[#1976D2] border-t border-white/5">
    <!-- Background Decor - Elite Style -->
    <div class="absolute inset-0 z-0">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
          class="w-full h-full object-cover opacity-20 mix-blend-overlay scale-110"
          alt="Footer background"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#1976D2] via-[#1976D2]/95 to-[#1976D2]/90"></div>
      </div>
      
      <!-- Premium Mesh Gradient -->
      <div class="absolute inset-0 opacity-40 mix-blend-overlay">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-white/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>
      
      <!-- Tech Grid Overlay -->
      <div class="absolute inset-0 opacity-[0.05] animate-grid-slide"
           style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 80px 80px;">
      </div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Content -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <!-- Brand Column -->
        <div class="md:col-span-12 lg:col-span-5 space-y-8">
          <div class="flex items-center group cursor-pointer">
            <div class="bg-white rounded-2xl p-3 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-[#1976D2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div class="ml-5">
              <h2 class="text-3xl font-black tracking-tighter text-white">casa<span class="text-white/80">Nayo</span></h2>
              <p class="text-[10px] font-black uppercase tracking-[0.4em] text-white">Elite Real Estate</p>
            </div>
          </div>
          
          <p class="text-white text-lg font-light leading-relaxed max-w-md">
            L'excellence immobilière à votre portée. Expertise, sérénité et accompagnement sur-mesure pour tous vos projets de vie.
          </p>
          
          <div class="flex space-x-4 pt-4">
            <a
              v-for="(social, i) in ['fb', 'tw', 'ig']"
              :key="i"
              href="#"
              class="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:-translate-y-1 transition-all duration-500 group shadow-lg"
            >
              <!-- Icons would go here, simplified for now -->
              <span class="text-xs font-black uppercase tracking-tight group-hover:text-white">{{ social }}</span>
            </a>
          </div>
        </div>

        <!-- Navigation Columns -->
        <div class="md:col-span-6 lg:col-span-3">
          <h3 class="text-xs font-black uppercase tracking-[0.3em] text-white mb-8 px-1 border-l-2 border-white/30">Support</h3>
          <ul class="space-y-4">
            <li>
              <router-link
                to="/help"
                class="text-white hover:underline decoration-white/30 underline-offset-8 transition-all duration-300 text-base font-light flex items-center group"
              >
                <span class="w-1.5 h-1.5 bg-white/0 rounded-full mr-0 group-hover:mr-3 group-hover:bg-white transition-all duration-300"></span>
                Centre d'aide
              </router-link>
            </li>
            <li v-for="item in ['Sécurité', 'Options d\'annulation']" :key="item">
              <a
                href="#"
                class="text-white hover:underline decoration-white/30 underline-offset-8 transition-all duration-300 text-base font-light flex items-center group"
              >
                <span class="w-1.5 h-1.5 bg-white/0 rounded-full mr-0 group-hover:mr-3 group-hover:bg-white transition-all duration-300"></span>
                {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <div class="md:col-span-6 lg:col-span-4">
          <h3 class="text-xs font-black uppercase tracking-[0.3em] text-white mb-8 px-1 border-l-2 border-white/30">Contact</h3>
          <ul class="space-y-6">
            <li class="flex items-center group cursor-pointer">
              <div class="bg-white/10 p-3 rounded-2xl mr-5 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white group-hover:text-[#1976D2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.9 5.3a2 2 0 002.2 0L21 8M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span class="block text-white/70 text-[10px] font-black uppercase tracking-widest">Email</span>
                <span class="text-white font-medium text-lg group-hover:translate-x-1 transition-transform inline-block">contact@casanayo.com</span>
              </div>
            </li>
            <li class="flex items-center group cursor-pointer">
              <div class="bg-white/10 p-3 rounded-2xl mr-5 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white group-hover:text-[#1976D2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.3a1 1 0 01.9.7l1.5 4.5a1 1 0 01-.5 1.2l-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.7.9V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
                </svg>
              </div>
              <div>
                <span class="block text-white/70 text-[10px] font-black uppercase tracking-widest">Phone</span>
                <span class="text-white font-medium text-lg group-hover:translate-x-1 transition-transform inline-block">+243 854 434 602</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-white/20 pt-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-white/70 text-sm font-light">
        <p>© 2025 <span class="text-white font-black uppercase tracking-tighter">casaNayo</span>. Tous droits réservés.</p>
        <div class="flex space-x-8">
          <router-link to="/contact" class="hover:text-white hover:underline underline-offset-4 transition-all">Contact</router-link>
          <router-link to="/mentions-legales" class="hover:text-white hover:underline underline-offset-4 transition-all">Mentions légales</router-link>
          <router-link to="/politique-confidentialite" class="hover:text-white hover:underline underline-offset-4 transition-all">Politique de confidentialité</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  font-family: 'Inter', sans-serif;
}
</style>
