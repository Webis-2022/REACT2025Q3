'use client';

import Link from 'next/link';
import { useTheme } from '../theme-context/theme-context';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

export function Header() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Header');
  return (
    <header data-testid="header">
      <select
        name="theme-color"
        id="theme-color"
        data-testid="select-input"
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
      >
        <option value="light">{t('theme-switcher.options.light')}</option>
        <option value="dark">{t('theme-switcher.options.dark')}</option>
      </select>
      <h1 className="app-title">{t('title')}</h1>
      <div className="navigation-container">
        <div className="navigation">
          <Link href="/">{t('navigation.home')}</Link>
          <Link href="/about">{t('navigation.about')}</Link>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
