import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header>
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
