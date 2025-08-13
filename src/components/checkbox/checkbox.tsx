import { toggleSelection, setCurrentPage } from '../../store/characterSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/index';
import type { CheckboxProps } from './checkbox.types';
import { useSearchParams } from 'react-router-dom';

export function Checkbox({ index }: CheckboxProps) {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const pageNumber = Number(searchParams.get('page') || 1);
  const selectedIds = useSelector(
    (state: RootState) => state.characters.selectedIds
  );
  const savedPageNumber = useSelector(
    (state: RootState) => state.characters.currentPage
  );
  const checked = selectedIds.includes(index);
  return (
    <input
      id="character"
      type="checkbox"
      checked={savedPageNumber === pageNumber && checked}
      onChange={() => {
        dispatch(toggleSelection(index));
        dispatch(setCurrentPage(pageNumber));
      }}
    />
  );
}
