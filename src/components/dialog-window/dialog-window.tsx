'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  type DialogWindowProps,
  type DialogWindowHandle,
} from './dialog-window.types';

export const DialogWindow = forwardRef<DialogWindowHandle, DialogWindowProps>(
  ({ responseStatus }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
      close: () => dialogRef.current?.close(),
    }));

    return (
      <dialog className="dialog-window" ref={dialogRef}>
        {responseStatus === 404 ? (
          <p>Data not found (Error 404)</p>
        ) : responseStatus === 500 ? (
          <p>Internal server error (Error 500)</p>
        ) : (
          <p>No Results</p>
        )}
        <button
          className="close-btn"
          type="button"
          onClick={() => dialogRef.current?.close()}
        >
          Close
        </button>
      </dialog>
    );
  }
);
DialogWindow.displayName = 'DialogWindow';
