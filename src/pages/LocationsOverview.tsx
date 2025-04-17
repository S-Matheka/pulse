import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  PhoneIcon,
  UserGroupIcon,
  StarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

// Mock data for locations
const locations = [
  {
    id: 1,
    name: 'Midtown Clinic',
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
    name: 'Downtown Clinic',
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
    name: 'Northside Clinic',
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
    name: 'Southside Clinic',
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

const LocationsOverview: React.FC = () => {
  const navigate = useNavigate();

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

  const handleViewDetails = (locationId: number) => {
    navigate(`/location/${locationId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Locations Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div 
            key={location.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-5">
              {/* Location Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-6 w-6 text-gray-400 mr-2" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {location.location}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(location.staffRiskLevel)}`}>
                  {location.staffRiskLevel.charAt(0).toUpperCase() + location.staffRiskLevel.slice(1)} Risk
                </span>
              </div>

              {/* Reputation Score */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {location.reputation.overall.toFixed(1)}
                    </span>
                  </div>
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
                <div className="grid grid-cols-3 gap-2 text-sm">
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

              {/* Call Metrics */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Call Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Calls</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{location.callMetrics.totalCalls}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Answer Rate</p>
                      <p className={`text-sm font-medium ${getAnswerRateColor(location.callMetrics.answerRate)}`}>
                        {location.callMetrics.answerRate}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Abandon Rate</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{location.callMetrics.abandonRate}%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Avg Wait Time</p>
                      <p className={`text-sm font-medium ${getWaitTimeColor(location.callMetrics.avgWaitTime)}`}>
                        {location.callMetrics.avgWaitTime} min
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <button 
                onClick={() => handleViewDetails(location.id)}
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View Details
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsOverview; 