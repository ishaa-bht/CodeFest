import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { CitizenHome } from './pages/CitizenHome';
import { ReportIssue } from './pages/ReportIssue';
import { Dashboard } from './pages/Dashboard';
import { TrackIssue } from './pages/TrackIssue';
import { GovLogin } from './pages/GovLogin';
import { GovDashboard } from './pages/GovDashboard';
import { GovIssues } from './pages/GovIssues';
import { GovAnalytics } from './pages/GovAnalytics';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <CitizenHome onNavigate={setCurrentPage} />;
      case 'report':
        return <ReportIssue onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'track':
        return <TrackIssue onNavigate={setCurrentPage} />;
      case 'gov-login':
        return <GovLogin onNavigate={setCurrentPage} />;
      case 'gov-dashboard':
        return isAuthenticated ? <GovDashboard onNavigate={setCurrentPage} /> : <GovLogin onNavigate={setCurrentPage} />;
      case 'gov-issues':
        return isAuthenticated ? <GovIssues onNavigate={setCurrentPage} /> : <GovLogin onNavigate={setCurrentPage} />;
      case 'gov-analytics':
        return isAuthenticated ? <GovAnalytics onNavigate={setCurrentPage} /> : <GovLogin onNavigate={setCurrentPage} />;
      default:
        return <CitizenHome onNavigate={setCurrentPage} />;
    }
  };

  const isGovPage = currentPage.startsWith('gov');

  if (currentPage === 'gov-login') {
    return <GovLogin onNavigate={setCurrentPage} />;
  }

  return (
    <Layout variant={isGovPage ? 'government' : 'citizen'}>
      {renderPage()}
      {!isGovPage && (
        <button
          onClick={() => setCurrentPage('gov-login')}
          className="fixed bottom-8 right-8 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-lg transition-colors"
        >
          Officer Login
        </button>
      )}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
