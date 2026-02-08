import { useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Dashboard } from '../pages/Dashboard';
import { PageNotFound } from '../pages/PageNotFound';
import SignupForm from '../pages/Signup/Signup';
import LoginForm from '../pages/Login/Login';
import ProductPage from '../pages/ProductDetail/ProductDetail';
import AboutUs from '../pages/AboutUs';
import QualityPolicies from '../pages/QualityPolicies';
import Brand from '../pages/Brand';
import HowToPay from '../pages/HowToPay';

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
      <Route path='/about_us' element={<AboutUs />} />
      <Route path="/product-details" element={<ProductPage />} />
      <Route path="/quality_policies" element={<QualityPolicies />} />
      <Route path="/brands" element={<Brand />} />
      <Route path="how-to-pay" element={<HowToPay />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
