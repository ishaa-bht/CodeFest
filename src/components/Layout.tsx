import { ReactNode } from 'react';
import { LogOut, Shield } from 'lucide-react'; // <- Added Shield
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: ReactNode;
  variant?: 'citizen' | 'government';
}

export function Layout({ children, variant = 'citizen' }: LayoutProps) {
  const { isAuthenticated, logout } = useApp();
  const isGovPortal = variant === 'government';

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {isAuthenticated && isGovPortal && (
        <button
          onClick={logout}
          className="fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white shadow-lg rounded-lg hover:bg-blue-800 transition-colors z-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      )}

      {/* Header restored only for Government Portal */}
      {isGovPortal && isAuthenticated && (
        <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-white" /> {/* Added Shield Icon */}
                <h1 className="text-2xl font-bold">Municipal Officer Portal</h1>
              </div>
            </div>
          </div>
        </header>
      )}

      <main>{children}</main>

      <footer className={`${isGovPortal ? 'bg-blue-900' : 'bg-blue-900'} text-white mt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">© 2025 Government of Nepal - Digital Transparency Initiative</p>
            <p className="text-xs mt-2 text-white/80">Together for a Transparent Nepal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
