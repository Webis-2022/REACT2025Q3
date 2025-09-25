import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary';
import { Header } from '../../components/header/header';
import { Providers } from '../providers';
import '../app.css';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <Providers>
        <ErrorBoundary>
          <Header />
          <main>{children}</main>
        </ErrorBoundary>
      </Providers>
    </NextIntlClientProvider>
  );
}
