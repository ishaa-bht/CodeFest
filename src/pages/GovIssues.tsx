import { useState } from 'react';
import { ArrowLeft, Eye, UserPlus, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockOfficers } from '../data/mockData';

interface GovIssuesProps {
  onNavigate: (page: string) => void;
}

export function GovIssues({ onNavigate }: GovIssuesProps) {
  const { issues, updateIssue } = useApp();
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredIssues = filter === 'all'
    ? issues
    : issues.filter(i => i.status === filter);

  const handleAssign = (issueId: string, officerName: string) => {
    updateIssue(issueId, {
      assignedTo: officerName,
      status: 'in-progress',
      updatedAt: new Date().toISOString()
    });
    setSelectedIssue(null);
  };

  const handleStatusChange = (issueId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    updateIssue(issueId, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => onNavigate('gov-dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Issue Management</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Issues
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'pending' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'in-progress' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredIssues.map(issue => (
          <div key={issue.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-blue-600">{issue.id}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {issue.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      issue.status === 'completed' ? 'bg-green-100 text-green-800' :
                      issue.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {issue.status === 'completed' ? 'Completed' :
                       issue.status === 'in-progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{issue.title}</h3>
                  <p className="text-gray-600 mb-3">{issue.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>Ward {issue.ward} - {issue.location}</span>
                    <span>Reported by: {issue.submittedBy}</span>
                    <span>{new Date(issue.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {issue.imageUrl && (
                  <img src={issue.imageUrl} alt={issue.title} className="w-32 h-32 object-cover rounded-lg ml-4" />
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                {issue.assignedTo ? (
                  <div className="flex items-center text-sm">
                    <UserPlus className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-gray-700">Assigned to: <strong>{issue.assignedTo}</strong></span>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign Officer
                  </button>
                )}

                {issue.status !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange(issue.id, 'completed')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </button>
                )}

                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-lg transition-colors flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
              </div>

              {selectedIssue === issue.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Assign to Officer:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {mockOfficers.map(officer => (
                      <button
                        key={officer.id}
                        onClick={() => handleAssign(issue.id, officer.name)}
                        className="px-4 py-2 bg-white hover:bg-blue-50 border border-gray-300 rounded-lg text-left transition-colors"
                      >
                        <p className="font-semibold text-gray-900 text-sm">{officer.name}</p>
                        <p className="text-xs text-gray-600">{officer.role}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
