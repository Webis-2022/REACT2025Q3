import { toggleSelection } from '../../store/characterSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/index';

type Props = {
  index: number;
};

export function Checkbox({ index }: Props) {
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.characters.selectedIds
  );
  const checked = selectedIds.includes(index);
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => dispatch(toggleSelection(index))}
    />
  );
}
