import { create } from 'zustand';
import { countries } from '../utils/countries';

type FormData = {
  id: number;
  name: string;
  age: number;
  email?: string;
  firstPassword?: string;
  gender?: string;
  tc?: boolean;
  base64?: string;
  country?: string;
};

type FormStore = {
  data: FormData[];
  countries: string[];
  addData: (newData: FormData) => void;
};

export const useStore = create<FormStore>((set) => ({
  data: [],
  countries,
  addData: (newData) => set((state) => ({ data: [...state.data, newData] })),
}));
