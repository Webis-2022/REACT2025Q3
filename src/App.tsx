import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Page404 } from './pages/page404/page404';
import './App.css';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
