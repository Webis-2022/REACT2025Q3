import { Component, createRef } from 'react';

export class DialogWindow extends Component {
  dialogRef = createRef<HTMLDialogElement>();

  open = () => {
    this.dialogRef.current?.showModal();
  };
  close = () => {
    this.dialogRef.current?.close();
  };

  render() {
    return (
      <dialog ref={this.dialogRef}>
        <p>Data not found (Error 404)</p>
        {/* Add 500 error */}
        <button onClick={this.close}>Close</button>
      </dialog>
    );
  }
}
