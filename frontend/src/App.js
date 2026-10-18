import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/context/StoreContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import SearchOverlay from "@/components/SearchOverlay";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Home from "@/pages/Home";
import Collection from "@/pages/Collection";
import Bundles from "@/pages/Bundles";
import Product from "@/pages/Product";
import CartPage from "@/pages/CartPage";
import Wishlist from "@/pages/Wishlist";
import SearchPage from "@/pages/SearchPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQPage from "@/pages/FAQPage";
import TrackOrder from "@/pages/TrackOrder";
import PolicyPage from "@/pages/PolicyPage";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    if (search) window.scrollTo(0, 0);
  }, [search]);
  return null;
}

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

function Shell() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-ivory">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/collections/bundles" element={<Bundles />} />
          <Route path="/collections/:handle" element={<Collection />} />
          <Route path="/products/:handle" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pages/about" element={<About />} />
          <Route path="/pages/contact" element={<Contact />} />
          <Route path="/pages/faq" element={<FAQPage />} />
          <Route path="/pages/track-order" element={<TrackOrder />} />
          <Route path="/pages/:slug" element={<PolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <MobileMenu />
      <SearchOverlay />
      <Toaster position="bottom-right" richColors closeButton />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <BrowserRouter>
          <ScrollToTop />
          <SmoothScroll />
          <Shell />
        </BrowserRouter>
      </StoreProvider>
    </ErrorBoundary>
  );
}
