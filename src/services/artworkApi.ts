/**
 * API Service for artwork data
 * Handles all API calls and data transformation
 */

import { config } from '../config';
import type { ArtworkApiResponse } from '../types';

// Create API error class
export class ApiError extends Error {
  public status: number;
  public code?: string;

  constructor(
    message: string,
    status: number = 0,
    code?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export class ArtworkApiService {
  private static instance: ArtworkApiService;

  public static getInstance(): ArtworkApiService {
    if (!ArtworkApiService.instance) {
      ArtworkApiService.instance = new ArtworkApiService();
    }
    return ArtworkApiService.instance;
  }

  /**
   * Fetch artworks for a specific page
   */
  async fetchArtworks(page: number): Promise<ArtworkApiResponse> {
    try {
      const url = config.api.getArtworksUrl(page);
      
      if (config.env.isDevelopment) {
        console.log(`Fetching artworks from: ${url}`);
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new ApiError(
          `Failed to fetch artworks: ${response.status} ${response.statusText}`,
          response.status
        );
      }

      const data: ArtworkApiResponse = await response.json();
      
      // Validate response structure
      if (!data.data || !Array.isArray(data.data)) {
        throw new ApiError('Invalid response format: missing data array');
      }

      if (!data.pagination) {
        throw new ApiError('Invalid response format: missing pagination info');
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        0
      );
    }
  }

  /**
   * Batch fetch artworks from multiple pages
   * Used for cross-page selection
   */
  async fetchMultiplePages(startPage: number, endPage: number): Promise<ArtworkApiResponse[]> {
    const promises: Promise<ArtworkApiResponse>[] = [];
    
    for (let page = startPage; page <= endPage; page++) {
      promises.push(this.fetchArtworks(page));
    }

    try {
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error fetching multiple pages:', error);
      throw error;
    }
  }
}



// Export singleton instance
export const artworkApi = ArtworkApiService.getInstance();