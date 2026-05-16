import { Outlet, Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const navItems = [
    { to: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { to: '/admin/articles', icon: 'article', label: 'Quản lý Bài viết' },
    { to: '/admin/topics', icon: 'category', label: 'Quản lý Chủ đề' },
    { to: '/admin/books', icon: 'menu_book', label: 'Quản lý Sách' },
    { to: '/admin/documents', icon: 'description', label: 'Quản lý Tài liệu' },
    { to: '/admin/subscribers', icon: 'mark_email_read', label: 'Bản tin / Subscribers' },
  ];

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link to="/admin/dashboard" className="text-2xl font-headline font-bold italic hover:opacity-80 transition-opacity">
            Logiverse CMS
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon, label }) => {
            const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 p-3 rounded-sm transition-colors ${
                  isActive ? 'bg-white/15 font-bold' : 'hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                <span className="text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full p-3 rounded-sm hover:bg-red-500/20 text-red-200 transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-outline-variant/20 flex items-center px-8 shrink-0">
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-primary leading-tight">{user?.name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{user?.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
