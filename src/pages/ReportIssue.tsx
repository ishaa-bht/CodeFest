// Updated ReportIssue component with English/Nepali multilingual support
// Notes:
// - Added a `language` state to toggle between 'en' and 'np'
// - Wrapped all labels, placeholders, and text inside a `t` object
// - You can later lift language state to global context if needed

import { useState } from 'react';
import { Upload, MapPin, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';

interface ReportIssueProps {
  onNavigate: (page: string) => void;
}

export function ReportIssue({ onNavigate }: ReportIssueProps) {
  const { addIssue } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [language, setLanguage] = useState<'en' | 'np'>('en');

  const t = {
    en: {
      back: "Back to Home",
      title: "Report an Issue",
      subtitle: "Help us improve your community by reporting issues",
      name: "Your Name",
      namePh: "Enter your full name",
      issueTitle: "Issue Title",
      issueTitlePh: "Brief description of the issue",
      category: "Category",
      ward: "Ward Number",
      wardPh: "1-32",
      location: "Location",
      locationPh: "Street, Area",
      description: "Description",
      descriptionPh: "Provide detailed information about the issue...",
      upload: "Upload Photo (Optional)",
      uploadSub: "Click to upload or drag and drop",
      uploadLimit: "PNG, JPG up to 10MB",
      submit: "Submit Report",
      successTitle: "Report Submitted Successfully!",
      successText: "Your issue has been registered and will be reviewed shortly.",
      refId: "Your Reference ID",
      saveRef: "Save this ID to track your report",
      goHome: "Go Home",
      track: "Track Report",
    },
    np: {
      back: "होममा फर्कनुहोस्",
      title: "समस्या रिपोर्ट गर्ने",
      subtitle: "समुदाय सुधार गर्नका लागि समस्या रिपोर्ट गर्न सहयोग गर्नुहोस्",
      name: "तपाईंको नाम",
      namePh: "पूरा नाम लेख्नुहोस्",
      issueTitle: "समस्याको शीर्षक",
      issueTitlePh: "समस्याको संक्षिप्त विवरण",
      category: "कोटि",
      ward: "वडा नं.",
      wardPh: "१-३२",
      location: "स्थान",
      locationPh: "गल्ली, क्षेत्र",
      description: "विवरण",
      descriptionPh: "समस्याको विस्तृत जानकारी दिनुहोस्...",
      upload: "फोटो अपलोड गर्नुहोस् (ऐच्छिक)",
      uploadSub: "क्लिक गर्नुहोस् वा तानेर छोड्नुहोस्",
      uploadLimit: "PNG, JPG १०MB सम्म",
      submit: "रिपोर्ट पठाउनुहोस्",
      successTitle: "रिपोर्ट सफलतापूर्वक पठाइयो!",
      successText: "तपाईंको समस्या दर्ता गरिएको छ र छिट्टै समीक्षा हुनेछ।",
      refId: "तपाईंको रेफरेन्स ID",
      saveRef: "रिपोर्ट ट्र्याक गर्न यो ID सुरक्षित राख्नुहोस्",
      goHome: "होममा जानुहोस्",
      track: "रिपोर्ट ट्र्याक गर्नुहोस्",
    }
  };

  const L = t[language];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newId = `REF${String(Date.now()).slice(-3)}`;
    const newIssue = {
      id: newId,
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      status: 'pending' as const,
      location: formData.get('location') as string,
      coordinates: { lat: 27.7172, lng: 85.3240 },
      submittedBy: formData.get('name') as string,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ward: parseInt(formData.get('ward') as string)
    };

    addIssue(newIssue);
    setReferenceId(newId);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
          className="mb-4 px-4 py-1 border rounded"
        >
          {language === 'en' ? 'नेपाली' : 'English'}
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{L.successTitle}</h2>
          <p className="text-gray-600 mb-6">{L.successText}</p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">{L.refId}</p>
            <p className="text-2xl font-bold text-blue-600">{referenceId}</p>
            <p className="text-xs text-gray-500 mt-2">{L.saveRef}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              {L.goHome}
            </button>
            <button
              onClick={() => onNavigate('track')}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              {L.track}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{L.title}</h2>
        <p className="text-gray-600 mb-8">{L.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{L.name}</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={L.namePh}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{L.issueTitle}</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={L.issueTitlePh}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{L.category}</label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">{L.category}</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{L.ward}</label>
              <input
                type="number"
                name="ward"
                required
                min="1"
                max="32"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={L.wardPh}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{L.location}</label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={L.locationPh}
                />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{L.description}</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={L.descriptionPh}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{L.upload}</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{L.uploadSub}</p>
              <p className="text-xs text-gray-500 mt-1">{L.uploadLimit}</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
          >
            {L.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
