import type { SelectedItemsPanelProps } from './selected-items-panel.types';
import { useDispatch } from 'react-redux';
import { clearSelection } from '../../store/characterSlice';

export function SelectedItemsPanel({ itemArrLength }: SelectedItemsPanelProps) {
  const dispatch = useDispatch();
  return (
    <div className="panel-container">
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
          <button className="download-btn">Download</button>
        </div>
      </div>
    </div>
  );
}
