import { useRef, useEffect } from 'react';
import { type CardListProps } from '../card-list/card-list.types';
import { CardList } from '../card-list/card-list';
import { DialogWindow } from '../dialog-window/dialog-window';
import './results.css';

export function Results({
  items,
  isLoading,
  hasResults,
  error,
  dialogRef,
  responseStatus,
}: CardListProps) {
  const heroNameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (heroNameRef.current) {
      heroNameRef.current.style.borderRight = 'none';
    }
  }, []);

  return (
    <div className="results">
      <div className="thead">
        <div
          className={`hero-name ${hasResults ? 'no-border' : ''}`}
          ref={heroNameRef}
        >
          Hero Name
        </div>
        <div className={`hero-description ${hasResults ? 'no-border' : ''}`}>
          Hero Description
        </div>
      </div>
      <CardList
        items={items}
        isLoading={isLoading}
        hasResults={hasResults}
        error={error}
      />
      <DialogWindow ref={dialogRef} responseStatus={responseStatus} />
    </div>
  );
}
