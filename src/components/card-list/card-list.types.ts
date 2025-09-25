/* eslint-disable prettier/prettier */
import type { DialogWindowHandle } from '../dialog-window/dialog-window.types';

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
  | 'skin_color'
  | 'url']: NullableString;
};

export type CardListProps = {
  search?: string;
  page: number;
  dialogRef?: React.RefObject<DialogWindowHandle | null>;
<<<<<<< HEAD
  responseStatus?: number | null;
=======
  responseStatus?: number;
>>>>>>> origin/main
};
