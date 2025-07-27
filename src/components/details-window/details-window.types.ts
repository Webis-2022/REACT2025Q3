import type { Character } from '../card-list/card-list.types';

export type DetailsWindowProps = {
  data: Character | null;
  onClose: () => void;
};
