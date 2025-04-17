import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  ArrowLeftIcon,
  PhoneIcon,
  StarIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import { StaffIssue } from '../components/StaffIssuesMonitor';
import ReputationOverview from '../components/ReputationOverview';
import PulseComparison from '../components/PulseComparison';
import ConversationInsights from '../components/ConversationInsights';
import ComplianceAlerts from '../components/ComplianceAlerts';
import EscalatingRiskPatterns from '../components/EscalatingRiskPatterns';
import StaffIssuesMonitor from '../components/StaffIssuesMonitor';
import OperationalRiskFeed from '../components/OperationalRiskFeed';

// Mock data for locations (same as in LocationsOverview)
const locations = [
  {
    id: 1,
    name: 'Midtown Medical Center',
    location: 'Atlanta, GA',
    callMetrics: {
      totalCalls: 245,
      answerRate: 92,
      abandonRate: 8,
      avgWaitTime: 12,
    },
    reputation: {
      overall: 4.3,
      google: 4.5,
      yelp: 4.2,
      facebook: 4.4,
      recentReviews: 19,
    },
    staffRiskLevel: 'low',
    alerts: 2,
  },
  {
    id: 2,
    name: 'Downtown Health Clinic',
    location: 'Atlanta, GA',
    callMetrics: {
      totalCalls: 189,
      answerRate: 85,
      abandonRate: 15,
      avgWaitTime: 18,
    },
    reputation: {
      overall: 3.8,
      google: 4.0,
      yelp: 3.7,
      facebook: 3.9,
      recentReviews: -5,
    },
    staffRiskLevel: 'high',
    alerts: 5,
  },
  {
    id: 3,
    name: 'Northside Family Practice',
    location: 'Atlanta, GA',
    callMetrics: {
      totalCalls: 312,
      answerRate: 95,
      abandonRate: 5,
      avgWaitTime: 15,
    },
    reputation: {
      overall: 4.5,
      google: 4.7,
      yelp: 4.4,
      facebook: 4.6,
      recentReviews: 12,
    },
    staffRiskLevel: 'low',
    alerts: 1,
  },
  {
    id: 4,
    name: 'Southside Community Health',
    location: 'Atlanta, GA',
    callMetrics: {
      totalCalls: 276,
      answerRate: 88,
      abandonRate: 12,
      avgWaitTime: 20,
    },
    reputation: {
      overall: 3.9,
      google: 4.1,
      yelp: 3.8,
      facebook: 4.0,
      recentReviews: -3,
    },
    staffRiskLevel: 'medium',
    alerts: 4,
  },
];

// Add location-specific staff issues data
const locationStaffIssues: Record<string, StaffIssue[]> = {
  'Midtown Medical Center': [
    {
      id: '1',
      category: 'front_desk',
      title: 'Long Wait Times',
      description: 'Patients reporting extended wait times at front desk',
      source: 'Patient Feedback',
      severity: 'high',
      date: '2023-06-15',
      metrics: {
        value: '15 minutes',
        trend: 'increase'
      },
      actions: ['Review staffing levels', 'Implement queue management system']
    },
    {
      id: '2',
      category: 'nursing',
      title: 'Missed Follow-up Calls',
      description: 'Missed 8 follow-up calls at Midtown Medical Center (Nurse line)',
      source: 'Incident Report',
      severity: 'moderate',
      date: '2023-06-14',
      metrics: {
        value: '8 calls',
      },
      actions: ['Review call handling protocol', 'Schedule additional staff']
    }
  ],
  'Downtown Health Clinic': [
    {
      id: '3',
      category: 'nursing',
      title: 'Extended Nurse Check-in Times',
      description: 'Multiple patients reported long wait times for nurse check-ins',
      source: 'Staff Survey',
      severity: 'escalating',
      date: '2023-06-15',
      metrics: {
        value: '20 minutes',
        trend: 'increase'
      },
      actions: ['Review shift allocation', 'Consider additional nursing staff']
    },
    {
      id: '4',
      category: 'communication',
      title: 'Prescription Communication Delays',
      description: 'Delays in communicating prescription changes to patients',
      source: 'Quality Review',
      severity: 'medium',
      date: '2023-06-13',
      metrics: {
        value: '24 hours',
        trend: 'decrease'
      },
      actions: ['Implement automated notification system', 'Review communication protocols']
    }
  ],
  'Northside Family Practice': [
    {
      id: '5',
      category: 'operational',
      title: 'Equipment Maintenance Issues',
      description: 'Multiple reports of malfunctioning diagnostic equipment',
      source: 'Maintenance Log',
      severity: 'high',
      date: '2023-06-15',
      metrics: {
        value: '3 incidents',
        trend: 'increase'
      },
      actions: ['Schedule equipment inspection', 'Contact service provider']
    },
    {
      id: '6',
      category: 'front_desk',
      title: 'Front Desk Efficiency Issues',
      description: 'Multiple reports of slow check-in process at front desk',
      source: 'Patient Feedback',
      severity: 'moderate',
      date: '2023-06-14',
      metrics: {
        value: '5 complaints',
        trend: 'increase'
      },
      actions: ['Conduct staff training', 'Review check-in protocols']
    }
  ],
  'Southside Community Health': [
    {
      id: '7',
      category: 'pharmacy',
      title: 'Prescription Processing Delays',
      description: 'Patients experiencing longer than usual wait times for prescriptions',
      source: 'Patient Feedback',
      severity: 'high',
      date: '2023-06-16',
      metrics: {
        value: '45 minutes',
        trend: 'increase'
      },
      actions: ['Review pharmacy workflow', 'Consider additional pharmacy staff']
    },
    {
      id: '8',
      category: 'scheduling',
      title: 'Appointment Scheduling Issues',
      description: 'Difficulty in scheduling follow-up appointments within recommended timeframe',
      source: 'Staff Report',
      severity: 'moderate',
      date: '2023-06-15',
      metrics: {
        value: '3 week delay',
        trend: 'increase'
      },
      actions: ['Review scheduling system', 'Optimize appointment slots']
    },
    {
      id: '9',
      category: 'communication',
      title: 'Patient Notification Delays',
      description: 'Delays in notifying patients about test results and follow-up requirements',
      source: 'Quality Review',
      severity: 'medium',
      date: '2023-06-14',
      metrics: {
        value: '48 hours',
        trend: 'decrease'
      },
      actions: ['Implement automated notification system', 'Review communication protocols']
    }
  ]
};

const LocationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch location data
    const fetchLocationData = () => {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        const locationData = locations.find(loc => loc.id === Number(id));
        setLocation(locationData || null);
        setLoading(false);
      }, 500);
    };

    fetchLocationData();
  }, [id]);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getAnswerRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-500 dark:text-green-400';
    if (rate >= 80) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getWaitTimeColor = (time: number) => {
    if (time <= 10) return 'text-green-500 dark:text-green-400';
    if (time <= 15) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Location Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The requested location could not be found.</p>
        <button
          onClick={() => navigate('/locations')}
          className="btn-primary"
        >
          Back to Locations
        </button>
      </div>
    );
  }

  // Get location-specific staff issues
  const staffIssues = locationStaffIssues[location.name as keyof typeof locationStaffIssues] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/locations')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{location.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{location.location}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRiskLevelColor(location.staffRiskLevel)}`}>
          {location.staffRiskLevel.charAt(0).toUpperCase() + location.staffRiskLevel.slice(1)} Risk
        </span>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Reputation Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <StarIcon className="h-6 w-6 text-yellow-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reputation</h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {location.reputation.overall.toFixed(1)}
            </span>
            <div className="flex items-center text-sm">
              {location.reputation.recentReviews > 0 ? (
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={location.reputation.recentReviews > 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(location.reputation.recentReviews)} in 30 days
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm mt-4">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Google:</span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white">{location.reputation.google.toFixed(1)}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Yelp:</span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white">{location.reputation.yelp.toFixed(1)}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">FB:</span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white">{location.reputation.facebook.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Call Volume Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <PhoneIcon className="h-6 w-6 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Call Volume</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {location.callMetrics.totalCalls}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total calls this month
          </div>
        </div>

        {/* Answer Rate Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <UserGroupIcon className="h-6 w-6 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Answer Rate</h3>
          </div>
          <div className={`text-3xl font-bold mb-2 ${getAnswerRateColor(location.callMetrics.answerRate)}`}>
            {location.callMetrics.answerRate}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {location.callMetrics.abandonRate}% abandon rate
          </div>
        </div>

        {/* Wait Time Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <ClockIcon className="h-6 w-6 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Wait Time</h3>
          </div>
          <div className={`text-3xl font-bold mb-2 ${getWaitTimeColor(location.callMetrics.avgWaitTime)}`}>
            {location.callMetrics.avgWaitTime} min
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Average wait time
          </div>
        </div>
      </div>

      {/* Staff Issues Monitor */}
      <StaffIssuesMonitor issues={staffIssues} />
    </div>
  );
};

export default LocationDetails; 