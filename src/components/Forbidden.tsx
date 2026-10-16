import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/libs/router/constants';

const Forbidden = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(routes.DASHBOARD);
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <p>Redirecting to dashboard...</p>
    </div>
  );
};

export default Forbidden;
