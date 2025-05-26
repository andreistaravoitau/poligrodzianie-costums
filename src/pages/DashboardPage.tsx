import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import CostumeCard from '../components/CostumeCard';
import PerformanceCard from '../components/PerformanceCard';
import { User } from '../types';
import { 
  getDancerByUserId, 
  getCostumesForDancer, 
  getUpcomingPerformancesForDancer,
  getCostumesByStatus,
  getRequestsForCoordinator,
  getMaintenanceRequests
} from '../data/mockData';
import { Shirt, Users, Calendar, PenTool as Tool, AlertTriangle } from 'lucide-react';
import CostumeRequestItem from '../components/CostumeRequestItem';
import MaintenanceRequestCard from '../components/MaintenanceRequestCard';

interface DashboardPageProps {
  user: User;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const dancer = getDancerByUserId(user.id);
  const assignedCostumes = dancer ? getCostumesForDancer(dancer.id) : [];
  const upcomingPerformances = dancer ? getUpcomingPerformancesForDancer(dancer.id) : [];
  
  // Coordinator and management data
  const availableCostumes = getCostumesByStatus('available');
  const maintenanceCostumes = getCostumesByStatus('maintenance');
  const pendingRequests = getRequestsForCoordinator();
  const maintenanceRequests = getMaintenanceRequests();

  // Mock handlers
  const handleRequestCostume = (costumeId: string) => {
    alert(`Requesting costume ${costumeId}`);
  };

  const handleApproveRequest = (requestId: string) => {
    alert(`Approving request ${requestId}`);
  };

  const handleDenyRequest = (requestId: string) => {
    alert(`Denying request ${requestId}`);
  };

  const handleUpdateMaintenanceStatus = (requestId: string, status: string) => {
    alert(`Updating maintenance request ${requestId} to ${status}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Welcome, {user.name}!
      </h1>
      
      {/* Stats overview - different for each role */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Dancer stats */}
        {user.role === 'dancer' && (
          <>
            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="flex items-center py-4">
                <Shirt className="h-12 w-12 text-red-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Assigned Costumes</p>
                  <h2 className="text-3xl font-bold text-gray-900">{assignedCostumes.length}</h2>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="flex items-center py-4">
                <Calendar className="h-12 w-12 text-amber-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Upcoming Performances</p>
                  <h2 className="text-3xl font-bold text-gray-900">{upcomingPerformances.length}</h2>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {/* Coordinator stats */}
        {user.role === 'coordinator' && (
          <>
            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="flex items-center py-4">
                <Shirt className="h-12 w-12 text-red-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Available Costumes</p>
                  <h2 className="text-3xl font-bold text-gray-900">{availableCostumes.length}</h2>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardContent className="flex items-center py-4">
                <AlertTriangle className="h-12 w-12 text-yellow-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                  <h2 className="text-3xl font-bold text-gray-900">{pendingRequests.length}</h2>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="flex items-center py-4">
                <Users className="h-12 w-12 text-green-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Dancers</p>
                  <h2 className="text-3xl font-bold text-gray-900">2</h2>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="flex items-center py-4">
                <Tool className="h-12 w-12 text-blue-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Maintenance Items</p>
                  <h2 className="text-3xl font-bold text-gray-900">{maintenanceCostumes.length}</h2>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {/* Management stats */}
        {user.role === 'management' && (
          <>
            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="flex items-center py-4">
                <Shirt className="h-12 w-12 text-red-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Costumes</p>
                  <h2 className="text-3xl font-bold text-gray-900">5</h2>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="flex items-center py-4">
                <Users className="h-12 w-12 text-green-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Dancers</p>
                  <h2 className="text-3xl font-bold text-gray-900">2</h2>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="flex items-center py-4">
                <Calendar className="h-12 w-12 text-amber-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Upcoming Performances</p>
                  <h2 className="text-3xl font-bold text-gray-900">3</h2>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      
      {/* Dancer-specific content */}
      {user.role === 'dancer' && (
        <div className="space-y-8">
          {assignedCostumes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Assigned Costumes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignedCostumes.map(costume => (
                  <CostumeCard key={costume.id} costume={costume} />
                ))}
              </div>
            </div>
          )}
          
          {upcomingPerformances.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Performances</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingPerformances.map(performance => (
                  <PerformanceCard key={performance.id} performance={performance} />
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Costumes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCostumes.map(costume => (
                <CostumeCard 
                  key={costume.id} 
                  costume={costume} 
                  onRequestCostume={handleRequestCostume}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Coordinator-specific content */}
      {user.role === 'coordinator' && (
        <div className="space-y-8">
          {pendingRequests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Costume Requests</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pendingRequests.map(request => (
                  <CostumeRequestItem 
                    key={request.id} 
                    request={request}
                    onApprove={handleApproveRequest}
                    onDeny={handleDenyRequest}
                  />
                ))}
              </div>
            </div>
          )}
          
          {maintenanceRequests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Maintenance Requests</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {maintenanceRequests.map(request => (
                  <MaintenanceRequestCard 
                    key={request.id} 
                    request={request}
                    onUpdateStatus={handleUpdateMaintenanceStatus}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Costumes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCostumes.map(costume => (
                <CostumeCard key={costume.id} costume={costume} />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Management-specific content */}
      {user.role === 'management' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Performances</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingPerformances.map(performance => (
                <PerformanceCard key={performance.id} performance={performance} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Costume Inventory Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-600">Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-3xl font-bold">{availableCostumes.length}</h3>
                  <p className="text-sm text-gray-500">costumes ready for assignment</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-amber-600">Assigned</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-3xl font-bold">2</h3>
                  <p className="text-sm text-gray-500">costumes with dancers</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-600">Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-3xl font-bold">{maintenanceCostumes.length}</h3>
                  <p className="text-sm text-gray-500">costumes being repaired</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;