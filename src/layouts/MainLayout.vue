<script setup lang="ts">
import NavBarComponent from '@/components/navbar/NavBarComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'

interface Props {
  showFooter?: boolean
}

withDefaults(defineProps<Props>(), {
  showFooter: true
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Fixed Navbar -->
    <NavBarComponent />
    
    <!-- Main Content with padding-top to account for fixed navbar -->
    <main class="flex-1 pt-16">
      <slot />
    </main>
    
    <!-- Footer -->
    <FooterComponent v-if="showFooter" />
  </div>
</template>

<style scoped>
/* Ensure the layout takes full height */
main {
  min-height: calc(100vh - 4rem);
}
</style>

