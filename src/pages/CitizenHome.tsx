import { MessageCircle, Globe, AlertCircle, Eye, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CitizenHomeProps {
  onNavigate: (page: string) => void;
}

export function CitizenHome({ onNavigate }: CitizenHomeProps) {
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
      subtitle: "Transform your neighborhood through collective action and transparent governance",
      reportIssue: "Report an Issue",
      viewAll: "View All Issues",
      track: "Track Your Report",
      chatbot: "Chat Assistant"
    },
    ne: {
      subtitle: "सामूहिक कार्य र पारदर्शी शासन मार्फत आफ्नो छिमेकलाई रूपान्तरण गर्नुहोस्",
      reportIssue: "समस्या रिपोर्ट गर्नुहोस्",
      viewAll: "सबै समस्याहरू हेर्नुहोस्",
      track: "तपाईंको रिपोर्ट ट्र्याक गर्नुहोस्",
      chatbot: "च्याट सहायक"
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }}></div>

      {/* Language Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center relative z-20">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
          className="flex items-center space-x-2 px-5 py-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full transition-all shadow-lg border border-white/20"
        >
          <Globe className="h-5 w-5 text-white" />
          <span className="text-sm font-medium text-white">
            {language === 'en' ? 'नेपाली' : 'English'}
          </span>
        </button>       
      </div>

      {/* Hero Section with Parallax */}
      <div 
        className="relative overflow-hidden py-32 mb-20"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          {/* Main Tagline - Multi-line with Different Colors */}
          <div className="space-y-2 mb-12">
            <h1 
              className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight"
              style={{
                transform: `translateY(${scrollY * 0.35}px)`,
                transition: 'transform 0.1s ease-out',
                lineHeight: '1'
              }}
            >
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-100 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                {language === 'en' ? 'Your Voice' : 'तपाईंको आवाज'}
              </div>
            </h1>
            
            <h1 
              className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
                transition: 'transform 0.1s ease-out',
                lineHeight: '1'
              }}
            >
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                {language === 'en' ? 'Your City' : 'तपाईंको शहर'}
              </div>
            </h1>
            
            <h1 
              className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight"
              style={{
                transform: `translateY(${scrollY * 0.25}px)`,
                transition: 'transform 0.1s ease-out',
                lineHeight: '1'
              }}
            >
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                {language === 'en' ? 'Real Change' : 'वास्तविक परिवर्तन'}
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-light"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Glassmorphic Card Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Report an Issue Card */}
          <div 
            onClick={() => onNavigate('report')}
            className="group relative bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 hover:border-red-400/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-transparent transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="p-5 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <AlertCircle className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {t.reportIssue}
              </h3>
              <p className="text-sm text-blue-200/80 text-center leading-relaxed">
                {language === 'en' ? 'Report a new community issue and make a difference' : 'नयाँ समुदाय समस्या रिपोर्ट गर्नुहोस् र फरक पार्नुहोस्'}
              </p>
            </div>
          </div>

          {/* View All Issues Card */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="group relative bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 hover:border-blue-400/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Eye className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {t.viewAll}
              </h3>
              <p className="text-sm text-blue-200/80 text-center leading-relaxed">
                {language === 'en' ? 'Browse all reported issues and community updates' : 'सबै रिपोर्ट गरिएका समस्या र समुदाय अपडेटहरू हेर्नुहोस्'}
              </p>
            </div>
          </div>

          {/* Track Your Report Card */}
          <div 
            onClick={() => onNavigate('track')}
            className="group relative bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 hover:border-green-400/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-green-500/20 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-transparent transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="p-5 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {t.track}
              </h3>
              <p className="text-sm text-blue-200/80 text-center leading-relaxed">
                {language === 'en' ? 'Monitor the status of your reports in real-time' : 'आफ्नो रिपोर्टको स्थिति वास्तविक समयमा निगरानी गर्नुहोस्'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 p-5 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-2xl transition-all hover:scale-110 z-50 group"
      >
        <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></span>
      </button>

      {/* Glassmorphic Chat Window */}
      {showChat && (
        <div className="fixed bottom-28 right-8 w-96 bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-lg">{t.chatbot}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-blue-100">Online</span>
              </div>
            </div>
            <button 
              onClick={() => setShowChat(false)} 
              className="text-white hover:text-blue-200 transition-colors hover:rotate-90 transform duration-300"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          <div className="p-6 h-80 overflow-y-auto">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mb-3 border border-white/30">
              <p className="text-sm text-white leading-relaxed">
                {language === 'en' 
                  ? "Hello! I'm here to help you navigate the platform and answer any questions you might have." 
                  : "नमस्ते! म तपाईंलाई प्लेटफर्म नेभिगेट गर्न र तपाईंसँग भएका प्रश्नहरूको जवाफ दिन यहाँ छु।"}
              </p>
            </div>
          </div>
          <div className="p-4 border-t border-white/20 bg-white/5">
            <input
              type="text"
              placeholder={language === 'en' ? "Type your message..." : "आफ्नो सन्देश टाइप गर्नुहोस्..."}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-200/50 backdrop-blur-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CitizenHome;