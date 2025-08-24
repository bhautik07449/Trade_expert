import { useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Dashboard } from '../pages/Dashboard';
import { PageNotFound } from '../pages/PageNotFound';

export default function Router(): JSX.Element {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
