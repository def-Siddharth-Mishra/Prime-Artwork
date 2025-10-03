/**
 * Application constants
 */

import type { ColumnType } from '../types';

// Table column definitions (excluding ID as per requirements)
export const TABLE_COLUMNS: ColumnType[] = [
  { field: 'title', header: 'Title' },
  { field: 'place_of_origin', header: 'Place of Origin' },
  { field: 'artist_display', header: 'Artist Display' },
  { field: 'inscriptions', header: 'Inscriptions' },
  { field: 'date_start', header: 'Date Start' },
  { field: 'date_end', header: 'Date End' },
];

// UI Constants
export const UI_CONSTANTS = {
  DEBOUNCE_DELAY: 300,
  MAX_TEXT_LENGTH: 100,
  MIN_SELECTION_COUNT: 1,
  MAX_SELECTION_COUNT: 1000,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  SELECTED_ROWS: 'selectedArtworkRows',
  USER_PREFERENCES: 'userPreferences',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch artwork data',
  NETWORK_ERROR: 'Network connection error',
  INVALID_RESPONSE: 'Invalid response from server',
  SELECTION_FAILED: 'Failed to update selection',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SELECTION_CLEARED: 'All selections cleared successfully',
  DATA_LOADED: 'Data loaded successfully',
} as const;