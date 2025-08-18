export type SearchProps = {
  onSearch: (term: string) => void;
  setHasResults: (value: boolean) => void;
};

export type SearchState = {
  inputValue: string;
};
