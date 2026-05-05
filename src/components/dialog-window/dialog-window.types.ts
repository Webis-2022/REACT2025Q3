export type DialogWindowProps = {
  responseStatus?: number | null;
};

export type DialogWindowHandle = {
  open: () => void;
  close: () => void;
};
