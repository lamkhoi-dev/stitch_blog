import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      <span className="text-on-surface-variant text-sm tracking-widest uppercase">Đang tải...</span>
    </div>
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// Public pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const LibraryHub = lazy(() => import('./pages/public/LibraryHub'));
const NewsListing = lazy(() => import('./pages/public/NewsListing'));
const CaseStudyListing = lazy(() => import('./pages/public/CaseStudyListing'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const BookListing = lazy(() => import('./pages/public/BookListing'));
const ContractListing = lazy(() => import('./pages/public/ContractListing'));
const LogisticsListing = lazy(() => import('./pages/public/LogisticsListing'));
const SupplyChainListing = lazy(() => import('./pages/public/SupplyChainListing'));
const TopicPage = lazy(() => import('./pages/public/TopicPage'));
const ArticleDetail = lazy(() => import('./pages/public/ArticleDetail'));
const BookDetail = lazy(() => import('./pages/public/BookDetail'));
const DocumentDetail = lazy(() => import('./pages/public/DocumentDetail'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ArticleList = lazy(() => import('./pages/admin/ArticleList'));
const ArticleEditor = lazy(() => import('./pages/admin/ArticleEditor'));
const TopicManager = lazy(() => import('./pages/admin/TopicManager'));
const BookManager = lazy(() => import('./pages/admin/BookManager'));
const BookEditor = lazy(() => import('./pages/admin/BookEditor'));
const DocumentManager = lazy(() => import('./pages/admin/DocumentManager'));
const DocumentEditor = lazy(() => import('./pages/admin/DocumentEditor'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // Public routes
      { path: '/', element: withSuspense(HomePage) },
      { path: '/thu-vien', element: withSuspense(LibraryHub) },
      { path: '/tin-tuc', element: withSuspense(NewsListing) },
      { path: '/tin-tuc/:slug', element: withSuspense(ArticleDetail) },
      { path: '/case-study', element: withSuspense(CaseStudyListing) },
      { path: '/case-study/:slug', element: withSuspense(ArticleDetail) },
      { path: '/ve-chung-toi', element: withSuspense(AboutPage) },

      // Library sub-routes
      { path: '/thu-vien/sach', element: withSuspense(BookListing) },
      { path: '/thu-vien/sach/:slug', element: withSuspense(BookDetail) },
      { path: '/thu-vien/hop-dong-chung-tu', element: withSuspense(ContractListing) },
      { path: '/thu-vien/hop-dong-chung-tu/:slug', element: withSuspense(DocumentDetail) },
      { path: '/thu-vien/logistics', element: withSuspense(LogisticsListing) },
      { path: '/thu-vien/logistics/:topicSlug', element: withSuspense(TopicPage) },
      { path: '/thu-vien/chuoi-cung-ung', element: withSuspense(SupplyChainListing) },
      { path: '/thu-vien/chuoi-cung-ung/:topicSlug', element: withSuspense(TopicPage) },

      // Topic article detail
      { path: '/thu-vien/logistics/:topicSlug/:slug', element: withSuspense(ArticleDetail) },
      { path: '/thu-vien/chuoi-cung-ung/:topicSlug/:slug', element: withSuspense(ArticleDetail) },

      // Admin login (standalone, no sidebar)
      { path: '/admin', element: withSuspense(AdminLogin) },

      // Admin protected routes (with sidebar layout)
      {
        element: withSuspense(AdminLayout),
        children: [
          { path: '/admin/dashboard', element: withSuspense(AdminDashboard) },
          { path: '/admin/articles', element: withSuspense(ArticleList) },
          { path: '/admin/articles/new', element: withSuspense(ArticleEditor) },
          { path: '/admin/articles/:id/edit', element: withSuspense(ArticleEditor) },
          { path: '/admin/topics', element: withSuspense(TopicManager) },
          { path: '/admin/books', element: withSuspense(BookManager) },
          { path: '/admin/books/new', element: withSuspense(BookEditor) },
          { path: '/admin/books/:id/edit', element: withSuspense(BookEditor) },
          { path: '/admin/documents', element: withSuspense(DocumentManager) },
          { path: '/admin/documents/new', element: withSuspense(DocumentEditor) },
          { path: '/admin/documents/:id/edit', element: withSuspense(DocumentEditor) },
        ],
      },
    ],
  },
]);

export default router;
