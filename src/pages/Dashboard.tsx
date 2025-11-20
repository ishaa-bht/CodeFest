import { useState } from 'react';
import { Filter, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { issues } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [language, setLanguage] = useState<'en' | 'np'>('en');

  const t = {
    en: {
      back: "Back to Home",
      dashboardTitle: "Public Issue Dashboard",
      filterCategory: "Filter by Category",
      filterStatus: "Filter by Status",
      allCategories: "All Categories",
      allStatuses: "All Statuses",
      pending: "Pending",
      inProgress: "In Progress",
      completed: "Completed",
      showingIssues: "Showing",
      issuesText: "issues"
    },
    np: {
      back: "होममा फर्कनुहोस्",
      dashboardTitle: "सार्वजनिक मुद्दा ड्यासबोर्ड",
      filterCategory: "श्रेणी अनुसार फिल्टर गर्नुहोस्",
      filterStatus: "स्थिति अनुसार फिल्टर गर्नुहोस्",
      allCategories: "सबै श्रेणीहरू",
      allStatuses: "सबै स्थिति",
      pending: "पर्खँदैछ",
      inProgress: "समीक्षा भइरहेको छ",
      completed: "समाधान भयो",
      showingIssues: "देखाउँदै छ",
      issuesText: "मुद्दाहरू"
    }
  };

  const L = t[language];

  const filteredIssues = issues.filter(issue => {
    const categoryMatch = selectedCategory === 'all' || issue.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || issue.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return L.completed;
      case 'in-progress': return L.inProgress;
      case 'pending': return L.pending;
      default: return status;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {L.back}
        </button>

        <button
          onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
          className="mb-4 px-4 py-1 border rounded"
        >
          {language === 'en' ? 'नेपाली' : 'English'}
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{L.dashboardTitle}</h2>
            <Filter className="h-6 w-6 text-gray-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{L.filterCategory}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">{L.allCategories}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{L.filterStatus}</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">{L.allStatuses}</option>
                <option value="pending">{L.pending}</option>
                <option value="in-progress">{L.inProgress}</option>
                <option value="completed">{L.completed}</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600">{L.showingIssues} {filteredIssues.length} {L.issuesText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map(issue => (
            <div key={issue.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {issue.imageUrl && (
                <img src={issue.imageUrl} alt={issue.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600">{issue.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(issue.status)}`}>
                    {getStatusText(issue.status)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{issue.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {issue.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {new Date(issue.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <footer className="bg-gray-100 py-4 text-center">
        <p className="text-gray-600 text-sm">© 2025 Your Organization. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
