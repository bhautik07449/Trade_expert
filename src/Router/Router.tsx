import { useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Dashboard } from '../pages/Dashboard';
import { PageNotFound } from '../pages/PageNotFound';
import SignupForm from '../pages/Signup/Signup';
import LoginForm from '../pages/Login/Login';
import ProductPage from '../pages/ProductDetail/ProductDetail';

export default function Router(): JSX.Element {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/sign-up" element={<SignupForm />} />
      <Route path="/product-details" element={<ProductPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
