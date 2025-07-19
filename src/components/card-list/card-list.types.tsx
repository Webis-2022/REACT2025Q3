import type { DialogWindow } from '../dialog-window/dialog-window';

// export type Character = {
//   name: string;
//   height: undefined;
//   mass: string;
//   hair_color: null;
//   skin_color: undefined;
//   eye_color: string;
//   birth_year: null;
//   gender: string;
// };

type Character = {
  name: string | null | undefined;
  gender: string | null | undefined;
  height: string | null | undefined;
  mass: string | null | undefined;
  birth_year: string | null | undefined;
  hair_color: string | null | undefined;
  eye_color: string | null | undefined;
  skin_color: string | null | undefined;
};

export type CardListProps = {
  items: Character[];
  isLoading: boolean;
  hasResults?: boolean;
  error: string | null;
  dialogRef?: React.RefObject<DialogWindow | null>;
  response?: { status: number };
};
