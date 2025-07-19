import { Component, createRef } from 'react';
import { type CardListProps } from '../card-list/card-list.types';
import { CardList } from '../card-list/card-list';
import { DialogWindow } from '../dialog-window/dialog-window';
import './results.css';

export class Results extends Component<CardListProps> {
  heroNameRef = createRef<HTMLDivElement>();

  componentDidMount(): void {
    if (this.heroNameRef.current) {
      this.heroNameRef.current.style.borderRight = 'none';
    }
  }
  render() {
    return (
      <div className="results">
        <div className="thead">
          <div
            className={`hero-name ${this.props.hasResults ? 'no-border' : ''}`}
            ref={this.heroNameRef}
          >
            Hero Name
          </div>
          <div
            className={`hero-description ${this.props.hasResults ? 'no-border' : ''}`}
          >
            Hero Description
          </div>
        </div>
        <CardList
          items={this.props.items}
          isLoading={this.props.isLoading}
          hasResults={this.props.hasResults}
          error={this.props.error}
        />
        <DialogWindow
          ref={this.props.dialogRef}
          responseStatus={this.props.responseStatus}
        />
      </div>
    );
  }
}
