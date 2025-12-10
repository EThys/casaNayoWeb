<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const follower = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const isHovering = ref(false)
const isClicking = ref(false)

let animationFrame: number | null = null

const updateCursor = (e: MouseEvent) => {
  cursor.value = { x: e.clientX, y: e.clientY }
  
  // Check if hovering over interactive element
  const target = e.target as HTMLElement
  isHovering.value = checkInteractiveElement(target)
  
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(animateFollower)
  }
}

const animateFollower = () => {
  const dx = cursor.value.x - follower.value.x
  const dy = cursor.value.y - follower.value.y
  
  // Smooth following with easing
  follower.value.x += dx * 0.15
  follower.value.y += dy * 0.15
  
  // Continue animation if there's still movement
  if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
    animationFrame = requestAnimationFrame(animateFollower)
  } else {
    animationFrame = null
  }
}

const checkInteractiveElement = (target: HTMLElement): boolean => {
  if (!target) return false
  
  return (
    target.tagName === 'A' ||
    target.tagName === 'BUTTON' ||
    target.tagName === 'INPUT' ||
    target.tagName === 'SELECT' ||
    target.tagName === 'TEXTAREA' ||
    target.closest('a') !== null ||
    target.closest('button') !== null ||
    target.closest('.cursor-pointer') !== null ||
    target.closest('[role="button"]') !== null ||
    target.style.cursor === 'pointer' ||
    window.getComputedStyle(target).cursor === 'pointer'
  )
}

const handleMouseMove = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  isHovering.value = checkInteractiveElement(target)
}

const handleMouseDown = () => {
  isClicking.value = true
}

const handleMouseUp = () => {
  isClicking.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursor)
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  
  // Initialize cursor position
  cursor.value = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  follower.value = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursor)
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mouseup', handleMouseUp)
  
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div class="custom-cursor-container">
    <!-- Main Cursor Dot -->
    <div
      class="cursor-dot"
      :class="{ 'cursor-hover': isHovering, 'cursor-click': isClicking }"
      :style="{
        left: `${cursor.x}px`,
        top: `${cursor.y}px`,
      }"
    ></div>
    
    <!-- Follower Circle -->
    <div
      class="cursor-follower"
      :class="{ 'follower-hover': isHovering, 'follower-click': isClicking }"
      :style="{
        left: `${follower.x}px`,
        top: `${follower.y}px`,
      }"
    ></div>
  </div>
</template>

<style scoped>
.custom-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

/* Main Cursor Dot */
.cursor-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), 
              background 0.15s ease,
              width 0.15s ease,
              height 0.15s ease;
  will-change: transform;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.cursor-dot.cursor-hover {
  transform: translate(-50%, -50%) scale(1.8);
  background: #2563eb;
  width: 12px;
  height: 12px;
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.7);
}

.cursor-dot.cursor-click {
  transform: translate(-50%, -50%) scale(0.7);
  background: #1e40af;
}

/* Follower Circle */
.cursor-follower {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2px solid rgba(59, 130, 246, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              height 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.3s ease,
              background 0.3s ease;
  will-change: transform, width, height;
  background: rgba(59, 130, 246, 0.05);
}

.cursor-follower.follower-hover {
  width: 70px;
  height: 70px;
  border-color: rgba(37, 99, 235, 0.6);
  background: rgba(37, 99, 235, 0.15);
  border-width: 2.5px;
}

.cursor-follower.follower-click {
  width: 35px;
  height: 35px;
  border-color: rgba(30, 64, 175, 0.8);
  background: rgba(30, 64, 175, 0.2);
}

/* Hide on mobile/touch devices */
@media (hover: none) and (pointer: coarse) {
  .custom-cursor-container {
    display: none;
  }
}
</style>

