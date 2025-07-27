import { screen, render } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('pagination button exists in the component', () => {
    render(
      <MemoryRouter>
        <Pagination
          count={10}
          next="https://api.example.com/page=2"
          previous={null}
          results={[]}
          // eslint-disable-next-line prettier/prettier
          setItems={() => { }}
          // eslint-disable-next-line prettier/prettier
          setNext={() => { }}
          // eslint-disable-next-line prettier/prettier
          setPrevious={() => { }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/page/i)).toBeInTheDocument();
  });
});
