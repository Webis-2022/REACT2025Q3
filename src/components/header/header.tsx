import { NavLink } from 'react-router-dom';
import { useTheme } from '../theme-context/theme-context';

export function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header data-testid="header">
      <select
        name="theme-color"
        id="theme-color"
        data-testid="select-input"
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <h1 className="app-title">Find Your Star Wars Hero</h1>
      <div className="navigation-container">
        <div className="navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </div>
    </header>
  );
}
