import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '.scroll-reveal', options = {}) {
  let observer: IntersectionObserver | null = null

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  }

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          // Optionnel: arrêter d'observer après l'animation
          if (entry.target.classList.contains('scroll-reveal-once')) {
            observer?.unobserve(entry.target)
          }
        } else {
          // Retirer la classe si l'élément sort de la vue (pour animations répétées)
          if (!entry.target.classList.contains('scroll-reveal-once')) {
            entry.target.classList.remove('is-visible')
          }
        }
      })
    }, defaultOptions)

    // Observer tous les éléments avec la classe selector
    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => observer?.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    observer,
  }
}
