import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';
import { getCurrentUser, getUnreadNotificationsCount } from '../data/mockData';
import Avatar from './ui/Avatar';
import { Home, Shirt, Users, Calendar, PenTool as Tool, BellRing, LogOut, Menu, X } from 'lucide-react';

interface NavigationProps {
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentUser: User = getCurrentUser();
  const unreadNotificationsCount = getUnreadNotificationsCount(currentUser.id);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/costumes', label: 'Costumes', icon: <Shirt size={20} /> },
  ];

  if (currentUser.role === 'coordinator' || currentUser.role === 'management') {
    navigationItems.push(
      { path: '/dancers', label: 'Dancers', icon: <Users size={20} /> },
      { path: '/performances', label: 'Performances', icon: <Calendar size={20} /> }
    );
  }

  if (currentUser.role === 'coordinator') {
    navigationItems.push(
      { path: '/maintenance', label: 'Maintenance', icon: <Tool size={20} /> }
    );
  }

  navigationItems.push(
    { path: '/notifications', label: 'Notifications', icon: <BellRing size={20} /> }
  );

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/3782788/pexels-photo-3782788.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Poligrodzianie" 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="ml-2 text-xl font-bold text-red-700">Poligrodzianie</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full
                  ${isActive(item.path)
                    ? 'border-red-600 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {item.icon}
                <span className="ml-1">{item.label}</span>
                {item.path === '/notifications' && unreadNotificationsCount > 0 && (
                  <span className="ml-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center">
            <div className="flex items-center">
              <Avatar
                src={currentUser.profileImage}
                alt={currentUser.name}
                fallback={currentUser.name.charAt(0)}
              />
              <span className="ml-2 text-sm font-medium text-gray-700">{currentUser.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="ml-6 flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <LogOut size={18} className="mr-1" />
              <span>Logout</span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center pl-3 pr-4 py-2 text-base font-medium
                  ${isActive(item.path)
                    ? 'bg-red-50 border-l-4 border-red-600 text-red-700'
                    : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
                {item.path === '/notifications' && unreadNotificationsCount > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Avatar
                  src={currentUser.profileImage}
                  alt={currentUser.name}
                  fallback={currentUser.name.charAt(0)}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
                <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;