import { screen, render } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from './pagination';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('Pagination', () => {
  it('pagination button exists in the component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination
            currentPage={1}
            // eslint-disable-next-line prettier/prettier
            onPageChange={() => { }}
            count={11}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText(/page 1/i)).toBeInTheDocument();
  });
});
