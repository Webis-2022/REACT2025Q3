import { type CardListProps } from '../card-list/card-list.types';
import { CardList } from '../card-list/card-list';
import { DialogWindow } from '../dialog-window/dialog-window';

export function Results({
  items,
  isLoading,
  hasResults,
  error,
  dialogRef,
  responseStatus,
}: CardListProps) {
  return (
    <div className="results">
      <CardList
        items={items}
        isLoading={isLoading}
        hasResults={hasResults}
        error={error}
      />
      <DialogWindow ref={dialogRef} responseStatus={responseStatus} />
    </div>
  );
}
