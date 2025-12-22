/**
 * Wrapper pour fetch qui réduit la visibilité des requêtes
 * Note: Les requêtes réseau resteront toujours visibles dans l'onglet Network
 * du navigateur pour des raisons de sécurité, mais elles ne seront pas loggées dans la console
 */

interface FetchOptions extends RequestInit {
  silent?: boolean // Si true, ne log pas les erreurs
}

const originalFetch = window.fetch

// Store original console methods
const originalConsole = {
  log: console.log.bind(console),
  error: console.error.bind(console),
  warn: console.warn.bind(console),
  info: console.info.bind(console),
}

// Filter out API-related logs
const shouldFilterLog = (args: any[]): boolean => {
  const message = args.join(' ').toLowerCase()
  const apiKeywords = [
    'api',
    'fetch',
    'request',
    'response',
    'register',
    'type_accounts',
    'casanayo',
    'server.casanayo',
  ]
  return apiKeywords.some((keyword) => message.includes(keyword))
}

// Override console methods to filter API-related logs
const setupConsoleFiltering = () => {
  console.log = (...args: any[]) => {
    if (!shouldFilterLog(args)) {
      originalConsole.log(...args)
    }
  }

  console.error = (...args: any[]) => {
    if (!shouldFilterLog(args)) {
      originalConsole.error(...args)
    }
  }

  console.warn = (...args: any[]) => {
    if (!shouldFilterLog(args)) {
      originalConsole.warn(...args)
    }
  }

  console.info = (...args: any[]) => {
    if (!shouldFilterLog(args)) {
      originalConsole.info(...args)
    }
  }
}

// Initialize console filtering on module load
setupConsoleFiltering()

export const silentFetch = async (
  url: string | URL | Request,
  options: FetchOptions = {},
): Promise<Response> => {
  const { silent = true, ...fetchOptions } = options

  try {
    const response = await originalFetch(url, {
      ...fetchOptions,
      // Options pour réduire la traçabilité
      cache: fetchOptions.cache || 'no-store',
      keepalive: false,
    })

    return response
  } catch (error) {
    throw error
  }
}

// Export a default fetch wrapper
export default silentFetch
