import type { DialogWindow } from '../dialog-window/dialog-window';

export type Character = {
  name: string;
  height: undefined;
  mass: string;
  hair_color: null;
  skin_color: undefined;
  eye_color: string;
  birth_year: null;
  gender: string;
};

export type CardListProps = {
  items: Character[];
  isLoading: boolean;
  hasResults?: boolean;
  error: string | null;
  dialogRef?: React.RefObject<DialogWindow | null>;
  response?: { status: number };
};
