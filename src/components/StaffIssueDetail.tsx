import React, { useState } from 'react';
import {
  XMarkIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { StaffIssue } from './StaffIssuesMonitor';
import CallDetailsModal from './CallDetailsModal';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

interface StaffIssueDetailProps {
  issue: StaffIssue;
  isOpen: boolean;
  onClose: () => void;
}

interface CallDetails {
  id: string;
  timestamp: string;
  duration: string;
  summary: string;
  agent: string;
  customerId: string;
  customerName: string;
  phoneNumber: string;
  shouldAnonymize?: boolean;
  isCrmVerified: boolean;
  reasonForReview?: string;
  reasonSeverity?: 'negative' | 'positive' | 'warning';
  recordingUrl?: string;
  transcriptUrl?: string;
}

interface CallData {
  id: number;
  patientId: string;
  time: string;
  agent: string;
  tag: string;
  outcome: string;
}

// Mock data for demonstrations
const mockCallData = [
  { id: 1, patientId: 'P-1234', time: '09:15 AM', agent: 'Sarah K.', tag: 'missed follow-up', outcome: 'No callback scheduled' },
  { id: 2, patientId: 'P-5678', time: '10:30 AM', agent: 'Mike R.', tag: 'missed follow-up', outcome: 'Patient called back' },
  { id: 3, patientId: 'P-9012', time: '02:45 PM', agent: 'Lisa M.', tag: 'missed follow-up', outcome: 'Voicemail left' },
];

const mockNurseData = {
  checkInTimes: [
    { date: '2024-01-01', avgTime: 15 },
    { date: '2024-01-02', avgTime: 18 },
    { date: '2024-01-03', avgTime: 20 },
    // Add more data points
  ],
  shiftCoverage: [
    { shift: 'Morning', coverage: 80 },
    { shift: 'Afternoon', coverage: 60 },
    { shift: 'Evening', coverage: 40 },
  ],
};

const mockCommunicationFeedback = [
  { id: 1, quote: "Nurse didn't explain medication changes clearly", source: "Call transcript" },
  { id: 2, quote: "Instructions were too technical to understand", source: "Patient feedback" },
  { id: 3, quote: "Needed to ask multiple times for clarification", source: "Survey response" },
];

// Add mock call details
const mockCallDetails = {
  id: 'call-123',
  timestamp: '2024-03-20T10:30:00Z',
  duration: '5m 23s',
  summary: 'Patient expressed frustration about long wait times and rude behavior from front desk staff.',
  agent: 'Sarah Johnson',
  customerId: 'CUST-456',
  customerName: 'John Smith',
  phoneNumber: '(555) 123-4567',
  shouldAnonymize: true,
  isCrmVerified: true,
  reasonForReview: 'Negative call sentiment',
  reasonSeverity: 'negative' as const,
  recordingUrl: '/recordings/call-123.mp3',
  transcriptUrl: '/transcripts/call-123.txt'
};

// Mock data for front desk metrics
const mockFrontDeskData = {
  waitTimes: [
    { time: '8:00 AM', value: 12 },
    { time: '9:00 AM', value: 15 },
    { time: '10:00 AM', value: 18 },
    { time: '11:00 AM', value: 14 },
    { time: '12:00 PM', value: 16 },
    { time: '1:00 PM', value: 13 }
  ],
  staffingLevels: [
    { shift: 'Morning', current: 3, recommended: 4 },
    { shift: 'Afternoon', current: 2, recommended: 3 },
    { shift: 'Evening', current: 2, recommended: 2 }
  ],
  recentComplaints: [
    { id: 1, time: '10:15 AM', issue: 'Long wait at check-in', status: 'Pending' },
    { id: 2, time: '11:30 AM', issue: 'Understaffed during peak hours', status: 'Under Review' },
    { id: 3, time: '1:45 PM', issue: 'Need more staff at reception', status: 'Escalated' }
  ]
};

// Mock data for pharmacy metrics
const mockPharmacyData = {
  processingTimes: [
    { date: '2024-01-01', avgTime: 35 },
    { date: '2024-01-02', avgTime: 42 },
    { date: '2024-01-03', avgTime: 45 },
    { date: '2024-01-04', avgTime: 40 },
    { date: '2024-01-05', avgTime: 38 }
  ],
  staffingStatus: {
    pharmacists: { current: 2, required: 3 },
    technicians: { current: 3, required: 4 }
  },
  pendingPrescriptions: [
    { id: 1, waitTime: '45 mins', priority: 'High', status: 'Processing' },
    { id: 2, waitTime: '30 mins', priority: 'Medium', status: 'Queued' },
    { id: 3, waitTime: '50 mins', priority: 'High', status: 'Delayed' }
  ]
};

// Mock data for scheduling metrics
const mockSchedulingData = {
  appointmentDelays: [
    { specialty: 'Primary Care', avgDelay: '3 weeks', trend: 'increase' },
    { specialty: 'Pediatrics', avgDelay: '2 weeks', trend: 'stable' },
    { specialty: 'Cardiology', avgDelay: '4 weeks', trend: 'increase' }
  ],
  slotUtilization: [
    { day: 'Monday', used: 85, total: 100 },
    { day: 'Tuesday', used: 90, total: 100 },
    { day: 'Wednesday', used: 75, total: 100 },
    { day: 'Thursday', used: 95, total: 100 },
    { day: 'Friday', used: 80, total: 100 }
  ],
  cancelledAppointments: [
    { id: 1, reason: 'Patient request', count: 5 },
    { id: 2, reason: 'Provider unavailable', count: 3 },
    { id: 3, reason: 'Schedule conflict', count: 4 }
  ]
};

// Mock data for equipment maintenance
const mockEquipmentData = {
  incidents: [
    { id: 1, equipment: 'X-Ray Machine', issue: 'Calibration error', status: 'Critical' },
    { id: 2, equipment: 'ECG Monitor', issue: 'Display malfunction', status: 'High' },
    { id: 3, equipment: 'Blood Analyzer', issue: 'Software error', status: 'Medium' }
  ],
  maintenanceSchedule: [
    { equipment: 'X-Ray Machine', lastService: '2024-01-01', nextDue: '2024-02-01' },
    { equipment: 'ECG Monitor', lastService: '2024-01-15', nextDue: '2024-02-15' },
    { equipment: 'Blood Analyzer', lastService: '2024-01-10', nextDue: '2024-02-10' }
  ],
  serviceProviders: [
    { name: 'MedTech Services', contact: '555-0123', specialty: 'Imaging Equipment' },
    { name: 'BioMed Solutions', contact: '555-0124', specialty: 'Diagnostic Tools' },
    { name: 'HealthCare Maintenance', contact: '555-0125', specialty: 'General Equipment' }
  ]
};

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StaffIssueDetail: React.FC<StaffIssueDetailProps> = ({ issue, isOpen, onClose }) => {
  const [selectedCall, setSelectedCall] = useState<CallDetails | null>(null);
  const [showTrainingModal, setShowTrainingModal] = useState(false);

  if (!isOpen) return null;

  const handleViewCall = (call: CallData) => {
    setSelectedCall({
      id: `call-${call.id}`,
      timestamp: new Date().toISOString(), // Using current time as mock timestamp
      duration: '5m 23s', // Mock duration
      summary: `Follow-up call review needed. ${call.outcome}. Agent: ${call.agent}`,
      agent: call.agent,
      customerId: call.patientId.replace('P-', ''),
      customerName: 'John Smith', // Mock name
      phoneNumber: '(555) 123-4567', // Mock phone
      shouldAnonymize: true,
      isCrmVerified: true,
      reasonForReview: 'Missed follow-up call',
      reasonSeverity: 'warning' as const,
      recordingUrl: `/recordings/call-${call.id}.mp3`,
      transcriptUrl: `/transcripts/call-${call.id}.txt`
    });
  };

  const handleAssignTraining = () => {
    setShowTrainingModal(true);
  };

  const renderMissedCallsContent = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">Call Handling Protocol Review</h3>
        <p className="text-yellow-700 dark:text-yellow-300">8 follow-up calls were missed today. Review the cases below and take necessary action.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Outcome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {mockCallData.map((call) => (
              <tr key={call.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{call.patientId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{call.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{call.agent}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{call.tag}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{call.outcome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={() => handleViewCall(call)}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center space-x-1"
                  >
                    <PlayCircleIcon className="h-5 w-5" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button 
          onClick={handleAssignTraining}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
        >
          Assign for Training
        </button>
      </div>

      {showTrainingModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 flex items-center justify-center z-[60]">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Schedule Training Session</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  className="form-input block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Time
                </label>
                <input
                  type="time"
                  className="form-input block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Assign To
                </label>
                <select className="form-select block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                  <option>All Agents</option>
                  <option>Sarah K.</option>
                  <option>Mike R.</option>
                  <option>Lisa M.</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowTrainingModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle training scheduling
                  setShowTrainingModal(false);
                }}
                className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                Schedule Training
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderNurseCheckInContent = () => {
    const checkInData = [
      { date: '2024-01-01', avgTime: 15 },
      { date: '2024-01-02', avgTime: 18 },
      { date: '2024-01-03', avgTime: 20 },
      { date: '2024-01-04', avgTime: 22 },
      { date: '2024-01-05', avgTime: 25 },
    ];

    const shiftCoverage = [
      { shift: 'Morning', current: 4, recommended: 6 },
      { shift: 'Afternoon', current: 3, recommended: 5 },
      { shift: 'Evening', current: 2, recommended: 4 },
    ];

    // Line chart data and options
    const lineChartData = {
      labels: checkInData.map(d => d.date),
      datasets: [
        {
          label: 'Average Check-in Time (minutes)',
          data: checkInData.map(d => d.avgTime),
          borderColor: 'rgb(59, 130, 246)', // blue-500
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };

    const lineChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index' as const,
          intersect: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Minutes'
          }
        }
      }
    };

    // Bar chart data and options
    const barChartData = {
      labels: shiftCoverage.map(s => s.shift),
      datasets: [
        {
          label: 'Current Nurses',
          data: shiftCoverage.map(s => s.current),
          backgroundColor: 'rgb(59, 130, 246)', // blue-500
        },
        {
          label: 'Required Nurses',
          data: shiftCoverage.map(s => s.recommended),
          backgroundColor: 'rgb(239, 68, 68)', // red-500
        }
      ]
    };

    const barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        tooltip: {
          mode: 'index' as const,
          intersect: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Nurses'
          }
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Nurse Check-in Times Analysis</h3>
          <p className="text-red-700 dark:text-red-300">Average check-in times have increased by 25% this week. Review shift allocation below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Average Check-in Times (Last 30 Days)</h4>
            <div className="h-48">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Nurse Shift Coverage</h4>
            <div className="h-48">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Suggested Action</h4>
          <p className="text-yellow-700 dark:text-yellow-300">Consider reallocating 2 nurses from morning shift to afternoon shift at Downtown Health Clinic</p>
        </div>

        <button className="btn-primary">
          Update Shift Allocation
        </button>
      </div>
    );
  };

  const renderCommunicationContent = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">Communication Training Required</h3>
        <p className="text-yellow-700 dark:text-yellow-300">12 calls flagged for communication issues in the last 24 hours.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Recent Feedback</h4>
        {mockCommunicationFeedback.map((feedback) => (
          <div key={feedback.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 italic">"{feedback.quote}"</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Source: {feedback.source}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Schedule Training</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Date
            </label>
            <input
              type="date"
              className="form-input block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assign To
            </label>
            <select className="form-select block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
              <option>Nursing Team</option>
              <option>Front Desk Team</option>
              <option>All Staff</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="btn-primary">
          Schedule Training
        </button>
        <button className="btn-secondary">
          Mark as Resolved
        </button>
      </div>
    </div>
  );

  const renderFrontDeskContent = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">Front Desk Efficiency Analysis</h3>
        <p className="text-yellow-700 dark:text-yellow-300">Average wait times have increased to {issue.metrics?.value}. Immediate action required.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Wait Times Today</h4>
          <div className="space-y-2">
            {mockFrontDeskData.waitTimes.map((timeSlot, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">{timeSlot.time}</span>
                <span className={`text-sm font-medium ${timeSlot.value > 15 ? 'text-red-500' : 'text-green-500'}`}>
                  {timeSlot.value} mins
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Current Staffing Levels</h4>
          <div className="space-y-3">
            {mockFrontDeskData.staffingLevels.map((shift, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{shift.shift}</span>
                  <span className={`text-sm font-medium ${
                    shift.current < shift.recommended ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {shift.current}/{shift.recommended} staff
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Recent Complaints</h4>
        <div className="space-y-3">
          {mockFrontDeskData.recentComplaints.map((complaint) => (
            <div key={complaint.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-900 dark:text-white">{complaint.issue}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{complaint.time}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                {complaint.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button className="btn-primary">
          Adjust Staffing Levels
        </button>
        <button className="btn-secondary">
          View Full Report
        </button>
      </div>
    </div>
  );

  const renderPharmacyContent = () => (
    <div className="space-y-6">
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Pharmacy Processing Delays</h3>
        <p className="text-red-700 dark:text-red-300">Current average wait time is {issue.metrics?.value}. {issue.metrics?.trend === 'increase' ? 'Trending upward.' : 'Showing improvement.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Processing Times Trend</h4>
          <div className="space-y-2">
            {mockPharmacyData.processingTimes.map((day, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">{day.date}</span>
                <span className={`text-sm font-medium ${
                  day.avgTime > 40 ? 'text-red-500' : 'text-green-500'
                }`}>
                  {day.avgTime} mins
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Current Staffing</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Pharmacists</span>
                <span className={`text-sm font-medium ${
                  mockPharmacyData.staffingStatus.pharmacists.current < mockPharmacyData.staffingStatus.pharmacists.required
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}>
                  {mockPharmacyData.staffingStatus.pharmacists.current}/{mockPharmacyData.staffingStatus.pharmacists.required}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Technicians</span>
                <span className={`text-sm font-medium ${
                  mockPharmacyData.staffingStatus.technicians.current < mockPharmacyData.staffingStatus.technicians.required
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}>
                  {mockPharmacyData.staffingStatus.technicians.current}/{mockPharmacyData.staffingStatus.technicians.required}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Pending Prescriptions</h4>
        <div className="space-y-3">
          {mockPharmacyData.pendingPrescriptions.map((rx) => (
            <div key={rx.id} className="flex justify-between items-center">
              <div>
                <span className={`text-sm font-medium ${
                  rx.priority === 'High' ? 'text-red-500' : 'text-yellow-500'
                }`}>
                  {rx.priority} Priority
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Wait time: {rx.waitTime}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {rx.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button className="btn-primary">
          Optimize Workflow
        </button>
        <button className="btn-secondary">
          Request Additional Staff
        </button>
      </div>
    </div>
  );

  const renderSchedulingContent = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">Appointment Scheduling Analysis</h3>
        <p className="text-yellow-700 dark:text-yellow-300">Current average delay is {issue.metrics?.value}. Immediate optimization required.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Appointment Delays by Specialty</h4>
          <div className="space-y-3">
            {mockSchedulingData.appointmentDelays.map((specialty, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">{specialty.specialty}</span>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${
                    specialty.trend === 'increase' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {specialty.avgDelay}
                  </span>
                  {specialty.trend === 'increase' && (
                    <ArrowTrendingUpIcon className="h-4 w-4 ml-1 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Slot Utilization This Week</h4>
          <div className="space-y-2">
            {mockSchedulingData.slotUtilization.map((day, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{day.day}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {Math.round((day.used / day.total) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-primary-600 dark:bg-primary-500 rounded-full"
                    style={{ width: `${(day.used / day.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Cancelled Appointments Analysis</h4>
        <div className="space-y-3">
          {mockSchedulingData.cancelledAppointments.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.reason}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {item.count} appointments
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button className="btn-primary">
          Optimize Schedule
        </button>
        <button className="btn-secondary">
          View Detailed Analysis
        </button>
      </div>
    </div>
  );

  const renderEquipmentContent = () => (
    <div className="space-y-6">
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Equipment Maintenance Issues</h3>
        <p className="text-red-700 dark:text-red-300">{issue.metrics?.value} reported in the last 24 hours. Immediate attention required.</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Current Incidents</h4>
        <div className="space-y-4">
          {mockEquipmentData.incidents.map((incident) => (
            <div key={incident.id} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{incident.equipment}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{incident.issue}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                incident.status === 'Critical' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : incident.status === 'High'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {incident.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Maintenance Schedule</h4>
          <div className="space-y-3">
            {mockEquipmentData.maintenanceSchedule.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.equipment}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last: {item.lastService}</span>
                  <span className="text-gray-600 dark:text-gray-400">Next: {item.nextDue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Service Providers</h4>
          <div className="space-y-3">
            {mockEquipmentData.serviceProviders.map((provider, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{provider.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{provider.specialty}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{provider.contact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="btn-primary">
          Schedule Emergency Maintenance
        </button>
        <button className="btn-secondary">
          Contact Service Provider
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (issue.category) {
      case 'front_desk':
        return renderFrontDeskContent();
      case 'nursing':
        return issue.title.includes('Missed Follow-up Calls') 
          ? renderMissedCallsContent()
          : renderNurseCheckInContent();
      case 'pharmacy':
        return renderPharmacyContent();
      case 'scheduling':
        return renderSchedulingContent();
      case 'operational':
        return issue.title.includes('Equipment') 
          ? renderEquipmentContent()
          : renderCommunicationContent();
      case 'communication':
        return renderCommunicationContent();
      default:
        return <div>No detail view available</div>;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{issue.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 5rem)' }}>
            {renderContent()}
          </div>
        </div>
      </div>

      {selectedCall && (
        <CallDetailsModal
          isOpen={!!selectedCall}
          onClose={() => setSelectedCall(null)}
          call={selectedCall}
        />
      )}
    </>
  );
};

export default StaffIssueDetail; 