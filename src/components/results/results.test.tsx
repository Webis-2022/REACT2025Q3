import { createRef } from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Results } from './results';

describe('Results', () => {
  it('shows appropriate error for different HTTP status codes (4xx, 5xx)', () => {
    render(
      <Results
        items={[]}
        isLoading={false}
        hasResults={false}
        error="Server error"
        dialogRef={createRef()}
        response={{ status: 500 }}
      />
    );
    expect(screen.getByText(/500/i)).toBeInTheDocument();
  })
})