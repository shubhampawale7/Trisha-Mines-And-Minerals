/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageProducts from "./pages/ManageProducts";
import Gallery from "./pages/Gallery";
import ManageGallery from "./admin/ManageGallery";
import Footer from "./components/Footer";
import ViewInquiries from "./admin/ViewInquiries";
import Analytics from "./pages/Analytics";
import TrackVisit from "./components/TrackVisit";
import BackupDatabase from "./pages/BackupDatabase";
import ErrorPage from "./pages/ErrorPage";
import SetupAdmin from "./pages/SetupAdmin";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const InactivityHandler = ({ timeout = 15 * 60 * 1000 }) => {
  const timer = useRef();
  const logout = () => {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const resetTimer = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(logout, timeout);
  };
  useEffect(() => {
    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timer.current);
    };
  }, []);
  return null;
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();
  const [hideLayout, setHideLayout] = useState(false);

  useEffect(() => {
    const pathsToHide = ["/404"];
    setHideLayout(pathsToHide.includes(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <InactivityHandler timeout={15 * 60 * 1000} />
      {!hideLayout && <Navbar />}
      {!hideLayout && location.pathname !== "/admin/analytics" && (
        <TrackVisit />
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
          <Route
            path="/services"
            element={
              <PageWrapper>
                <Services />
              </PageWrapper>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageWrapper>
                <Gallery />
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <AdminLogin />
              </PageWrapper>
            }
          />
          <Route
            path="/setup-admin"
            element={
              <PageWrapper>
                <SetupAdmin />
              </PageWrapper>
            }
          />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route
              index
              element={
                <PageWrapper>
                  <AdminDashboard />
                </PageWrapper>
              }
            />
            <Route
              path="products"
              element={
                <PageWrapper>
                  <ManageProducts />
                </PageWrapper>
              }
            />
            <Route
              path="manage-gallery"
              element={
                <PageWrapper>
                  <ManageGallery />
                </PageWrapper>
              }
            />
            <Route
              path="inquiries"
              element={
                <PageWrapper>
                  <ViewInquiries />
                </PageWrapper>
              }
            />
            <Route
              path="analytics"
              element={
                <PageWrapper>
                  <Analytics />
                </PageWrapper>
              }
            />
            <Route
              path="backup"
              element={
                <PageWrapper>
                  <BackupDatabase />
                </PageWrapper>
              }
            />
          </Route>

          {/* Catch-all Error Page */}
          <Route
            path="*"
            element={
              <PageWrapper>
                <ErrorPage />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      {!hideLayout && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
