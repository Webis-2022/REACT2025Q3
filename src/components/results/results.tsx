import { type CardListProps } from '../card-list/card-list.types';
import { CardList } from '../card-list/card-list';
import { DialogWindow } from '../dialog-window/dialog-window';

export function Results({
  isLoading,
  error,
  dialogRef,
  responseStatus,
}: CardListProps) {
  return (
    <div className="results">
      <CardList isLoading={isLoading} error={error} />
      <DialogWindow ref={dialogRef} responseStatus={responseStatus} />
    </div>
  );
}
