# 🎨 Guide des Transitions et Animations

Ce projet utilise un système complet de transitions et d'animations pour offrir une expérience utilisateur fluide et moderne.

## 📦 Composants de Transition

### 1. PageTransition
Loader automatique qui s'affiche lors de la navigation entre les pages.

**Caractéristiques :**
- Barre de progression animée en haut de la page
- Spinner avec logo CasaNayo
- Messages de chargement par étapes
- Pourcentage de progression
- Animations fluides

**Utilisation :**
Le composant est déjà intégré dans `App.vue` et s'active automatiquement lors des changements de route.

### 2. Transitions de Page
Animations personnalisées pour chaque changement de page.

**Types de transitions disponibles :**
- `fade` : Fondu avec légère translation verticale (par défaut)
- `slide` : Glissement horizontal (pour les détails de propriété/service)
- `zoom` : Zoom in/out (pour les pages de connexion/inscription)

**Comment ça marche :**
Les transitions sont automatiquement sélectionnées selon la route dans `App.vue`.

## 🎭 Animations au Scroll

### Utilisation de useScrollReveal

```vue
<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'

// Activer les animations au scroll
useScrollReveal('.scroll-reveal')
</script>

<template>
  <div class="scroll-reveal">
    Ce contenu apparaîtra avec une animation au scroll
  </div>
</template>
```

### Classes CSS disponibles

#### scroll-reveal (défaut)
Apparition depuis le bas avec fondu
```html
<div class="scroll-reveal">Contenu</div>
```

#### scroll-reveal-left
Apparition depuis la gauche
```html
<div class="scroll-reveal scroll-reveal-left">Contenu</div>
```

#### scroll-reveal-right
Apparition depuis la droite
```html
<div class="scroll-reveal scroll-reveal-right">Contenu</div>
```

#### scroll-reveal-scale
Apparition avec effet de zoom
```html
<div class="scroll-reveal scroll-reveal-scale">Contenu</div>
```

#### scroll-reveal-rotate
Apparition avec rotation
```html
<div class="scroll-reveal scroll-reveal-rotate">Contenu</div>
```

#### Animation unique (scroll-reveal-once)
Pour que l'animation ne se joue qu'une seule fois :
```html
<div class="scroll-reveal scroll-reveal-once">Contenu</div>
```

## 🎯 Personnalisation

### Modifier le PageTransition

Éditez `/src/components/PageTransition.vue` pour :
- Changer les messages de chargement
- Ajuster la vitesse de progression
- Modifier le design du loader

### Créer des transitions personnalisées

Dans `/src/assets/main.css`, ajoutez vos propres animations :

```css
.scroll-reveal-custom {
  opacity: 0;
  transform: /* votre transformation */;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-reveal-custom.is-visible {
  opacity: 1;
  transform: /* état final */;
}
```

### Délais d'animation échelonnés

Pour créer des animations séquentielles :

```html
<div class="scroll-reveal stagger-1">Apparaît en premier</div>
<div class="scroll-reveal stagger-2">Apparaît ensuite</div>
<div class="scroll-reveal stagger-3">Apparaît en dernier</div>
```

Classes disponibles : `.stagger-1` à `.stagger-8` (0.1s à 0.8s)

## 🚀 Meilleures Pratiques

1. **Performance** : N'utilisez pas trop d'animations scroll-reveal sur une même page
2. **Accessibilité** : Les animations respectent `prefers-reduced-motion`
3. **Mobile** : Toutes les animations sont optimisées pour mobile
4. **SEO** : Les animations ne bloquent pas le rendu initial

## 📱 Exemples d'Utilisation

### Page avec sections animées

```vue
<template>
  <div class="page">
    <section class="scroll-reveal">
      <h2>Titre de section</h2>
      <p>Contenu...</p>
    </section>

    <div class="grid grid-cols-3 gap-4">
      <div class="scroll-reveal stagger-1">Carte 1</div>
      <div class="scroll-reveal stagger-2">Carte 2</div>
      <div class="scroll-reveal stagger-3">Carte 3</div>
    </div>

    <section class="scroll-reveal scroll-reveal-scale">
      <h2>Section avec zoom</h2>
    </section>
  </div>
</template>

<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'
useScrollReveal()
</script>
```

### Liste avec animations séquentielles

```vue
<template>
  <div class="property-list">
    <div
      v-for="(property, index) in properties"
      :key="property.id"
      class="scroll-reveal"
      :class="`stagger-${Math.min(index + 1, 8)}`"
    >
      {{ property.name }}
    </div>
  </div>
</template>

<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'
useScrollReveal()
</script>
```

## 🎨 Animations Disponibles

### Dans le Hero
- Carrousel de textes avec effet slide-fade
- Particules flottantes
- Grilles animées
- Formes géométriques rotatives
- Lignes lumineuses animées

### Dans les pages de Login/Register
- Effets de flottement en arrière-plan
- Transitions fluides des formulaires
- Loading states élégants
- Animations des boutons sociaux

## 🔧 Configuration Avancée

### Modifier les options de l'IntersectionObserver

```vue
<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal('.scroll-reveal', {
  threshold: 0.2,  // Plus de 20% de l'élément doit être visible
  rootMargin: '0px 0px -100px 0px'  // Déclencher 100px avant le bas de la vue
})
</script>
```

## 💡 Astuces

1. **Combiner les animations** : Vous pouvez combiner plusieurs classes
   ```html
   <div class="scroll-reveal scroll-reveal-left stagger-2">...</div>
   ```

2. **Désactiver sur mobile** : Utilisez des classes Tailwind
   ```html
   <div class="md:scroll-reveal">Animé seulement sur desktop</div>
   ```

3. **Animation au clic** : Ajoutez manuellement la classe `.is-visible`
   ```vue
   <div ref="element" class="scroll-reveal">
     <button @click="element.classList.add('is-visible')">Animer</button>
   </div>
   ```

---

**Créé avec ❤️ pour CasaNayo**

