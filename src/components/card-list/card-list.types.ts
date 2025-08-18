/* eslint-disable prettier/prettier */
import type { DialogWindow } from '../dialog-window/dialog-window';

type NullableString = string | null | undefined;

export type Character = {
  [K in
  | 'name'
  | 'gender'
  | 'height'
  | 'mass'
  | 'birth_year'
  | 'hair_color'
  | 'eye_color'
  | 'skin_color']: NullableString;
};

export type CardListProps = {
  items: Character[];
  isLoading: boolean;
  hasResults?: boolean;
  error: string | null;
  dialogRef?: React.RefObject<DialogWindow | null>;
  responseStatus?: number;
};
