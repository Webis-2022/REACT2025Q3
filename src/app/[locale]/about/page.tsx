'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');
  return (
    <div className="content">
      <p>
        {t('text1')} <a href="{t('link')}">REACT2025Q3 </a> {t('text2')}{' '}
        {t('text3')}
      </p>
    </div>
  );
}
