import { Component, createRef } from 'react';
import type { CardListProps } from './card-list.types';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import { DialogWindow } from '../dialog-window/dialog-window';

export class CardList extends Component<CardListProps> {
  dialogRef = createRef<DialogWindow>();
  render() {
    const { items, isLoading, hasResults, error } = this.props;

    if (isLoading) {
      return <Loader />;
    }
    return (
      <>
        {error ? <p className="error-message">Error: {error}</p> : null}

        <ul className="card-list">
          {items.map((character, index) => (
            <Card
              key={index}
              character={character}
              hasResults={this.props.hasResults}
            ></Card>
          ))}
        </ul>
        {!isLoading && items.length === 0 && !hasResults && <DialogWindow />}
      </>
    );
  }
}
