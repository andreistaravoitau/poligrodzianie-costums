import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Performance } from '../types';
import { MapPin, Calendar } from 'lucide-react';

interface PerformanceCardProps {
  performance: Performance;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ performance }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = new Date(performance.date) > new Date();

  return (
    <Card className={`overflow-hidden transition-shadow duration-300 hover:shadow-lg ${isUpcoming ? 'border-l-4 border-l-red-600' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle>{performance.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Calendar className="h-4 w-4 mr-2 text-red-600" />
            <span>{formatDate(performance.date)}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="h-4 w-4 mr-2 text-red-600" />
            <span>{performance.location}</span>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Required Costumes:</h4>
            <div className="flex flex-wrap gap-2">
              {performance.requiredCostumes.map((id) => (
                <span 
                  key={id} 
                  className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                >
                  Costume #{id}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;