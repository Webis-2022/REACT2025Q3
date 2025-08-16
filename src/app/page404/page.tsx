'use client';

import Link from 'next/link';

export default function Page404() {
  return (
    <div className="container">
      <h2>Page not found. Error 404</h2>
      <Link href="/">
        <button className="go-home">Go To Home Page</button>
      </Link>
    </div>
  );
}
