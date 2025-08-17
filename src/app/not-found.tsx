'use client';

import Link from 'next/link';

export default function Page404() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '1.2rem',
      }}
    >
      <h2>Page not found. Error 404</h2>
      <Link href="/">
        <button
          style={{
            border: '2px solid #9d9d9d',
            borderRadius: '50px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Go To Home Page
        </button>
      </Link>
    </div>
  );
}
