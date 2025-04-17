import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';

interface Platform {
  name: 'Google' | 'Yelp' | 'Facebook';
  rating: number;
  totalReviews: number;
  recentPositive: number;
  recentNegative: number;
  icon: string;
  color: string;
}

interface TrendingPhrase {
  text: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

const ReputationOverview: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const platforms: Platform[] = [
    {
      name: 'Google',
      rating: 4.3,
      totalReviews: 528,
      recentPositive: 8,
      recentNegative: 2,
      icon: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z',
      color: 'text-blue-500',
    },
    {
      name: 'Yelp',
      rating: 4.1,
      totalReviews: 342,
      recentPositive: 6,
      recentNegative: 3,
      icon: 'M20.16 12.594l-4.995 1.433c-.96.275-1.797-.593-1.522-1.553l1.433-4.995c.275-.96 1.595-1.025 1.87-.065l2.197 7.645c.275.96-.023 1.26-.983 1.535zM8.84 19.406l4.995-1.433c.96-.275 1.797.593 1.522 1.553l-1.433 4.995c-.275.96-1.595 1.025-1.87.065l-2.197-7.645c-.275-.96.023-1.26.983-1.535z',
      color: 'text-red-500',
    },
    {
      name: 'Facebook',
      rating: 4.2,
      totalReviews: 245,
      recentPositive: 5,
      recentNegative: 1,
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      color: 'text-blue-600',
    },
  ];

  const trendingPhrases: TrendingPhrase[] = [
    { text: '#GreatService', count: 45, sentiment: 'positive' },
    { text: '#QuickAppointment', count: 32, sentiment: 'positive' },
    { text: '#LongWait', count: 28, sentiment: 'negative' },
    { text: '#FriendlyStaff', count: 25, sentiment: 'positive' },
    { text: '#Recommended', count: 22, sentiment: 'positive' },
    { text: '#ParkingIssues', count: 18, sentiment: 'negative' },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success-500 bg-success-50 dark:bg-success-900/20';
      case 'negative':
        return 'text-danger-500 bg-danger-50 dark:bg-danger-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getOverallStats = () => {
    const totalReviews = platforms.reduce((sum, p) => sum + p.totalReviews, 0);
    const weightedRating =
      platforms.reduce((sum, p) => sum + p.rating * p.totalReviews, 0) / totalReviews;
    return {
      rating: weightedRating.toFixed(1),
      totalReviews,
      recentPositive: platforms.reduce((sum, p) => sum + p.recentPositive, 0),
      recentNegative: platforms.reduce((sum, p) => sum + p.recentNegative, 0),
    };
  };

  const stats =
    selectedPlatform === 'all'
      ? getOverallStats()
      : platforms.find((p) => p.name === selectedPlatform) || getOverallStats();

  const platformOptions = [
    { id: 'all', value: 'all', label: 'All Platforms' },
    ...platforms.map(platform => ({
      id: platform.name,
      value: platform.name,
      label: platform.name
    }))
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Reputation Overview
        </h2>
        <CustomDropdown
          options={platformOptions}
          value={selectedPlatform}
          onChange={setSelectedPlatform}
          minWidth="150px"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Overall Rating
            </span>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white mr-1">
                {stats.rating}
              </span>
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Reviews</span>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {stats.totalReviews}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Recent</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-success-500">
                  +{stats.recentPositive}
                </span>
                <span className="text-sm font-medium text-danger-500">
                  -{stats.recentNegative}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Platform Breakdown
          </h3>
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className={`w-4 h-4 ${platform.color} mr-2`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={platform.icon} />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {platform.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {platform.rating}★
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({platform.totalReviews})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Trending Phrases
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingPhrases.map((phrase) => (
            <span
              key={phrase.text}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(
                phrase.sentiment
              )}`}
            >
              {phrase.text}
              <span className="ml-2 text-xs opacity-75">({phrase.count})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReputationOverview; 