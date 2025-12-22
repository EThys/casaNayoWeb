<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps<{
  scrollProgress?: number
}>()

const containerRef = ref<HTMLElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let points: THREE.Points
let animationFrameId: number

const mouse = new THREE.Vector2(0, 0)
const targetMouse = new THREE.Vector2(0, 0)

const initThree = () => {
  if (!containerRef.value) return

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.domElement)

  // Particles
  const particlesCount = 3000
  const positions = new Float32Array(particlesCount * 3)
  const colors = new Float32Array(particlesCount * 3)
  const originalPositions = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    const val = (Math.random() - 0.5) * 15
    positions[i] = val
    originalPositions[i] = val
    colors[i] = Math.random()
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)

  const handleMouseMove = (event: MouseEvent) => {
    targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1
    targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', handleMouseMove)

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)
    
    // Smooth mouse movement
    mouse.x += (targetMouse.x - mouse.x) * 0.05
    mouse.y += (targetMouse.y - mouse.y) * 0.05

    // Rotation based on scroll and time
    const time = Date.now() * 0.0005
    points.rotation.y = time * 0.1 + (props.scrollProgress || 0) * 2
    points.rotation.x = time * 0.05

    // Magnetic interaction & Wave
    const positionsArray = geometry.attributes.position.array as Float32Array
    for (let i = 0; i < particlesCount; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      // Original base wave
      const ox = originalPositions[ix]
      const oz = originalPositions[iz]
      
      const wave = Math.sin(ox + time) * 0.2 + Math.cos(oz + time) * 0.2
      positionsArray[iy] = originalPositions[iy] + wave

      // Magnetic Attraction/Repulsion
      const dx = positionsArray[ix] - mouse.x * 5
      const dy = positionsArray[iy] - mouse.y * 5
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 2) {
        const force = (2 - dist) / 2
        positionsArray[ix] += dx * force * 0.02
        positionsArray[iy] += dy * force * 0.02
      } else {
        // Return to original (lazy spring)
        positionsArray[ix] += (originalPositions[ix] - positionsArray[ix]) * 0.01
      }
    }
    geometry.attributes.position.needsUpdate = true

    renderer.render(scene, camera)
  }

  animate()

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })
}

const handleResize = () => {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  initThree()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationFrameId)
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div ref="containerRef" class="fixed inset-0 z-0 pointer-events-none"></div>
</template>

<style scoped>
div {
  filter: blur(1px);
}
</style>
