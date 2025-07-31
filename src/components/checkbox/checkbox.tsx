import { useState } from 'react';
import { toggleSelection } from '../../store/characterSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/index';

type Props = {
  index: number;
};

export function Checkbox({ index }: Props) {
  // const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.characters.selectedIds
  );
  const checked = selectedIds.includes(index);
  console.log('===', checked);
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => dispatch(toggleSelection(index))}
    />
  );
}
