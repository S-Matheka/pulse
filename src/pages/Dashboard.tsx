import React, { useState } from 'react';
import {
  PhoneIcon,
  PhoneArrowUpRightIcon,
  PhoneXMarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import ReputationOverview from '../components/ReputationOverview';
import PulseComparison from '../components/PulseComparison';
import OperationalRiskFeed from '../components/OperationalRiskFeed';
import ComplianceAlerts from '../components/ComplianceAlerts';
import EscalatingRiskPatterns from '../components/EscalatingRiskPatterns';
import StaffIssuesMonitor from '../components/StaffIssuesMonitor';
import CallMetricsDrilldown from '../components/CallMetricsDrilldown';
import { useUser } from '../context/UserContext';

interface StatCard {
  id: string;
  title: string;
  value: string;
  sublabel: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  metrics: {
    frontDesk: { value: number; total: number };
    prescriptions: { value: number; total: number };
    appointments: { value: number; total: number };
    billing: { value: number; total: number };
  };
}

const Dashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<StatCard | null>(null);
  const { user } = useUser();

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get user's first name
  const getFirstName = () => {
    if (!user) return '';
    // Extract first name from email (before the @ symbol and any dots, capitalize first letter)
    const emailName = user.email.split('@')[0].split('.')[0];
    return emailName.charAt(0).toUpperCase() + emailName.slice(1);
  };

  const stats: StatCard[] = [
    {
      id: 'total-calls',
      title: 'Total Calls',
      value: '1,247',
      sublabel: 'Yesterday',
      icon: PhoneIcon,
      iconColor: 'text-primary-500',
      metrics: {
        frontDesk: { value: 300, total: 300 },
        prescriptions: { value: 200, total: 200 },
        appointments: { value: 350, total: 350 },
        billing: { value: 180, total: 180 }
      }
    },
    {
      id: 'answered-calls',
      title: 'Total Answered',
      value: '1,032',
      sublabel: '82.7% Answer Rate',
      icon: PhoneArrowUpRightIcon,
      iconColor: 'text-success-500',
      metrics: {
        frontDesk: { value: 245, total: 300 },
        prescriptions: { value: 180, total: 200 },
        appointments: { value: 320, total: 350 },
        billing: { value: 150, total: 180 }
      }
    },
    {
      id: 'abandoned-calls',
      title: 'Total Abandoned',
      value: '215',
      sublabel: '17.3% Abandon Rate',
      icon: PhoneXMarkIcon,
      iconColor: 'text-danger-500',
      metrics: {
        frontDesk: { value: 55, total: 300 },
        prescriptions: { value: 20, total: 200 },
        appointments: { value: 30, total: 350 },
        billing: { value: 30, total: 180 }
      }
    },
    {
      id: 'wait-time',
      title: 'Average Wait Time',
      value: '2m 45s',
      sublabel: 'Peak: 4m 12s',
      icon: ClockIcon,
      iconColor: 'text-warning-500',
      metrics: {
        frontDesk: { value: 180, total: 300 },
        prescriptions: { value: 120, total: 200 },
        appointments: { value: 210, total: 350 },
        billing: { value: 90, total: 180 }
      }
    }
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {`${getGreeting()}, ${getFirstName()}. Welcome back.`}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.iconColor} bg-opacity-10 dark:bg-opacity-20`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </h3>
            </div>
            <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.sublabel}
              </p>
              <button
                onClick={() => setSelectedMetric(stat)}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <ReputationOverview />
          <OperationalRiskFeed />
          <StaffIssuesMonitor />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <PulseComparison />
          <ComplianceAlerts />
          <EscalatingRiskPatterns />
        </div>
      </div>

      {/* Call Metrics Drilldown Modal */}
      <CallMetricsDrilldown
        isOpen={selectedMetric !== null}
        onClose={() => setSelectedMetric(null)}
        metric={selectedMetric || stats[0]}
      />
    </div>
  );
};

export default Dashboard; 