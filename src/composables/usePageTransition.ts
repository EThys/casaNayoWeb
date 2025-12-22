import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export type TransitionType = 'fade' | 'slide' | 'zoom' | 'default'

export function usePageTransition() {
  const route = useRoute()
  const transitionName = ref<TransitionType>('default')
  const isTransitioning = ref(false)

  // Définir le type de transition selon la route
  const getTransitionType = (path: string): TransitionType => {
    if (path.includes('/login') || path.includes('/register')) {
      return 'zoom'
    }
    if (path.includes('/property/') || path.includes('/service/')) {
      return 'slide'
    }
    return 'fade'
  }

  watch(
    () => route.path,
    (newPath) => {
      isTransitioning.value = true
      transitionName.value = getTransitionType(newPath)

      setTimeout(() => {
        isTransitioning.value = false
      }, 600)
    },
    { immediate: true },
  )

  return {
    transitionName,
    isTransitioning,
  }
}



