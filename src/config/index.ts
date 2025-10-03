/**
 * Application configuration utilities
 * Centralizes environment variables and application settings
 */

interface AppConfig {
  api: {
    baseUrl: string;
    artworksEndpoint: string;
    getArtworksUrl: (page: number) => string;
  };
  app: {
    name: string;
    version: string;
    defaultPageSize: number;
  };
  env: {
    isDevelopment: boolean;
    isProduction: boolean;
  };
}

export const config: AppConfig = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.artic.edu/api/v1',
    artworksEndpoint: import.meta.env.VITE_ARTWORKS_ENDPOINT || '/artworks',
    getArtworksUrl: (page: number) => 
      `${import.meta.env.VITE_API_BASE_URL || 'https://api.artic.edu/api/v1'}${import.meta.env.VITE_ARTWORKS_ENDPOINT || '/artworks'}?page=${page}`,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Prime Artworks',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    defaultPageSize: Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 12,
  },
  env: {
    isDevelopment: import.meta.env.DEV || import.meta.env.VITE_NODE_ENV === 'development',
    isProduction: import.meta.env.PROD || import.meta.env.VITE_NODE_ENV === 'production',
  },
};

// Type guard for environment variables
export const validateEnvironment = (): void => {
  const required = [
    'VITE_API_BASE_URL',
  ];

  const missing = required.filter(env => !import.meta.env[env]);
  
  if (missing.length > 0 && config.env.isProduction) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
};

// Initialize validation on module load
validateEnvironment();