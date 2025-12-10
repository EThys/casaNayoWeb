import type { Property, Service } from '@/types/property'

// Propriétés à vendre
export const propertiesForSale: Property[] = [
  {
    id: '1',
    title: 'Villa moderne avec piscine',
    description:
      'Magnifique villa contemporaine avec vue panoramique sur la mer. Cette propriété exceptionnelle offre un confort moderne avec des finitions de qualité. La villa dispose de 4 chambres spacieuses, 3 salles de bain, une cuisine équipée moderne, un salon lumineux avec cheminée, et une terrasse avec piscine privée. Le jardin paysager de 500m² offre un espace de détente idéal. Garage double et parking privé inclus.',
    price: 850000,
    location: 'Kinshasa, Gombe',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    ],
    features: ['piscine', 'jardin', 'garage', 'terrasse', 'climatisation'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2020,
    parking: 2,
    rooms: 6,
  },
  {
    id: '2',
    title: 'Appartement centre-ville',
    description:
      'Appartement lumineux en plein cœur de la ville avec vue sur les monuments historiques. Situé dans un immeuble récent, cet appartement de 85m² offre un espace de vie moderne et fonctionnel. Il comprend 3 chambres, 2 salles de bain, une cuisine ouverte équipée, et un balcon avec vue panoramique. Proche de tous les commerces et transports en commun.',
    price: 320000,
    location: 'Kinshasa, Lingwala',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
    ],
    features: ['balcon', 'ascenseur', 'parking'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2015,
    parking: 1,
    rooms: 4,
  },
  {
    id: '3',
    title: 'Maison familiale avec jardin',
    description:
      'Charmante maison avec grand jardin pour toute la famille. Cette propriété spacieuse de 180m² comprend 5 chambres, 3 salles de bain, une cuisine équipée, un salon avec cheminée, une salle à manger, et un grand jardin de 400m². Idéale pour les familles, avec garage double et parking.',
    price: 450000,
    location: 'Lubumbashi, Katanga',
    type: 'house',
    bedrooms: 5,
    bathrooms: 3,
    area: 180,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    ],
    features: ['jardin', 'garage', 'cave'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2010,
    parking: 2,
    rooms: 7,
  },
  {
    id: '5',
    title: 'Loft industriel rénové',
    description:
      'Spacieux loft avec hauts plafonds et grandes fenêtres. Ce loft de 120m² a été entièrement rénové en conservant son caractère industriel. Il comprend 2 chambres, 2 salles de bain, une cuisine ouverte moderne, et un espace de vie lumineux avec hauts plafonds. Parking privé inclus.',
    price: 520000,
    location: 'Kinshasa, Ngaliema',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    images: [
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',
    ],
    features: ['hauteur sous plafond', 'parking', 'ascenseur'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2018,
    parking: 1,
    rooms: 3,
  },
  {
    id: '6',
    title: 'Maison de campagne',
    description:
      'Authentique maison de campagne avec charme. Cette maison de 200m² comprend 4 chambres, 2 salles de bain, une grande cuisine, un salon avec cheminée, et un grand jardin. Parfait pour ceux qui recherchent le calme et l\'espace.',
    price: 380000,
    location: 'Kisangani, Tshopo',
    type: 'house',
    bedrooms: 4,
    bathrooms: 2,
    area: 200,
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
    ],
    features: ['jardin', 'cave', 'garage'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2005,
    parking: 3,
    rooms: 6,
  },
  {
    id: '7',
    title: 'Penthouse avec terrasse',
    description:
      'Luxueux penthouse avec vue panoramique sur la ville. Ce penthouse de 180m² comprend 3 chambres, 3 salles de bain, une cuisine équipée haut de gamme, un salon spacieux, et une grande terrasse avec vue panoramique. Conciergerie 24/7 et parking privé.',
    price: 1200000,
    location: 'Kinshasa, Mont Ngafula',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
    ],
    features: ['terrasse', 'ascenseur', 'conciergerie'],
    status: 'for-sale',
    category: 'for-sale',
    yearBuilt: 2021,
    parking: 2,
    rooms: 4,
  },
]

// Propriétés à louer
export const propertiesForRent: Property[] = [
  {
    id: '4',
    title: 'Studio moderne à louer',
    description:
      'Studio récemment rénové, proche des transports. Ce studio de 30m² comprend une pièce principale avec coin cuisine, une salle de bain moderne, et un espace de rangement. Meublé et équipé, idéal pour étudiant ou jeune actif.',
    price: 850,
    location: 'Kinshasa, Bandalungwa',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
    ],
    features: ['meublé', 'internet', 'chauffage'],
    status: 'for-rent',
    category: 'for-rent',
    yearBuilt: 2022,
    rooms: 1,
  },
  {
    id: '8',
    title: 'Appartement T2 à louer',
    description:
      'Appartement cosy et bien situé. Cet appartement de 55m² comprend 2 chambres, 1 salle de bain, une cuisine équipée, et un balcon. Meublé et proche de tous les commerces.',
    price: 1200,
    location: 'Goma, Nord-Kivu',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 55,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
    ],
    features: ['meublé', 'balcon', 'internet'],
    status: 'for-rent',
    category: 'for-rent',
    yearBuilt: 2019,
    rooms: 3,
  },
  {
    id: '9',
    title: 'Maison avec jardin à louer',
    description:
      'Belle maison avec jardin privé. Cette maison de 120m² comprend 3 chambres, 2 salles de bain, une cuisine équipée, un salon, et un jardin privé. Meublé et idéal pour une famille.',
    price: 1800,
    location: 'Bukavu, Sud-Kivu',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    ],
    features: ['jardin', 'garage', 'meublé'],
    status: 'for-rent',
    category: 'for-rent',
    yearBuilt: 2015,
    parking: 2,
    rooms: 5,
  },
]

