import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface LocationScore {
  name: string;
  type: 'current' | 'peer' | 'competitor';
  overallRating: number;
  googleRating: number;
  yelpRating: number;
  facebookRating: number;
}

const PulseComparison: React.FC = () => {
  const locations: LocationScore[] = [
    {
      name: 'Atlanta Medical Center',
      type: 'current',
      overallRating: 4.5,
      googleRating: 4.7,
      yelpRating: 4.3,
      facebookRating: 4.6
    },
    {
      name: 'Midtown Clinic',
      type: 'peer',
      overallRating: 4.3,
      googleRating: 4.5,
      yelpRating: 4.2,
      facebookRating: 4.4
    },
    {
      name: 'Downtown Healthcare',
      type: 'peer',
      overallRating: 4.4,
      googleRating: 4.6,
      yelpRating: 4.1,
      facebookRating: 4.5
    },
    {
      name: 'Piedmont Hospital',
      type: 'competitor',
      overallRating: 4.2,
      googleRating: 4.4,
      yelpRating: 4.0,
      facebookRating: 4.3
    },
    {
      name: 'Emory Clinic',
      type: 'competitor',
      overallRating: 4.6,
      googleRating: 4.8,
      yelpRating: 4.4,
      facebookRating: 4.7
    },
    {
      name: 'Northside Medical',
      type: 'competitor',
      overallRating: 4.3,
      googleRating: 4.5,
      yelpRating: 4.2,
      facebookRating: 4.4
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'current':
        return 'Your Location';
      case 'peer':
        return 'Peer Clinic';
      case 'competitor':
        return 'Competitor';
      default:
        return '';
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'current':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'peer':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'competitor':
        return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
      default:
        return '';
    }
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1.5">
        <span className="text-base font-semibold text-gray-900 dark:text-white">
          {rating.toFixed(1)}
        </span>
        <div className="flex">
          <StarIcon className="h-4 w-4 text-yellow-400" />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Reputation Score Comparison
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {locations.map((location) => (
          <div
            key={location.name}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
          >
            <div className="flex flex-col">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {location.name}
                </h3>
                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded mt-1 ${getTypeStyles(location.type)}`}>
                  {getTypeLabel(location.type)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Overall
                  </div>
                  {renderRating(location.overallRating)}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Google
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {location.googleRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Yelp
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {location.yelpRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      FB
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {location.facebookRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PulseComparison; 