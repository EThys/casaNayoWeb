<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as PIXI from 'pixi.js'

const props = defineProps<{
  imageUrl: string
}>()

const pixiContainer = ref<HTMLElement | null>(null)
let app: PIXI.Application | null = null
let displacementSprite: PIXI.Sprite | null = null
let displacementFilter: PIXI.DisplacementFilter | null = null
let bg: PIXI.Sprite | null = null

onMounted(async () => {
  if (!pixiContainer.value) return

  // Initialize Pixi App
  app = new PIXI.Application()
  await app.init({
    resizeTo: pixiContainer.value,
    backgroundAlpha: 0,
    antialias: true,
  })

  pixiContainer.value.appendChild(app.canvas)

  // Load textures
  const texture = await PIXI.Assets.load(props.imageUrl)
  const displacementTexture = await PIXI.Assets.load('https://res.cloudinary.com/dg60jz0yc/image/upload/v1502444104/displacement_map_repeat_vunm0i.jpg')

  // Create Background Sprite
  bg = new PIXI.Sprite(texture)
  bg.width = app.screen.width
  bg.height = app.screen.height
  bg.anchor.set(0.5)
  bg.position.set(app.screen.width / 2, app.screen.height / 2)
  
  // Aspect Ratio Correction
  const ratio = texture.width / texture.height
  const screenRatio = app.screen.width / app.screen.height
  if (screenRatio > ratio) {
    bg.width = app.screen.width
    bg.height = app.screen.width / ratio
  } else {
    bg.height = app.screen.height
    bg.width = app.screen.height * ratio
  }

  // Create Displacement Filter
  displacementSprite = new PIXI.Sprite(displacementTexture)
  // Fix for PixiJS 8: Setup wrap mode for repetition
  if (displacementTexture.source) {
    displacementTexture.source.addressMode = 'repeat'
  }
  displacementFilter = new PIXI.DisplacementFilter({ sprite: displacementSprite, scale: 50 })
  
  app.stage.addChild(bg)
  app.stage.addChild(displacementSprite)
  bg.filters = [displacementFilter]

  // Animation Loop
  app.ticker.add(() => {
    if (displacementSprite) {
      displacementSprite.x += 1
      displacementSprite.y += 0.5
    }
  })

  // Resize handling
  window.addEventListener('resize', handleResize)
})

const handleResize = () => {
  if (!app || !bg) return
  bg.width = app.screen.width
  bg.height = app.screen.height
  const ratio = bg.texture.width / bg.texture.height
  const screenRatio = app.screen.width / app.screen.height
  if (screenRatio > ratio) {
    bg.width = app.screen.width
    bg.height = app.screen.width / ratio
  } else {
    bg.height = app.screen.height
    bg.width = app.screen.height * ratio
  }
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (app) {
    app.destroy(true, { children: true, texture: true })
  }
})

// Expose mouse interaction
const handleMouseMove = (e: MouseEvent) => {
  if (!displacementFilter) return
  const { clientX, clientY } = e
  // We can vary the scale or position based on mouse if desired
  // For now, let's just use the ticker animation for a constant liquid feel
}

defineExpose({ handleMouseMove })
</script>

<template>
  <div ref="pixiContainer" class="absolute inset-0 z-0 pointer-events-none"></div>
</template>

<style scoped>
canvas {
  display: block;
}
</style>
