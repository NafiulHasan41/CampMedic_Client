import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScrollToTop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    return navigate.listen(() => {
      window.scrollTo(0, 0);
    });
  }, [navigate]);

  return null;
};

export default ScrollToTop;