import { useRef } from 'react';
import type { CardListProps } from './card-list.types';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import { DialogWindow } from '../dialog-window/dialog-window';
import type { DialogWindowHandle } from '../dialog-window/dialog-window.types';

export function CardList({
  items,
  isLoading,
  hasResults,
  error,
  // dialogRef,
  // responseStatus,
}: CardListProps) {
  const dialogRef = useRef<DialogWindowHandle>(null);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {error ? (
        <p
          className="error-message"
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          Error: {error}
        </p>
      ) : null}

      <ul className="card-list">
        {items.map((character, index) => (
          <Card
            key={index}
            character={character}
            hasResults={hasResults}
          ></Card>
        ))}
      </ul>
      {!isLoading && items.length === 0 && !hasResults && (
        <DialogWindow ref={dialogRef} />
      )}
    </>
  );
}
