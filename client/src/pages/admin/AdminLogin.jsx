import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already logged in — redirect
  if (isAuthenticated) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md p-8 bg-white rounded-sm border border-outline-variant/20 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-headline font-bold text-primary italic">Logiverse CMS</h1>
          <p className="text-on-surface-variant mt-2">Đăng nhập hệ thống quản trị</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-error-container text-on-error-container text-sm rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-outline-variant/30 rounded-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-outline-variant/30 rounded-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
