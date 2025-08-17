'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Page404() {
  const t = useTranslations('Page404');
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
      <h2>{t('error-text')}</h2>
      <Link href="/">
        <button
          style={{
            border: '2px solid #9d9d9d',
            borderRadius: '50px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          {t('button')}
        </button>
      </Link>
    </div>
  );
}
