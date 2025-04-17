import React, { useState } from 'react';
import {
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import CustomDropdown from '../components/CustomDropdown';

// Mock data for reports
const reportTypes = [
  {
    id: 1,
    name: 'Call Volume Analysis',
    description: 'Detailed analysis of call patterns and volumes',
    lastGenerated: '2024-03-15',
  },
  {
    id: 2,
    name: 'Patient Satisfaction Report',
    description: 'Comprehensive patient feedback and satisfaction metrics',
    lastGenerated: '2024-03-14',
  },
  {
    id: 3,
    name: 'Staffing Efficiency Report',
    description: 'Staff utilization and efficiency metrics',
    lastGenerated: '2024-03-13',
  },
  {
    id: 4,
    name: 'Compliance Audit Report',
    description: 'HIPAA and regulatory compliance status',
    lastGenerated: '2024-03-12',
  },
];

interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
}

const Reports: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const dateRangeOptions = [
    { id: 'placeholder', value: '', label: 'Select date range' },
    { id: '7d', value: '7d', label: 'Last 7 days' },
    { id: '30d', value: '30d', label: 'Last 30 days' },
    { id: '90d', value: '90d', label: 'Last 90 days' },
    { id: 'ytd', value: 'ytd', label: 'Year to date' },
    { id: 'custom', value: 'custom', label: 'Custom range' }
  ];

  const locations: Location[] = [
    { id: '1', name: 'Midtown Clinic', city: 'Atlanta', state: 'GA' },
    { id: '2', name: 'Downtown Clinic', city: 'Atlanta', state: 'GA' },
    { id: '3', name: 'Buckhead Clinic', city: 'Atlanta', state: 'GA' },
    { id: '4', name: 'Decatur Clinic', city: 'Decatur', state: 'GA' }
  ];

  const locationOptions = [
    { id: 'placeholder', value: '', label: 'Select location' },
    ...locations.map(loc => ({
      id: loc.id,
      value: loc.id,
      label: `${loc.name} - ${loc.city}, ${loc.state}`
    }))
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <div className="flex space-x-4">
          <CustomDropdown
            options={dateRangeOptions}
            value={selectedDateRange}
            onChange={setSelectedDateRange}
            placeholder="Select date range"
            minWidth="100%"
          />
          
          <CustomDropdown
            options={locationOptions}
            value={selectedLocation}
            onChange={setSelectedLocation}
            placeholder="Select location"
            minWidth="100%"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <ChartBarIcon className="h-6 w-6 text-primary-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {report.name}
                </h3>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {report.description}
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>Last generated: {report.lastGenerated}</span>
            </div>
            <button className="mt-4 w-full btn-primary">
              Generate Report
            </button>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Generated Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {reportTypes.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {report.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {report.lastGenerated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    All Locations
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button className="text-primary-600 hover:text-primary-700 mr-3">
                      View
                    </button>
                    <button className="text-primary-600 hover:text-primary-700">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports; 