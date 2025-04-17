import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface InsightTrend {
  topic: string;
  category: 'patient-experience' | 'communication' | 'pharmacy';
  severity: 'high' | 'medium' | 'improved';
  metric: string;
  action: string;
  detectedTime: string;
}

const ConversationInsights: React.FC = () => {
  const insights: InsightTrend[] = [
    {
      topic: 'Patient Experience',
      category: 'patient-experience',
      severity: 'high',
      metric: 'Wait times exceeded 30 minutes for 5+ patients',
      action: 'Review staffing levels',
      detectedTime: 'Detected 2 hours ago'
    },
    {
      topic: 'Communication',
      category: 'communication',
      severity: 'medium',
      metric: 'Call abandonment rate at 12% (threshold: 10%)',
      action: 'Analyze call patterns',
      detectedTime: 'Detected 4 hours ago'
    },
    {
      topic: 'Pharmacy',
      category: 'pharmacy',
      severity: 'improved',
      metric: 'Prescription processing delays reduced by 15%',
      action: 'View pharmacy metrics',
      detectedTime: 'Updated 1 hour ago'
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'improved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg bg-gray-900 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Operational Risk Feed
      </h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-lg bg-gray-800 p-4 border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {getSeverityIcon(insight.severity)}
                  <h3 className="text-white font-medium">
                    {insight.topic}
                  </h3>
                </div>
                <p className="text-gray-300">
                  {insight.metric}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  {insight.action}
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </a>
              </div>
              <span className="text-sm text-gray-500">
                {insight.detectedTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationInsights; 