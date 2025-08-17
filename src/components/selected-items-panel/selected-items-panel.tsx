'use client';

import type { SelectedItemsPanelProps } from './selected-items-panel.types';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelection } from '../../store/characterSlice';
import { useContext } from 'react';
import { MyContext } from '../../app/[locale]/page';
import type { RootState } from '../../store';
import { downloadFile } from '../../utils/downloadFile';

export function SelectedItemsPanel({ itemArrLength }: SelectedItemsPanelProps) {
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.characters.selectedIds
  );
  const items = useContext(MyContext);

  return (
    <div className="panel-container" data-testid="panel-container">
      <div className="panel-container-content">
        <p className="panel-container-text">
          {itemArrLength}{' '}
          {itemArrLength === 1 ? 'item is selected' : 'items are selected'}
        </p>
        <div className="button-set">
          <button
            className="unselect-btn"
            onClick={() => dispatch(clearSelection())}
          >
            Unselect
          </button>
          <button
            className="download-btn"
            onClick={() => downloadFile(selectedIds, items)}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
