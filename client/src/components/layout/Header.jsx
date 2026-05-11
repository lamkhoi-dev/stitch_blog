import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import SearchModal from '../SearchModal';

const navItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Thư viện', path: '/thu-vien', hasMegaMenu: true },
  { label: 'Tin tức', path: '/tin-tuc' },
  { label: 'Case Study', path: '/case-study' },
  { label: 'Về chúng tôi', path: '/ve-chung-toi' },
];

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white/90 backdrop-blur-md'
        } border-b border-[#001e37]/10`}
      >
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          {/* Brand */}
          <Link
            to="/"
            className="font-headline text-2xl font-bold tracking-tighter text-primary"
          >
            Logiknowledge
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.hasMegaMenu ? (
                <button
                  key={item.path}
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className={`font-headline italic tracking-tight text-lg transition-colors flex items-center gap-1 ${
                    location.pathname.startsWith('/thu-vien')
                      ? 'text-primary font-bold border-b-2 border-primary pb-1'
                      : 'text-slate-600 font-medium hover:text-primary'
                  }`}
                >
                  {item.label}
                  <span
                    className={`material-symbols-outlined text-sm transition-transform duration-200 ${
                      isMegaMenuOpen ? 'rotate-180' : ''
                    }`}
                  >
                    keyboard_arrow_down
                  </span>
                </button>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-headline italic tracking-tight text-lg transition-colors ${
                      isActive
                        ? 'text-primary font-bold border-b-2 border-primary pb-1'
                        : 'text-slate-600 font-medium hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity hidden md:block"
              title="Tìm kiếm (⌘K)"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            <Link
              to="/admin"
              className="bg-primary text-white px-6 py-2 rounded-sm text-sm font-bold tracking-wide hover:opacity-90 transition-all active:scale-95 hidden md:block"
            >
              Đăng nhập
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden material-symbols-outlined text-primary"
            >
              {isMobileMenuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-primary/5 animate-slide-down">
            <div className="px-8 py-6 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block font-headline italic text-lg py-2 transition-colors ${
                      isActive ? 'text-primary font-bold' : 'text-slate-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/admin"
                className="block bg-primary text-white px-6 py-3 rounded-sm text-sm font-bold tracking-wide text-center mt-4"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* MegaMenu overlay */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
