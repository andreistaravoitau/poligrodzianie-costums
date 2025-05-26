export interface User {
  id: string;
  name: string;
  email: string;
  role: 'dancer' | 'coordinator' | 'management';
  profileImage?: string;
}

export interface Costume {
  id: string;
  name: string;
  type: string;
  size: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  status: 'available' | 'assigned' | 'maintenance';
  imageUrl?: string;
  notes?: string;
  lastMaintenance?: string;
  assignedTo?: string;
}

export interface Dancer {
  id: string;
  userId: string;
  name: string;
  gender: string;
  height: number;
  assignedCostumes: string[];
  performanceSchedule: Performance[];
  requestHistory: CostumeRequest[];
}

export interface Performance {
  id: string;
  name: string;
  date: string;
  location: string;
  requiredCostumes: string[];
}

export interface CostumeRequest {
  id: string;
  dancerId: string;
  costumeId: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'denied';
  reason: string;
  performanceId?: string;
}

export interface MaintenanceRequest {
  id: string;
  costumeId: string;
  requestDate: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  completionDate?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'assignment' | 'return' | 'maintenance' | 'request' | 'general';
  relatedItemId?: string;
}