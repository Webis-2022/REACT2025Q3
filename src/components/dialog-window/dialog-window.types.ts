export type DialogWindowProps = {
  responseStatus?: number | undefined;
};

export type DialogWindowHandle = {
  open: () => void;
  close: () => void;
};
