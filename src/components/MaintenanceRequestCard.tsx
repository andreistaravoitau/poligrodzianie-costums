import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { MaintenanceRequest } from '../types';
import { getCostumeById } from '../data/mockData';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface MaintenanceRequestCardProps {
  request: MaintenanceRequest;
  onUpdateStatus?: (id: string, status: MaintenanceRequest['status']) => void;
}

const MaintenanceRequestCard: React.FC<MaintenanceRequestCardProps> = ({ 
  request,
  onUpdateStatus
}) => {
  const costume = getCostumeById(request.costumeId);
  
  const statusVariant = {
    'pending': 'warning',
    'in-progress': 'info',
    'completed': 'success'
  } as const;
  
  const priorityVariant = {
    'low': 'info',
    'medium': 'warning',
    'high': 'danger'
  } as const;
  
  const statusIcon = {
    'pending': <Clock className="h-4 w-4 mr-1" />,
    'in-progress': <AlertTriangle className="h-4 w-4 mr-1" />,
    'completed': <CheckCircle className="h-4 w-4 mr-1" />
  } as const;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-base">{costume?.name || 'Unknown Costume'}</CardTitle>
        <div className="flex gap-2">
          <Badge variant={statusVariant[request.status]} className="flex items-center">
            {statusIcon[request.status]}
            {request.status}
          </Badge>
          <Badge variant={priorityVariant[request.priority]}>
            {request.priority} priority
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Description:</h4>
          <p className="text-sm text-gray-600">{request.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Request Date:</span>
            <p className="font-medium">{formatDate(request.requestDate)}</p>
          </div>
          
          {request.completionDate && (
            <div>
              <span className="text-gray-500">Completion Date:</span>
              <p className="font-medium">{formatDate(request.completionDate)}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      {onUpdateStatus && request.status !== 'completed' && (
        <CardFooter className="border-t border-gray-100 flex justify-end gap-2">
          {request.status === 'pending' && (
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => onUpdateStatus(request.id, 'in-progress')}
            >
              Start Maintenance
            </Button>
          )}
          
          {request.status === 'in-progress' && (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => onUpdateStatus(request.id, 'completed')}
            >
              Complete Maintenance
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default MaintenanceRequestCard;