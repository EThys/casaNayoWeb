import type { Property, Service } from '@/types/property'

// Propriétés à vendre
export const propertiesForSale: Property[] = [
  {
    id: '1',
    title: 'Villa moderne avec piscine',
    description:
      'Magnifique villa contemporaine avec vue panoramique sur la mer. Cette propriété exceptionnelle offre un confort moderne avec des finitions de qualité. La villa dispose de 4 chambres spacieuses, 3 salles de bain, une cuisine équipée moderne, un salon lumineux avec cheminée, et une terrasse avec piscine privée. Le jardin paysager de 500m² offre un espace de détente idéal. Garage double et parking privé inclus.',
    price: 850000,
    location: 'Avenue du Port, Gombe, Kinshasa',
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
    location: 'Avenue Victoire, Lingwala, Kinshasa',
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
    location: 'Quartier Residences, Lubumbashi, Haut-Katanga',
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
    location: 'Quartier Ma Campagne, Ngaliema, Kinshasa',
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
    location: 'Avenue de la Gare, Gombe, Kinshasa',
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
    location: 'Avenue de la Gare, Gombe, Kinshasa',
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
    location: 'Quartier Ma Campagne, Ngaliema, Kinshasa',
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
    location: 'Avenue de la Gare, Gombe, Kinshasa',
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

// Services professionnels - Plombiers
export const plumberServices: Service[] = [
  {
    id: 'p1',
    title: 'Plombier Expert Kinshasa',
    description: 'Service de plomberie professionnel pour tous vos besoins. Installation, réparation, dépannage d\'urgence. Interventions rapides 24/7. Spécialisé en installation sanitaire, réparation de fuites, débouchage de canalisations.',
    price: 150,
    location: 'Avenue du Commerce, Gombe, Kinshasa',
    images: ['https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200'],
    features: ['Dépannage urgent', 'Installation sanitaire', 'Réparation fuites', 'Débouchage'],
    category: 'plumber',
    rating: 4.8,
    reviews: 156,
    phone: '+243 815 234 567',
    availability: '24/7',
  },
  {
    id: 'p2',
    title: 'Plomberie Rapide Lubumbashi',
    description: 'Plombier qualifié avec 10 ans d\'expérience. Installation complète de salle de bain, cuisine, système de chauffage. Garantie sur tous les travaux.',
    price: 120,
    location: 'Avenue Kasaï, Lubumbashi, Haut-Katanga',
    images: ['https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200'],
    features: ['Installation complète', 'Garantie travaux', 'Devis gratuit'],
    category: 'plumber',
    rating: 4.7,
    reviews: 89,
    phone: '+243 826 789 123',
    availability: 'Lun-Sam 8h-18h',
  },
]

// Services professionnels - Électriciens
export const electricianServices: Service[] = [
  {
    id: 'e1',
    title: 'Électricien Certifié Kinshasa',
    description: 'Électricien professionnel certifié. Installation électrique complète, mise aux normes, dépannage urgent, installation panneaux solaires. Tous travaux d\'électricité générale et industrielle.',
    price: 180,
    location: 'Boulevard du 30 Juin, Gombe, Kinshasa',
    images: ['https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200'],
    features: ['Installation électrique', 'Panneaux solaires', 'Dépannage 24/7', 'Certifié'],
    category: 'electrician',
    rating: 4.9,
    reviews: 203,
    phone: '+243 840 567 891',
    availability: '24/7',
  },
  {
    id: 'e2',
    title: 'Électricien Résidentiel Goma',
    description: 'Spécialiste en électricité résidentielle. Installation, rénovation, mise en conformité. Intervention rapide pour tous vos besoins électriques.',
    price: 140,
    location: 'Avenue du Rond-Point, Goma, Nord-Kivu',
    images: ['https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200'],
    features: ['Installation', 'Rénovation', 'Mise aux normes'],
    category: 'electrician',
    rating: 4.6,
    reviews: 78,
    phone: '+243 899 456 321',
    availability: 'Lun-Ven 7h-19h',
  },
]

// Services professionnels - Peintres
export const painterServices: Service[] = [
  {
    id: 'pt1',
    title: 'Peintre Professionnel Kinshasa',
    description: 'Peinture intérieure et extérieure de qualité. Revêtements muraux, décoration, finitions haut de gamme. Conseils couleurs et devis gratuit.',
    price: 200,
    location: 'Avenue de la Justice, Gombe, Kinshasa',
    images: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200'],
    features: ['Intérieur/Extérieur', 'Revêtements muraux', 'Conseils déco', 'Devis gratuit'],
    category: 'painter',
    rating: 4.8,
    reviews: 134,
    phone: '+243 810 987 654',
    availability: 'Lun-Sam 8h-17h',
  },
  {
    id: 'pt2',
    title: 'Peinture Décorative Lubumbashi',
    description: 'Spécialiste en peinture décorative et finitions spéciales. Enduits, stuc, patines. Travaux soignés et garantis.',
    price: 180,
    location: 'Quartier Kenya, Lubumbashi, Haut-Katanga',
    images: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200'],
    features: ['Peinture décorative', 'Finitions spéciales', 'Garantie'],
    category: 'painter',
    rating: 4.7,
    reviews: 92,
    phone: '+243 821 345 678',
    availability: 'Lun-Sam 8h-18h',
  },
]

// Services professionnels - Architectes
export const architectServices: Service[] = [
  {
    id: 'a1',
    title: 'Architecte DPLG Kinshasa',
    description: 'Architecte diplômé avec 15 ans d\'expérience. Conception de plans, rénovation, extension, suivi de chantier. Projets résidentiels et commerciaux.',
    price: 500,
    location: 'Avenue Colonel Mondjiba, Gombe, Kinshasa',
    images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200'],
    features: ['Plans 3D', 'Suivi chantier', 'Permis de construire', 'Devis détaillé'],
    category: 'architect',
    rating: 5.0,
    reviews: 67,
    phone: '+243 844 123 789',
    availability: 'Sur rendez-vous',
  },
  {
    id: 'a2',
    title: 'Cabinet Architecture Moderne',
    description: 'Cabinet d\'architecture spécialisé en constructions modernes et écologiques. Design contemporain, optimisation espaces.',
    price: 600,
    location: 'Quartier Joli Parc, Ngaliema, Kinshasa',
    images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200'],
    features: ['Design moderne', 'Écologique', 'Plans détaillés'],
    category: 'architect',
    rating: 4.9,
    reviews: 54,
    phone: '+243 817 654 321',
    availability: 'Lun-Ven 9h-17h',
  },
]

// Services professionnels - Menuisiers
export const carpenterServices: Service[] = [
  {
    id: 'c1',
    title: 'Menuisier Expert Kinshasa',
    description: 'Menuiserie sur mesure de qualité. Fabrication et pose de portes, fenêtres, placards, cuisines équipées. Bois noble et garantie.',
    price: 250,
    location: 'Avenue Pumbu, Gombe, Kinshasa',
    images: ['https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200'],
    features: ['Sur mesure', 'Bois noble', 'Cuisine équipée', 'Garantie'],
    category: 'carpenter',
    rating: 4.8,
    reviews: 118,
    phone: '+243 828 765 432',
    availability: 'Lun-Sam 8h-17h',
  },
]

// Services professionnels - Carreleurs
export const tilerServices: Service[] = [
  {
    id: 't1',
    title: 'Carreleur Professionnel Kinshasa',
    description: 'Pose de carrelage intérieur et extérieur. Sol, mur, terrasse, piscine. Faïence, grès, pierre naturelle. Travail soigné garanti.',
    price: 160,
    location: 'Avenue Colonel Ebeya, Gombe, Kinshasa',
    images: ['https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200'],
    features: ['Intérieur/Extérieur', 'Pierre naturelle', 'Piscine', 'Garantie'],
    category: 'tiler',
    rating: 4.7,
    reviews: 95,
    phone: '+243 890 234 567',
    availability: 'Lun-Sam 7h-18h',
  },
]

// Services professionnels - Frigoristes
export const refrigerationServices: Service[] = [
  {
    id: 'f1',
    title: 'Frigoriste Expert Kinshasa',
    description: 'Spécialiste en climatisation et froid. Installation, maintenance, dépannage de climatiseurs, chambres froides, réfrigérateurs. Intervention rapide.',
    price: 170,
    location: 'Avenue Wagenia, Gombe, Kinshasa',
    images: ['https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=1200'],
    features: ['Climatisation', 'Chambre froide', 'Dépannage urgent', 'Maintenance'],
    category: 'refrigeration-technician',
    rating: 4.9,
    reviews: 142,
    phone: '+243 841 876 543',
    availability: '24/7',
  },
]

// Services professionnels - Ajusteurs
export const adjusterServices: Service[] = [
  {
    id: 'aj1',
    title: 'Ajusteur Métallier Kinshasa',
    description: 'Ajusteur métallier professionnel. Fabrication et installation de portails, grilles, rampes, structures métalliques. Soudure et finitions.',
    price: 190,
    location: 'Avenue Huileries, Gombe, Kinshasa',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200'],
    features: ['Portails', 'Grilles sécurité', 'Structures métalliques', 'Soudure'],
    category: 'adjuster',
    rating: 4.6,
    reviews: 73,
    phone: '+243 819 345 678',
    availability: 'Lun-Sam 7h-17h',
  },
]

// Tous les services professionnels
export const allProfessionalServices: Service[] = [
  ...plumberServices,
  ...electricianServices,
  ...painterServices,
  ...architectServices,
  ...carpenterServices,
  ...tilerServices,
  ...refrigerationServices,
  ...adjusterServices,
]

// Fonction helper pour trouver un service par ID
export const findServiceById = (id: string): Service | undefined => {
  return [...movingServices, ...butlerServices, ...allProfessionalServices].find((s) => s.id === id)
}

// Fonction helper pour obtenir les services par catégorie
export const getServicesByCategory = (category: string): Service[] => {
  return [...movingServices, ...butlerServices, ...allProfessionalServices].filter(
    (s) => s.category === category
  )
}

