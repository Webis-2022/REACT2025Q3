/* eslint-disable prettier/prettier */
import { useRef, useEffect, useState } from 'react';
import type { CardProps } from './card.types';
import type { Character } from '../card-list/card-list.types';
import { makeApiQuery } from '../../api/api';
import { DetailsWindow } from '../details-window/details-window';
import './card.css';
import { useSearchParams } from 'react-router-dom';

export function Card({ character, hasResults, imgUrl, isSelected, onSelect }: CardProps) {
  const nameRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Character | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const getCharacterId = () => {
    const idMatch = character?.url?.match(/\/(\d+)\/$/);
    if (!idMatch) return;
    const characterId = idMatch[1];
    return characterId;
  }


  const handleClick = () => {
    onSelect(character);
    const characterId = getCharacterId();
    const page = searchParams.get('page') ?? '1';
    if (!page || !characterId) return;
    setSearchParams({ 'page': page, 'details': characterId })
  };

  useEffect(() => {
    const fetchCharacterById = async () => {
      const characterId = getCharacterId();
      const url = `https://swapi.py4e.com/api/people/${characterId}/`;
      const characterData = await makeApiQuery(url);
      setData(characterData[0]);
    };
    fetchCharacterById();
  }, [character]);

  if (!character) {
    return (
      <li className="card">
        <div className={`name ${hasResults ? 'no-border' : ''}`} ref={nameRef}>
          No Data
        </div>
        <div className={`description ${hasResults ? 'no-border' : ''}`}>
          Unknown
        </div>
      </li>
    );
  }

  return (
    <li className="card">
      <div onClick={handleClick}
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
      {isSelected && <DetailsWindow data={data} onClose={() => {
        onSelect(null);
        setSearchParams({});
      }}
      />}
    </li>
  );
}

