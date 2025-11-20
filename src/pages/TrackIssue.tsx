import { useState } from 'react';
import { Search, MapPin, Clock, User, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TrackIssueProps {
  onNavigate: (page: string) => void;
}

export function TrackIssue({ onNavigate }: TrackIssueProps) {
  const { issues } = useApp();
  const [refId, setRefId] = useState('');
  const [foundIssue, setFoundIssue] = useState<typeof issues[0] | null>(null);
  const [searched, setSearched] = useState(false);
  const [language, setLanguage] = useState<'en' | 'np'>('en');

  const t = {
    en: {
      back: "Back to Home",
      placeholder: "Enter Reference ID (e.g., REF001)",
      search: "Search",
      noReport: "No report found with ID",
      checkId: "Please check the reference ID and try again",
      trackTitle: "Track Your Report",
      trackSubtitle: "Enter your reference ID to check the status of your report",
      location: "Location",
      ward: "Ward",
      reportedBy: "Reported By",
      submittedOn: "Submitted On",
      assignedTo: "Assigned To",
      description: "Description",
      progressTimeline: "Progress Timeline",
      reportSubmitted: "Report Submitted",
      underReview: "Under Review",
      resolved: "Resolved",
      assignedTeam: "Assigned to field team"
    },
    np: {
      back: "होममा फर्कनुहोस्",
      placeholder: "रेफरेन्स ID लेख्नुहोस् (जस्तै REF001)",
      search: "खोज्नुहोस्",
      noReport: "ID सँग कुनै रिपोर्ट फेला परेन",
      checkId: "कृपया रेफरेन्स ID जाँच्नुहोस् र पुन: प्रयास गर्नुहोस्",
      trackTitle: "तपाईंको रिपोर्ट ट्र्याक गर्नुहोस्",
      trackSubtitle: "रिपोर्टको स्थिति जाँच गर्न रेफरेन्स ID लेख्नुहोस्",
      location: "स्थान",
      ward: "वडा",
      reportedBy: "रिपोर्ट गर्ने व्यक्ति",
      submittedOn: "पेश गरिएको मिति",
      assignedTo: "जिम्मेवारीमा राखिएको व्यक्ति",
      description: "विवरण",
      progressTimeline: "प्रगति समयरेखा",
      reportSubmitted: "रिपोर्ट पेश गरियो",
      underReview: "समीक्षा भइरहेको छ",
      resolved: "समाधान भयो",
      assignedTeam: "फिल्ड टिमलाई जिम्मा दिइयो"
    }
  };

  const L = t[language];

  const handleSearch = () => {
    const issue = issues.find(i => i.id === refId.toUpperCase());
    setFoundIssue(issue || null);
    setSearched(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'pending': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return language === 'en' ? 'Completed' : 'समाधान भयो';
      case 'in-progress': return language === 'en' ? 'In Progress' : 'समीक्षा भइरहेको छ';
      case 'pending': return language === 'en' ? 'Pending' : 'पर्खँदैछ';
      default: return status;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{L.trackTitle}</h2>
          <p className="text-gray-600 mb-8">{L.trackSubtitle}</p>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
                placeholder={L.placeholder}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              {L.search}
            </button>
          </div>
        </div>

        {searched && !foundIssue && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{L.noReport}: {refId}</p>
            <p className="text-sm text-red-600 mt-2">{L.checkId}</p>
          </div>
        )}

        {foundIssue && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {foundIssue.imageUrl && (
              <img src={foundIssue.imageUrl} alt={foundIssue.title} className="w-full h-64 object-cover" />
            )}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{foundIssue.title}</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${getStatusColor(foundIssue.status)}`}>
                  {getStatusText(foundIssue.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{L.location}</p>
                      <p className="text-gray-900">{foundIssue.location}</p>
                      <p className="text-sm text-gray-500">{L.ward} {foundIssue.ward}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{L.reportedBy}</p>
                      <p className="text-gray-900">{foundIssue.submittedBy}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{L.submittedOn}</p>
                      <p className="text-gray-900">{new Date(foundIssue.submittedAt).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{new Date(foundIssue.submittedAt).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  {foundIssue.assignedTo && (
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <User className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{L.assignedTo}</p>
                        <p className="text-gray-900">{foundIssue.assignedTo}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">{L.description}</p>
                <p className="text-gray-900">{foundIssue.description}</p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">{L.progressTimeline}</p>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6">
                    <div className="relative flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${foundIssue.status === 'pending' ? 'bg-red-500' : 'bg-gray-300'} z-10`}>
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900">{L.reportSubmitted}</p>
                        <p className="text-sm text-gray-500">{new Date(foundIssue.submittedAt).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${foundIssue.status === 'in-progress' || foundIssue.status === 'completed' ? 'bg-yellow-500' : 'bg-gray-300'} z-10`}>
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900">{L.underReview}</p>
                        <p className="text-sm text-gray-500">{L.assignedTeam}</p>
                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${foundIssue.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'} z-10`}>
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900">{L.resolved}</p>
                        {foundIssue.status === 'completed' && (
                          <p className="text-sm text-gray-500">{new Date(foundIssue.updatedAt).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <footer className="bg-gray-100 py-4 text-center">
        <p className="text-gray-600 text-sm">© 2025 Your Organization. All rights reserved.</p>
      </footer> */}
    </div>
  );
}