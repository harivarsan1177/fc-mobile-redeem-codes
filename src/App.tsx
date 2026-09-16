import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import type { CodeItem, CodeFilterState } from './types/code';
import { subscribeToPublicCodes, subscribeToAdminCodes } from './services/codeService';
import { subscribeToAuthState, signOutAdmin } from './firebase/auth';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Footer } from './components/Footer';
import { InfoModal } from './pages/InfoModal';

export const App: React.FC = () => {
  // Navigation View State
  const [currentView, setCurrentView] = useState<
    'home' | 'admin-login' | 'admin-dashboard' | 'how-to-redeem'
  >('home');

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Codes Data State
  const [codes, setCodes] = useState<CodeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<Error | null>(null);

  // Public Filter State
  const [filter, setFilter] = useState<CodeFilterState>({
    search: '',
    status: 'ACTIVE',
    sortBy: 'newest',
  });

  // Legal / Info Modal State
  const [infoModalType, setInfoModalType] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  // Configured URLs
  const officialRedeemUrl =
    import.meta.env.VITE_OFFICIAL_REDEEM_URL || 'https://redeem.fcm.ea.com/';

  // Listen to Auth State
  useEffect(() => {
    const unsubAuth = subscribeToAuthState((user) => {
      setCurrentUser(user);
    });
    return () => unsubAuth();
  }, []);

  // Listen to pathname & hash changes in URL for direct /admin access
  useEffect(() => {
    const handleRoute = () => {
      const pathname = window.location.pathname.replace(/\/+$/, '');
      const hash = window.location.hash;

      const isAdminPath = pathname === '/admin' || pathname.endsWith('/admin');
      const isAdminHash = hash === '#admin';
      const isLoginPath = pathname === '/login' || pathname.endsWith('/login');
      const isLoginHash = hash === '#login';

      if (isAdminPath || isAdminHash) {
        setCurrentView(currentUser ? 'admin-dashboard' : 'admin-login');
      } else if (isLoginPath || isLoginHash) {
        setCurrentView('admin-login');
      } else if (hash === '#how-to-redeem') {
        setCurrentView('how-to-redeem');
      } else if (!hash && (pathname === '' || pathname === '/')) {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    handleRoute();
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, [currentUser]);

  // Subscribe to codes based on current view (Admin vs Public)
  useEffect(() => {
    setIsLoading(true);
    setLoadError(null);

    if (currentView === 'admin-dashboard') {
      const unsub = subscribeToAdminCodes(
        (data) => {
          setCodes(data);
          setIsLoading(false);
        },
        (err) => {
          setLoadError(err);
          setIsLoading(false);
        }
      );
      return () => unsub();
    } else {
      const unsub = subscribeToPublicCodes(
        (data) => {
          setCodes(data);
          setIsLoading(false);
        },
        (err) => {
          setLoadError(err);
          setIsLoading(false);
        }
      );
      return () => unsub();
    }
  }, [currentView]);

  const handleSignOut = async () => {
    await signOutAdmin();
    setCurrentUser(null);
    setCurrentView('home');
    if (window.location.pathname.endsWith('/admin') || window.location.pathname.endsWith('/login')) {
      window.history.pushState({}, '', '/');
    }
    window.location.hash = '';
  };

  const handleNavigateAdmin = () => {
    if (currentUser) {
      setCurrentView('admin-dashboard');
      if (!window.location.pathname.endsWith('/admin')) {
        window.location.hash = '#admin';
      }
    } else {
      setCurrentView('admin-login');
      if (!window.location.pathname.endsWith('/admin')) {
        window.location.hash = '#admin';
      }
    }
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    if (window.location.pathname.endsWith('/admin') || window.location.pathname.endsWith('/login')) {
      window.history.pushState({}, '', '/');
    }
    window.location.hash = '';
  };

  const handleResetFilters = () => {
    setFilter({
      search: '',
      status: 'ALL',
      sortBy: 'newest',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f1f5f9] selection:bg-[#00ff87] selection:text-[#060a12]">
      {/* Header */}
      <Header
        currentUser={currentUser}
        onNavigateAdmin={handleNavigateAdmin}
        onNavigateHome={handleNavigateHome}
        onSignOut={handleSignOut}
        currentView={currentView}
      />

      {/* Main Content Area */}
      {currentView === 'admin-login' && (
        <AdminLoginPage
          onSuccess={() => {
            setCurrentView('admin-dashboard');
            if (window.location.hash === '#login') {
              window.location.hash = '#admin';
            }
          }}
          onBack={handleNavigateHome}
        />
      )}

      {currentView === 'admin-dashboard' && (
        <AdminDashboardPage
          codes={codes}
          onBackToHome={handleNavigateHome}
          onSignOut={handleSignOut}
        />
      )}

      {(currentView === 'home' || currentView === 'how-to-redeem') && (
        <HomePage
          codes={codes}
          isLoading={isLoading}
          error={loadError}
          filter={filter}
          onFilterChange={(updates) => setFilter((prev) => ({ ...prev, ...updates }))}
          onResetFilters={handleResetFilters}
          officialRedeemUrl={officialRedeemUrl}
        />
      )}

      {/* Footer */}
      <Footer
        onOpenHowToRedeem={() => {
          handleNavigateHome();
          window.location.hash = '#how-to-redeem';
        }}
        onOpenTerms={() => setInfoModalType('terms')}
        onOpenPrivacy={() => setInfoModalType('privacy')}
        onOpenContact={() => setInfoModalType('contact')}
      />

      {/* Modals for Legal / Info */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />
    </div>
  );
};

export default App;
