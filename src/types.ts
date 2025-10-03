// Column configuration for DataTable
export interface ColumnType {
  field: keyof ArtworkData;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
}

// Main artwork data structure based on API response
export interface ArtworkData {
  id: number;
  title: string;
  place_of_origin: string | null;
  artist_display: string | null;
  inscriptions: string | null;
  date_start: number | null;
  date_end: number | null;
}

// Complete API response structure for artworks
export interface ArtworkApiResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url?: string;
    prev_url?: string;
  };
  data: ArtworkData[];
  info?: {
    license_text: string;
    license_links: string[];
    version: string;
  };
}

// Pagination state interface
export interface PaginationState {
  first: number;
  rows: number;
  page: number;
  totalRecords: number;
}

// Selection state interface
export interface SelectionState {
  selectedRows: ArtworkData[];
  selectedIds: Set<number>;
  selectedCount: number;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  isSelecting: boolean;
  error: string | null;
}



// Custom hook return types
export interface UseArtworksReturn {
  artworks: ArtworkData[];
  pagination: PaginationState;
  loading: LoadingState;
  fetchArtworks: (page: number) => Promise<void>;
  refetch: () => Promise<void>;
}

export interface UseSelectionReturn {
  selection: SelectionState;
  handleSelectionChange: (newSelection: ArtworkData[]) => void;
  selectRowsAcrossPages: (count: number, currentPage: number) => Promise<void>;
  clearAllSelections: () => void;
  isRowSelected: (id: number) => boolean;
}

// Legacy interface for backward compatibility
/** @deprecated Use ArtworkData instead */
export type MainData = ArtworkData;

// Constants
export const ARTWORK_FIELDS = [
  'id',
  'title',
  'place_of_origin',
  'artist_display',
  'inscriptions',
  'date_start',
  'date_end',
] as const;

export type ArtworkField = typeof ARTWORK_FIELDS[number];