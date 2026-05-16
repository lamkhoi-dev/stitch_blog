import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../../contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { fontSize: '14px' } }} />
      {isAdminRoute ? (
        <Outlet />
      ) : (
        <div className="min-h-screen flex flex-col bg-background text-on-surface">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1]"
            style={{
              backgroundImage: 'radial-gradient(#121c28 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>
      )}
    </AuthProvider>
  );
}
