// Types de propriétés étendus
export type PropertyType =
  | 'house' // Maison
  | 'apartment' // Appartement
  | 'villa' // Villa
  | 'land' // Terrain
  | 'commercial' // Commercial (générique)
  | 'office' // Bureau
  | 'warehouse' // Entrepôt
  | 'party-hall' // Salle de fête
  | 'funeral-hall' // Salle funéraire
  | 'vacation-rental' // Lieu de vacance
  | 'hotel' // Hôtel

// Groupes de propriétés pour classification
export type PropertyGroup =
  | 'residential' // Résidentiel : house, apartment, villa
  | 'commercial' // Commercial : office, warehouse, commercial
  | 'event' // Événementiel : party-hall, funeral-hall
  | 'hospitality' // Hospitalité : hotel, vacation-rental
  | 'land' // Terrain : land

export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  type: PropertyType
  group?: PropertyGroup // Groupe pour faciliter le filtrage
  bedrooms?: number // Optionnel pour certains types (bureaux, entrepôts)
  bathrooms?: number // Optionnel pour certains types
  area: number // en m²
  images: string[]
  features: string[]
  status: 'for-sale' | 'for-rent' | 'sold' | 'rented'
  category: 'for-sale' | 'for-rent' | ServiceCategory
  yearBuilt?: number
  parking?: number
  capacity?: number // Pour salles de fête, hôtels, etc.
  rooms?: number // Nombre total de pièces
}

export type ServiceCategory = 
  | 'moving-service' 
  | 'butler-service'
  | 'plumber'
  | 'electrician'
  | 'painter'
  | 'architect'
  | 'adjuster'
  | 'carpenter'
  | 'tiler'
  | 'refrigeration-technician'

export interface Service {
  id: string
  title: string
  description: string
  price: number
  location: string
  images: string[]
  features: string[]
  category: ServiceCategory
  rating?: number
  reviews?: number
  phone?: string
  availability?: string
}

export interface SearchFilters {
  type?: PropertyType
  group?: PropertyGroup
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  rooms?: number // Nombre total de pièces
  minArea?: number // Surface minimale
  maxArea?: number // Surface maximale
  location?: string
  status?: Property['status']
  category?: Property['category']
  capacity?: number // Pour filtrage par capacité
  parking?: number
  yearBuilt?: number
  features?: string[] // Caractéristiques : piscine, jardin, etc.
}

// Mapping des types vers les groupes
export const PROPERTY_TYPE_TO_GROUP: Record<PropertyType, PropertyGroup> = {
  house: 'residential',
  apartment: 'residential',
  villa: 'residential',
  land: 'land',
  commercial: 'commercial',
  office: 'commercial',
  warehouse: 'commercial',
  'party-hall': 'event',
  'funeral-hall': 'event',
  'vacation-rental': 'hospitality',
  hotel: 'hospitality',
}

// Labels pour les types
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  house: 'Maison',
  apartment: 'Appartement',
  villa: 'Villa',
  land: 'Terrain',
  commercial: 'Local commercial',
  office: 'Bureau',
  warehouse: 'Entrepôt',
  'party-hall': 'Salle de fête',
  'funeral-hall': 'Salle funéraire',
  'vacation-rental': 'Lieu de vacance',
  hotel: 'Hôtel',
}

// Labels pour les groupes
export const PROPERTY_GROUP_LABELS: Record<PropertyGroup, string> = {
  residential: 'Résidentiel',
  commercial: 'Commercial',
  event: 'Événementiel',
  hospitality: 'Hospitalité',
  land: 'Terrain',
}

// Caractéristiques disponibles
export const PROPERTY_FEATURES = [
  'piscine',
  'jardin',
  'balcon',
  'terrasse',
  'garage',
  'parking',
  'cave',
  'ascenseur',
  'cheminée',
  'climatisation',
  'alarme',
  'meublé',
] as const

export type PropertyFeature = (typeof PROPERTY_FEATURES)[number]
