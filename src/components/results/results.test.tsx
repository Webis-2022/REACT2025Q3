import { createRef } from 'react';
import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Results } from './results';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('Results', () => {
  it('shows appropriate error for different HTTP status codes (4xx, 5xx)', () => {
    render(
      <Provider store={store}>
        <Results
          page={1}
          isLoading={false}
          error="Server error"
          dialogRef={createRef()}
          responseStatus={500}
        />
      </Provider>
    );
    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });
});
