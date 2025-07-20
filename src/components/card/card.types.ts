import { type Character } from '../card-list/card-list.types';

export type CardProps = {
  character: Character | undefined;
  hasResults?: boolean;
};

export const mockCharacter: Character = {
  name: 'Luke Skywalker',
  gender: 'male',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  hair_color: 'blond',
  eye_color: 'blue',
  skin_color: 'fair',
};
