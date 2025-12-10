<script setup lang="ts">
import { ref } from 'vue'
import HeroComponent from '@/components/hero/HeroComponent.vue'
import NavBarComponent from '@/components/navbar/NavBarComponent.vue'
import CategorySection from '@/components/property/CategorySection.vue'
import ServicesSection from '@/components/services/ServicesSection.vue'
import FeaturesSection from '@/components/features/FeaturesSection.vue'
import MobileAppSection from '@/components/mobile/MobileAppSection.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import type { Property, Service } from '@/types/property'

// Propriétés à vendre
const propertiesForSale = ref<Property[]>([
  {
    id: '1',
    title: 'Villa moderne avec piscine',
    description: 'Magnifique villa contemporaine avec vue panoramique',
    price: 850000,
    location: 'Nice, Côte d\'Azur',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ],
    features: ['Piscine', 'Jardin', 'Garage'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2020,
    parking: 2,
  },
  {
    id: '2',
    title: 'Appartement centre-ville',
    description: 'Appartement lumineux en plein cœur de la ville',
    price: 320000,
    location: 'Paris, 15ème arrondissement',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    features: ['Balcon', 'Ascenseur', 'Parking'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2015,
    parking: 1,
  },
  {
    id: '3',
    title: 'Maison familiale avec jardin',
    description: 'Charmante maison avec grand jardin pour toute la famille',
    price: 450000,
    location: 'Lyon, Rhône',
    type: 'house',
    bedrooms: 5,
    bathrooms: 3,
    area: 180,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    features: ['Jardin', 'Garage', 'Cave'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2010,
    parking: 2,
  },
  {
    id: '5',
    title: 'Loft industriel rénové',
    description: 'Spacieux loft avec hauts plafonds et grandes fenêtres',
    price: 520000,
    location: 'Marseille, Vieux-Port',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    images: [
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    ],
    features: ['Hauteur sous plafond', 'Parking', 'Ascenseur'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2018,
    parking: 1,
  },
  {
    id: '6',
    title: 'Maison de campagne',
    description: 'Authentique maison de campagne avec charme',
    price: 380000,
    location: 'Provence, Alpes-Côte d\'Azur',
    type: 'house',
    bedrooms: 4,
    bathrooms: 2,
    area: 200,
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
    features: ['Jardin', 'Cave', 'Garage'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2005,
    parking: 3,
  },
  {
    id: '7',
    title: 'Penthouse avec terrasse',
    description: 'Luxueux penthouse avec vue panoramique sur la ville',
    price: 1200000,
    location: 'Paris, 16ème arrondissement',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    ],
    features: ['Terrasse', 'Ascenseur', 'Conciergerie'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2021,
    parking: 2,
  },
])

// Propriétés à louer
const propertiesForRent = ref<Property[]>([
  {
    id: '4',
    title: 'Studio moderne à louer',
    description: 'Studio récemment rénové, proche des transports',
    price: 850,
    location: 'Paris, 11ème arrondissement',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    ],
    features: ['Meublé', 'Internet', 'Chauffage'],
    status: 'for-rent',
    category: 'for-rent',
    yearBuilt: 2022,
  },
  {
    id: '8',
    title: 'Appartement T2 à louer',
    description: 'Appartement cosy et bien situé',
    price: 1200,
    location: 'Bordeaux, Centre-ville',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 55,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    ],
    features: ['Meublé', 'Balcon', 'Internet'],
    status: 'for-rent',
    category: 'for-rent',
    yearBuilt: 2019,
  },
  {
    id: '9',
    title: 'Maison avec jardin à louer',
    description: 'Belle maison avec jardin privé',
    price: 1800,
    location: 'Toulouse, Haute-Garonne',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    features: ['Jardin', 'Garage', 'Meublé'],
    status: 'for-rent',
    category: 'for-rent',
    yearBuilt: 2015,
    parking: 2,
  },
])

// Services de déménagement
const movingServices = ref<Service[]>([
  {
    id: 'm1',
    title: 'Déménagement complet Paris',
    description: 'Service de déménagement professionnel avec emballage et transport',
    price: 800,
    location: 'Paris, Île-de-France',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    ],
    features: ['Emballage', 'Transport', 'Montage meubles'],
    category: 'moving-service',
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 'm2',
    title: 'Déménagement express',
    description: 'Déménagement rapide et efficace en 24h',
    price: 600,
    location: 'Lyon, Rhône',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    features: ['Rapidité', 'Assurance', 'Équipe expérimentée'],
    category: 'moving-service',
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 'm3',
    title: 'Déménagement longue distance',
    description: 'Spécialisé dans les déménagements inter-régionaux',
    price: 1200,
    location: 'France entière',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    ],
    features: ['Longue distance', 'Stockage', 'Suivi GPS'],
    category: 'moving-service',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 'm4',
    title: 'Déménagement éco-responsable',
    description: 'Service de déménagement respectueux de l\'environnement',
    price: 750,
    location: 'Marseille, Bouches-du-Rhône',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    features: ['Éco-responsable', 'Matériaux recyclables', 'Véhicules propres'],
    category: 'moving-service',
    rating: 4.9,
    reviews: 94,
  },
])

