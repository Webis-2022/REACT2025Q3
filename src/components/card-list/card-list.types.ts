// import type { DialogWindow } from '../dialog-window/dialog-window';
import type { DialogWindowHandle } from '../dialog-window/dialog-window.types';

export type Character = {
  name: string | null | undefined;
  gender: string | null | undefined;
  height: string | null | undefined;
  mass: string | null | undefined;
  birth_year: string | null | undefined;
  hair_color: string | null | undefined;
  eye_color: string | null | undefined;
  skin_color: string | null | undefined;
  url: string | null | undefined;
};

export type CardListProps = {
  items: Character[];
  isLoading: boolean;
  hasResults?: boolean;
  error: string | null;
  dialogRef?: React.RefObject<DialogWindowHandle | null>;
  responseStatus?: number | undefined;
};
