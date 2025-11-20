export interface Issue {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  location: string;
  coordinates: { lat: number; lng: number };
  imageUrl?: string;
  submittedBy: string;
  submittedAt: string;
  assignedTo?: string;
  updatedAt: string;
  ward: number;
}

export interface Officer {
  id: string;
  name: string;
  role: string;
  ward: number;
}

export interface Stats {
  totalIssues: number;
  resolved: number;
  inProgress: number;
  pending: number;
  avgResolutionTime: number;
}
