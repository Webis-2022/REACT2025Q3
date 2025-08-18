import { useRef, useState } from 'react';
import type { CardListProps, Character } from './card-list.types';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import { DialogWindow } from '../dialog-window/dialog-window';
import type { DialogWindowHandle } from '../dialog-window/dialog-window.types';

export function CardList({
  items,
  isLoading,
  hasResults,
  error,
}: CardListProps) {
  const dialogRef = useRef<DialogWindowHandle>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

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
            imgUrl={`${import.meta.env.BASE_URL}images/${character.url?.match(/\d+(?=\/?$)/)?.[0]}.jpg`}
            isSelected={selectedCharacter?.name === character.name}
            onSelect={(char) => setSelectedCharacter(char)}
          ></Card>
        ))}
      </ul>
      {!isLoading && items.length === 0 && !hasResults && (
        <DialogWindow ref={dialogRef} />
      )}
    </>
  );
}
