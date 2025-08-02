import type { SelectedItemsPanelProps } from './selected-items-panel.types';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelection } from '../../store/characterSlice';
import { useContext } from 'react';
import { MyContext } from '../../pages/home/home';
import type { RootState } from '../../store';

export function SelectedItemsPanel({ itemArrLength }: SelectedItemsPanelProps) {
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.characters.selectedIds
  );
  const items = useContext(MyContext);
  const headers = [
    'Id',
    'Name',
    'Height',
    'Mass',
    'Birth Year',
    'Hair Color',
    'Eye Color',
    'Skin Color',
  ];

  const rows = items?.map((character, index) => [
    index,
    character.name,
    character.height,
    character.mass,
    character.birth_year,
    character.hair_color,
    character.eye_color,
    character.skin_color,
  ]);

  const filteredRows = rows?.filter(
    (row, index) => row[0] === selectedIds[index]
  );

  const csvContent = [headers, ...(filteredRows ?? [])]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n');

  const downloadFile = () => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${filteredRows?.length || 0}_items.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
          <button className="download-btn" onClick={() => downloadFile()}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
