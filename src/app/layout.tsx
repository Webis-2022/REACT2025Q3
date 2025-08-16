import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '../components/header/header';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';
import './globals.css';
import './app.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your App Title',
  description: 'Your app description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ErrorBoundary>
            <Header />
            <main>{children}</main>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
