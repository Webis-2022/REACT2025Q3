import { useNavigate } from 'react-router-dom';

export function Page404() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Page not found. Error 404</h2>
      <button className="go-home" onClick={handleGoHome}>
        Go To Home Page
      </button>
    </div>
  );
}
