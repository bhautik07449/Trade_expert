import React, { useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

// Lazy loaded page components
const Home = React.lazy(() => import('../pages/Dashboard/Home'));
const CountryPage = React.lazy(() => import('../pages/Dashboard/Countrypage'));
const CategoryPage = React.lazy(() => import('../pages/Dashboard/Categorypage'));
const PageNotFound = React.lazy(() => import('../pages/PageNotFound').then(m => ({ default: m.PageNotFound })));
const SignupForm = React.lazy(() => import('../pages/BuyerAuth/Signup'));
const LoginForm = React.lazy(() => import('../pages/BuyerAuth/Login'));
const InvestorLoginForm = React.lazy(() => import('../pages/InvestorAuth/Login'));
const InvestorSignupForm = React.lazy(() => import('../pages/InvestorAuth/Signup'));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword/ForgotPassword'));
const ProductPage = React.lazy(() => import('../pages/ProductDetail/ProductDetail'));
const AboutUs = React.lazy(() => import('../pages/About/AboutUs'));
const QualityPolicies = React.lazy(() => import('../pages/QualityPolicies/QualityPolicies'));
const Brand = React.lazy(() => import('../pages/Brand/Brand'));
const HowToPay = React.lazy(() => import('../pages/HowToPay/HowToPay'));
const ProductList = React.lazy(() => import('../pages/ProductList/ProductList'));
const GetInTouch = React.lazy(() => import('../pages/GetInTouch/GetInTouch'));
const Resource = React.lazy(() => import('../pages/Resource/Resource'));
const SuppliersRegister = React.lazy(() => import('../pages/SupplierAuth/SuppliersRegister'));
const SuppliersLogin = React.lazy(() => import('../pages/SupplierAuth/SuppliersLogin'));
const BuyerDashboard = React.lazy(() => import('../pages/BuyerDashboard/BuyerDashboard'));
const CreditAccount = React.lazy(() => import('../pages/CreditAccount/CreditAccount'));
const Gallery = React.lazy(() => import('../pages/Resource/Gallery'));
const CSR = React.lazy(() => import('../pages/Resource/CSR'));
const Career = React.lazy(() => import('../pages/Resource/Career'));
const Faq = React.lazy(() => import('../pages/Resource/Faq'));
const Abc = React.lazy(() => import('../pages/Abc/Abc'));
const Tradeoffer = React.lazy(() => import('../pages/TradeOffer/Tradeoffer'));
const MarketDevelopment = React.lazy(() => import('../pages/MarketDevelopment/MarketDevelopment'));
const NewsAndEvents = React.lazy(() => import('../pages/NewsAndEvents/NewsAndEvents'));
const InvestorRelations = React.lazy(() => import('../pages/InvestorRelations/InvestorRelations'));
const PublicDashboard = React.lazy(() => import('../pages/BuyerDashboard/PublicDashboard'));
const PersonnelRegister = React.lazy(() => import('../pages/PersonnelRegister/PersonnelRegister'))
const PulicPrivateAuthLogin = React.lazy(() => import('../pages/PulicPrivateAuth/PulicPrivateAuthLogin'))
const Commedium = React.lazy(() => import('../pages/Commedium/Commedium'))
const ComingSoon = React.lazy(() => import('../pages/ComingSoon/ComingSoon'))
const TradeView = React.lazy(() => import('../pages/TradeView/TradeView'))
const Association = React.lazy(() => import('../pages/TradeOffer/Association'));
const Dealer = React.lazy(() => import('../pages/TradeOffer/Dealer'));
const Tender = React.lazy(() => import('../pages/TradeOffer/Tender'));
const Stocklots = React.lazy(() => import('../pages/TradeOffer/Stocklots'));
const TakeFurtherInitiative = React.lazy(() => import('../pages/TradeOffer/TakeFurtherInitiative'));
const TradeImpoExpo = React.lazy(() => import('../pages/TradeView/TradeImpoExpo'));

type Props = {
  children: JSX.Element;
};

export default function Router(): JSX.Element {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  function PrivateRoute({ children }: Props) {
    const token = localStorage.getItem('token');
    const buyer = localStorage.getItem('buyer');
    if (!token || buyer !== 'true') {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  function PublicRoute({ children }: Props) {
    const token = localStorage.getItem('token');
    const buyer = localStorage.getItem('buyer');
    if (token && buyer === 'true') {
      const rawToken = token.replace(/^"|"$/g, '');
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.");
      const targetBase = isLocalhost ? "http://localhost:3004" : "https://client.sourceseas.com";
      window.location.href = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
      return <></>;
    }
    return children;
  }

  function SupplierPrivateRoute({ children }: Props) {
    const buyer = localStorage.getItem('supplier');
    if (buyer !== 'true') {
      return <Navigate to="/suppliers/login" replace />;
    }
    return children;
  }

  function SupplierPublicRoute({ children }: Props) {
    const buyer = localStorage.getItem('supplier');
    if (buyer === 'true') {
      const rawToken = localStorage.getItem("token")?.replace(/^"|"$/g, '') || "";
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.");
      const targetBase = isLocalhost ? "http://localhost:3003" : "https://supplier.sourceseas.com";
      window.location.href = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
      return <></>;
    }
    return children;
  }

  function PPPrivateRoute({ children }: Props) {
    const buyer = localStorage.getItem('public_private');
    if (buyer !== 'true') {
      return <Navigate to="/public_private_login" replace />;
    }
    return children;
  }

  function PPPublicRoute({ children }: Props) {
    const buyer = localStorage.getItem('public_private');
    if (buyer === 'true') {
      const rawToken = localStorage.getItem("token")?.replace(/^"|"$/g, '') || "";
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.");
      const targetBase = isLocalhost ? "http://localhost:3005" : "https://service.sourceseas.com";
      window.location.href = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
      return <></>;
    }
    return children;
  }

  function InvestorPrivateRoute({ children }: Props) {
    const investor = localStorage.getItem('investor');
    if (investor !== 'true') {
      return <Navigate to="/investors/login" replace />;
    }
    return children;
  }

  function InvestorPublicRoute({ children }: Props) {
    const investor = localStorage.getItem('investor');
    if (investor === 'true') {
      const rawToken = localStorage.getItem("token")?.replace(/^"|"$/g, '') || "";
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.");
      const targetBase = isLocalhost ? "http://localhost:3002" : "https://monetile.sourceseas.com";
      window.location.href = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
      return <></>;
    }
    return children;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:country" element={<CountryPage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        }
      />
      <Route path="/sign-up" element={<SignupForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route path="/product-list/:slug" element={<ProductList />} />
      <Route path="/product-details/:id" element={<ProductPage />} />
      <Route path="/pages/quality_policies" element={<QualityPolicies />} />
      <Route path="/pages/brands" element={<Brand />} />
      <Route path="/how-to-pay" element={<HowToPay />} />
      <Route path="/get-in-touch" element={<GetInTouch />} />
      <Route path="/pages/:slug" element={<Resource />} />
      <Route path="/pages/gallery" element={<Gallery />} />
      <Route path="/pages/csr" element={<CSR />} />
      <Route path="/pages/career" element={<Career />} />
      <Route
        path="/public_private_login"
        element={
          <PPPublicRoute>
            <PulicPrivateAuthLogin />
          </PPPublicRoute>
        }
      />
      <Route path="/pages/faq" element={<Faq />} />
      <Route path="/suppliers/register" element={<SuppliersRegister />} />
      <Route path="/suppliers/login" element={
        <SupplierPublicRoute>
          <SuppliersLogin />
        </SupplierPublicRoute>
      }
      />
      <Route path="/investors/register" element={<InvestorSignupForm />} />
      <Route path="/investors/login" element={
        <InvestorPublicRoute>
          <InvestorLoginForm />
        </InvestorPublicRoute>
      }
      />
      <Route
        path="/buyer-dashboard"
        element={
          <PrivateRoute>
            {React.createElement(() => {
              const rawToken = localStorage.getItem("token")?.replace(/^"|"$/g, '') || "";
              const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.");
              const targetBase = isLocalhost ? "http://localhost:3004" : "https://client.sourceseas.com";
              window.location.href = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
              return <></>;
            })}
          </PrivateRoute>
        }
      />
      <Route path="/public_dashboard" element={
        <PPPrivateRoute>
          {React.createElement(() => {
            const rawToken = localStorage.getItem("token")?.replace(/^"|"$/g, '') || "";
            const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.");
            const targetBase = isLocalhost ? "http://localhost:3005" : "https://service.sourceseas.com";
            window.location.href = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
            return <></>;
          })}
        </PPPrivateRoute>
      }
      />
      <Route
        path="/supplier_dashboard"
        element={
          <SupplierPrivateRoute>
            {React.createElement(() => {
              const rawToken = localStorage.getItem("token")?.replace(/^"|"$/g, '') || "";
              const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.");
              const targetBase = isLocalhost ? "http://localhost:3003" : "https://supplier.sourceseas.com";
              window.location.href = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
              return <></>;
            })}
          </SupplierPrivateRoute>
        }
      />
      <Route
        path="/investor-dashboard"
        element={
          <InvestorPrivateRoute>
            {React.createElement(() => {
              const rawToken = localStorage.getItem("token")?.replace(/^"|"$/g, '') || "";
              const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.");
              const targetBase = isLocalhost ? "http://localhost:3002" : "https://monetile.sourceseas.com";
              window.location.href = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
              return <></>;
            })}
          </InvestorPrivateRoute>
        }
      />
      <Route
        path="/investor/profile"
        element={
          <InvestorPrivateRoute>
            {React.createElement(() => {
              const rawToken = localStorage.getItem("token")?.replace(/^"|"$/g, '') || "";
              const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.");
              const targetBase = isLocalhost ? "http://localhost:3002" : "https://monetile.sourceseas.com";
              window.location.href = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
              return <></>;
            })}
          </InvestorPrivateRoute>
        }
      />
      <Route path="/credit-account" element={<CreditAccount />} />
      <Route path="/trade-offers" element={<Tradeoffer />} />
      <Route path="/trade-offers/association" element={<Association />} />
      <Route path="/trade-offers/association/initiative" element={<TakeFurtherInitiative />} />
      <Route path="/trade-offers/dealer" element={<Dealer />} />
      <Route path="/trade-offers/tender" element={<Tender />} />
      <Route path="/trade-offers/stocklots" element={<Stocklots />} />
      <Route path="/commedium" element={<Commedium />} />
      <Route path="/abc" element={<Abc />} />
      <Route path="/market-development" element={<MarketDevelopment />} />
      <Route path="/news_and_events" element={<NewsAndEvents />} />
      <Route path="/investor_relations" element={<InvestorRelations />} />
      <Route path="/personnel/register" element={<PersonnelRegister />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/trade-view" element={<TradeView />} />
      <Route path="/trade-view/impo-expo" element={<TradeImpoExpo />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
