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
  z-index: 99999;
}

/* Main Cursor Dot */
.cursor-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), 
              background 0.15s ease,
              width 0.15s ease,
              height 0.15s ease,
              box-shadow 0.15s ease;
  will-change: transform;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.6),
              0 0 30px rgba(16, 185, 129, 0.3);
}

.cursor-dot.cursor-hover {
  transform: translate(-50%, -50%) scale(1.5);
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  width: 14px;
  height: 14px;
  box-shadow: 0 0 20px rgba(52, 211, 153, 0.8),
              0 0 40px rgba(16, 185, 129, 0.4),
              0 0 60px rgba(16, 185, 129, 0.2);
}

.cursor-dot.cursor-click {
  transform: translate(-50%, -50%) scale(0.6);
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  box-shadow: 0 0 25px rgba(5, 150, 105, 1);
}

/* Follower Circle */
.cursor-follower {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2.5px solid rgba(16, 185, 129, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              height 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.3s ease,
              background 0.3s ease,
              box-shadow 0.3s ease;
  will-change: transform, width, height;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
}

.cursor-follower.follower-hover {
  width: 75px;
  height: 75px;
  border-color: rgba(52, 211, 153, 0.5);
  background: radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, transparent 70%);
  border-width: 3px;
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.2),
              0 0 50px rgba(16, 185, 129, 0.1);
}

.cursor-follower.follower-click {
  width: 35px;
  height: 35px;
  border-color: rgba(5, 150, 105, 0.7);
  background: radial-gradient(circle, rgba(5, 150, 105, 0.25) 0%, transparent 70%);
  box-shadow: 0 0 25px rgba(5, 150, 105, 0.3);
}

/* Hide on mobile/touch devices */
@media (hover: none) and (pointer: coarse) {
  .custom-cursor-container {
    display: none;
  }
}
</style>

