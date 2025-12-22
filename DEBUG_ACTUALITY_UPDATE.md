# Guide de Débogage - Modification d'Actualité

## Problème
La modification ne fonctionne pas malgré une réponse de succès de l'API.

## Étapes de Débogage

### 1. Vérifier les Logs de la Console

Ouvrez la console du navigateur (F12) et cherchez les logs suivants :

- `📝 Données du formulaire avant envoi:` - Vérifiez que les données du formulaire sont correctes
- `📤 Données nettoyées à envoyer:` - Vérifiez ce qui est envoyé à l'API
- `🔄 Envoi de la requête PUT vers:` - Vérifiez l'URL de l'API
- `📥 Statut de la réponse:` - Vérifiez le code de statut HTTP
- `📥 Réponse complète de l'API:` - Vérifiez la réponse complète
- `✅ Données retournées:` - Vérifiez les données retournées

### 2. Vérifier la Requête dans l'Onglet Network

1. Ouvrez les DevTools (F12)
2. Allez dans l'onglet **Network**
3. Filtrez par **XHR** ou **Fetch**
4. Modifiez une actualité
5. Cliquez sur la requête `PUT /api/actualities/{id}`
6. Vérifiez :
   - **Request Payload** : Les données envoyées sont-elles correctes ?
   - **Response** : La réponse contient-elle `success: true` et `data` ?
   - **Status Code** : Est-ce 200 ou 201 ?

### 3. Tester avec le Formulaire Simple

Utilisez le composant `SimpleEditForm` pour tester :

```vue
<template>
  <SimpleEditForm :actuality-id="4" />
</template>

<script setup>
import SimpleEditForm from '@/components/actuality/SimpleEditForm.vue'
</script>
```

Ce formulaire affiche des informations de débogage directement dans l'interface.

### 4. Vérifier le Format des Données

L'API peut attendre différents formats selon le backend :

#### Format JSON (sans fichiers)
```json
{
  "title": "Nouveau titre",
  "summary": "Nouveau résumé",
  "content": "Nouveau contenu",
  "category": "Recherche",
  "author": "Jean Nsonsumuna",
  "status": "published"
}
```

#### Format FormData (avec fichiers)
Les tableaux peuvent être envoyés comme :
- `learning_points[0]`, `learning_points[1]`, etc.
- Ou comme un tableau JSON dans FormData

### 5. Problèmes Courants

#### Problème 1 : Les données ne sont pas mises à jour dans l'interface

**Solution :**
- Vérifiez que vous utilisez `v-model` sur tous les champs
- Vérifiez que le composable `useActualities` met à jour les données
- Forcez le rechargement : `await loadActuality(id)`

#### Problème 2 : L'API retourne success mais les données ne changent pas

**Causes possibles :**
1. L'API ne retourne pas les données mises à jour dans `data`
2. Les données sont mises à jour mais Vue ne détecte pas le changement
3. Un autre composant affiche des données en cache

**Solution :**
```typescript
// Après la mise à jour, forcez le rechargement
const updated = await updateActualityById(id, data)
await loadActuality(id) // Recharger pour être sûr
```

#### Problème 3 : Erreur CORS ou 401/403

**Solution :**
- Vérifiez que vous êtes authentifié
- Vérifiez les headers d'authentification
- Vérifiez les permissions de l'utilisateur

### 6. Test Manuel avec cURL

Testez directement l'API avec cURL :

```bash
curl -X PUT "https://server.casanayo.com/api/actualities/4" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Modification",
    "summary": "Test résumé",
    "content": "Test contenu",
    "category": "Recherche",
    "author": "Test Author",
    "status": "published"
  }'
```

### 7. Vérifier la Structure de la Réponse

La réponse doit avoir cette structure :

```json
{
  "success": true,
  "data": {
    "id": 4,
    "title": "Titre modifié",
    "summary": "Résumé modifié",
    "content": "Contenu modifié",
    // ... autres champs
  },
  "message": "Actualité mise à jour avec succès"
}
```

Si la structure est différente, modifiez le code dans `src/services/api.ts` :

```typescript
// Si l'API retourne directement les données sans wrapper
const result = await response.json()
return {
  success: true,
  data: result, // Au lieu de result.data
  message: 'Actualité mise à jour avec succès'
}
```

### 8. Vérifier la Réactivité Vue

Si les données sont mises à jour mais l'interface ne change pas :

```typescript
// Forcez la réactivité
import { nextTick } from 'vue'

await updateActualityById(id, data)
await nextTick() // Attendre que Vue mette à jour le DOM
```

### 9. Comparer Avant/Après

Ajoutez ce code pour comparer :

```typescript
const before = await fetchActualityById(id)
console.log('AVANT:', before.data)

await updateActualityById(id, data)

const after = await fetchActualityById(id)
console.log('APRÈS:', after.data)
```

## Solution Rapide

Si rien ne fonctionne, utilisez cette approche simple :

```vue
<script setup>
import { ref } from 'vue'
import { updateActuality, fetchActualityById } from '@/services/api'

const formData = ref({
  title: '',
  content: '',
  // ... autres champs
})

const handleSubmit = async () => {
  try {
    // 1. Envoyer la modification
    const response = await updateActuality(4, formData.value)
    console.log('Réponse:', response)
    
    // 2. Recharger immédiatement
    const reloaded = await fetchActualityById(4)
    console.log('Rechargé:', reloaded)
    
    // 3. Mettre à jour le formulaire avec les données rechargées
    if (reloaded.success && reloaded.data) {
      formData.value = {
        title: reloaded.data.title,
        content: reloaded.data.content,
        // ... autres champs
      }
    }
  } catch (error) {
    console.error('Erreur:', error)
  }
}
</script>
```

## Contact

Si le problème persiste après ces vérifications, partagez :
1. Les logs de la console
2. La requête dans l'onglet Network
3. La réponse de l'API
4. Le code de votre formulaire


