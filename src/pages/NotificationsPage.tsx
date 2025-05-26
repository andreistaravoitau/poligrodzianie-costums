import React, { useState } from 'react';
import { getNotificationsForUser } from '../data/mockData';
import { User } from '../types';
import NotificationItem from '../components/NotificationItem';
import { Bell, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

interface NotificationsPageProps {
  user: User;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ user }) => {
  const [notifications, setNotifications] = useState(getNotificationsForUser(user.id));
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="ml-3 bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {unreadCount} New
            </span>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className={unreadCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Mark All as Read
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center bg-gray-50">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-500 mr-2" />
            <span className="font-medium text-gray-700">
              {filteredNotifications.length} Notification{filteredNotifications.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-xs ${
                filter === 'all' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-white border border-gray-300 text-gray-600'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-full text-xs ${
                filter === 'unread' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-600'
              }`}
            >
              Unread
            </button>
            <button 
              onClick={() => setFilter('read')}
              className={`px-3 py-1 rounded-full text-xs ${
                filter === 'read' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-600'
              }`}
            >
              Read
            </button>
          </div>
        </div>
        
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification}
                onMarkAsRead={!notification.read ? handleMarkAsRead : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No notifications to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;