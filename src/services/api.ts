import silentFetch from '@/utils/fetchWrapper'

const API_BASE_URL = 'https://server.casanayo.com'

export interface TypeAccount {
  typeAccountId: number
  name: string
}

// Deprecated: Use useTypeAccountsStore instead
// This function is kept for backward compatibility but should use the store
export const fetchTypeAccounts = async (): Promise<TypeAccount[]> => {
  const { useTypeAccountsStore } = await import('@/stores/typeAccounts')
  const store = useTypeAccountsStore()
  return await store.getTypeAccountsExcludingAdmin()
}

export interface RegisterUserData {
  phone: string
  password: string
  email: string
  username: string
  city: string
  country: string
}

export interface RegisterAccountData {
  typeAccount: number
}

export interface RegisterActorData {
  lastName: string
  firstName: string
  address: string
  images?: string | null
  cardFront?: string | null
  cardBack?: string | null
  typeCardId?: number
  parrainId?: number
  numberCard?: string
}

export interface RegisterRequest {
  user: RegisterUserData
  account: RegisterAccountData[]
  actor: RegisterActorData
}

// Map typeAccountId to endpoint
const getEndpointByTypeAccountId = (typeAccountId: number): string => {
  const endpointMap: Record<number, string> = {
    2: 'commissionnaires',
    3: 'bailleurs',
    4: 'locataires',
    5: 'majordomes',
    6: 'demenagements',
    7: 'electriciens',
    8: 'salubrite',
    9: 'peintres',
    10: 'carrelleurs',
    11: 'menusiers',
    12: 'frigoristes',
    13: 'ajusteurs',
    14: 'architects',
    15: 'chauffeurs',
    16: 'plombiers',
    18: 'macons',
  }

  return endpointMap[typeAccountId] || ''
}

// Get the property name for the request body based on typeAccountId
const getPropertyNameByTypeAccountId = (typeAccountId: number): string => {
  const propertyMap: Record<number, string> = {
    2: 'commissionnaire',
    3: 'bailleur',
    4: 'locataire',
    5: 'majordome',
    6: 'demenagement',
    7: 'electricien',
    8: 'salubrite',
    9: 'peintre',
    10: 'carrelleur',
    11: 'menusier',
    12: 'frigoriste',
    13: 'ajusteur',
    14: 'architect',
    15: 'chauffeur',
    16: 'plombier',
    18: 'macon',
  }

  return propertyMap[typeAccountId] || ''
}

