'use client';

import React, { Component } from 'react';
import { type Props, type State } from './error-boundary.types';

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '2rem',
            backgroundColor: '#ffeaea',
            color: 'darkred',
            textAlign: 'center',
          }}
        >
          <h2>An error occurred.</h2>
          <p>Something went wrong. Try reloading the page...</p>
        </div>
      );
    }

    return this.props.children;
  }
}
