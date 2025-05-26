import { User, Costume, Dancer, Performance, CostumeRequest, MaintenanceRequest, Notification } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Anna Kowalska',
    email: 'anna@example.com',
    role: 'dancer',
    profileImage: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '2',
    name: 'Maria Nowak',
    email: 'maria@example.com',
    role: 'coordinator',
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '3',
    name: 'Jan Wiśniewski',
    email: 'jan@example.com',
    role: 'management',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '4',
    name: 'Piotr Kamiński',
    email: 'piotr@example.com',
    role: 'dancer',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export const costumes: Costume[] = [
  {
    id: '1',
    name: 'Krakowiak Female Costume',
    type: 'Regional',
    size: 'M',
    condition: 'excellent',
    status: 'assigned',
    imageUrl: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=500',
    notes: 'Complete set with all accessories',
    lastMaintenance: '2023-12-15',
    assignedTo: '1'
  },
  {
    id: '2',
    name: 'Góralski Male Costume',
    type: 'Regional',
    size: 'L',
    condition: 'good',
    status: 'available',
    imageUrl: 'https://images.pexels.com/photos/6150402/pexels-photo-6150402.jpeg?auto=compress&cs=tinysrgb&w=500',
    notes: 'Missing one button, otherwise in good condition',
    lastMaintenance: '2023-10-22'
  },
  {
    id: '3',
    name: 'Kujawiak Female Costume',
    type: 'Regional',
    size: 'S',
    condition: 'fair',
    status: 'maintenance',
    imageUrl: 'https://images.pexels.com/photos/4828358/pexels-photo-4828358.jpeg?auto=compress&cs=tinysrgb&w=500',
    notes: 'Needs repair on the embroidery and hem',
    lastMaintenance: '2023-08-10'
  },
  {
    id: '4',
    name: 'Mazur Male Costume',
    type: 'Regional',
    size: 'M',
    condition: 'good',
    status: 'assigned',
    imageUrl: 'https://images.pexels.com/photos/6150543/pexels-photo-6150543.jpeg?auto=compress&cs=tinysrgb&w=500',
    notes: 'Complete set, recently cleaned',
    lastMaintenance: '2024-01-05',
    assignedTo: '4'
  },
  {
    id: '5',
    name: 'Łowicki Female Headdress',
    type: 'Accessory',
    size: 'One Size',
    condition: 'excellent',
    status: 'available',
    imageUrl: 'https://images.pexels.com/photos/3782788/pexels-photo-3782788.jpeg?auto=compress&cs=tinysrgb&w=500',
    notes: 'Handcrafted with authentic details',
    lastMaintenance: '2024-02-20'
  }
];

export const dancers: Dancer[] = [
  {
    id: '1',
    userId: '1',
    name: 'Anna Kowalska',
    gender: 'female',
    height: 165,
    assignedCostumes: ['1'],
    performanceSchedule: ['1', '3'],
    requestHistory: ['1']
  },
  {
    id: '2',
    userId: '4',
    name: 'Piotr Kamiński',
    gender: 'male',
    height: 180,
    assignedCostumes: ['4'],
    performanceSchedule: ['1', '2'],
    requestHistory: ['2']
  }
];

export const performances: Performance[] = [
  {
    id: '1',
    name: 'Spring Festival',
    date: '2024-05-15',
    location: 'Poznań Cultural Center',
    requiredCostumes: ['1', '4']
  },
  {
    id: '2',
    name: 'International Dance Day',
    date: '2024-04-29',
    location: 'Grand Theatre',
    requiredCostumes: ['2', '4']
  },
  {
    id: '3',
    name: 'Polish Heritage Celebration',
    date: '2024-06-10',
    location: 'City Park Amphitheater',
    requiredCostumes: ['1', '3', '5']
  }
];

export const costumeRequests: CostumeRequest[] = [
  {
    id: '1',
    dancerId: '1',
    costumeId: '5',
    requestDate: '2024-03-10',
    status: 'approved',
    reason: 'Needed for Polish Heritage Celebration',
    performanceId: '3'
  },
  {
    id: '2',
    dancerId: '2',
    costumeId: '2',
    requestDate: '2024-03-15',
    status: 'pending',
    reason: 'Required for International Dance Day performance',
    performanceId: '2'
  }
];

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    costumeId: '3',
    requestDate: '2024-03-01',
    description: 'Repair torn embroidery and fix loose hem',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: '2',
    costumeId: '4',
    requestDate: '2024-02-25',
    description: 'Clean and press before next performance',
    status: 'completed',
    priority: 'medium',
    completionDate: '2024-03-05'
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Costume Assigned',
    message: 'You have been assigned the Krakowiak Female Costume for the Spring Festival.',
    date: '2024-03-05',
    read: true,
    type: 'assignment',
    relatedItemId: '1'
  },
  {
    id: '2',
    userId: '1',
    title: 'Costume Request Approved',
    message: 'Your request for the Łowicki Female Headdress has been approved.',
    date: '2024-03-12',
    read: false,
    type: 'request',
    relatedItemId: '1'
  },
  {
    id: '3',
    userId: '2',
    title: 'New Costume Request',
    message: 'Piotr Kamiński has requested the Góralski Male Costume.',
    date: '2024-03-15',
    read: false,
    type: 'request',
    relatedItemId: '2'
  },
  {
    id: '4',
    userId: '4',
    title: 'Return Reminder',
    message: 'Please return the Mazur Male Costume by March 25th.',
    date: '2024-03-18',
    read: false,
    type: 'return',
    relatedItemId: '4'
  }
];

// Mock authentication functions
export const currentUser = users[0]; // Default to the first user (Anna - dancer)

export const getCurrentUser = (): User => {
  return currentUser;
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getCostumeById = (id: string): Costume | undefined => {
  return costumes.find(costume => costume.id === id);
};

export const getDancerByUserId = (userId: string): Dancer | undefined => {
  return dancers.find(dancer => dancer.userId === userId);
};

export const getNotificationsForUser = (userId: string): Notification[] => {
  return notifications.filter(notification => notification.userId === userId);
};

export const getUnreadNotificationsCount = (userId: string): number => {
  return notifications.filter(notification => notification.userId === userId && !notification.read).length;
};

export const getPerformanceById = (id: string): Performance | undefined => {
  return performances.find(performance => performance.id === id);
};

export const getCostumesForDancer = (dancerId: string): Costume[] => {
  const dancer = dancers.find(d => d.id === dancerId);
  if (!dancer) return [];
  
  return costumes.filter(costume => dancer.assignedCostumes.includes(costume.id));
};

export const getUpcomingPerformancesForDancer = (dancerId: string): Performance[] => {
  const dancer = dancers.find(d => d.id === dancerId);
  if (!dancer) return [];
  
  const today = new Date();
  return performances
    .filter(performance => 
      dancer.performanceSchedule.includes(performance.id) && 
      new Date(performance.date) >= today
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getRequestsForCoordinator = (): CostumeRequest[] => {
  return costumeRequests.filter(request => request.status === 'pending');
};

export const getCostumesByStatus = (status: Costume['status']): Costume[] => {
  return costumes.filter(costume => costume.status === status);
};

export const getMaintenanceRequests = (): MaintenanceRequest[] => {
  return maintenanceRequests;
};