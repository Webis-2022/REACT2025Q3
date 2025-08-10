import { useRef, useState } from 'react';
import type { CardListProps, Character } from './card-list.types';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import { DialogWindow } from '../dialog-window/dialog-window';
import type { DialogWindowHandle } from '../dialog-window/dialog-window.types';
import { useGetCharactersQuery } from '../../services/api';

export function CardList({ isLoading, error, page }: CardListProps) {
  const dialogRef = useRef<DialogWindowHandle>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<
    Character | null | undefined
  >(null);

  const search = localStorage.getItem('inputValue');
  const { data } = useGetCharactersQuery({ search, page });

  if (isLoading) {
    return <Loader />;
  }

  const result = data?.results ?? [];

  return (
    <>
      {error && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Error: {error.toString()}</p>
        </div>
      )}

      <ul className="card-list">
        {result?.map((character: Character | null, index: number) => (
          <Card
            key={index}
            character={character}
            imgUrl={`${import.meta.env.BASE_URL}images/${character?.url?.match(/\d+(?=\/?$)/)?.[0]}.jpg`}
            isSelected={selectedCharacter?.name === character?.name}
            onSelect={(char) => setSelectedCharacter(char)}
            index={index}
            data-testid="card"
          />
        ))}
      </ul>

      {!isLoading && result?.length === 0 && <DialogWindow ref={dialogRef} />}
    </>
  );
}
