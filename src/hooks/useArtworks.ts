/**
 * Custom hook for managing artwork data and pagination
 */

import { useState, useCallback } from 'react';
import { artworkApi, ApiError } from '../services/artworkApi';
import type { 
  ArtworkData, 
  PaginationState, 
  LoadingState, 
  UseArtworksReturn 
} from '../types';
import { config } from '../config';

export const useArtworks = (): UseArtworksReturn => {
  const [artworks, setArtworks] = useState<ArtworkData[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    first: 0,
    rows: config.app.defaultPageSize,
    page: 1,
    totalRecords: 0,
  });
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    isSelecting: false,
    error: null,
  });

  const fetchArtworks = useCallback(async (page: number) => {
    setLoading(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await artworkApi.fetchArtworks(page);
      
      setArtworks(response.data);
      setPagination(prev => ({
        ...prev,
        page,
        rows: response.pagination.limit,
        totalRecords: response.pagination.total,
        first: (page - 1) * response.pagination.limit,
      }));
      
      if (config.env.isDevelopment) {
        console.log(`Loaded ${response.data.length} artworks for page ${page}`);
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Failed to fetch artworks';
      
      setLoading(prev => ({ ...prev, error: errorMessage }));
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchArtworks(pagination.page);
  }, [fetchArtworks, pagination.page]);

  return {
    artworks,
    pagination,
    loading,
    fetchArtworks,
    refetch,
  };
};