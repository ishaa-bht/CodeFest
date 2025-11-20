// import { useState } from 'react';
// import { Upload, MapPin, ArrowLeft } from 'lucide-react';
// import { useApp } from '../context/AppContext';
// import { categories } from '../data/mockData';

// interface ReportIssueProps {
//   onNavigate: (page: string) => void;
// }

// export function ReportIssue({ onNavigate }: ReportIssueProps) {
//   const { addIssue } = useApp();
//   const [submitted, setSubmitted] = useState(false);
//   const [referenceId, setReferenceId] = useState('');

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     const newId = `REF${String(Date.now()).slice(-3)}`;
//     const newIssue = {
//       id: newId,
//       title: formData.get('title') as string,
//       category: formData.get('category') as string,
//       description: formData.get('description') as string,
//       status: 'pending' as const,
//       location: formData.get('location') as string,
//       coordinates: { lat: 27.7172, lng: 85.3240 },
//       submittedBy: formData.get('name') as string,
//       submittedAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       ward: parseInt(formData.get('ward') as string)
//     };

//     addIssue(newIssue);
//     setReferenceId(newId);
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully!</h2>
//           <p className="text-gray-600 mb-6">Your issue has been registered and will be reviewed shortly.</p>
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//             <p className="text-sm text-gray-600 mb-1">Your Reference ID</p>
//             <p className="text-2xl font-bold text-blue-600">{referenceId}</p>
//             <p className="text-xs text-gray-500 mt-2">Save this ID to track your report</p>
//           </div>
//           <div className="flex gap-4 justify-center">
//             <button
//               onClick={() => onNavigate('home')}
//               className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
//             >
//               Go Home
//             </button>
//             <button
//               onClick={() => onNavigate('track')}
//               className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
//             >
//               Track Report
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <button
//         onClick={() => onNavigate('home')}
//         className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
//       >
//         <ArrowLeft className="h-5 w-5 mr-2" />
//         Back to Home
//       </button>

//       <div className="bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Report an Issue</h2>
//         <p className="text-gray-600 mb-8">Help us improve your community by reporting issues</p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
//             <input
//               type="text"
//               name="name"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               placeholder="Enter your full name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Title</label>
//             <input
//               type="text"
//               name="title"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               placeholder="Brief description of the issue"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//             <select
//               name="category"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//             >
//               <option value="">Select a category</option>
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Ward Number</label>
//               <input
//                 type="number"
//                 name="ward"
//                 required
//                 min="1"
//                 max="32"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 placeholder="1-32"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="location"
//                   required
//                   className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   placeholder="Street, Area"
//                 />
//                 <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
//             <textarea
//               name="description"
//               required
//               rows={4}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               placeholder="Provide detailed information about the issue..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photo (Optional)</label>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors cursor-pointer">
//               <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//               <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
//               <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
//           >
//             Submit Report
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { Upload, MapPin, Navigation, X } from 'lucide-react';

const categories = ['Roads', 'Water Supply', 'Electricity', 'Waste Management', 'Street Lights', 'Drainage', 'Parks', 'Other'];

export function ReportIssue() {
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (showMap && !map) {
      // Load Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);

      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.onload = initializeMap;
      document.body.appendChild(script);

      return () => {
        document.head.removeChild(link);
        document.body.removeChild(script);
      };
    }
  }, [showMap]);

  const initializeMap = () => {
    if (window.L && !map) {
      const mapInstance = window.L.map('map').setView([27.7172, 85.3240], 13);
      
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      mapInstance.on('click', (e) => {
        const { lat, lng } = e.latlng;
        updateMarker(mapInstance, lat, lng);
        reverseGeocode(lat, lng);
      });

      setMap(mapInstance);
    }
  };

  const updateMarker = (mapInstance, lat, lng) => {
    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      const newMarker = window.L.marker([lat, lng]).addTo(mapInstance);
      setMarker(newMarker);
    }
    setSelectedLocation({ lat, lng, address: 'Getting address...' });
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setSelectedLocation(prev => ({ ...prev, address }));
    } catch (error) {
      setSelectedLocation(prev => ({ 
        ...prev, 
        address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` 
      }));
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (map) {
          map.setView([latitude, longitude], 15);
          updateMarker(map, latitude, longitude);
          reverseGeocode(latitude, longitude);
        } else {
          setSelectedLocation({ 
            lat: latitude, 
            lng: longitude, 
            address: 'Current location' 
          });
        }
        setGettingLocation(false);
      },
      (error) => {
        alert('Unable to retrieve your location');
        setGettingLocation(false);
      }
    );
  };

  const confirmLocation = () => {
    setShowMap(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!selectedLocation) {
      alert('Please select a location on the map');
      return;
    }

    const newId = `REF${String(Date.now()).slice(-6)}`;
    setReferenceId(newId);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">Your issue has been registered and will be reviewed shortly.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Your Reference ID</p>
            <p className="text-2xl font-bold text-blue-600">{referenceId}</p>
            <p className="text-xs text-gray-500 mt-2">Save this ID to track your report</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Submit Another
            </button>
            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Track Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Report an Issue</h2>
        <p className="text-gray-600 mb-8">Help us improve your community by reporting issues</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Brief description of the issue"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ward Number</label>
            <input
              type="number"
              name="ward"
              required
              min="1"
              max="32"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter ward number (1-32)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
            
            {selectedLocation ? (
              <div className="border border-green-300 bg-green-50 rounded-lg p-4 mb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800 mb-1">Selected Location:</p>
                    <p className="text-sm text-gray-700">{selectedLocation.address}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowMap(true)}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-400 transition-colors flex items-center justify-center text-gray-600 hover:text-gray-800"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Select Location on Map
                </button>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={gettingLocation}
                  className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center text-blue-700 font-medium disabled:opacity-50"
                >
                  <Navigation className="h-5 w-5 mr-2" />
                  {gettingLocation ? 'Getting Location...' : 'Use Current Location'}
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Provide detailed information about the issue..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photo (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
          >
            Submit Report
          </button>
        </form>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Select Issue Location</h3>
                <p className="text-sm text-gray-600">Click on the map to pinpoint the exact location</p>
              </div>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4 flex-1 min-h-0">
              <div className="mb-3 flex gap-2">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={gettingLocation}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center disabled:opacity-50 transition-colors"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  {gettingLocation ? 'Getting...' : 'My Location'}
                </button>
              </div>
              
              <div id="map" className="w-full h-96 rounded-lg border border-gray-300"></div>
              
              {selectedLocation && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Selected:</p>
                  <p className="text-sm text-gray-600">{selectedLocation.address}</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowMap(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLocation}
                disabled={!selectedLocation}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}