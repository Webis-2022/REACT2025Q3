'use client';

import { useRef, useState } from 'react';
import type { CardListProps, Character } from './card-list.types';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import { DialogWindow } from '../dialog-window/dialog-window';
import type { DialogWindowHandle } from '../dialog-window/dialog-window.types';
import { useGetCharactersQuery } from '../../services/api';

export function CardList({ search, page }: CardListProps) {
  const dialogRef = useRef<DialogWindowHandle>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<
    Character | null | undefined
  >(null);

  const { data, isLoading, error } = useGetCharactersQuery({ search, page });

  if (isLoading) {
    return <Loader />;
  }

  const result = data?.results ?? [];

  return (
    <>
      {error && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>
            Error:{' '}
            {'status' in error
              ? `Status ${error.status}`
              : JSON.stringify(error)}
          </p>
        </div>
      )}

      <ul className="card-list">
        {result?.map((character: Character | null, index: number) => {
          const idMatch = character?.url?.match(/\d+(?=\/?$)/);
          const id = idMatch ? idMatch[0] : '';
          const imgUrl = `${import.meta.env.BASE_URL}images/${id}.jpg`;

          return (
            <Card
              key={index}
              character={character}
              imgUrl={imgUrl}
              isSelected={selectedCharacter?.name === character?.name}
              onSelect={(char) => setSelectedCharacter(char)}
              index={index}
              data-testid="card"
            />
          );
        })}
      </ul>

      {!isLoading && result?.length === 0 && <DialogWindow ref={dialogRef} />}
    </>
  );
}
