import React, { useState } from 'react';

interface SentimentData {
  phrase: string;
  reviewPercentage: number;
  callPercentage: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  frequency: number;
}

const SentimentCorrelation: React.FC = () => {
  const [activePhrase, setActivePhrase] = useState<string | null>(null);

  const sentimentData: SentimentData[] = [
    {
      phrase: 'long wait time',
      reviewPercentage: 70,
      callPercentage: 65,
      sentiment: 'negative',
      frequency: 142,
    },
    {
      phrase: 'kind nurse',
      reviewPercentage: 45,
      callPercentage: 38,
      sentiment: 'positive',
      frequency: 89,
    },
    {
      phrase: 'unprofessional staff',
      reviewPercentage: 25,
      callPercentage: 30,
      sentiment: 'negative',
      frequency: 67,
    },
    {
      phrase: 'great experience',
      reviewPercentage: 35,
      callPercentage: 28,
      sentiment: 'positive',
      frequency: 82,
    },
    {
      phrase: 'billing issues',
      reviewPercentage: 40,
      callPercentage: 45,
      sentiment: 'negative',
      frequency: 98,
    },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success-500 bg-success-50 dark:bg-success-900/20';
      case 'negative':
        return 'text-danger-500 bg-danger-50 dark:bg-danger-900/20';
      case 'neutral':
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getCorrelationStrength = (review: number, call: number) => {
    const difference = Math.abs(review - call);
    if (difference <= 5) return 'Very Strong';
    if (difference <= 10) return 'Strong';
    if (difference <= 15) return 'Moderate';
    return 'Weak';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Sentiment Correlation Analysis
      </h2>

      <div className="space-y-6">
        {/* Word Cloud */}
        <div className="flex flex-wrap gap-2">
          {sentimentData.map((item) => (
            <button
              key={item.phrase}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                getSentimentColor(item.sentiment)
              } ${
                activePhrase === item.phrase
                  ? 'ring-2 ring-primary-500'
                  : ''
              } hover:opacity-90 transition-opacity`}
              style={{
                fontSize: `${Math.max(0.875 + (item.frequency / 100) * 0.5, 1)}rem`,
              }}
              onClick={() => setActivePhrase(item.phrase === activePhrase ? null : item.phrase)}
            >
              {item.phrase}
            </button>
          ))}
        </div>

        {/* Correlation Details */}
        {activePhrase && (
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            {sentimentData
              .filter((item) => item.phrase === activePhrase)
              .map((item) => (
                <div key={item.phrase} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Correlation Analysis: "{item.phrase}"
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getSentimentColor(item.sentiment)
                      }`}
                    >
                      {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Reviews Mention Rate
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.reviewPercentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${item.reviewPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Calls Mention Rate
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.callPercentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${item.callPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Correlation Strength
                      </span>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {getCorrelationStrength(item.reviewPercentage, item.callPercentage)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      This phrase appears in {item.reviewPercentage}% of reviews and {item.callPercentage}% of
                      calls, indicating a {getCorrelationStrength(
                        item.reviewPercentage,
                        item.callPercentage
                      ).toLowerCase()} correlation between customer reviews and call center interactions.
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {!activePhrase && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            Click on any phrase to see detailed correlation analysis
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentCorrelation; 