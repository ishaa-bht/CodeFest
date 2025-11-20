import { MessageCircle, Globe, AlertCircle, Eye, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
// import { useApp } from '../context/AppContext';

interface CitizenHomeProps {
  onNavigate: (page: string) => void;
}

export function CitizenHome({ onNavigate }: CitizenHomeProps) {
  // const { issues } = useApp();
  const [language, setLanguage] = useState<'en' | 'ne'>('en');
  const [showChat, setShowChat] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translations = {
    en: {
      title: "Your Voice Matters",
      subtitle: "Report issues in your community and track their resolution",
      reportIssue: "Report an Issue",
      viewAll: "View All Issues",
      track: "Track Your Report",
      submit: "Submit New Report",
      recentResolutions: "Recent Resolutions",
      resolvedOn: "Resolved on",
      // officerLogin: "Officer Login",
      chatbot: "Chat Assistant"
    },
    ne: {
      title: "तपाईंको आवाज महत्त्वपूर्ण छ",
      subtitle: "आफ्नो समुदायमा समस्या रिपोर्ट गर्नुहोस् र तिनीहरूको समाधान ट्र्याक गर्नुहोस्",
      reportIssue: "समस्या रिपोर्ट गर्नुहोस्",
      viewAll: "सबै समस्याहरू हेर्नुहोस्",
      track: "तपाईंको रिपोर्ट ट्र्याक गर्नुहोस्",
      submit: "नयाँ रिपोर्ट पेश गर्नुहोस्",
      recentResolutions: "हालका समाधानहरू",
      resolvedOn: "समाधान मिति",
      // officerLogin: "अधिकारी लगइन",
      chatbot: "च्याट सहायक"
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Language Toggle and Officer Login */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
          className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
        >
          <Globe className="h-5 w-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">
            {language === 'en' ? 'नेपाली' : 'English'}
          </span>
        </button>
        
        {/* <button
          onClick={() => onNavigate('officer-login')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
        >
          {t.officerLogin}
        </button> */}
      </div>

      {/* Parallax Header */}
      <div 
        className="relative overflow-hidden py-20 mb-12"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {t.title}
          </h2>
          <p 
            className="text-xl md:text-2xl text-gray-600"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Card-based Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Report an Issue Card */}
          <div 
            onClick={() => onNavigate('report')}
            className="bg-white p-6 rounded-xl shadow-lg border-2 border-red-200 hover:border-red-400 transition-all cursor-pointer hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-red-100 rounded-full">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {t.reportIssue}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {language === 'en' ? 'Report a new community issue' : 'नयाँ समुदाय समस्या रिपोर्ट गर्नुहोस्'}
            </p>
          </div>

          {/* View All Issues Card */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {t.viewAll}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {language === 'en' ? 'Browse all reported issues' : 'सबै रिपोर्ट गरिएका समस्याहरू हेर्नुहोस्'}
            </p>
          </div>

          {/* Track Your Report Card */}
          <div 
            onClick={() => onNavigate('track')}
            className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {t.track}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {language === 'en' ? 'Check status of your reports' : 'आफ्नो रिपोर्टको स्थिति जाँच गर्नुहोस्'}
            </p>
          </div>

          {/* Recent Resolutions Card - Spans 2-3 columns */}
          {/* <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-200 md:col-span-2 lg:col-span-3">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t.recentResolutions}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {issues.filter(i => i.status === 'completed').slice(0, 3).map(issue => (
                <div key={issue.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-400 transition-all">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">{issue.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{issue.location}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {t.resolvedOn} {new Date(issue.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

        </div>
      </div>

      {/* Chatbot Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-all hover:scale-110 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Simple Chat Window */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl border-2 border-gray-200 z-50">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h4 className="font-semibold">{t.chatbot}</h4>
            <button onClick={() => setShowChat(false)} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            <div className="bg-blue-100 p-3 rounded-lg mb-2">
              <p className="text-sm text-gray-800">
                {language === 'en' 
                  ? "Hello! How can I help you today?" 
                  : "नमस्ते! म आज तपाईंलाई कसरी मद्दत गर्न सक्छु?"}
              </p>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder={language === 'en' ? "Type your message..." : "आफ्नो सन्देश टाइप गर्नुहोस्..."}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}