import { ArrowLeft, TrendingUp, MapPin, Clock, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface GovAnalyticsProps {
  onNavigate: (page: string) => void;
}

export function GovAnalytics({ onNavigate }: GovAnalyticsProps) {
  const { issues } = useApp();

  const wardStats = issues.reduce((acc, issue) => {
    acc[issue.ward] = (acc[issue.ward] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const topWards = Object.entries(wardStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const categoryStats = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const completedIssues = issues.filter(i => i.status === 'completed');
  const avgResolutionTime = 3.2;
  const resolutionRate = (completedIssues.length / issues.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => onNavigate('gov-dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h2>
        <p className="text-gray-600">Performance metrics and data-driven insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-10 w-10 text-blue-600" />
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg Resolution Time</p>
          <p className="text-3xl font-bold text-gray-900">{avgResolutionTime} days</p>
          <p className="text-xs text-green-600 mt-2">12% faster than last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-10 w-10 text-green-600" />
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Resolution Rate</p>
          <p className="text-3xl font-bold text-gray-900">{resolutionRate.toFixed(1)}%</p>
          <p className="text-xs text-green-600 mt-2">8% improvement</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <MapPin className="h-10 w-10 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Wards</p>
          <p className="text-3xl font-bold text-gray-900">{Object.keys(wardStats).length}</p>
          <p className="text-xs text-gray-600 mt-2">Across municipality</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Issues by Ward</h3>
          <div className="space-y-4">
            {topWards.map(([ward, count]) => (
              <div key={ward}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Ward {ward}</span>
                  <span className="text-sm font-bold text-gray-900">{count} issues</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${(Number(count) / issues.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Issues by Category</h3>
          <div className="space-y-4">
            {Object.entries(categoryStats)
              .sort((a, b) => b[1] - a[1])
              .map(([category, count]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">{category}</span>
                    <span className="text-sm font-bold text-gray-900">{count} issues</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${(count / issues.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Reports This Month</p>
                <p className="text-2xl font-bold text-blue-600">{issues.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Resolved This Month</p>
                <p className="text-2xl font-bold text-green-600">{completedIssues.length}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Pending Actions</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {issues.filter(i => i.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Resource Planning</h3>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">High Priority Areas</p>
              <ul className="space-y-2 text-sm text-gray-600">
                {topWards.slice(0, 3).map(([ward]) => (
                  <li key={ward} className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-red-500" />
                    Ward {ward} - Requires additional resources
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Recommendations</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Increase field staff in Ward {topWards[0]?.[0]}</li>
                <li>• Focus on {Object.keys(categoryStats)[0]} prevention</li>
                <li>• Deploy mobile units for rapid response</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