// Services de déménagement
export const movingServices: Service[] = [
  {
    id: 'm1',
    title: 'Déménagement complet Kinshasa',
    description:
      'Service complet de déménagement pour particuliers et entreprises. Notre équipe expérimentée s\'occupe de tout : emballage, transport, déballage et installation. Nous utilisons du matériel professionnel et assurons vos biens pendant le transport. Disponible 7j/7, service rapide et efficace.',
    price: 800,
    location: 'Kinshasa, Gombe',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    ],
    features: ['Emballage', 'Transport', 'Déballage', 'Assurance'],
    category: 'moving-service',
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 'm2',
    title: 'Déménagement express Lubumbashi',
    description:
      'Déménagement rapide et efficace en 24h. Service express pour déménagements urgents. Notre équipe qualifiée s\'occupe de tout rapidement et efficacement. Matériel professionnel et assurance incluse.',
    price: 600,
    location: 'Lubumbashi, Katanga',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    ],
    features: ['Rapidité', 'Assurance', 'Équipe expérimentée'],
    category: 'moving-service',
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 'm3',
    title: 'Déménagement longue distance',
    description:
      'Spécialisé dans les déménagements inter-régionaux. Service complet pour déménagements longue distance avec suivi GPS, stockage temporaire si nécessaire, et assurance complète. Équipe expérimentée et matériel adapté.',
    price: 1200,
    location: 'RDC, Toutes provinces',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
    ],
    features: ['Longue distance', 'Stockage', 'Suivi GPS'],
    category: 'moving-service',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 'm4',
    title: 'Déménagement éco-responsable',
    description:
      'Service de déménagement respectueux de l\'environnement. Nous utilisons des matériaux recyclables, des véhicules propres, et des pratiques éco-responsables. Service complet avec emballage écologique et transport vert.',
    price: 750,
    location: 'Matadi, Kongo-Central',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    ],
    features: ['Éco-responsable', 'Matériaux recyclables', 'Véhicules propres'],
    category: 'moving-service',
    rating: 4.9,
    reviews: 94,
  },
]

// Services de majordome
export const butlerServices: Service[] = [
  {
    id: 'b1',
    title: 'Majordome résidentiel',
    description:
      'Service de majordome à domicile pour gestion complète du foyer. Notre majordome s\'occupe de la gestion quotidienne de votre domicile : ménage, cuisine, courses, organisation d\'événements, et bien plus. Service discret, fiable et personnalisé selon vos besoins.',
    price: 2500,
    location: 'Kinshasa, Gombe',
    images: [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e8?w=1200',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200',
    ],
    features: ['Gestion quotidienne', 'Service repas', 'Organisation événements'],
    category: 'butler-service',
    rating: 5.0,
    reviews: 45,
  },
  {
    id: 'b2',
    title: 'Majordome événementiel',
    description:
      'Service de majordome pour vos événements et réceptions. Notre équipe de majordomes professionnels s\'occupe de tous les aspects de votre événement : service à table, coordination, organisation, et bien plus. Service premium pour événements mémorables.',
    price: 500,
    location: 'Kinshasa, Ngaliema',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e8?w=1200',
    ],
    features: ['Service événements', 'Service à table', 'Coordination'],
    category: 'butler-service',
    rating: 4.9,
    reviews: 78,
  },
  {
    id: 'b3',
    title: 'Conciergerie premium',
    description:
      'Service de conciergerie haut de gamme pour tous vos besoins. Notre service de conciergerie s\'occupe de toutes vos demandes : réservations, courses, services personnalisés, et bien plus. Disponible 24/7 pour votre confort.',
    price: 800,
    location: 'Kinshasa, Gombe',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e8?w=1200',
    ],
    features: ['Réservations', 'Courses', 'Services personnalisés'],
    category: 'butler-service',
    rating: 4.8,
    reviews: 112,
  },
  {
    id: 'b4',
    title: 'Majordome de luxe',
    description:
      'Service de majordome premium avec formation internationale. Notre majordome de luxe possède une formation internationale et une expérience dans les plus grandes maisons. Service discret, professionnel et disponible 24/7 pour répondre à tous vos besoins.',
    price: 3500,
    location: 'Kinshasa, Mont Ngafula',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200',
    ],
    features: ['Service premium', 'Disponibilité 24/7', 'Formation internationale'],
    category: 'butler-service',
    rating: 5.0,
    reviews: 23,
  },
]

// Fonction helper pour trouver une propriété par ID
export const findPropertyById = (id: string): Property | undefined => {
  return [...propertiesForSale, ...propertiesForRent].find((p) => p.id === id)
}

// Fonction helper pour trouver un service par ID
export const findServiceById = (id: string): Service | undefined => {
  return [...movingServices, ...butlerServices].find((s) => s.id === id)
}

