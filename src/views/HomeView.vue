<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import MainLayout from '@/layouts/MainLayout.vue'
import HeroComponent from '@/components/hero/HeroComponent.vue'
import CategorySection from '@/components/property/CategorySection.vue'
import ServicesSection from '@/components/services/ServicesSection.vue'
import ProfessionalServicesSection from '@/components/services/ProfessionalServicesSection.vue'
import FeaturesSection from '@/components/features/FeaturesSection.vue'
import MobileAppSection from '@/components/mobile/MobileAppSection.vue'
import ThreeBackground from '@/components/common/ThreeBackground.vue'
import { fetchProperties } from '@/services/api'
import { transformApiPropertiesToProperties } from '@/utils/propertyTransformer'
import type { Property, Service } from '@/types/property'

gsap.registerPlugin(ScrollTrigger)

const mainContent = ref<HTMLElement | null>(null)
const cursorDot = ref<HTMLElement | null>(null)
const cursorRing = ref<HTMLElement | null>(null)
const cursorText = ref<HTMLElement | null>(null)
const allProperties = ref<Property[]>([])
const isLoading = ref(true)
const scrollProgress = ref(0)
let lenis: Lenis | null = null

const propertiesForSale = computed(() => {
  return allProperties.value.filter((p) => p.status === 'for-sale').slice(0, 8)
})

const propertiesForRent = computed(() => {
  return allProperties.value.filter((p) => p.status === 'for-rent').slice(0, 8)
})

const loadProperties = async () => {
  try {
    isLoading.value = true
    const response = await fetchProperties({ size: 20 })
    allProperties.value = transformApiPropertiesToProperties(response.properties.content)
  } catch (error) {
    console.error('Error loading properties:', error)
    allProperties.value = []
  } finally {
    isLoading.value = false
  }
}

const initLenis = () => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on('scroll', (e: any) => {
    scrollProgress.value = e.progress
    ScrollTrigger.update()
  })

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
}

const initCursor = () => {
  if (!cursorDot.value || !cursorRing.value) return
  
  const dot = cursorDot.value
  const ring = cursorRing.value
  const text = cursorText.value
  
  const mouse = { x: 0, y: 0 }
  const dotPos = { x: 0, y: 0 }
  const ringPos = { x: 0, y: 0 }
  
  const dotQuickX = gsap.quickSetter(dot, "x", "px")
  const dotQuickY = gsap.quickSetter(dot, "y", "px")
  const ringQuickX = gsap.quickSetter(ring, "x", "px")
  const ringQuickY = gsap.quickSetter(ring, "y", "px")

  window.addEventListener("mousemove", e => {    
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  gsap.ticker.add(() => {
    // Dot follows mouse with small lag
    dotPos.x += (mouse.x - dotPos.x) * 0.4
    dotPos.y += (mouse.y - dotPos.y) * 0.4
    dotQuickX(dotPos.x)
    dotQuickY(dotPos.y)
    
    // Ring follows with more lag (inertia)
    ringPos.x += (mouse.x - ringPos.x) * 0.15
    ringPos.y += (mouse.y - ringPos.y) * 0.15
    ringQuickX(ringPos.x)
    ringQuickY(ringPos.y)
  })

  // Magnetic Snapping & Morphing
  const updateCursor = (type: string, content: string = '', target: HTMLElement | null = null) => {
    if (text) text.innerText = content
    
    if (target && type === 'button') {
        const rect = target.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        // Snap dot to center, ring expands
        gsap.to(dot, { x: centerX, y: centerY, scale: 0.3, duration: 0.3 })
        gsap.to(ring, { x: centerX, y: centerY, scale: 1.8, backgroundColor: 'rgba(25, 118, 210, 0.2)', borderWidth: '1px', duration: 0.3 })
        return
    }

    switch (type) {
      case 'link':
        gsap.to(ring, { scale: 1.5, borderWidth: '1px', backgroundColor: 'rgba(25, 118, 210, 0.1)', duration: 0.4, ease: 'power2.out' })
        gsap.to(dot, { scale: 0.5, opacity: 0, duration: 0.3 })
        break
      case 'explore':
        gsap.to(ring, { scale: 4, borderWidth: '0px', backgroundColor: 'rgba(25, 118, 210, 0.9)', duration: 0.5, ease: 'back.out(1.7)' })
        gsap.to(text, { opacity: 1, duration: 0.3 })
        gsap.to(dot, { opacity: 0, duration: 0.3 })
        break
      default:
        gsap.to(ring, { scale: 1, borderWidth: '2px', backgroundColor: 'transparent', mixBlendMode: 'normal', duration: 0.4 })
        gsap.to(text, { opacity: 0, duration: 0.2 })
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 })
    }
  }

  // Event Delegation for performance
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement
    const interactive = target.closest('a, button, .group, .clickable') as HTMLElement
    if (interactive) {
      if (interactive.tagName === 'BUTTON' || interactive.classList.contains('btn')) {
          updateCursor('button', '', interactive)
      } else if (interactive.classList.contains('property-card') || interactive.closest('.property-card')) {
        updateCursor('explore', 'VOIR')
      } else {
        updateCursor('link')
      }
    }
  })

  document.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button, .group, .clickable')) {
      updateCursor('default')
    }
  })
}

