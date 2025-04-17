import React from 'react';

interface TrendAlert {
  id: string;
  message: string;
  source: 'Twitter' | 'Facebook' | 'Yelp' | 'Call Logs';
  increase: number;
  action: string;
  timeframe: string;
  icon: string;
}

const TrendAlerts: React.FC = () => {
  const trends: TrendAlert[] = [
    {
      id: '1',
      message: 'Mentions of "long hold times" up 40% on Facebook',
      source: 'Facebook',
      increase: 40,
      action: 'Review call center capacity',
      timeframe: 'Last 24 hours',
      icon: 'M18.77 7.46H14.5v-1.9c0-.9-.6-1.1-1-1.1h-3c-.4 0-1 .2-1 1.1v1.9H5.23c-.4 0-1 .2-1 1.1v3c0 .9.6 1.1 1 1.1h4.27v1.9c0 .9.6 1.1 1 1.1h3c.4 0 1-.2 1-1.1v-1.9h4.27c.4 0 1-.2 1-1.1v-3c0-.9-.6-1.1-1-1.1z',
    },
    {
      id: '2',
      message: 'Spike in Twitter complaints tagged #LateAppointments',
      source: 'Twitter',
      increase: 65,
      action: 'Adjust scheduling buffer',
      timeframe: 'Last 3 days',
      icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
    },
    {
      id: '3',
      message: 'Negative sentiment in call transcripts about wait times',
      source: 'Call Logs',
      increase: 25,
      action: 'Analyze peak hours',
      timeframe: 'Last 7 days',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
  ];

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Twitter':
        return 'text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'Facebook':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'Yelp':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'Call Logs':
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Trend Alerts
      </h2>
      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${getSourceColor(trend.source)}`}>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={trend.icon} />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${getSourceColor(trend.source)}`}>
                    {trend.source}
                  </span>
                  <span className="text-sm text-danger-500 font-medium">
                    ▲ {trend.increase}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{trend.message}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {trend.timeframe}
                  </span>
                  <button className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    {trend.action} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendAlerts; 