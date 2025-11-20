import { Issue, Officer } from '../types';

export const mockIssues: Issue[] = [
  {
    id: 'REF001',
    title: 'Road Damage on Main Street',
    category: 'Road Damage',
    description: 'Large pothole causing traffic issues',
    status: 'completed',
    location: 'Main Street, Ward 5',
    coordinates: { lat: 27.7172, lng: 85.3240 },
    imageUrl: 'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&w=800',
    submittedBy: 'Ram Kumar',
    submittedAt: '2025-11-15T10:30:00',
    assignedTo: 'Suresh Thapa',
    updatedAt: '2025-11-18T14:20:00',
    ward: 5
  },
  {
    id: 'REF002',
    title: 'Water Leakage at School Chowk',
    category: 'Water Leakage',
    description: 'Broken water pipe causing flooding',
    status: 'in-progress',
    location: 'School Chowk, Ward 3',
    coordinates: { lat: 27.7100, lng: 85.3200 },
    imageUrl: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800',
    submittedBy: 'Sita Sharma',
    submittedAt: '2025-11-18T08:15:00',
    assignedTo: 'Krishna Rai',
    updatedAt: '2025-11-19T09:00:00',
    ward: 3
  },
  {
    id: 'REF003',
    title: 'Streetlight Not Working',
    category: 'Streetlight',
    description: 'Dark area creating safety concerns',
    status: 'pending',
    location: 'Temple Road, Ward 7',
    coordinates: { lat: 27.7150, lng: 85.3280 },
    submittedBy: 'Hari Prasad',
    submittedAt: '2025-11-19T18:45:00',
    updatedAt: '2025-11-19T18:45:00',
    ward: 7
  },
  {
    id: 'REF004',
    title: 'Waste Not Collected',
    category: 'Waste Management',
    description: 'Garbage accumulating for 3 days',
    status: 'in-progress',
    location: 'Market Area, Ward 2',
    coordinates: { lat: 27.7130, lng: 85.3260 },
    imageUrl: 'https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?auto=compress&cs=tinysrgb&w=800',
    submittedBy: 'Maya Devi',
    submittedAt: '2025-11-17T11:20:00',
    assignedTo: 'Bikash Tamang',
    updatedAt: '2025-11-19T07:30:00',
    ward: 2
  },
  {
    id: 'REF005',
    title: 'Drainage Blockage',
    category: 'Drainage',
    description: 'Sewage overflow during rain',
    status: 'completed',
    location: 'Park Lane, Ward 4',
    coordinates: { lat: 27.7180, lng: 85.3220 },
    submittedBy: 'Laxmi Gurung',
    submittedAt: '2025-11-12T14:00:00',
    assignedTo: 'Suresh Thapa',
    updatedAt: '2025-11-16T16:00:00',
    ward: 4
  }
];

export const mockOfficers: Officer[] = [
  { id: '1', name: 'Suresh Thapa', role: 'Senior Engineer', ward: 5 },
  { id: '2', name: 'Krishna Rai', role: 'Water Supply Officer', ward: 3 },
  { id: '3', name: 'Bikash Tamang', role: 'Sanitation Head', ward: 2 },
  { id: '4', name: 'Ramesh Shrestha', role: 'Electrical Engineer', ward: 7 }
];

export const categories = [
  'Road Damage',
  'Water Leakage',
  'Streetlight',
  'Waste Management',
  'Drainage',
  'Public Property',
  'Other'
];
