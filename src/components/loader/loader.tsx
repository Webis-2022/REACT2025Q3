'use client';

import './loader.css';

export function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader" role="status" aria-label="Loading..."></div>
    </div>
  );
}