const initAnimations = () => {
  if (!mainContent.value) return

  // 3D Section Entrance
  const sections = mainContent.value.querySelectorAll('.section-container')
  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 80, // Reduced from 150 to minimize gap
      scale: 0.98,
      rotateX: 10,
      transformOrigin: 'top center',
      duration: 1.5,
      ease: 'expo.out',
    })
  })

  // Robust Split-Text Reveal
  const titles = document.querySelectorAll('h2')
  titles.forEach(title => {
    if (title.querySelector('.char')) return
    
    // Preserve spaces by wrapping them too
    const textStr = title.innerText.trim()
    title.innerHTML = textStr.split('').map(char => {
      const isSpace = char === ' '
      return `<span class="char" style="display:inline-block; white-space: pre;">${isSpace ? ' ' : char}</span>`
    }).join('')
    
    gsap.from(title.querySelectorAll('.char'), {
      scrollTrigger: {
        trigger: title,
        start: 'top 95%',
      },
      y: 60,
      opacity: 0,
      rotateY: 90,
      rotateX: 45,
      filter: 'blur(10px)',
      stagger: 0.03,
      duration: 1.2,
      ease: 'back.out(1.7)',
    })
  })
}

onMounted(() => {
  loadProperties()
  initLenis()
  initCursor()
  initAnimations()
})

onUnmounted(() => {
  lenis?.destroy()
  ScrollTrigger.getAll().forEach((t) => t.kill())
})

// Correct Mock Data Mapping (Ensuring consistency)
const movingServices = ref<Service[]>([
  { id: 'm1', title: 'Déménagement complet Kinshasa', description: 'Service de déménagement professionnel', price: 800, location: 'Kinshasa', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], features: ['Emballage'], category: 'moving-service', rating: 4.9, reviews: 127 },
  { id: 'm2', title: 'Déménagement express', description: 'Rapide en 24h', price: 600, location: 'Lubumbashi', images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800'], features: ['Rapidité'], category: 'moving-service', rating: 4.8, reviews: 89 },
  { id: 'm3', title: 'Longue distance', description: 'Inter-villes', price: 1200, location: 'Toute la RDC', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], features: ['Stockage'], category: 'moving-service', rating: 4.7, reviews: 156 },
  { id: 'm4', title: 'Déménagement pro', description: 'Bureaux & résidences', price: 750, location: 'Goma', images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800'], features: ['Professionnel'], category: 'moving-service', rating: 4.9, reviews: 94 },
])

const butlerServices = ref<Service[]>([
  { id: 'b1', title: 'Majordome résidentiel', description: 'Gestion foyer', price: 2500, location: 'Gombe, Kinshasa', images: ['https://images.unsplash.com/photo-1556912172-45b7abe8b7e8?w=800'], features: ['Service repas'], category: 'butler-service', rating: 5.0, reviews: 45 },
  { id: 'b2', title: 'Majordome événementiel', description: 'Réceptions', price: 500, location: 'Lubumbashi', images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'], features: ['Service événements'], category: 'butler-service', rating: 4.9, reviews: 78 },
  { id: 'b3', title: 'Conciergerie premium', description: 'Tous vos besoins', price: 800, location: 'Ngaliema, Kinshasa', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'], features: ['Courses'], category: 'butler-service', rating: 4.8, reviews: 112 },
  { id: 'b4', title: 'Majordome de luxe', description: 'Premium', price: 3500, location: 'Gombe, Kinshasa', images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'], features: ['24/7'], category: 'butler-service', rating: 5.0, reviews: 23 },
])
</script>

<template>
  <MainLayout>
    <div ref="mainContent" class="home-view min-h-screen bg-white relative">
      <!-- Custom Liquid Magnetic Cursor -->
      <div class="fixed top-0 left-0 pointer-events-none z-[10000] hidden lg:block">
        <div ref="cursorRing" class="absolute w-12 h-12 border-2 border-[#1976D2] rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center">
            <span ref="cursorText" class="text-[10px] font-black text-white opacity-0 tracking-widest leading-none"></span>
        </div>
        <div ref="cursorDot" class="absolute w-1.5 h-1.5 bg-[#1976D2] rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"></div>
      </div>

      <!-- Three.js Background -->
      <ThreeBackground :scroll-progress="scrollProgress" />

      <div class="relative z-10">
        <!-- Hero Section -->
        <HeroComponent />

        <div class="section-container">
          <CategorySection
            title="Propriétés à vendre"
            subtitle="Découvrez notre sélection de biens immobiliers à vendre en RDC"
            :properties="propertiesForSale"
            category="for-sale"
            variant="white"
            :limit="4"
          />
        </div>

        <div class="section-container">
          <CategorySection
            title="Propriétés à louer"
            subtitle="Trouvez votre prochain logement à louer"
            :properties="propertiesForRent"
            category="for-rent"
            variant="white"
            :limit="4"
          />
        </div>

        <div class="section-container">
          <FeaturesSection variant="blue" />
        </div>

        <div class="section-container">
          <ProfessionalServicesSection variant="white" />
        </div>

        <div class="section-container">
          <CategorySection
            title="Déménagement"
            subtitle="Déménagez en toute sérénité"
            :services="movingServices"
            category="moving-service"
            variant="blue"
            :limit="4"
          />
        </div>

        <div class="section-container">
          <CategorySection
            title="Majordome & Conciergerie"
            subtitle="Un service professionnel pour votre confort"
            :services="butlerServices"
            category="butler-service"
            variant="white"
            :limit="4"
          />
        </div>

        <div class="section-container">
          <ServicesSection variant="blue" />
        </div>

        <div class="section-container">
          <MobileAppSection variant="white" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style>
/* Global smooth scroll support */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

.home-view {
  font-family: 'Inter', sans-serif;
  cursor: none !important; /* Hide default cursor on desktop */
}

@media (max-width: 1024px) {
  .home-view {
    cursor: auto !important;
  }
}

.section-container {
  will-change: transform, opacity;
  position: relative;
  width: 100%;
}

.char {
  will-change: transform, opacity;
}
</style>