// Services de majordome
const butlerServices = ref<Service[]>([
  {
    id: 'b1',
    title: 'Majordome résidentiel',
    description: 'Service de majordome à domicile pour gestion complète du foyer',
    price: 2500,
    location: 'Paris, Île-de-France',
    images: [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e8?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    ],
    features: ['Gestion quotidienne', 'Service repas', 'Organisation événements'],
    category: 'butler-service',
    rating: 5.0,
    reviews: 45,
  },
  {
    id: 'b2',
    title: 'Majordome événementiel',
    description: 'Service de majordome pour vos événements et réceptions',
    price: 500,
    location: 'Côte d\'Azur',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e8?w=800',
    ],
    features: ['Service événements', 'Service à table', 'Coordination'],
    category: 'butler-service',
    rating: 4.9,
    reviews: 78,
  },
  {
    id: 'b3',
    title: 'Conciergerie premium',
    description: 'Service de conciergerie haut de gamme pour tous vos besoins',
    price: 800,
    location: 'Paris, Île-de-France',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e8?w=800',
    ],
    features: ['Réservations', 'Courses', 'Services personnalisés'],
    category: 'butler-service',
    rating: 4.8,
    reviews: 112,
  },
  {
    id: 'b4',
    title: 'Majordome de luxe',
    description: 'Service de majordome premium avec formation internationale',
    price: 3500,
    location: 'Monaco',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    ],
    features: ['Service premium', 'Disponibilité 24/7', 'Formation internationale'],
    category: 'butler-service',
    rating: 5.0,
    reviews: 23,
  },
])
</script>

<template>
  <div class="home-view min-h-screen bg-white">
    <!-- Navbar -->
    <NavBarComponent />

    <!-- Hero Section -->
    <HeroComponent />

    <!-- Propriétés à vendre -->
    <CategorySection
      title="Propriétés à vendre"
      subtitle="Découvrez notre sélection de biens immobiliers à vendre"
      :properties="propertiesForSale"
      category="for-sale"
      :limit="4"
    />

    <!-- Propriétés à louer -->
    <CategorySection
      title="Propriétés à louer"
      subtitle="Trouvez votre prochain logement à louer"
      :properties="propertiesForRent"
      category="for-rent"
      :limit="4"
    />

    <!-- Mobile App Section -->
    <MobileAppSection />

    <!-- Services de déménagement -->
    <CategorySection
      title="Services de déménagement"
      subtitle="Déménagez en toute sérénité avec nos services professionnels"
      :services="movingServices"
      category="moving-service"
      :limit="4"
    />

    <!-- Services de majordome -->
    <CategorySection
      title="Services de majordome"
      subtitle="Un service de majordome professionnel pour votre confort"
      :services="butlerServices"
      category="butler-service"
      :limit="4"
    />

    <!-- Features Section -->
    <FeaturesSection />

    <!-- Services Section -->
    <ServicesSection />

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<style scoped>
.home-view {
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
}
</style>
