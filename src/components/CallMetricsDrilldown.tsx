import React from 'react';
import { Dialog } from '@headlessui/react';
import {
  PhoneIcon,
  ClockIcon,
  XMarkIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface ServiceLineMetrics {
  name: string;
  totalCalls: number;
  answeredCalls: number;
  answerRate: number;
  avgHoldTime: string;
  commonTopics: string[];
}

interface AbandonedCall {
  id: string;
  phoneNumber: string;
  serviceLine: 'Nurse Triage Line' | 'Front Desk' | 'Prescription Refill';
  timeAbandoned: string;
}

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

interface DrilldownProps {
  isOpen: boolean;
  onClose: () => void;
  metric: StatCard;
}

const formatPhoneNumber = (num: string) => {
  return `(${num.substring(0, 3)}) ${num.substring(3, 6)}-${num.substring(6)}`;
};

const CallMetricsDrilldown: React.FC<DrilldownProps> = ({ isOpen, onClose, metric }) => {
  const getMetricsForCard = (cardId: string): ServiceLineMetrics[] | AbandonedCall[] => {
    switch (cardId) {
      case 'total-calls':
        return [
          {
            name: 'Nurse Triage Line',
            totalCalls: 425,
            answeredCalls: 398,
            answerRate: 93.6,
            avgHoldTime: '1m 45s',
            commonTopics: [
              'Symptom consultations',
              'Post-procedure follow-ups',
              'Medication guidance'
            ]
          },
          {
            name: 'Front Desk',
            totalCalls: 512,
            answeredCalls: 456,
            answerRate: 89.1,
            avgHoldTime: '2m 15s',
            commonTopics: [
              'Appointment scheduling',
              'Insurance inquiries',
              'Registration assistance'
            ]
          },
          {
            name: 'Prescription Refill',
            totalCalls: 310,
            answeredCalls: 278,
            answerRate: 89.7,
            avgHoldTime: '1m 55s',
            commonTopics: [
              'Medication renewals',
              'Prior authorizations',
              'Pharmacy coordination'
            ]
          }
        ];

      case 'answered-calls':
        return [
          {
            name: 'High Performance Lines',
            totalCalls: 520,
            answeredCalls: 494,
            answerRate: 95.0,
            avgHoldTime: '1m 30s',
            commonTopics: [
              'Routine inquiries',
              'Quick resolutions',
              'Efficient routing'
            ]
          },
          {
            name: 'Standard Performance',
            totalCalls: 412,
            answeredCalls: 371,
            answerRate: 90.0,
            avgHoldTime: '2m 15s',
            commonTopics: [
              'Complex inquiries',
              'Multiple departments involved',
              'Documentation required'
            ]
          },
          {
            name: 'Training Needed',
            totalCalls: 315,
            answeredCalls: 167,
            answerRate: 53.0,
            avgHoldTime: '3m 45s',
            commonTopics: [
              'New staff onboarding',
              'Process unfamiliarity',
              'System navigation'
            ]
          }
        ];

      case 'abandoned-calls':
        return [
          { id: 'ac1', phoneNumber: '4045551234', serviceLine: 'Front Desk', timeAbandoned: '5m 12s' },
          { id: 'ac2', phoneNumber: '7705559876', serviceLine: 'Nurse Triage Line', timeAbandoned: '4m 45s' },
          { id: 'ac3', phoneNumber: '6785551122', serviceLine: 'Prescription Refill', timeAbandoned: '6m 02s' },
          { id: 'ac4', phoneNumber: '4045553344', serviceLine: 'Front Desk', timeAbandoned: '5m 30s' },
          { id: 'ac5', phoneNumber: '7705555566', serviceLine: 'Front Desk', timeAbandoned: '7m 15s' },
          { id: 'ac6', phoneNumber: '6785557788', serviceLine: 'Nurse Triage Line', timeAbandoned: '4m 58s' },
        ] as AbandonedCall[];

      case 'wait-time':
        return [
          {
            name: 'Quick Response',
            totalCalls: 423,
            answeredCalls: 423,
            answerRate: 100,
            avgHoldTime: '< 1m',
            commonTopics: [
              'Basic inquiries',
              'Appointment confirmations',
              'Quick questions'
            ]
          },
          {
            name: 'Standard Wait',
            totalCalls: 534,
            answeredCalls: 534,
            answerRate: 100,
            avgHoldTime: '2m - 3m',
            commonTopics: [
              'Insurance verifications',
              'Prescription refills',
              'Scheduling issues'
            ]
          },
          {
            name: 'Extended Wait',
            totalCalls: 290,
            answeredCalls: 290,
            answerRate: 100,
            avgHoldTime: '4m+',
            commonTopics: [
              'Complex cases',
              'Multiple transfers',
              'Provider consultation needed'
            ]
          }
        ];

      default:
        return [];
    }
  };

  const getAnswerRateColor = (rate: number): string => {
    if (rate >= 90) return 'text-success-500 dark:text-success-400';
    if (rate >= 75) return 'text-warning-500 dark:text-warning-400';
    return 'text-danger-500 dark:text-danger-400';
  };

  const getHoldTimeColor = (time: string): string => {
    if (time.includes('< 1m') || time.includes('45s')) return 'text-success-500 dark:text-success-400';
    if (time.includes('5m+') || time.includes('N/A') || parseInt(time) >= 5) return 'text-danger-500 dark:text-danger-400';
    return 'text-warning-500 dark:text-warning-400';
  };

  const data = getMetricsForCard(metric.id);
  const isAbandonedCalls = metric.id === 'abandoned-calls';

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full ${isAbandonedCalls ? 'max-w-2xl' : 'max-w-4xl'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                  {metric.title} {isAbandonedCalls ? 'Details' : 'Breakdown'}
                </Dialog.Title>
                <div className={`p-2 rounded-lg ${metric.iconColor} bg-opacity-10`}>
                  <metric.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {isAbandonedCalls ? (
              <div className="max-h-96 overflow-y-auto">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {(data as AbandonedCall[]).map((call) => (
                    <li key={call.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <UserCircleIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatPhoneNumber(call.phoneNumber)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Line: {call.serviceLine}
                          </p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${getHoldTimeColor(call.timeAbandoned)}`}>
                        Abandoned after {call.timeAbandoned}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {(data as ServiceLineMetrics[]).map((line) => (
                  <div
                    key={line.name}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-600"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                      {line.name}
                      {line.answerRate >= 90 && (
                        <CheckCircleIcon className="h-5 w-5 ml-2 text-success-500 dark:text-success-400" />
                      )}
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <PhoneIcon className="h-4 w-4 mr-1 text-primary-500 dark:text-primary-400" />
                            <span className="text-sm">Call Volume</span>
                          </div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {line.totalCalls}
                          </div>
                          <div className="text-sm text-primary-600 dark:text-primary-400">
                            {line.answeredCalls} answered
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            {line.answerRate >= 75 ? (
                              <ArrowTrendingUpIcon className="h-4 w-4 mr-1 text-success-500 dark:text-success-400" />
                            ) : (
                              <ArrowTrendingDownIcon className="h-4 w-4 mr-1 text-danger-500 dark:text-danger-400" />
                            )}
                            <span className="text-sm">Answer Rate</span>
                          </div>
                          <div className={`text-lg font-semibold ${getAnswerRateColor(line.answerRate)}`}>
                            {line.answerRate}%
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            of total calls
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                          <ClockIcon className="h-4 w-4 mr-1 text-warning-500 dark:text-warning-400" />
                          <span className="text-sm">Avg Hold Time</span>
                        </div>
                        <div className={`text-lg font-semibold ${getHoldTimeColor(line.avgHoldTime)}`}>
                          {line.avgHoldTime}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm">Common Topics</span>
                        </div>
                        <ul className="space-y-1">
                          {line.commonTopics.map((topic, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 dark:text-gray-300 flex items-center"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-primary-500 dark:bg-primary-400 mr-2"></span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CallMetricsDrilldown; 