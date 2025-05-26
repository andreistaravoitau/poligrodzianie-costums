import React from 'react';
import { Card, CardContent, CardFooter } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { Costume } from '../types';
import { Bookmark, PenTool as Tool, CheckCircle } from 'lucide-react';

interface CostumeCardProps {
  costume: Costume;
  onRequestCostume?: (costumeId: string) => void;
}

const CostumeCard: React.FC<CostumeCardProps> = ({ 
  costume,
  onRequestCostume
}) => {
  const statusVariant = {
    available: 'success',
    assigned: 'warning',
    maintenance: 'danger'
  } as const;

  const conditionVariant = {
    excellent: 'success',
    good: 'success',
    fair: 'warning',
    poor: 'danger'
  } as const;

  const statusIcon = {
    available: <CheckCircle className="h-4 w-4 mr-1" />,
    assigned: <Bookmark className="h-4 w-4 mr-1" />,
    maintenance: <Tool className="h-4 w-4 mr-1" />
  } as const;

  return (
    <Card className="h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        {costume.imageUrl ? (
          <img 
            src={costume.imageUrl} 
            alt={costume.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant={statusVariant[costume.status]} className="flex items-center">
            {statusIcon[costume.status]}
            {costume.status}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{costume.name}</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Type:</span>
            <p className="font-medium">{costume.type}</p>
          </div>
          <div>
            <span className="text-gray-500">Size:</span>
            <p className="font-medium">{costume.size}</p>
          </div>
          <div>
            <span className="text-gray-500">Condition:</span>
            <p className="flex items-center">
              <Badge variant={conditionVariant[costume.condition]} className="mt-1">
                {costume.condition}
              </Badge>
            </p>
          </div>
          {costume.lastMaintenance && (
            <div>
              <span className="text-gray-500">Last Maintenance:</span>
              <p className="font-medium">{new Date(costume.lastMaintenance).toLocaleDateString()}</p>
            </div>
          )}
        </div>
        
        {costume.notes && (
          <div className="mb-4">
            <span className="text-gray-500">Notes:</span>
            <p className="text-sm mt-1">{costume.notes}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 flex justify-between items-center">
        {costume.status === 'available' && onRequestCostume && (
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onRequestCostume(costume.id)}
            className="w-full"
          >
            Request Costume
          </Button>
        )}
        {costume.status === 'assigned' && (
          <p className="text-sm text-gray-500 italic">Currently assigned</p>
        )}
        {costume.status === 'maintenance' && (
          <p className="text-sm text-gray-500 italic">Under maintenance</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default CostumeCard;