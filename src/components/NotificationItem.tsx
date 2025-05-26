import React from 'react';
import { Notification } from '../types';
import { Bell, Mail, Calendar, RefreshCw, PenTool as Tool } from 'lucide-react';
import Badge from './ui/Badge';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification,
  onMarkAsRead
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'assignment':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'return':
        return <RefreshCw className="h-5 w-5 text-amber-500" />;
      case 'maintenance':
        return <Tool className="h-5 w-5 text-red-500" />;
      case 'request':
        return <Mail className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div 
      className={`p-4 border-b border-gray-100 flex gap-3 ${!notification.read ? 'bg-red-50' : ''} hover:bg-gray-50 transition-colors duration-200`}
    >
      <div className="flex-shrink-0 mt-1">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-medium text-gray-900 truncate">{notification.title}</h4>
          <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        <div className="mt-2 flex justify-between items-center">
          <Badge variant={notification.read ? 'info' : 'primary'}>
            {notification.read ? 'Read' : 'New'}
          </Badge>
          {!notification.read && onMarkAsRead && (
            <button 
              onClick={() => onMarkAsRead(notification.id)}
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;