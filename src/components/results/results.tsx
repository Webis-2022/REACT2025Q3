'use client';

import { type CardListProps } from '../card-list/card-list.types';
import { CardList } from '../card-list/card-list';
import { DialogWindow } from '../dialog-window/dialog-window';

export function Results({
  search,
  page,
  dialogRef,
  responseStatus,
}: CardListProps) {
  return (
    <div className="results">
      <CardList search={search} page={page} />
      <DialogWindow ref={dialogRef} responseStatus={responseStatus} />
    </div>
  );
}
