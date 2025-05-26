import React from 'react';
import { CostumeRequest } from '../types';
import { getCostumeById, getDancerByUserId, getUserById } from '../data/mockData';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Avatar from './ui/Avatar';
import { Calendar, Clock } from 'lucide-react';

interface CostumeRequestItemProps {
  request: CostumeRequest;
  onApprove?: (id: string) => void;
  onDeny?: (id: string) => void;
}

const CostumeRequestItem: React.FC<CostumeRequestItemProps> = ({
  request,
  onApprove,
  onDeny
}) => {
  const costume = getCostumeById(request.costumeId);
  const dancer = getDancerByUserId(request.dancerId);
  const user = dancer ? getUserById(dancer.userId) : undefined;
  
  const statusVariant = {
    'pending': 'warning',
    'approved': 'success',
    'denied': 'danger'
  } as const;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <Avatar 
          src={user?.profileImage} 
          alt={user?.name || 'User'} 
          fallback={user?.name?.charAt(0) || 'U'} 
          size="lg"
        />
        
        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              {user?.name || 'Unknown User'}
            </h3>
            <Badge variant={statusVariant[request.status]}>
              {request.status}
            </Badge>
          </div>
          
          <div className="mb-3">
            <h4 className="text-base font-medium text-gray-800">
              Requesting: {costume?.name || 'Unknown Costume'}
            </h4>
            <p className="text-sm text-gray-600 mt-1">{request.reason}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-400" />
              Requested on {formatDate(request.requestDate)}
            </div>
            
            {request.performanceId && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                For upcoming performance
              </div>
            )}
          </div>
          
          {request.status === 'pending' && (onApprove || onDeny) && (
            <div className="flex gap-3 mt-2">
              {onApprove && (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => onApprove(request.id)}
                >
                  Approve
                </Button>
              )}
              
              {onDeny && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDeny(request.id)}
                >
                  Deny
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostumeRequestItem;