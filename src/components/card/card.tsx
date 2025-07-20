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
          ${character.height} cm,
          ${character.mass} kg,
          born ${character.birth_year},
          ${character.hair_color} hair,
          ${character.eye_color} eyes,
          ${character.skin_color} skin
          `}
        </div>
      </li>
    );
  }
}
