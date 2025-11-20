import { ReactNode } from 'react';
import { Shield, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: ReactNode;
  variant?: 'citizen' | 'government';
}

export function Layout({ children, variant = 'citizen' }: LayoutProps) {
  const { isAuthenticated, logout } = useApp();

  const isGovPortal = variant === 'government';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`${isGovPortal ? 'bg-gradient-to-r from-blue-900 to-blue-800' : 'bg-gradient-to-r from-red-700 to-red-600'} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold">
                  {isGovPortal ? 'Municipal Officer Portal' : 'Digital Transparency Platform'}
                </h1>
                <p className="text-sm text-white/90">
                  {isGovPortal ? 'Government of Nepal' : 'Empowering Citizens. Strengthening Governance.'}
                </p>
              </div>
            </div>
            {isAuthenticated && isGovPortal && (
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className={`${isGovPortal ? 'bg-blue-900' : 'bg-red-700'} text-white mt-16`}>
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
