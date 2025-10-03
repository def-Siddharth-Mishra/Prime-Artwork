/**
 * Utility functions for the application
 */

import type { ArtworkData } from '../types';

/**
 * Formats a nullable string value for display
 */
export const formatDisplayValue = (value: string | null): string => {
  return value || 'N/A';
};

/**
 * Formats date range for display
 */
export const formatDateRange = (
  dateStart: number | null, 
  dateEnd: number | null
): string => {
  if (!dateStart && !dateEnd) return 'N/A';
  
  const start = dateStart ? dateStart.toString() : '?';
  const end = dateEnd ? dateEnd.toString() : '?';
  
  if (dateStart === dateEnd) return start;
  
  return `${start} - ${end}`;
};

/**
 * Truncates text to a specified length
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Creates a stable key for React components
 */
export const createKey = (...parts: (string | number)[]): string => {
  return parts.join('-');
};

/**
 * Checks if a value is empty (null, undefined, or empty string)
 */
export const isEmpty = (value: unknown): value is null | undefined | '' => {
  return value === null || value === undefined || value === '';
};

/**
 * Safe JSON parse with error handling
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

/**
 * Filters artworks by current page selection
 */
export const filterSelectedArtworks = (
  artworks: ArtworkData[],
  selectedIds: Set<number>
): ArtworkData[] => {
  return artworks.filter(artwork => selectedIds.has(artwork.id));
};

/**
 * Creates a download link for data export
 */
export const createDownloadLink = (data: unknown, filename: string): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};