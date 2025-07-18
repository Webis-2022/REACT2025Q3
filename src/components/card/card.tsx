import { Component, createRef } from 'react';
import type { CardProps } from './card.types';

export class Card extends Component<CardProps> {
  nameRef = createRef<HTMLDivElement>();

  componentDidMount(): void {
    if (this.nameRef.current) {
      this.nameRef.current.style.borderRight = 'none';
    }
  }
  render() {
    const { character } = this.props;
    const gender =
      character.gender.charAt(0).toUpperCase() + character.gender.slice(1);

    return (
      <li className="card">
        <div
          className={`name ${this.props.hasResults ? 'no-border' : ''}`}
          ref={this.nameRef}
        >
          {character.name}
        </div>
        <div
          className={`description ${this.props.hasResults ? 'no-border' : ''}`}
        >
          {`
  ${gender},
  ${
    character.height === undefined
      ? '-'
      : character.height === null
        ? 'Unknown'
        : character.height
  } cm,
  ${
    character.mass === undefined
      ? '-'
      : character.mass === null
        ? 'Unknown'
        : character.mass
  } kg,
  born ${
    character.birth_year === undefined
      ? '-'
      : character.birth_year === null
        ? 'Unknown'
        : character.birth_year
  },
  ${
    character.hair_color === undefined
      ? '-'
      : character.hair_color === null
        ? 'Unknown'
        : character.hair_color
  } hair,
  ${
    character.eye_color === undefined
      ? '-'
      : character.eye_color === null
        ? 'Unknown'
        : character.eye_color
  } eyes,
  ${
    character.skin_color === undefined
      ? '-'
      : character.skin_color === null
        ? 'Unknown'
        : character.skin_color
  } skin
`}
        </div>
      </li>
    );
  }
}
