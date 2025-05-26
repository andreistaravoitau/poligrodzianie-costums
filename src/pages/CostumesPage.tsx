import React, { useState } from 'react';
import { costumes } from '../data/mockData';
import CostumeCard from '../components/CostumeCard';
import Button from '../components/ui/Button';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Costume } from '../types';

const CostumesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Costume['status'] | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract unique costume types from data
  const costumeTypes = ['all', ...new Set(costumes.map(costume => costume.type))];
  
  const filteredCostumes = costumes.filter(costume => {
    const matchesSearch = costume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        costume.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || costume.status === statusFilter;
    const matchesType = typeFilter === 'all' || costume.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const handleRequestCostume = (costumeId: string) => {
    alert(`Requesting costume ${costumeId}`);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Costume Inventory</h1>
        
        <Button variant="outline" onClick={toggleFilters} className="flex items-center">
          <SlidersHorizontal size={16} className="mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search costumes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'available', 'assigned', 'maintenance'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusFilter === status
                        ? 'bg-red-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex flex-wrap gap-2">
                {costumeTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      typeFilter === type
                        ? 'bg-red-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setStatusFilter('all');
                setTypeFilter('all');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
      
      <div className="mb-4 flex items-center text-sm text-gray-600">
        <Filter className="h-4 w-4 mr-1" />
        <span>Showing {filteredCostumes.length} of {costumes.length} costumes</span>
      </div>
      
      {filteredCostumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCostumes.map(costume => (
            <CostumeCard 
              key={costume.id} 
              costume={costume} 
              onRequestCostume={costume.status === 'available' ? handleRequestCostume : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No costumes match your search criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => {
              setStatusFilter('all');
              setTypeFilter('all');
              setSearchTerm('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CostumesPage;