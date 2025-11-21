import { useState, useEffect } from 'react';
import { Upload, MapPin, Navigation, X, ArrowLeft } from 'lucide-react';

type Location = { lat: number; lng: number; address: string | null };

const categories = ['Roads', 'Water Supply', 'Electricity', 'Waste Management', 'Street Lights', 'Drainage', 'Parks', 'Other'];

export function ReportIssue({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [language, setLanguage] = useState<'en' | 'np'>('en');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

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
      successText: "तपाईंको समस्या दर्ता गरिएको छ र छिटै समीक्षा हुनेछ।",
      refId: "तपाईंको रेफरेन्स ID",
      saveRef: "रिपोर्ट ट्र्याक गर्न यो ID सुरक्षित राख्नुहोस्",
      goHome: "होममा जानुहोस्",
      track: "रिपोर्ट ट्र्याक गर्नुहोस्",
    }
  };

  const L = t[language];

  useEffect(() => {
    if (showMap && !map) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.onload = () => {
        setTimeout(() => {
          if ((window as any).L && document.getElementById('map')) {
            const mapInstance = (window as any).L.map('map').setView([27.7172, 85.3240], 13);
            (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(mapInstance);

            mapInstance.on('click', (e: any) => {
              const { lat, lng } = e.latlng;
              updateMarker(mapInstance, lat, lng);
              reverseGeocode(lat, lng);
            });

            setMap(mapInstance);

            setTimeout(() => mapInstance.invalidateSize(), 100);
          }
        }, 100);
      };
      document.body.appendChild(script);
    }

    return () => {
      if (map) {
        map.remove();
        setMap(null);
        setMarker(null);
      }
    };
  }, [showMap]);

  const updateMarker = (mapInstance: any, lat: number, lng: number) => {
    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      const newMarker = (window as any).L.marker([lat, lng]).addTo(mapInstance);
      setMarker(newMarker);
    }
    setSelectedLocation({ lat, lng, address: 'Getting address...' });
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      setSelectedLocation(prev => ({ ...prev!, address: data.display_name || `${lat}, ${lng}` }));
    } catch {
      setSelectedLocation(prev => ({ ...prev!, address: `${lat}, ${lng}` }));
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (map) {
          map.setView([latitude, longitude], 15);
          updateMarker(map, latitude, longitude);
          reverseGeocode(latitude, longitude);
        } else {
          setSelectedLocation({ lat: latitude, lng: longitude, address: 'Current location' });
        }
        setGettingLocation(false);
      },
      () => {
        alert('Unable to retrieve location');
        setGettingLocation(false);
      }
    );
  };

  const confirmLocation = () => setShowMap(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedLocation) return alert('Please select a location');

    const formData = new FormData(e.currentTarget);
    formData.append('lat', String(selectedLocation.lat));
    formData.append('lng', String(selectedLocation.lng));
    formData.append('address', selectedLocation.address!);

    const data: Record<string, any> = {};
    formData.forEach((value, key) => data[key] = value);

    console.log('Form submitted:', data);

    setReferenceId(`REF${String(Date.now()).slice(-6)}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <button onClick={() => setLanguage(language === 'en' ? 'np' : 'en')} className="mb-4 px-4 py-1 border rounded">
          {language === 'en' ? 'नेपाली' : 'English'}
        </button>

        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">{L.successTitle}</h2>
          <p className="text-gray-600 mb-6">{L.successText}</p>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
            <p className="text-sm text-gray-600 mb-1">{L.refId}</p>
            <p className="text-2xl font-bold text-blue-600">{referenceId}</p>
            <p className="text-xs text-gray-500 mt-2">{L.saveRef}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-200 rounded-lg"> {L.goHome} </button>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg"> {L.track} </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button onClick={() => onNavigate('home')} className="flex items-center mb-6 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-5 w-5 mr-2" /> {L.back}
      </button>

      <button onClick={() => setLanguage(language === 'en' ? 'np' : 'en')} className="mb-4 px-4 py-1 border rounded">
        {language === 'en' ? 'नेपाली' : 'English'}
      </button>

      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-2">{L.title}</h2>
        <p className="text-gray-600 mb-8">{L.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">{L.name}</label>
            <input type="text" name="name" required placeholder={L.namePh} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">{L.issueTitle}</label>
            <input type="text" name="title" required placeholder={L.issueTitlePh} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">{L.category}</label>
            <select name="category" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="">{L.category}</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">{L.ward}</label>
            <input type="number" name="ward" min={1} max={32} required placeholder={L.wardPh} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">{L.location}</label>
            <div className="space-y-2">
              <button type="button" onClick={() => setShowMap(true)} className="w-full px-4 py-3 border-dashed border-2 rounded-lg flex items-center justify-center gap-2 hover:border-red-400">
                <MapPin className="h-5 w-5" /> Select Location on Map
              </button>
              <button type="button" onClick={getCurrentLocation} disabled={gettingLocation} className="w-full px-4 py-3 bg-blue-50 border rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                <Navigation className="h-5 w-5" /> {gettingLocation ? 'Getting...' : 'Use Current Location'}
              </button>
              {selectedLocation && (
                <div className="mt-2 p-2 border rounded bg-gray-50">
                  <p className="text-sm font-semibold">Selected:</p>
                  <p className="text-sm">{selectedLocation.address}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">{L.description}</label>
            <textarea name="description" required rows={4} placeholder={L.descriptionPh} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">{L.upload}</label>
            <div className="border-dashed border-2 rounded-lg p-6 text-center cursor-pointer hover:border-red-400">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">{L.uploadSub}</p>
              <p className="text-xs text-gray-500">{L.uploadLimit}</p>
            </div>
          </div>

          <button type="submit" disabled={!selectedLocation} className="w-full px-6 py-3 bg-red-600 text-white rounded-lg shadow disabled:opacity-50">
            {L.submit}
          </button>
        </form>
      </div>

      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Select Issue Location</h3>
                <p className="text-sm text-gray-600">Click on the map to pinpoint location</p>
              </div>
              <button onClick={() => setShowMap(false)} className="text-gray-400 hover:text-gray-600"><X className="h-6 w-6" /></button>
            </div>

            <div className="p-4 flex-1 overflow-auto">
              <div className="mb-3 flex gap-2">
                <button type="button" onClick={getCurrentLocation} disabled={gettingLocation} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50">
                  <Navigation className="h-4 w-4" /> {gettingLocation ? 'Getting...' : 'My Location'}
                </button>
              </div>
              <div id="map" style={{ height: '500px', width: '100%' }} className="rounded-lg border border-gray-300"></div>
              {selectedLocation && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold">Selected:</p>
                  <p className="text-sm">{selectedLocation.address}</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t flex justify-end gap-3">
              <button type="button" onClick={() => setShowMap(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              <button type="button" onClick={confirmLocation} disabled={!selectedLocation} className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