export const registerUser = async (
  userData: RegisterUserData,
  actorData: RegisterActorData,
  accountData: RegisterAccountData[],
): Promise<any> => {
  try {
    const requestBody: RegisterRequest = {
      user: userData,
      account: accountData,
      actor: actorData,
    }

    const response = await silentFetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Registration failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

// Login interfaces
export interface LoginRequest {
  identifiant: string
  password: string
}

export interface LoginResponse {
  member: {
    user: any
    accounts: any[]
    profile: any
  }
  token: string
  refresh_token: string
  message: string
}

// Login function
export const login = async (identifiant: string, password: string): Promise<LoginResponse> => {
  try {
    const requestBody: LoginRequest = {
      identifiant,
      password,
    }

    const response = await silentFetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Login failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

// Forgot Password interfaces
export interface GenerateOTPRequest {
  identifier: string
}

export interface VerifyOTPRequest {
  identifier: string
  code: string
}

export interface VerifyOTPResponse {
  userId: number
  [key: string]: any
}

export interface ResetPasswordRequest {
  newPassword: string
  userId: number
}

// Generate OTP
export const generateOTP = async (identifier: string): Promise<any> => {
  try {
    const requestBody: GenerateOTPRequest = {
      identifier,
    }

    const response = await silentFetch(`${API_BASE_URL}/otp/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to generate OTP: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

// Verify OTP
export const verifyOTP = async (identifier: string, code: string): Promise<VerifyOTPResponse> => {
  try {
    const requestBody: VerifyOTPRequest = {
      identifier,
      code,
    }

    const response = await silentFetch(`${API_BASE_URL}/otp/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to verify OTP: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

// Reset Password
export const resetPassword = async (newPassword: string, userId: number): Promise<any> => {
  try {
    const requestBody: ResetPasswordRequest = {
      newPassword,
      userId,
    }

    const response = await silentFetch(`${API_BASE_URL}/reset/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to reset password: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

// Property API Types
export interface ApiPropertyImage {
  propertyImageId: number
  property: null | any
  name: string
  path: string
}

export interface ApiPropertyFeature {
  featureId: number
  name: string
}

export interface ApiPropertyType {
  propertyTypeId: number
  name: string
  description: string
  property: any[]
}

export interface ApiCountry {
  countryId: number
  name: string
}

export interface ApiCity {
  cityId: number
  country: ApiCountry
  name: string
}

export interface ApiQuartier {
  quartierId: number
  name: string
}

export interface ApiCommune {
  communeId: number
  district: null | any
  quartiers: any[]
  name: string
}

export interface ApiUser {
  userId: number
  typeAccount: TypeAccount
  email: string
  username: string
  phone: string
  city: string
  country: null | any
  certified: boolean
  premium: boolean
}

export interface ApiProperty {
  propertyId: number
  title: string
  description: string
  price: number
  surface: number
  rooms: number
  bedrooms: number
  electric: number
  water: number
  kitchen: number
  livingRoom: number
  guarantee: string
  bathroom: number
  floor: number
  address: string
  city: ApiCity
  quartier: ApiQuartier
  postalCode: string
  commune: ApiCommune
  communeValue: string | null
  quartierValue: string | null
  cityValue: string | null
  countryValue: string | null
  sold: boolean
  transactionType: 'vente' | 'location'
  propertyType: ApiPropertyType
  user: ApiUser
  latitude: number
  longitude: number
  features: ApiPropertyFeature[]
  favorites: any[]
  propertyImage: ApiPropertyImage[]
  propertyImageRoom: ApiPropertyImage[]
  propertyImageLivingRoom: ApiPropertyImage[]
  propertyImageKitchen: ApiPropertyImage[]
  createdAt: string
  updatedAt: string
  available: boolean
}

export interface ApiPropertiesPageable {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  unpaged: boolean
}

export interface ApiPropertiesResponse {
  properties: {
    content: ApiProperty[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: ApiPropertiesPageable
    size: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    totalElements: number
    totalPages: number
  }
}

// Fetch properties from API
export const fetchProperties = async (params?: {
  page?: number
  size?: number
  sort?: string
}): Promise<ApiPropertiesResponse> => {
  try {
    const queryParams = new URLSearchParams()
    if (params?.page !== undefined) queryParams.append('page', params.page.toString())
    if (params?.size !== undefined) queryParams.append('size', params.size.toString())
    if (params?.sort) queryParams.append('sort', params.sort)

    const url = `${API_BASE_URL}/api/property${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const response = await silentFetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to fetch properties: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

// Fetch single property by ID
export const fetchPropertyById = async (propertyId: number): Promise<ApiProperty> => {
  try {
    const response = await silentFetch(`${API_BASE_URL}/api/property/${propertyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to fetch property: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

// Actualities/News API Types
export interface ApiActuality {
  id: number
  title: string
  summary: string
  content: string
  learning_points: string[]
  key_points: string[]
  image: string
  category: string
  author: string
  author_photo: string
  publish_date: string
  read_time: number
  views: number
  tags: string[]
  featured: boolean
  status: string
  related_articles: any[]
  created_at: string
  updated_at: string
}

export interface ApiActualityResponse {
  success: boolean
  data: ApiActuality
  message?: string
}

export interface ApiActualityListResponse {
  success: boolean
  data: ApiActuality[]
  message?: string
}

export interface UpdateActualityRequest {
  title?: string
  summary?: string
  content?: string
  learning_points?: string[]
  key_points?: string[]
  image?: string | File
  category?: string
  author?: string
  author_photo?: string | File
  publish_date?: string
  read_time?: number
  tags?: string[]
  featured?: boolean
  status?: string
}

// Fetch actualities/news from API
export const fetchActualities = async (params?: {
  page?: number
  size?: number
  category?: string
  status?: string
}): Promise<ApiActualityListResponse> => {
  try {
    const queryParams = new URLSearchParams()
    if (params?.page !== undefined) queryParams.append('page', params.page.toString())
    if (params?.size !== undefined) queryParams.append('size', params.size.toString())
    if (params?.category) queryParams.append('category', params.category)
    if (params?.status) queryParams.append('status', params.status)

    const url = `${API_BASE_URL}/api/actualities${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const response = await silentFetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to fetch actualities: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

// Fetch single actuality by ID
export const fetchActualityById = async (actualityId: number): Promise<ApiActualityResponse> => {
  try {
    const response = await silentFetch(`${API_BASE_URL}/api/actualities/${actualityId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to fetch actuality: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

// Update actuality
export const updateActuality = async (
  actualityId: number,
  data: UpdateActualityRequest
): Promise<ApiActualityResponse> => {
  try {
    // Check if we have file uploads (image or author_photo as File objects)
    const hasFileUploads = 
      (data.image !== undefined && data.image instanceof File) ||
      (data.author_photo !== undefined && data.author_photo instanceof File)

    let body: FormData | string
    let headers: Record<string, string> = {}
    let method: string = 'PUT'

    if (hasFileUploads) {
      // Use FormData if we have file uploads
      const formData = new FormData()
      
      // Laravel method spoofing for PUT requests with FormData
      formData.append('_method', 'PUT')
      
      // Append all fields to FormData
      if (data.title !== undefined) formData.append('title', data.title)
      if (data.summary !== undefined) formData.append('summary', data.summary)
      if (data.content !== undefined) formData.append('content', data.content)
      if (data.learning_points !== undefined && Array.isArray(data.learning_points)) {
        // Try both formats for Laravel compatibility
        data.learning_points.forEach((point, index) => {
          formData.append(`learning_points[${index}]`, point)
        })
        // Also try as JSON string (some Laravel configs prefer this)
        formData.append('learning_points_json', JSON.stringify(data.learning_points))
      }
      if (data.key_points !== undefined && Array.isArray(data.key_points)) {
        data.key_points.forEach((point, index) => {
          formData.append(`key_points[${index}]`, point)
        })
        formData.append('key_points_json', JSON.stringify(data.key_points))
      }
      if (data.image !== undefined) {
        if (data.image instanceof File) {
          formData.append('image', data.image)
        } else {
          formData.append('image', data.image)
        }
      }
      if (data.category !== undefined) formData.append('category', data.category)
      if (data.author !== undefined) formData.append('author', data.author)
      if (data.author_photo !== undefined) {
        if (data.author_photo instanceof File) {
          formData.append('author_photo', data.author_photo)
        } else {
          formData.append('author_photo', data.author_photo)
        }
      }
      if (data.publish_date !== undefined) formData.append('publish_date', data.publish_date)
      if (data.read_time !== undefined) formData.append('read_time', data.read_time.toString())
      if (data.tags !== undefined && Array.isArray(data.tags)) {
        data.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag)
        })
        formData.append('tags_json', JSON.stringify(data.tags))
      }
      if (data.featured !== undefined) formData.append('featured', data.featured.toString())
      if (data.status !== undefined) formData.append('status', data.status)

      body = formData
      // Use POST with _method=PUT for Laravel compatibility
      method = 'POST'
      // Don't set Content-Type header for FormData, browser will set it with boundary
    } else {
      // Use JSON if no file uploads
      const jsonData: any = {}
      
      if (data.title !== undefined) jsonData.title = data.title
      if (data.summary !== undefined) jsonData.summary = data.summary
      if (data.content !== undefined) jsonData.content = data.content
      if (data.learning_points !== undefined) jsonData.learning_points = data.learning_points
      if (data.key_points !== undefined) jsonData.key_points = data.key_points
      if (data.image !== undefined) jsonData.image = data.image
      if (data.category !== undefined) jsonData.category = data.category
      if (data.author !== undefined) jsonData.author = data.author
      if (data.author_photo !== undefined) jsonData.author_photo = data.author_photo
      if (data.publish_date !== undefined) jsonData.publish_date = data.publish_date
      if (data.read_time !== undefined) jsonData.read_time = data.read_time
      if (data.tags !== undefined) jsonData.tags = data.tags
      if (data.featured !== undefined) jsonData.featured = data.featured
      if (data.status !== undefined) jsonData.status = data.status

      body = JSON.stringify(jsonData)
      headers['Content-Type'] = 'application/json'
    }

    // Determine method (POST with _method=PUT for FormData, PUT for JSON)
    const httpMethod = hasFileUploads ? 'POST' : 'PUT'
    
    console.log(`🔄 Envoi de la requête ${httpMethod} vers: ${API_BASE_URL}/api/actualities/${actualityId}`)
    console.log('📦 Type de body:', hasFileUploads ? 'FormData' : 'JSON')
    if (!hasFileUploads) {
      console.log('📦 Contenu JSON:', body)
    } else {
      console.log('📦 FormData contient _method:', (body as FormData).get('_method'))
    }

    const response = await silentFetch(`${API_BASE_URL}/api/actualities/${actualityId}`, {
      method: httpMethod,
      headers,
      body,
      cache: 'no-store',
      keepalive: false,
      silent: false, // Enable logging for debugging
    })

    console.log('📥 Statut de la réponse:', response.status, response.statusText)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Erreur API:', errorData)
      throw new Error(errorData.message || `Failed to update actuality: ${response.statusText}`)
    }

    const result = await response.json()
    console.log('📥 Réponse complète de l\'API:', result)
    
    // Ensure we return the data in the expected format
    if (result.success && result.data) {
      console.log('✅ Données retournées:', result.data)
      return result
    }
    
    // If response doesn't have success/data structure, wrap it
    const wrappedResult = {
      success: true,
      data: result.data || result,
      message: result.message || 'Actualité mise à jour avec succès'
    }
    console.log('📦 Données wrappées:', wrappedResult)
    return wrappedResult
  } catch (error) {
    throw error
  }
}

// Create actuality
export const createActuality = async (data: UpdateActualityRequest): Promise<ApiActualityResponse> => {
  try {
    const formData = new FormData()
    
    // Append all required fields
    if (data.title) formData.append('title', data.title)
    if (data.summary) formData.append('summary', data.summary)
    if (data.content) formData.append('content', data.content)
    if (data.learning_points) {
      data.learning_points.forEach((point, index) => {
        formData.append(`learning_points[${index}]`, point)
      })
    }
    if (data.key_points) {
      data.key_points.forEach((point, index) => {
        formData.append(`key_points[${index}]`, point)
      })
    }
    if (data.image) {
      if (data.image instanceof File) {
        formData.append('image', data.image)
      } else {
        formData.append('image', data.image)
      }
    }
    if (data.category) formData.append('category', data.category)
    if (data.author) formData.append('author', data.author)
    if (data.author_photo) {
      if (data.author_photo instanceof File) {
        formData.append('author_photo', data.author_photo)
      } else {
        formData.append('author_photo', data.author_photo)
      }
    }
    if (data.publish_date) formData.append('publish_date', data.publish_date)
    if (data.read_time) formData.append('read_time', data.read_time.toString())
    if (data.tags) {
      data.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag)
      })
    }
    if (data.featured !== undefined) formData.append('featured', data.featured.toString())
    if (data.status) formData.append('status', data.status)

    const response = await silentFetch(`${API_BASE_URL}/api/actualities`, {
      method: 'POST',
      body: formData,
      cache: 'no-store',
      keepalive: false,
      silent: true,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to create actuality: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}
