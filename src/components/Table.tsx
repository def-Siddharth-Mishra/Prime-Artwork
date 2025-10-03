import { useEffect, useRef, useState } from 'react';
import { DataTable, type DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, type PaginatorPageChangeEvent } from 'primereact/paginator';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { useArtworks } from '../hooks/useArtworks';
import { useSelection } from '../hooks/useSelection';
import { TABLE_COLUMNS, UI_CONSTANTS } from '../constants';
import { formatDisplayValue } from '../utils';
import type { ArtworkData } from '../types';
export default function ArtworksTable() {
  const [rowsToSelect, setRowsToSelect] = useState(0);
  const [isSelectingAcrossPages, setIsSelectingAcrossPages] = useState(false);
  
  const overlayRef = useRef<OverlayPanel>(null);
  
  const { artworks, pagination, loading, fetchArtworks } = useArtworks();
  const { 
    selection, 
    handleSelectionChange, 
    selectRowsAcrossPages, 
    clearAllSelections,
    isRowSelected 
  } = useSelection();

  useEffect(() => {
    fetchArtworks(1);
  }, [fetchArtworks]);
  useEffect(() => {
    if (artworks.length > 0) {
      const currentPageSelected = artworks.filter(artwork => 
        isRowSelected(artwork.id)
      );
      
      const currentIds = new Set(selection.selectedRows.map(row => row.id));
      const newIds = new Set(currentPageSelected.map(row => row.id));
      
      const isDifferent = currentIds.size !== newIds.size || 
        [...currentIds].some(id => !newIds.has(id));
      
      if (isDifferent) {
        handleSelectionChange(currentPageSelected);
      }
    }
  }, [artworks, selection.selectedIds, selection.selectedRows, isRowSelected, handleSelectionChange]);

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    const newPage = Math.floor(event.first / event.rows) + 1;
    fetchArtworks(newPage);
  };

  const handleOverlayToggle = (e: React.MouseEvent) => {
    overlayRef.current?.toggle(e);
  };

  const handleBulkSelection = async () => {
    if (rowsToSelect <= 0) return;

    setIsSelectingAcrossPages(true);
    try {
      await selectRowsAcrossPages(rowsToSelect, pagination.page);
      setRowsToSelect(0);
      overlayRef.current?.hide();
    } catch (error) {
      console.error('Error during bulk selection:', error);
    } finally {
      setIsSelectingAcrossPages(false);
    }
  };

  const handleTableSelectionChange = (e: DataTableSelectionMultipleChangeEvent<ArtworkData[]>) => {
    handleSelectionChange(e.value as ArtworkData[]);
  };

  const renderTextCell = (rowData: ArtworkData, field: keyof ArtworkData) => {
    const value = rowData[field];
    return (
      <div className="max-w-xs truncate" title={String(value || '')}>
        {formatDisplayValue(String(value || ''))}
      </div>
    );
  };
  if (loading.error) {
    return (
      <div className="card">
        <Message severity="error" text={loading.error} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 m-0">
              Artwork Collection
            </h2>
            {selection.selectedCount > 0 && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                {selection.selectedCount} selected
              </span>
            )}
          </div>
          <Button
            label="Clear All Selections"
            onClick={clearAllSelections}
            severity="secondary"
            size="small"
            disabled={selection.selectedCount === 0}
            className="flex-shrink-0"
          />
        </div>
        
        <div className="overflow-x-auto">
          <DataTable
            value={artworks}
            selection={selection.selectedRows}
            onSelectionChange={handleTableSelectionChange}
            selectionMode="multiple"
            dataKey="id"
            showGridlines
            className="w-full"
            tableStyle={{ minWidth: '800px' }}
            loading={loading.isLoading || isSelectingAcrossPages}
            emptyMessage="No artworks found"
            responsiveLayout="scroll"
            breakpoint="768px"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: '60px' }}
              frozen
            />
            <Column
              headerStyle={{ width: '40px' }}
              frozen
              header={
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={handleOverlayToggle}
                  >
                    <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                  </svg>
                </div>
              }
            />

            {TABLE_COLUMNS.map((col, index) => (
              <Column 
                key={col.field} 
                field={col.field} 
                header={col.header}
                body={(rowData: ArtworkData) => renderTextCell(rowData, col.field)}
                sortable
                className={`${index === 0 ? 'min-w-48' : 'min-w-36'}`}
                headerClassName="text-gray-900 font-semibold"
              />
            ))}
          </DataTable>
        </div>

        
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <Paginator
            first={pagination.first}
            rows={pagination.rows}
            totalRecords={pagination.totalRecords}
            onPageChange={handlePageChange}
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first}-{last} of {totalRecords}"
            className="justify-content-center"
          />
        </div>
      </div>
      
      <OverlayPanel ref={overlayRef} className="w-80">
        <div className="flex flex-col gap-3 p-2">
          <div>
            <label htmlFor="rowsInput" className="block text-sm font-medium text-gray-700 mb-2">
              Bulk Selection
            </label>
            <InputNumber
              id="rowsInput"
              value={rowsToSelect}
              onValueChange={(e) => setRowsToSelect(e.value || 0)}
              placeholder="Number of rows"
              min={UI_CONSTANTS.MIN_SELECTION_COUNT}
              max={UI_CONSTANTS.MAX_SELECTION_COUNT}
              className="w-full"
            />
          </div>
          <Button
            label={isSelectingAcrossPages ? "Selecting..." : "Select Rows"}
            onClick={handleBulkSelection}
            size="small"
            loading={isSelectingAcrossPages}
            disabled={isSelectingAcrossPages || rowsToSelect <= 0}
            className="w-full"
          />
          <p className="text-xs text-gray-500 m-0">
            Selection continues across pages if needed.
          </p>
        </div>
      </OverlayPanel>
    </div>
  );
}