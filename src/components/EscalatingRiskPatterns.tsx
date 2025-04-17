import React from 'react';
import { ChartBarIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface RiskPattern {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  metric: string;
  severity: 'low' | 'medium' | 'high';
  location: string;
}

const patterns: RiskPattern[] = [
  {
    id: '1',
    icon: ClockIcon,
    title: 'Patient Wait Times',
    metric: '+30% longer than last week',
    severity: 'high',
    location: 'Midtown Clinic'
  },
  {
    id: '2',
    icon: ChartBarIcon,
    title: 'Staff Coverage',
    metric: '2 understaffed shifts reported',
    severity: 'medium',
    location: 'Night Shift'
  },
  {
    id: '3',
    icon: DocumentTextIcon,
    title: 'Prescription Delays',
    metric: '3x more reports this week',
    severity: 'high',
    location: 'All Locations'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-900/20 text-red-300';
    case 'medium':
      return 'bg-yellow-900/20 text-yellow-300';
    case 'low':
      return 'bg-green-900/20 text-green-300';
    default:
      return 'bg-gray-700 text-gray-300';
  }
};

const EscalatingRiskPatterns: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Escalating Risk Patterns
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {patterns.map((pattern) => (
          <div
            key={pattern.id}
            className="bg-gray-800 rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${getSeverityColor(pattern.severity)}`}>
                <pattern.icon className="h-5 w-5" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(pattern.severity)} capitalize`}>
                {pattern.severity}
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">
                {pattern.title}
              </h3>
              <p className="text-xl font-bold text-white mb-2">
                {pattern.metric}
              </p>
              <p className="text-sm text-gray-400">
                {pattern.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscalatingRiskPatterns; 