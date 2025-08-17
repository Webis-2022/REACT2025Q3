'use client';

import { useRef, useEffect, useState } from 'react';
import type { CardProps } from './card.types';
import { DetailsWindow } from '../details-window/details-window';
import { usePathname, useSearchParams } from 'next/navigation';
import { Checkbox } from '../checkbox/checkbox';
import { useLazyGetCharacterByIdQuery } from '../../services/api';
import type { Character } from '../card-list/card-list.types';
import { useRouter } from 'next/navigation';

export function Card({
  character,
  imgUrl,
  isSelected,
  onSelect,
  index,
}: CardProps) {
  const nameRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Character | null>(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pathName = usePathname();
  const { replace } = useRouter();
  // eslint-disable-next-line no-empty-pattern, prettier/prettier
  const [trigger, { }] = useLazyGetCharacterByIdQuery();
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
      params.set('page', page.toString());
      params.set('details', characterId.toString());
      replace(`${pathName}?${params.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    const fetchCharacterById = async () => {
      const characterId = getCharacterId();
      const characterData = await trigger(characterId).unwrap();
      setData(characterData);
    };
    fetchCharacterById();
  }, [character]);

  if (!character) {
    return (
      <li className="card" data-testid="card">
        <div className="name">No Data</div>
        <div className="description">Unknown</div>
      </li>
    );
  }

  return (
    <li className="card" data-testid="card">
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
            params.delete('page');
            params.delete('details');
            replace(`${pathName}?${params.toString()}`, { scroll: false });
          }}
        />
      )}
    </li>
  );
}
