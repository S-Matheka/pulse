import React from 'react';
import { ExclamationCircleIcon, ShieldExclamationIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

interface ComplianceAlert {
  id: string;
  type: 'procedure' | 'documentation' | 'hipaa';
  title: string;
  description: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  auditLink: string;
}

const ComplianceAlerts: React.FC = () => {
  const alerts: ComplianceAlert[] = [
    {
      id: '1',
      type: 'procedure',
      title: 'Triage Protocol Incomplete',
      description: 'Missing 2 of 5 required questions in patient assessment',
      timestamp: '15 minutes ago',
      severity: 'high',
      auditLink: '/audit/triage-protocol'
    },
    {
      id: '2',
      type: 'documentation',
      title: 'Patient Info Collection',
      description: 'Insurance ID missing from 3 recent patient records',
      timestamp: '45 minutes ago',
      severity: 'medium',
      auditLink: '/audit/patient-records'
    },
    {
      id: '3',
      type: 'hipaa',
      title: 'HIPAA Compliance Risk',
      description: 'Patient data sent via email',
      timestamp: '1 hour ago',
      severity: 'high',
      auditLink: '/audit/hipaa-violation'
    },
    {
      id: '4',
      type: 'procedure',
      title: 'Medication Verification',
      description: 'Double verification step skipped for controlled substances',
      timestamp: '2 hours ago',
      severity: 'high',
      auditLink: '/audit/medication-protocol'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'procedure':
        return <ClipboardDocumentCheckIcon className="h-5 w-5 text-yellow-400" />;
      case 'hipaa':
        return <ShieldExclamationIcon className="h-5 w-5 text-red-500" />;
      case 'documentation':
        return <ExclamationCircleIcon className="h-5 w-5 text-orange-400" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      case 'low':
        return 'border-l-4 border-blue-500';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Compliance Alerts
      </h2>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <a
            key={alert.id}
            href={alert.auditLink}
            className={`block bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start space-x-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-900 dark:text-white font-medium">
                    {alert.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                  {alert.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ComplianceAlerts; 