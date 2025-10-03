/**
 * Custom hook for managing row selection state
 */

import { useState, useCallback, useEffect } from 'react';
import { artworkApi } from '../services/artworkApi';
import type { 
  ArtworkData, 
  SelectionState, 
  UseSelectionReturn 
} from '../types';

const STORAGE_KEY = 'selectedArtworkRows';

export const useSelection = (): UseSelectionReturn => {
  const [selection, setSelection] = useState<SelectionState>({
    selectedRows: [],
    selectedIds: new Set(),
    selectedCount: 0,
  });

  // Load saved selections from localStorage on mount
  useEffect(() => {
    try {
      const savedSelections = localStorage.getItem(STORAGE_KEY);
      if (savedSelections) {
        const parsedIds = JSON.parse(savedSelections) as number[];
        const idsSet = new Set(parsedIds);
        
        setSelection(prev => ({
          ...prev,
          selectedIds: idsSet,
          selectedCount: idsSet.size,
        }));
      }
    } catch (error) {
      console.error('Error loading selections from localStorage:', error);
    }
  }, []);

  // Save selections to localStorage whenever selectedIds changes
  useEffect(() => {
    try {
      const idsArray = Array.from(selection.selectedIds);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(idsArray));
    } catch (error) {
      console.error('Error saving selections to localStorage:', error);
    }
  }, [selection.selectedIds]);

  const handleSelectionChange = useCallback((newSelection: ArtworkData[]) => {
    setSelection(prev => {
      const newIds = new Set(prev.selectedIds);
      
      // Remove current page selections first
      prev.selectedRows.forEach(item => {
        newIds.delete(item.id);
      });
      
      // Add new selections
      newSelection.forEach(item => {
        newIds.add(item.id);
      });

      return {
        selectedRows: newSelection,
        selectedIds: newIds,
        selectedCount: newIds.size,
      };
    });
  }, []);

  const selectRowsAcrossPages = useCallback(async (
    count: number, 
    currentPage: number
  ): Promise<void> => {
    if (count <= 0) return;

    try {
      let remainingToSelect = count;
      let pageNum = currentPage;
      const newIds = new Set(selection.selectedIds);

      while (remainingToSelect > 0) {
        const response = await artworkApi.fetchArtworks(pageNum);
        
        if (!response.data || response.data.length === 0) break;

        let selectedFromPage = 0;
        for (const artwork of response.data) {
          if (selectedFromPage >= remainingToSelect) break;
          if (!newIds.has(artwork.id)) {
            newIds.add(artwork.id);
            selectedFromPage++;
          }
        }

        remainingToSelect -= selectedFromPage;
        
        if (selectedFromPage === 0) break; // No new selections possible
        
        pageNum++;
      }

      setSelection(prev => ({
        ...prev,
        selectedIds: newIds,
        selectedCount: newIds.size,
      }));
    } catch (error) {
      console.error('Error selecting rows across pages:', error);
    }
  }, [selection.selectedIds]);

  const clearAllSelections = useCallback(() => {
    setSelection({
      selectedRows: [],
      selectedIds: new Set(),
      selectedCount: 0,
    });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isRowSelected = useCallback((id: number) => {
    return selection.selectedIds.has(id);
  }, [selection.selectedIds]);

  return {
    selection,
    handleSelectionChange,
    selectRowsAcrossPages,
    clearAllSelections,
    isRowSelected,
  };
};