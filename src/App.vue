<template>
  <CustomCursor />
  <PageTransition />
  <router-view v-slot="{ Component, route }">
    <transition
      name="page"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import CustomCursor from '@/components/cursor/CustomCursor.vue'
import PageTransition from '@/components/PageTransition.vue'

const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'translateY(30px) scale(0.98)'
}

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  nextTick(() => {
    element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    element.style.opacity = '1'
    element.style.transform = 'translateY(0) scale(1)'
    
    setTimeout(() => {
      // Clear transition styles to avoid breaking fixed positioning
      element.style.transform = ''
      element.style.transition = ''
      done()
    }, 600)
  })
}

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.style.transition = 'all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53)'
  element.style.opacity = '0'
  element.style.transform = 'translateY(-20px) scale(1.02)'
  
  setTimeout(done, 400)
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  padding: 0 !important;
  margin: 0 !important;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

/* Smooth scrolling for app-like feel */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for web app feel */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Enhanced Page transitions */
.page-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

.page-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.02);
}

/* Smooth scroll behavior */
* {
  scroll-behavior: smooth;
}

/* Prevent layout shift during transitions */
.router-view-container {
  min-height: 100vh;
  position: relative;
}
</style>
