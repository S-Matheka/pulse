import React, { useState } from 'react';
import {
  BellIcon,
  ExclamationCircleIcon,
  PhoneIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium';
  icon: React.ComponentType<any>;
  timestamp: string;
  type: 'staffing' | 'call' | 'compliance' | 'reputation';
  isRead: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Staff Shortage Alert',
      description: 'Front desk staffing at Southside Clinic - Atlanta, GA below 75% capacity',
      priority: 'High',
      icon: UserGroupIcon,
      timestamp: 'Just now',
      type: 'staffing',
      isRead: false
    },
    {
      id: '2',
      title: 'Call Volume Spike',
      description: 'Incoming calls increased by 45% in the last hour at Downtown Clinic - Atlanta, GA',
      priority: 'High',
      icon: PhoneIcon,
      timestamp: '10m ago',
      type: 'call',
      isRead: false
    },
    {
      id: '3',
      title: 'Patient Wait Time Alert',
      description: 'Average wait time exceeds 20 minutes at Midtown Clinic - Atlanta, GA',
      priority: 'High',
      icon: ClockIcon,
      timestamp: '15m ago',
      type: 'staffing',
      isRead: false
    },
    {
      id: '4',
      title: 'Compliance Warning',
      description: 'Required patient documentation missing in 3 recent appointments at Northside Clinic - Atlanta, GA',
      priority: 'High',
      icon: ExclamationCircleIcon,
      timestamp: '32m ago',
      type: 'compliance',
      isRead: false
    },
    {
      id: '5',
      title: 'Reputation Alert',
      description: 'New negative reviews detected for Downtown Clinic - Atlanta, GA location',
      priority: 'Medium',
      icon: ChartBarIcon,
      timestamp: '1h ago',
      type: 'reputation',
      isRead: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <span className="sr-only">Mark all as read</span>
            <CheckIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
              !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <notification.icon className={`h-6 w-6 ${
                  notification.priority === 'High' 
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {notification.description}
                </p>
                {notification.priority === 'High' && (
                  <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                    High Priority
                  </span>
                )}
              </div>
              <button 
                onClick={() => handleDismissNotification(notification.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel; 