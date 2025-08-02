import { toggleSelection } from '../../store/characterSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/index';
import type { CheckboxProps } from './checkbox.types';

export function Checkbox({ index }: CheckboxProps) {
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.characters.selectedIds
  );
  const checked = selectedIds.includes(index);
  return (
    <input
      id="character"
      type="checkbox"
      checked={checked}
      onChange={() => dispatch(toggleSelection(index))}
    />
  );
}
