import { AlertCircle, MapPin, TrendingUp, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CitizenHomeProps {
  onNavigate: (page: string) => void;
}

export function CitizenHome({ onNavigate }: CitizenHomeProps) {
  const { issues } = useApp();

  const stats = {
    total: issues.length,
    completed: issues.filter(i => i.status === 'completed').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    pending: issues.filter(i => i.status === 'pending').length
  };

  const avgResolutionTime = 3.2;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Your Voice Matters
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Report issues in your community and track their resolution
        </p>
        <button
          onClick={() => onNavigate('report')}
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-colors"
        >
          Report an Issue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Issues</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <AlertCircle className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Resolved</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
            <TrendingUp className="h-10 w-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Resolution</p>
              <p className="text-3xl font-bold text-gray-900">{avgResolutionTime}d</p>
            </div>
            <MapPin className="h-10 w-10 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Resolutions</h3>
          <div className="space-y-4">
            {issues.filter(i => i.status === 'completed').slice(0, 3).map(issue => (
              <div key={issue.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-0">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">{issue.title}</p>
                  <p className="text-sm text-gray-600">{issue.location}</p>
                  <p className="text-xs text-gray-500 mt-1">Resolved on {new Date(issue.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition-colors text-left"
            >
              View All Issues
            </button>
            <button
              onClick={() => onNavigate('track')}
              className="w-full px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-lg transition-colors text-left"
            >
              Track Your Report
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition-colors text-left"
            >
              Submit New Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
