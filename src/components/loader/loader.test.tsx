import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from './loader';

describe('Loader', () => {
  it('renders loading indicator', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  it('has appropriate ARIA labels for screen readers', () => {
    render(<Loader />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });
});
