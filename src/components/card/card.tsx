import { useRef, useEffect, useState } from 'react';
import type { CardProps } from './card.types';
import type { Character } from '../card-list/card-list.types';
import { makeApiQuery } from '../../api/api';
import { DetailsWindow } from '../details-window/details-window';
import { useSearchParams } from 'react-router-dom';
import { Checkbox } from '../checkbox/checkbox';

export function Card({
  character,
  imgUrl,
  isSelected,
  onSelect,
  index,
}: CardProps) {
  const nameRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Character | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const getCharacterId = (): string | undefined => {
    const idMatch = character?.url?.match(/\/(\d+)\/$/);
    if (!idMatch) return;
    const characterId = idMatch[1];
    return characterId;
  };

  const handleClick = (): void => {
    if (onSelect) {
      onSelect(character);
      const characterId = getCharacterId();
      const page = searchParams.get('page') ?? '1';
      if (!page || !characterId) return;
      setSearchParams({ page: page, details: characterId });
    }
  };

  useEffect(() => {
    const fetchCharacterById = async () => {
      const characterId = getCharacterId();
      const url = `https://swapi.py4e.com/api/people/${characterId}/`;
      const characterData = await makeApiQuery<Character>(url);
      setData(characterData[0]);
    };
    fetchCharacterById();
  }, [character]);

  if (!character) {
    return (
      <li className="card">
        <div className="name">No Data</div>
        <div className="description">Unknown</div>
      </li>
    );
  }

  return (
    <li className="card">
      <Checkbox index={index} />
      <div
        onClick={handleClick}
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '600px',
        }}
        className="name"
        ref={nameRef}
      >
        {character.name}
      </div>
      {isSelected && (
        <DetailsWindow
          data={data}
          onClose={() => {
            onSelect?.(null);
            setSearchParams({});
          }}
        />
      )}
    </li>
  );
}
