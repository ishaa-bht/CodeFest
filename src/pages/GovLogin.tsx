import { useState } from 'react';
import { Shield, Lock, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface GovLoginProps {
  onNavigate: (page: string) => void;
}

export function GovLogin({ onNavigate }: GovLoginProps) {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'officer' && password === 'demo123') {
      login();
      onNavigate('gov-dashboard');
    } else {
      alert('Invalid credentials. Use username: officer, password: demo123');
    }
  };

  const handleDemoLogin = () => {
    setUsername('officer');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-12 text-center">
            <Shield className="h-16 w-16 text-white mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Municipal Officer Portal</h1>
            <p className="text-blue-100 text-sm">Government of Nepal</p>
          </div>

          <div className="px-8 py-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Secure Login</h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter username"
                    required
                  />
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter password"
                    required
                  />
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={handleDemoLogin}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="h-5 w-5" />
                Auto-fill Demo Credentials
              </button>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="w-full mt-4 px-6 py-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
            >
              Back to Citizen Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
