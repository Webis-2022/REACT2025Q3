import { Component, createRef } from 'react';
import { type DialogWindowProps } from './dialog-window.types';

export class DialogWindow extends Component<DialogWindowProps> {
  dialogRef = createRef<HTMLDialogElement>();

  open = () => {
    this.dialogRef.current?.showModal();
  };
  close = () => {
    this.dialogRef.current?.close();
  };

  render() {
    const { status } = this.props;
    return (
      <dialog className="dialog-window" ref={this.dialogRef}>
        {status === 404 ? (
          <p>Data not found (Error 404)</p>
        ) : (
          <p>Internal server error (Error 500) </p>
        )}
        <button className="close-btn" onClick={this.close}>
          Close
        </button>
      </dialog>
    );
  }
}
