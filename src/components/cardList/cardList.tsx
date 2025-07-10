import { Component } from 'react';
import type { CardListProps } from './cardList.types';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';

export class CardList extends Component<CardListProps> {
  render() {
    const { items, isLoading } = this.props;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <ul className="card-list">
        {items.map((character, index) => (
          <Card key={index} character={character}></Card>
        ))}
      </ul>
    );
  }
}
