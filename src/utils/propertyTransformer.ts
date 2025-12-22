import type { Property, PropertyType } from '@/types/property'
import type { ApiProperty } from '@/services/api'

/**
 * Maps API property type name to PropertyType
 */
const mapPropertyType = (apiTypeName: string): PropertyType => {
  const typeMap: Record<string, PropertyType> = {
    'Studio': 'apartment',
    'Apparts': 'apartment',
    'Maisons': 'house',
    'Villa': 'villa',
    'Terrain': 'land',
    'Bureau': 'office',
    'Entrepôt': 'warehouse',
    'Local commercial': 'commercial',
    'Salle de fête': 'party-hall',
    'Salle funéraire': 'funeral-hall',
    'Lieu de vacance': 'vacation-rental',
    'Hôtel': 'hotel',
  }

  return typeMap[apiTypeName] || 'apartment'
}

/**
 * Maps transaction type to Property status
 */
const mapTransactionTypeToStatus = (
  transactionType: 'vente' | 'location',
  sold: boolean
): Property['status'] => {
  if (sold) {
    return transactionType === 'vente' ? 'sold' : 'rented'
  }
  return transactionType === 'vente' ? 'for-sale' : 'for-rent'
}

/**
 * Builds location string from API property data
 */
const buildLocation = (property: ApiProperty): string => {
  const parts: string[] = []

  if (property.address) {
    parts.push(property.address)
  }

  if (property.quartierValue || property.quartier?.name) {
    parts.push(property.quartierValue || property.quartier.name)
  }

  if (property.communeValue || property.commune?.name) {
    parts.push(property.communeValue || property.commune.name)
  }

  if (property.cityValue || property.city?.name) {
    parts.push(property.cityValue || property.city.name)
  }

  if (property.countryValue || property.city?.country?.name) {
    parts.push(property.countryValue || property.city.country.name)
  }

  return parts.filter(Boolean).join(', ')
}

/**
 * Extracts all images from API property
 */
const extractImages = (property: ApiProperty): string[] => {
  const images: string[] = []

  // Main property images
  if (property.propertyImage && property.propertyImage.length > 0) {
    images.push(...property.propertyImage.map((img) => img.path))
  }

  // Living room images
  if (property.propertyImageLivingRoom && property.propertyImageLivingRoom.length > 0) {
    images.push(...property.propertyImageLivingRoom.map((img) => img.path))
  }

  // Room images
  if (property.propertyImageRoom && property.propertyImageRoom.length > 0) {
    images.push(...property.propertyImageRoom.map((img) => img.path))
  }

  // Kitchen images
  if (property.propertyImageKitchen && property.propertyImageKitchen.length > 0) {
    images.push(...property.propertyImageKitchen.map((img) => img.path))
  }

  // If no images, return a placeholder
  if (images.length === 0) {
    return ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800']
  }

  return images
}

/**
 * Extracts features from API property
 */
const extractFeatures = (property: ApiProperty): string[] => {
  const features: string[] = []

  // Add features from the features array
  if (property.features && property.features.length > 0) {
    features.push(...property.features.map((f) => f.name.toLowerCase()))
  }

  // Map some features to standard names
  return features.map((feature) => {
    const featureMap: Record<string, string> = {
      'wifi': 'internet',
      'climatisation': 'climatisation',
      'chauffage': 'chauffage',
      'cuisine équipé': 'cuisine équipée',
      'lave-linge': 'lave-linge',
      'parking': 'parking',
      'piscine': 'piscine',
      'jardin': 'jardin',
      'terrasse': 'terrasse',
      'gym': 'gym',
      'animaux acceptés': 'animaux acceptés',
    }

    return featureMap[feature] || feature
  })
}

/**
 * Transforms an API property to the Property format
 */
export const transformApiPropertyToProperty = (apiProperty: ApiProperty): Property => {
  const propertyType = mapPropertyType(apiProperty.propertyType.name)
  const status = mapTransactionTypeToStatus(apiProperty.transactionType, apiProperty.sold)

  return {
    id: apiProperty.propertyId.toString(),
    title: apiProperty.title,
    description: apiProperty.description || '',
    price: apiProperty.price,
    location: buildLocation(apiProperty),
    type: propertyType,
    bedrooms: apiProperty.bedrooms || undefined,
    bathrooms: apiProperty.bathroom || undefined,
    area: apiProperty.surface || 0,
    images: extractImages(apiProperty),
    features: extractFeatures(apiProperty),
    status,
    category: apiProperty.transactionType === 'vente' ? 'for-sale' : 'for-rent',
    rooms: apiProperty.rooms || undefined,
    floor: apiProperty.floor || undefined,
    // Additional fields that might be useful
    available: apiProperty.available,
    createdAt: apiProperty.createdAt,
    updatedAt: apiProperty.updatedAt,
  }
}

/**
 * Transforms an array of API properties to Property format
 */
export const transformApiPropertiesToProperties = (apiProperties: ApiProperty[]): Property[] => {
  return apiProperties.map(transformApiPropertyToProperty)
}


