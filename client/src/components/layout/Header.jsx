import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const megaMenuRef = useRef(null);
  const libraryBtnRef = useRef(null);
  const closeTimerRef = useRef(null);

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

  // Close mega menu on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMegaMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsMegaMenuOpen(true);
  };

  const scheduledClose = () => {
    closeTimerRef.current = setTimeout(() => setIsMegaMenuOpen(false), 150);
  };

  const handleLibraryClick = () => {
    setIsMegaMenuOpen(false);
    navigate('/thu-vien');
  };

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
          {/* Brand with Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-headline text-2xl font-bold tracking-tighter text-primary"
          >
            <img
              src="/Logo.png"
              alt="Logiknowledge Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            Logiknowledge
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.hasMegaMenu ? (
                <div
                  key={item.path}
                  ref={libraryBtnRef}
                  className="relative"
                  onMouseEnter={openMegaMenu}
                  onMouseLeave={scheduledClose}
                >
                  <button
                    onClick={handleLibraryClick}
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
                </div>
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

          {/* Right: Search only */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
              title="Tìm kiếm (⌘K)"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
      </nav>

      {/* MegaMenu overlay — hover-aware */}
      <div
        onMouseEnter={openMegaMenu}
        onMouseLeave={scheduledClose}
      >
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
