export type DialogWindowProps = {
  responseStatus?: number;
};

export type DialogWindowHandle = {
  open: () => void;
  close: () => void;
};
