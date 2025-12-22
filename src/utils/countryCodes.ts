export interface CountryCode {
  code: string
  dialCode: string
  name: string
  flag: string
}

export const countryCodes: CountryCode[] = [
  // Afrique
  { code: 'CD', dialCode: '+243', name: 'Congo (RDC)', flag: '🇨🇩' },
  { code: 'DZ', dialCode: '+213', name: 'Algérie', flag: '🇩🇿' },
  { code: 'AO', dialCode: '+244', name: 'Angola', flag: '🇦🇴' },
  { code: 'BJ', dialCode: '+229', name: 'Bénin', flag: '🇧🇯' },
  { code: 'BW', dialCode: '+267', name: 'Botswana', flag: '🇧🇼' },
  { code: 'BF', dialCode: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'BI', dialCode: '+257', name: 'Burundi', flag: '🇧🇮' },
  { code: 'CM', dialCode: '+237', name: 'Cameroun', flag: '🇨🇲' },
  { code: 'CV', dialCode: '+238', name: 'Cap-Vert', flag: '🇨🇻' },
  { code: 'CF', dialCode: '+236', name: 'République centrafricaine', flag: '🇨🇫' },
  { code: 'TD', dialCode: '+235', name: 'Tchad', flag: '🇹🇩' },
  { code: 'KM', dialCode: '+269', name: 'Comores', flag: '🇰🇲' },
  { code: 'CG', dialCode: '+242', name: 'Congo', flag: '🇨🇬' },
  { code: 'CI', dialCode: '+225', name: "Côte d'Ivoire", flag: '🇨🇮' },
  { code: 'DJ', dialCode: '+253', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'EG', dialCode: '+20', name: 'Égypte', flag: '🇪🇬' },
  { code: 'GQ', dialCode: '+240', name: 'Guinée équatoriale', flag: '🇬🇶' },
  { code: 'ER', dialCode: '+291', name: 'Érythrée', flag: '🇪🇷' },
  { code: 'SZ', dialCode: '+268', name: 'Eswatini', flag: '🇸🇿' },
  { code: 'ET', dialCode: '+251', name: 'Éthiopie', flag: '🇪🇹' },
  { code: 'GA', dialCode: '+241', name: 'Gabon', flag: '🇬🇦' },
  { code: 'GM', dialCode: '+220', name: 'Gambie', flag: '🇬🇲' },
  { code: 'GH', dialCode: '+233', name: 'Ghana', flag: '🇬🇭' },
  { code: 'GN', dialCode: '+224', name: 'Guinée', flag: '🇬🇳' },
  { code: 'GW', dialCode: '+245', name: 'Guinée-Bissau', flag: '🇬🇼' },
  { code: 'KE', dialCode: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: 'LS', dialCode: '+266', name: 'Lesotho', flag: '🇱🇸' },
  { code: 'LR', dialCode: '+231', name: 'Libéria', flag: '🇱🇷' },
  { code: 'LY', dialCode: '+218', name: 'Libye', flag: '🇱🇾' },
  { code: 'MG', dialCode: '+261', name: 'Madagascar', flag: '🇲🇬' },
  { code: 'MW', dialCode: '+265', name: 'Malawi', flag: '🇲🇼' },
  { code: 'ML', dialCode: '+223', name: 'Mali', flag: '🇲🇱' },
  { code: 'MR', dialCode: '+222', name: 'Mauritanie', flag: '🇲🇷' },
  { code: 'MU', dialCode: '+230', name: 'Maurice', flag: '🇲🇺' },
  { code: 'MA', dialCode: '+212', name: 'Maroc', flag: '🇲🇦' },
  { code: 'MZ', dialCode: '+258', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'NA', dialCode: '+264', name: 'Namibie', flag: '🇳🇦' },
  { code: 'NE', dialCode: '+227', name: 'Niger', flag: '🇳🇪' },
  { code: 'NG', dialCode: '+234', name: 'Nigéria', flag: '🇳🇬' },
  { code: 'RW', dialCode: '+250', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'ST', dialCode: '+239', name: 'Sao Tomé-et-Principe', flag: '🇸🇹' },
  { code: 'SN', dialCode: '+221', name: 'Sénégal', flag: '🇸🇳' },
  { code: 'SC', dialCode: '+248', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'SL', dialCode: '+232', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'SO', dialCode: '+252', name: 'Somalie', flag: '🇸🇴' },
  { code: 'ZA', dialCode: '+27', name: 'Afrique du Sud', flag: '🇿🇦' },
  { code: 'SS', dialCode: '+211', name: 'Soudan du Sud', flag: '🇸🇸' },
  { code: 'SD', dialCode: '+249', name: 'Soudan', flag: '🇸🇩' },
  { code: 'TZ', dialCode: '+255', name: 'Tanzanie', flag: '🇹🇿' },
  { code: 'TG', dialCode: '+228', name: 'Togo', flag: '🇹🇬' },
  { code: 'TN', dialCode: '+216', name: 'Tunisie', flag: '🇹🇳' },
  { code: 'UG', dialCode: '+256', name: 'Ouganda', flag: '🇺🇬' },
  { code: 'ZM', dialCode: '+260', name: 'Zambie', flag: '🇿🇲' },
  { code: 'ZW', dialCode: '+263', name: 'Zimbabwe', flag: '🇿🇼' },

  // Europe
  { code: 'AL', dialCode: '+355', name: 'Albanie', flag: '🇦🇱' },
  { code: 'AD', dialCode: '+376', name: 'Andorre', flag: '🇦🇩' },
  { code: 'AM', dialCode: '+374', name: 'Arménie', flag: '🇦🇲' },
  { code: 'AT', dialCode: '+43', name: 'Autriche', flag: '🇦🇹' },
  { code: 'AZ', dialCode: '+994', name: 'Azerbaïdjan', flag: '🇦🇿' },
  { code: 'BY', dialCode: '+375', name: 'Biélorussie', flag: '🇧🇾' },
  { code: 'BE', dialCode: '+32', name: 'Belgique', flag: '🇧🇪' },
  { code: 'BA', dialCode: '+387', name: 'Bosnie-Herzégovine', flag: '🇧🇦' },
  { code: 'BG', dialCode: '+359', name: 'Bulgarie', flag: '🇧🇬' },
  { code: 'HR', dialCode: '+385', name: 'Croatie', flag: '🇭🇷' },
  { code: 'CY', dialCode: '+357', name: 'Chypre', flag: '🇨🇾' },
  { code: 'CZ', dialCode: '+420', name: 'Tchéquie', flag: '🇨🇿' },
  { code: 'DK', dialCode: '+45', name: 'Danemark', flag: '🇩🇰' },
  { code: 'EE', dialCode: '+372', name: 'Estonie', flag: '🇪🇪' },
  { code: 'FI', dialCode: '+358', name: 'Finlande', flag: '🇫🇮' },
  { code: 'FR', dialCode: '+33', name: 'France', flag: '🇫🇷' },
  { code: 'GE', dialCode: '+995', name: 'Géorgie', flag: '🇬🇪' },
  { code: 'DE', dialCode: '+49', name: 'Allemagne', flag: '🇩🇪' },
  { code: 'GR', dialCode: '+30', name: 'Grèce', flag: '🇬🇷' },
  { code: 'HU', dialCode: '+36', name: 'Hongrie', flag: '🇭🇺' },
  { code: 'IS', dialCode: '+354', name: 'Islande', flag: '🇮🇸' },
  { code: 'IE', dialCode: '+353', name: 'Irlande', flag: '🇮🇪' },
  { code: 'IT', dialCode: '+39', name: 'Italie', flag: '🇮🇹' },
  { code: 'KZ', dialCode: '+7', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'XK', dialCode: '+383', name: 'Kosovo', flag: '🇽🇰' },
  { code: 'LV', dialCode: '+371', name: 'Lettonie', flag: '🇱🇻' },
  { code: 'LI', dialCode: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'LT', dialCode: '+370', name: 'Lituanie', flag: '🇱🇹' },
  { code: 'LU', dialCode: '+352', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MT', dialCode: '+356', name: 'Malte', flag: '🇲🇹' },
  { code: 'MD', dialCode: '+373', name: 'Moldavie', flag: '🇲🇩' },
  { code: 'MC', dialCode: '+377', name: 'Monaco', flag: '🇲🇨' },
  { code: 'ME', dialCode: '+382', name: 'Monténégro', flag: '🇲🇪' },
  { code: 'NL', dialCode: '+31', name: 'Pays-Bas', flag: '🇳🇱' },
  { code: 'MK', dialCode: '+389', name: 'Macédoine du Nord', flag: '🇲🇰' },
  { code: 'NO', dialCode: '+47', name: 'Norvège', flag: '🇳🇴' },
  { code: 'PL', dialCode: '+48', name: 'Pologne', flag: '🇵🇱' },
  { code: 'PT', dialCode: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: 'RO', dialCode: '+40', name: 'Roumanie', flag: '🇷🇴' },
  { code: 'RU', dialCode: '+7', name: 'Russie', flag: '🇷🇺' },
  { code: 'SM', dialCode: '+378', name: 'Saint-Marin', flag: '🇸🇲' },
  { code: 'RS', dialCode: '+381', name: 'Serbie', flag: '🇷🇸' },
  { code: 'SK', dialCode: '+421', name: 'Slovaquie', flag: '🇸🇰' },
  { code: 'SI', dialCode: '+386', name: 'Slovénie', flag: '🇸🇮' },
  { code: 'ES', dialCode: '+34', name: 'Espagne', flag: '🇪🇸' },
  { code: 'SE', dialCode: '+46', name: 'Suède', flag: '🇸🇪' },
  { code: 'CH', dialCode: '+41', name: 'Suisse', flag: '🇨🇭' },
  { code: 'TR', dialCode: '+90', name: 'Turquie', flag: '🇹🇷' },
  { code: 'UA', dialCode: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'GB', dialCode: '+44', name: 'Royaume-Uni', flag: '🇬🇧' },
  { code: 'VA', dialCode: '+379', name: 'Vatican', flag: '🇻🇦' },

  // Amériques
  { code: 'US', dialCode: '+1', name: 'États-Unis', flag: '🇺🇸' },
  { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'MX', dialCode: '+52', name: 'Mexique', flag: '🇲🇽' },
  { code: 'BR', dialCode: '+55', name: 'Brésil', flag: '🇧🇷' },
  { code: 'AR', dialCode: '+54', name: 'Argentine', flag: '🇦🇷' },

  // Asie
  { code: 'CN', dialCode: '+86', name: 'Chine', flag: '🇨🇳' },
  { code: 'JP', dialCode: '+81', name: 'Japon', flag: '🇯🇵' },
  { code: 'IN', dialCode: '+91', name: 'Inde', flag: '🇮🇳' },

  // Moyen-Orient
  { code: 'SA', dialCode: '+966', name: 'Arabie saoudite', flag: '🇸🇦' },
  { code: 'AE', dialCode: '+971', name: 'Émirats arabes unis', flag: '🇦🇪' },

  // Océanie
  { code: 'AU', dialCode: '+61', name: 'Australie', flag: '🇦🇺' },
  { code: 'NZ', dialCode: '+64', name: 'Nouvelle-Zélande', flag: '🇳🇿' },
]

export const getCountryByDialCode = (dialCode: string): CountryCode | undefined => {
  return countryCodes.find((country) => country.dialCode === dialCode)
}

export const getCountryNameByDialCode = (dialCode: string): string => {
  const country = getCountryByDialCode(dialCode)
  return country ? country.name : ''
}
