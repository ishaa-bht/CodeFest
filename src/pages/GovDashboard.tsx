import { useState } from 'react';
import { BarChart3, AlertCircle, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockOfficers } from '../data/mockData';

interface GovDashboardProps {
  onNavigate: (page: string) => void;
}

export function GovDashboard({ onNavigate }: GovDashboardProps) {
  const { issues } = useApp();
  const [selectedWard, setSelectedWard] = useState('all');

  const filteredIssues = selectedWard === 'all'
    ? issues
    : issues.filter(i => i.ward === parseInt(selectedWard));

  const stats = {
    total: filteredIssues.length,
    pending: filteredIssues.filter(i => i.status === 'pending').length,
    inProgress: filteredIssues.filter(i => i.status === 'in-progress').length,
    completed: filteredIssues.filter(i => i.status === 'completed').length
  };

  const categoryStats = filteredIssues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Officer Dashboard</h2>
          <p className="text-gray-600 mt-1">Municipal Issue Management System</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('gov-issues')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Manage Issues
          </button>
          <button
            onClick={() => onNavigate('gov-analytics')}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Analytics
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Ward</label>
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Wards</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(ward => (
            <option key={ward} value={ward}>Ward {ward}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Issues</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <AlertCircle className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="h-10 w-10 text-red-500" />
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

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Reports</h3>
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            {filteredIssues.slice(0, 5).map(issue => (
              <div key={issue.id} className="flex items-start justify-between pb-4 border-b border-gray-200 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-blue-600">{issue.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      issue.status === 'completed' ? 'bg-green-100 text-green-800' :
                      issue.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {issue.status === 'completed' ? 'Completed' :
                       issue.status === 'in-progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{issue.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{issue.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Issue Categories</h3>
            <BarChart3 className="h-6 w-6 text-green-600" />
          </div>
          <div className="space-y-4">
            {topCategories.map(([category, count]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{category}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Field Officers</h3>
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div className="space-y-4">
            {mockOfficers.map(officer => {
              const assignedCount = issues.filter(i => i.assignedTo === officer.name).length;
              return (
                <div key={officer.id} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0">
                  <div>
                    <p className="font-semibold text-gray-900">{officer.name}</p>
                    <p className="text-sm text-gray-600">{officer.role}</p>
                    <p className="text-xs text-gray-500">Ward {officer.ward}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{assignedCount}</p>
                    <p className="text-xs text-gray-500">Assigned</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Performance Metrics</h3>
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Resolution Rate</span>
                <span className="text-lg font-bold text-green-600">
                  {((stats.completed / stats.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Avg Response Time</span>
                <span className="text-lg font-bold text-blue-600">2.8 days</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">This Month</span>
                <span className="text-lg font-bold text-purple-600">{stats.total} reports</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">Last updated: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
