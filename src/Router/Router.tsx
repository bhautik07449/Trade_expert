import { useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { Dashboard } from '../pages/Dashboard';
import { PageNotFound } from '../pages/PageNotFound';
import SignupForm from '../pages/Signup/Signup';
import LoginForm from '../pages/Login/Login';
import ProductPage from '../pages/ProductDetail/ProductDetail';
import AboutUs from '../pages/AboutUs';
import QualityPolicies from '../pages/QualityPolicies';
import Brand from '../pages/Brand';
import HowToPay from '../pages/HowToPay';
import ProductList from '../pages/ProductList';
import GetInTouch from '../pages/GetInTouch';
import Resource from '../pages/Resource/Resource';
import SuppliersRegister from '../pages/SuppliersRegister';
import SuppliersLogin from '../pages/SuppliersLogin';
import BuyerDashboard from '../pages/BuyerDashboard';
import CreditAccount from '../pages/CreditAccount';
import Gallery from '../pages/Resource/Gallery';
import CSR from '../pages/Resource/CSR';
import Career from '../pages/Resource/Career';
import Faq from '../pages/Resource/Faq';

type Props = {
  children: JSX.Element;
};

export default function Router(): JSX.Element {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname])

  function PrivateRoute({ children }: Props) {
    const token = localStorage.getItem("token");
    const buyer = localStorage.getItem("buyer");

    if (!token || buyer !== "true") {
      return <Navigate to="/login" replace />;
    }

    return children;
  }

  function PublicRoute({ children }: Props) {
    const token = localStorage.getItem("token");
    const buyer = localStorage.getItem("buyer");

    if (token && buyer === "true") {
      return <Navigate to="/buyer-dashboard" replace />;
    }

    return children;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<PublicRoute><LoginForm /></ PublicRoute>} />
      <Route path="/sign-up" element={<PublicRoute><SignupForm /></PublicRoute>} />
      <Route path='/about_us' element={<AboutUs />} />
      <Route path="/product-list/:slug" element={<ProductList />} />
      <Route path="/product-details/:id" element={<ProductPage />} />
      <Route path="/quality_policies" element={<QualityPolicies />} />
      <Route path="/brands" element={<Brand />} />
      <Route path="/how-to-pay" element={<HowToPay />} />
      <Route path="/get-in-touch" element={<GetInTouch />} />
      <Route path="/pages/:slug" element={<Resource />} />
      <Route path="/pages/gallery" element={<Gallery />} />
      <Route path="/pages/csr" element={<CSR />} />
      <Route path="/pages/career" element={<Career />} />
      <Route path="/pages/faq" element={<Faq />} />
      <Route path="/suppliers/register" element={<SuppliersRegister />} />
      <Route path="/suppliers/login" element={<SuppliersLogin />} />
      <Route path="/buyer-dashboard" element={<PrivateRoute><BuyerDashboard /></PrivateRoute>} />
      <Route path="/credit-account" element={<CreditAccount />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
