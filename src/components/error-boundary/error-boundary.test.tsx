import { screen, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from './error-boundary';
import { BuggyComponent } from '../crash-button/crash-button';
import { Component } from 'react';
import userEvent from '@testing-library/user-event';

class TestBuggyComponent extends Component {
  render() {
    throw new Error('Test error');
    return null;
  }
}

describe('ErrorBoundary', () => {
  it('catches and handles JavaScript errors in child components', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      // eslint-disable-next-line prettier/prettier
      .mockImplementation(() => { });

    render(
      <ErrorBoundary>
        <TestBuggyComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', {
        name: /an error occurred/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
  it('displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <TestBuggyComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
  it('logs error to console', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      // eslint-disable-next-line prettier/prettier
      .mockImplementation(() => { });
    render(
      <ErrorBoundary>
        <TestBuggyComponent />
      </ErrorBoundary>
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
  it('throws error when test button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );
    const button = screen.getByText('Error');
    await user.click(button);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
