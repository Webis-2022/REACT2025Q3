import { Header } from '../header/header';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../theme-context/theme-context';

export function Layout() {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={theme === 'dark' ? 'dark-theme' : 'light-theme'}
        style={{ minHeight: '100vh' }}
      >
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
