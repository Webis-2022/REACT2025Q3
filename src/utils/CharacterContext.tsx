import { createContext } from 'react';
import { Character } from '../components/card-list/card-list.types';

export const MyContext = createContext<Character[] | null>(null);
