/* eslint-disable prettier/prettier */
import { useRef, useEffect } from 'react';
import type { CardProps } from './card.types';
import type { Character } from '../card-list/card-list.types';

export function Card({ character, hasResults }: CardProps) {
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (character && nameRef.current) {
      nameRef.current.style.borderRight = 'none';
    }
  }, [character]);

  // if (!character) return null;


  if (character === undefined || character === null) {
    console.log('Hello');
    return (
      <li className="card">
        <div
          className={`name ${hasResults ? 'no-border' : ''}`}
          ref={nameRef}
        >
          No Data
        </div>
        <div
          className={`description ${hasResults ? 'no-border' : ''}`}
        >
          Unknown
        </div>
      </li>
    );
  } else {
    const {
      name,
      gender,
      height,
      mass,
      birth_year,
      hair_color,
      eye_color,
      skin_color,
    } = character as Character;
    if (gender) {
      const genderEdited =
        gender.charAt(0).toUpperCase() + gender.slice(1);

      return (
        <li className="card">
          <div
            className={`name ${hasResults ? 'no-border' : ''}`}
            ref={nameRef}
          >
            {name}
          </div>
          <div
            className={`description ${hasResults ? 'no-border' : ''}`}
          >
            {`
                ${genderEdited},
                ${height === undefined
                ? '-'
                : height === null
                  ? 'Unknown'
                  : height
              } cm,
                ${mass === undefined
                ? '-'
                : mass === null
                  ? 'Unknown'
                  : mass
              } kg,
          born ${birth_year === undefined
                ? '-'
                : birth_year === null
                  ? 'Unknown'
                  : birth_year
              },
                ${hair_color === undefined
                ? '-'
                : hair_color === null
                  ? 'Unknown'
                  : hair_color
              } hair,
                ${eye_color === undefined
                ? '-'
                : eye_color === null
                  ? 'Unknown'
                  : eye_color
              } eyes,
                ${skin_color === undefined
                ? '-'
                : skin_color === null
                  ? 'Unknown'
                  : skin_color
              } skin
              `}
          </div>
        </li>
      );
    }
  }
}

