import React, { useState } from 'react';
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  PhoneXMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import StaffIssueDetail from './StaffIssueDetail';

export interface StaffIssue {
  id: string | number;
  category: string;
  title: string;
  description: string;
  source: string;
  severity: string;
  timestamp?: string;
  date?: string;
  metrics?: {
    value: string;
    trend?: 'increase' | 'decrease';
  };
  action?: {
    text: string;
    link: string;
  };
  actions?: string[];
}

interface StaffIssuesMonitorProps {
  issues?: StaffIssue[];
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'escalating':
    case 'high':
      return <ExclamationTriangleIcon className="h-4 w-4" />;
    case 'moderate':
    case 'medium':
      return <ExclamationTriangleIcon className="h-4 w-4" />;
    case 'resolved':
    case 'low':
      return <CheckCircleIcon className="h-4 w-4" />;
    default:
      return null;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'escalating':
    case 'high':
      return 'text-red-500 dark:text-red-400';
    case 'moderate':
    case 'medium':
      return 'text-yellow-500 dark:text-yellow-400';
    case 'resolved':
    case 'low':
      return 'text-green-500 dark:text-green-400';
    default:
      return 'text-gray-500 dark:text-gray-400';
  }
};

const getSourceIcon = (source: string) => {
  switch (source) {
    case 'reviews':
    case 'Patient Feedback':
      return ChatBubbleLeftRightIcon;
    case 'calls':
    case 'Incident Report':
      return PhoneXMarkIcon;
    case 'feedback':
    case 'Staff Survey':
    case 'Quality Review':
      return ClipboardDocumentListIcon;
    case 'operational':
    case 'HR Report':
    case 'Maintenance Log':
    case 'IT Support Tickets':
      return UserGroupIcon;
    default:
      return UserGroupIcon;
  }
};

// Default staff issues if none are provided
const defaultStaffIssues: StaffIssue[] = [
  {
    id: '2',
    category: 'nursing',
    title: 'Missed Follow-up Calls',
    description: 'Missed 8 follow-up calls at Clinic B (Nurse line)',
    source: 'operational',
    severity: 'moderate',
    timestamp: 'Today',
    metrics: {
      value: '8 calls',
    },
    action: {
      text: 'Review call handling protocol',
      link: '/protocols/calls'
    }
  },
  {
    id: '3',
    category: 'nursing',
    title: 'Extended Nurse Check-in Times',
    description: 'Multiple patients reported long wait times for nurse check-ins',
    source: 'feedback',
    severity: 'escalating',
    timestamp: 'Last 24 hours',
    action: {
      text: 'Review shift allocation',
      link: '/staffing/shifts'
    }
  },
  {
    id: '4',
    category: 'communication',
    title: 'Patient Communication Issues',
    description: 'Negative sentiment in 12 calls included "nurse didn\'t explain well"',
    source: 'calls',
    severity: 'moderate',
    timestamp: '2 hours ago',
    metrics: {
      value: '12 calls',
    },
    action: {
      text: 'Schedule communication training',
      link: '/training/communication'
    }
  }
];

const StaffIssuesMonitor: React.FC<StaffIssuesMonitorProps> = ({ issues = defaultStaffIssues }) => {
  const [selectedIssue, setSelectedIssue] = useState<StaffIssue | null>(null);

  const handleActionClick = (issue: StaffIssue, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedIssue(issue);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Staff Issues Monitor
        </h2>
        <div className="space-y-4">
          {issues.map((issue) => {
            const SourceIcon = getSourceIcon(issue.source);

            return (
              <div
                key={issue.id}
                className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div
                  className={`mr-3 p-2 rounded-lg ${getSeverityColor(issue.severity)} bg-opacity-10 dark:bg-opacity-20`}
                >
                  {getSeverityIcon(issue.severity)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {issue.title}
                      </span>
                      <span className={`text-sm ${getSeverityColor(issue.severity)}`}>
                        {getSeverityIcon(issue.severity)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {issue.timestamp || issue.date}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {issue.description}
                  </p>
                  
                  {issue.metrics && (
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {issue.metrics.value}
                        {issue.metrics.trend && (
                          <span className={`ml-1 ${
                            issue.metrics.trend === 'increase' 
                              ? 'text-red-500 dark:text-red-400' 
                              : 'text-green-500 dark:text-green-400'
                          }`}>
                            {issue.metrics.trend === 'increase' ? '↑' : '↓'}
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    {issue.action ? (
                      <button 
                        onClick={(e) => handleActionClick(issue, e)}
                        className="group inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        <span>{issue.action.text}</span>
                        <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : issue.actions && issue.actions.length > 0 ? (
                      <button 
                        onClick={(e) => handleActionClick(issue, e)}
                        className="group inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        <span>View actions</span>
                        <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <StaffIssueDetail
        issue={selectedIssue!}
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />
    </>
  );
};

export default StaffIssuesMonitor; 