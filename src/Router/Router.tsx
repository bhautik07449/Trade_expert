import React, { useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import MarketDevelopment from '../pages/MarketDevelopment/MarketDevelopment';

// Lazy loaded page components
// const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard').then(module => ({ default: module.Dashboard })));
const Home = React.lazy(() => import('../pages/Dashboard/Home'));
const CountryPage = React.lazy(() => import('../pages/Dashboard/Countrypage'));
const CategoryPage = React.lazy(() => import('../pages/Dashboard/Categorypage'));
const PageNotFound = React.lazy(() => import('../pages/PageNotFound').then(module => ({ default: module.PageNotFound })));
const SignupForm = React.lazy(() => import('../pages/Signup/Signup'));
const LoginForm = React.lazy(() => import('../pages/Login/Login'));
const ProductPage = React.lazy(() => import('../pages/ProductDetail/ProductDetail'));
const AboutUs = React.lazy(() => import('../pages/About/AboutUs'));
const QualityPolicies = React.lazy(() => import('../pages/QualityPolicies/QualityPolicies'));
const Brand = React.lazy(() => import('../pages/Brand/Brand'));
const HowToPay = React.lazy(() => import('../pages/HowToPay/HowToPay'));
const ProductList = React.lazy(() => import('../pages/ProductList/ProductList'));
const GetInTouch = React.lazy(() => import('../pages/GetInTouch/GetInTouch'));
const Resource = React.lazy(() => import('../pages/Resource/Resource'));
const SuppliersRegister = React.lazy(() => import('../pages/Login/SuppliersRegister'));
const SuppliersLogin = React.lazy(() => import('../pages/Login/SuppliersLogin'));
const BuyerDashboard = React.lazy(() => import('../pages/BuyerDashboard/BuyerDashboard'));
const CreditAccount = React.lazy(() => import('../pages/CreditAccount/CreditAccount'));
const Gallery = React.lazy(() => import('../pages/Resource/Gallery'));
const CSR = React.lazy(() => import('../pages/Resource/CSR'));
const Career = React.lazy(() => import('../pages/Resource/Career'));
const Faq = React.lazy(() => import('../pages/Resource/Faq'));
const Abc = React.lazy(() => import('../pages/Abc/Abc'));
const Tradeoffer = React.lazy(() => import('../pages/TradeOffer/Tradeoffer'));

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
      <Route path="/" element={<Home />} />
      <Route path="/:country" element={<CountryPage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/login" element={<PublicRoute><LoginForm /></ PublicRoute>} />
      <Route path="/sign-up" element={<SignupForm />} />
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
      <Route path="/trade-offers" element={<Tradeoffer />} />
      <Route path="/abc" element={<Abc />} />
      <Route path="/market-development" element={<MarketDevelopment />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
