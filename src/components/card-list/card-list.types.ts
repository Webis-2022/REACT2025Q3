import type { DialogWindowHandle } from '../dialog-window/dialog-window.types';

export type Character = {
  name?: string | null;
  gender?: string | null;
  height?: string | null;
  mass?: string | null;
  birth_year?: string | null;
  hair_color?: string | null;
  eye_color?: string | null;
  skin_color?: string | null;
  url?: string | null;
};

export type CardListProps = {
  items: Character[];
  isLoading: boolean;
  hasResults?: boolean;
  error: string | null;
  dialogRef?: React.RefObject<DialogWindowHandle | null>;
  responseStatus?: number;
};
